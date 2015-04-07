class User < ActiveRecord::Base
	# Include default devise modules.

	before_save do
		self.uid = SecureRandom.uuid
		skip_confirmation!
	end


	devise 	:database_authenticatable, :registerable,
			:recoverable, :rememberable, :trackable, :validatable,
			:confirmable, :omniauthable
	include DeviseTokenAuth::Concerns::User
end
