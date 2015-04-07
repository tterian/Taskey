Rails.application.routes.draw do

	root 'pages#home'
	scope '/api' do
		mount_devise_token_auth_for 'User', at: '/auth'
#		resources :users, defaults: { format: :json } do
			resources :tasks, defaults: { format: :json }
#			resources :groups, except: [:new, :edit]
#		end
	end

end
