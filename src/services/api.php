<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Kết nối database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Xử lý request
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api/', '', $path);

// API Endpoints
switch ($path) {
    case 'login':
        if ($method === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            $email = $data['email'];
            $password = $data['password'];
            
            $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
            $result = $conn->query($sql);
            
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                echo json_encode([
                    'success' => true,
                    'token' => generateToken($user['id']),
                    'user' => $user
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            }
        }
        break;
        
    case 'documents':
        if ($method === 'GET') {
            $sql = "SELECT * FROM documents";
            $result = $conn->query($sql);
            $documents = [];
            
            while($row = $result->fetch_assoc()) {
                $documents[] = $row;
            }
            
            echo json_encode($documents);
        }
        break;
        
    case 'groups':
        if ($method === 'GET') {
            $sql = "SELECT * FROM groups";
            $result = $conn->query($sql);
            $groups = [];
            
            while($row = $result->fetch_assoc()) {
                $groups[] = $row;
            }
            
            echo json_encode($groups);
        }
        break;
}

function generateToken($userId) {
    return base64_encode($userId . ':' . time());
}

$conn->close();
?> 