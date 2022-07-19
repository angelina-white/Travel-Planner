class UserVacationsController < ApplicationController
    
    def create
        userVacation = UserVacation.create!(userVacation_params)
        render json: userVacation, status: :created
    end

    private

    def userVacation_params
        params.permit(:user_id, :vacation_id)
    end

end
