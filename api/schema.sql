CREATE TABLE contact_submissions (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    form_name    VARCHAR(50)  NOT NULL,
    contact_type VARCHAR(50)  NOT NULL,
    email        VARCHAR(255) NOT NULL,
    name         VARCHAR(255),
    vertical     VARCHAR(100),
    payload      JSON,
    ip_address   VARCHAR(45),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email        (email),
    INDEX idx_contact_type (contact_type),
    INDEX idx_created_at   (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
