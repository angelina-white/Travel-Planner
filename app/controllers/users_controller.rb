class UsersController < ApplicationController
    skip_before_action :authorized, only: :create

    def show
        current_user = User.find(session[:user_id])
        render json: current_user
    end

    def create
        @user = User.create!(user_params)
            if @user.save
                UserMailer.welcome_email(@user).deliver_later
                render json: :user, status: :created
            end
    end

    def vacations_index
        user = User.find(params[:user_id])
        vacations = user.vacations
        render json: vacations
    end

    def activities_index
        user = User.find(params[:user_id])
        vacations = user.vacations
        vacation = vacations.find(params[:vacation_id])
        activities = vacation.activities
        render json: activities
    end

    private

    def user_params
        params.permit(:username, :password, :email)
    end
end
