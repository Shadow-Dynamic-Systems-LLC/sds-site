<?php
header('Content-Type: application/json');

define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database');
define('DB_USER', 'your_user');
define('DB_PASS', 'your_password');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

function clean(string $val): string {
    return trim(strip_tags($val));
}

$formName    = clean($_POST['form_name']    ?? '');
$contactType = clean($_POST['contact_type'] ?? '');
$email       = clean($_POST['email']        ?? '');
$name        = clean($_POST['name']         ?? '');
$vertical    = clean($_POST['vertical']     ?? '');

if (!$formName || !$contactType || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid input']);
    exit;
}

$payloadKeys = [
    'partnership_kind', 'partnership_value',
    'current_infrastructure', 'integration_needs',
    'timeline', 'problem_description',
    'publication', 'topics', 'deadline',
    'investor_stage', 'thesis', 'key_question',
    'newsletter_publication', 'newsletter_frequency',
    'message',
];

$payload = [];
foreach ($payloadKeys as $key) {
    if (!empty($_POST[$key])) {
        $payload[$key] = clean($_POST[$key]);
    }
}

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare('
        INSERT INTO contact_submissions
            (form_name, contact_type, email, name, vertical, payload, ip_address)
        VALUES
            (:form_name, :contact_type, :email, :name, :vertical, :payload, :ip)
    ');

    $stmt->execute([
        ':form_name'    => $formName,
        ':contact_type' => $contactType,
        ':email'        => $email,
        ':name'         => $name    ?: null,
        ':vertical'     => $vertical ?: null,
        ':payload'      => $payload  ? json_encode($payload) : null,
        ':ip'           => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);

    echo json_encode(['ok' => true]);

} catch (PDOException $e) {
    error_log('contact.php DB error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Database error']);
}
