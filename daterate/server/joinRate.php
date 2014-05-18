<?php

/*
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/javascript');
if ($_REQUEST['method'] == 'OPTIONS') {
	echo '1';
	die;
}
*/

if (strtoupper($_SERVER['REQUEST_METHOD']) == 'GET') {
	print "{\"evaluation_id\":" . -1 . "}";
	return;
}

define("TOKEN_KEY", "token");
define("NAME_KEY", "myname");
define("GENDER_KEY", "gender");
define("EV_ID_KEY", "evaluation_id");
define("PASSWORD_KEY", "password");
define("NULL_KEY", "NULL");

class joinRate {

	protected $dbconn;

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

	function valid_post() {
		if (isset($_POST[TOKEN_KEY], 
				  $_POST[NAME_KEY],
				  $_POST[GENDER_KEY],
				  $_POST[EV_ID_KEY],
				  $_POST[PASSWORD_KEY])) {
			if ($_POST[TOKEN_KEY] != '' &&
				  $_POST[NAME_KEY] != '' &&
				  $_POST[GENDER_KEY] != '' &&
				  $_POST[EV_ID_KEY] != '') {
				return true;
			} else {
				return false;	
			}
		} else {
			return false;
		}
	}

	function send_bad_request() {
		header('Status: 400 Bad Request');
		header('HTTP/1.0 400 Bad Request');
		die("Error 400 - Bad Request");
	}

	function isnert_dr_user() {
		if (!$this->valid_post()) {
			$this->send_bad_request();
		}
		$token = $_POST[TOKEN_KEY];
		$name = $_POST[NAME_KEY];
		$gender = $_POST[GENDER_KEY];
		$ev_id = $_POST[EV_ID_KEY];
		$psw = NULL_KEY;

		$rate_status = 1;
		$rate = "";
		$user_picture = NULL_KEY;

		if(isset($_POST[PASSWORD_KEY])&&$_POST[PASSWORD_KEY]!="") {
			$psw = $_POST[PASSWORD_KEY];
		}
		//print "PSW: ".$psw."<br/>";									//Print PASSWORD

		//dr_evaluation táblában megkeressük a POST-al kapott ev_id sort
		$query1 = "SELECT * FROM dr_evaluation ";
		$query1 .= "WHERE (id=".$ev_id.");";
		//print $query1."<br/>";
		if ($result = $this->dbconn->query($query1)) {
			$row_cnt = $result->num_rows;
			//printf("Result set has %d rows.\n", $row_cnt);			//Print matched row count
			if($row_cnt == 0){
				$this->send_bad_request();
			} elseif ($row_cnt != 1){
				print "There is more matches!";
			}
			else {
				// USER add to dr_user
				$query2 = "INSERT INTO dr_user ";
				$query2 .= "(token, name, gender, password) ";
				$query2 .= "VALUES ('".$token."','".$name."',".$gender.",".$psw.");";
				//echo $query2."<br/>";
				if($stmt = $this->dbconn->prepare($query2)){
					$stmt->execute();
					$user_id = mysqli_insert_id($this->dbconn);
					print("{\"user_id\":".$user_id."}");					// Print added user_id
				} else {
					$this->send_bad_request();
				}

				// RATE add to dr_rate
				$this->rate_import($this->dbconn);
			}
		} else {
			$this->send_bad_request();
		}
	}

	function rate_import(&$conn) {
		$query3 = "INSERT INTO dr_rate ";
		$query3 .= "(evaluation_id, user_id, rate_status, rate, user_picture) ";
		$query3 .= "VALUES ('".$ev_id."','".$user_id."',".$rate_status.",'".$rate."',".$user_picture.");";
		//echo "<br/>".$query2."<br/>";
		if($stmt2 = $conn->prepare($query3)){
			$stmt2->execute();
			$rate_id = mysqli_insert_id($conn);
			print("{\"user_id\":".$rate_id."}");					// Print added rate_id
		} else {
			$this->send_bad_request();
		}
	}

	function delete_rows_from_evaluation(&$table) {
		$sql = "DELETE FROM ".$table;
		$sql .= " WHERE id <> ''";
		if (!mysqli_query($this->dbconn,$sql)) {
			die('Error: ' . mysqli_error($this->dbconn));
		}
		print("<br/>All rows dropped in ". $table);
	}
}

$api = new joinRate;
$api->isnert_dr_user();
$u = "dr_user";
$r = "dr_rate";
//$api->delete_rows_from_evaluation($u);
//$api->delete_rows_from_evaluation($r);


?>