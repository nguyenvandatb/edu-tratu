class Api::RequestsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_request, only: :destroy
  before_action :accept_request, only: :destroy

  def index
    sent_requests = ActiveModelSerializers::SerializableResource.
      new(current_user.requests, {}).as_json
    incoming_requests = ActiveModelSerializers::SerializableResource.
      new(Request.incoming_requests(current_user), {}).as_json
    @requests = {sent_requests: sent_requests,
                 incoming_requests: incoming_requests}
    render json: @requests
  end

  def create
    @request = current_user.requests.build request_params
    if @request.save
      broadcast @request.user_id, @request.organization_id
      if params[:q] && !params[:q].empty?
        render json: Organization.sought(params[:q], current_user)
      else
        render json: []
      end
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @request.destroy && (!@org_member || (@org_member && @org_member.save))
      broadcast @request.user_id, @request.organization_id
      render json: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  private

  def request_params
    params.require(:request).permit Request::ATTR_PARAMS
  end

  def load_request
    @request = Request.find_by id: params[:id]
  end

  def accept_invitation
    return unless params[:type] == "accept"
    @org_member = OrganizationMember.build @invitation.user_id, @invitation.organization_id
  end

  def broadcast sender_id, organization_id
    sender = current_user.id == sender_id ? current_user : User.find_by(id: sender_id)
    sent_requests = ActiveModelSerializers::SerializableResource.
      new(sender.requests, {}).as_json
    ActionCable.server.broadcast "join_channel_user_#{sender_id}",
      sent_requests: sent_requests, is_sent_request: true
    User.org_owners(organization_id).each do |owner|
      incoming_requests = ActiveModelSerializers::SerializableResource.
        new(Request.incoming_requests(owner), {}).as_json
      ActionCable.server.broadcast "join_channel_user_#{owner.id}",
        incoming_requests: incoming_requests, is_incoming_request: true
    end
  end
end
