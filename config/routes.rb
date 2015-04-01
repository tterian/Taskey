Rails.application.routes.draw do
	
	devise_for :users
	root 'pages#home'

##	resources :users, defaults: { format: :json } do
		resources :tasks, defaults: { format: :json }
##	end

end
