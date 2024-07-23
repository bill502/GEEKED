Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :ratings, only: [:index, :show, :create, :update, :destroy]
  resources :animes, only: [:index, :show, :create, :update, :destroy]
  get 'search_anime', to: 'animes#search'
end
