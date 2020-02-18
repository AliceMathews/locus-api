DROP TABLE IF EXISTS users
CASCADE;
DROP TABLE IF EXISTS images
CASCADE;
DROP TABLE IF EXISTS categories
CASCADE;
DROP TABLE IF EXISTS tags
CASCADE;

-- stretch
-- DROP TABLE IF EXISTS chatrooms
-- CASCADE;
-- DROP TABLE IF EXISTS messages
-- CASCADE;


-- https://img.icons8.com/ios-filled/344/user-female-circle.png for unknown female avatar
-- https://img.icons8.com/ios-filled/344/user-male-circle.png for unknown male avatar
CREATE TABLE users
(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255) DEFAULT 'https://img.icons8.com/ios-filled/344/user-male-circle.png',
    created_at TIMESTAMP DEFAULT now(),
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE sessions
(
    id SERIAL PRIMARY KEY NOT NULL,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    auth_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE images
(
    id SERIAL PRIMARY KEY NOT NULL,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    views INT,
    created_at TIMESTAMP DEFAULT now(),
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(75),
    cover_photo_url TEXT
);

CREATE TABLE tags
(
    id SERIAL PRIMARY KEY NOT NULL,
    image_id INTEGER REFERENCES images(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    confidence FLOAT
);

-- stretch
-- CREATE TABLE chatrooms
-- (
--     id SERIAL PRIMARY KEY NOT NULL,
--     userA_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     userB_id INTEGER REFERENCES users(id) ON DELETE CASCADE
-- );

-- CREATE TABLE messages
-- (
--     id SERIAL PRIMARY KEY NOT NULL,
--     owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     chatroom_id INTEGER REFERENCES chatrooms(id) ON DELETE CASCADE,
--     content TEXT,
--     created_at TIMESTAMP DEFAULT now()
-- );
