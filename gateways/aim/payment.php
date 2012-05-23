<?php
function espresso_display_aim() {

	global $org_options, $payment_settings, $css_class, $gateways;
	
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	
	// this filter allows whatever function is processing the registration page to know what inputs to expect
	add_filter( 'filter_hook_espresso_reg_page_billing_inputs', 'espresso_reg_page_billing_inputs_aim' );
	$gateway = 'aim';
	$authnet_aim_settings = $payment_settings[ $gateway ];
	$use_sandbox = $authnet_aim_settings['use_sandbox'] || $authnet_aim_settings['test_transactions'];
	if ($use_sandbox) {
		$test_creds = '
		<h4 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h4>
		<p style="color:#ff0000;">Test credit card # 4007000000027</p><br/>
		';
	} else {
		$test_creds = '';
	}
	$logo = EVENT_ESPRESSO_PLUGINFULLURL . 'gateways/authnet/lib/logo-auth_net.png';
?>

			<a id="payment-gateway-button-<?php echo $gateway;?>" class="reg-page-payment-option-lnk" rel="<?php echo $gateway;?>" href="<?php echo $gateways[ $gateway ]['form_url'];?>" >
				<img src="<?php echo $logo; ?>" alt="Pay using Authorize.Net" />
			</a>
			
			<div id="reg-page-billing-info-<?php echo $gateway;?>-dv" class="reg-page-billing-info-dv <?php echo $gateways[ $gateway ]['css_class'];?>">
				
				<input id="reg-page-selected-gateway-name" type="hidden" value="Authorize.Net AIM" name="selected_gateway_name[<?php echo $gateway;?>]">
		
				<?php echo $test_creds; ?>
				
				<h5><strong><?php _e('Billing Address', 'event_espresso'); ?></strong></h5>
				
				<p class="event_form_field">
					<label for="reg-page-billing-fname"><?php _e('First Name', 'event_espresso'); ?> <em>*</em></label>
					<input id="reg-page-billing-fname" class="required <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-fname" title="">
				</p>
	
				<p class="event_form_field">
					<label for="reg-page-billing-lname"><?php _e('Last Name', 'event_espresso'); ?> <em>*</em></label>
					<input id="reg-page-billing-lname" class="required <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-lname" title="">
				</p>
				
				<p class="event_form_field">
					<label for="reg-page-billing-email"><?php _e('Email', 'event_espresso'); ?> <em>*</em></label>
					<input id="reg-page-billing-email" class="required email <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-email" title="">
				</p>
	
				<p class="event_form_field">
					<label for="reg-page-billing-address"><?php _e('Address', 'event_espresso'); ?> <em>*</em></label>
					<input id="reg-page-billing-address" class="required <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-address">
				</p>
	
				<p class="event_form_field">
					<label for="reg-page-billing-city"><?php _e('City', 'event_espresso'); ?> <em>*</em></label>
					<input id="reg-page-billing-city" class="required <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-city">
				</p>
	
				<p class="event_form_field">
					<label for="reg-page-billing-state"><?php _e('State', 'event_espresso'); ?> <em>*</em></label>
					<input id="reg-page-billing-state" class="required medium-txt <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-state">
				</p>
	
				<p class="event_form_field">
					<label for="reg-page-billing-zip"><?php _e('Zip', 'event_espresso'); ?> <em>*</em></label>
					<input id="reg-page-billing-zip" class="required small-txt <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-zip">
				</p>
				
				<h5><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></h5>
				
				<p class="event_form_field">
					<label for="reg-page-billing-card-nmbr"><?php _e('Card Number', 'event_espresso'); ?> <em>*</em></label>
		        	<input id="reg-page-billing-card-nmbr" class="required <?php echo $css_class;?>" type="text" name="reg-page-billing-card-nmbr"/>
				</p>
	
	<?php /*
				<p class="event_form_field">
					<label for="reg-page-billing-card-exp-date"><?php _e('Expiry Date', 'event_espresso'); ?> <em>*</em></label>
		        	<input id="reg-page-billing-card-exp-date" class="required medium-txt <?php echo $css_class;?>" type="text" name="reg-page-billing-card-exp-date"/>
				</p>
	*/?>
				<p class="event_form_field">
					<label><?php _e('Expiry Date', 'event_espresso'); ?> <em>*</em></label>
					<select id="reg-page-billing-card-exp-date-mnth" class="required small-txt <?php echo $css_class;?>" name="reg-page-billing-card-exp-date-mnth">
	<?php	for ( $x = 1; $x <= 12; $x++ ) { 
					$value = $x < 10 ? '0'.$x : $x;
					echo '
						<option value="'.$value.'">'.$value.'</option>';
				} ?>				
					</select>
					&nbsp;/&nbsp;
					<select id="reg-page-billing-card-exp-date-year" class="required small-txt <?php echo $css_class;?>" name="reg-page-billing-card-exp-date-year">
	<?php
				$current_year = date( 'y' );
				$next_decade = $current_year + 10;
				for ( $x = $current_year; $x <= $next_decade; $x++ ) { 
					$value = $x < 10 ? '0'.$x : $x;
					echo '
						<option value="'.$value.'">'.$value.'</option>';
				} ?>				
					</select>
					<span class="small-text lt-grey-text"><?php _e('(mm/yy)', 'event_espresso'); ?></span>
				</p>
				
				<p class="event_form_field">
					<label for="reg-page-billing-card-ccv-code"><?php _e('CCV Code', 'event_espresso'); ?> <em>*</em></label>
		        	<input id="reg-page-billing-card-ccv-code"  class="required small-txt <?php echo $css_class;?>" type="text" name="reg-page-billing-card-ccv-code"/>
				</p>
			
			</div>
			
<?php
}
add_action('action_hook_espresso_display_onsite_payment_gateway', 'espresso_display_aim');


