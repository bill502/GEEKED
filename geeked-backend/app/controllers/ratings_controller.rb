class RatingsController < ApplicationController
  def index
    @ratings = Rating.includes(:anime).all
    render json: @ratings.to_json(include: { anime: { only: [:title, :cover_image, :average_score] } })
  end

  def show
    @rating = Rating.find(params[:id])
    render json: @rating.to_json(include: { anime: { only: [:title, :cover_image, :average_score] } })
  end

  def create
    @rating = Rating.new(rating_params)
    if @rating.save
      render json: @rating.to_json(include: { anime: { only: [:title, :cover_image, :average_score] } }), status: :created
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  def update
    @rating = Rating.find(params[:id])
    if @rating.update(rating_params)
      render json: @rating.to_json(include: { anime: { only: [:title, :cover_image, :average_score] } })
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @rating = Rating.find(params[:id])
    @rating.destroy
    head :no_content
  end

  private

  def rating_params
    params.require(:rating).permit(:user_id, :anime_id, :rating)
  end
end
