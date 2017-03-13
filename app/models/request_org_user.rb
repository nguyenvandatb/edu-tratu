class RequestOrgUser < ApplicationRecord
  belongs_to :user, class_name: User.name
  belongs_to :sender, class_name: User.name
  belongs_to :organization

  enum receiver_status: [:rejected, :accepted, :empty]
  enum sender_status: [:not_canceled, :canceled]

  validate :can_request

  ATTR_PARAMS = [:organization_id, :user_id].freeze

  scope :sent_request, lambda { |user|
    where "sender_id = ? AND sender_status = 0", "#{user.id}"
  }
  scope :sent_request_user, lambda { |user_id, organization_id|
    where "user_id = ? AND organization_id = ? AND sender_status = ?",
      "#{user_id}", "#{organization_id}", 0
  }

  private

  def can_request
    return unless RequestOrgUser.sent_request_user(user_id, organization_id).length > 0
    errors.add :cannot_send_request, I18n.t("cannot_send_request")
    throw :abort
  end
end
