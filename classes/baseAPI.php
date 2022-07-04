<?php

class baseAPI {
	
	public $output = ["response" => [ "code" => 200 ]];
	
	public $success = true;

	
	public $post_params = null; 	
	public $method = null; 	
	public $request = null; 	
	
	
	public function fetch_params( $params, $strict = true ) {
		
		$res = [];
		
		foreach ( $params as $param_name ) {
			
			if ( in_array($this->method, ["get", "delete"]) ) {
				
				if ( !isset($_REQUEST[ $param_name ]) ) {
					if ( $strict ) $this->error( "Не передан параметр запроса - \"{$param_name}\"" );
				} else $res[ $param_name ] = $_REQUEST[ $param_name ];
				
			} else {
				
				if ( !isset($this->post_params[ $param_name ]) ) {
					if ( $strict ) $this->error( "Не передан параметр запроса - \"{$param_name}\"" );
				} else $res[ $param_name ] = $this->post_params[ $param_name ];
				
			}
		}
		
		return $this->success ? $res : false;
	}	
	
	
	public function pass_md5( $password ) {
		$password = trim( mb_strtolower( $password ));
		return md5( "Hsnd34fdds__sd3" . $password . "__dk3++:.d342dm,sm,csw34" );
	}	


	public function error( $error_name, $error_message = "" ) {
		$this->output["errors"][] = [ "name" => $error_name, "message" => $error_message ];
		$this->success = false;
	}


	public function error401( $error_name = "Error", $error_message = "Unauthorized" ) {
		$this->output["response"]["code"] = 401;
		$this->output["errors"][] = [ "name" => $error_name, "message" => $error_message ];
		$this->success = false;
	}




	public function error403( $error_name = "Error", $error_message = "Access denied" ) {
		$this->output["response"]["code"] = 403;
		$this->output["errors"][] = [ "name" => $error_name, "message" => $error_message ];
		$this->success = false;
	}
	
	public function success( $name, $message = "" ) {
		if ( !isset($this->output["messages"]) ) $this->output["messages"] = [];
		$this->output["messages"][] = [ "name" => $name, "message" => $message, "type" => "success" ];
	}
	

	public function output() {
		
		$this->output["success"] = isset($this->output["errors"]) ? false : $this->success;
		
		if ( !$this->output["success"] && !isset($this->output["errors"][0]) ) $this->output["errors"][] = [ "name" => "Unknown error" ];
		
		
		header('Content-Type: application/json; charset=utf-8');
		//http_response_code( $this->output["response"]["code"] );
		echo json_encode( $this->output );
		exit();
	}
	
	
	public function __get( $param_name ) {
		
		switch (	$param_name ) {
			case "session_role": 
				return isset($_SESSION["user"]["role"]) ? $_SESSION["user"]["role"] : false;
			break;
			case "session_id": 
				return isset($_SESSION["user"]["id"]) ? $_SESSION["user"]["id"] : false;
			break;
			default: trigger_error( "Unknown baseApi property - {$param_name}", E_USER_ERROR );
		}		
		
	}

	
	
	public function __construct() {
		$this->post_params = json_decode(file_get_contents("php://input"), TRUE);
		$this->method = isset($_SERVER["REQUEST_METHOD"]) ? mb_strtolower ($_SERVER["REQUEST_METHOD"] ) : 'get';
		$this->request = isset( $_SERVER["PATH_INFO"] ) ? $this->method . mb_strtolower( $_SERVER["PATH_INFO"] ) : $this->method;		
	}
	
}