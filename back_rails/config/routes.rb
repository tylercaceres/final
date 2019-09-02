Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root to: 'recipes#index'
  # resources :recipes, only: [:index]


  # a suggestion by someone online (to generate an API namespace)
  namespace :api do
    root to: 'recipes#index'
    resources :recipes, only: [:index, :new]
  end

end

