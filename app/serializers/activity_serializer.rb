class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :activityName, :aMonth, :aDay, :aYear, :aHour, :aMinute
end
