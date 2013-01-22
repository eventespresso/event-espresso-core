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
	protected $_gateway = NULL;
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

	abstract protected function _default_settings();
	abstract protected function _update_settings();
	abstract protected function _display_settings();
	abstract public function espresso_display_payment_gateways();
	
	protected function __construct(EEM_Gateways &$model) {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		//echo '<h4>$this->_gateway : ' . $this->_gateway . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		if (!defined('GATEWAYS_ADMIN_URL')) {
			define('GATEWAYS_ADMIN_URL', admin_url('admin.php?page=payment_gateways'));
		}

		$this->_EEM_Gateways = $model;
		$this->_set_default_properties();
		$this->_handle_payment_settings();

		if (is_admin() && !empty($_GET['page']) && $_GET['page'] == 'payment_gateways') {
			$this->_gateways_admin();
		} else {
			$this->_gateways_frontend();
		}
	}
	
	public function process_reg_step_3(){
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		return array('success'=>TRUE);
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

		if (!$this->_payment_settings = $this->_EEM_Gateways->payment_settings($this->_gateway)) {
			$this->_default_settings();
			if ($this->_EEM_Gateways->update_payment_settings($this->_gateway, $this->_payment_settings)) {
				$msg = sprintf( __( '%s payment settings initialized.', 'event_espresso' ), $this->_payment_settings['display_name'] );
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			} else {
				$msg = sprintf( __( '%s payment settings were not initialized.', 'event_espresso' ), $this->_payment_settings['display_name'] );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
		}
	}

	private function _gateways_admin() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		add_action('admin_init', array(&$this, 'add_settings_page_meta_box'));
		// if our current path is empty or doesn't match what's in the db, then maybe something changed?
		if ($this->_payment_settings['current_path'] == '' || $this->_payment_settings['current_path'] != $this->_path) {
			$this->_reset_button_url();
		}
		if (!empty($_REQUEST['activate_' . $this->_gateway])) {
			$this->_EEM_Gateways->set_active($this->_gateway);
		}
		if (!empty($_REQUEST['deactivate_' . $this->_gateway])) {
			$this->_EEM_Gateways->unset_active($this->_gateway);
		}

		if (isset($_POST['update_' . $this->_gateway]) && check_admin_referer('espresso_form_check', 'add_' . $this->_gateway . '_settings')) {
			//printr( $_POST, 'POST' );		
			$this->_update_settings();
			if ($this->_EEM_Gateways->update_payment_settings($this->_gateway, $this->_payment_settings)) {
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
		if ($this->_session_gateway_data = $EE_Session->get_session_data($this->_gateway, "gateway_data")) {
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

	public function gateway() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, ' $this->_gateway = ' . $this->_gateway );
		return $this->_gateway;
	}

	public function add_settings_page_meta_box() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		if ( isset($this->_payment_settings['display_name'] ) )
			add_meta_box(
							'espresso_' . $this->_gateway . '_gateway_settings', $this->_payment_settings['display_name'] . ' ' . __('Settings', 'event_espresso'), array(&$this, 'settings_meta_box'), 'event-espresso_page_payment_gateways'
			);
	}

	public function settings_meta_box() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $espresso_premium;

		if ($espresso_premium != true) {
			return;
		}
		?>

		<a name="<?php echo $this->_gateway; ?>" id="<?php echo $this->_gateway; ?>"></a>
		<div class="padding">
		<?php if ( ! $this->_EEM_Gateways->is_active($this->_gateway)) { 
						$activate = add_query_arg(array('activate_' . $this->_gateway => 'true'), GATEWAYS_ADMIN_URL) . '#' . $this->_gateway; 
		?>
				<table class="form-table">
					<tbody>
						<tr>
							<th>
								<label><?php _e('Click to Activate', 'event_espresso'); ?></label>
							</th>
							<td>				
								<a id="activate_<?php echo $this->_gateway; ?>" class="espresso-button-green button-primary" onclick="location.href='<?php echo $activate; ?>'">
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
		$form_url = GATEWAYS_ADMIN_URL . '#' . $this->_gateway;
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
									<input type="hidden" name="update_<?php echo $this->_gateway; ?>" value="1">
									<input 
											id="save_<?php echo $this->_gateway; ?>_settings"
											class="button-primary" 
											type="submit" 
											name="Submit" 
											value="<?php echo __('Update', 'event_espresso') . ' ' . $this->_payment_settings['display_name'] . ' ' . __('Settings', 'event_espresso');?>" 
											style="margin:1em 4em 2em 0"
										/>
									<?php $deactivate = add_query_arg(array('deactivate_' . $this->_gateway => 'true'), GATEWAYS_ADMIN_URL) . '#' . $this->_gateway; ?>
									<a id="deactivate_<?php echo $this->_gateway; ?>" class="espresso-button-red button-primary" type="submit" onclick="location.href='<?php echo $deactivate; ?>'">
										<?php echo __('Deactivate', 'event_espresso') . ' ' . $this->_payment_settings['display_name'] . ' ' . __('Payments?'); ?>
									</a>
								</p>
							</td>
						</tr>
					</tbody>
				</table>

			<?php wp_nonce_field('espresso_form_check', 'add_' . $this->_gateway . '_settings'); ?>

			</form>
		<?php
		$this->_display_settings_help();
	}

	public function set_form_url($base_url = FALSE) {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		if (!$base_url) {
			return FALSE;
		}
		$this->_form_url = add_query_arg(array('e_reg' => 'register', 'step' => 2, 'payment' => $this->_gateway), $base_url);
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
							$this->_gateway => array(
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
		
		$in_uploads = $this->_EEM_Gateways->is_in_uploads($this->_gateway);
		if (is_array($in_uploads) && $in_uploads[$this->_gateway]) {
			$button_url = EVENT_ESPRESSO_GATEWAY_URL . "/" . $this->_gateway . '/lib/' . $this->_button_base;
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/" . $this->_gateway . '/lib/' . $this->_button_base;
		}
		$this->_payment_settings['button_url'] = $button_url;
		// change windows style filepaths to Unix style filepaths
		$this->_payment_settings['current_path'] = str_replace('\\', '/', $this->_path);

		if ($this->_EEM_Gateways->update_payment_settings($this->_gateway, $this->_payment_settings)) {
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
		 <div id="' . $this->_gateway . '-payment-option-dv" class="'. $this->_payment_settings['type'] .'-payment-gateway reg-page-payment-option-dv' . $this->_css_link_class . '">
			<a id="payment-gateway-button-' . $this->_gateway . '" class="reg-page-payment-option-lnk" rel="' . $this->_gateway . '" href="' . $this->_form_url . '" >
				<img src="' . $this->_payment_settings['button_url'] . '" alt="Pay using ' . $this->_payment_settings['display_name'] . '" />
			</a>
		</div>
';
	}
	
	/**
	 * 		process registration payment
	 *
	 * 		@access 		private
	 * 		@param 		boolean 		$perform_redirect  - whether to send JSON response or redirect
	 * 		@return 		JSON			or redirect
	 */
	public function thank_you_page() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $EE_Session;
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );

		$success_msg = FALSE;
		$error_msg = FALSE;

		// grab session data
		$session = $EE_Session->get_session_data();
		//printr( $session, 'session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); 
		//die();

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
		$this->_EEM_Gateways->reset_session_data();

//printr( $transaction, '$transaction  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );
//die();
//		printr( $EE_Session, '$EE_Session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); die();
//		die();

	}

}
