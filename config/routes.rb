Rails.application.routes.draw do
  
  resources :user_vacations
  resources :vacation_activities
  resources :vacations
  resources :activities
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/auth", to: "users#show"

  get "/users/:user_id/vacations", to: "users#vacations_index"
  get "/users/:user_id/vacations/:vacation_id/activities", to: "users#activities_index"
end
