# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "destroying seeds"
UserVacation.destroy_all
VacationActivity.destroy_all
Vacation.destroy_all
Activity.destroy_all
User.destroy_all

puts "sseeding data"

u1 = User.create({username: "test", password_digest: "123"})

a1 = Activity.create({activityName: "Swimming"})

v1 = Vacation.create({vacationName:"honeymoon", flightToArrive: "2022-7-25", flightToLeave: "2022-7-30", hotelCheckIn: "3:30", hotelCheckOut: "10:00"})

va1 = VacationActivity.create({vacation_id: v1.id, activity_id: a1.id})

uv1 = UserVacation.create({user_id: u1.id, vacation_id: v1.id})