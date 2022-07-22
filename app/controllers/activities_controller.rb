class ActivitiesController < ApplicationController

    def create
        activity = Activity.create!(activity_params)
        render json: activity, status: :created
    end

    def update
        activity = Activity.find(params[:id])
        activity.update!(activity_params)
        render json: activity, status: :ok
    end

    def destroy
        activity = Activity.find(params[:id])
        activity.destroy
        # head :no_content
        render json: params[:id]
    end

    private

    def activity_params
        params.permit(:activityName, :aMonth, :aDay, :aYear, :aHour, :aMinute)
    end

end
