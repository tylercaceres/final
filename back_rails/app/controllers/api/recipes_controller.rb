class Api::RecipesController < ApplicationController
  # def index
  #   # puts query_parameters.inspect
  #   recipes = BigOvenService.get_steps
  #   render json: recipes
  # end

  # @ necessary?
  def index
    @recipes = Recipe.all
    render json: @recipes
  end
    

  # user recipe form - "new" route probably not needed
  def new
    # recipes = BigOvenService.search_recipes
    # render json: recipes
    
    render json: BigOvenService.get_recipe(params[:id])
    
    # @ingredients = Ingredient.all
    # render json: @ingredients

  end

  def search
    render json: BigOvenService.search_recipes(params[:term])
  end 
  
  # def search
  #   @recipe = Recipe.first
  #   render json: @recipe
  # end

  def create
  end
  

  def show
  end


end

