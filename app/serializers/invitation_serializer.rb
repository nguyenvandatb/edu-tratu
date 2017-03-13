class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :user, :organization
  belongs_to :user
  belongs_to :organization
end
