class Api::OrganizationsController < ApplicationController
  def index
    if params[:type] == 'my_org'
      render json: current_user.organizations
    elsif params[:type] == 'other_org' && params[:q] && !params[:q].empty?
      render json: Organization.sought(params[:q], current_user)
    else
      render json: []
    end
  end
end
