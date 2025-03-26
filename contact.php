<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$response = ["status" => "error", "message" => "Something went wrong!"];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);

    if (empty($name) || empty($email) || empty($phone)) {
        $response["message"] = "All fields are required!";
        echo json_encode($response);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["message"] = "Invalid email format!";
        echo json_encode($response);
        exit;
    }

    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = 'mail.baharnani.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'admin@baharnani.com';
        $mail->Password   = '#S=7GOAC1SJ5';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('admin@baharnani.com', 'Google Ads Leads Exibition');
        $mail->addAddress('gaurav@baharnani.com', 'Gaurav');

        $mail->isHTML(true);
        $mail->Subject = 'Google Ads Leads Exibition';
        $mail->Body    = "Name: $name <br>Email: $email <br>Phone: $phone";

        $mail->send();
        $response = ["status" => "success", "message" => "Thank You! Our team will contact you within 24 hours"];
    } catch (Exception $e) {
        $response["message"] = "Message could not be sent. Mailer Error: " . $mail->ErrorInfo;
    }
}

echo json_encode($response);
exit;
