<?php
function espresso_display_aim() {

	global $org_options, $payment_settings, $css_class;
	
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	
	// this filter allows whatever function is processing the registration page to know what inputs to expect
	add_filter( 'filter_hook_espresso_reg_page_billing_inputs', 'espresso_reg_page_billing_inputs_aim' );

	$authnet_aim_settings = $payment_settings['aim'];
	$use_sandbox = $authnet_aim_settings['use_sandbox'] || $authnet_aim_settings['test_transactions'];
	if ($use_sandbox) {
		echo '<p>Test credit card # 4007000000027</p>';
		echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h3>';
	}
?>
			<h5><strong><?php _e('Billing Address', 'event_espresso'); ?></strong></h5>
			
			<p class="event_form_field">
				<label for="reg-page-billing-fname"><?php _e('First Name', 'espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-fname" class="required <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-fname" title="">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-lname"><?php _e('Last Name', 'espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-lname" class="required <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-lname" title="">
			</p>
			
			<p class="event_form_field">
				<label for="reg-page-billing-email"><?php _e('Email', 'espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-email" class="required email <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-email" title="">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-address"><?php _e('Address', 'espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-address" class="required <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-address">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-city"><?php _e('City', 'espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-city" class="required <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-city">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-state"><?php _e('State', 'espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-state" class="required medium-txt <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-state">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-zip"><?php _e('Zip', 'espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-zip" class="required small-txt <?php echo $css_class;?>" type="text" value="" name="reg-page-billing-zip">
			</p>
			
			<h5><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></h5>
			
			<p class="event_form_field">
				<label for="reg-page-billing-card-nmbr"><?php _e('Card Number', 'event_espresso'); ?> <em>*</em></label>
	        	<input id="reg-page-billing-card-nmbr" class="required <?php echo $css_class;?>" type="text" name="reg-page-billing-card-nmbr"/>
			</p>
			<p class="event_form_field">
				<label for="reg-page-billing-card-exp-date"><?php _e('Expiry Date', 'event_espresso'); ?> <em>*</em></label>
	        	<input id="reg-page-billing-card-exp-date" class="required medium-txt <?php echo $css_class;?>" type="text" name="reg-page-billing-card-exp-date"/>
			</p>
			<p class="event_form_field">
				<label for="reg-page-billing-card-ccv-code"><?php _e('CCV Code', 'event_espresso'); ?> <em>*</em></label>
	        	<input id="reg-page-billing-card-ccv-code"  class="required small-txt <?php echo $css_class;?>" type="text" name="reg-page-billing-card-ccv-code"/>
			</p>

<?php
}
add_action('action_hook_espresso_display_onsite_payment_gateway', 'espresso_display_aim');


function espresso_reg_page_billing_inputs_aim() {

		$reg_page_billing_inputs = array (
		
						'reg-page-billing-fname' => array(
								'db-col' =>'fname',
								'label' => __( 'First Name', 'espresso' ),
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
								'label' => __( 'Last Name', 'espresso' ),
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
								'label' => __( 'Email Address', 'espresso' ),
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
								'label' => __( 'Address', 'espresso' ),
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
								'label' => __( 'City', 'espresso' ),
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
								'label' => __( 'State', 'espresso' ),
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
								'label' => __( 'Zip Code', 'espresso' ),
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
								'label' => __( 'Credit Card Number', 'espresso' ),
								'input' =>'text',
								'type' =>'int',
								'sanitize' => 'ccard',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%d' 
						),
						
						'reg-page-billing-card-exp-date' => array(
								'db-col' =>'exp-date',
								'label' => __( 'Expiry Date', 'espresso' ),
								'input' =>'text',
								'type' =>'string',
								'sanitize' => 'mm/yy',
								'required' => TRUE,
								'validation' => TRUE,
								'value' => NULL,
								'format' => '%s' 
						),
						
						'reg-page-billing-card-ccv-code' => array(
								'db-col' =>'ccv-code',
								'label' => __( 'CCV Code', 'espresso' ),
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