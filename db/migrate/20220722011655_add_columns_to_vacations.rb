class AddColumnsToVacations < ActiveRecord::Migration[6.1]
  def change
    add_column :vacations, :dFlightM, :integer
    add_column :vacations, :aFlightM, :integer

    add_column :vacations, :dFlightD, :integer
    add_column :vacations, :aFlightD, :integer

    add_column :vacations, :dFlightY, :integer
    add_column :vacations, :aFlightY, :integer

    add_column :vacations, :dFlightH, :integer
    add_column :vacations, :aFlightH, :integer

    add_column :vacations, :dFlightMin, :integer
    add_column :vacations, :aFlightMin, :integer

    add_column :vacations, :iHotelH, :integer
    add_column :vacations, :oHotelH, :integer

    add_column :vacations, :iHotelM, :integer
    add_column :vacations, :oHotelM, :integer
  end
end
