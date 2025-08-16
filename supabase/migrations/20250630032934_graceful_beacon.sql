-- MySQL Database Schema for MDRRMO Application
-- Run this script in your MySQL database to create the required tables

-- Create database (optional - run if creating new database)
-- CREATE DATABASE mdrrmo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE mdrrmo_db;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'editor',
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- News table
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    image VARCHAR(500),
    author VARCHAR(100),
    status ENUM('published', 'draft') DEFAULT 'draft',
    date DATE DEFAULT (CURRENT_DATE),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'Shield',
    tags JSON,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Incident reports table
CREATE TABLE IF NOT EXISTS incident_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference_number VARCHAR(20) UNIQUE NOT NULL,
    reporter_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    location VARCHAR(255),
    incident_type VARCHAR(50),
    description TEXT,
    urgency ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',
    status ENUM('pending', 'in-progress', 'resolved') DEFAULT 'pending',
    date_reported TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    category VARCHAR(50),
    date DATE DEFAULT (CURRENT_DATE),
    location VARCHAR(255),
    tags JSON,
    status ENUM('published', 'draft') DEFAULT 'draft',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- About sections table
CREATE TABLE IF NOT EXISTS about_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(500),
    order_index INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    meta_description TEXT,
    status ENUM('published', 'draft') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Emergency alerts table
CREATE TABLE IF NOT EXISTS emergency_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('typhoon', 'earthquake', 'flood', 'fire', 'landslide', 'tsunami', 'general') NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    location VARCHAR(255),
    coordinates JSON,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    status ENUM('draft', 'active', 'expired', 'cancelled') DEFAULT 'draft',
    channels JSON,
    sent_to JSON,
    priority INT DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Social posts table
CREATE TABLE IF NOT EXISTS social_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform ENUM('facebook', 'twitter', 'instagram', 'youtube') NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(500),
    link VARCHAR(500),
    scheduled_time TIMESTAMP NULL,
    status ENUM('draft', 'scheduled', 'published', 'failed') DEFAULT 'draft',
    engagement JSON DEFAULT ('{"likes": 0, "shares": 0, "comments": 0}'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (username, email, password_hash, role, name) VALUES
('admin', 'admin@mdrrmo.gov.ph', '$2b$10$example_hash_here', 'admin', 'MDRRMO Administrator'),
('editor', 'editor@mdrrmo.gov.ph', '$2b$10$example_hash_here', 'editor', 'Content Editor');

INSERT INTO news (title, excerpt, content, image, author, status, date) VALUES
('BDRRM Planning Training Workshop for Barangay Officials', 'On June 25, 2024, the Municipal Disaster Risk Reduction and Management Office (MDRRMO) conducted an essential training session...', 'Full content of the news article would go here...', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575265/487673077_1062718335885316_7552782387266701410_n_gexfn2.jpg', 'MDRRMO Staff', 'published', '2024-06-29'),
('Successful Nationwide Simultaneous Earthquake Drill Conducted', 'The municipality participated in the 2nd quarter nationwide simultaneous earthquake drill with over 5,000 participants...', 'Full content of the news article would go here...', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575261/489043126_1065374988952984_1331524645056736117_n_fbmvch.jpg', 'MDRRMO Staff', 'published', '2023-06-09');

INSERT INTO services (title, description, icon, tags, status) VALUES
('Disaster Prevention & Mitigation', 'Immediate response to disaster-related emergencies with our trained response teams.', 'Shield', '["Search & Rescue", "Medical Assistance", "Fire Response"]', 'active'),
('Disaster Preparedness', 'Regular training programs for community members, volunteers, and responders.', 'Heart', '["First Aid Training", "DRRM Workshops", "Drills"]', 'active'),
('Disaster Response', 'Comprehensive hazard, vulnerability, and capacity assessments for communities.', 'Truck', '["Flood Mapping", "Risk Analysis", "Mitigation Plans"]', 'active'),
('Disaster Recovery & Rehabilitation', 'Engagement initiatives to build disaster-resilient communities.', 'Home', '["Barangay DRRM", "School Programs", "Volunteer Network"]', 'active');

INSERT INTO about_sections (title, content, order_index, is_active) VALUES
('Mission', 'To ensure the safety and resilience of Pio Duran through effective disaster risk reduction and management.', 1, TRUE),
('Vision', 'A disaster-resilient community with zero casualties through proactive preparedness and efficient response.', 2, TRUE),
('Goal', 'To reduce vulnerability and enhance capacity of communities to prepare for, respond to, and recover from disasters.', 3, TRUE);

INSERT INTO gallery (title, description, image, category, date, location, tags, status, featured) VALUES
('BDRRM Planning Training Workshop', 'Training session on Barangay Disaster Risk Reduction and Management Planning at Barangay Basicao Interior.', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575265/487673077_1062718335885316_7552782387266701410_n_gexfn2.jpg', 'Training', '2024-06-25', 'Barangay Basicao Interior', '["BDRRM", "Training", "Workshop", "Barangay Officials"]', 'published', TRUE),
('Nationwide Simultaneous Earthquake Drill', 'Municipality participated in the 2nd quarter nationwide simultaneous earthquake drill with over 5,000 participants.', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575261/489043126_1065374988952984_1331524645056736117_n_fbmvch.jpg', 'Drill', '2023-06-09', 'Municipality-wide', '["Earthquake", "Drill", "Safety", "Community"]', 'published', FALSE),
('Water Rescue Training Course', '20 volunteers completed intensive training in Basic Life Support, survival skills, and Water Search and Rescue (WASAR).', 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575263/472984055_1002760098547807_5747993743270536498_n_cgi07u.jpg', 'Training', '2021-11-19', 'Training Center', '["Water Rescue", "WASAR", "Volunteers", "Life Support"]', 'published', FALSE);