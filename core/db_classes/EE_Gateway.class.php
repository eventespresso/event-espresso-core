<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

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
 * @ version		 	4.0
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
	// the default button url
	protected $_btn_img = NULL;
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
	 *
	 * @var EE_Registry
	 */
	protected $EE = null;


	/**
	 * Registration model for querying
	 * @var EEM_Registration
	 */
	protected $_REG = null;

	abstract protected function _default_settings();
	abstract protected function _update_settings();
	abstract protected function _display_settings();
	abstract public function espresso_display_payment_gateways( $selected_gateway = '');

	protected function __construct(EEM_Gateways &$model) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		//echo '<h4>$this->_gateway_name : ' . $this->_gateway_name . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';


		if (!defined('GATEWAYS_ADMIN_URL')) {
			define('GATEWAYS_ADMIN_URL', admin_url('admin.php?page=espresso_payment_settings'));
		}

		$this->_EEM_Gateways = $model;
		require_once( EE_MODELS . 'EEM_Transaction.model.php');
		require_once( EE_CLASSES . 'EE_Transaction.class.php');
		$this->_TXN = EEM_Transaction::instance();
		require_once( EE_MODELS . 'EEM_Payment.model.php');
		require_once( EE_CLASSES . 'EE_Payment.class.php');
		$this->_PAY = EEM_Payment::instance();
		require_once( EE_MODELS . 'EEM_Registration.model.php');
		require_once( EE_CLASSES . 'EE_Registration.class.php');
		$this->_REG = EEM_Registration::instance();
		if( ! $this->_btn_img){
			$this->_btn_img = EE_GATEWAYS_URL .$this->_gateway_name.DS.'lib'.DS.$this->_button_base;
		}
		$this->_set_default_properties();
		$this->_handle_payment_settings();

		if (is_admin() && !empty($_GET['page']) && $_GET['page'] == 'espresso_payment_settings') {
			$this->_gateways_admin();
		} else {
			$this->_gateways_frontend();
		}

		//load formatter helper and form fields helper
		EE_Registry::instance()->load_helper( 'Formatter' );
		EE_Registry::instance()->load_helper( 'Form_Fields' );
	}

	/**
	 * @param EE_Line_item $line_item
	 * @param EE_Transaction $transaction
	 * @param float $total_to_charge if different from the amoutn remaining
	 * @return array with either index 'success' in case of success, 'error' in case of error
	 */
	public function process_payment_start(EE_Line_Item $line_item, $transaction = null,$total_to_charge = NULL){
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
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
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// list of options for building Yes or NO dropdown boxes
		$this->_yes_no_options = array(
				array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
				array('id' => FALSE, 'text' => __('No', 'event_espresso'))
		);
	}

	private function _handle_payment_settings() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		//handle merging settings if we introduce new settings in the future
		$all_payment_settings = EE_Registry::instance()->CFG->gateway->payment_settings;
		$saved_settings = isset($all_payment_settings[$this->_gateway_name]) ? $all_payment_settings[$this->_gateway_name] : array();//$this->_EEM_Gateways->payment_settings($this->_gateway_name);
		//get default settings
		$this->_default_settings();
		$default_settings = $this->_payment_settings;
		if(is_array($saved_settings)){
			$saved_settings_has_all_needed_settings = true;
			foreach($default_settings as $key=> $value){
				if( ! isset($saved_settings[$key])){
					$saved_settings_has_all_needed_settings = false;
					break;
				}
			}
		}else{
			$saved_settings_has_all_needed_settings = false;
			$saved_settings = array();
		}
		//if we're missing some settings,set them and save the settings right away
		if ( ! $saved_settings_has_all_needed_settings) {

			$this->_payment_settings = array_merge($default_settings, $saved_settings);

			if ($this->_EEM_Gateways->update_payment_settings($this->_gateway_name, $this->_payment_settings)) {
				$msg = sprintf( __( '%s payment settings initialized.', 'event_espresso' ), $this->_payment_settings['display_name'] );
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			} else {
				$msg = sprintf( __( '%s payment settings were not initialized.', 'event_espresso' ), $this->_payment_settings['display_name'] );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
		}else{
			//ok so we didn't need to update gateway settings
			//...but when we fetched the default gateway settings, they set them!
			//so unset them to what they're saved to
			$this->_payment_settings = $saved_settings;
			$this->_debug_mode = array_key_exists('use_sandbox',$this->_payment_settings)?intval($this->_payment_settings['use_sandbox']):false;
		}
	}

	/**
	 * performs activating, deactivating, and updating gateways if proper $_POST parameters are sent
	 * This should probably be done in Payment_Admin_page on a separate route, not a function called by the gateway's constructor
	 */
	private function _gateways_admin() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		//require helpers
		require_once EE_HELPERS . 'EEH_Template.helper.php';
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
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		add_action( 'AHEE__display_payment_gateways', array( $this, 'espresso_display_payment_gateways'), 10, 1 );
		// grab session data for this gateway
		if ( $gateway_data = EE_Registry::instance()->SSN->get_session_data( 'gateway_data' )) {
			if ( isset( $gateway_data[ $this->_gateway_name ] )) {
				$this->_session_gateway_data = $gateway_data[ $this->_gateway_name ];
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
				get_permalink(EE_Registry::instance()->CFG->core->thank_you_page_id));
		if($urlencode){
			$url=urlencode($url);
		}
		return $url;
	}

	public function gateway() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, ' $this->_gateway_name = ' . $this->_gateway_name );
		return $this->_gateway_name;
	}

	public function add_settings_page_meta_box() {
		global $current_screen;
		$current_screen = get_current_screen();
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		add_meta_box(
					'espresso_' . $this->_gateway_name . '_payment_settings', $this->_payment_settings['display_name'] . ' ' . __('Settings', 'event_espresso'), array(&$this, 'settings_meta_box'), $current_screen->id, 'normal'
		);

	}

	/**
	 * deprecated. Probably should be used but isn't for makign help tab contnt
	 * @return string
	 */
	protected function _help_content() {
		return '';
	}

	/**
	 * deprecated. Probably should be used but isn't for makign help tab contnt
	 * @return string
	 */
	public function get_help_tab_content() {
		return $this->_help_content();
	}



	public function settings_meta_box() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
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
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$form_url = GATEWAYS_ADMIN_URL . '#' . $this->_gateway_name;
		?>
			<form method="post" action="<?php echo $form_url; ?>">
				<table class="form-table">
					<tbody>
						<?php if ( $this->_payment_settings['type'] == 'on-site' ) : ?>
						<tr>
							<th>
								<label><strong style="color:#F00"><?php _e('IMPORTANT', 'event_espresso'); ?></strong></label>
							</th>
							<td>
								<strong><?php _e('You are responsible for your own website security and Payment Card Industry Data Security Standards (PCI DSS) compliance.', 'event_espresso');?></strong><br />
								<?php _e('Learn more about ', 'event_espresso');?>
								<a href="https://www.pcisecuritystandards.org/merchants/index.php">
									<?php _e('PCI DSS compliance', 'event_espresso');?>
								</a>
							</td>
						</tr>
						<?php endif; ?>

						<?php $this->_display_settings(); ?>

						<tr>
							<th>
								<label for="<?php echo $this->_gateway_name; ?>_button_url">
									<?php _e('Button Image URL', 'event_espresso'); ?>
								</label>
							</th>
							<td>
								<?php
								$this->_payment_settings['button_url'] = empty( $this->_payment_settings['button_url'] ) ? $this->_btn_img : $this->_payment_settings['button_url']; ?>

								<span class='ee_media_uploader_area'>
									<img class="ee_media_image" src="<?php echo $this->_payment_settings['button_url']; ?>" />
									<input class="ee_media_url" type="text" name="button_url" size='34' value="<?php echo $this->_payment_settings['button_url']; ?>">
									<a href="#" class="ee_media_upload"><img src="images/media-button-image.gif" alt="Add an Image"></a>
								</span><br/>
							</td>
						</tr>

						<tr>
							<th>
								<input type="hidden" name="update_<?php echo $this->_gateway_name; ?>" value="1">
									<input
											id="save_<?php echo $this->_gateway_name; ?>_settings"
											class="button-primary"
											type="submit"
											name="Submit"
											value="<?php echo __('Update', 'event_espresso') . ' ' . $this->_payment_settings['display_name'] . ' ' . __('Settings', 'event_espresso');?>"
											style="margin:1em 4em 2em 0"
										/>
							</th>
							<td>
								<p>

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

	public function set_form_url( $base_url = FALSE ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		if ( ! $base_url ) {
			return FALSE;
		}
		$params = array( 'ee' => '_register', 'step' => 'payment_options', 'payment' => $this->_gateway_name );
		// returning from the thank you page ?
		if( EE_Registry::instance()->REQ instanceof EE_Request_Handler && EE_Registry::instance()->REQ->is_set( 'e_reg_url_link' )) {
			$params['e_reg_url_link'] = EE_Registry::instance()->REQ->get( 'e_reg_url_link' );
		}
		// are we returning to the page to edit attendee info or retry a payment?
		if ( EE_Registry::instance()->REQ instanceof EE_Request_Handler && EE_Registry::instance()->REQ->is_set( 'revisit' ) ) {
			$params['revisit'] = EE_Registry::instance()->REQ->get( 'revisit' ) == 1 ? TRUE : FALSE;
		}
		$this->_form_url = add_query_arg( $params, $base_url );
		$this->_set_session_data();
		return TRUE;
	}

	public function set_selected() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_selected = TRUE;
		//$this->_update_actions();
		$this->_css_class = '';
		$this->_css_link_class = '';
		$this->_set_session_data();
	}

	public function unset_selected() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_css_class = 'hidden';
		$this->_selected = FALSE;
		//$this->_update_actions();
		$this->_css_link_class = '';
		$this->_set_session_data();
	}

	public function set_hidden() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_css_class = 'hidden';
		$this->_selected = FALSE;
		//$this->_update_actions();
		$this->_css_link_class = ' hidden';
		$this->_set_session_data();
	}

	private function _set_session_data() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// get existing gateway data
		$gateway_data = EE_Registry::instance()->SSN->get_session_data( 'gateway_data' );
		// add this gateway
		$gateway_data[ $this->_gateway_name ] = array(
			'form_url' => $this->_form_url,
			'selected' => $this->_selected,
			'css_class' => $this->_css_class,
			'css_link_class' => $this->_css_link_class
		);
		EE_Registry::instance()->SSN->set_session_data( array( 'gateway_data' => $gateway_data ));
	}

	public function reset_session_data() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_form_url = NULL;
		$this->_css_class = 'hidden';
		$this->_selected = FALSE;
		$this->_css_link_class = '';
		$this->_set_session_data();
	}


	protected function _reset_button_url() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		$in_uploads = $this->_EEM_Gateways->is_in_uploads($this->_gateway_name);
		if (is_array($in_uploads) && $in_uploads[$this->_gateway_name]) {
			$button_url = EVENT_ESPRESSO_GATEWAY_URL . "/" . $this->_gateway_name . '/lib/' . $this->_button_base;
		} else {
			$button_url = $this->_btn_img;
		}
		$this->_payment_settings['button_url'] = $button_url;
		// change windows style filepaths to Unix style filepaths
		$this->_payment_settings['current_path'] = str_replace('\\', '/', $this->_path);

		if ($this->_EEM_Gateways->update_payment_settings($this->_gateway_name, $this->_payment_settings)) {
			$msg = sprintf( __( 'The %s button URL was reset.', 'event_espresso' ), $this->_payment_settings['display_name'] );
			EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
		} else {
			$msg = sprintf( __( 'An error occurred. The %s button URL was not reset.', 'event_espresso' ), $this->_payment_settings['display_name'] );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
	}

	/**
	 * 		generates HTML for the payment gateway selection button during registration
	 * 		@access 		protected
	 * 		@return 		string
	 */
	protected function _generate_payment_gateway_selection_button() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
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
	 * Logic general to all gateways on the thank you page. Mostly just updates the transaction
	 * @param EE_Transaction $transaction
	 * @return boolean
	 */
	public function thank_you_page_logic(EE_Transaction $transaction){
		// save the transaction to the db in case anything changed
		$transaction->save();
		return true;
	}


	/**
	 * Updates the transaction according to the payment info
	 * @param EE_Transaction or int $transaction the transaction to update, or its ID. Cannot be null.
	 * @param EE_Payment or int $payment the payment just made or its ID. If empty that's actually OK. It just means no payment has been made.
	 * @return boolean success
	 */
	public function update_transaction_with_payment($transaction,$payment){
		if(empty($transaction)){
			return false;
		}
		$transaction = $this->_TXN->ensure_is_obj($transaction);
		/* @var $transaction EE_transaction */
		//now, if the payment's empty, we're going to update the transaction accordingly
		if(empty($payment)){
			$transaction->set_status(EEM_Transaction::incomplete_status_code);
			$transaction->update_extra_meta('gateway', $this->_gateway_name);
			do_action( 'AHEE__EE_Gateway__update_transaction_with_payment__no_payment', $transaction );
		}else{
			$payment = $this->_PAY->ensure_is_obj($payment);
			//ok, now process the transaction according to the payment
			$transaction->update_based_on_payments();
			$transaction->update_extra_meta('gateway', $this->_gateway_name);
			do_action( 'AHEE__EE_Gateway__update_transaction_with_payment__done', $transaction, $payment );
		}
		$transaction->save();
		$transaction->finalize();
		return true;
	}

	/**
	 * For adding any html output ab ove the payment overview.
	 * Many gateways won't want ot display anything, so this function just returns an empty string.
	 * Other gateways may want to override this, such as offline gateways.
	 * @return string
	 */
	public function get_payment_overview_content(EE_Payment $payment){
		if( ! $payment->is_approved()){
			echo "<span class='error payment-problem'>".$payment->gateway_response()."</span>";
		}else{
			//stubb
			echo "";//just echo out a single space, so the output buffer that's listening doesnt complain its empty
		}
	}

	/**
	 * Gets the cancel URL
	 * @return string
	 */
	protected function _get_cancel_url(){
		return get_permalink(EE_Registry::instance()->CFG->core->cancel_page_id);
	}
}

