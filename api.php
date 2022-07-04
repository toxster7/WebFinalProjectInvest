<?php
require_once("classes/constants.php");

$api = new API();

switch ( $api->request ) {
	
	
	
	case "get/auth":		$api->getAuth(); 	break;
	case "post/auth":	$api->postAuth();	break;
	case "delete/auth":	$api->deleteAuth();	break;
	
	
	// ~~~~~~~~~~~			users
	case "get/users":		$api->getUsers(); 	break;
	case "get/user":		$api->getUser(); 	break;
	
	case "patch/user":		$api->patchUser(); 	break;
	case "post/user":		$api->postUser(); 	break;
	case "delete/user":		$api->deleteUser(); 	break;
	
	
	// ~~~~~~~~~~~			shares
	case "get/shares":		$api->getShares(); 	break;
	case "get/share":		$api->getShare(); 	break;
	
	case "patch/share":		$api->patchShare(); 	break;
	case "post/share":		$api->postShare(); 	break;
	case "delete/share":		$api->deleteShare(); 	break;

	
	// ~~~~~~~~~~~			logs
	case "get/logs":		$api->getLogs(); 	break;
	case "post/logs":		$api->postLogs(); 	break;

	
	
	default: $api->error( "Unknown request \"{$api->request}\"" );
};

$api->output();
