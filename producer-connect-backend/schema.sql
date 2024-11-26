-- Users Table
CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio TEXT, 
    skills VARCHAR(255), 
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    google_id VARCHAR(255) UNIQUE
);

-- Messages Table
CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(255) NOT NULL,
    description TEXT, 
    creator_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT NOW(), 
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Producer Profiles
CREATE TABLE producer_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    genres TEXT[],
    equipment TEXT[],
    portfolio_links TEXT[],
    social_links JSONB,
    rating DECIMAL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Collaborations
CREATE TABLE collaborations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    creator_id INT REFERENCES users(id),
    status VARCHAR(50),
    genre VARCHAR(100),
    requirements TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Events
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    host_id INT REFERENCES users(id),
    event_type VARCHAR(100),
    start_time TIMESTAMP,
    description TEXT,
    max_participants INT
);