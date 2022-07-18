class User < ApplicationRecord
    has_many :userVacations
    has_many :vacations, through: :userVacations
end
