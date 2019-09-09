class Api::UserIngredientsController < ApplicationController
  
  def create
    @user_ingredient = current_user.user_ingredients.build(name: params[:name])
    if @user_ingredient.save
      head 201 ## successful response
    else
      render json: @user_ingredient.errors, status: :unprocessable_entity
    end
  end

  def destroy
    UserIngredient.find(params[:id]).delete
    head :no_content
  end

  def index
    tot_ingr_required = Recipe.find(params[:id]).ingredients
    tot_num_ingr_required = tot_ingr_required.count
    
    tot_ingr_req_array = []
    tot_ingr_required.each do |i|
      tot_ingr_req_array.push(i.name)
    end

    # render json: tot_ingr_req_array

    #to find matched user_ingredients with recipe
    matched_ingr = []
    current_user.user_ingredients.each do |ingredient|
      keyword = "%#{ingredient.name}%"
      q = tot_ingr_required.where("LOWER(ingredients.name) LIKE ?", keyword)
      q.each do |entry|
        matched_ingr.push(entry.name)
      end
    end
    # render json: matched_ingr

    ingr_to_buy_arr = tot_ingr_req_array - matched_ingr - $queried_ingredients # and still need to subtract original queried items
    render json: ingr_to_buy_arr

    ## sort ascending for recipes when user logged in
    @@user_num_ingr_required = tot_num_ingr_required - matched_ingr.count
    # render json: @@user_num_ingr_required


    # just an array of similar terms with ingredients table
    # arr = []
    # current_user.user_ingredients.each do |ingredient|
    #   keyword = "%#{ingredient.name}%"
    #   q = Ingredient.where("ingredients.name LIKE ?", keyword)
    #   q.each do |entry|
    #     arr.push(entry.name)
    #   end
    #   # arr.push(q.name)
    # end
    # render json: arr
  end

end