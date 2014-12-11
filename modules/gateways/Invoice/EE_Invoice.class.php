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
Class EE_Invoice extends EE_Offline_Gateway {

	private static $_instance = NULL;


	public static function instance(EEM_Gateways &$model) {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or ! ( self::$_instance instanceof  EE_Invoice )) {
			self::$_instance = new self($model);
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway_name = 'Invoice';
		$this->_button_base = 'invoice-logo.png';
		$this->_path = str_replace( '\\', '/', __FILE__ );
		parent::__construct($model);
	}

	protected function _default_settings() {
		$org_config = EE_Registry::instance()->CFG->organization;
		$payment_settings = EE_Config::instance()->gateway->payment_settings;
		$invoice_settings = !empty( $payment_settings['Invoice'] ) ? $payment_settings['Invoice'] : array();

		$this->_payment_settings['active'] = '';

		//dynamic info for templates
		$this->_payment_settings['invoice_logo_url'] = '';
		$this->_payment_settings['template_payment_instructions'] = !empty( $invoice_settings['template_payment_instructions'] ) ? $invoice_settings['template_payment_instructions'] : __('Please send this invoice with payment attached to the address above, or use the payment link below. Payment must be received within 48 hours of the event date.', 'event_espresso' );
		$this->_payment_settings['template_invoice_payee_name'] = '';
		$this->_payment_settings['template_invoice_address'] = '';
		$this->_payment_settings['template_invoice_tax_number'] = '';
		$this->_payment_settings['template_invoice_email'] = '';


		//show on thank you page
		$this->_payment_settings['show'] = true;
		$this->_payment_settings['type'] = 'off-line';
		$this->_payment_settings['display_name'] = __('Invoice','event_espresso');
		$this->_payment_settings['current_path'] = '';
		$this->_payment_settings['page_instructions'] = __('Payment must be received within 48 hours of event date.  Details about where to send payment is included on the invoice.', 'event_espresso');
		$this->_payment_settings['payment_address'] = '';
		$this->_payment_settings['button_url'] = $this->_btn_img;
	}

	protected function _update_settings() {
		//dynamic info for templates
		$this->_payment_settings['invoice_logo_url'] = isset( $_POST['invoice_logo_url'] ) ? trim(strip_tags($_POST['invoice_logo_url'])) : '';
		$this->_payment_settings['template_payment_instructions'] = isset( $_POST['template_payment_instructions'] ) ? trim(strip_tags($_POST['template_payment_instructions'] ) ) : '';
		$this->_payment_settings['template_invoice_payee_name'] = isset( $_POST['template_invoice_payee_name'] ) ? trim(strip_tags($_POST['template_invoice_payee_name'] ) ) : '';
		$this->_payment_settings['template_invoice_address'] = isset( $_POST['template_invoice_address'] ) ? trim(strip_tags($_POST['template_invoice_address'] ) ) : '';
		$this->_payment_settings['template_invoice_email'] = isset( $_POST['template_invoice_email'] ) ? trim(strip_tags($_POST['template_invoice_email'] ) ) : '';
		$this->_payment_settings['template_invoice_tax_number'] = isset( $_POST['template_invoice_tax_number'] ) ? trim(strip_tags($_POST['template_invoice_tax_number'] ) ) : '';

		//info shown on thankyou page
		$this->_payment_settings['page_instructions'] = trim(strip_tags($_POST['page_instructions']));
		$this->_payment_settings['payment_address'] = trim(strip_tags($_POST['payment_address']));
		$this->_payment_settings['show'] = $_POST['show'];
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';
	}

	protected function _display_settings() {
		require_once('lib/invoice_functions.php');
		$themes = espresso_invoice_template_files($this->_path);

		?>
				<tr>
					<th><h4 style="margin:.75em 0 1em;"><?php _e('Invoice Display Settings', 'event_espresso'); ?></h4></th>
					<td>
						<span class="description"><?php _e('Invoice layout and style is controlled by the corresponding message type via the messages templates admin.  The settings here are shared among all Invoice and Receipt message templates.', 'event_espresso'); ?></span>
					</td>
				</tr>
				<tr>
					<th>
						<label for="template_invoice_payee_name"><?php _e('Payee Name:', 'event_espresso'); ?></label>
					</th>
					<td>
						<input type="text" name="template_invoice_payee_name" cols="50" rows="5" value="<?php echo trim(stripslashes_deep($this->_payment_settings['template_invoice_payee_name'])); ?>"><br>
						<span class="description"><?php _e('The <code>[INVOICE_PAYEE_NAME]</code> shortcode is parsed to the value of this field if present, if this field is blank then it\'s parsed to the payee name set in the organization settings page, if that page is blank then it parses to an empty string.', 'event_espresso'); ?></span>
					</td>
				</tr>

				<tr>
					<th>
						<label for="template_invoice_email"><?php _e('Payee Email:', 'event_espresso'); ?></label>
					</th>
					<td>
						<input type="text" name="template_invoice_email" cols="50" rows="5" value="<?php echo trim(stripslashes_deep($this->_payment_settings['template_invoice_email'])); ?>"><br>
						<span class="description"><?php _e('The <code>[INVOICE_PAYEE_EMAIL]</code> shortcode is parsed to the value of this field if present, if this field is blank then it\'s parsed to the payee email set in the organization settings page, if that page is blank then it parses to an empty string.', 'event_espresso'); ?></span>
					</td>
				</tr>

				<tr>
					<th>
						<label for="template_invoice_tax_number"><?php _e('Payee Tax Number:', 'event_espresso'); ?></label>
					</th>
					<td>
						<input type="text" name="template_invoice_tax_number" cols="50" rows="5" value="<?php echo trim(stripslashes_deep($this->_payment_settings['template_invoice_tax_number'])); ?>"><br>
						<span class="description"><?php _e('The <code>[INVOICE_PAYEE_TAX_NUMBER_*]</code> shortcode is parsed to the value of this field if present, if this field is blank then it\'s parsed to the payee tax number set in the organization settings page, if that page is blank then it parses to an empty string.', 'event_espresso'); ?></span>
					</td>
				</tr>

				<tr>
					<th>
						<label for="template_invoice_address"><?php _e('Payee Address:', 'event_espresso'); ?></label>
					</th>
					<td>
						<textarea name="template_invoice_address" cols="50" rows="5"><?php echo trim(stripslashes_deep($this->_payment_settings['template_invoice_address'])); ?></textarea>
						<span class="description"><?php _e('The shortcode <code>[INVOICE_PAYEE_ADDRESS]</code> is parsed to the value of this field if present. If this field is empty, then the shortcode will use the value of the payee address set in the organization settings page.  If that value is empty, then an empty string is used.', 'event_espresso'); ?></span>
					</td>
				</tr>

				<tr>
					<th>
						<label for="template_payment_instructions"><?php _e('Payment Instructions:', 'event_espresso'); ?></label>
					</th>
					<td>
						<textarea name="template_payment_instructions" cols="50" rows="5"><?php echo trim(stripslashes_deep($this->_payment_settings['template_payment_instructions'])); ?></textarea>
						<span class="description"><?php _e('The shortcode <code>[INVOICE_PAYMENT_INSTRUCTIONS]</code> is parsed to the value of this field.', 'event_espresso'); ?></span>
					</td>
				</tr>

				<tr>
					<th>
						<label for="invoice_logo_url"><?php _e('Logo Image', 'event_espresso'); ?></label>
					</th>
					<td>
						<p id="invoice-logo-image">
							<span class='ee_media_uploader_area'>
								<img class="ee_media_image" src="<?php echo $this->_payment_settings['invoice_logo_url']; ?>" />
								<input class="ee_media_url" type="text" name="invoice_logo_url" size='34' value="<?php echo $this->_payment_settings['invoice_logo_url']; ?>">
								<a href="#" class="ee_media_upload"><img src="images/media-button-image.gif" alt="Add an Image"></a>
							</span><br/>

							<span class="description"><?php _e('(The [INVOICE_LOGO] and [INVOICE_LOGO_URL] message template shortcodes will parse to either the image uploaded here, or if blank, the organization logo set via the "Your Organization Settings" page.).', 'event_espresso'); ?></span>
						</p>
					</td>
				</tr>
			</table>
			<table class="form-table">

				<tr>
					<th><h4 style="margin:.75em 0 1em;"><?php _e('Invoice Gateway Settings', 'event_espresso'); ?></h4></th>
					<td>
						<span class="description"><?php _e('The following settings affect the functioning of the Invoice gateway and the display on the thank you page.', 'event_espresso'); ?></span>
					</td>
				</tr>

			<tr>
					<th>
						<label for="show"><?php _e('Show as an option on the payment page?', 'event_espresso'); ?></label>
					</th>
					<td>
						<?php echo EEH_Form_Fields::select_input('show', $this->_yes_no_options, $this->_payment_settings['show']); ?><br />
						<span class="description"><?php _e('Will display invoices as a payment option <br />	on your payment page. (Default: Yes)', 'event_espresso'); ?></span>
					</td>
				</tr>

				<tr>
					<th>
						<label for="page_instructions"><?php _e('Confirmation Text:', 'event_espresso'); ?></label>

					</th>
					<td>
						<textarea name="page_instructions" cols="50" rows="5"><?php echo trim(stripslashes_deep($this->_payment_settings['page_instructions'])); ?></textarea>
						<span class="description"><?php _e('This text appears on the thank you page after a registration using Invoice as the payment method.', 'event_espresso'); ?></span>
					</td>
				</tr>

				<tr>
					<th>
						<label for="payment_address"><?php _e('Extra Info:', 'event_espresso'); ?></label>
					</th>
					<td>
						<textarea name="payment_address" cols="50" rows="5"><?php echo trim($this->_payment_settings['payment_address']); ?></textarea>
					</td>
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
					//formfield = jQuery('#image_url').attr('name');
					tb_show('', 'media-upload.php?type=image&amp;TB_iframe=1');
					header_clicked = true;
					return false;
				});
				window.original_send_to_editor = window.send_to_editor;

				window.send_to_editor = function(html) {
					if(header_clicked) {
						imgurl = jQuery('img',html).attr('src');
						jQuery('#invoice_logo_url').val(imgurl);
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

	/**
	 * Gets content for displaying about the payment done using this gateway
	 * @param EE_Payment $payment
	 * @return type
	 */
	public function get_payment_overview_content(EE_Payment $payment) {
		$registration = $payment->transaction()->primary_registration();
		//$registration = $session_data['registration'][$session_data['primary_attendee']['line_item_id']];

		if (!$this->_payment_settings['show'])
			return;
		?>
		<div class="event-display-boxes">
			<?php if (isset($this->_payment_settings['invoice_title'])) { ?>

				<?php
				echo '<h4 id="invoice_title" class="payment_type_title section-heading">' . stripslashes_deep($this->_payment_settings['invoice_title']) . '</h4>';
			}

			?>
			<p>
				<a href="<?php echo $registration->invoice_url('download') ?>" class="ee-button-lnk inline-button ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all" target="_blank">
					<?php _e('Download PDF Invoice', 'event_espresso'); ?> <span class="ee-icon ee-icon-PDF-file-type"></span>
				</a>
			</p>
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

	public function espresso_display_payment_gateways( $selected_gateway = '' ) {

		$this->_css_class = $selected_gateway == $this->_gateway_name ? '' : ' hidden';
		echo $this->_generate_payment_gateway_selection_button();

		?>

		<div id="reg-page-billing-info-<?php echo $this->_gateway_name; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<h3><?php _e('You have selected "Invoice" as your method of payment', 'event_espresso'); ?></h3>
			<p><?php _e('After finalizing your registration, you will be transferred to the payment overview where you can download your invoice.', 'event_espresso'); ?></p>
		</div>

		<?php
	}

	public function send_invoice($id) {
		require_once('lib/Invoice.class.php');
		if (class_exists('Invoice')) {
			$invoice = new Invoice($id);
			$invoice->send_invoice();
		}
	}
}
