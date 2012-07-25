<?php
//Invoice verion 2.0
include('lib/invoice_functions.php');

function espresso_invoice_settings() {
	global $espresso_premium, $notices, $espresso_wp_user, $org_options, $active_gateways;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);

	if (isset($_POST['update_invoice_payment_settings'])) {
		$payment_settings['invoice']['pdf_title'] = trim(strip_tags($_POST['pdf_title']));
		$payment_settings['invoice']['pdf_instructions'] = trim(strip_tags($_POST['pdf_instructions']));
		$payment_settings['invoice']['page_instructions'] = trim(strip_tags($_POST['page_instructions']));
		$payment_settings['invoice']['payable_to'] = trim(strip_tags($_POST['payable_to']));
		$payment_settings['invoice']['payment_address'] = trim(strip_tags($_POST['payment_address']));
		$payment_settings['invoice']['image_url'] = trim(strip_tags($_POST['image_url']));
		$payment_settings['invoice']['show'] = $_POST['show'];
		$payment_settings['invoice']['invoice_css'] = trim(strip_tags($_POST['invoice_css']));

		if (update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings)) {
			$notices['updates'][] = __('Invoice Payment Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Invoice Payment Settings were not saved! ', 'event_espresso');
		}
	}

	//default values
	if (empty($payment_settings['invoice'])) {
		$default_address = trim($org_options['organization_street1']);
		$default_address .= empty($org_options['organization_street2']) ? '' : '<br />' . trim($org_options['organization_street2']);
		$default_address .= '<br />' . trim($org_options['organization_city']);
		$default_address .= ',' . trim($org_options['organization_state']);
		$default_address .= '<br />' . trim(getCountryName($org_options['organization_country']));
		$default_address .= '<br />' . trim($org_options['organization_zip']);
		$payment_settings['invoice']['active'] = '';
		$payment_settings['invoice']['pdf_title'] = __('Invoice Payments', 'event_espresso');
		$payment_settings['invoice']['pdf_instructions'] = __('Please send this invoice with payment attached to the address above, or use the payment link below. Payment must be received within 48 hours of event date.', 'event_espresso');
		$payment_settings['invoice']['page_instructions'] = __('Please send Invoice to the address below. Payment must be received within 48 hours of event date.', 'event_espresso');
		$payment_settings['invoice']['payable_to'] = trim($org_options['organization']);
		$payment_settings['invoice']['payment_address'] = $default_address;
		$payment_settings['invoice']['image_url'] = '';
		$payment_settings['invoice']['show'] = true;
		$payment_settings['invoice']['invoice_css'] = '';
		$payment_settings['invoice']['type'] = 'off-line';
		$payment_settings['invoice']['display_name'] = 'Invoice';
		update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings);
	}
	?>

	<a name="invoice" id="invoice"></a>
	<div class="padding">
		<?php
		if (!empty($_REQUEST['activate_invoice_payment'])) {
			$active_gateways['invoice'] = str_replace( '\\', '/', dirname(__FILE__ ));
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
				$notices['updates'][] = __('Invoice Payments Activated', 'event_espresso');
			} else {
				$notices['errors'][] = __('Unable to Activate Invoice Payments', 'event_espresso');
			}
		}

		if (!empty($_REQUEST['deactivate_invoice_payment'])) {
			unset($active_gateways['invoice']);
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
				$notices['updates'][] = __('Invoice Payments De-activated', 'event_espresso');
			} else {
				$notices['errors'][] = __('Unable to De-activate Invoice Payments', 'event_espresso');
			}
		}

		echo '<ul>';
		if (!array_key_exists('invoice', $active_gateways)) {
			echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_invoice_payment=true#invoice\';" class="green_alert pointer"><strong>' . __('Activate Invoice Payments?', 'event_espresso') . '</strong></li>';
		} else {
			echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_invoice_payment=true\';" class="red_alert pointer"><strong>' . __('Deactivate Invoice Payments?', 'event_espresso') . '</strong></li>';
			event_espresso_display_invoice_payment_settings($payment_settings);
		}
		echo '</ul>';
		?>
	</div>
	<?php
}

