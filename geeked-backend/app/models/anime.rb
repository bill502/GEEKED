class Anime < ApplicationRecord
  has_many :ratings
  has_many :users, through: :ratings

  validates :title, presence: true
end
