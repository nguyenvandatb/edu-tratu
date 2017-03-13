class AddSenderToRequestOrgUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :request_org_users, :sender_id, :integer
  end
end
