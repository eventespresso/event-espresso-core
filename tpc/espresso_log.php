<?php

/**
 * * Singleton logging class. Can be called from anywhere in the plugin to log data to a log file.
 * * Defaults to wp-content/uploads/espresso/logs/espresso_log.txt
 * */
//Usage
//espresso_log::singleton()->log( array ( 'file' => __FILE__, 'function' => __FUNCTION__, 'status' => '[INSERT MESSAGE]' ) );

class espresso_log {

	var $file;
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
		$fh = fopen($this->file, 'a') or die("Cannot open file! " . $this->file);
		fwrite($fh, '[' . date("m.d.y H:i:s") . ']' . '[' . basename($message['file']) . ']' . '[' . $message['function'] . ']' . ' [' . $message['status'] . ']//end ' . "\n");
		fclose($fh);
	}

	public function __clone() {
		trigger_error('Clone is not allowed.', E_USER_ERROR);
	}

}