//Invoice Payments Settings Form
function event_espresso_display_invoice_payment_settings($payment_settings) {
	$files = espresso_invoice_template_files();
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')),
	);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_invoice_payment=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#invoice">
		<h4><?php _e('On-page Settings', 'event_espresso'); ?></h4>
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="show">
							<?php _e('Show as an option on the payment page?', 'event_espresso'); ?>
						</label></th>
					<td><?php echo select_input('show', $values, $payment_settings['invoice']['show']); ?><br />
						<span class="description"><?php _e('Will display invoices as a payemnt option <br />
on your payemnt page. (Default: Yes)', 'event_espresso'); ?></span></td>
				</tr>
				<tr>
					<th><label for="pdf_title">
							<?php _e('Invoice Title', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="pdf_title" id="pdf_title" size="30" value="<?php echo stripslashes_deep($payment_settings['invoice']['pdf_title']); ?>" /></td>
				</tr>
				<tr>
					<th><label for="page_instructions">
							<?php _e('Invoice Instructions', 'event_espresso'); ?>
						</label></th>
					<td><textarea name="page_instructions" cols="30" rows="5"><?php echo trim(stripslashes_deep($payment_settings['invoice']['page_instructions'])); ?></textarea></td>
				</tr>
				<tr>
					<th><label for="payable_to">
							<?php _e('Payable To', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="payable_to" id="payable_to" size="30" value="<?php echo trim(stripslashes_deep($payment_settings['invoice']['payable_to'])); ?>" /></td>
				</tr>
				<tr>
					<th><label for="payment_address">
							<?php _e('Address to Send Payment', 'event_espresso'); ?>
						</label></th>
					<td><textarea name="payment_address" cols="30" rows="5"><?php echo trim($payment_settings['invoice']['payment_address']); ?>
						</textarea></td>
				</tr>
			</tbody>
		</table>
		<h4>
			<?php _e('Invoice Display Settings', 'event_espresso'); ?>
		</h4>
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="base-invoice-select">
							<?php _e('Select Stylesheet', 'event_espresso'); ?>
							<?php //apply_filters('filter_hook_espresso_help', 'base_template_info')  ?>
						</label></th>
					<td><select id="base-invoice-select" class="chzn-select wide" name="invoice_css">
							<option <?php espresso_invoice_is_selected('', $payment_settings['invoice']['invoice_css']) ?> value="simple.css">
								<?php _e('Default CSS - Simple', 'event_espresso'); ?>
							</option>
							<?php foreach ($files as $fname) { ?>
								<option <?php espresso_invoice_is_selected($fname, $payment_settings['invoice']['invoice_css']) ?> value="<?php echo $fname ?>"><?php echo $fname; ?></option>
							<?php } ?>
						</select><br />
						<span class="description"><?php _e('Load a custom/pre-made style sheet <br />
to change the look of your invoices.', 'event_espresso'); ?></span></td>
				</tr>
				<tr>
					<th><label for="pdf_instructions">
							<?php _e('Instructions', 'event_espresso'); ?>
						</label></th>
					<td><textarea name="pdf_instructions" cols="30" rows="5"><?php echo stripslashes_deep($payment_settings['invoice']['pdf_instructions']); ?></textarea></td>
				</tr>
				<tr>
					<th><label for="image_url">
							<?php _e('Logo Image', 'event_espresso'); ?>
							<?php //apply_filters('filter_hook_espresso_help', 'invoice_logo_info') ?>
						</label></th>
					<td><p id="invoice-logo-image">
							<input id="image_url" type="hidden" size="36" name="image_url" value="<?php echo $payment_settings['invoice']['image_url']; ?>" />
							<input id="upload_image_button" type="button" value="Upload Image" />
							<br />
							<span class="description">
								<?php _e('(logo for the top left of the invoice)', 'event_espresso'); ?>
							</span>
						<p class="invoice-logo"><img src="<?php echo $payment_settings['invoice']['image_url']; ?>" alt="" /></p>
						<a id='remove-image' href='#' title='<?php _e('Remove this image', 'event_espresso'); ?>' onclick='return false;'>
							<?php _e('Remove Image', 'event_espresso'); ?>
						</a>
						</p></td>
				</tr>
			</tbody>
		</table>

		<input type="hidden" name="update_invoice_payment_settings" value="update_invoice_payment_settings">
		<p>
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Invoice Payment Settings', 'event_espresso') ?>" id="save_invoice_payment_settings" />
		</p>
	</form>
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

add_meta_box('espresso_invoice_gateway_settings', __('Invoice Payment Settings', 'event_espresso'), 'espresso_invoice_settings', 'event-espresso_page_payment_gateways');