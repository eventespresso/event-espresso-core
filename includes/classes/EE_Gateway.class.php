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
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.1.P.7
 *
 * ------------------------------------------------------------------------
 *
 * Payment Model
 *
 * @package			Event Espresso
 * @subpackage		gateways/
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Gateway {

	protected $_payment_settings = array();
	protected $_gateway = NULL;
	protected $_button_base = NULL;
	protected $_EEM_Gateways = NULL;
	protected $_form_url = NULL;
	protected $_css_class = 'hidden';
	protected $_selected = FALSE;
	protected $_css_link_class = '';
	protected $_yes_no_options = array();
	private $_session_gateway_data = NULL;

	abstract protected function _default_settings();

	abstract protected function _update_settings();

	abstract protected function _display_settings();

	abstract protected function _path();

	abstract public function espresso_display_payment_gateways();

	abstract public function espresso_gateway_process_step_3();

	abstract public function espresso_process_off_site_payment();

	protected function __construct(EEM_Gateways &$model) {
		$this->_EEM_Gateways = $model;
		$this->_yes_no_options = array(
				array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
				array('id' => FALSE, 'text' => __('No', 'event_espresso'))
		);
		global $EE_Session, $espresso_notices;
		
		if (!$this->_payment_settings = $this->_EEM_Gateways->payment_settings($this->_gateway)) {
			$this->_default_settings();
			if ($this->_EEM_Gateways->update_payment_settings($this->_gateway, $this->_payment_settings)) {
				$espresso_notices['updates'][] = $this->_payment_settings['display_name'] . ' ' . __('Payment Settings Initialized!', 'event_espresso');
			} else {
				$espresso_notices['errors'][] = $this->_payment_settings['display_name'] . ' ' . __('Payment Settings were not initialized! ', 'event_espresso');
			}
		}
		if (is_admin() && !empty($_GET['page']) && $_GET['page'] == 'payment_gateways') {
			add_action('admin_init', array(&$this, 'add_settings_page_meta_box'));
			if ($this->_payment_settings['current_path'] != $this->_path()) {
				$this->_reset_button_url();
			}
			if (!empty($_REQUEST['activate_' . $this->_gateway])) {
				$this->_EEM_Gateways->set_active($this->_gateway);
			}
			if (!empty($_REQUEST['deactivate_' . $this->_gateway])) {
				$this->_EEM_Gateways->unset_active($this->_gateway);
			}
		} else {
			add_action('action_hook_espresso_display_payment_gateways', array(&$this, 'espresso_display_payment_gateways'));
			if ($this->_session_gateway_data = $EE_Session->get_session_data($this->_gateway, "gateway_data")) {
				if (!empty($this->_session_gateway_data['form_url'])) {
					$this->_form_url = $this->_session_gateway_data['form_url'];
				}
				if (!empty($this->_session_gateway_data['css_class'])) {
					$this->_css_class = $this->_session_gateway_data['css_class'];
				}
				if (!empty($this->_session_gateway_data['selected'])) {
					$this->_selected = $this->_session_gateway_data['selected'];
					$this->_update_actions();
				}
				if (!empty($this->_session_gateway_data['css_link_class'])) {
					$this->_css_link_class = $this->_session_gateway_data['css_link_class'];
				}
			}
		}
	}

	public function gateway() {
		return $this->_gateway;
	}

	public function add_settings_page_meta_box() {
		add_meta_box(
						'espresso_' . $this->_gateway . '_gateway_settings', $this->_payment_settings['display_name'] . ' ' . __('Settings', 'event_espresso'), array(&$this, 'settings_meta_box'), 'event-espresso_page_payment_gateways'
		);
	}

	public function settings_meta_box() {
		global $espresso_premium, $espresso_notices;
		if ($espresso_premium != true) {
			return;
		}
		if (isset($_POST['update_' . $this->_gateway]) && check_admin_referer('espresso_form_check', 'add_' . $this->_gateway . '_settings')) {
			$this->_update_settings();
			if ($this->_EEM_Gateways->update_payment_settings($this->_gateway, $this->_payment_settings)) {
				$espresso_notices['updates'][] = $this->_payment_settings['display_name'] . ' ' . __('Payment Settings Updated!', 'event_espresso');
			} else {
				$espresso_notices['errors'][] = $this->_payment_settings['display_name'] . ' ' . __('Payment Settings were not saved! ', 'event_espresso');
			}
		}
		?>

		<a name="<?php echo $this->_gateway; ?>" id="<?php echo $this->_gateway; ?>"></a>
		<div class="padding">
			<ul>
				<?php if (!$this->_EEM_Gateways->is_active($this->_gateway)) { ?>
					<li id="activate_<?php echo $this->_gateway; ?>" style="width:30%;" onclick="location.href='<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=payment_gateways&activate_<?php echo $this->_gateway; ?>=true#<?php echo $this->_gateway; ?>'" class="green_alert pointer"><strong><?php
			_e('Activate', 'event_espresso');
			echo ' ' . $this->_payment_settings['display_name'] . ' ';
			_e('Payments');
			echo '?';
					?></strong></li>
				<?php } else { ?>
					<li id="deactivate_<?php echo $this->_gateway; ?>" style="width:30%;" onclick="location.href='<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=payment_gateways&deactivate_<?php echo $this->_gateway; ?>=true'" class="red_alert pointer"><strong><?php
			_e('Deactivate', 'event_espresso');
			echo ' ' . $this->_payment_settings['display_name'] . ' ';
			_e('Payments');
			echo '?';
					?></strong></li>
					<?php
					$this->_display_settings_wrapper();
				}
				?>
			</ul>
		</div> <!-- Class=padding -->
		<?php
	}

	private function _display_settings_wrapper() {
		$raw_uri = $_SERVER['REQUEST_URI'];
		$uri = substr("$raw_uri", 0, strpos($raw_uri, '&activate_' . $this->_gateway . '=true'));
		?>
		<form method="post" action="<?php echo $uri; ?>#<?php echo $this->_gateway; ?>">
			<table class="form-table">
				<tbody>
					<?php $this->_display_settings(); ?>
					<tr>
						<td>
							<label><?php _e('Current Button Image', 'event_espresso'); ?></label>
							<?php echo '<img src="' . $this->_payment_settings['button_url'] . '" />'; ?>
						</td>
					</tr>
				</tbody>
			</table>
			<p>
				<input type="hidden" name="update_<?php echo $this->_gateway; ?>" value="update_<?php echo $this->_gateway; ?>">
				<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update', 'event_espresso');
					echo ' ' . $this->_payment_settings['display_name'] . ' ';
					_e('Settings', 'event_espresso') ?>" id="save_<?php echo $this->_gateway; ?>_settings" />
			</p>

		<?php wp_nonce_field('espresso_form_check', 'add_' . $this->_gateway . '_settings'); ?>
		</form>
		<?php
		$this->_display_settings_help();
	}

	public function set_form_url($base_url = FALSE) {
		if (!$base_url) {
			return FALSE;
		}
		$this->_form_url = add_query_arg(array('e_reg' => 'register', 'step' => 2, 'payment' => $this->_gateway), $base_url);
		$this->_set_session_data();
		return TRUE;
	}

	public function set_selected() {
		$this->_selected = TRUE;
		$this->_update_actions();
		$this->_css_class = '';
		$this->_css_link_class = '';
		$this->_set_session_data();
	}

	public function unset_selected() {
		$this->_css_class = 'hidden';
		$this->_selected = FALSE;
		$this->_update_actions();
		$this->_css_link_class = '';
		$this->_set_session_data();
	}

	public function set_hidden() {
		$this->_css_class = 'hidden';
		$this->_selected = FALSE;
		$this->_update_actions();
		$this->_css_link_class = ' hidden';
		$this->_set_session_data();
	}

	private function _set_session_data() {
		global $EE_Session;
		$EE_Session->set_session_data(array(
				$this->_gateway => array(
						'form_url' => $this->_form_url,
						'selected' => $this->_selected,
						'css_class' => $this->_css_class,
						'css_link_class' => $this->_css_link_class
				)
						), 'gateway_data');
	}

	public function reset_session_data() {
		$this->_form_url = NULL;
		$this->_css_class = 'hidden';
		$this->_selected = FALSE;
		$this->_css_link_class = '';
		$this->_set_session_data();
	}

	private function _update_actions() {
		if ($this->_selected) {
			if (!has_action('action_hook_espresso_gateway_process_step_3', array(&$this, 'espresso_gateway_process_step_3'))) {
				add_action('action_hook_espresso_gateway_process_step_3', array(&$this, 'espresso_gateway_process_step_3'));
			}
			if (!has_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'))) {
				add_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'));
			}
		} else {
			if (has_action('action_hook_espresso_gateway_process_step_3', array(&$this, 'espresso_gateway_process_step_3'))) {
				remove_action('action_hook_espresso_gateway_process_step_3', array(&$this, 'espresso_gateway_process_step_3'));
			}
			if (has_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'))) {
				remove_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'));
			}
		}
	}

	protected function _reset_button_url() {
		global $espresso_notices;
		$in_uploads = $this->_EEM_Gateways->is_in_uploads($this->_gateway);
		if (is_array($in_uploads) && $in_uploads[$this->_gateway]) {
			$button_url = EVENT_ESPRESSO_GATEWAY_URL . "/" . $this->_gateway . '/lib/' . $this->_button_base;
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/" . $this->_gateway . '/lib/' . $this->_button_base;
		}
		$this->_payment_settings['button_url'] = $button_url;
		$this->_payment_settings['current_path'] = $this->_path();
		
		if ($this->_EEM_Gateways->update_payment_settings($this->_gateway, $this->_payment_settings)) {
			$espresso_notices['updates'][] = $this->_payment_settings['display_name'] . ' ' . __('Button URL Reset!', 'event_espresso');
		} else {
			$espresso_notices['errors'][] = $this->_payment_settings['display_name'] . ' ' . __('Button URL was not reset! ', 'event_espresso');
		}
	}

}