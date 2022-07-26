class CreateBudgets < ActiveRecord::Migration[6.1]
  def change
    create_table :budgets do |t|
      t.integer :hotel
      t.integer :flight
      t.integer :activities
      t.integer :food
      t.integer :shopping
      t.integer :misc
      t.belongs_to :vacation, null: false, foreign_key: true
    end
  end
end
