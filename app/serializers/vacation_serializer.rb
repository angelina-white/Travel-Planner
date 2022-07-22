class VacationSerializer < ActiveModel::Serializer
  attributes :id, :vacationName, :dFlightM, :aFlightM, :dFlightD, :aFlightD, :dFlightY, :aFlightY, :dFlightH, :aFlightH, :dFlightMin, :aFlightMin, :iHotelH, :oHotelH, :iHotelM, :oHotelM
end
