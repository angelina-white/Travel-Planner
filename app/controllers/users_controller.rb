class UsersController < ApplicationController
    skip_before_action :authorized, only: :create

    def show
        current_user = User.find(session[:user_id])
        render json: current_user
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def vacations_index
        user = User.find(params[:user_id])
        vacations = user.vacations
        render json: vacations
    end

    private

    def user_params
        params.permit(:username, :password)
    end
end
