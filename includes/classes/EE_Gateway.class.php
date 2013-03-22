<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );

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
 * @subpackage	gateways/
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Gateway {

	private $_session_gateway_data = NULL;
	protected $_payment_settings = array();
	// gateway name 
	protected $_gateway_name = NULL;
	// path to gateway class file 
	protected $_path = NULL;
	// image name for gateway button
	protected $_button_base = NULL;
	// holder for a handle to the Gateways MODEL
	protected $_EEM_Gateways = NULL;
	// URL the admin gateway settings form will submit to
	protected $_form_url = NULL;
	protected $_selected = FALSE;
	// css classes for gateway details and form div on reg page
	protected $_css_class = 'hidden';
	// css classes for gateway button div on reg page
	protected $_css_link_class = '';
	// list of options for building Yes or NO dropdown boxes
	protected $_yes_no_options = array();
	//output log for emailing on ipns, or echoing out where appropriate,e tc.
	protected $_debug_log = '';
	/**
	 * whether this gateway should be in debug mode or not. If it is, we'll probably
	 * send the website admin IPN messages and show debug info, etc.
	 * Can be activated with sandbox mode or not, whatever you want. 
	 */
	protected $_debug_mode = FALSE;
	
	/**
	 * Transaction model for querying
	 * @var EEM_Transaction
	 */
	protected $_TXN = null;
	
	/**
	 * Payment model for querying
	 * @var EEM_Payment 
	 */
	protected $_PAY = null;
	
	
	
	/**
	 * Registration model for querying
	 * @var EEM_Registration
	 */
	protected $_REG = null;

	abstract protected function _default_settings();
	abstract protected function _update_settings();
	abstract protected function _display_settings();
	abstract public function espresso_display_payment_gateways();
	
	protected function __construct(EEM_Gateways &$model) {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		//echo '<h4>$this->_gateway_name : ' . $this->_gateway_name . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		if (!defined('GATEWAYS_ADMIN_URL')) {
			define('GATEWAYS_ADMIN_URL', admin_url('admin.php?page=espresso_payment_settings'));
		}

		$this->_EEM_Gateways = $model;
		require_once('EEM_Transaction.model.php');
		require_once('EE_Transaction.class.php');
		$this->_TXN = EEM_Transaction::instance();
		require_once('EEM_Payment.model.php');
		require_once('EE_Payment.class.php');
		$this->_PAY = EEM_Payment::instance();
		require_once('EEM_Registration.model.php');
		require_once('EE_Registration.class.php');
		$this->_REG = EEM_Registration::instance();
		$this->_set_default_properties();
		$this->_handle_payment_settings();

		if (is_admin() && !empty($_GET['page']) && $_GET['page'] == 'espresso_payment_settings') {
			$this->_gateways_admin();
		} else {
			$this->_gateways_frontend();
		}

		//load formatter helper and form fields helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Formatter.helper.php';
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php';
	}
	
	public function process_reg_step_3(){
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		return array('success'=>TRUE);
	}
	
	/**
	 * Adds the msg to the debug output log, for sending emails on ipns, or whatever
	 * @param string $msg
	 * @return void
	 */
	protected function _debug_log($msg){
		$this->_debug_log.="<br>".$msg;
	}
	
	
	/**
	 * returns a string of the gateway's debug output.
	 * @return string
	 */
	public function get_debug_log(){
		return $this->_debug_log;
	}

	protected function _set_default_properties() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		// list of options for building Yes or NO dropdown boxes
		$this->_yes_no_options = array(
				array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
				array('id' => FALSE, 'text' => __('No', 'event_espresso'))
		);
	}

	private function _handle_payment_settings() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		if (!$this->_payment_settings = $this->_EEM_Gateways->payment_settings($this->_gateway_name)) {
			
			$this->_default_settings();
			if ($this->_EEM_Gateways->update_payment_settings($this->_gateway_name, $this->_payment_settings)) {
				$msg = sprintf( __( '%s payment settings initialized.', 'event_espresso' ), $this->_payment_settings['display_name'] );
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			} else {
				$msg = sprintf( __( '%s payment settings were not initialized.', 'event_espresso' ), $this->_payment_settings['display_name'] );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
		}else{
			$this->_debug_mode = array_key_exists('use_sandbox',$this->_payment_settings)?intval($this->_payment_settings['use_sandbox']):false;
		}
	}

	private function _gateways_admin() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->add_settings_page_meta_box();
		// if our current path is empty or doesn't match what's in the db, then maybe something changed?
		if ($this->_payment_settings['current_path'] == '' || $this->_payment_settings['current_path'] != $this->_path) {
			$this->_reset_button_url();
		}
		if (!empty($_REQUEST['activate_' . $this->_gateway_name])) {
			$this->_EEM_Gateways->set_active($this->_gateway_name);
		}
		if (!empty($_REQUEST['deactivate_' . $this->_gateway_name])) {
			$this->_EEM_Gateways->unset_active($this->_gateway_name);
		}

		if (isset($_POST['update_' . $this->_gateway_name]) && check_admin_referer('espresso_form_check', 'add_' . $this->_gateway_name . '_settings')) {
			//printr( $_POST, 'POST' );		
			$this->_update_settings();
			if ($this->_EEM_Gateways->update_payment_settings($this->_gateway_name, $this->_payment_settings)) {
				$msg = sprintf( __( '%s payment settings updated.', 'event_espresso' ), $this->_payment_settings['display_name'] );
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			} else {
				$msg = sprintf( __( '%s payment settings were not updated.', 'event_espresso' ), $this->_payment_settings['display_name'] );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
		}
	}
	
	

	private function _gateways_frontend() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $EE_Session;
		add_action('action_hook_espresso_display_payment_gateways', array(&$this, 'espresso_display_payment_gateways'));
		// grab session data for this gateway
		if ($this->_session_gateway_data = $EE_Session->get_session_data($this->_gateway_name, "gateway_data")) {
			if (!empty($this->_session_gateway_data['form_url'])) {
				$this->_form_url = $this->_session_gateway_data['form_url'];
			}
			if (!empty($this->_session_gateway_data['css_class'])) {
				$this->_css_class = $this->_session_gateway_data['css_class'];
			}
			if (!empty($this->_session_gateway_data['selected'])) {
				$this->_selected = $this->_session_gateway_data['selected'];
				//$this->_update_actions();
			}
			if (!empty($this->_session_gateway_data['css_link_class'])) {
				$this->_css_link_class = $this->_session_gateway_data['css_link_class'];
			}
		}
	}

	/**
	 *  Gets the URL that the user should generally be sent back to after payment completion offiste
	 *  Adds the reg_url_link in order to remember which session we were in the middle of processing
	 * @param EE_Registration or int, current registration we want to link back to in the return url.
	 * @param boolean $urlencode whether or not to url-encode the url (if true, you probably intend to pass
	 * this string as a URL parameter itself, or maybe a post parameter)
	 *  @return string URL on the current site of the thank_you page, with parameters added on to know which registration was just 
	 * processed in order to correctly display the payment status. And it gets URL-encoded by default
	 */
	protected function _get_return_url( $registration, $urlencode = false ){
		global $org_options;
		//if $registration is an ID instead of an EE_Registration, make it an EE_Registration
		if( ! $registration instanceof EE_Registration){
			$registration = $this->_REG->get_one_by_ID($registration);
		}
		if(empty($registration)){
			$msg[0]=__("Cannot get Return URL for gateway. Invalid registration",'event_espresso');
			$msg[1]=sprinf(__("Registration being used is %s.",'event_espresso'),  print_r($registration, true));
			EE_Error::add_error(implode("||", $msg), __FILE__, __FUNCTION__, __LINE__);
			return '';
		}
		//get a registration that's currently getting processed
		/*@var $registration EE_Registration */
		$url=add_query_arg(array('e_reg_url_link'=>$registration->reg_url_link()),
				get_permalink($org_options['return_url']));
		if($urlencode){
			$url=urlencode($url);
		}
		return $url;
	}
	
	public function gateway() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, ' $this->_gateway_name = ' . $this->_gateway_name );
		return $this->_gateway_name;
	}

	public function add_settings_page_meta_box() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $espresso_premium;
		$default_gateways = array( 'Bank', 'Check', 'Invoice', 'Paypal_Standard' );
		if (( $espresso_premium || in_array( $this->_gateway_name, $default_gateways )) && isset( $this->_payment_settings['display_name'] )){
			add_meta_box(
						'espresso_' . $this->_gateway_name . '_payment_settings', $this->_payment_settings['display_name'] . ' ' . __('Settings', 'event_espresso'), array(&$this, 'settings_meta_box'), 'event-espresso_page_espresso_payment_settings', 'normal'
			);
		}
	}

	public function settings_meta_box() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $espresso_premium;
		$default_gateways = array( 'Bank', 'Check', 'Invoice', 'Paypal_Standard' );
		if ( ! $espresso_premium && ! in_array( $this->_gateway_name, $default_gateways )) {
			return;
		}
		?>

		<a name="<?php echo $this->_gateway_name; ?>" id="<?php echo $this->_gateway_name; ?>"></a>
		<div class="padding">
		<?php if ( ! $this->_EEM_Gateways->is_active($this->_gateway_name)) { 
						$activate = add_query_arg(array('activate_' . $this->_gateway_name => 'true'), GATEWAYS_ADMIN_URL) . '#' . $this->_gateway_name; 
		?>
				<table class="form-table">
					<tbody>
						<tr>
							<th>
								<label><?php _e('Click to Activate', 'event_espresso'); ?></label>
							</th>
							<td>				
								<a id="activate_<?php echo $this->_gateway_name; ?>" class="espresso-button-green button-primary" onclick="location.href='<?php echo $activate; ?>'">
									<?php echo __('Activate', 'event_espresso') . ' ' . $this->_payment_settings['display_name'] . ' ' . __('Payments?'); ?>
								</a>
							</td>
						</tr>
					</tbody>
				</table>
		<?php } else { 
						$this->_display_settings_wrapper();
					} 
		?>
		</div> <!-- Class=padding -->
		<?php
	}

	private function _display_settings_wrapper() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$form_url = GATEWAYS_ADMIN_URL . '#' . $this->_gateway_name;
		?>
			<form method="post" action="<?php echo $form_url; ?>">
				<table class="form-table">
					<tbody>
						<?php if ( $this->_payment_settings['type'] == 'on-site' ) : ?>
						<tr>
							<th>
								<label><strong style="color:#F00"><?php _e('WARNING !!!', 'event_espresso'); ?></strong></label>
							</th>
							<td>				
								<strong><?php _e('You are responsible for your own security and Payment Card Industry Data Security Standards (PCI DSS) compliance.', 'event_espresso');?></strong><br />
								<?php _e('Click here for more information about ', 'event_espresso');?>
								<a href="https://www.pcisecuritystandards.org/merchants/index.php">
									<?php _e('PCI DSS compliance', 'event_espresso');?>
								</a>
							</td>
						</tr>
						<?php endif; ?>
					
						<?php $this->_display_settings(); ?>
					
						<tr>
							<th>
								<label><?php _e('Current Button Image', 'event_espresso'); ?></label>
							</th>
							<td>
					<?php echo '<img src="' . $this->_payment_settings['button_url'] . '" />'; ?>
							</td>
						</tr>

						<tr>
							<th></th>
							<td>
								<p>
									<input type="hidden" name="update_<?php echo $this->_gateway_name; ?>" value="1">
									<input 
											id="save_<?php echo $this->_gateway_name; ?>_settings"
											class="button-primary" 
											type="submit" 
											name="Submit" 
											value="<?php echo __('Update', 'event_espresso') . ' ' . $this->_payment_settings['display_name'] . ' ' . __('Settings', 'event_espresso');?>" 
											style="margin:1em 4em 2em 0"
										/>
									<?php $deactivate = add_query_arg(array('deactivate_' . $this->_gateway_name => 'true'), GATEWAYS_ADMIN_URL) . '#' . $this->_gateway_name; ?>
									<a id="deactivate_<?php echo $this->_gateway_name; ?>" class="espresso-button button-secondary" type="submit" onclick="location.href='<?php echo $deactivate; ?>'">
										<?php echo __('Deactivate', 'event_espresso') . ' ' . $this->_payment_settings['display_name'] . ' ' . __('Payments?'); ?>
									</a>
								</p>
							</td>
						</tr>
					</tbody>
				</table>

			<?php wp_nonce_field('espresso_form_check', 'add_' . $this->_gateway_name . '_settings'); ?>

			</form>
		<?php
		$this->_display_settings_help();
	}

	public function set_form_url($base_url = FALSE) {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		if (!$base_url) {
			return FALSE;
		}
		$this->_form_url = add_query_arg(array('e_reg' => 'register', 'step' => 2, 'payment' => $this->_gateway_name), $base_url);
		$this->_set_session_data();
		return TRUE;
	}

	public function set_selected() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->_selected = TRUE;
		//$this->_update_actions();
		$this->_css_class = '';
		$this->_css_link_class = '';
		$this->_set_session_data();
	}

	public function unset_selected() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->_css_class = 'hidden';
		$this->_selected = FALSE;
		//$this->_update_actions();
		$this->_css_link_class = '';
		$this->_set_session_data();
	}

	public function set_hidden() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->_css_class = 'hidden';
		$this->_selected = FALSE;
		//$this->_update_actions();
		$this->_css_link_class = ' hidden';
		$this->_set_session_data();
	}

	private function _set_session_data() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $EE_Session;
		$EE_Session->set_session_data(
				array(
							$this->_gateway_name => array(
									'form_url' => $this->_form_url,
									'selected' => $this->_selected,
									'css_class' => $this->_css_class,
									'css_link_class' => $this->_css_link_class
							)
						), 'gateway_data');
	}

	public function reset_session_data() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->_form_url = NULL;
		$this->_css_class = 'hidden';
		$this->_selected = FALSE;
		$this->_css_link_class = '';
		$this->_set_session_data();
	}


	protected function _reset_button_url() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		$in_uploads = $this->_EEM_Gateways->is_in_uploads($this->_gateway_name);
		if (is_array($in_uploads) && $in_uploads[$this->_gateway_name]) {
			$button_url = EVENT_ESPRESSO_GATEWAY_URL . "/" . $this->_gateway_name . '/lib/' . $this->_button_base;
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/" . $this->_gateway_name . '/lib/' . $this->_button_base;
		}
		$this->_payment_settings['button_url'] = $button_url;
		// change windows style filepaths to Unix style filepaths
		$this->_payment_settings['current_path'] = str_replace('\\', '/', $this->_path);

		if ($this->_EEM_Gateways->update_payment_settings($this->_gateway_name, $this->_payment_settings)) {
			$msg = sprintf( __( 'The %s button URL was reset.', 'event_espresso' ), $this->_payment_settings['display_name'] );
			EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
		} else {
			$msg = sprintf( __( 'An error occured. The %s button URL was not reset.', 'event_espresso' ), $this->_payment_settings['display_name'] );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
	}

	/**
	 * 		generates HTML for the payment gateway selection button during registration
	 * 		@access 		protected
	 * 		@return 		string
	 */
	protected function _generate_payment_gateway_selection_button() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		return '
		 <div id="' . $this->_gateway_name . '-payment-option-dv" class="'. $this->_payment_settings['type'] .'-payment-gateway reg-page-payment-option-dv' . $this->_css_link_class . '">
			<a id="payment-gateway-button-' . $this->_gateway_name . '" class="reg-page-payment-option-lnk" rel="' . $this->_gateway_name . '" href="' . $this->_form_url . '" >
				<img src="' . $this->_payment_settings['button_url'] . '" alt="Pay using ' . $this->_payment_settings['display_name'] . '" />
			</a>
		</div>
