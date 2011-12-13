<div style="display: none;">
	<?php
		/**
		 * Relay Response
		 */
	?>
	<div id="transaction_key_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
			<?php _e('Authorize.net Transaction Key', 'event_espresso'); ?>
		</h2>
		<p><?php _e('The Transaction Key is  a 16-character alphanumeric value that is randomly generated in the  Merchant Interface and is used for authentication when submitting  transaction requests from your Web site.', 'event_espresso'); ?></p>
		<p><?php _e('To generate a Transaction Key for your account:', 'event_espresso'); ?></p>
		<ol>
			<li><?php _e('Log into the Merchant Interface at', 'event_espresso'); ?> <a href="https://account.authorize.net/" target="_blank">https://account.authorize.net/</a>.</li>
			<li><?php _e('Click Account from the main toolbar.', 'event_espresso'); ?></li>
			<li><?php _e('Click Settings in the main menu on the left.', 'event_espresso'); ?></li>
			<li><?php _e('Click API Login ID and Transaction Key in the Security Settings section.', 'event_espresso'); ?></li>
			<li><?php _e('If an API login ID has already been generated, it is visible on this  page. If an API Login ID needs to be generated, you can enter the answer  to your Secret Question in order to generate an API Login ID and  Transaction Key.', 'event_espresso'); ?></li>
		</ol>
<p><?php _e('IMPORTANT: The Transaction Key will not be visible at any other time in  the Merchant Interface. You must record it temporarily or copy and paste  it to a secure file location immediately. Like the API Login ID, the  Transaction Key is sensitive account information and should only be  shared on a need-to-know basis, for example with your Web developer for  the purposes of integration with the payment gateway. Upon activating a new Transaction Key, all other keys will be disabled after 24 hours.', 'event_espresso'); ?></p>
		</div>
	</div>
	
	<?php
		/**
		 * Relay Response
		 */
	?>
	<div id="relay_response" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
			<?php _e('Relay Response', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('This shows the specific the URL to which the gateway should return the relay response for a transaction. This the page should be set in your Authorize.net account. Login to Authorize.net, goto Account > Response/Receipt URLs > Add URL and enter the following URL.', 'event_espresso'); ?>
		</p>
		<p><strong>
				<?php _e('Relay Response URL:', 'event_espresso'); ?>
			</strong> <?php echo home_url() . '/?page_id=' . $org_options['notify_url'] ?><br />
			<span style="color:red;">
				<?php _e('Note:', 'event_espresso'); ?>
			</span>
			<?php _e('This URL can be changed in the "Organization Settings" page.', 'event_espresso'); ?>
		</p>
		<p>
			<?php _e('For complete information on configuring relay response, please refer to', 'event_espresso'); ?>
			<a href="https://account.authorize.net/help/Merchant_Interface_RoboHelp_Project.htm#Miscellaneous/Reference.htm%3E%3Epan=2">
				<?php _e('Reference &amp; User Guides', 'event_espresso'); ?>
			</a>.</p>
		</div>
	</div>
	<?php
		/**
		 * Button Image URL
		 */
	?>
	<div id="authnet_button_url_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
			<?php _e('Button Image URL', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso'); ?>
		</p>
		<p><strong>
				<?php _e('Current button image:', 'event_espresso'); ?>
			</strong></p>
		<p><?php echo '<img src="' . $payment_settings['authnet_sim']['button_url'] . '" />'; ?></p>
		</div>
	</div>
	<?php
		/**
		 * Authorize.net SIM Image URL
		 */
	?>
	<div id="authnet_image_url_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
			<?php _e('Authorize.net SIM Image URL (logo for payment page)', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('The URL of the image displayed as your logo in the header of the Authorize.net checkout pages.', 'event_espresso'); ?>
		</p>
		<p><strong>
				<?php _e('Current logo image:', 'event_espresso'); ?>
			</strong></p>
		<p><?php echo '<img src="' . $payment_settings['authnet_sim']['image_url'] . '" />'; ?></p>
			
		</div>
	</div>
	<?php
		/**
		 * Authorize.net Development Server
		 */
	?>
	<div id="authnet_sandbox" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
			<?php _e('Authorize.net Development Server', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('Authorize.net maintains a development environment for testing your gateway. You may use this to test your setup without having a live account. You will need to sign up for a free account on the development server here: '); ?>
			<a href="https://developer.authorize.net/testaccount/">https://developer.authorize.net/testaccount/</a>
			<?php _e('Transactions that are submitted to the development server are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?>
		</p>
		<p><strong>
				<?php _e('Example Card Numbers:', 'event_espresso'); ?>
			</strong></p>
		<p>370000000000002 (
			<?php _e('American Express', 'event_espresso'); ?>
			)<br />
			6011000000000012 (
			<?php _e('Discover', 'event_espresso'); ?>
			)<br />
			5424000000000015 (
			<?php _e('Master Card', 'event_espresso'); ?>
			)<br />
			4007000000027 (
			<?php _e('Visa', 'event_espresso'); ?>
			)</p>
		</div>
	</div>
	
	<?php
		/**
		 * Authorize.net SIM Image URL
		 */
	?>
	<div id="authnet_test_transactions" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
			<?php _e('Authorize.net Test Transactions', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('Transactions that are submitted as test transactions are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?>
		</p>
		<p><strong>
				<?php _e('Example Card Numbers:', 'event_espresso'); ?>
			</strong></p>
		<p>370000000000002 (
			<?php _e('American Express', 'event_espresso'); ?>
			)<br />
			6011000000000012 (
			<?php _e('Discover', 'event_espresso'); ?>
			)<br />
			5424000000000015 (
			<?php _e('Master Card', 'event_espresso'); ?>
			)<br />
			4007000000027 (
			<?php _e('Visa', 'event_espresso'); ?>
			)</p>
		</div>
	</div>

</div>
