<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * * Singleton logging class. Can be called from anywhere in the plugin to log data to a log file.
 * * Defaults to wp-content/uploads/espresso/logs/espresso_log.txt
 * */
//Usage
//espresso_log::singleton()->log( array ( 'file' => __FILE__, 'function' => __FUNCTION__, 'status' => '[INSERT MESSAGE]' ) );

class espresso_log {

	var $file;
	var $folder;
	var $url; //Used for remote logging
	private static $inst;

	//Set the file path - Change the file name is needed
	function __construct() {
		//echo __FILE__;
		//echo dirname( __FILE__ );
		$this->folder = EVENT_ESPRESSO_UPLOAD_DIR . 'logs/';
		//echo $folder;
		$this->file = $this->folder . 'espresso_log.txt';
		
		$uploads = wp_upload_dir();
		if (!is_dir(EVENT_ESPRESSO_UPLOAD_DIR) && is_writable($uploads['baseurl'])) {
			mkdir(EVENT_ESPRESSO_UPLOAD_DIR);
		}
		if (!is_dir(EVENT_ESPRESSO_UPLOAD_DIR.'logs') && is_writable(EVENT_ESPRESSO_UPLOAD_DIR)) {
			mkdir(EVENT_ESPRESSO_UPLOAD_DIR.'logs');
		}
		
		if (is_writable(EVENT_ESPRESSO_UPLOAD_DIR.'logs') && !file_exists($this->file)) {
			touch($this->file);
		}
		if (is_writable(EVENT_ESPRESSO_UPLOAD_DIR.'logs') && !file_exists($this->folder.'espresso_debug.php')) {
			touch($this->folder.'espresso_debug.php');
		}
	}

	public static function singleton() {
		if (!isset(self::$inst)) {
			$c = __CLASS__;
			self::$inst = new $c;
		}
		return self::$inst;
	}

	public function log($message) {
		if ( isset( $message['type'] ) ) {
			$this->file = $this->folder . 'espresso_debug_' . $message['type'] . '.txt';
			
			if (is_writable(EVENT_ESPRESSO_UPLOAD_DIR.'logs') && !file_exists($this->file)) {
				touch($this->file);
			}
		}

		if (is_writable($this->file)) {
			$fh = fopen($this->file, 'a') or die("Cannot open file! " . $this->file);
			fwrite($fh, '[' . date("m.d.y H:i:s") . '], ' . basename($message['file']) . ' ->' . $message['function'] . ',  ' . $message['status'] . "\n");
			fclose($fh);
		} else {
			global $notices;
			$notices['errors'][] = sprintf(__('Your log file is not writable. Check if your server is able to write to %s.', 'event_espresso'), $this->file);
		}
	}

	public function remote_log($message) {
		global $remote_log;
		if (empty($remote_log))
			$remote_log = '';
		$remote_log .= '[' . date("m.d.y H:i:s") . '], ' . basename($message['file']) . ' -> ' . $message['function'] . ',  ' . $message['status'] . "\n";
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

		$data = 'domain=' . $domain
						. '&ip=' . $ip
						. '&server_type=' . $server_type
						. '&time=' . time()
						. '&remote_log=' . $remote_log
						. '&request_array=' . $request_array //<-- Do we want to leave this turned on?
						. '&action=save';

		if (defined('EELOGGING_PASS')) {
			$data .= '&pass=' . EELOGGING_PASS;
		}

		if (defined('EELOGGING_KEY')) {
			$data .= '&key=' . EELOGGING_KEY;
		}


		$c = curl_init($url);
		curl_setopt($c, CURLOPT_POST, true);
		curl_setopt($c, CURLOPT_POSTFIELDS, $data);
		curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
		$page = curl_exec($c);
		curl_close($c);
	}

	public function __clone() {
		trigger_error('Clone is not allowed.', E_USER_ERROR);
	}

}

global $org_options;

//Create logging function and action
function espresso_log($file, $function, $message) {
	espresso_log::singleton()->log(array('file' => $file, 'function' => $function, 'status' => $message));
}

function espresso_log_shortcode_parser( $file, $function, $message ) {
	espresso_log::singleton()->log(array('file' => $file, 'function' => $function, 'status' => $message, 'type' => 'shortcode_parser') );
}

if (!empty($org_options['full_logging'])) {
	add_action('action_hook_espresso_log', 'espresso_log', 10, 3);
	add_action('action_hook_espresso_log_shortcode_parser', 'espresso_log_shortcode', 10, 3);
	add_action('action_hook_espresso_debug_file', 'espresso_debug_file');	
}

//Remote logging stuff
function espresso_remote_log($file, $function, $message) {
	espresso_log::singleton()->remote_log(array('file' => $file, 'function' => $function, 'status' => $message));
}

function espresso_send_log() {
	global $org_options;

	if (empty($org_options['remote_logging_url'])) {
		return;
	}
	$url = $org_options['remote_logging_url'];
	espresso_log::singleton()->send_log($url);
}

if (!empty($org_options['remote_logging'])) {
	//echo "<pre>".print_r($org_options,true)."</pre>";
	add_action('action_hook_espresso_log', 'espresso_remote_log', 10, 3);
	add_action('wp_footer', 'espresso_send_log');
}

function espresso_debug_file() {
	$message = "<?php\n";
	foreach ($_GET as $key => $value) {
		$message .= '$my_GET["' . $key . '"] = ' . "'"  . serialize($value) . "';\n";
	}
	foreach ($_POST as $key => $value) {
		$message .= '$my_POST["' . $key . '"] = ' . "'"  . serialize($value) . "';\n";
	}
	foreach ($_REQUEST as $key => $value) {
		$message .= '$my_REQUEST["' . $key . '"] = ' . "'"  . serialize($value) . "';\n";
	}
	$file = EVENT_ESPRESSO_UPLOAD_DIR . 'logs/espresso_debug.php';

	if (is_writable($file)) {
		$fh = fopen($file, 'w') or die("Cannot open file! " . $file);
		fwrite($fh, $message);
		fclose($fh);
	} else {
		global $notices;
		$notices['errors'][] = sprintf(__('Your debug file is not writable. Check if your server is able to write to %s.', 'event_espresso'), $file);
	}
}

