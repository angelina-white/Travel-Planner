class ActivitiesController < ApplicationController

    def create
        activity = Activity.create!(activity_params)
        render json: activity, status: :created
    end

    private

    def activity_params
        params.permit(:activityName)
    end

end
