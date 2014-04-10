<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * paypal_pro_billing_form
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
/**
 * @var $form_section EE_Billing_Info_Form
 */
if($form_section->payment_method()->debug_mode()){
?><div class="sandbox-panel">
					<h2 class="section-title"><?php _e('PayPal Sandbox Mode', 'event_espreso'); ?></h2>
					<h3 style="color:#ff0000;"><?php _e('Debug Mode Is Turned On. Payments will not be processed', 'event_espresso'); ?></h3>

					<p class="test-credit-cards-info-pg" style="margin-bottom:0;">
						<strong><?php _e('Testing Guidelines', 'event_espreso'); ?></strong>
					</p>
					<ul style="margin:1em 2em 1.5em; line-height:1.2em;">
						<li><?php _e('While testing, use the credit card number listed below. Other numbers will produce an error.', 'event_espreso'); ?></li>
						<li><?php _e('Expiry Date can be any valid date in the future', 'event_espreso'); ?></li>
						<li><?php printf(_e('CVV2 should be 115 (see %s paypals documentation for other special codes %s)', 'event_espreso'),'<a href="https://cms.paypal.com/ca/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_testing_SBTestErrorConditions#id108HH0RJ0TS">','</a>'); ?></li>
					</ul>

					<p class="test-credit-cards-info-pg">
						<strong><?php _e('Credit Card Numbers Used for Testing', 'event_espreso'); ?></strong><br/>
						<span class="small-text"><?php _e('Use the following credit card numbers for testing. Any other card number produces a general failure.', 'event_espreso'); ?></span>
					</p>

					<div class="tbl-wrap">
						<table id="paypal-test-credit-cards" class="test-credit-card-data-tbl">
							<thead>
								<tr>
									<td style="width:40%;"><?php _e('Test Card Type', 'event_espreso'); ?></td>
									<td><?php _e('Test Card Numbers', 'event_espreso'); ?></td>
								</tr>				
							</thead>
							<tbody>
								<tr>
									<td><?php _e('Master Card', 'event_espreso'); ?></td>
									<td>5424180818927383</td>
								</tr>
							</tbody>
						</table>	
					</div><br/>

					<p class="test-credit-cards-info-pg">
						<strong><?php _e('Testing Result Code Responses', 'event_espreso'); ?></strong><br/>
						<span class="small-text"><?php printf(__('You can use the amount of the transaction to generate a particular result code (see %s Paypal\'s documentation%s). The table below lists the general guidelines for specifying amounts. IMPORTANT: before you attempt any of these, ensure your sandbox paypal account has %s "Negative Testing" set to on%s. Also be aware that you can generate AVS errors by using certain strings in your address field, and CVV errors using certain CVV values. See %s this paypal doc %s', 'event_espreso'),"<a href='https://developer.paypal.com/docs/classic/api/errorcodes/#id09C3GA00GR1'>","</a>", "<a href='https://docs.google.com/a/eventespresso.com/file/d/0B5P8GXTvZgfMNXNkZ2s5VUlHTUk/edit?usp=drivesdk'>","</a>","<a href='https://cms.paypal.com/ca/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_testing_SBTestErrorConditions'>","</a>"); ?></span>
					</p>			

					<div class="tbl-wrap">
						<table id="paypal-test-credit-cards" class="test-credit-card-data-tbl">
							<thead>
								<tr>
									<td style="width:30%;"><?php _e('Amount', 'event_espreso'); ?></td>
									<td><?php _e('Response', 'event_espreso'); ?></td>
								</tr>				
							</thead>
							<tbody>
								<tr>
									<td>$0 - $103.99</td>
									<td><?php _e('Approved', 'event_espreso'); ?></td>
								</tr>				
								<tr>
									<td>$104.00</td>
									<td><?php _e('Invalid amount', 'event_espreso'); ?></td>
								</tr>
								<tr>
									<td>$104.02</td>
									<td><?php _e('Invalid transaction type', 'event_espreso'); ?></td>
								</tr>
								<tr>
									<td>$104.05</td>
									<td><?php _e('Field format error', 'event_espreso'); ?></td>
								</tr>
								<tr>
									<td>$105.02</td>
									<td><?php _e('Invalid expiry date', 'event_espreso'); ?></td>
								</tr>
								<tr>
									<td>$105.04</td>
									<td><?php _e('CVV2 Mismatch', 'event_espreso'); ?></td>
								</tr>
								<tr>
									<td>$105.06</td>
									<td><?php _e('Declined', 'event_espreso'); ?></td>
								</tr>
								<tr>
									<td>$105.22</td>
									<td><?php _e('Invalid account number', 'event_espreso'); ?></td>
								</tr>
								<tr>
									<td>$105.36</td>
									<td><?php _e('Invalid account number', 'event_espreso'); ?></td>
								</tr>
							</tbody>
						</table>	
					</div>			
				</div><?php
}
// End of file paypal_pro_billing_form.template.php