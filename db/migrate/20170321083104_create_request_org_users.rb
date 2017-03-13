class CreateRequestOrgUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :request_org_users do |t|
      t.integer :sender_status, default: 0
      t.integer :receiver_status, default: 2
      t.references :user, foreign_key: true
      t.references :organization, foreign_key: true

      t.timestamps
    end
  end
end
