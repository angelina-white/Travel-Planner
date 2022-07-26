class Vacation < ApplicationRecord
    has_many :UserVacations, dependent: :destroy
    has_many :VacationActivities, dependent: :destroy
    has_many :users, through: :UserVacations
    has_many :activities, through: :VacationActivities
    has_one :budget
end
