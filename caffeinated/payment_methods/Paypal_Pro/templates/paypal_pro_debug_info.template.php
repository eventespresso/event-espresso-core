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
 * @var $form_section EE_Billing_Attendee_Info_Form
 */
?><div class="sandbox-panel">
					<h2 class="section-title"><?php _e('PayPal Sandbox Mode', 'event_espresso'); ?></h2>
					<h3 style="color:#ff0000;"><?php _e('Debug Mode Is Turned On. Payments will not be processed', 'event_espresso'); ?></h3>

					<p class="test-credit-cards-info-pg" style="margin-bottom:0;">
						<strong><?php _e('Testing Guidelines', 'event_espresso'); ?></strong>
					</p>
					<ul style="margin:1em 2em 1.5em; line-height:1.2em;">
						<li><?php _e('While testing, use the credit card number associated with your sandbox account.', 'event_espresso'); ?></li>
						<li><?php printf(
							__('To find the sandbox account\'s credit card, go to %1$s, then "Dashboard", then under Sandbox click "Accounts", then click your account and click "Profile", then in the popup that appears click on the "Funding" tab. Your testing card is listed there.', 'event_espresso'),
							'<a href="http://developer.paypal.com">developer.paypal.com</a>'); ?></li>
						<li><?php printf(__('CVV2 should be 115 (see %s PayPal\'s documentation for other special codes %s)', 'event_espresso'),'<a href="https://cms.paypal.com/ca/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_testing_SBTestErrorConditions#id108HH0RJ0TS" target="_blank">','</a>'); ?></li>
					</ul>

					<p class="test-credit-cards-info-pg">
						<strong><?php _e('Credit Card Numbers Used for Testing', 'event_espresso'); ?></strong><br/>
						<span class="small-text"><?php _e('Use the following credit card numbers for testing. Any other card number produces a general failure.', 'event_espresso'); ?></span>
					</p>

					<div class="tbl-wrap">
						<table id="paypal-test-credit-cards" class="test-credit-card-data-tbl">
							<thead>
								<tr>
									<td style="width:40%;"><?php _e('Test Card Type', 'event_espresso'); ?></td>
									<td><?php _e('Test Card Numbers', 'event_espresso'); ?></td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><?php _e('Visa (our Event Espresso Sandbox Account\'s testing card)', 'event_espresso'); ?></td>
									<td>4127143344648082</td>
								</tr>
							</tbody>
						</table>
					</div><br/>

					<p class="test-credit-cards-info-pg">
						<strong><?php _e('Testing Result Code Responses', 'event_espresso'); ?></strong><br/>
						<span class="small-text"><?php printf(__('You can use the amount of the transaction to generate a particular result code (see %s PayPal\'s documentation%s). The table below lists the general guidelines for specifying amounts. IMPORTANT: before you attempt any of these, ensure your sandbox PayPal account has %s "Negative Testing" set to on%s. Also be aware that you can generate AVS errors by using certain strings in your address field, and CVV errors using certain CVV values. See %s this PayPal doc %s', 'event_espresso'),"<a href='https://developer.paypal.com/docs/classic/api/errorcodes/#id09C3GA00GR1' target='_blank'>","</a>", "<a href='https://docs.google.com/a/eventespresso.com/file/d/0B5P8GXTvZgfMNXNkZ2s5VUlHTUk/edit?usp=drivesdk' target='_blank'>","</a>","<a href='https://cms.paypal.com/ca/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_testing_SBTestErrorConditions' target='_blank'>","</a>"); ?></span>
					</p>

					<div class="tbl-wrap">
						<table id="paypal-test-credit-cards" class="test-credit-card-data-tbl">
							<thead>
								<tr>
									<td style="width:30%;"><?php _e('Amount', 'event_espresso'); ?></td>
									<td><?php _e('Response', 'event_espresso'); ?></td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>$0 - $103.99</td>
									<td><?php _e('Approved', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$104.00</td>
									<td><?php _e('Invalid amount', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$104.02</td>
									<td><?php _e('Invalid transaction type', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$104.05</td>
									<td><?php _e('Field format error', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$105.02</td>
									<td><?php _e('Invalid expiry date', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$105.04</td>
									<td><?php _e('CVV2 Mismatch', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$105.06</td>
									<td><?php _e('Declined', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$105.22</td>
									<td><?php _e('Invalid account number', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$105.36</td>
									<td><?php _e('Invalid account number', 'event_espresso'); ?></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div><?php
// End of file paypal_pro_billing_form.template.php