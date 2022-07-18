class CreateVacationActivities < ActiveRecord::Migration[6.1]
  def change
    create_table :vacation_activities do |t|
      t.belongs_to :vacation, null: false, foreign_key: true
      t.belongs_to :activity, null: false, foreign_key: true
    end
  end
end
