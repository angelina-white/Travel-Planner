class BudgetsController < ApplicationController

    def create
        budget = Budget.create!(budget_params)
        render json: budget, status: :created
    end

    def update
        budget = Budget.find(params[:id])
        budget.update!(budget_params)
        render json: budget, status: :ok
    end

    private

    def budget_params
        params.permit(:hotel, :flight, :activities, :food, :shopping, :misc, :vacation_id)
    end

end
