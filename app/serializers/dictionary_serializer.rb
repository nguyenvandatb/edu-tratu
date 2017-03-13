class DictionarySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :category, :word_count
  belongs_to :category
  has_many :words

  def word_count
    object.words.count
  end
end
