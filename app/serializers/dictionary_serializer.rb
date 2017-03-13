class DictionarySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :category
  belongs_to :category
end
