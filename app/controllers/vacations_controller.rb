class VacationsController < ApplicationController
    
    def create
        vacation = Vacation.create!(vacation_params)
        render json: vacation, status: :created
    end

    def update
        vacation = Vacation.find(params[:id])
        vacation.update!(vacation_params)
        render json: vacation, status: :ok
    end

    private

    def vacation_params
        params.permit(:vacationName, :flightToArrive, :flightToLeave, :hotelCheckIn, :hotelCheckOut)
    end
    
end
