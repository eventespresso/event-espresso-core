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
 * @subpackage	gateways/
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Gateway {
	
	protected $_payment_settings = array();
	private $_session_gateway_data = NULL;
	// gateway name 
	protected $_gateway = NULL;
	// path to gateway class file 
	protected $_path = NULL;
	// image name for gateway button
	protected $_button_base = NULL;
	// holder for the Gateways MODEL
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
	
	// list of fields required for capturing the billing address 
	protected $_billing_info_address_fields = array();
	// list of fields required for capturing the credit card information
	protected $_billing_info_credit_card_fields = array();
	// list of fields required for capturing other information
	protected $_billing_info_other_fields = array();

	

	abstract protected function _default_settings();
	abstract protected function _update_settings();
	abstract protected function _display_settings();
	//abstract protected function _path();
	abstract public function espresso_display_payment_gateways();
	abstract public function espresso_gateway_process_step_3();
	abstract public function espresso_process_off_site_payment();



	protected function __construct(EEM_Gateways &$model) {

		//echo '<h4>$this->_gateway : ' . $this->_gateway . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		
		if (! defined('GATEWAYS_ADMIN_URL')) {
			define( 'GATEWAYS_ADMIN_URL', admin_url( 'admin.php?page=payment_gateways' ));
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



	private function _set_default_properties() {
		// list of options for building Yes or NO dropdown boxes
		$this->_yes_no_options = array(
				array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
				array('id' => FALSE, 'text' => __('No', 'event_espresso'))
		);
		// list of fields required for capturing the billing address 
		$this->_billing_info_address_fields = array(
						'reg-page-billing-fname',
						'reg-page-billing-lname',
						'reg-page-billing-email',
						'reg-page-billing-phone',
						'reg-page-billing-address',
						'reg-page-billing-city',
						'reg-page-billing-state',
						'reg-page-billing-zip'
				);
		
		// list of fields required for capturing the credit card information
		$this->_billing_info_credit_card_fields = array(
						'reg-page-billing-card-nmbr',
						'reg-page-billing-card-type',
						'reg-page-billing-card-exp-date-mnth',
						'reg-page-billing-card-exp-date-year',
						'reg-page-billing-card-ccv-code'
				);	

	}



	private function _handle_payment_settings() {
		if (!$this->_payment_settings = $this->_EEM_Gateways->payment_settings($this->_gateway)) {
			$this->_default_settings();
			if ($this->_EEM_Gateways->update_payment_settings($this->_gateway, $this->_payment_settings)) {
				$espresso_notices['success'][] = $this->_payment_settings['display_name'] . ' ' . __('Payment Settings Initialized!', 'event_espresso');
			} else {
				$espresso_notices['errors'][] = $this->_payment_settings['display_name'] . ' ' . __('Payment Settings were not initialized! ', 'event_espresso');
			}
		}
	}



	private function _gateways_admin() {
		add_action('admin_init', array(&$this, 'add_settings_page_meta_box'));
		// if our current path is empty or doesn't match what's in the db, then maybe something changed?
		if ( $this->_payment_settings['current_path'] == '' || $this->_payment_settings['current_path'] != $this->_path ) {
			$this->_reset_button_url();
		}
		if (!empty($_REQUEST['activate_' . $this->_gateway])) {
			$this->_EEM_Gateways->set_active($this->_gateway);
		}
		if (!empty($_REQUEST['deactivate_' . $this->_gateway])) {
			$this->_EEM_Gateways->unset_active($this->_gateway);
		}
		
		if ( isset( $_POST['update_' . $this->_gateway] ) && check_admin_referer( 'espresso_form_check', 'add_' . $this->_gateway . '_settings' )) {
			//printr( $_POST, 'POST' );		
			$this->_update_settings();
			if ($this->_EEM_Gateways->update_payment_settings($this->_gateway, $this->_payment_settings)) {
				$espresso_notices['success'][] = $this->_payment_settings['display_name'] . ' ' . __('Payment Settings Updated!', 'event_espresso');
			} else {
				$espresso_notices['errors'][] = $this->_payment_settings['display_name'] . ' ' . __('Payment Settings were not saved! ', 'event_espresso');
			}
		}		
	}



	private function _gateways_frontend() {
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
				$this->_update_actions();
			}
			if (!empty($this->_session_gateway_data['css_link_class'])) {
				$this->_css_link_class = $this->_session_gateway_data['css_link_class'];
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


		?>

		<a name="<?php echo $this->_gateway; ?>" id="<?php echo $this->_gateway; ?>"></a>
		<div class="padding">
			<ul id="payment-gateways-settings-ul">
				<?php if (!$this->_EEM_Gateways->is_active($this->_gateway)) { ?>
					<?php $activate = add_query_arg( array( 'activate_' . $this->_gateway => 'true'  ), GATEWAYS_ADMIN_URL ).'#'.$this->_gateway;?>
					<li id="activate_<?php echo $this->_gateway; ?>" class="green_alert pointer" onclick="location.href='<?php echo $activate;?>'">
						<strong><?php echo __('Activate', 'event_espresso') . ' ' . $this->_payment_settings['display_name'] . ' ' . __('Payments?');?></strong>
					</li>
				<?php } else { ?>
					<?php $deactivate = add_query_arg( array( 'deactivate_' . $this->_gateway => 'true'  ), GATEWAYS_ADMIN_URL ).'#'.$this->_gateway;?>
					<li id="deactivate_<?php echo $this->_gateway; ?>" class="red_alert pointer" onclick="location.href='<?php echo $deactivate; ?>'">
						<strong><?php echo __('Deactivate', 'event_espresso') . ' ' . $this->_payment_settings['display_name'] . ' ' . __('Payments?');?></strong>
					</li>
					<?php
					$this->_display_settings_wrapper();
				}
				?>
			</ul>
		</div> <!-- Class=padding -->
		<?php
	}



	private function _display_settings_wrapper() {
		$form_url = GATEWAYS_ADMIN_URL . '#' . $this->_gateway;
		?>
		<form method="post" action="<?php echo $form_url; ?>">
			<table class="form-table">
				<tbody>
					<?php $this->_display_settings(); ?>
					<tr>
						<th>
							<label><?php _e('Current Button Image', 'event_espresso'); ?></label>
						</th>
						<td>
							<?php echo '<img src="' . $this->_payment_settings['button_url'] . '" />'; ?>
						</td>
					</tr>
				</tbody>
			</table>
			
			<p>
				<input type="hidden" name="update_<?php echo $this->_gateway; ?>" value="1">
				<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update', 'event_espresso');
					echo ' ' . $this->_payment_settings['display_name'] . ' ';
					_e('Settings', 'event_espresso') ?>" id="save_<?php echo $this->_gateway; ?>_settings" />
			</p>

			<?php wp_nonce_field( 'espresso_form_check', 'add_' . $this->_gateway . '_settings' ); ?>
			
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
		// change windows style filepaths to Unix style filepaths
		$this->_payment_settings['current_path'] = str_replace( '\\', '/', $this->_path );
		
		if ($this->_EEM_Gateways->update_payment_settings( $this->_gateway, $this->_payment_settings )) {
			$espresso_notices['success'][] = $this->_payment_settings['display_name'] . ' ' . __('Button URL Reset!', 'event_espresso');
		} else {
			$espresso_notices['errors'][] = $this->_payment_settings['display_name'] . ' ' . __('Button URL was not reset! ', 'event_espresso');
		}

	}





	/**
	 * 		generates HTML for the payment gateway selection button during registration
	 * 		@access 		protected
	 * 		@return 		string
	 */	
	protected function _generate_payment_gateway_selection_button() {
		return '
		<a id="payment-gateway-button-' . $this->_gateway . '" class="reg-page-payment-option-lnk' . $this->_css_link_class . '" rel="' . $this->_gateway . '" href="' . $this->_form_url . '" >
			<img src="' . $this->_payment_settings['button_url'] . '" alt="Pay using ' . $this->_payment_settings['display_name'] . '" />
		</a>
';
	}





	/**
	 * 		generate s HTML for the billing info form during registration
	 * 		@access 		protected
	* 		@param		array	$billing_inputs - array of input field details
	* 		@param		array	$section - what part of the billing info form, "address", "credit_card", or "other"
	 * 		@return 		string
	 */	
	protected function _generate_billing_info_form_fields( $billing_inputs = array(), $section = FALSE  ) {
	
		if ( empty( $billing_inputs ) || ! $section ) {
			return;
		}
		global $css_class;
		// fill out section name
		$section = '_billing_info_' . $section . '_fields';
		// if you don't behave - this is what you're gonna get !!!
		$output = '';
		// cycle thru billing inputs
		foreach( $billing_inputs as $input_key => $billing_input ) {
			// is the billing input in the requested section	?
			if ( in_array( $input_key, $this->$section )) {
				// required fields get a * 
				$required = $billing_input['required'] ? '&nbsp;<em>*</em>' : '';
				// and the css class "required"
				$styles = $billing_input['required'] ? 'required ' . $css_class : $css_class;	
						
				// start with a p tag, unless this is the credit card year field
				if ( $input_key != 'reg-page-billing-card-exp-date-year' ) {
					$output .=  "\n\t\t" . '<p class="event_form_field">';
				}
								
				// what type of input are we dealing with ?
				switch ( $billing_input['input'] ) {
				
					// text inputs
					case 'text' :		
								
						$output .= "\n\t\t\t" . '<label for="' . $input_key . '">' .$billing_input['label'] . $required . '</label>';
						$output .= "\n\t\t\t" . '<input id="' .$input_key . '" class="' .$css_class . '" type="text" value="' .$billing_input['value'] . '" name="' .$input_key . '">';
						break;
						
					// dropdowns
					case 'select' :

						if ( $input_key == 'reg-page-billing-card-exp-date-mnth' ) {
						
							$output .= "\n\t\t\t" . '<label>' . __('Expiry Date', 'event_espresso') . '&nbsp;<em>*</em></label>';
							$output .= "\n\t\t\t" . '<select id="reg-page-billing-card-exp-date-mnth" class="'. $css_class . ' small-txt" name="reg-page-billing-card-exp-date-mnth">';
							for ($x = 1; $x <= 12; $x++) {
								$value = $x < 10 ? '0' . $x : $x;
								$output .= "\n\t\t\t\t" . '<option value="' . $value . '">' . $value . '</option>';
							}
							$output .= "\n\t\t\t" . '</select>';
							$output .= "\n\t\t\t" . '&nbsp;/&nbsp;';

						} elseif ( $input_key == 'reg-page-billing-card-exp-date-year' ) {
						
							$output .= "\n\t\t\t" . '<select id="reg-page-billing-card-exp-date-year" class="'. $css_class . ' small-txt" name="reg-page-billing-card-exp-date-year">';
							$current_year = date('y');
							$next_decade = $current_year + 10;
							for ($x = $current_year; $x <= $next_decade; $x++) {
								$value = $x < 10 ? '0' . $x : $x;
								$output .= "\n\t\t\t\t" . '<option value="' . $value . '">' . $value . '</option>';
							}
							$output .= "\n\t\t\t" . '</select>';
							$output .= "\n\t\t\t" . '<span class="small-text lt-grey-text">' . __('(mm/yy)', 'event_espresso') . '</span>';
				
						} else {

							$output .= "\n\t\t\t" . '<label for="' . $input_key . '">' .$billing_input['label'] . $required . '</label>';
							$output .= "\n\t\t\t" . '<select id="' .$input_key . '" class="'. $css_class . ' small-txt" name="' .$input_key . '">';
							
							$options = explode( ',', $billing_input['options'] );
							foreach ( $options  as $value ) {
								//$key = str_replace( ' ', '_', sanitize_key( $value ));
								$output .= "\n\t\t\t\t" . '<option value="' . $value . '">' . $value . '</option>';
							}
							$output .= "\n\t\t\t" . '</select>';
							
						}
						
					break;
					
				} // end switch
				
				// end with a p tag, unless this is the credit card month field
				if ( $input_key != 'reg-page-billing-card-exp-date-mnth' ) {
					$output .=  "\n\t\t" . '</p>';
				}
				
			} // end if ( in_array( $input_key, $this->$section ))
		} // end foreach( $billing_inputs as $input_key => $billing_input ) 
		
		return $output;
		
	}
	
	
	
	
	

}
