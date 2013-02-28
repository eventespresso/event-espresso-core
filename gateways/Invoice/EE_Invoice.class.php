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
Class EE_Invoice extends EE_Offline_Gateway {

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
		$this->_gateway_name = 'Invoice';
		$this->_button_base = 'invoice-logo.png';
		$this->_path = str_replace( '\\', '/', __FILE__ );
		$this->_btn_img = is_readable( dirname( $this->_path ) . '/lib/' . $this->_button_base ) ? EVENT_ESPRESSO_PLUGINFULLURL . 'gateways/' . $this->_gateway_name . '/lib/' . $this->_button_base : '';
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
		$this->_payment_settings['invoice_logo_url'] = '';
		$this->_payment_settings['show'] = true;
		$this->_payment_settings['invoice_css'] = '';
		$this->_payment_settings['type'] = 'off-line';
		$this->_payment_settings['display_name'] = 'Invoice';
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
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';	}

	protected function _display_settings() {
		require_once('lib/invoice_functions.php');
		$themes = espresso_invoice_template_files($this->_path);
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
						<select id="base-invoice-select" class="chzn-select wide" name="invoice_css">
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
							<input id="invoice_logo_url" type="text" size="36" name="invoice_logo_url" value="<?php echo $this->_payment_settings['invoice_logo_url']; ?>" />
							<input id="upload_image_button" type="button" value="Upload Image" />
							<span class="description"><?php _e('(logo for the top left of the invoice)', 'event_espresso'); ?></span>
						</p>
						<p class="invoice-logo"><img src="<?php echo $this->_payment_settings['invoice_logo_url']; ?>" alt="" /></p>
						<!--<a id='remove-image' href='#' title='<?php _e('Remove this image', 'event_espresso'); ?>' onclick='return false;'>
							<?php _e('Remove Image', 'event_espresso'); ?>
						</a>-->
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
						<?php echo EE_Form_Fields::select_input('show', $this->_yes_no_options, $this->_payment_settings['show']); ?><br />
						<span class="description"><?php _e('Will display invoices as a payemnt option <br />	on your payemnt page. (Default: Yes)', 'event_espresso'); ?></span>
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


	public function get_payment_overview_content(EE_Transaction $transaction) {
		global $EE_Session;
		$session_data = $EE_Session->get_session_data();
		//printr( $session_data, 'session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); 
		
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Registration.class.php' );
		$registration = $session_data['registration'][$session_data['primary_attendee']['line_item_id']];
		
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
		//$this->_EEM_Gateways->reset_session_data();
		
	}

	public function espresso_display_payment_gateways() {
	
		echo $this->_generate_payment_gateway_selection_button(); 
		?>

		<div id="reg-page-billing-info-<?php echo $this->_gateway_name; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the payment overview where you can download your invoice.', 'event_espresso'); ?>
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
