class Activity < ApplicationRecord
    has_many :VacationActivities, dependent: :destroy
    has_many :vacations, through: :VacationActivities
end
