class UserVacationsController < ApplicationController
    
    def create
        userVacation = UserVacation.create!(userVacation_params)
        # if userVacation.save
            @user = User.find(userVacation.user_id)
            @vacation = Vacation.find(userVacation.vacation_id)
            UserMailer.added_to(@user, @vacation).deliver
            render json: userVacation, status: :created
        # end
    end

    private

    def userVacation_params
        params.permit(:user_id, :vacation_id)
    end

end
