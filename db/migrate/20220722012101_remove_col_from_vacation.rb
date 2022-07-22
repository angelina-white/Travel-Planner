class RemoveColFromVacation < ActiveRecord::Migration[6.1]
  def change
    remove_columns :vacations, :flightToArrive
    remove_columns :vacations, :flightToLeave
    remove_columns :vacations, :hotelCheckIn
    remove_columns :vacations, :hotelCheckOut
  end
end
