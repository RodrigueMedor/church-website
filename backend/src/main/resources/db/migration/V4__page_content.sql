CREATE TABLE page_content (
    id BIGSERIAL PRIMARY KEY,
    page_key VARCHAR(255) NOT NULL UNIQUE,
    title TEXT,
    subtitle TEXT,
    content TEXT,
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_image_url TEXT,
    meta_data TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO page_content (page_key, title, subtitle, content, is_published) VALUES
('giving', 'Giving', 'Support the Ministry', '<p>Your generous giving supports the work of the ministry.</p>', true),
('zelle', 'Zelle Giving', 'Quick & Easy', '<p>Use Zelle to give directly to FHBCK.</p>', true),
('get-involved', 'Get Involved', 'Find Your Place', '<p>There are many ways to serve at FHBCK.</p>', true),
('privacy', 'Privacy Policy', 'How We Handle Your Data', '<p>Your privacy matters to us.</p>', true),
('terms', 'Terms of Service', 'Guidelines', '<p>Please read these terms carefully.</p>', true),
('team', 'Our Team', 'Meet Our Leadership', '<p>Our dedicated team serves the church and community.</p>', true);
