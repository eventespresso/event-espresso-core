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
Class EE_Invoice extends EE_Gateway {

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
		$this->_gateway = 'Invoice';
		parent::__construct($model);
	}

	protected function _default_settings() {
		global $org_options;
		$default_address = trim($org_options['organization_street1']);
		$default_address .= empty($org_options['organization_street2']) ? '' : '<br />' . trim($org_options['organization_street2']);
		$default_address .= '<br />' . trim($org_options['organization_city']);
		$default_address .= ',' . trim($org_options['organization_state']);
		$default_address .= '<br />' . trim(getCountryName($org_options['organization_country']));
		$default_address .= '<br />' . trim($org_options['organization_zip']);
		$this->_payment_settings['active'] = '';
		$this->_payment_settings['pdf_title'] = __('Invoice Payments', 'event_espresso');
		$this->_payment_settings['pdf_instructions'] = __('Please send this invoice with payment attached to the address above, or use the payment link below. Payment must be received within 48 hours of event date.', 'event_espresso');
		$this->_payment_settings['page_instructions'] = __('Please send Invoice to the address below. Payment must be received within 48 hours of event date.', 'event_espresso');
		$this->_payment_settings['payable_to'] = trim($org_options['organization']);
		$this->_payment_settings['payment_address'] = $default_address;
		$this->_payment_settings['image_url'] = '';
		$this->_payment_settings['show'] = true;
		$this->_payment_settings['invoice_css'] = '';
		$this->_payment_settings['type'] = 'off-line';
		$this->_payment_settings['display_name'] = 'Invoice';
		$this->_payment_settings['current_path'] = '';
	}

	protected function _update_settings() {
		$this->_payment_settings['pdf_title'] = trim(strip_tags($_POST['pdf_title']));
		$this->_payment_settings['pdf_instructions'] = trim(strip_tags($_POST['pdf_instructions']));
		$this->_payment_settings['page_instructions'] = trim(strip_tags($_POST['page_instructions']));
		$this->_payment_settings['payable_to'] = trim(strip_tags($_POST['payable_to']));
		$this->_payment_settings['payment_address'] = trim(strip_tags($_POST['payment_address']));
		$this->_payment_settings['image_url'] = trim(strip_tags($_POST['image_url']));
		$this->_payment_settings['show'] = $_POST['show'];
		$this->_payment_settings['invoice_css'] = trim(strip_tags($_POST['invoice_css']));
	}

	protected function _display_settings() {
		require_once('lib/invoice_functions.php');
		$files = espresso_invoice_template_files($this->_path());
		?>
		<tr>
			<th><label for="show">
					<?php _e('Show as an option on the payment page?', 'event_espresso'); ?>
				</label></th>
			<td><?php echo select_input('show', $this->_yes_no_options, $this->_payment_settings['show']); ?><br />
				<span class="description"><?php _e('Will display invoices as a payemnt option <br />
on your payemnt page. (Default: Yes)', 'event_espresso'); ?></span></td>
		</tr>
		<tr>
			<th><label for="pdf_title">
					<?php _e('Invoice Title', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="pdf_title" id="pdf_title" size="30" value="<?php echo stripslashes_deep($this->_payment_settings['pdf_title']); ?>" /></td>
		</tr>
		<tr>
			<th><label for="page_instructions">
					<?php _e('Invoice Instructions', 'event_espresso'); ?>
				</label></th>
			<td><textarea name="page_instructions" cols="30" rows="5"><?php echo trim(stripslashes_deep($this->_payment_settings['page_instructions'])); ?></textarea></td>
		</tr>
		<tr>
			<th><label for="payable_to">
					<?php _e('Payable To', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="payable_to" id="payable_to" size="30" value="<?php echo trim(stripslashes_deep($this->_payment_settings['payable_to'])); ?>" /></td>
		</tr>
		<tr>
			<th><label for="payment_address">
					<?php _e('Address to Send Payment', 'event_espresso'); ?>
				</label></th>
			<td><textarea name="payment_address" cols="30" rows="5"><?php echo trim($this->_payment_settings['payment_address']); ?>
				</textarea></td>
		</tr>
		<tr>
			<th><label for="base-invoice-select">
					<?php _e('Select Stylesheet', 'event_espresso'); ?>
					<?php //apply_filters('filter_hook_espresso_help', 'base_template_info')  ?>
				</label>
			</th>
			<td><select id="base-invoice-select" class="chzn-select wide" name="invoice_css">
					<option <?php espresso_invoice_is_selected('', $this->_payment_settings['invoice_css']) ?> value="simple.css">
						<?php _e('Default CSS - Simple', 'event_espresso'); ?>
					</option>
					<?php foreach ($files as $fname) { ?>
						<option <?php espresso_invoice_is_selected($fname, $this->_payment_settings['invoice_css']) ?> value="<?php echo $fname ?>"><?php echo $fname; ?></option>
					<?php } ?>
				</select><br />
				<span class="description"><?php _e('Load a custom/pre-made style sheet <br />
to change the look of your invoices.', 'event_espresso'); ?></span>
			</td>
		</tr>
		<tr>
			<th><label for="pdf_instructions">
					<?php _e('Instructions', 'event_espresso'); ?>
				</label></th>
			<td><textarea name="pdf_instructions" cols="30" rows="5"><?php echo stripslashes_deep($this->_payment_settings['pdf_instructions']); ?></textarea></td>
		</tr>
		<tr>
			<th><label for="image_url">
					<?php _e('Logo Image', 'event_espresso'); ?>
					<?php //apply_filters('filter_hook_espresso_help', 'invoice_logo_info') ?>
				</label></th>
			<td><p id="invoice-logo-image">
					<input id="image_url" type="hidden" size="36" name="image_url" value="<?php echo $this->_payment_settings['image_url']; ?>" />
					<input id="upload_image_button" type="button" value="Upload Image" />
					<br />
					<span class="description">
						<?php _e('(logo for the top left of the invoice)', 'event_espresso'); ?>
					</span>
				<p class="invoice-logo"><img src="<?php echo $this->_payment_settings['image_url']; ?>" alt="" /></p>
				<a id='remove-image' href='#' title='<?php _e('Remove this image', 'event_espresso'); ?>' onclick='return false;'>
					<?php _e('Remove Image', 'event_espresso'); ?>
				</a>
			</p></td>
		</tr>
		<?php
	}

	protected function _display_settings_help() {
		?>
		<script type="text/javascript" charset="utf-8">
			//<![CDATA[
			jQuery(document).ready(function() {
				var header_clicked = false;
				jQuery('#upload_image_button').click(function() {
					formfield = jQuery('#upload_image').attr('name');
					tb_show('', 'media-upload.php?type=image&amp;TB_iframe=1');
					header_clicked = true;
					return false;
				});
				window.original_send_to_editor = window.send_to_editor;

				window.send_to_editor = function(html) {
					if(header_clicked) {
						imgurl = jQuery('img',html).attr('src');
						jQuery('#' + formfield).val(imgurl);
						jQuery('#invoice-logo-image').append("<p id='image-display'><img class='show-selected-img' src='"+imgurl+"' alt='' /></p>");
						header_clicked = false;
						tb_remove();
						jQuery("#invoice-logo-image").append("<a id='remove-image' href='#' title='<?php _e('Remove this image', 'event_espresso'); ?>' onclick='return false;'><?php _e('Remove Image', 'event_espresso'); ?></a>");
						jQuery('#remove-image').click(function(){
							//alert('delete this image');
							jQuery('#' + formfield).val('');
							jQuery("#image-display").empty();
							jQuery('#remove-image').remove();
						});
					} else {
						window.original_send_to_editor(html);
					}
				}
			});

			//]]>
		</script>
		<?php
	}

	public function espresso_gateway_process_step_3() {
		global $org_options;
		$pre_form = "<html>";
		$pre_form .= "<head><title>Processing Invoice...</title></head>";
		$pre_form .= "<body>";
		$form = "<h2 style=\"margin:2em auto; line-height:2em; text-align:center;\">Please wait...<br/>your order is being processed and you will be redirected to the transaction results page, where you can view your invoice.</h2>";
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
		$session_data = $EE_Session->get_session_data();
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Registration.class.php' );
		$registration = $session_data['registration'][$session_data['primary_attendee']['line_item_id']];

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

		if (!$this->_payment_settings['show'])
			return;
		?>
		<div class="event-display-boxes">
			<?php if (isset($this->_payment_settings['invoice_title'])) { ?>

				<?php
				echo '<h4 id="invoice_title" class="payment_type_title section-heading">' . stripslashes_deep($this->_payment_settings['invoice_title']) . '</h4>';
			}

			/* $pdf_url = home_url().'/?invoice_type=' . ( empty($invoice_type) ? '' : $invoice_type ) . '&amp;download_invoice=true&amp;attendee_id='.$attendee_id.'&amp;registration_id='.registration_id;

			  $page_url = home_url().'/?invoice_type=' . ( empty($invoice_type) ? '' : $invoice_type ) . '&amp;download_invoice=true&amp;attendee_id='.$attendee_id.'&amp;registration_id='.registration_id;
			 */
			?>
			<p><a href="<?php echo home_url() . '/?invoice_launch=true&amp;id=' . $registration->reg_url_link(); ?>" class="inline-button ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all" target="_blank">
					<?php _e('Download PDF Invoice', 'event_espresso'); ?>
				</a></p>
			<?php
			if (isset($this->_payment_settings['page_instructions'])) {
				echo '<div class="event-messages ui-state-highlight"><span class="ui-icon ui-icon-alert"></span><p class="instruct">' . stripslashes_deep($this->_payment_settings['page_instructions']) . '</p></div>';
			}
			if (isset($this->_payment_settings['payment_address'])) {
				?>
				<div class="address-block">
					<?php echo wpautop(stripslashes_deep($this->_payment_settings['payment_address'])); ?>
				</div>
				<?php
			}
			?>
		</div>
		<?php
	}

	public function espresso_display_payment_gateways() {
		?>
		<a id="payment-gateway-button-<?php echo $this->_gateway; ?>" class="reg-page-payment-option-lnk<?php echo $this->_css_link_class; ?>" rel="<?php echo $this->_gateway; ?>" href="<?php echo $this->_form_url; ?>" >
			<button type="button"><?php _e('Invoice', 'event_espresso'); ?></button>
		</a>

		<div id="reg-page-billing-info-<?php echo $this->_gateway; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the payment overview where you can download your invoice.', 'event_espresso'); ?>
		</div>

		<?php
	}

}