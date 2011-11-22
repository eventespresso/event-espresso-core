<?php
function event_espresso_bank_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user; if ($espresso_premium != true) return;
	
	$old_payment_settings = get_option('payment_data_'.$espresso_wp_user);
	$payment_settings = get_option('payment_data_'.$espresso_wp_user);
	
	if (isset($_POST['update_bank_payment_settings']) && check_admin_referer('espresso_form_check', 'add_bank_settings')) {
		$allowable_tags = '<br /><br><a>';
		//$bank_payment_settings_settings = get_option('event_espresso_bank_payment_settings_settings');
		$payment_settings['bank_payment']['account_name'] = strip_tags($_POST['account_name'],$allowable_tags);
		$payment_settings['bank_payment']['page_title'] = strip_tags($_POST['page_title'],$allowable_tags);
		$payment_settings['bank_payment']['bank_instructions'] = strip_tags($_POST['bank_instructions'],$allowable_tags);
		$payment_settings['bank_payment']['bank_name'] = strip_tags($_POST['bank_name'],$allowable_tags);
		$payment_settings['bank_payment']['account_number'] = strip_tags($_POST['account_number'],$allowable_tags);
		$payment_settings['bank_payment']['bank_address'] = strip_tags($_POST['bank_address'],$allowable_tags);
		
		if (update_option( 'payment_data_'.$espresso_wp_user, $payment_settings ) == true){
			$notices['updates'][] = __('Electronic Funds Transfer Settings Updated!', 'event_espresso');
		}else{
			$notices['errors'][] = __('Electronic Funds Transfer Settings were not saved! ', 'event_espresso');
		}
	}
	
	//Open or close the postbox div
	if ($payment_settings['bank_payment']['active'] == false || isset($_REQUEST['deactivate_bank_payment']) && $_REQUEST['deactivate_bank_payment'] == 'true' ){
		$postbox_style = 'closed';
	}
	if (isset($_REQUEST['reactivate_bank_payment']) && $_REQUEST['reactivate_bank_payment'] == 'true'){
		$postbox_style = '';
	}
	if (isset($_REQUEST['activate_bank_payment']) && $_REQUEST['activate_bank_payment'] == 'true'){
		$postbox_style = '';
	}

?>

<a name="bank_payment" id="bank_payment"></a>
<div class="metabox-holder">
	<div class="postbox <?php echo $postbox_style; ?>">
		<div title="Click to toggle" class="handlediv"><br />
		</div>
		<h3 class="hndle">
			<?php _e('Electronic Funds Transfer Settings', 'event_espresso'); ?>
		</h3>
		<div class="inside">
			<div class="padding">
			<!--New -->
				<?php
					if (isset($_REQUEST['activate_bank_payment']) && $_REQUEST['activate_bank_payment'] == 'true') {
						$payment_settings['bank_payment']['active'] = true;
						if (add_option( 'payment_data_'.$espresso_wp_user, $payment_settings, '', 'no' ) == true){
							$notices['updates'][] = __('Electronic Funds Transfers Activated', 'event_espresso');
						}elseif (update_option('payment_data_'.$espresso_wp_user, $payment_settings) == true){
							$notices['updates'][] = __('Electronic Funds Transfers Activated', 'event_espresso');
						}else{
							$notices['errors'][] = __('Unable to Activate Electronic Funds Transfers', 'event_espresso');
						}
					}
					
					if (isset($_REQUEST['reactivate_bank_payment']) && $_REQUEST['reactivate_bank_payment'] == 'true') {
						$payment_settings['bank_payment']['active'] = true;
						if (update_option('payment_data_'.$espresso_wp_user, $payment_settings) == true){
							$notices['updates'][] = __('Electronic Funds Transfers Payments Activated', 'event_espresso');
						}else{
							$notices['errors'][] = __('Unable to Activate Electronic Funds Transfers', 'event_espresso');
						}
					}
					
					if (isset($_REQUEST['deactivate_bank_payment']) && $_REQUEST['deactivate_bank_payment'] == 'true') {
						$payment_settings['bank_payment']['active'] = false;
						if (update_option( 'payment_data_'.$espresso_wp_user, $payment_settings) == true){
							$notices['updates'][] = __('Electronic Funds Transfers Payments De-activated', 'event_espresso');
						}else{
							$notices['errors'][] = __('Unable to De-activate Electronic Funds Transfers', 'event_espresso');
						}
					}
					
					echo '<ul>';
					if (!isset($payment_settings['bank_payment']['active'])){
						echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_bank_payment=true#bank_payment\';" class="yellow_alert pointer"><strong>' . __('The Electronic Funds Transfers is installed. Would you like to activate it?','event_espresso') . '</strong></li>';
					}else{
						switch ($payment_settings['bank_payment']['active']){
						
							case false:
								echo '<li>Electronic Funds Transfers is Installed.</li>';
								echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_bank_payment=true#bank_payment\';" class="green_alert pointer"><strong>' . __('Activate Electronic Funds Transfers?', 'event_espresso') . '</strong></li>';
								break;
							
							case true:
								echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_bank_payment=true\';" class="red_alert pointer"><strong>' . __('Deactivate Electronic Funds Transfers?', 'event_espresso') . '</strong></li>';
								event_espresso_display_bank_payment_settings();
								break;
						}
					}
					echo '</ul>';
					?>
				<!--New --> 
				
			</div>
		</div>
	</div>
