# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_07_26_145048) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string "activityName"
    t.integer "aMonth"
    t.integer "aDay"
    t.integer "aYear"
    t.integer "aHour"
    t.integer "aMinute"
  end

  create_table "budgets", force: :cascade do |t|
    t.integer "hotel"
    t.integer "flight"
    t.integer "activities"
    t.integer "food"
    t.integer "shopping"
    t.integer "misc"
    t.bigint "vacation_id", null: false
    t.index ["vacation_id"], name: "index_budgets_on_vacation_id"
  end

  create_table "user_vacations", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "vacation_id", null: false
    t.index ["user_id"], name: "index_user_vacations_on_user_id"
    t.index ["vacation_id"], name: "index_user_vacations_on_vacation_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
  end

  create_table "vacation_activities", force: :cascade do |t|
    t.bigint "vacation_id", null: false
    t.bigint "activity_id", null: false
    t.index ["activity_id"], name: "index_vacation_activities_on_activity_id"
    t.index ["vacation_id"], name: "index_vacation_activities_on_vacation_id"
  end

  create_table "vacations", force: :cascade do |t|
    t.string "vacationName"
    t.integer "dFlightM"
    t.integer "aFlightM"
    t.integer "dFlightD"
    t.integer "aFlightD"
    t.integer "dFlightY"
    t.integer "aFlightY"
    t.integer "dFlightH"
    t.integer "aFlightH"
    t.integer "dFlightMin"
    t.integer "aFlightMin"
    t.integer "iHotelH"
    t.integer "oHotelH"
    t.integer "iHotelM"
    t.integer "oHotelM"
  end

  add_foreign_key "budgets", "vacations"
  add_foreign_key "user_vacations", "users"
  add_foreign_key "user_vacations", "vacations"
  add_foreign_key "vacation_activities", "activities"
  add_foreign_key "vacation_activities", "vacations"
end
