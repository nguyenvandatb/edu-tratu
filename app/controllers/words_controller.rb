class WordsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_dictionary, only: [:create, :update, :destroy, :index]
  before_action :load_word, only: [:update, :destroy]

  def index
    return unless @dictionary
    @dictionary_id = @dictionary.id
    @words = @dictionary.words
    @dictionaries = current_user.dictionaries
  end

  def create
    @word = Word.new word_params
    if @word.save
      render json: @dictionary.words
    else
      render json: @word.errors, status: :unprocessable_entity
    end
  end

  def update
    if @word.update word_params
      render json: @dictionary.words
    else
      render json: @word.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @word.destroy
      render json: @dictionary.words
    else
      render json: @word.errors, status: :unprocessable_entity
    end
  end

  private

  def load_dictionary
    if params[:dictionary_id]
      @dictionary = Dictionary.friendly.find params[:dictionary_id]
    else
      @dictionary = current_user.dictionaries.first
    end
  end

  def load_word
    @word = Word.friendly.find params[:id]
  end

  def word_params
    params.require(:word).permit Word::ATTR_PARAMS
  end
end
