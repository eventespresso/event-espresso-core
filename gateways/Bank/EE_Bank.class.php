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
Class EE_Bank extends EE_Offline_Gateway {

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
		$this->_gateway = 'Bank';
		$this->_button_base = 'bank.png';
		$this->_path = str_replace('\\', '/', __FILE__);
		parent::__construct($model);
	}

	protected function _default_settings() {
		$this->_payment_settings = array(
			'active' => false,
			'account_name' => '',
			'page_title' => __('Electronic Funds Transfers', 'event_espresso'),
			'bank_instructions' => __('Please initiate an electronic payment using the bank information below. Payment must be received within 48 hours of event date.', 'event_espresso'),
			'bank_name' => '',
			'account_number' => '',
			'bank_address' => '',
			'display_name' => 'Bank Draft',
			'type' => 'off-line',
			'current_path' => ''
		);
	}

	protected function _update_settings() {
		$allowable_tags = '<br /><br><a>';
		$this->_payment_settings['account_name'] = strip_tags($_POST['account_name'], $allowable_tags);
		$this->_payment_settings['page_title'] = strip_tags($_POST['page_title'], $allowable_tags);
		$this->_payment_settings['bank_instructions'] = strip_tags($_POST['bank_instructions'], $allowable_tags);
		$this->_payment_settings['bank_name'] = strip_tags($_POST['bank_name'], $allowable_tags);
		$this->_payment_settings['account_number'] = strip_tags($_POST['account_number'], $allowable_tags);
		$this->_payment_settings['bank_address'] = strip_tags($_POST['bank_address'], $allowable_tags);
	}

	protected function _display_settings() {
		?>
		<tr>
			<th><label for="bank_page_title">
					<?php _e('Page Title', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="page_title" id="bank_page_title" size="30" value="<?php echo $this->_payment_settings['page_title']; ?>" /></td>
		</tr>
		<tr>
			<th><label for="bank_instructions">
					<?php _e('Payment Instructions', 'event_espresso'); ?>
				</label></th>
			<td><textarea name="bank_instructions" cols="30" rows="5"><?php echo $this->_payment_settings['bank_instructions']; ?></textarea></td>
		</tr>
		<tr>
			<th><label for="account_name">
					<?php _e('Name on Account', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="account_name" id="account_name" size="30" value="<?php echo trim($this->_payment_settings['account_name']); ?>" /></td>
		</tr>
		<tr>
			<th><label for="account_number">
					<?php _e('Bank Account #', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="account_number" id="account_number" size="30" value="<?php echo trim($this->_payment_settings['account_number']); ?>" /></td>
		</tr>
		<tr>
			<th><label for="bank_name">
					<?php _e('Bank Name', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="bank_name" id="bank_name" size="30" value="<?php echo trim($this->_payment_settings['bank_name']); ?>" /></td>
		</tr>
		<tr>
			<th><label for="bank_address">
					<?php _e('Bank Address', 'event_espresso'); ?>
				</label></th>
			<td><textarea name="bank_address" cols="30" rows="5"><?php echo $this->_payment_settings['bank_address']; ?></textarea></td>
		</tr>
		<?php
	}

	protected function _display_settings_help() {
		
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
			<h4 id="page_title" class="payment_type_title section-heading"><?php echo stripslashes_deep(empty($this->_payment_settings['page_title']) ? '' : $this->_payment_settings['page_title']) ?></h3>
				<p class="instruct"><?php echo stripslashes_deep(empty($this->_payment_settings['bank_instructions']) ? '' : $this->_payment_settings['bank_instructions'] ); ?></p>
				<p><span class="section-title"><?php _e('Name on Account:', 'event_espresso'); ?></span>
					<?php echo stripslashes_deep(empty($this->_payment_settings['account_name']) ? '' : '<span class="highlight">' . $this->_payment_settings['account_name']) . '</span>'; ?></p>
				<p><span class="section-title"><?php _e('Account Number:', 'event_espresso'); ?></span>
					<?php echo stripslashes_deep(empty($this->_payment_settings['account_number']) ? '' : '<span class="highlight">' . $this->_payment_settings['account_number']) . '</span>'; ?></p>
				<p><span class="section-title"><?php _e('Financial Institution:', 'event_espresso'); ?></span>
					<?php echo stripslashes_deep(empty($this->_payment_settings['bank_name']) ? '' : '<span class="highlight">' . $this->_payment_settings['bank_name']) . '</span>' ?></p>
				<div class="address-block">
					<?php echo wpautop(stripslashes_deep(empty($this->_payment_settings['bank_address']) ? '' : $this->_payment_settings['bank_address'])); ?>
				</div>
		</div>
		<?php
	}

	public function espresso_display_payment_gateways() {

		echo $this->_generate_payment_gateway_selection_button();
		?>

		<div id="reg-page-billing-info-<?php echo $this->_gateway; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the payment overview where you can view details of how to complete your bank transfer.', 'event_espresso'); ?>
		</div>

		<?php
	}

}
