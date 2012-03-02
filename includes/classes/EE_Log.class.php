<?php

/**
 * * Singleton logging class. Can be called from anywhere in the plugin to log data to a log file.
 * * Defaults to wp-content/uploads/espresso/logs/espresso_log.txt
 * */
//Usage
//espresso_log::singleton()->log( array ( 'file' => __FILE__, 'function' => __FUNCTION__, 'status' => '[INSERT MESSAGE]' ) );

class espresso_log {

	var $file;
	var $url; //Used for remote logging
	private static $inst;

	//Set the file path - Change the file name is needed
	function __construct() {
		//echo __FILE__;
		//echo dirname( __FILE__ );
		$folder = EVENT_ESPRESSO_UPLOAD_DIR . 'logs/';
		//echo $folder;
		$this->file = $folder . 'espresso_log.txt';
	}

	public static function singleton() {
		if (!isset(self::$inst)) {
			$c = __CLASS__;
			self::$inst = new $c;
		}
		return self::$inst;
	}

	public function log($message) {
		if(!file_exists($this->file)) {
			touch($this->file);
		}
		if(is_writable($this->file)) {
		$fh = fopen($this->file, 'a') or die("Cannot open file! " . $this->file);
		fwrite($fh, '[' . date("m.d.y H:i:s") . ']' . '[' . basename($message['file']) . ']' . '[' . $message['function'] . ']' . ' [' . $message['status'] . ']//end ' . "\n");
		fclose($fh);
		} else {
			global $notices;
			$notices['errors'][] = sprintf(__('Your log file is not writable. Check if your server is able to write to %s.', 'event_espresso'), $this->file);
		}
	}

	public function remote_log($message) {
		global $remote_log;
		if(empty($remote_log)) $remote_log = '';
		$remote_log .= '[' . date("m.d.y H:i:s") . ']' . '[' . basename($message['file']) . ']' . '[' . $message['function'] . ']' . ' [' . $message['status'] . ']//end ' . "\n";
	}

	public function send_log($url) {
		global $remote_log;
		// send the $remote_log var to the server

		$file_name = $_SERVER['SCRIPT_FILENAME'];
		$domain = $_SERVER['HTTP_HOST'];
		$ip = $_SERVER['SERVER_ADDR'];
		$server_type = $_SERVER['SERVER_SOFTWARE'];
		$request_array = json_encode($_REQUEST);

		//Encrypt the $remote_log?
		//$remote_log = base64_encode($remote_log);

		//Encrypt the $request_array?
		//$request_array = base64_encode($request_array);

		$data = 'domain='.$domain
				.'&ip='.$ip
				.'&server_type='.$server_type
				.'&time='.time()
				.'&remote_log='.$remote_log
				.'&request_array='.$request_array //<-- Do we want to leave this turned on?
				.'&action=save';

		if ( defined('EELOGGING_PASS') ){
			$data .= '&pass='.EELOGGING_PASS;
		}

		if ( defined('EELOGGING_KEY') ){
			$data .= '&key='.EELOGGING_KEY;
		}


		$c = curl_init ($url);
		curl_setopt ($c, CURLOPT_POST, true);
		curl_setopt ($c, CURLOPT_POSTFIELDS, $data);
		curl_setopt ($c, CURLOPT_RETURNTRANSFER, true);
		$page = curl_exec ($c);
		curl_close ($c);
	}

	public function __clone() {
		trigger_error('Clone is not allowed.', E_USER_ERROR);
	}

}
