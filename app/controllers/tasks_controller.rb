class TasksController < ApplicationController

	respond_to :json
	

	def index
		respond_with Task.all
	end

	def create
		task = Task.new(task_params)
		task.save
		
		render json: task, status: 201
	end

	def update
		task = Task.find(params[:id])
		task.update_attributes(task_params)
		
		render nothing: true, status: 201
	end

	def show
		task = Task.find(params[:id])
		render json: task
	end

	def destroy
		task = Task.find(params[:id]).destroy
		respond_with Task.all
	end


	private

	def task_params
		attributes = [
			:title,
			:description,
			:total,
			:user_id
		]
		params.require(:task).permit(attributes)
	end


end
