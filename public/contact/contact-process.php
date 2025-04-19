<?php

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow requests from specific origins dynamically
$allowed_origins = ['http://localhost:8081', 'http://localhost:8080'];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Rest of your code remains unchanged
$address = "rodriguemedor@gmail.com";
if (!defined("PHP_EOL")) define("PHP_EOL", "\r\n");

$error = false;
$fields = array('name', 'email', 'message', 'subject');

foreach ($fields as $field) {
    if (empty($_POST[$field]) || trim($_POST[$field]) == '') {
        $error = true;
    }
}

if (!$error) {
    $name = stripslashes($_POST['name']);
    $email = trim($_POST['email']);
    $message = stripslashes($_POST['message']);
    $subject = stripslashes($_POST['subject']);

    $e_subject = 'You\'ve been contacted by ' . $name . ' — ' . $subject;

    $e_body = "You have been contacted by: $name" . PHP_EOL . PHP_EOL;
    $e_body .= "E-mail: $email" . PHP_EOL . PHP_EOL;
    $e_body .= "Subject: $subject" . PHP_EOL . PHP_EOL;
    $e_body .= "Message:\r\n$message" . PHP_EOL . PHP_EOL;

    $msg = wordwrap($e_body, 70);

    $headers = "From: $email" . PHP_EOL;
    $headers .= "Reply-To: $email" . PHP_EOL;
    $headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
    $headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

    if (mail($address, $e_subject, $msg, $headers)) {
        error_log('Mail sent successfully to ' . $address);
        echo 'Success';
    } else {
        error_log('Failed to send mail to ' . $address);
        echo 'ERROR!';
    }
} else {
    error_log('Invalid form data ');
    echo 'Invalid form data';
}

?>