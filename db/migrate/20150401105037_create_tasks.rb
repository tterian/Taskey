class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :status
      t.string :poster
      t.text :description
      t.integer :total
      t.references :user, index: true

      t.timestamps null: false
    end

  end
end
