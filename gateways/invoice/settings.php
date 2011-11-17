<?php
include('invoice_functions.php');
function event_espresso_invoice_payment_settings(){
	global $espresso_premium, $notices, $espresso_wp_user; if ($espresso_premium != true) return;

	//Debug
	//echo '<p>$espresso_wp_user = '.$espresso_wp_user.'</p>';
	
	$old_payment_settings = get_option('payment_data_'.$espresso_wp_user);
	//Debug
	//echo '<pre>'.print_r($old_payment_settings, true).'</pre>';
	
	$payment_settings = get_option('payment_data_'.$espresso_wp_user);
	//Debug
	//echo '<pre>'.print_r($payment_settings, true).'</pre>';
	
	//Update settings
	if (isset($_POST['update_invoice_payment_settings'])) {
		
		//Debug
		//echo '<pre>'.print_r($_POST).'</pre>';
		
		$payment_settings['invoice']['invoice_title'] = strip_tags($_POST['invoice_title']);
		$payment_settings['invoice']['pdf_title'] = trim(strip_tags($_POST['pdf_title']));
		$payment_settings['invoice']['pdf_instructions'] = trim(strip_tags($_POST['pdf_instructions']));
		$payment_settings['invoice']['page_instructions'] = trim(strip_tags($_POST['page_instructions']));
		$payment_settings['invoice']['payable_to'] = trim(strip_tags($_POST['payable_to']));
		$payment_settings['invoice']['payment_address'] = trim(strip_tags( $_POST['payment_address']));
		$payment_settings['invoice']['image_url'] = trim(strip_tags($_POST['image_url']));
		$payment_settings['invoice']['show'] = $_POST['show'];
		$payment_settings['invoice']['invoice_file'] = trim(strip_tags($_POST['invoice_file']));
		$payment_settings['invoice']['invoice_logo_url'] = trim(strip_tags($_POST['upload_image']));
		
		//Debug
		//echo '<pre>'.print_r($payment_settings, true).'</pre>';
		
		if (update_option( 'payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings ) == true){
			$notices['updates'][] = __('Invoice Payment Settings Updated!', 'event_espresso');
		}
	}
	
	//Debug
	//echo '<pre>'.print_r($payment_settings, true).'</pre>';
?>
<a name="invoice" id="invoice"></a>
<div class="metabox-holder">
	<div class="postbox">
		<div title="Click to toggle" class="handlediv"><br />
		</div>
		<h3 class="hndle">
			<?php _e('Invoice Payment Settings','event_espresso'); ?>
		</h3>
		<div class="inside">
			<div class="padding">
				<?php
				if (isset($_REQUEST['activate_invoice_payment']) && $_REQUEST['activate_invoice_payment'] == 'true'){
					$payment_settings['invoice']['active'] = true;
					//echo 'active = '.$payment_settings['invoice']['active'];
					if (add_option( 'payment_data_'.$espresso_wp_user, $payment_settings, '', 'no' ) == true){
						$notices['updates'][] = __('Invoice Payments Activated', 'event_espresso');
					}elseif (update_option('payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings) == true){
						$notices['updates'][] = __('Invoice Payments Activated', 'event_espresso');
					}else{
						$notices['errors'][] = __('Unable to Activate Invoice Payments', 'event_espresso');
					}
				}
				
				if (isset($_REQUEST['reactivate_invoice_payment']) && $_REQUEST['reactivate_invoice_payment'] == 'true'){
					$payment_settings['invoice']['active'] = true;
					//echo 'active = '.$payment_settings['invoice']['active'];
					if (update_option('payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings) == true){
						$notices['updates'][] = __('Invoice Payments Activated', 'event_espresso');
					}else{
						$notices['errors'][] = __('Unable to Activate Invoice Payments', 'event_espresso');
					}
				}
				
				if (isset($_REQUEST['deactivate_invoice_payment']) && $_REQUEST['deactivate_invoice_payment'] == 'true'){
					$payment_settings['invoice']['active'] = false;
					if (update_option( 'payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings) == false){
						$notices['updates'][] = __('Invoice Payments De-activated', 'event_espresso');
					}else{
						$notices['errors'][] = __('Unable to De-activate Invoice Payments', 'event_espresso');
					}
				}
								
				//echo '<pre>'.print_r($payment_settings, true).'</pre>';
				
				echo '<ul>';
				if (!isset($payment_settings['invoice']['active'])){
					echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_invoice_payment=true#invoice\';" class="yellow_alert pointer"><strong>' . __('The Invoice Payments is installed. Would you like to activate it?','event_espresso') . '</strong></li>';
				}else{
					switch ($payment_settings['invoice']['active']){
						
						case false:
							echo '<li>Invoice Payments is installed.</li>';
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_invoice_payment=true#invoice\';" class="green_alert pointer"><strong>' . __('Activate Invoice Payments?','event_espresso') . '</strong></li>';
						break;
						
						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_invoice_payment=true#invoice\';" class="red_alert pointer"><strong>' . __('Deactivate Invoice Payments?','event_espresso') . '</strong></li>';
							event_espresso_display_invoice_payment_settings();
						break;
					}
				}
				echo '</ul>';
?>
			</div>
		</div>
	</div>
</div>
<?php
	//This line keeps the notices from displaying twice
	if ( did_action( 'espresso_admin_notices' ) == false )
		do_action('espresso_admin_notices');
	
}

//Invoice Payments Settings Form
function event_espresso_display_invoice_payment_settings(){
	global $espresso_premium, $org_options, $espresso_wp_user; if ($espresso_premium != true) return;
	
	$payment_settings = get_option('payment_data_'.$espresso_wp_user);
	
	//Debug
	//echo '<pre>'.print_r($payment_settings, true).'</pre>';
	
	$files = espresso_invoice_template_files();
?>
<form method="post" action="<?php echo $_SERVER['REQUEST_URI']?>#invoice">
	<table width="90%" border="0">
		<tr>
			<td valign="top"><ul>
					<li>
						<h4>
							<?php _e('PDF Settings', 'event_espresso'); ?>
						</h4>
					</li>
					
					<?php /*?><li>
						<label for="pdf_title">
							<?php _e('PDF Title (top right of the invoice):', 'event_espresso'); ?>
						</label>
						<input type="text" name="pdf_title" size="30" value="<?php echo empty($payment_settings['invoice']['pdf_title']) ? __('Invoice','event_espresso') : trim(stripslashes_deep($payment_settings['invoice']['pdf_title'])) ;?>" />
					</li><?php */?>
					
					<li>
						<label for="base-invoice-select" <?php echo $styled ?>>
							<?php _e('Select Base Template', 'event_espresso');  ?>
						</label>
						<select id="base-invoice-select" class="wide" <?php echo $disabled ?> name="invoice_file">
							<option <?php espresso_invoice_is_selected($fname) ?> value="basic.html">
							<?php _e('Default Template - Basic', 'event_espresso'); ?>
							</option>
							<?php foreach( $files as $fname ) { ?>
							<option <?php espresso_invoice_is_selected($fname) ?> value="<?php echo $fname ?>"><?php echo $fname; ?></option>
							<?php } ?>
						</select>
						<a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=base_template_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" alt="" /></a> </li>
					<li id="invoice-logo-image">
						<?php

				if(!empty($payment_settings['invoice']['invoice_logo_url'])){
					$invoice_logo = $payment_settings['invoice']['invoice_logo_url'];
				} else {
					$invoice_logo = '';
				}
				// var_dump($event_meta['event_thumbnail_url']);
			?>
						<label for="upload_image">
							<?php _e('Logo Image (logo for the top left of the invoice):','event_espresso'); ?>
						</label>
						<input id="upload_image" type="hidden" size="36" name="upload_image" value="<?php echo $invoice_logo ?>" />
						<input id="upload_image_button" type="button" value="Upload Image" />
						<a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=invoice_logo_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" alt="" /></a>
						<?php 
				if($invoice_logo){ 
?>
						<p class="invoice-logo"><img src="<?php echo $invoice_logo ?>" alt="" /></p>
						<a id='remove-image' href='#' title='<?php _e('Remove this image', 'event_espresso'); ?>' onclick='return false;'>
						<?php _e('Remove Image', 'event_espresso'); ?>
						</a>
						<?php
				}
?>
					</li>
					<li>
						<label for="pdf_instructions">
							<?php _e('Instructions:', 'event_espresso'); ?>
						</label>
						<textarea name="pdf_instructions" cols="30" rows="5"><?php echo empty($payment_settings['invoice']['pdf_instructions']) ? __('Please send this invoice with payment attached to the address above, or use the payment link below. Payment must be received within 48 hours of event date.', 'event_espresso') : stripslashes_deep($payment_settings['invoice']['pdf_instructions']); ?></textarea>
					</li>
				</ul></td>
			<td valign="top"><ul>
			<li>
						<h4>
							<?php _e('On-page Settings', 'event_espresso'); ?>
						</h4>
					</li>
					<li>
		<label for="show">
			<?php _e('Show as an option on the payment page?', 'event_espresso'); ?>
		</label>
		<?php
	$values = array(
		array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
		array('id' => 'N', 'text' => __('No', 'event_espresso')),
	);
	echo select_input('show', $values, empty($payment_settings['invoice']['show']) ? '' : $payment_settings['invoice']['show']);
?>
</li>
					<li>
						<label for="invoice_title">
							<?php _e('Invoice Title:', 'event_espresso'); ?>
						</label>
						<input type="text" name="invoice_title" size="30" value="<?php echo empty($payment_settings['invoice']['invoice_title']) ? __('Invoice Payments','event_espresso') : stripslashes_deep($payment_settings['invoice']['invoice_title']);?>" />
					</li>
					<li>
						<label for="page_instructions">
							<?php _e('Invoice Instructions:', 'event_espresso'); ?>
						</label>
						<textarea name="page_instructions" cols="30" rows="5"><?php echo empty($payment_settings['invoice']['page_instructions']) ? __('Please send Invoice to the address below. Payment must be received within 48 hours of event date.', 'event_espresso') : trim(stripslashes_deep($payment_settings['invoice']['page_instructions'])); ?></textarea>
					</li>
					<li>
						<label for="payable_to">
							<?php _e('Payable To:', 'event_espresso'); ?>
						</label>
						<input type="text" name="payable_to" size="30" value="<?php echo empty($payment_settings['invoice']['payable_to']) ? trim($org_options['organization']) : trim(stripslashes_deep($payment_settings['invoice']['payable_to'])) ;?>" />
					</li>
					<li>
						<label for="payment_address">
							<?php _e('Address to Send Payment:', 'event_espresso'); ?>
						</label>
						<textarea name="payment_address" cols="30" rows="5"><?php 
if ( empty($payment_settings['invoice']['payment_address']) ){
echo trim($org_options['organization_street1']) ?> <?php echo trim($org_options['organization_street2']); ?>

<?php echo trim($org_options['organization_city']) ?>, <?php echo trim($org_options['organization_state']); ?>

<?php echo trim(getCountryName($org_options['organization_country'])); ?>

<?php echo trim($org_options['organization_zip']); ?>
<?php
}else{
echo trim($payment_settings['invoice']['payment_address']);
}
?>
</textarea>
					</li>
					
					
				</ul></td>
		</tr>
	</table>
	<input type="hidden" name="update_invoice_payment_settings" value="update_invoice_payment_settings">
	
	<p>
		<input class="button-primary" type="submit" name="Submit" value="<?php  _e('Update Invoice Payment Settings','event_espresso') ?>" id="save_invoice_payment_settings" />
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

