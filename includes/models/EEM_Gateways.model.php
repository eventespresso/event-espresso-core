<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.1.P.7
 *
 * ------------------------------------------------------------------------
 *
 * Payment Model
 *
 * @package			Event Espresso
 * @subpackage	includes/models/
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
Class EEM_Gateways {

	private static $_instance = NULL;
	private $_active_gateways = array();
	private $_all_gateways = array();
	private $_gateway_instances = array();
	private $_payment_settings = array();
	private $_selected_gateway = NULL;
	private $_hide_other_gateways = FALSE;
	private $_session_gateway_data = NULL;
	private $_off_site_form = NULL;
	private $_ajax = TRUE;

	/**
	 * 		@singleton method used to instantiate class object
	 * 		@access public
	 * 		@return class instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	private function __construct() {
		//so client code can check for instatiation b4 including
		define('ESPRESSO_GATEWAYS', TRUE);
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Gateway.class.php');

		$this->_load_session_gateway_data();
		$this->_set_active_gateways();
		$this->_load_payment_settings();
		$this->_scan_and_load_all_gateways();
	}

	private function _load_session_gateway_data() {
		global $EE_Session;
		// try to pull data from session b4 hitting db
		$this->_session_gateway_data = $EE_Session->get_session_data(FALSE, 'gateway_data');
		if (!empty($this->_session_gateway_data['selected_gateway'])) {
			$this->_selected_gateway = $this->_session_gateway_data['selected_gateway'];
		}
		if (!empty($this->_session_gateway_data['hide_other_gateways'])) {
			$this->_hide_other_gateways = $this->_session_gateway_data['hide_other_gateways'];
		}
		if (!empty($this->_session_gateway_data['off_site_form'])) {
			$this->_off_site_form = $this->_session_gateway_data['off_site_form'];
		}
		if (!empty($this->_session_gateway_data['ajax'])) {
			$this->_ajax = $this->_session_gateway_data['ajax'];
		}
	}

	private function _set_active_gateways() {
		if (!empty($this->_session_gateway_data['active_gateways'])) {
			$this->_active_gateways = $this->_session_gateway_data['active_gateways'];
		} else {
			global $espresso_wp_user, $EE_Session;
			$this->_active_gateways = get_user_meta($espresso_wp_user, 'active_gateways', TRUE);
			if (!is_array($this->_active_gateways)) {
				$this->_active_gateways = array();
			}
			$EE_Session->set_session_data(array('active_gateways' => $this->_active_gateways), 'gateway_data');
		}
	}

	private function _load_payment_settings() {

		if (!empty($this->_session_gateway_data['payment_settings'])) {
			$this->_payment_settings = $this->_session_gateway_data['payment_settings'];
		} else {
			global $espresso_wp_user, $EE_Session;
			$this->_payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', TRUE);
			if (!is_array($this->_payment_settings)) {
				$this->_payment_settings = array();
			}
			$EE_Session->set_session_data(array('payment_settings' => $this->_payment_settings), 'gateway_data');
		}

		//echo printr( $this->_payment_settings, __CLASS__ . ' ->' . __FUNCTION__ . ' ( line #' .  __LINE__ . ' )' );
	}

	private function _scan_and_load_all_gateways() {
		// on the settings page, scan and load all the gateways
		if (is_admin() && !empty($_GET['page']) && $_GET['page'] == 'payment_gateways') {
			$this->_load_all_gateway_files();
		} else {
			if (!is_array($this->_active_gateways)) {	// if something went wrong, fail gracefully
				//global $espresso_notices;
				//$espresso_notices['errors'][] = 'No Active Event Espresso Payment Gateways';
				return;
			}
			foreach ($this->_active_gateways as $gateway => $in_uploads) {
				$classname = 'EE_' . $gateway;
				$filename = $classname . '.class.php';
				if ($in_uploads) {
					if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . $gateway . DS . $filename)) {
						require_once(EVENT_ESPRESSO_GATEWAY_DIR . $gateway . DS . $filename);
					} else {
						$this->unset_active($gateway);	// if it can't find a gateway, delete it from the active_gateways
					}
				} else {
					if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways' . DS . $gateway . DS . $filename)) {
						require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways' . DS . $gateway . DS . $filename);
					} else {
						$this->unset_active($gateway);	// if it can't find a gateway, delete it from the active_gateways
					}
				}
				if (class_exists($classname)) {
					//$gateway = $classname::instance($this);
					$gateway = call_user_func(array($classname, 'instance'), &$this);
					$this->_gateway_instances[$gateway->gateway()] = $gateway;
				}
			}
		}
	}

	private function _load_all_gateway_files() {
		global $espresso_notices;
		$gateways = array();
		$upload_gateways = array();
		$gateways_glob = glob(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways" . DS . "*", GLOB_ONLYDIR);
		$upload_gateways_glob = glob(EVENT_ESPRESSO_GATEWAY_DIR . '*', GLOB_ONLYDIR);
		if (!is_array($gateways_glob))
			$gateways_glob = array();
		foreach ($gateways_glob as $gateway) {
			$pos = strrpos($gateway, DS);
			$sub = substr($gateway, $pos + 1);
			$gateways[$sub] = FALSE;
		}
		if (!is_array($upload_gateways_glob))
			$upload_gateways_glob = array();
		foreach ($upload_gateways_glob as $upload_gateway) {
			$pos = strrpos($upload_gateway, DS);
			$sub = substr($upload_gateway, $pos + 1);
			$upload_gateways[$sub] = TRUE;
		}
		$this->_all_gateways = array_merge($upload_gateways, $gateways);

		foreach ($this->_all_gateways as $gateway => $in_uploads) {
			$classname = 'EE_' . $gateway;
			$filename = $classname . '.class.php';
			if ($in_uploads) {
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . $gateway . DS . $filename)) {
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . $gateway . DS . $filename);
				} else {
					$espresso_notices['errors'][] = 'The file : <b>' . $filename . '</b> could not be located in either : <b>' . EVENT_ESPRESSO_GATEWAY_DIR . $gateway . DS . '</b>';
				}
			} else if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways' . DS . $gateway . DS . $filename)) {
				require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways' . DS . $gateway . DS . $filename);
			} else {
				$espresso_notices['errors'][] = 'The file : <b>' . $filename . '</b> could not be located in either : <b>' . EVENT_ESPRESSO_GATEWAY_DIR . $gateway . DS . '</b> or <b>' . EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways' . DS . $gateway . DS . '</b>';
			}

			if (class_exists($classname)) {
				$this->_gateway_instances[] = $classname::instance($this);
			}
		}
	}

	public function payment_settings($gateway = FALSE) {
		if (!empty($this->_payment_settings[$gateway])) {
			return $this->_payment_settings[$gateway];
		} else {
			return FALSE;
		}
	}

	public function update_payment_settings($gateway = FALSE, $settings = FALSE) {
		if (!$gateway || !$settings) {
			return FALSE;
		}
		$this->_payment_settings[$gateway] = $settings;

		global $espresso_wp_user, $espresso_notices;

		if (update_user_meta($espresso_wp_user, 'payment_settings', $this->_payment_settings)) {
			$espresso_notices['success'][] = __('Payment Settings Updated!', 'event_espresso');
		} else {
			$espresso_notices['errors'][] = __('Payment Settings were not saved! ', 'event_espresso');
		}
	}

	public function is_active($gateway = FALSE) {
		if (!$gateway) {
			return FALSE;
		}
		if (array_key_exists($gateway, $this->_active_gateways)) {
			return array($gateway => $this->_active_gateways[$gateway]);
		} else {
			return FALSE;
		}
	}

	public function is_in_uploads($gateway = FALSE) {
		if (!$gateway) {
			return FALSE;
		}
		if (array_key_exists($gateway, $this->_all_gateways)) {
			return array($gateway => $this->_all_gateways[$gateway]);
		} else {
			return FALSE;
		}
	}

	public function set_active($gateway = FALSE) {
		if (!$gateway) {
			return FALSE;
		}
		if (array_key_exists($gateway, $this->_all_gateways)) {
			$this->_active_gateways[$gateway] = $this->_all_gateways[$gateway];
			global $espresso_wp_user, $espresso_notices;
			if (update_user_meta($espresso_wp_user, 'active_gateways', $this->_active_gateways)) {
				$espresso_notices['success'][] = $gateway . __(' Gateway Activated!', 'event_espresso');
			} else {
				$espresso_notices['errors'][] = $gateway . __(' Gateway Not Activated! ', 'event_espresso');
			}
		} else {
			return FALSE;
		}
	}

	public function unset_active($gateway = FALSE) {
		if (!$gateway) {
			return FALSE;
		}
		if (array_key_exists($gateway, $this->_active_gateways)) {
			unset($this->_active_gateways[$gateway]);
			global $espresso_wp_user, $espresso_notices;
			if (update_user_meta($espresso_wp_user, 'active_gateways', $this->_active_gateways)) {
				$espresso_notices['success'][] = __('Gateway Deactivated!', 'event_espresso');
			} else {
				$espresso_notices['errors'][] = __('Gateway Not Deactivated! ', 'event_espresso');
			}
		} else {
			return FALSE;
		}
	}

	public function set_selected_gateway($gateway = FALSE) {
		if (!$gateway || !array_key_exists($gateway, $this->_active_gateways)) {
			return FALSE;
		} else {
			$this->_selected_gateway = $gateway;
			$this->_hide_other_gateways = TRUE;
			$this->_set_session_data();
			foreach ($this->_active_gateways as $gateway => $in_uploads) {
				if ($this->_selected_gateway == $gateway) {
					$this->_gateway_instances[$gateway]->set_selected();
				} else {
					$this->_gateway_instances[$gateway]->set_hidden();
				}
			}
			return TRUE;
		}
	}

	public function unset_selected_gateway() {
		$this->_selected_gateway = NULL;
		$this->_hide_other_gateways = FALSE;
		$this->_set_session_data();
		foreach ($this->_active_gateways as $gateway => $in_uploads) {
			$this->_gateway_instances[$gateway]->unset_selected();
		}
		return TRUE;
	}

	public function selected_gateway() {
		return $this->_selected_gateway;
	}

	public function set_form_url($base_url = FALSE) {
		if (!$base_url) {
			return FALSE;
		}
		foreach ($this->_active_gateways as $gateway => $in_uploads) {
			if (!empty($this->_gateway_instances[$gateway])) {
				$this->_gateway_instances[$gateway]->set_form_url($base_url);
			} else {
				return FALSE;
			}
		}
		return TRUE;
	}

	public function type() {
		if (!empty($this->_payment_settings[$this->_selected_gateway]['type'])) {
			return $this->_payment_settings[$this->_selected_gateway]['type'];
		} else {
			return FALSE;
		}
	}

	public function display_name() {
		if (!empty($this->_payment_settings[$this->_selected_gateway]['display_name'])) {
			return $this->_payment_settings[$this->_selected_gateway]['display_name'];
		} else {
			return FALSE;
		}
	}

	public function off_site_form() {
		if (!empty($this->_off_site_form)) {
			return $this->_off_site_form;
		} else {
			return FALSE;
		}
	}

	public function set_off_site_form($form_data = FALSE) {
		if (!$form_data) {
			return FALSE;
		}
		$this->_off_site_form = $form_data;
		$this->_set_session_data();
		return TRUE;
	}

	private function _set_session_data() {
		global $EE_Session;
		$EE_Session->set_session_data(array(
				'selected_gateway' => $this->_selected_gateway,
				'hide_other_gateways' => $this->_hide_other_gateways,
				'off_site_form' => $this->_off_site_form,
				'ajax' => $this->_ajax
						), 'gateway_data');
	}

	public function set_ajax() {
		$this->_ajax = TRUE;
		$this->_set_session_data();
		return TRUE;
	}

	public function set_noajax() {
		$this->_ajax = FALSE;
		$this->_set_session_data();
		return TRUE;
	}

	public function ajax() {
		return $this->_ajax;
	}

	public function reset_session_data() {
		foreach ($this->_active_gateways as $gateway => $in_uploads) {
			if (!empty($this->_gateway_instances[$gateway])) {
				$this->_gateway_instances[$gateway]->reset_session_data();
			} else {
				return FALSE;
			}
		}
		$this->_selected_gateway = NULL;
		$this->_hide_other_gateways = FALSE;
		$this->_off_site_form = NULL;
		$this->_ajax = TRUE;
		$this->_payment_settings = array();
		$this->_active_gateways = array();
		global $EE_Session;
		$EE_Session->set_session_data(array(
				'selected_gateway' => $this->_selected_gateway,
				'hide_other_gateways' => $this->_hide_other_gateways,
				'off_site_form' => $this->_off_site_form,
				'ajax' => $this->_ajax,
				'payment_settings' => $this->_payment_settings,
				'active_gateways' => $this->_active_gateways
						), 'gateway_data');
		return TRUE;
	}

	public function send_invoice($id) {
		$gateway = 'Invoice';
		$classname = 'EE_' . $gateway;
		$filename = $classname . '.class.php';
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . $gateway . DS . $filename)) {
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . $gateway . DS . $filename);
		} else if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways' . DS . $gateway . DS . $filename)) {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways' . DS . $gateway . DS . $filename);
		} else {
			global $espresso_notices;
			$espresso_notices['errors'][] = 'The file : <b>' . $filename . '</b> could not be located in either : <b>' . EVENT_ESPRESSO_GATEWAY_DIR . $gateway . DS . '</b> or <b>' . EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways' . DS . $gateway . DS . '</b>';
		}

		if (class_exists($classname)) {
			$invoice = $classname::instance($this);
			$invoice->send_invoice($id);
		}
	}

}