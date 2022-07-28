class User < ApplicationRecord
    has_secure_password 
    has_many :userVacations
    has_many :vacations, through: :userVacations
end
