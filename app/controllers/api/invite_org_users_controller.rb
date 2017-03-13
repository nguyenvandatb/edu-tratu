class Api::InviteOrgUsersController < ApplicationController
  before_action :load_request, only: :destroy
  before_action :accept_request, only: :destroy

  def index
    if params[:type] == "send"
      @requests = current_user.request_sends
    elsif params[:type] == "incoming"
      @requests = current_user.request_receives
    else
      @requests = {send_requests: current_user.request_sends,
                   incoming_requests: current_user.request_receives}
    end
    render json: @requests
  end

  def create
    @request = current_user.request_sends.build request_params
    if @request.save
      if params[:q] && !params[:q].empty?
        render json: {users: User.sought(params[:q], current_user.id), requests:
          current_user.request_sends}
      else
        render json: []
      end
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @request.destroy
      render json: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  private

  def request_params
    params.require(:request).permit RequestOrgUser::ATTR_PARAMS
  end

  def load_request
    @request = RequestOrgUser.find_by id: params[:id]
  end

  def accept_request
    return unless params[:type] == "accept"
    user = User.find_by id: @request.user_id
    organization = Organization.find_by id: @request.organization_id
    organization.users << user
  end
end
