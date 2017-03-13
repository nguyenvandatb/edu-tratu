class Request < ApplicationRecord
  belongs_to :user
  belongs_to :organization

  ATTR_PARAMS = [:organization_id].freeze
  scope :incoming_requests, lambda { |user|
    where "organization_id IN (SELECT organization_id FROM organization_members
      WHERE user_id = ? AND role = 0)", "#{user.id}"
  }
end
