Rails.application.routes.draw do
  devise_for :users, controllers: {omniauth_callbacks: "omniauth_callbacks"}
  root "static_pages#home"
  post "/import", to: "word_imports#create"
  resources :dictionaries
  resources :searchs, only: [:index, :show]
  resources :auth, only: :index
  resources :categories
  resources :organizations
  resources :words
  namespace :admin do
    root "admins#index", as: :root
    resources :organizations, only: :index
  end
  namespace :api do
    get "/words", to: "words#index"
    get "/users", to: "users#index"
    get "/organizations", to: "organizations#index"
    resources :invitations, only: [:index, :create, :destroy]
    resources :requests, only: [:index, :create, :destroy]
  end
  mount ActionCable.server, at: '/cable'
end
