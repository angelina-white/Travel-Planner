class CreateUserVacations < ActiveRecord::Migration[6.1]
  def change
    create_table :user_vacations do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :vacation, null: false, foreign_key: true
    end
  end
end
