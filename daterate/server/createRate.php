<?php

/*
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/javascript');

if ($_REQUEST['method'] === 'OPTIONS') {
    echo '1';
    die;
}
*/

if (strtoupper($_SERVER['REQUEST_METHOD']) == 'GET') {
	print "{\"evaluation_id\":" . -1 . "}";
	return;
}

define("SHEMA_TYPE_KEY", "shemaType");
define("USER_COUNT_KEY", "userCount");

class createRate {

	private $dbconn;

	private $host = "localhost";
	private $user = "daterate_lg";
	private $pass = "n1ncs";
	private $db = "daterate_tables";
	private $port = 3306;


	function __construct() {
		$this->dbconn = new mysqli($this->host, $this->user, $this->pass, $this->db);
		if ($this->dbconn->connect_errno) {
			die('Could not connect: ' . $this->dbconn->connect_error);
		} else {
			//echo "Connection estabilished!<br/>";
		}
	}

	function __destruct() {
		$this->dbconn->close();
	}

	function isnert_dr_evaluation() {
		$uc = $_POST[USER_COUNT_KEY];
		$si = $_POST[SHEMA_TYPE_KEY];

		$sql = "INSERT INTO dr_evaluation ";
		$sql .= "(total_voter_count, schema_id) ";
		$sql .= "VALUES (".$uc.",".$si.");";
		$result = mysqli_query($this->dbconn,$sql);
		/*if (!mysqli_query($this->dbconn,$sql)) {
			die('Error: ' . mysqli_error($this->dbconn));
		}*/
		$id = mysqli_insert_id($this->dbconn);
		print("{\"evaluation_id\":".$id."}");
	}

	function show_all_rows(&$table) {
		$sql = "SELECT * FROM ".$table;
		$result = mysqli_query($this->dbconn,$sql);
		while ($row = mysqli_fetch_assoc($result)) {
			print_r($row);
		}
	}

	function delete_rows_from_evaluation() {
		$sql = "DELETE FROM dr_evaluation ";
		$sql .= "WHERE id <> ''";
		if (!mysqli_query($this->dbconn,$sql)) {
			die('Error: ' . mysqli_error($this->dbconn));
		}
		print("All rows dropped");
	}
}

$api = new createRate;
$api->isnert_dr_evaluation();
$t = "dr_evaluation";
//$api->show_all_rows($t);
//$api->delete_rows_from_evaluation();


?>