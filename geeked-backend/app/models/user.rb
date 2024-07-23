class User < ApplicationRecord
  has_many :ratings
  has_many :animes, through: :ratings

  validates :email, presence: true, uniqueness: true
end
