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
 * Payment Gateway - Strip
 *
 * @package			Event Espresso
 * @subpackage		gateways/
 * @author				Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
Class EE_Stripe extends EE_Onsite_Gateway {
	
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
		$this->_gateway_name = 'Stripe';
		$this->_button_base = 'stripe-logo.png';
		$this->_path = str_replace( '\\', '/', __FILE__ );
		$this->_btn_img = file_exists( dirname( $this->_path ) . '/lib/' . $this->_button_base ) ? EVENT_ESPRESSO_PLUGINFULLURL . 'gateways/' . $this->_gateway_name . '/lib/' . $this->_button_base : '';
		parent::__construct($model);
	}

	protected function _default_settings() {
		$this->_payment_settings = array(
			'type' => 'on-site', 
			'display_name' => 'Stripe',
			'current_path' => '',
			'stripe_currency_symbol' => 'USD',
			'stripe_publishable_key' => '',
			'stripe_secret_key' => '',
			'button_url' =>$this->_btn_img	
			//no sandbox settings?
			);
	}

	protected function _update_settings() {
		//todo: add in notices and nonce_check;
		$this->_payment_settings['stripe_currency_symbol'] = $_POST['stripe_currency_symbol'];
		$this->_payment_settings['stripe_publishable_key'] = $_POST['stripe_publishable_key'];
		$this->_payment_settings['stripe_secret_key'] = $_POST['stripe_secret_key'];
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';
	}

	protected function _display_settings() {
		?>
		<tr>
			<th>
				<label for="stripe_secret_key"><?php _e('Stripe Secret Key:', 'event_espresso'); ?></label>
			</th>
			<td>
				<input type="text" name="stripe_secret_key" size="35" value="<?php echo $this->_payment_settings['stripe_secret_key']; ?>"> 
				<?php do_action('action_hook_espresso_help', 'stripe_secret_key') ?>
			</td>
		</tr>
		
		<tr>
			<th>
				<label for="stripe_publishable_key"><?php _e('Stripe Publishable Key:', 'event_espresso'); ?></label>
			</th>
			<td>
				<input type="text" name="stripe_publishable_key" size="35" value="<?php echo $this->_payment_settings['stripe_publishable_key']; ?>"> 
				<?php do_action('action_hook_espresso_help', 'stripe_publishable_key') ?>
			</td>
		</tr>
		
		<tr>
			<th>
				<label for="stripe_currency_symbol"><?php _e('Stripe Currency Symbol (usd):', 'event_espresso'); ?></label>
			</th>
			<td>
				<input type="text" name="stripe_currency_symbol" size="35" value="<?php echo $this->_payment_settings['stripe_currency_symbol']; ?>"> 
				<?php do_action('action_hook_espresso_help', 'stripe_currency_symbol') ?>
			</td>
		</tr>
		
		<tr>
			<th>
				<label for="<?php echo $this->_gateway_name; ?>_button_url">
					<?php _e('Button Image URL', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<?php $this->_payment_settings['button_url'] = empty( $this->_payment_settings['button_url'] ) ? $this->_btn_img : $this->_payment_settings['button_url']; ?>
				<input class="regular-text" type="text" name="button_url" id="<?php echo $this->_gateway_name; ?>_button_url" size="34" value="<?php echo $this->_payment_settings['button_url']; ?>" />
				<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a>
			</td>
		</tr>
	    <?php
	}

	protected function _display_settings_help() {
		?>
		<div id="stripe_button_image" style="display:none">
			<h2>
				<?php _e('Button Image URL', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso'); ?>
			</p>
			<p><?php _e('Current Button Image', 'event_espresso'); ?></p>
			<p><?php echo '<img src="' . $this->_payment_settings['button_url'] . '" />'; ?></p>
		</div>
		<div id="stripe_currency_symbol" style="display:none">
	        <h2>
	            <?php _e('Stripe Currency Symbol', 'event_espresso'); ?>
	        </h2>
	        <p>
	            <?php _e('Stripe uses 3-character ISO-4217 codes for specifying currencies in fields and variables.  If you are taking purchases in US Dollars, enter <code>usd</code> here.  Stripe currently only takes payment in USD, but can accept payments from any currency which will be converted to USD at checkout.', 'event_espresso'); ?>
	        </p>
	    </div>
	    <div id="stripe_secret_key" style="display:none">
	        <h2>
	            <?php _e('Stripe Secret Key', 'event_espresso'); ?>
	        </h2>
	        <p>
	            <?php _e('Enter your <a href="https://manage.stripe.com/#account/apikeys" target="_blank">Secret Key</a> here.  If you are testing the Stripe gateway, use your Test Secret Key, otherwise use your Live Secret Key.', 'event_espresso'); ?>
	        </p>
	        <p>
	            <?php _e('<a href="https://stripe.com/docs/api#authentication" target="_blank">Learn more about API authentication.</a>', 'event_espresso'); ?>
	        </p>
	    </div>
	    <div id="stripe_publishable_key" style="display:none">
	        <h2>
	            <?php _e('Stripe Publishable Key', 'event_espresso'); ?>
	        </h2>
	        <p>
	            <?php _e('Enter your <a href="https://manage.stripe.com/#account/apikeys" target="_blank">Publishable Key</a> here.  If you are testing the Stripe gateway, use your Test Publishable Key, otherwise use your Live Publishable Key.', 'event_espresso'); ?>
	        </p>
	        <p>
	            <?php _e('<a href="https://stripe.com/docs/api#authentication" target="_blank">Learn more about API authentication.</a>', 'event_espresso'); ?>
	        </p>
	    </div>
	    <?php
	}

	public function process_reg_step_3() {
		global $EE_Session;
		$session_data = $EE_Session->get_session_data();
		$billing_info = $session_data['billing_info'];
		
		if ( $billing_info != 'no payment required' ) {
			require_once ('lib/stripe.class.php');
			$cls_stripe = new ClsStripe();
			$stripe_settings = $this->_payment_settings;

			//assemble the description and totals.
			$item_num = 1;
			$registrations = $session_data['cart']['REG']['items'];
			$description = '';
			
			foreach ($registrations as $registration) {
				foreach ($registration['attendees'] as $attendee) {
					$description .= $attendee['fname'] . ' ' . $attendee['lname'] . ' attending ' . $registration['name'] . ' on ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc'];
					$item_num++;
				}
			}

			$total = $session_data['_cart_grand_total_amount'];
			if (isset($session_data['tax_totals'])) {
				foreach ($session_data['tax_totals'] as $key => $taxes) {
					$total = $total + $taxes;
					$description .= $session_data['taxes'][$key]['name'];
				}
			}

			$amount_pd = $total;

			//setup transaction
			$cc = $billing_info[ 'reg-page-billing-card-nmbr-' . $this->_gateway_name ]['value'];
			$csc = $billing_info[ 'reg-page-billing-card-ccv-code-' . $this->_gateway_name ]['value'];
			$exp_month = $billing_info[ 'reg-page-billing-card-exp-date-mnth-' . $this->_gateway_name ]['value'];
			$exp_year = $billing_info[ 'reg-page-billing-card-exp-date-year-' . $this->_gateway_name ]['value'];
			$bname = $billing_info[ 'reg-page-billing-fname-' . $this->_gateway_name ]['value'].' '.$billing_info[ 'reg-page-billing-lname-' . $this->_gateway_name ]['value'];

			$response = $cls_stripe->do_transaction($amount_pd, $cc, $csc, $exp_month, $exp_year, $bname, $description, $stripe_settings);

			if ( isset($response['status']) )
			{

				if ( $response['status'] > 0 ) {
					$payment_status =  'Approved';
					$approval = $response['status'];
					$txid = $response['txid'];
				} else {
					$payment_status =  'Declined';
					$approval = 0;
					$txid = '';
				}


				$txn_results = array(
					'gateway' => $this->_payment_settings['display_name'],
					'approved' => $approval,
					'status' => $payment_status,
					'response_msg' => isset( $response['msg'] ) ? $response['msg'] : '',
					'amount' => $amount_pd,
					'method' => '',
					'card_type' => '',
					'auth_code' => '',
					'md5_hash' => '',
					'transaction_id' => $txid,
					'invoice_number' => $txid,
					'raw_response' => $response
					);

				$EE_Session->set_session_data(array('txn_results' => $txn_results), $section = 'session_data');

				$success = $payment_status == 'Approved' ? TRUE : FALSE;

				do_action( 'action_hook_espresso_after_payment', $EE_Session, $success );
			} 

		} else {

		}
		
		return array('success'=>TRUE);
		
	}


	public function espresso_display_payment_gateways() {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		global $css_class;
		echo $this->_generate_payment_gateway_selection_button();
		$gw = $this->_gateway_name;
		?>
		
		<div id="reg-page-billing-info-<?php echo $gw;?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">


			<h5><strong><?php _e('Billing Address', 'event_espresso'); ?></strong></h5>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-fname-<?php echo $gw;?>"><?php _e('First Name', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-fname-<?php echo $gw;?>" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-fname-<?php echo $gw;?>">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-lname-<?php echo $gw;?>"><?php _e('Last Name', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-lname-<?php echo $gw;?>" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-lname-<?php echo $gw;?>">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-email-<?php echo $gw;?>"><?php _e('Email', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-email-<?php echo $gw;?>" class="required email <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-email-<?php echo $gw;?>">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-address-<?php echo $gw;?>"><?php _e('Address', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-address-<?php echo $gw;?>" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-address-<?php echo $gw;?>">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-city-<?php echo $gw;?>"><?php _e('City', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-city-<?php echo $gw;?>" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-city-<?php echo $gw;?>">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-state-<?php echo $gw;?>"><?php _e('State', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-state-<?php echo $gw;?>" class="required medium-txt <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-state-<?php echo $gw;?>">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-zip-<?php echo $gw;?>"><?php _e('Zip', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-zip-<?php echo $gw;?>" class="required small-txt <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-zip-<?php echo $gw;?>">
			</p>

			<h5><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></h5>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-card-nmbr-<?php echo $gw;?>"><?php _e('Card Number', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-card-nmbr-<?php echo $gw;?>" class="required <?php echo $css_class; ?>" type="text" name="reg-page-billing-card-nmbr-<?php echo $gw;?>"/>
			</p>

			<?php /*
			  <p class="reg-page-form-field-wrap-pg">
			  <label for="reg-page-billing-card-exp-date"><?php _e('Expiry Date', 'event_espresso'); ?> <em>*</em></label>
			  <input id="reg-page-billing-card-exp-date" class="required medium-txt <?php echo $css_class;?>" type="text" name="reg-page-billing-card-exp-date"/>
			  </p>
			 */ ?>
			<p class="reg-page-form-field-wrap-pg">
				<label><?php _e('Expiry Date', 'event_espresso'); ?> <em>*</em></label>
				<select id="reg-page-billing-card-exp-date-mnth-<?php echo $gw;?>" class="required small-txt <?php echo $css_class; ?>" name="reg-page-billing-card-exp-date-mnth-<?php echo $gw;?>">
					<?php
					for ($x = 1; $x <= 12; $x++) {
						$value = $x < 10 ? '0' . $x : $x;
						echo '
						<option value="' . $value . '">' . $value . '</option>';
					}
					?>
				</select>
				&nbsp;/&nbsp;
				<select id="reg-page-billing-card-exp-date-year-<?php echo $gw;?>" class="required small-txt <?php echo $css_class; ?>" name="reg-page-billing-card-exp-date-year-<?php echo $gw;?>">
					<?php
					$current_year = date('Y');
					$next_decade = $current_year + 10;
					for ($x = $current_year; $x <= $next_decade; $x++) {
						$value = $x < 10 ? '0' . $x : $x;
						echo '
						<option value="' . $value . '">' . $value . '</option>';
					}
					?>
				</select>
				<span class="small-text lt-grey-text"><?php _e('(mm/yy)', 'event_espresso'); ?></span>
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-card-ccv-code-<?php echo $gw;?>"><?php _e('CCV Code', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-card-ccv-code-<?php echo $gw;?>"  class="required small-txt <?php echo $css_class; ?>" type="text" name="reg-page-billing-card-ccv-code-<?php echo $gw;?>"/>
			</p>

		</div>

		<?php
	}

	function espresso_reg_page_billing_inputs() {
		$reg_page_billing_inputs = array(
				'reg-page-billing-fname-' . $this->_gateway_name => array(
						'db-col' => 'fname',
						'label' => __('First Name', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-lname-' . $this->_gateway_name => array(
						'db-col' => 'lname',
						'label' => __('Last Name', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-email-' . $this->_gateway_name => array(
						'db-col' => 'email',
						'label' => __('Email Address', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'email',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-address-' . $this->_gateway_name => array(
						'db-col' => 'address',
						'label' => __('Address', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-city-' . $this->_gateway_name => array(
						'db-col' => 'city',
						'label' => __('City', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-state-' . $this->_gateway_name => array(
						'db-col' => 'state',
						'label' => __('State', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-zip-' . $this->_gateway_name => array(
						'db-col' => 'zip',
						'label' => __('Zip Code', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-card-nmbr-' . $this->_gateway_name => array(
						'db-col' => 'card-nmbr',
						'label' => __('Credit Card Number', 'event_espresso'),
						'input' => 'text',
						'type' => 'int',
						'sanitize' => 'ccard',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%d'
				),
				'reg-page-billing-card-exp-date-mnth-' . $this->_gateway_name => array(
						'db-col' => 'exp-date-mnth',
						'label' => __('Expiry Date Month', 'event_espresso'),
						'input' => 'select',
						'type' => 'int',
						'sanitize' => 'ccmm',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-card-exp-date-year-' . $this->_gateway_name => array(
						'db-col' => 'exp-date-year',
						'label' => __('Expiry Date Year', 'event_espresso'),
						'input' => 'select',
						'type' => 'int',
						'sanitize' => 'ccyy',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-card-ccv-code-' . $this->_gateway_name => array(
						'db-col' => 'ccv-code',
						'label' => __('CCV Code', 'event_espresso'),
						'input' => 'text',
						'type' => 'int',
						'sanitize' => 'ccv',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%d'
				)
		);

		return $reg_page_billing_inputs;
	}
} //end class
