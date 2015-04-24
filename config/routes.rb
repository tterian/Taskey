Rails.application.routes.draw do

	root 'pages#home'
	scope '/api' do
		mount_devise_token_auth_for 'User', at: '/auth'
			resources :tasks, defaults: { format: :json }
	end

end
