class CreateOrganizationMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :organization_members do |t|
      t.integer :role, default: 0
      t.integer :status
      t.references :user, foreign_key: true
      t.references :organization, foreign_key: true
      t.datetime :deleted_at
      t.index :deleted_at
      t.timestamps
    end
  end
end
