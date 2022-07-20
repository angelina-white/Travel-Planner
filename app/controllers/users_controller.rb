class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create, :reset, :update, :find, :edit]

    def show
        current_user = User.find(session[:user_id])
        render json: current_user
    end

    def create
        @user = User.create!(user_params)
            if @user.save
                UserMailer.welcome_email(@user).deliver_later
                render json: @user, status: :created
            end
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :ok
    end

    # def reset
    #     @user = User.find_by(email: params[:email])
    #     UserMailer.reset_password(@user).deliver_now
    # end

    # def edit
    #     @user = User.find_signed(params[:token], purpose: "edit")
    # end

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
