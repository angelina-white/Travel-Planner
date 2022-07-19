class VacationsController < ApplicationController
    
    def create
        vacation = Vacation.create!(vacation_params)
        render json: vacation, status: :created
    end

    private

    def vacation_params
        params.permit(:vacationName, :flightToArrive, :flightToLeave, :hotelCheckIn, :hotelCheckOut)
    end
    
end