';
	}
	
	/**
	 * States whether this gateway is in debug mode or not. if it is, then we'll be
	 * displaying debug info, and email the admin debug info.
	 * @return boolean
	 */
	public function debug_mode_active(){
		return $this->_debug_mode;
	}
	
	/**
	 * 		process registration payment. Updates the transaction with the data
	 *		concerning the payment already in the session.
	 *		
	 *
	 * 		@access 		private
	 * 		@param 		boolean 		$perform_redirect  - whether to send JSON response or redirect
	 * 		@return 		JSON			or redirect
	 */
	/*public function thank_you_page() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $EE_Session;
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );

		$success_msg = FALSE;
		$error_msg = FALSE;

		// grab session data
		$session = $EE_Session->get_session_data();
		//printr( $session, 'session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); 
		//die();
		//check that we hvae the info we need in the session before proceeding.
		//if its not there, maybe it's just a regular page load, not
		//a return from a payment gateway
		//either way, we can't do anything. so return.
		if(!array_key_exists('transaction', $session) 
				|| !array_key_exists('txn_results',$session)){
			return;
		}
		$transaction = $session['transaction'];
		$txn_results = $session['txn_results'];
		// $txn_results['txn_results'] = $session;

		$txn_results['amount'] = isset($txn_results['amount']) ? $txn_results['amount'] : 0.00;
		$txn_results['method'] = isset($txn_results['method']) ? $txn_results['method'] : '';

		switch ($txn_results['status']) {

			case 'Approved' :
				$pay_status = 'PAP';
				$success_msg = $txn_results['response_msg'];
				do_action('action_hook_espresso_reg_approved');
				break;
			
			case 'Declined' :
				$pay_status = 'PDC';
				$error_msg = __('We\'re sorry, but the transaction was declined for the following reasons: <br />', 'event_espresso') . '<b>' . $txn_results['response_msg'] . '</b>';
				do_action('action_hook_espresso_reg_declined');
				break;

			case 'Cancelled' :
				$pay_status = 'PCN';
				$error_msg = __('The Transaction was cancelled.', 'event_espresso');
				do_action('action_hook_espresso_reg_cancelled');
				break;

			case 'FAILED' :
				$pay_status = 'PFL';
				$error_msg = __('We\'re sorry, but an error occured and the transaction could not be completed. Please try again. If problems persist, contact the site administrator.', 'event_espresso');
				do_action('action_hook_espresso_reg_incomplete');
				break;
		}
		
		$txn_status = 'TPN';
		
		// did transaction require payment now ? later ? or was it free ?
		if ( $transaction->total() > 0 ) {
		
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Payment.model.php');
			EEM_Payment::instance();
			$payment = new EE_Payment( 
																	$transaction->ID(), 
																	$pay_status,
																	$transaction->datetime(), 
																	$txn_results['method'], 
																	$txn_results['amount'],
																	$this->_payment_settings['display_name'],
																	$txn_results['response_msg'],
																	$txn_results['transaction_id'],
																	NULL,
																	$session['primary_attendee']['registration_id'],
																	FALSE,
																	maybe_serialize( $txn_results )
																);
			$results = $payment->insert();
			if (!$results) {
				$error_msg = __('There was a problem inserting your payment into our records. Do not attempt the transaction again. Please contact support.', 'event_espresso');
			}
		
//printr( $payment, '$payment  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );
//printr( $transaction, '$transaction  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );

		
			if ( $payment->amount() >= $transaction->total() ) {
				$txn_status = 'TCM';
			} 			
			
		//TODO: 	set $txn_status in gateway type classes
		} else {
			// but free events get set as completed !
			$txn_status = 'TCM';
		} 
		
		$transaction->set_paid($txn_results['amount']);
		$transaction->set_status($txn_status);
		$transaction->set_details( $txn_results );
		unset( $session['transaction'] );
		$transaction->set_txn_session_data( $session );

		if (isset($txn_results['md5_hash'])) {
			$transaction->set_hash_salt($txn_results['md5_hash']);
		}

		if (isset($session['taxes'])) {
			$tax_data = array('taxes' => $session['taxes'], 'tax_totals' => $session['tax_totals']);
			$transaction->set_tax_data($tax_data);
		}

		$transaction->update();
		//echo "NOT clearing session data in EE_gateway 476";
		//$this->_EEM_Gateways->reset_session_data();

//printr( $transaction, '$transaction  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );
//die();
//		printr( $EE_Session, '$EE_Session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); die();
//		die();
		

	}*/
	
	/**
	 * Logic general to all gateways on the thank you page. Mostly just updates the transaction
	 * @global EE_Sesison $EE_Session
	 * @param EE_Transaction $transaction
	 * @return boolean
	 */
	public function thank_you_page_logic(EE_Transaction $transaction){
		global $EE_Session;
		$session_data = $EE_Session->get_session_data();
		//update the session as if we just updated the session
		//...actually, I'm not sure if there's much to save. 
		unset($session_data['transaction']);
		$transaction->set_txn_session_data($session_data);
		$transaction->save();
		return true;
	}
	
	
	/**
	 * Updates the transaction according to teh payment info
	 * @param EE_Transaction or int $transaction the transaction to update, or its ID. Cannot be null.
	 * @param EE_Payment or int $payment the payment just made or its ID. If empty that's actually OK. It just means no payment has been made.
	 * @return boolean success
	 */
	public function update_transaction_with_payment($transaction,$payment){
		//@todo this could really use the payment's apply_payment_to_transaction method,
		//but there are some subtle differences... especially regarding the legacy txn_details\
		//getting set on the transaction. once those are remoevd, the transition would be easier
		if(empty($transaction)){
			return false;
		}
		if( ! $transaction instanceof EE_Transaction){
			$transaction = $this->_TXN->get_transaction($transaction);
		}
		if( ! $payment instanceof EE_Payment){
			$payment = $this->_PAY->get_payment_by_ID($payment);
		}
		//now, if teh payment's empty, we're going to update the transaction accordingly
		if(empty($payment)){
			$transaction->set_status($this->_TXN->pending_status_code);
			$legacy_txn_details = array(
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
			$transaction->set_details($legacy_txn_details);
		}else{
			//ok, now process the transaction according to the payment
			//NOTE: if we allow multiple payments someday, then we'll need to tally up all previous payments
			//to determine if the transactin oshould be marked as complete.
			if ( $transaction->total() == 0 || 
					( $payment->amount() >= $transaction->total() && $payment->STS_ID()==EEM_Payment::status_id_approved)) {
				$transaction->set_status(EEM_Transaction::complete_status_code);
				$transaction->set_paid($payment->amount());
			}else if ($payment->STS_ID() == EEM_Payment::status_id_pending){
				$transaction->set_status(EEM_Transaction::pending_status_code);
			}else{
				$transaction->set_status(EEM_Transaction::incomplete_status_code);
			}
			
			
			//create the legacy transaction details. Really this data is a duplication of the 
			//payment data, and should probably be removed as to avoid confusion
			$payment_details = $payment->details();
			$legacy_txn_details = array(
				'gateway' => $payment->gateway(),
				'approved' => $payment->STS_ID()==EEM_Payment::status_id_approved ? true : false,
				'response_msg' => $payment->pretty_status(),
				'status' => in_array($payment->STS_ID(),array(EEM_Payment::status_id_approved)) ? 'Completed' : 'Incomplete',
				'raw_response' => $payment_details,
				'amount' => $payment->amount(),
				'method' => 'CART',
				'auth_code' => array_key_exists('payer_id',$payment_details) ? $payment_details['payer_id'] : '',
				'md5_hash' => array_key_exists('verify_sign',$payment_details) ? $payment_details['verify_sign'] : '',
				//'invoice_number' => sanitize_text_field($_POST['invoice_id']),
				//'transaction_id' => sanitize_text_field($_POST['ipn_track_id'])
			);
			$transaction->set_details($legacy_txn_details);
			//old code also set the hash_salt, added teh transaction to the session, and setted_tax_data.
			//but I don't see either how those are necessary, or why they should be handled in the page's controller.
			//the hash_salt doesn't seem to be used anywhere. 
			//The tax data should be added on the thankyou page, not here, as this may be an IPN.
			//updating teh transaction in the session should be done on the thank you page, as taht's where the session is always available.
		}	
		$transaction->update();
		do_action( 'action_hook_espresso__EE_Gateway__update_transaction_with_payment__done', $transaction, $payment );
		return true;
	}
	
	/**
	 * For adding any html output ab ove the payment overview.
	 * Many gateways won't want ot display anything, so this function just returns an empty string.
	 * Other gateways may want to override this, such as offline gateways.
	 * @return string
	 */
	public function get_payment_overview_content(EE_Payment $payment){
		//stubb
		echo "";//just echo out a single space, so the output buffer that's listening doesnt complain its empty
	}

}

