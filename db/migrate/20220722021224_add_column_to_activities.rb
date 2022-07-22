class AddColumnToActivities < ActiveRecord::Migration[6.1]
  def change
    add_column :activities, :aMonth, :integer
    add_column :activities, :aDay, :integer
    add_column :activities, :aYear, :integer
    add_column :activities, :aHour, :integer
    add_column :activities, :aMinute, :integer
  end
end
