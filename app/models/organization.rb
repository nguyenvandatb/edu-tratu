class Organization < ApplicationRecord
  has_many :organization_members, dependent: :destroy
  has_many :shared_dictionaries
  has_many :users, through: :organization_members
  has_many :dictionaries, through: :shared_dictionaries
  has_many :request_org_users

  validates :name, presence: true, length: {minimum: 5}
  ATTR_PARAMS = [:name, :description].freeze

  def create_organization_owner user
    OrganizationMember.create! user_id: user.id, organization_id: id
  end
end
