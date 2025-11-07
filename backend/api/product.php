<?php
ini_set('display_errors', 1); // Enable error display
ini_set('display_startup_errors', 1); // Show startup errors
error_reporting(E_ALL); // Report all types of errors
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        $this->host = $_ENV['DB_HOST']??'localhost:3306';
        $this->db_name = $_ENV['DB_NAME']??'bansach';
        $this->username = $_ENV['DB_USER']??'root';
        $this->password = $_ENV['DB_PASS']??'';
    }

    public function connect() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=$this->host;dbname=$this->db_name;charset=utf8",
                $this->username,
                $this->password 
            );
            $this->query('set names utf8');
           $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Database connection failed..: " . $e->getMessage()]);
            exit;
        }
        return $this->conn;
    }
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$database = new Database(); 
$db = $database->connect();

try {
    $query = "SELECT book_id as id, book_name as name, price, img FROM book ";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $products
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}

