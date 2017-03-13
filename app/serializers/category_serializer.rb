class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :dictionary_count
  has_many :dictionaries

  def dictionary_count
    object.dictionaries.count
  end
end
