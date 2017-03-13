class Api::InvitationsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_invitation, only: :destroy
  before_action :accept_invitation, only: :destroy

  def index
    sent_invitations = ActiveModelSerializers::SerializableResource.
      new(current_user.sent_invitations, {}).as_json
    incoming_invitations = ActiveModelSerializers::SerializableResource.
      new(current_user.incoming_invitations, {}).as_json
    @invitations = {sent_invitations: sent_invitations,
      incoming_invitations: incoming_invitations}
    render json: @invitations
  end

  def create
    @invitation = current_user.sent_invitations.build invitation_params
    if @invitation.save
      broadcast @invitation.user_id, @invitation.sender_id
      if params[:q] && !params[:q].empty?
        render json: User.sought(params[:q], current_user.id)
      else
        render json: []
      end
    else
      render json: @invitation.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @invitation.destroy && (!@org_member || (@org_member && @org_member.save))
      broadcast @invitation.user_id, @invitation.sender_id
      render json: @invitation
    else
      render json: @invitation.errors, status: :unprocessable_entity
    end
  end

  private

  def invitation_params
    params.require(:invitation).permit Invitation::ATTR_PARAMS
  end

  def load_invitation
    @invitation = Invitation.find_by id: params[:id]
  end

  def accept_invitation
    return unless params[:type] == "accept"
    @org_member = OrganizationMember.new user_id: @invitation.user_id,
      organization_id: @invitation.organization_id
  end

  def broadcast receiver_id, sender_id
    receiver = User.find_by id: receiver_id
    sender = current_user.id == sender_id ? current_user : User.find_by(id: sender_id)
    incoming_invitations = ActiveModelSerializers::SerializableResource.
      new(receiver.incoming_invitations, {}).as_json
    sent_invitations = ActiveModelSerializers::SerializableResource.
      new(sender.sent_invitations, {}).as_json
    ActionCable.server.broadcast "join_channel_user_#{receiver_id}",
      incoming_invitations: incoming_invitations, is_incoming_invitation: true
    ActionCable.server.broadcast "join_channel_user_#{sender_id}",
      sent_invitations: sent_invitations, is_sent_invitation: true
  end
end
