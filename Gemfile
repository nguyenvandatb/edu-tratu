source "https://rubygems.org"
ruby "2.3.1"

# Bundle edge Rails instead: gem "rails", github: "rails/rails"
gem "rails", ">= 5.0.0.rc1", "< 5.1"
# Use mysql as the database for Active Record
gem "mysql2", ">= 0.3.18", "< 0.5"
# Use SCSS for stylesheets
gem "sass-rails", "~> 5.0"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier", ">= 1.3.0"
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem "therubyracer", platforms: :ruby

# Use jquery as the JavaScript library
# gem "jquery-rails"
# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 3.0"
# Use ActiveModel has_secure_password
# gem "bcrypt", "~> 3.1.7"

# Use Capistrano for deployment
# gem "capistrano-rails", group: :development
gem "nokogiri", "~> 1.6.8"
gem "react-rails"
gem "react-rails-img"
gem "js-routes"
gem "active_model_serializers", "~> 0.10.0"

group :development, :test do
  # Call "byebug" anywhere in the code to stop execution and get a debugger console
  gem "byebug", platform: :mri
  gem "binding_of_caller"
  gem "rspec"
  gem "rspec-rails"
  gem "rspec-collection_matchers"
  gem "better_errors"
  gem "factory_girl_rails"
  gem "guard-rspec", require: false
  gem "faker"
  gem "pry"
  gem "database_cleaner"
  gem "brakeman", require: false
  gem "jshint"
  gem "bundler-audit"
  gem "rubocop", "~> 0.35.0", require: false
  gem "rubocop-checkstyle_formatter", require: false
  gem "scss_lint", require: false
  gem "scss_lint_reporter_checkstyle", require: false
  gem "eslint-rails"
  gem "rails_best_practices"
  gem "reek"
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem "web-console"
  gem "listen", "~> 3.0.5"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
end

group :test do
  gem "simplecov", require: false
  gem "simplecov-rcov", require: false
  gem "simplecov-json"
  gem "shoulda-matchers"
end

group :staging, :production do
  gem "capistrano"
  gem "capistrano-bundler"
  gem "capistrano-rails"
  gem "capistrano-rvm"
  gem "capistrano-sidekiq"
  gem "capistrano-passenger"
  gem "passenger", ">= 5.0.25", require: "phusion_passenger/rack_handler"
  gem "capistrano3-unicorn"
  gem "unicorn"
  # Use Puma as the app server
  # gem "puma", "~> 3.0"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "dotenv-rails"
gem "config"
gem "devise", git: "https://github.com/plataformatec/devise.git"
gem "unicorn-worker-killer"
gem "kaminari"
gem "bootstrap-kaminari-views"
gem "sidekiq"
gem "sidekiq-cron"
gem "redis-rack", git: "https://github.com/redis-store/redis-rack.git", branch: "master"
gem "redis-actionpack", git: "https://github.com/redis-store/redis-actionpack.git", branch: "master"
gem "redis-rails", git: "https://github.com/redis-store/redis-rails.git", branch: "master"
gem "redis-namespace"
gem "sinatra", git: "https://github.com/sinatra/sinatra.git"
gem "figaro"
gem "cancancan"
gem "paranoia", git: "https://github.com/rubysherpas/paranoia.git", branch: "rails4"
gem "ransack"
gem "state_machines-activerecord"
gem "carrierwave"
gem "fog"
gem "aws-sdk", "~> 1.66.0"
gem "capistrano-faster-assets"
gem "exir", git: "https://github.com/framgia/fimport.git", branch: "develop"
gem "friendly_id"
gem "omniauth-facebook"
gem "omniauth-google-oauth2"
gem "omniauth-twitter"
gem "puma"
