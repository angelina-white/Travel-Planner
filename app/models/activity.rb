class Activity < ApplicationRecord
    has_many :VacationActivities
    has_many :vacations, through: :VacationActivities
end
