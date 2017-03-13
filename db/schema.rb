# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170323033835) do

  create_table "activities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "action_id"
    t.integer  "action_type"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["user_id"], name: "index_activities_on_user_id", using: :btree
  end

  create_table "bookmarks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "word_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_bookmarks_on_user_id", using: :btree
    t.index ["word_id"], name: "index_bookmarks_on_word_id", using: :btree
  end

  create_table "categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "description"
    t.string   "slug"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["user_id"], name: "index_categories_on_user_id", using: :btree
  end

  create_table "dictionaries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "status"
    t.text     "description", limit: 65535
    t.string   "image"
    t.string   "slug"
    t.integer  "category_id"
    t.integer  "user_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["category_id"], name: "index_dictionaries_on_category_id", using: :btree
    t.index ["user_id"], name: "index_dictionaries_on_user_id", using: :btree
  end

  create_table "invitations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "organization_id"
    t.integer  "sender_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["organization_id"], name: "index_invitations_on_organization_id", using: :btree
    t.index ["user_id", "organization_id", "sender_id"], name: "index_invitations_on_user_id_and_organization_id_and_sender_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_invitations_on_user_id", using: :btree
  end

  create_table "organization_members", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "role",            default: 0
    t.integer  "status"
    t.integer  "user_id"
    t.integer  "organization_id"
    t.datetime "deleted_at"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["deleted_at"], name: "index_organization_members_on_deleted_at", using: :btree
    t.index ["organization_id"], name: "index_organization_members_on_organization_id", using: :btree
    t.index ["user_id"], name: "index_organization_members_on_user_id", using: :btree
  end

  create_table "organizations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.text     "description", limit: 65535
    t.string   "image"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "requests", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "organization_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["organization_id"], name: "index_requests_on_organization_id", using: :btree
    t.index ["user_id", "organization_id"], name: "index_requests_on_user_id_and_organization_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_requests_on_user_id", using: :btree
  end

  create_table "reviews", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.float    "rating",        limit: 24
    t.integer  "dictionary_id"
    t.integer  "user_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["dictionary_id"], name: "index_reviews_on_dictionary_id", using: :btree
    t.index ["user_id"], name: "index_reviews_on_user_id", using: :btree
  end

  create_table "shared_dictionaries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "dictionary_id"
    t.integer  "organization_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["dictionary_id"], name: "index_shared_dictionaries_on_dictionary_id", using: :btree
    t.index ["organization_id"], name: "index_shared_dictionaries_on_organization_id", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "address"
    t.string   "image"
    t.string   "phone"
    t.string   "uid"
    t.string   "provider"
    t.integer  "role",                   default: 1
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "word_details", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "kind"
    t.text     "meaning",    limit: 65535
    t.integer  "word_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["word_id"], name: "index_word_details_on_word_id", using: :btree
  end

  create_table "words", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "content"
    t.string   "meaning"
    t.string   "slug"
    t.integer  "dictionary_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["dictionary_id"], name: "index_words_on_dictionary_id", using: :btree
  end

  add_foreign_key "activities", "users"
  add_foreign_key "bookmarks", "users"
  add_foreign_key "bookmarks", "words"
  add_foreign_key "categories", "users"
  add_foreign_key "dictionaries", "categories"
  add_foreign_key "dictionaries", "users"
  add_foreign_key "invitations", "organizations"
  add_foreign_key "invitations", "users"
  add_foreign_key "organization_members", "organizations"
  add_foreign_key "organization_members", "users"
  add_foreign_key "requests", "organizations"
  add_foreign_key "requests", "users"
  add_foreign_key "reviews", "dictionaries"
  add_foreign_key "reviews", "users"
  add_foreign_key "shared_dictionaries", "dictionaries"
  add_foreign_key "shared_dictionaries", "organizations"
  add_foreign_key "word_details", "words"
  add_foreign_key "words", "dictionaries"
end
