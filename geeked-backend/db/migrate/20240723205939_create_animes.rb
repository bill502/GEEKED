class CreateAnimes < ActiveRecord::Migration[7.0]
  def change
    create_table :animes do |t|
      t.string :title
      t.text :description
      t.string :cover_image
      t.integer :average_score
      t.integer :episodes
      t.string :genres

      t.timestamps
    end
  end
end
