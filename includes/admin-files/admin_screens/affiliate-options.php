<?php
/**
 * This file takes care of affiliate related stuff for users.
 */
function espresso_affiliate_settings_meta_box() {
	global $org_options, $notices, $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	if ( isset( $_POST['update_affiliate_settings'] ) && check_admin_referer('espresso_form_check', 'add_affiliate_settings') ) {
		$payment_settings['affiliate']['script'] = $_POST['aff_script'];
		$payment_settings['affiliate']['hook_into'] = (array) $_POST['aff_hook_into'];
		if ( update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true ) {
			$notices['updates'][] = __('Affiliate Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Affiliate Settings were not saved! ', 'event_espresso');
		}
	}

	if ( empty($payment_settings['affiliate'] ) ) {
		$payment_settings['affiliate']['script'] = '';
		$payment_settings['affiliate']['hook_into'] = array();
		update_option('payment_data_' . $espresso_wp_user, $payment_settings);
	}
	
	
	?>
	<a name="affiliate_settings" id="affiliate_settings"></a>
	<div class="padding">
		<?php espresso_affiliate_display_settings(); ?>
	</div>
	<?php
}

function espresso_affiliate_display_settings() {
	global $org_options, $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	$options = array('header' => esc_html('Before the opening \'<body>\' tag of every page on the website'), 'purchase_comfirmation' => 'On the purchase confirmation page after completed purchase', 'footer' => esc_html('Before the closing \'</body>\' tag of every page on the website'));
	$hook_row_span = round(count($options)/2);
	?>
	<p><?php _e('You can copy and paste any code you are given from your 3rd party affiliate system and indicate using the checkboxes where you want this to be added on your website as per your 3rd party instructions.', 'event_espresso'); ?></p>
	<form method="post" action="<?php menu_page_url('payment_gateways'); ?>#affiliate_settings">
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
	<?php wp_nonce_field('espresso_form_check', 'add_affiliate_settings'); ?>
	</form>
	<?php
}