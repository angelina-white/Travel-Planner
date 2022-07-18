class CreateVacations < ActiveRecord::Migration[6.1]
  def change
    create_table :vacations do |t|
      t.string :vacationName
      t.date :flightToArrive
      t.date :flightToLeave
      t.string :hotelCheckIn
      t.string :hotelCheckOut
    end
  end
end
