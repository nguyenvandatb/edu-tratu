class RequestUserOrg < ApplicationRecord
  belongs_to :user
  belongs_to :organization
  validate :can_request

  ATTR_PARAMS = [:organization_id].freeze

  scope :incoming_invite, lambda { |user|
    where "organization_id IN (SELECT organization_id FROM organization_members
      WHERE user_id = ? AND role = 0)", "#{user.id}"
  }

  scope :request_user, lambda { |user_id, organization_id|
    where "user_id = ? AND organization_id = ?", "#{user_id}", "#{organization_id}"
  }

  private

  def can_request
    return unless RequestUserOrg.request_user.length > 0
    errors.add :cannot_send_request, I18n.t("cannot_send_request")
    throw :abort
  end
end
