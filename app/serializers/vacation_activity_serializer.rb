class VacationActivitySerializer < ActiveModel::Serializer
  attributes :id
  has_one :vacation
  has_one :activity
end
