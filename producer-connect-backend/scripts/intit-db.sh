#!/bin/bash

# Make sure PostgreSQL is running
if ! pg_isready; then
    echo "PostgreSQL is not running. Starting PostgreSQL..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew services start postgresql
    else
        # Linux
        sudo service postgresql start
    fi
fi

# Create user if it doesn't exist
sudo -u postgres psql -c "SELECT 1 FROM pg_roles WHERE rolname='producer_user'" | grep -q 1 || \
    sudo -u postgres psql -c "CREATE USER producer_user WITH PASSWORD 'producer_password' CREATEDB;"

# Run the Node.js setup script
node scripts/setup-db.js
