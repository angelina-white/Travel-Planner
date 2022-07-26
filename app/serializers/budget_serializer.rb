class BudgetSerializer < ActiveModel::Serializer
  attributes :id, :hotel, :flight, :activities, :food, :shopping, :misc
  has_one :vacation
end
