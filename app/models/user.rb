class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable, :omniauthable
  belongs_to :plan
  has_many :organization_members
  has_many :reviews
  has_many :dictionaries
  has_many :activities
  has_many :bookmarks
  has_many :categories
  has_many :organizations, through: :organization_members
  has_many :request_org_users
  has_many :request_receives, class_name: "RequestOrgUser", foreign_key: :user_id
  has_many :request_sends, class_name: "RequestOrgUser", foreign_key: :sender_id

  enum role: [:admin, :user]

  scope :sought, lambda { |q, user_id|
    where "name LIKE ? AND id <> ? AND id NOT IN
      (SELECT user_id FROM request_org_users WHERE organization_id IN
        (SELECT organization_id FROM organization_members WHERE user_id = ? AND
          role = 0) AND sender_status = 0 GROUP BY user_id
            HAVING COUNT(DISTINCT organization_id) =
              (SELECT COUNT(organization_id) FROM organization_members WHERE user_id = ? AND role = 0))",
          "%#{q}%", "#{user_id}", "#{user_id}", "#{user_id}"
  }

  class << self
    def from_omniauth auth
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.email = auth.info.email.nil? ?
          "#{auth.uid}@framgia.com" : auth.info.email
        user.phone = auth.info.phone
        user.address = auth.info.address
        user.image = auth.info.image + "?type=large"
        user.password = Devise.friendly_token[0,20]
        user.name = auth.info.name
        user.save!
      end
    end
  end
end
