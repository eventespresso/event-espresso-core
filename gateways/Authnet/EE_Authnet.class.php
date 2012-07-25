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
 * Authnet Class
 *
 * @package			Event Espresso
 * @subpackage		gateways/
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
Class EE_Authnet extends EE_Gateway {

	private static $_instance = NULL;

	protected function _path() {
		return __FILE__;
	}

	public static function instance(EEM_Gateways &$model) {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self($model);
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway = 'Authnet';
		$this->_button_base = 'btn_cc_vmad.gif';
		parent::__construct($model);
	}

	protected function _default_settings() {
		$this->_payment_settings['authnet_login_id'] = '';
		$this->_payment_settings['authnet_transaction_key'] = '';
		$this->_payment_settings['image_url'] = '';
		$this->_payment_settings['use_sandbox'] = false;
		$this->_payment_settings['test_transactions'] = false;
		$this->_payment_settings['type'] = 'off-site';
		$this->_payment_settings['display_name'] = 'Authorize.net SIM';
		$this->_payment_settings['current_path'] = '';
	}

	protected function _update_settings() {
		$this->_payment_settings['authnet_login_id'] = sanitize_text_field($_POST['authnet_login_id']);
		$this->_payment_settings['authnet_transaction_key'] = sanitize_text_field($_POST['authnet_transaction_key']);
		$this->_payment_settings['test_transactions'] = empty($_POST['test_transactions']) ? FALSE : TRUE;
		$this->_payment_settings['use_sandbox'] = empty($_POST['use_sandbox']) ? FALSE : TRUE;
		$this->_payment_settings['button_url'] = sanitize_text_field($_POST['button_url']);
		$this->_payment_settings['image_url'] = sanitize_text_field($_POST['image_url']);
	}

	protected function _display_settings() {

		global $org_options;
		$values = array(
				array('id' => true, 'text' => __('Yes', 'event_espresso')),
				array('id' => false, 'text' => __('No', 'event_espresso')),
		);
		$raw_uri = $_SERVER['REQUEST_URI'];
		$uri = substr("$raw_uri", 0, strpos($raw_uri, '&activate_' . $this->_gateway . '=true'));
		?>
		<form method="post" action="<?php echo $uri; ?>#<?php echo $this->_gateway; ?>">
			<table class="form-table">
				<tbody>
					<tr>
						<th><label for="authnet_login_id">
								<?php _e('Authorize.net Login ID', 'event_espresso'); ?>
							</label></th>
						<td><input class="regular-text" type="text" name="authnet_login_id" id="authnet_login_id" size="35" value="<?php echo $this->_payment_settings['authnet_login_id']; ?>">
							<br />
							<span class="description">
								<?php _e('Please enter your Authorize.net Login ID', 'event_espresso'); ?>
							</span></td>
					</tr>
					<tr>
						<th><label for="authnet_transaction_key">
								<?php _e('Authorize.net Transaction Key', 'event_espresso'); ?>
								<?php echo apply_filters('filter_hook_espresso_help', 'transaction_key_info') ?>
							</label></th>
						<td><input class="regular-text" type="text" name="authnet_transaction_key" id="authnet_transaction_key" size="35" value="<?php echo $this->_payment_settings['authnet_transaction_key']; ?>">
							<br />
							<span class="description">
								<?php _e('Please enter your Authorize.net Transaction Key.', 'event_espresso'); ?>
							</span></td>
					</tr>
					<tr>
						<th><label for="sim_button_url">
								<?php _e('Button Image URL: ', 'event_espresso'); ?>
								<?php echo apply_filters('filter_hook_espresso_help', 'authnet_button_url_info') ?>
							</label></th>
						<td><input class="regular-text" type="text" name="button_url" id="sim_button_url" value="<?php echo $this->_payment_settings['button_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <br />
							<span class="description">
								<?php _e('URL to the payment button.', 'event_espresso'); ?>
							</span></td>
					</tr>
					<tr>
						<th><label for="sim_image_url">
								<?php _e('Image URL: ', 'event_espresso'); ?>
								<?php echo apply_filters('filter_hook_espresso_help', 'authnet_image_url_info') ?>
							</label></th>
						<td><input class="regular-text" type="text" name="image_url" id="sim_image_url" value="<?php echo $this->_payment_settings['image_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=image_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a><br />
							<span class="description">
								<?php
								_e('Used for your business/personal logo on the Authorize.net SIM payment page.', 'event_espresso');
								if ($this->_payment_settings['image_url'] != '')
									echo '<br /><img src="' . $this->_payment_settings['image_url'] . '" />';
								?>
							</span></td>
					</tr>
					<tr>
						<th><label>
								<?php _e('Relay Response URL: ', 'event_espresso'); ?>
								<?php echo apply_filters('filter_hook_espresso_help', 'relay_response') ?>
							</label></th>
						<td><span class="display-path" style="background-color: rgb(255, 251, 204); border:#999 solid 1px; padding:2px;"><?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?></span><br />
							<span class="description">
								<?php _e('URL to the transaction page.', 'event_espresso'); ?>
							</span></td>
					</tr>
					<tr>
						<th><label for="use_sandbox">
								<?php _e('Is this an account on the Authorize.net development server? ', 'event_espresso'); ?>
								<?php echo apply_filters('filter_hook_espresso_help', 'authnet_sandbox'); ?>
							</label></th>
						<td><?php echo select_input('use_sandbox', $values, $this->_payment_settings['use_sandbox']); ?></td>
					</tr>
					<tr>
						<th><label for="test_transactions">
								<?php _e('Do you want to submit a test transaction? ', 'event_espresso'); ?>
								<?php echo apply_filters('filter_hook_espresso_help', 'authnet_test_transactions') ?>
							</label></th>
						<td><?php echo select_input('test_transactions', $values, $this->_payment_settings['test_transactions']); ?></td>
					</tr>
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
				<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Authorize.net SIM Settings', 'event_espresso') ?>" id="save_authnet_settings" />
			</p>
			<?php wp_nonce_field('espresso_form_check', 'add_' . $this->_gateway . '_settings'); ?>
		</form>
		<?php
		include_once('lib/authnet_help.php');
	}

	public function espresso_gateway_process_step_3() {

		global $org_options, $EE_Session;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		// Setup class
		include_once ('lib/Authorize.php');
		$myAuthorize = new EE_Authorize(); // initiate an instance of the class

		$session_data = $EE_Session->get_session_data();
		$authnet_login_id = $this->_payment_settings['authnet_login_id'];
		$authnet_transaction_key = $this->_payment_settings['authnet_transaction_key'];
		$image_url = $this->_payment_settings['image_url'];
		$use_sandbox = $this->_payment_settings['use_sandbox'];
		$use_testmode = $this->_payment_settings['test_transactions'];
		if ($use_testmode == true) {
			// Enable test mode if needed
			$myAuthorize->enableTestMode();
		}
		if ($use_sandbox == true) {
			// Enable test mode if needed
			$myAuthorize->useTestServer();
		}

		$myAuthorize->setUserInfo($authnet_login_id, $authnet_transaction_key);
		$x_line_item = array();
		$item_num = 1;
		$registrations = $session_data['cart']['REG']['items'];
		foreach ($registrations as $registration) {
			foreach ($registration['attendees'] as $attendee) {
				$x_line_item[] = 'item' . $item_num . '<|>' . $registration['name'] . '<|>' . $attendee['fname'] . ' ' . $attendee['lname'] . ' attending ' . $registration['name'] . ' on ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc'] . '<|>1<|>' . $attendee['price_paid'] . '<|>N&';
				$item_num++;
			}
		}

		$total = $session_data['_cart_grand_total_amount'];
		if (isset($session_data['tax_totals'])) {
			foreach ($session_data['tax_totals'] as $key => $taxes) {
				$total = $total + $taxes;
				$x_line_item[] = 'item' . $item_num . '<|>' . $session_data['taxes'][$key]['name'] . '<|>' . 'Tax' . '<|>1<|>' . $taxes . '<|>N&';
				$item_num++;
			}
		}

		$myAuthorize->addField('x_line_item', $x_line_item);
		$myAuthorize->addField('x_Relay_URL', home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
		$myAuthorize->addField('x_Amount', number_format($total, 2));
		$myAuthorize->addField('x_Logo_URL', $image_url);
		$myAuthorize->addField('x_Invoice_num', 'au-' . $session_data['id']);
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, serialize(get_object_vars($myAuthorize)));
		$this->_EEM_Gateways->set_off_site_form($myAuthorize->submitPayment());
	}

	public function espresso_process_off_site_payment() {
		global $EE_Session;

		// Include the authorize.net library
		include_once ('lib/Authorize.php');
		$myAuthorize = new EE_Authorize();

// Log the IPN results
		$myAuthorize->ipnLog = TRUE;

		$txn_details = array(
				'gateway' => $this->_payment_settings['display_name'],
				'approved' => FALSE,
				'response_msg' => __('You\'re registration has not been completed successfully.', 'event_espresso'),
				'status' => 'Incomplete',
				'raw_response' => serialize($_POST),
				'amount' => 0.00,
				'method' => sanitize_text_field($_POST['x_method']),
				'auth_code' => sanitize_text_field($_POST['x_auth_code']),
				'md5_hash' => sanitize_text_field($_POST['x_MD5_Hash']),
				'invoice_number' => sanitize_text_field($_POST['x_invoice_num']),
				'transaction_id' => sanitize_text_field($_POST['x_invoice_num'])
		);
		$authnet_login_id = $this->_payment_settings['authnet_login_id'];
		$authnet_transaction_key = $this->_payment_settings['authnet_transaction_key'];

// Enable test mode if needed
//4007000000027  <-- test successful visa
//4222222222222  <-- test failure card number
		if ($this->_payment_settings['use_sandbox']) {
			$myAuthorize->enableTestMode();
		}

// Specify your authorize login and secret
		$myAuthorize->setUserInfo($authnet_login_id, $authnet_transaction_key);

// Check validity and write down it
		if ($myAuthorize->validateIpn()) {

			if ($myAuthorize->ipnData['x_response_code'] == 1) {
				$txn_details['approved'] = TRUE;
				$txn_details['amount'] = floatval($_REQUEST['x_amount']);
				$txn_details['response_msg'] = __('You\'re registration has been completed successfully.', 'event_espresso');
				$txn_details['status'] = 'Approved';
			}
			$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');

			if ($txn_details['approved'] == TRUE && $this->_payment_settings['use_sandbox']) {
				do_action('action_hook_espresso_mail_successful_transaction_debugging_output');
			} else {
				do_action('action_hook_espresso_mail_failed_transaction_debugging_output');
			}
		}
	}

	public function espresso_display_payment_gateways() {
		?>
		<a id="payment-gateway-button-<?php echo $this->_gateway; ?>" class="reg-page-payment-option-lnk<?php echo $this->_css_link_class; ?>" rel="<?php echo $this->_gateway; ?>" href="<?php echo $this->_form_url; ?>" >
			<img src="<?php echo $this->_payment_settings['button_url']; ?>" alt="Pay using Authorize.net" />
		</a>

		<div id="reg-page-billing-info-<?php echo $this->_gateway; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the Authorize.net website where your payment will be securely processed.', 'event_espresso'); ?>
		</div>

		<?php
	}

}