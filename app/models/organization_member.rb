class OrganizationMember < ApplicationRecord
  belongs_to :user
  belongs_to :organization
  acts_as_paranoid
  before_create :delete_all_past

  private

  def delete_all_past
    OrganizationMember.where(organization_id: organization_id, user_id: user_id)
      .destroy_all
  end
end
