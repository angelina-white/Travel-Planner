class Activity < ApplicationRecord
    has_many :VacationActivities, dependent: :destroy
    has_many :vacations, through: :VacationActivities

    validates :aMonth, numericality: true
    validates :aDay, numericality: true
    validates :aYear, numericality: true
    validates :aHour, numericality: true
    validates :aMinute, numericality: true
end
