<?php

require_once("classes/constants.php");


/*
$value = "
123 = 1 CHF
677689 = 0.5 USD
6789;0.5
";

$rows = preg_split( '#\n#', $value, -1, PREG_SPLIT_NO_EMPTY );
foreach ( $rows as $row ) {
	$row = trim( $row );
	if ( empty($row) ) continue;
	
	
	var_dump($row);
	
	if ( preg_match('#(.+?)  \s* [=>;/] \s*  ([0-9.]+) \s* ([a-z]{3})? #ix', $row, $sub ) ) {
		
		$phone = preg_replace('#[^0-9+()]#', '', $sub[1]);
		//if ( strlen($phone) < 5 ) continue;
		
		$currency = 'USD';
		
		$row_insert = [
			"phone" => $phone,
			"cost_usd" => $sub[2],
		];
		
		if ( isset($sub[3]) ) $currency = strtoupper( $sub[3] );
		
		if ( !in_array( $currency, ['CHF', 'USD', 'EUR'] ) ) continue;
		
		if ( $currency == "CHF" ) $row_insert["cost_usd"] *= RATE_CHF_USD;
		elseif ( $currency == "EUR" ) $row_insert["cost_usd"] *= RATE_EUR_USD;
	
		var_dump($row_insert);
	};
	
	
	
	
		
};
*/





/*
$num_row = 0;
$csv_fn = "uploads/mobile_calls.csv";
$new_csv = "";
if (($handle = fopen( $csv_fn, "r")) !== FALSE) {
	
	while (($csv = fgetcsv($handle, 50000, $separator = ";")) !== FALSE) {

		$new_row = [ $csv[0], $csv[1], $csv[2], $csv[6], $csv[7] ];
		$new_csv .= implode(";", $new_row) . "\n";
		
		$num_row++;

	}
	
	file_put_contents("short-variant.csv", $new_csv);
};

exit();
*/

//unset($_SESSION["user"]);

if ( isset($_FILES['csv_import']) ) {

	$options = [];
	
	$options["skip_zero_cost"] =  ( isset($_REQUEST["skip_zero_cost"]) && $_REQUEST["skip_zero_cost"] == "on" ) ? true : false; 
	$options["only_sec_duration"] =  ( isset($_REQUEST["only_sec_duration"]) && $_REQUEST["only_sec_duration"] == "on" ) ? true : false; 
	$options["phone_curr"] =  ( isset($_REQUEST["phone_curr"]) ) ? $_REQUEST["phone_curr"] : 'USD'; 
	

	$csv_fn = 'uploads/' . basename($_FILES['csv_import']['name']);	

	if (move_uploaded_file($_FILES['csv_import']['tmp_name'], $csv_fn)) {
		csvParser::parse( $csv_fn, $options );
		header('Location: /');
	};
	
};


/*	
$csv_fn = "uploads/mobile_calls.csv";
// $csv_fn = "uploads/landline_calls.csv";

csvParser::parse( $csv_fn );
var_dump( csvParser::$alert );
	
exit();
*/


require_once("templates/index-page.php");