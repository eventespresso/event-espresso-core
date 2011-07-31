<?php
function event_espresso_invoice_payment_settings(){
	global $espresso_premium; if ($espresso_premium != true) return;
	if (isset($_POST['update_invoice_payment_settings'])) {
		//$invoice_payment_settings_settings = get_option('event_espresso_invoice_payment_settings_settings');
			$invoice_payment_settings['invoice_title'] = $_POST['invoice_title'];
			$invoice_payment_settings['pdf_title'] = $_POST['pdf_title'];
			$invoice_payment_settings['pdf_instructions'] = $_POST['pdf_instructions'];
			$invoice_payment_settings['invoice_instructions'] = $_POST['invoice_instructions'];
			$invoice_payment_settings['payable_to'] = $_POST['payable_to'];
			$invoice_payment_settings['payment_address'] = $_POST['payment_address'];
			$invoice_payment_settings['image_url'] = $_POST['image_url'];
		update_option('event_espresso_invoice_payment_settings', $invoice_payment_settings);
		echo '<div id="message" class="updated fade"><p><strong>'.__('Invoice Payment settings saved.','event_espresso').'</strong></p></div>';
	}

?>

<div class="metabox-holder">
<div class="postbox">
<h3>
  <?php _e('Invoice Payment Settings','event_espresso'); ?>
</h3>
<div class="padding">
  <?php
				if (isset($_REQUEST['activate_invoice_payment'])&&$_REQUEST['activate_invoice_payment'] == 'true'){
					add_option("events_invoice_payment_active", 'true', '', 'yes');
					add_option("event_espresso_invoice_payment_settings", '', '', 'yes');
					//update_option( 'event_espresso_payment_gateway', 'invoice_payment');
				}
				if (isset($_REQUEST['reactivate_invoice_payment'])&&$_REQUEST['reactivate_invoice_payment'] == 'true'){
					update_option( 'events_invoice_payment_active', 'true');
					//update_option( 'event_espresso_payment_gateway', 'invoice_payment');
				}
				if (isset($_REQUEST['deactivate_invoice_payment'])&&$_REQUEST['deactivate_invoice_payment'] == 'true'){
					update_option( 'events_invoice_payment_active', 'false');
					//update_option( 'event_espresso_payment_gateway', '');
				}
				echo '<ul>';
				switch (get_option('events_invoice_payment_active')){
					case 'false':
					echo '<li>Invoice Payments is installed.</li>';
						echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_invoice_payment=true\';" class="green_alert pointer"><strong>' . __('Activate Invoice Payments?','event_espresso') . '</strong></li>';
					break;
					case 'true':
					echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_invoice_payment=true\';" class="red_alert pointer"><strong>' . __('Deactivate Invoice Payments?','event_espresso') . '</strong></li>';
					event_espresso_display_invoice_payment_settings();
					break;
					default:
						echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_invoice_payment=true\';" class="yellow_alert pointer"><strong>' . __('The Invoice Payments is installed. Would you like to activate it?','event_espresso') . '</strong></li>';
					break;
				}
				echo '</ul>';
?>
</div>
</div>
</div>
<?php
}?>
<?php
//Invoice Payments Settings Form
function event_espresso_display_invoice_payment_settings(){
	global $espresso_premium; if ($espresso_premium != true) return;
	global $org_options;

	$invoice_payment_settings = get_option('event_espresso_invoice_payment_settings');
?>
<form method="post" action="<?php echo $_SERVER['REQUEST_URI']?>">
  <table width="90%" border="0">
    <tr>
      <td valign="top"><ul>
          <li>
            <label for="invoice_title">
              <?php _e('Title:', 'event_espresso'); ?>
            </label>
            <br />
            <input type="text" name="invoice_title" size="30" value="<?php echo empty($invoice_payment_settings['invoice_title']) ? __('Invoice Payments','event_espresso') : stripslashes_deep($invoice_payment_settings['invoice_title']) ;?>" />
          </li>
          <li>
            <label for="invoice_instructions">
              <?php _e('Invoice Instructions:', 'event_espresso'); ?>
            </label>
            <br />
            <textarea name="invoice_instructions" cols="30" rows="5"><?php echo empty($invoice_payment_settings['invoice_instructions']) || trim($invoice_payment_settings['invoice_instructions']) == '' ? __('Please send Invoice to the address below. Payment must be received within 48 hours of event date.', 'event_espresso') : stripslashes_deep($invoice_payment_settings['invoice_instructions']); ?></textarea>
          </li>
          <li>
            <label for="payable_to">
              <?php _e('Payable To:', 'event_espresso'); ?>
            </label>
            <br />
            <input type="text" name="payable_to" size="30" value="<?php echo empty($invoice_payment_settings['payable_to']) || trim($invoice_payment_settings['payable_to']) == '' ? $org_options['organization'] : stripslashes_deep($invoice_payment_settings['payable_to']) ;?>" />
          </li>
          <li>
            <label for="payment_address">
              <?php _e('Address to Send Payment:', 'event_espresso'); ?>
            </label>
            <br />
            <textarea name="payment_address" cols="30" rows="5">
<?php
if (empty($invoice_payment_settings['payment_address']) || trim($invoice_payment_settings['payment_address']) == ''){
?>
<?php echo $org_options['organization_street1'] ?> <?php echo $org_options['organization_street2'] ?>

<?php echo $org_options['organization_city'] ?>, <?php echo $org_options['organization_state'] ?>

<?php echo getCountryName($org_options['organization_country']) ?>

<?php echo $org_options['organization_zip'] ?>
<?php
}else{
	echo $invoice_payment_settings['payment_address'];
}
?>
</textarea>
          </li>
        </ul></td>
      <td valign="top"><ul>
          <li>
            <?php _e('PDF Settings', 'event_espresso'); ?>
          </li>
          <li>
            <label for="pdf_title">
              <?php _e('PDF Title (top right of the invoice):', 'event_espresso'); ?>
            </label>
            <br />
            <input type="text" name="pdf_title" size="30" value="<?php echo empty($invoice_payment_settings['pdf_title']) ? __('Invoice','event_espresso') : stripslashes_deep($invoice_payment_settings['pdf_title']) ;?>" />
          </li>
          <li>
            <label for="image_url">
              <?php _e('Logo URL (logo for the top left of the invoice):','event_espresso'); ?>
            </label>
            <br />
            <input type="text" name="image_url" size="45" value="<?php echo empty($invoice_payment_settings['image_url']) ? '' : $invoice_payment_settings['image_url'];?>" />
          </li>
          <li>
            <label for="pdf_instructions">
              <?php _e('Invoice Instructions in PDF:', 'event_espresso'); ?>
            </label>
            <br />
            <textarea name="pdf_instructions" cols="30" rows="5"><?php echo empty($invoice_payment_settings['pdf_instructions']) || trim($invoice_payment_settings['pdf_instructions']) == '' ? __('Please send this invoice with payment attached to the address above, or use the payment link below. Payment must be received within 48 hours of event date.', 'event_espresso') : stripslashes_deep($invoice_payment_settings['pdf_instructions']); ?></textarea>
          </li>
        </ul></td>
    </tr>
  </table>
  <input type="hidden" name="update_invoice_payment_settings" value="update_invoice_payment_settings">
  <p>
    <input class="button-primary" type="submit" name="Submit" value="<?php  _e('Update Invoice Payment Settings','event_espresso') ?>" id="save_invoice_payment_settings" />
  </p>
</form>
<?php
}
