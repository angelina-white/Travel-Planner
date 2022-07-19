class VacationSerializer < ActiveModel::Serializer
  attributes :id, :vacationName, :flightToArrive, :flightToLeave, :hotelCheckIn, :hotelCheckOut
end
