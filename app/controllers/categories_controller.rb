class CategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :load_category, only: [:update, :destroy]

  def index
    @categories = ActiveModelSerializers::SerializableResource.
      new(current_user.categories.includes(:dictionaries), {}).as_json
  end

  def new
    @category = Category.new
  end

  def create
    @category = current_user.categories.build category_params
    if @category.save
      if category_params[:dictionaries_attributes]
        dictionaries = current_user.dictionaries.as_json only: [:id, :name, :description],
          include: {category: {only: [:id, :name]}}
        render json: {dictionaries: dictionaries,
          categories: current_user.categories}
      else
        render json: current_user.categories
      end
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def update
    if @category.update category_params
      render json: current_user.categories
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @category.destroy
      render json: current_user.categories
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  private

  def load_category
    @category = Category.friendly.find params[:id]
    render_404 unless @category
  end

  def category_params
    params.require(:category).permit Category::ATTR_PARAMS,
      dictionaries_attributes: Dictionary::ATTR_PARAMS_NESTED
  end
end
