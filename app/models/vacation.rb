class Vacation < ApplicationRecord
    has_many :UserVacations, dependent: :destroy
    has_many :VacationActivities
    has_many :users, through: :UserVacations
    has_many :activities, through: :VacationActivities
end
