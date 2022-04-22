/* Replace with your SQL commands */
ALTER TABLE users ADD cv VARCHAR(255) NOT NULL;
ALTER TABLE users ADD cv_created_at DATETIME DEFAULT CURRENT_TIMESTAMP();