function espresso_reg_page_billing_inputs_aim() {

		$reg_page_billing_inputs = array (
		
						'reg-page-billing-fname' => array(
								'db-col' =>'fname',
								'label' => __( 'First Name', 'event_espresso' ),
								'input' =>'text',
								'type' =>'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),
						
						'reg-page-billing-lname' => array(
								'db-col' =>'lname',
								'label' => __( 'Last Name', 'event_espresso' ),
								'input' =>'text',
								'type' =>'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),
						
						'reg-page-billing-email' => array(
								'db-col' =>'email',
								'label' => __( 'Email Address', 'event_espresso' ),
								'input' =>'text',
								'type' =>'string',
								'sanitize' => 'email',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),
						
						'reg-page-billing-address' => array(
								'db-col' =>'address',
								'label' => __( 'Address', 'event_espresso' ),
								'input' =>'text',
								'type' =>'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),
						
						'reg-page-billing-city' => array(
								'db-col' =>'city',
								'label' => __( 'City', 'event_espresso' ),
								'input' =>'text',
								'type' =>'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),
						
						'reg-page-billing-state' => array(
								'db-col' =>'state',
								'label' => __( 'State', 'event_espresso' ),
								'input' =>'text',
								'type' =>'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),
						
						'reg-page-billing-zip' => array(
								'db-col' =>'zip',
								'label' => __( 'Zip Code', 'event_espresso' ),
								'input' =>'text',
								'type' =>'string',
								'sanitize' => 'no_html',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),
						
						'reg-page-billing-card-nmbr' => array(
								'db-col' =>'card-nmbr',
								'label' => __( 'Credit Card Number', 'event_espresso' ),
								'input' =>'text',
								'type' =>'int',
								'sanitize' => 'ccard',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%d' 
						),
						
/*						'reg-page-billing-card-exp-date' => array(
								'db-col' =>'exp-date',
								'label' => __( 'Expiry Date', 'event_espresso' ),
								'input' =>'text',
								'type' =>'string',
								'sanitize' => 'mm/yy',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),*/
						
						'reg-page-billing-card-exp-date-mnth' => array(
								'db-col' =>'exp-date-mnth',
								'label' => __( 'Expiry Date Month', 'event_espresso' ),
								'input' =>'select',
								'type' =>'int',
								'sanitize' => 'ccmm',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),
						
						'reg-page-billing-card-exp-date-year' => array(
								'db-col' =>'exp-date-year',
								'label' => __( 'Expiry Date Year', 'event_espresso' ),
								'input' =>'select',
								'type' =>'int',
								'sanitize' => 'ccyy',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),
						
						'reg-page-billing-card-ccv-code' => array(
								'db-col' =>'ccv-code',
								'label' => __( 'CCV Code', 'event_espresso' ),
								'input' =>'text',
								'type' =>'int',
								'sanitize' => 'ccv',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%d' 
						),
				
				);
					
		return $reg_page_billing_inputs;
}