require 'net/http'
require 'json'

class AnimesController < ApplicationController
  before_action :set_anime, only: [:show, :update, :destroy]

  def index
    if params[:search]
      @animes = Anime.where('title ILIKE ?', "%#{params[:search]}%")
    else
      @animes = Anime.all
    end
    render json: @animes
  end

  def show
    render json: @anime
  end

  def create
    @anime = Anime.new(anime_params)
    if @anime.save
      render json: @anime, status: :created
    else
      render json: @anime.errors, status: :unprocessable_entity
    end
  end

  def update
    if @anime.update(anime_params)
      render json: @anime
    else
      render json: @anime.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @anime.destroy
    head :no_content
  end

  def search
    search_term = params[:search]
    Rails.logger.info "Searching for: #{search_term}"

    uri = URI("https://graphql.anilist.co")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(uri.request_uri, { 'Content-Type' => 'application/json' })
    query = {
      query: "
        query ($search: String) {
          Page(perPage: 10) {
            media(search: $search, type: ANIME) {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
              }
              averageScore
              description
              episodes
              genres
            }
          }
        }
      ",
      variables: { search: search_term }
    }
    request.body = query.to_json
    response = http.request(request)
    Rails.logger.info "Response: #{response.body}"

    render json: JSON.parse(response.body)
  end

  private

  def set_anime
    @anime = Anime.find(params[:id])
  end

  def anime_params
    params.require(:anime).permit(:title, :description, :cover_image, :average_score, :episodes, :genres)
  end
end
