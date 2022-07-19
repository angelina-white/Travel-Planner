class VacationActivitiesController < ApplicationController

    def create
        vacationActivity = VacationActivity.create!(vacationActivity_params)
        render json: vacationActivity, status: :created
    end

    private

    def vacationActivity_params
        params.permit(:vacation_id, :activity_id)
    end

end
