/* Replace with your SQL commands */
CREATE TABLE business (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    localisation VARCHAR(255) NOT NULL,
    siret VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    school_level VARCHAR(255) NOT NULL,
    localisation VARCHAR(255) NOT NULL,
    github_url VARCHAR(255) NOT NULL,
    linkedin_url VARCHAR(255) NOT NULL,
    why_me TEXT NOT NULL,
    resume_project TEXT,
    CONSTRAINT uk_email UNIQUE (email)
);

CREATE TABLE assets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_assets_users_id FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE `like` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    users_id INT NOT NULL,
    business_id INT NOT NULL,
    type ENUM('like', 'encourage'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_like_users_id FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_like_business_id FOREIGN KEY (business_id) REFERENCES business (id) ON DELETE CASCADE
);