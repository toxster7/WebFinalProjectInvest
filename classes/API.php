<?php

class API extends baseAPI {
	
	
	public function getAuth() {
		if ( isset($_SESSION["user"]) ) {
			$this->output["auth"] = true;	
			$this->output["login"] = $_SESSION["user"]["login"];
			$this->output["role"] = $_SESSION["user"]["role"];
			$this->output["name"] = $_SESSION["user"]["name"];
			$this->output["id"] = $_SESSION["user"]["id"];
		};
	}
	

	public function postAuth() {
		
		if ( $params = $this->fetch_params( ["login", "password"] ) ) {
			$login = trim( $params["login"] );
			$password = trim( $params["password"] );
			
			
			$oUser = iDB::row("SELECT * FROM users WHERE `login`=" . iS::sq($login) . " AND `password`=" . iS::sq($password) );
			
			if ( !is_null($oUser) ) {
				$_SESSION["user"] = [
					"id" => $oUser->id,
					"login" => $oUser->login,
					"role" => $oUser->role,
					"name" => $oUser->name,
				];
				
				$this->output = [
					"id" => $oUser->id,
					"auth" => true,
					"login" => $oUser->login,
					"role" => $oUser->role,
					"name" => $oUser->name,
				];
			} else {
				$this->error("You entered the wrong login or password");
				sleep(1);
			};
			
		};
	}

	
	public function deleteAuth() {
		unset ($_SESSION["user"] );
	}


	public function getUsers() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
			
		$query = "SELECT * FROM users U";				
		$this->output["data"] = iDB::rows_assoc( $query, []);
	}
	
	
	public function getUser() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["id"] ) ) {	
			$user_id = iS::n( $params["id"] );
			$this->output["data"] = iDB::row("SELECT * FROM users WHERE id={$user_id}", []);
		} else {
			$this->error("Error API");	
		}
	}	
	
	
	public function patchUser() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["id", "name", "login", "password", "email", "role", "phone_number", "address"], false) ) {	
			
			$user_id = iS::n( $params["id"] );
			unset( $params["id"] );
			
			iDB::updateSQL("users", $params, "id={$user_id}");
			
			$this->success("Success", "User data has been updated");	 
		} else {
			$this->error("Error API");	
		}
	}
	

	public function postUser() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		
		if ( $params = $this->fetch_params( ["name", "login", "password", "email", "role", "phone_number", "address"], false ) ) {
			 $user_id = iDB::insertSQL("users", $params);
			 if ( $user_id > 0 ) {
				
				$this->output["data"] = iDB::row("SELECT * FROM users WHERE id={$user_id}");	 
				$this->success("Success", "New user has been added");	 
				
			 } else {
				$this->error("Error", "User with this login already exists"); 
			 };
			 
		} else {
			$this->error("Error API");	
		};
			
	}


	public function deleteUser() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["id"] ) ) {
			iDB::delete("DELETE FROM users WHERE id=" . iS::n($params["id"]));
			$this->success("Success", "User was deleted");	
		} else {
			$this->error("Error API");	
		}	
			
	}	



	public function getShares() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
			
		$query = "SELECT * FROM shares";				
		$this->output["data"] = iDB::rows_assoc( $query, []);
	}


	public function getShare() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["id"] ) ) {	
			$user_id = iS::n( $params["id"] );
			$this->output["data"] = iDB::row("SELECT * FROM shares WHERE id={$user_id}", []);
		} else {
			$this->error("Error API");	
		}
	}

	public function patchShare() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["id", "symbol", "title", "rate", "type"], false ) ) {
			
			$item_id = iS::n( $params["id"] );
			unset( $params["id"] );
			
			iDB::updateSQL("shares", $params, "id={$item_id}");
			iDB::update("UPDATE shares SET time_updated=NOW() WHERE id={$item_id}");
			
			$this->success("Success", "Share data has been updated");	 
		} else {
			$this->error("Error API");	
		}
	}
	

	public function postShare() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		
		if ( $params = $this->fetch_params( ["symbol", "title", "rate", "type"], false ) ) {
			 $item_id = iDB::insertSQL("shares", $params);
			 
			$this->output["data"] = iDB::row("SELECT * FROM shares WHERE id={$item_id}");	 
			$this->success("Success", "New share has been added");	 
			 
		} else {
			$this->error("Error API");	
		};
			
	}


	public function deleteShare() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["id"] ) ) {
			iDB::delete("DELETE FROM shares WHERE id=" . iS::n($params["id"]));
			$this->success("Success", "Share was deleted");	
		} else {
			$this->error("Error API");	
		}	
			
	}	



	public function postLogs() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["user_name", "share_title", "share_type", "count", "rate", "total_sum"], false ) ) {
			 $item_id = iDB::insertSQL("logs", $params);
			 
			$this->output["data"] = iDB::row("SELECT * FROM logs WHERE id={$item_id}");	 
			$this->success("Success", "Purchase completed");	 
			 
		} else {
			$this->error("Error API");	
		};
			
	}








	public function getLogs() {
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		$this->output["data"] = iDB::rows_assoc("SELECT * FROM logs", []);
	}



	
	public function getServerTime() {
		$this->output["time"] = iDB::value("SELECT UNIX_TIMESTAMP()");
	}	
	


	
	function __construct() {
		parent::__construct();
	}		
	

	
	
}