</div>
<?php
	//This line keeps the notices from displaying twice
	if ( did_action( 'espresso_admin_notices' ) == false )
		do_action('espresso_admin_notices');

}

//Electronic Funds Transfers Settings Form
function event_espresso_display_bank_payment_settings() {
	global $espresso_premium, $org_options, $espresso_wp_user; if ($espresso_premium != true) return;
	
	$payment_settings = get_option('payment_data_'.$espresso_wp_user);
?>
<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>#bank_payment">

	<table class="form-table">
		<tbody>
			<tr>
				<th><label for="bank_page_title">
							<?php _e('Page Title', 'event_espresso'); ?>
						</label></th>
				<td><input class="regular-text" type="text" name="page_title" id="bank_page_title" size="30" value="<?php echo $payment_settings['bank_payment']['page_title'] == '' ? __('Electronic Funds Transfers', 'event_espresso') : $payment_settings['bank_payment']['page_title']; ?>" /></td>
			</tr>
			<tr>
				<th><label for="bank_instructions">
							<?php _e('Payment Instructions', 'event_espresso'); ?>
						</label></th>
				<td><textarea name="bank_instructions" cols="30" rows="5"><?php echo trim($payment_settings['bank_payment']['bank_instructions']) == '' ? __('Please initiate an electronic payment using the bank information below. Payment must be received within 48 hours of event date.', 'event_espresso') : $payment_settings['bank_payment']['bank_instructions']; ?></textarea></td>
			</tr>
			<tr>
				<th><label for="account_name">
							<?php _e('Name on Account', 'event_espresso'); ?>
						</label></th>
				<td><input class="regular-text" type="text" name="account_name" id="account_name" size="30" value="<?php echo trim($payment_settings['bank_payment']['account_name']) == '' ? '' : trim($payment_settings['bank_payment']['account_name']); ?>" /></td>
			</tr>
			<tr>
				<th><label for="account_number">
							<?php _e('Bank Account #', 'event_espresso'); ?>
						</label></th>
				<td><input class="regular-text" type="text" name="account_number" id="account_number" size="30" value="<?php echo trim($payment_settings['bank_payment']['account_number']) == '' ? '' : trim($payment_settings['bank_payment']['account_number']); ?>" /></td>
			</tr>
			<tr>
				<th><label for="bank_name">
							<?php _e('Bank Name', 'event_espresso'); ?>
						</label></th>
				<td><input class="regular-text" type="text" name="bank_name" id="bank_name" size="30" value="<?php echo trim($payment_settings['bank_payment']['bank_name']) == '' ? '' : trim($payment_settings['bank_payment']['bank_name']); ?>" /></td>
			</tr>
			<tr>
				<th><label for="bank_address">
							<?php _e('Bank Address', 'event_espresso'); ?>
						</label></th>
				<td><textarea name="bank_address" cols="30" rows="5"><?php echo $payment_settings['bank_payment']['bank_address']; ?></textarea></td>
			</tr>
		</tbody>
	</table>
<?php /*?><!-- TABLE TEMPLATE -->
	<table class="form-table">
		<tbody>
			<tr>
				<th> </th>
				<td></td>
			</tr>
			<tr>
				<th> </th>
				<td></td>
			</tr>
			<tr>
				<th> </th>
				<td></td>
			</tr>
		</tbody>
	</table><?php */?>

	<input type="hidden" name="update_bank_payment_settings" value="update_bank_payment_settings">
	<p>
		<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Electronic Funds Transfer Settings', 'event_espresso') ?>" id="save_bank_payment_settings" />
	</p>
	<?php wp_nonce_field( 'espresso_form_check', 'add_bank_settings' ); ?>
</form>
<?php
}