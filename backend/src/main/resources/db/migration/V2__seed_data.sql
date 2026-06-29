-- Seed roles and permissions
INSERT INTO permissions (name, description) VALUES
    ('content:read', 'Read any content'),
    ('content:write', 'Create and edit content'),
    ('content:delete', 'Delete content'),
    ('users:manage', 'Manage users and roles'),
    ('settings:manage', 'Manage church settings'),
    ('media:upload', 'Upload media files');

INSERT INTO roles (name, description) VALUES
    ('ADMIN', 'Full system access'),
    ('EDITOR', 'Can manage content');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'ADMIN';

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'EDITOR' AND p.name IN ('content:read', 'content:write', 'media:upload');

-- Seed admin user (password: admin123)
INSERT INTO users (first_name, last_name, email, password, enabled)
VALUES ('Admin', 'User', 'admin@fhbck.org',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    true);

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'admin@fhbck.org' AND r.name = 'ADMIN';

-- Seed ministries
INSERT INTO ministries (name, tagline, description, slug, sort_order, active, hero_image_position) VALUES
    ('Children''s Ministry', 'Nurturing faith in our youngest hearts', 'Our Children''s Ministry is dedicated to teaching children about God''s love through engaging lessons, fun activities, and meaningful relationships.', 'children', 1, true, 'center 30%'),
    ('Youth Ministry', 'Empowering the next generation', 'The Youth Ministry provides a safe and welcoming environment for teenagers to grow in their faith, build lasting friendships, and discover their purpose in Christ.', 'youth', 2, true, 'center 30%'),
    ('Women''s Ministry', 'Sisters in faith, united in love', 'The Women''s Ministry gathers women of all ages to grow in their relationship with God, support one another, and serve our community with grace and compassion.', 'women', 3, true, 'center 30%'),
    ('Men''s Ministry', 'Strength in brotherhood, faith in action', 'The Men''s Ministry challenges men to grow as leaders in their families, church, and community through faith, fellowship, and service.', 'men', 4, true, 'center 30%'),
    ('Young Couples Ministry', 'Building marriages on a foundation of faith', 'The Young Couples Ministry supports married and engaged couples in building strong, Christ-centered relationships through fellowship, mentorship, and biblical teaching.', 'young-couples', 5, true, 'center 30%'),
    ('Worship & Music Ministry', 'Lifting hearts in praise', 'The Worship & Music Ministry leads our congregation in heartfelt worship, creating an atmosphere where people can encounter God through music and song.', 'worship', 6, true, 'center 30%');

-- Seed church settings
INSERT INTO church_settings (setting_key, setting_value, description) VALUES
    ('church.name', 'First Haitian Baptist Church of Kissimmee', 'Church name'),
    ('church.address', '1200 E Cypress St, Kissimmee, FL 34744', 'Church address'),
    ('church.phone', '(407) 555-0123', 'Church phone number'),
    ('church.email', 'info@fhbck.org', 'Church email'),
    ('church.service_time', 'Sundays at 10:00 AM & Wednesdays at 7:00 PM', 'Service times'),
    ('church.social_facebook', 'https://facebook.com/fhbck', 'Facebook URL'),
    ('church.social_youtube', 'https://youtube.com/@fhbck', 'YouTube URL'),
    ('church.social_instagram', 'https://instagram.com/fhbck', 'Instagram URL'),
    ('church.about_title', 'Our Church', 'About page title'),
    ('church.about_subtitle', 'A Place for Everyone', 'About page subtitle'),
    ('church.about_description', 'First Haitian Baptist Church of Kissimmee is a vibrant, multi-generational community of believers dedicated to worshiping God, growing in faith, and serving others.', 'About page description');

-- Seed hero slides
INSERT INTO hero_slides (title, subtitle, image_url, cta_text, cta_link, sort_order, page) VALUES
    ('Welcome to FHBCK', 'Join us as we worship, grow, and serve together in faith', '/images/hero-bg.jpg', 'Plan Your Visit', '/visit', 1, 'homepage'),
    ('Growing in Faith', 'Deepen your relationship with God through our ministries', '/images/hero-worship.jpg', 'Explore Ministries', '/ministries', 2, 'homepage'),
    ('Serving Our Community', 'Together we make a difference in Kissimmee and beyond', '/images/hero-community.jpg', 'Get Involved', '/get-involved', 3, 'homepage');

-- Seed pastor
INSERT INTO pastors (name, title, image_url, bio, message, email)
VALUES ('Pastor Jean Smith', 'Senior Pastor', '/images/staff/pastor.jpg', 'Pastor Jean Smith has been leading FHBCK since 2010...', 'Welcome to our church family! Whether you are visiting for the first time or have been with us for years, we are glad you are here.', 'pastor@fhbck.org');
