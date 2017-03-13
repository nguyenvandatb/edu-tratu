require "exir"

class WordImportsController < ApplicationController
  before_action :load_dictionary, only: :create

  def create
    file_name = params["file"].tempfile.path
    Exir::Excelx.import file_name, dictionary_id: params["dictionary_id"]
    render json: @dictionary.words
  end

  private

  def load_dictionary
    @dictionary = Dictionary.friendly.find params[:dictionary_id]
  end
end
