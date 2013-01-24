<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Payments_Admin_Page
 *
 * This contains the logic for setting up the Event Payments related admin pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 *
 * @package		Payments_Admin_Page
 * @subpackage	includes/core/admin/Payments_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Payments_Admin_Page extends EE_Admin_Page {


	public function __construct() {
		parent::__construct();
	}



	protected function _init_page_props() {
		$this->page_slug = EE_PAYMENTS_PG_SLUG;
		$this->page_label = __('Payment Gateways', 'event_espresso');
	}



	protected function _ajax_hooks() {
		//todo: all hooks for ajax goes here.
	}



	protected function _define_page_props() {
		$this->_admin_base_url = EE_PAYMENTS_ADMIN_URL;
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array();
	}



	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_gateway_settings',
			'payment_settings' => '_payment_settings',
			'developers' => '_developers_section',
			'affiliate' => '_affiliate_settings',
			'save_aff_s' => array(
				'func' => '_save_aff_s',
				'noheader' => TRUE
				)
			);
	}



	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Payment Methods', 'event_espresso'),
					'order' => 10
					),
				'metaboxes' => array( '_espresso_news_post_box'),
				),
			'payment_settings' => array(
				'nav' => array(
					'label' => __('Settings', 'event_espresso'),
					'order' => 10
					),
				'metaboxes' => array( '_espresso_news_post_box'),
				),
			'developers' => array(
				'nav' => array(
					'label' => __('Developer Settings', 'event_espresso'),
					'order' => 20
					),
				'metaboxes' => array('_espresso_news_post_box', '_developers_meta_box')
				),
			'affiliate' => array(
				'nav' => array(
					'label' => __('Affiliate Settings', 'event_espresso'),
					'order' => 30
					),
				'metaboxes' => array('_aff_settings_meta_box','_espresso_news_post_box')
				)
			);
	}



	//none of the below group are currently used for Gateway Settings
	protected function _add_screen_options() {}
	protected function _add_help_tabs() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}
	




	public function load_scripts_styles() {
		wp_enqueue_script('event-espresso-js');
	}





	public function load_scripts_styles_default() {
		//styles
		wp_enqueue_style('ee-text-links');
		wp_enqueue_style('espresso_payments');

		//scripts
		wp_enqueue_script('ee-text-links');
	}





	protected function _gateway_settings() {
		global $EE_Session, $EEM_Gateways;
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . 'helpers/EE_Tabbed_Content.helper.php' ;
		if (isset($this->_req_data['_wp_http_referer']) || in_array(TRUE, $_GET)) {
			$EE_Session->set_session_data(
				array(
						'active_gateways'=>array(),
						'payment_settings'=>array(),
						'selected_gateway'=>'',
						'hide_other_gateways'=>FALSE,
						'type'=>'',
						'html_data'=>array(),
						'transaction_dateTime'=>'',
						'off-site-form'=>array()
						),
				'gateway_data');
		}
		if (!defined('ESPRESSO_GATEWAYS')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
			$EEM_Gateways = EEM_Gateways::instance();
		}
		
		$gateway_data = $EE_Session->get_session_data(FALSE, 'gateway_data');

		$activate_trigger = $deactivate_trigger = FALSE;
		//let's assemble the array for the _tab_text_links helper
		foreach ( $gateway_data['payment_settings'] as $gateway => $settings ) {
			$activate_trigger = isset($this->_req_data['activate_' . $gateway]) && !$activate_trigger ? $gateway : $activate_trigger;
			$deactivate_trigger = isset($this->_req_data['deactivate_' . $gateway]) && !$deactivate_trigger ? $gateway : $deactivate_trigger;
			if ( isset( $this->_req_data['deactivate_' . $gateway] ) )
				unset($gateway_data['active_gateways'][$gateway]);
			if ( isset( $this->_req_data['activate_' . $gateway] ) )
				$gateway_data['active_gateways'][$gateway] = array();

			$gateways[$gateway] = array(
				'label' => isset($settings['display_name']) ? $settings['display_name'] : ucwords( str_replace( '_', ' ', $gateway ) ),
				'class' => array_key_exists( $gateway, $gateway_data['active_gateways'] ) ? 'gateway-active' : '',
				'href' => 'espresso_' . str_replace(' ', '_', $gateway) . '_payment_settings',
				'title' => __('Modify this Gateway', 'event_espresso'),
				'slug' => $gateway
				);

		}

		$default = $activate_trigger ? $activate_trigger : FALSE;
		$default = $deactivate_trigger ? $deactivate_trigger : $activate_trigger;

		if ( ! $default ) {
			$default = !empty( $gateway_data['active_gateways'] ) ? key($gateway_data['active_gateways']) : 'Paypal_Standard';
		}
		
		$gateways = isset( $gateways ) ? $gateways : array();
			
		$this->_template_args['admin_page_header'] = EE_Tabbed_Content::tab_text_links( $gateways, 'gateway_links', '|', $default );
		$this->display_admin_page_with_sidebar();

	}



	protected function _payment_settings() {
//			$this->_template_args['expire_on_registration_end'] = isset( $org_options['expire_on_registration_end'] ) ? absint( $org_options['expire_on_registration_end'] ) : FALSE;
//			$data['expire_on_registration_end'] = isset( $this->_req_data['expire_on_registration_end'] ) ? absint( $this->_req_data['expire_on_registration_end'] ) : FALSE;

		$this->display_admin_page_with_sidebar();
	}


	protected function _developers_section() {
		$this->display_admin_page_with_sidebar();
	}



	protected function _developers_meta_box() {	
		add_meta_box('espresso_developers_settings', __('Developers Section', 'event_espresso'), array($this, 'developers_meta_box'), $this->_current_screen->id, 'normal');
	}

	public function developers_meta_box() {
		?>
			<div id="force_ssl_return" style="display:none">
				<h2><?php _e('Force HTTPS on Return URL', 'event_espresso'); ?></h2>
				<p><?php _e('Forces the gateway provider to send the customer back to the return page -- or pull the return page from the site -- using HTTPS.  This is required in some instances to prevent a warning that the page the user is going to is not secure.', 'event_espresso'); ?></p>
			</div>
			<div id="bypass_confirmation" style="display:none">
				<h2><?php _e('Bypassing the Confirmation Page', 'event_espresso'); ?></h2>
				<p><?php _e('This will allow you to send your customers directly to the payment gateway of your choice.', 'event_espresso'); ?></p>
			</div>
			<div id="display_header" style="display:none">
				<h2><?php _e('Display a Form Header','event_espresso'); ?></h2>
				<p><?php _e('Select if you would like to display a header above the payment form.','event_espresso'); ?></p>
			</div>
			<div class="padding">
				<?php
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/index.php")) {
					?>
					<p class="red_alert">
					<?php _e('Remember, if updates are made or features are added to these gateways in the future. You will need to make the updates to your customized gateways.', 'event_espresso'); ?>
					</p>
					<?php
				} else {
					if (isset($this->_request_data['event_espresso_admin_action']) && $this->_req_data['event_espresso_admin_action'] == 'copy_gateways') {
						add_action('admin_init', 'event_espresso_smartCopy');
					}
					if (isset($_SESSION['event_espresso_gateways_copied']) && $_SESSION['event_espresso_gateways_copied'] == true) {
						?>
						<div class="updated fade below-h2" id="message" style="background-color: rgb(255, 251, 204);">
							<p><?php _e("Your gateways have been moved.", 'event_espresso'); ?></p>
						</div>
						<?php
						$_SESSION['event_espresso_gateways_copied'] = false;
					}

					if ($this->_event_espresso_count_files(EVENT_ESPRESSO_GATEWAY_DIR) > 0) {

						if (!is_writable(EVENT_ESPRESSO_GATEWAY_DIR)) {
							?>
							<p class="fugue f-error"><?php _e("The permissions on your templates directory are incorrect.", 'event_espresso'); ?> </p>
							<p class="fugue f-error"><?php _e("Please set the permissions to 775 on the following directory.", 'event_espresso'); ?><br /><br />
								<span class='display-path'><strong><?php _e("Path:", 'event_espresso'); ?></strong> <?php echo str_replace(ABSPATH, "", EVENT_ESPRESSO_GATEWAY_DIR); ?> </span></p>
							<?php
						}
					} else {
						?>
						<p><?php _e('If you plan on adding additional payment gateways, please use the link below to move your gateway files to a safe place. Only use this option if you absolutely need to or instructed to do so by a representative from Event Espresso. ', 'event_espresso'); ?></p>
						<p class="fugue f-warn"><?php _e("Your gateway files have not been moved.", 'event_espresso'); ?></p>
							<?php if (!is_writable(EVENT_ESPRESSO_GATEWAY_DIR)) { ?>
							<p>
						<?php _e('In order to use this this feature, you will need to move the files located in the', 'event_espresso'); ?> <span class="display-path"><strong><?php echo EVENT_ESPRESSO_PLUGINFULLPATH ?>gateways/</strong></span> <?php _e('directory into the', 'event_espresso'); ?> <span class="display-path"><strong><?php echo EVENT_ESPRESSO_GATEWAY_DIR ?></strong></span> <?php _e('directory', 'event_espresso'); ?>.
							</p>
							<p class="fugue f-error">
						<?php _e("The permissions on your gateways directory are incorrect.", 'event_espresso'); ?>
							</p>
							<p class="fugue f-error">
						<?php _e("To move your files automatically, please set the permissions to 775 on the following directory.", 'event_espresso'); ?>
								<br />
								<br />
								<span class='display-path'><strong>
							<?php _e("Path:", 'event_espresso'); ?>
									</strong> <?php echo EVENT_ESPRESSO_GATEWAY_DIR; ?> </span></p>
						<?php } else { ?>
							<p class="updated"><?php printf(__("Click here to <a href='%s'>Move your files</a> to a safe place.", 'event_espresso'), wp_nonce_url("admin.php?event_espresso_admin_action=copy_gateways", 'copy_gateways')); ?> </p>
							<?php
						}
					}
				}
				?>
		</div>
		<?php
	}


	private function _event_espresso_count_files( $path, $exclude = '.|..|.svn', $recursive = false ) {
		$result = array();
		$path = rtrim($path, "/") . "/";
		if (is_dir($path)) {
			$folder_handle = opendir($path);
			$exclude_array = explode("|", $exclude);
			while (false !== ($filename = readdir($folder_handle))) {
				if (!in_array(strtolower($filename), $exclude_array)) {
					if (is_dir($path . $filename . "/")) {
						if ($recursive)
							$result[] = file_array($path, $exclude, true);
					} else {
						$result[] = $filename;
					}
				}
			}
		}
		//return $result;
		return count($result);
	}

	


	

	protected function _affiliate_settings() {
		$this->_set_add_edit_form_tags( 'save_aff_s' );
		$this->display_admin_page_with_sidebar();
	}




	protected function _aff_settings_meta_box() {
		add_meta_box('espresso_affiliate_settings', __('Affiliates', 'event_espresso'), array($this, 'aff_settings'), $this->_current_screen->id, 'normal');
	}





	public function aff_settings() {
		global $org_options, $espresso_wp_user;
		$payment_settings = get_option('payment_data_' . $espresso_wp_user);
		$options = array('header' => esc_html('Before the opening \'<body>\' tag of every page on the website'), 'purchase_comfirmation' => 'On the purchase confirmation page after completed purchase', 'footer' => esc_html('Before the closing \'</body>\' tag of every page on the website'));
		$hook_row_span = round(count($options)/2);
		?>
		<div class="padding">
			<p><?php _e('You can copy and paste any code you are given from your 3rd party affiliate system and indicate using the checkboxes where you want this to be added on your website as per your 3rd party instructions.', 'event_espresso'); ?></p>
			<table class="form-table">
				<tbody>
					<tr>
						<th><label for="affiliate_script_code">
							<?php _e('Enter in the affiliate code in this box:', 'event_espresso'); ?></label></th>
						<td colspan="2"><textarea name="aff_script" id="affiliate_script_code" style="width: 100%; height: 85px;"><?php echo esc_textarea(stripslashes($payment_settings['affiliate']['script'])); ?></textarea></td>
					</tr>
					<tr>
						<th rowspan="<?php echo $hook_row_span; ?>">
							<?php _e('Check the box for where you want the affiliate code inserted:', 'event_espresso'); ?>
						</th>
						<?php
						$ind = 0;
						foreach ( $options as $opt => $description ) :
							$checked = in_array($opt, $payment_settings['affiliate']['hook_into']) ? 'checked' : '';
						?>
							<td><input type="radio" name="aff_hook_into[]" id="affiliate_hook_into_header" value="<?php echo $opt; ?>" <?php echo $checked; ?> /> <?php echo $description; ?></td> 

						<?php
							if ( $ind%2 ) echo '</tr><tr>';
							$ind++;
						endforeach; ?>
					</tr>
				</tbody>
			</table>
			<p>
				<input type="hidden" name="update_affiliate_settings" value="update_affiliate_settings">
				<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Affiliate Settings', 'event_espresso'); ?>" id="save_affiliate_settings" />
			</p>
		</div>
		<?php
	}


	

	protected function _save_aff_s() {
		global $org_options, $espresso_wp_user;
		$payment_settings = get_option('payment_data_' . $espresso_wp_user);

		if ( isset( $this->_req_data['update_affiliate_settings'] ) ) {
			$payment_settings['affiliate']['script'] = $this->_req_data['aff_script'];
			$payment_settings['affiliate']['hook_into'] = (array) $this->_req_data['aff_hook_into'];
			if ( update_option('payment_data_' . $espresso_wp_user, $payment_settings) === true ) {
				$msg = __('Affiliate Settings Updated!', 'event_espresso');
				EE_Error::add_success($msg);
			} else {
				$msg = __('Affiliate Settings were not saved!', 'event_espresso');
				EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			}
		}

		if ( empty($payment_settings['affiliate'] ) ) {
			$payment_settings['affiliate']['script'] = '';
			$payment_settings['affiliate']['hook_into'] = array();
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
		$query_args = array(
			'action' => 'affiliate',
			);
		$this->_redirect_after_action(0,'','',$query_args);
	}

} //end Payments_Admin_Page class