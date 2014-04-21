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
 * @ version		 	4.0
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
		if (self::$_instance === NULL or !is_object(self::$_instance) or ! ( self::$_instance instanceof  EE_Check )) {
			self::$_instance = new self($model);
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway_name = 'Check';
		$this->_button_base = 'check-logo.png';
		$this->_path = str_replace('\\', '/', __FILE__);
		parent::__construct($model);
	}

	protected function _default_settings() {
		$organization = EE_Registry::instance()->CFG->organization;
		$default_address = $organization->address_1 != '' ? $organization->address_1 . '<br />' : '';
		$default_address .= $organization->address_2 != '' ? $organization->address_2 . '<br />' : '';
		$default_address .= $organization->city != '' ? $organization->city : '';
		$default_address .= ( $organization->city != '' && $organization->STA_ID != '') ? ', ' : '<br />';
		
		$state = EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( $organization->STA_ID );
		$country = EE_Registry::instance()->load_model( 'Country' )->get_one_by_ID( $organization->CNT_ISO ) ;
		$default_address .=  $state ? $state->name() . '<br />' : '';
		$default_address .= $country ? $country->name(). '<br />' : '';
		$default_address .= $organization->zip != '' ? $organization->zip : '';
		$this->_payment_settings = array(
				'check_title' => __('Check/Money Order Payments', 'event_espresso'),
				'check_instructions' => __('Please send Check/Money Order to the address below. Payment must be received within 48 hours of event date.', 'event_espresso'),
				'payable_to' => $organization->name,
				'payment_address' => $default_address,
				'display_name' => __('Check','event_espresso'),
				'type' => 'off-line',
				'current_path' => '',
				'button_url' => $this->_btn_img
		);
	}

	protected function _update_settings() {
		$allowable_tags = '<br /><br><a>';
		$this->_payment_settings['check_title'] = strip_tags($_POST['check_title'], $allowable_tags);
		$this->_payment_settings['check_instructions'] = strip_tags($_POST['check_instructions'], $allowable_tags);
		$this->_payment_settings['payable_to'] = strip_tags($_POST['payable_to'], $allowable_tags);
		$this->_payment_settings['payment_address'] = strip_tags($_POST['payment_address'], $allowable_tags);
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';
	}

	protected function _display_settings() {
		?>
		<tr>
			<th>
				<label for="check_title">
					<?php _e('Title', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<input class="regular-text" type="text" name="check_title" size="30" value="<?php echo stripslashes_deep($this->_payment_settings['check_title']); ?>" />
			</td>
		</tr>
		
		<tr>
			<th>
				<label for="check_instructions">
					<?php _e('Payment Instructions', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<textarea name="check_instructions" cols="50" rows="5"><?php echo stripslashes_deep($this->_payment_settings['check_instructions']); ?></textarea>
			</td>
		</tr>
		
		<tr>
			<th>
				<label for="payable_to"><?php _e('Payable To', 'event_espresso'); ?></label>
			</th>
			<td>
				<input class="regular-text" type="text" name="payable_to" size="30" value="<?php echo stripslashes_deep($this->_payment_settings['payable_to']); ?>" />
			</td>
		</tr>
		
		<tr>
			<th>
				<label for="payment_address"><?php _e('Address to Send Payment', 'event_espresso'); ?></label>
			</th>
			<td>
				<textarea name="payment_address" cols="50" rows="5"><?php echo $this->_payment_settings['payment_address']; ?></textarea>
			</td>
		</tr>
		<?php
	}

	protected function _display_settings_help() {
		
	}

	public function espresso_display_payment_gateways( $selected_gateway = '' ) {

		$this->_css_class = $selected_gateway == $this->_gateway_name ? '' : ' hidden';
		echo $this->_generate_payment_gateway_selection_button();
		?>
		<div id="reg-page-billing-info-<?php echo $this->_gateway_name; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<p><?php _e('After finalizing your registration, you will be transferred to the payment overview where you can view details of how to complete your payment by Check.', 'event_espresso'); ?></p>
		</div>

		<?php
	}
	/**
	 * Handles the thank you page logic given this specific transaction 
	 * @param EE_Payment $payment
	 */
	public function get_payment_overview_content(EE_Payment $payment) {
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

}
