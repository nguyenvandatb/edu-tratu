class Api::WordsController < ApplicationController
  before_action :load_dictionary, only: :index
  def index
    if @dictionary
      render json: @dictionary.words
    else
      render json: {}
    end
  end

  private

  def load_dictionary
    @dictionary = Dictionary.friendly.find params[:dictionary_id]
  end

end
