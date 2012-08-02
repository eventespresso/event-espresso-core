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
Class EE_Check extends EE_Offline_Gateway {

	private static $_instance = NULL;

	public static function instance(EEM_Gateways &$model) {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self($model);
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway = 'Check';
		$this->_button_base = 'check.png';
		$this->_path = str_replace('\\', '/', __FILE__);
		parent::__construct($model);
	}

	protected function _default_settings() {
		global $org_options;
		$default_address = $org_options['organization_street1'] != '' ? $org_options['organization_street1'] . '<br />' : '';
		$default_address .= $org_options['organization_street2'] != '' ? $org_options['organization_street2'] . '<br />' : '';
		$default_address .= $org_options['organization_city'] != '' ? $org_options['organization_city'] : '';
		$default_address .= ($org_options['organization_city'] != '' && $org_options['organization_state'] != '') ? ', ' : '<br />';
		$default_address .= $org_options['organization_state'] != '' ? $org_options['organization_state'] . '<br />' : '';
		$default_address .= $org_options['organization_country'] != '' ? getCountryName($org_options['organization_country']) . '<br />' : '';
		$default_address .= $org_options['organization_zip'] != '' ? $org_options['organization_zip'] : '';
		$this->_payment_settings = array(
			'check_title' => __('Check/Money Order Payments', 'event_espresso'),
			'check_instructions' => __('Please send Check/Money Order to the address below. Payment must be received within 48 hours of event date.', 'event_espresso'),
			'payable_to' => $org_options['organization'],
			'payment_address' => $default_address,
			'display_name' => 'Check',
			'type' => 'off-line',
			'current_path' => ''
		);
	}

	protected function _update_settings() {
		$allowable_tags = '<br /><br><a>';
		$this->_payment_settings['check_title'] = strip_tags($_POST['check_title'], $allowable_tags);
		$this->_payment_settings['check_instructions'] = strip_tags($_POST['check_instructions'], $allowable_tags);
		$this->_payment_settings['payable_to'] = strip_tags($_POST['payable_to'], $allowable_tags);
		$this->_payment_settings['payment_address'] = strip_tags($_POST['payment_address'], $allowable_tags);
	}

	protected function _display_settings() {
		?>
		<tr>
				<td valign="top"><ul><li><label for="check_title"><?php _e('Title:', 'event_espresso'); ?></label><br />
							<input class="regular-text" type="text" name="check_title" size="30" value="<?php echo stripslashes_deep($this->_payment_settings['check_title']); ?>" />
						</li>
						<li><label for="check_instructions"><?php _e('Payment Instructions:', 'event_espresso'); ?></label><br />
							<textarea name="check_instructions" cols="30" rows="5"><?php echo stripslashes_deep($this->_payment_settings['check_instructions']); ?></textarea>
						</li></ul></td>
				<td valign="top"><ul><li><label for="payable_to"><?php _e('Payable To:', 'event_espresso'); ?></label><br />
							<input class="regular-text" type="text" name="payable_to" size="30" value="<?php echo stripslashes_deep($this->_payment_settings['payable_to']); ?>" />
						</li>
						<li><label for="payment_address"><?php _e('Address to Send Payment:', 'event_espresso'); ?></label><br />
							<textarea name="payment_address" cols="30" rows="5"><?php echo $this->_payment_settings['payment_address']; ?></textarea>
						</li></ul></td>
			</tr>
		<?php
	}

	protected function _display_settings_help() {
		
	}

	public function espresso_gateway_process_step_3() {
		global $org_options;
		$pre_form = "<html>";
		$pre_form .= "<head><title>Processing Check Payment...</title></head>";
		$pre_form .= "<body>";
		$form = "<h2 style=\"margin:2em auto; line-height:2em; text-align:center;\">Please wait...<br/>your order is being processed and you will be redirected to the transaction results page, where you can view details of how to complete your payment by check.</h2>";
		$form .= "<form method=\"POST\" name=\"gateway_form\" ";
		$form .= "action=\"" . get_permalink($org_options['return_url']) . "\">";
		$form .= "<p style=\"text-align:center;\"><br/>If you are not automatically redirected to ";
		$form .= "the payment website within 10 seconds...<br/><br/>";
		$form .= "<input type=\"submit\" value=\"Click Here\"></p>";
		$form .= "</form>";
		$post_form = "</body></html>";
		$this->_EEM_Gateways->set_off_site_form(array('pre-form' => $pre_form, 'form' => $form, 'post-form' => $post_form));
	}

	public function espresso_process_off_site_payment() {
		global $EE_Session;

		$txn_details = array(
				'gateway' => $this->_payment_settings['display_name'],
				'approved' => FALSE,
				'response_msg' => __('You\'re registration will be marked as complete once your payment is received.', 'event_espresso'),
				'status' => 'Incomplete',
				'raw_response' => serialize($_REQUEST),
				'amount' => 0.00,
				'method' => 'Off-line',
				'auth_code' => '',
				'md5_hash' => '',
				'invoice_number' => '',
				'transaction_id' => ''
		);
		$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');
		?>
		<div class="event-display-boxes">
	<h4 id="check_title" class="payment_type_title section-heading"><?php echo stripslashes_deep(empty($this->_payment_settings['check_title']) ? '' : $this->_payment_settings['check_title']) ?></h4>
	<p class="instruct"><?php echo stripslashes_deep(empty($this->_payment_settings['check_instructions']) ? '' : $this->_payment_settings['check_instructions'] ); ?></p>
	<p>
		<span class="section-title"><?php _e('Payable to:', 'event_espresso'); ?></span>
		<span class="highlight"><?php echo stripslashes_deep(empty($this->_payment_settings['payable_to']) ? '' : $this->_payment_settings['payable_to']); ?></span>
	</p>
	<p class="section-title"><?php _e('Payment Address: ', 'event_espresso'); ?></p>
	<div class="address-block">
		<?php echo wpautop(stripslashes_deep(empty($this->_payment_settings['payment_address']) ? '' : $this->_payment_settings['payment_address'])); ?>
	</div>
</div>
		<?php
	}

	public function espresso_display_payment_gateways() {

		echo $this->_generate_payment_gateway_selection_button();
		?>

		<div id="reg-page-billing-info-<?php echo $this->_gateway; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the payment overview where you can view details of how to complete your payment by Check.', 'event_espresso'); ?>
		</div>

		<?php
	}

}
