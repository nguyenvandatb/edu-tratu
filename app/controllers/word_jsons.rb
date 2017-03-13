class WordJsonsController < ApplicationController
  before_action :load_dictionary, only: :index
  def index

  end

  private

  def load_dictionary
    @dictionary = Dictionary.friendly.find params[:dictionary_id]
  end

end
