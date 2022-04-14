class UsersController < ApplicationController

  def index
  users = User.all 
  render json: users, include: ["meal_plans", "meal_plans.recipes.ingredients", "meal_plans.recipes.directions"]
  end 

    def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, include: ["meal_plans", "meal_plans.recipes.ingredients", "meal_plans.recipes.directions"]
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def create
    byebug
    user = User.create(user_params)
    if user.valid? 
      render json: user, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :unprocessable_entity 
    end
  end 

  private

  def user_params
    params.permit(:username, :password, :passsword_confirmation)
  end
end
