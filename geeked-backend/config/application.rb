require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

# Load environment variables from .env file
Dotenv::Rails

# config/application.rb
module GeekedBackend
  class Application < Rails::Application
    # ...
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000'  # Update with your frontend URL
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end
  end
end

