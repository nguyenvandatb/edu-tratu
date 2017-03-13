class Invitation < ApplicationRecord
  belongs_to :user, class_name: "User"
  belongs_to :sender, class_name: "User"
  belongs_to :organization

  ATTR_PARAMS = [:organization_id, :user_id].freeze
end
