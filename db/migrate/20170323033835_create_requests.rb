class CreateRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :requests do |t|
      t.references :user, foreign_key: true
      t.references :organization, foreign_key: true
      t.index [:user_id, :organization_id], unique: true
      t.timestamps
    end
  end
end
