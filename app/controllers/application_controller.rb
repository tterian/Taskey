class ApplicationController < ActionController::Base
	include ActionController::MimeResponds
	include DeviseTokenAuth::Concerns::SetUserByToken
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
	respond_to :html, :json

#	before_action :configure_permitted_parameters, if: :devise_controller?
	protect_from_forgery with: :exception



	# CSRF protection
	# code borrowed from http://stackoverflow.com/questions/14734243/rails-csrf-protection-angular-js-protect-from-forgery-makes-me-to-log-out-on
	after_filter :set_csrf_cookie_for_ng

	def set_csrf_cookie_for_ng
		cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
	end

	protected

	def verified_request?
		super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
	end
	
#	def configure_permitted_parameters
#		devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :image) }
#	end
end
