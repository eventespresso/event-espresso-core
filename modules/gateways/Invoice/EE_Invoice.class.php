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
		$default_address = trim($org_config->address_1);
		$default_address .= empty($org_config->address_2) ? '' : '<br />' . trim($org_config->address_2);
		$default_address .= '<br />' . trim($org_config->city);
		$state_obj = EE_Registry::instance()->load_model('State')->get_one_by_ID($org_config->STA_ID);
		if($state_obj){
			$default_address .= ',' . $state_obj->name();
		}
		$country_obj = EE_Registry::instance()->load_model('Country')->get_one_by_ID($org_config->CNT_ISO);
		if($country_obj){
			$default_address .= '<br />' . $country_obj->name();
		}

		$default_address .= '<br />' . trim($org_config->zip);
		$this->_payment_settings['active'] = '';
		$this->_payment_settings['pdf_title'] = __('Invoice Payments', 'event_espresso');
		$this->_payment_settings['pdf_instructions'] = __('Please send this invoice with payment attached to the address above, or use the payment link below. Payment must be received within 48 hours of event date.', 'event_espresso');
		$this->_payment_settings['page_instructions'] = __('Please send Invoice to the address below. Payment must be received within 48 hours of event date.', 'event_espresso');
		$this->_payment_settings['payable_to'] = trim($org_config->name);
		$this->_payment_settings['payment_address'] = $default_address;
		$this->_payment_settings['invoice_logo_url'] = '';
		$this->_payment_settings['show'] = true;
		$this->_payment_settings['invoice_css'] = '';
		$this->_payment_settings['type'] = 'off-line';
		$this->_payment_settings['display_name'] = __('Invoice','event_espresso');
		$this->_payment_settings['current_path'] = '';
		$this->_payment_settings['button_url'] = $this->_btn_img;
	}

	protected function _update_settings() {
		$this->_payment_settings['pdf_title'] = trim(strip_tags($_POST['pdf_title']));
		$this->_payment_settings['pdf_instructions'] = trim(strip_tags($_POST['pdf_instructions']));
		$this->_payment_settings['page_instructions'] = trim(strip_tags($_POST['page_instructions']));
		$this->_payment_settings['payable_to'] = trim(strip_tags($_POST['payable_to']));
		$this->_payment_settings['payment_address'] = trim(strip_tags($_POST['payment_address']));
		$this->_payment_settings['invoice_logo_url'] = trim(strip_tags($_POST['invoice_logo_url']));
		$this->_payment_settings['show'] = $_POST['show'];
		$this->_payment_settings['invoice_css'] = trim(strip_tags($_POST['invoice_css']));
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';
	}

	protected function _display_settings() {
		require_once('lib/invoice_functions.php');
		$themes = espresso_invoice_template_files($this->_path);

//		$this->_payment_settings['pdf_title'] = isset( $this->_payment_settings['pdf_title'] ) ? $this->_payment_settings['pdf_title'] : '';
//		$this->_payment_settings['pdf_instructions'] = isset( $this->_payment_settings['pdf_instructions'] ) ? $this->_payment_settings['pdf_instructions'] : '';
//		$this->_payment_settings['page_instructions'] = isset( $this->_payment_settings['page_instructions'] ) ? $this->_payment_settings['page_instructions'] : '';
//		$this->_payment_settings['payable_to'] = isset( $this->_payment_settings['payable_to'] ) ? $this->_payment_settings['payable_to'] : '';
//		$this->_payment_settings['payment_address'] = isset( $this->_payment_settings['payment_address'] ) ? $this->_payment_settings['payment_address'] : '';
//		$this->_payment_settings['invoice_logo_url'] = isset( $this->_payment_settings['invoice_logo_url'] ) ? $this->_payment_settings['invoice_logo_url'] : '';
//		$this->_payment_settings['show'] = isset( $this->_payment_settings['show'] ) ? $this->_payment_settings['show'] : '';
//		$this->_payment_settings['invoice_css'] = isset( $this->_payment_settings['invoice_css'] ) ? $this->_payment_settings['invoice_css'] : '';
//		$this->_payment_settings['button_url'] = isset( $this->_payment_settings['button_url'] ) ? $this->_payment_settings['button_url'] : '';

		?>
				<tr>
					<th><h4 style="margin:.75em 0 1em;"><?php _e('Invoice Display Settings', 'event_espresso'); ?></h4></th>
					<td>
						<span class="description"><?php _e('The following settings affect the content and/or appearance of the downloadable PDF invoice.', 'event_espresso'); ?></span>
					</td>
				</tr>

				<tr>
					<th>
						<label for="base-invoice-select"><?php _e('Select Stylesheet', 'event_espresso'); ?></label>
					</th>
					<td>
						<select id="base-invoice-select" name="invoice_css">
						<?php
						$this->_payment_settings['invoice_css'] = ! empty( $this->_payment_settings['invoice_css'] ) ? $this->_payment_settings['invoice_css'] : 'simple.css';
						foreach ($themes as $theme) {
							$selected = ( $theme == $this->_payment_settings['invoice_css'] ) ? 'selected="selected"' : ''; ?>
							<option value="<?php echo $theme ?>" <?php echo $selected; ?>><?php echo $theme; ?></option>
						<?php } ?>
						</select>
						<span class="description"><?php _e('Load a custom/pre-made style sheet <br />to change the look of your invoices.', 'event_espresso'); ?></span>
					</td>
				</tr>

				<tr>
					<th>
						<label for="pdf_instructions"><?php _e('Instructions', 'event_espresso'); ?></label>
					</th>
					<td>
						<textarea name="pdf_instructions" cols="50" rows="5"><?php echo stripslashes_deep($this->_payment_settings['pdf_instructions']); ?></textarea>
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

							<span class="description"><?php _e('(Logo for the top left of the invoice)', 'event_espresso'); ?></span>
						</p>
					</td>
				</tr>

				<tr>
					<th><h4 style="margin:.75em 0 1em;"><?php _e('Invoice Gateway Settings', 'event_espresso'); ?></h4></th>
					<td>
						<span class="description"><?php _e('The following settings affect the functioning of the Invoice gateway.', 'event_espresso'); ?></span>
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
						<label for="pdf_title"><?php _e('Invoice Title', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" name="pdf_title" id="pdf_title" size="30" value="<?php echo stripslashes_deep($this->_payment_settings['pdf_title']); ?>" />
					</td>
				</tr>

				<tr>
					<th>
						<label for="page_instructions"><?php _e('Invoice Instructions', 'event_espresso'); ?></label>
					</th>
					<td>
						<textarea name="page_instructions" cols="50" rows="5"><?php echo trim(stripslashes_deep($this->_payment_settings['page_instructions'])); ?></textarea>
					</td>
				</tr>

				<tr>
					<th>
						<label for="payable_to"><?php _e('Payable To', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" name="payable_to" id="payable_to" size="30" value="<?php echo trim(stripslashes_deep($this->_payment_settings['payable_to'])); ?>" />
					</td>
				</tr>

				<tr>
					<th>
						<label for="payment_address"><?php _e('Address to Send Payment', 'event_espresso'); ?></label>
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
