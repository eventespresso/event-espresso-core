<div class="changelog point-releases">
	<!-- <h3><?php echo _n( 'Minor Release Information', 'Minor Releases', 1 ); ?></h3> -->
	<h3><?php echo _n( 'Major Release Information', 'Major Releases', 1 ); ?></h3>
	<?php //$type = 'minor'; ?>
	<?php $type = 'major'; ?>
	<p><?php printf( __( '<strong>Version %1$s</strong> is a %2$s release.', 'event_espresso'), EVENT_ESPRESSO_VERSION, $type ); ?>
		<?php
			$ver = explode( '.', EVENT_ESPRESSO_VERSION );
			array_pop( $ver );
			$ver = implode( '.', $ver );
		?>
		<?php printf( __( 'For more information, see <a href="%s" target="_blank">the release notes</a>.' ), 'http://eventespresso.com/wiki/ee4-changelog/#' . $ver ); ?>
 	</p>
</div>

<div class="changelog">
	<?php
	//maintenance mode on?
	if ( EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_2_complete_maintenance ) {
		?>
		<div class="ee-attention">
			<h2 class="ee-maintenance-mode-callout"><?php  _e('Event Espresso is in full maintenance mode.' , 'event_espresso'); ?></h2>
			<p>
			<?php
				printf(
					__('A previous version of Event Espresso has detected. But before anything else can happen, we need to know whether or not to migrate (copy over) your existing event data so that it can be utilized by EE4. For more instructions on what to do, please visit the %sEvent Espresso Maintenance%s page.', 'event_espresso'),
					'<a href="admin.php?page=espresso_maintenance_settings">',
					'</a>'
				);
			?>
			</p>
		</div>
		<?php
	}
	?>
	
	<h2 class="about-headline-callout">Updates &amp; Fixes in EE 4.9</h2>
	<p>This release brought many background updates/improvements to existing core features, and support for many new add-on & features. Here are the most interesting updates:</p>
	<h3>New Features</h3>
		<p><strong>Message Queue System</strong>
			<br>This new system tracks and prioritizes when messages are generated and when they are sent. When messages are triggered, they are no longer generated immediately and sent on the same request. Instead, they enter into the queue and all processing happens on separate requests.</p>
		<p align="right"><a href="https://eventespresso.com/wiki/message-queue-system/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=messages_system_link&ap_id=EEspresso" target="_blank">Read More</a>
		
		<p><strong>New Registration Question Types</strong><br>
		Introduced a few new question types, such as "US phone", "integer", "decimal", "url" and "year" which allow site admins to have validated answers to these types of questions. These new fields add the ability to validate questions based on the type of the question. For instance, site admins can have questions that need to be validated as email addresses or URLs.</p>
		<p align="right"><a href="https://eventespresso.com/2016/04/event-espresso-4-9-beta-now-available/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=rest_api_core_link&ap_id=EEspresso#questions" target="_blank">Read More</a>

		<p><strong>REST API Added to EE4 Core</strong><br>EE4 REST API is a simple but powerful way to interact with Event Espresso. Even though the EE4 REST API is not readily visible to users, over time user’s will experience the benefits of more interactive Event Espresso websites. Once we roll out the WRITE endpoints Mobile, desktop and web applications can get data from Event Espresso and do anything you can do via the admin panel. It’s like the admin panel, minus the user interface (UI).</p>
		<p>The availability of the EE4 REST API as a core feature also means less time spent by developers creating something similar, and more time spent creating features and custom applications.</p>			
		<p align="right"><a href="https://eventespresso.com/2016/01/rest-api-now-in-ee4-core/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=rest_api_core_link&ap_id=EEspresso" target="_blank">Read More</a>
		
	<h3>Enhancements/Fixes</h3>
	<p><strong>Updated Registration and Transaction Reports</strong>
			<br>Switched to using Google Visualization API for our registrations and transaction visualization charts. This opens the door to future reporting features and serves as a great example for add-on developers.</p>
			
		<p><strong>Messages System Refactored</strong>
			<br>The messages system and other core systems were refactored to improve the framework for adding new features and to improve performance. If you are a developer and want more technical overview, click the read more link.</p>
		<p align="right"><a href="http://developer.eventespresso.com/changes-to-the-messages-system-coming-in-ee-4-9/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=messages_system_link&ap_id=EEspresso">Read More</a>

	
		

	
	<hr>

	<h2 class="about-headline-callout">New Add-ons Available!</h2>

	<h3><a href="https://eventespresso.com/product/eea-affiliatewp/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=affiliatewp_addon_link&ap_id=EEspresso" target="_blank">AffiliateWP Add-on Released for Event Espresso</a></h3>
	<a href="https://eventespresso.com/product/eea-affiliatewp/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=affiliatewp_addon_link&ap_id=EEspresso" rel="attachment" target="_blank"><img alt="AffiliateWP Add-on" class="alignright" src="http://ee-screenshots.s3.amazonaws.com/ee4/affiliate-wp-integration-1.jpg" alt="AffiliateWP-Logo" width="260" height="202" /></a>
	<p>Do you want to offer your attendees, customers, or other patrons an incentive to promote your events? Now you can! With our <a href="https://eventespresso.com/product/eea-affiliatewp/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=affiliatewp_addon_link&ap_id=EEspresso" target="_blank">AffiliateWP Integration add-on</a> for EE4, the process is quite simple.</p>
	<p>AffiliateWP is an affiliate plugin for WordPress. With AffiliateWP, your affiliates can promote your products and services, which improves your website's SEO rankings, drives more traffic to your site, and increases sales/revenue. Visit the <a href="http://evts.io/1MEy1My" target="_blank">AffiliateWP website</a> to learn more.</p>
	<p><strong>Get Started!</strong><br>
	Purchase the <a href="https://eventespresso.com/product/eea-affiliatewp/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=affiliatewp_addon_link&ap_id=EEspresso" target="_blank">AffiliateWP Add-on add-on</a> for Event Espresso 4.</p>
	

	<h3><a href="https://eventespresso.com/product/eea-braintree-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=braintree_addon_link&ap_id=EEspresso" target="_blank">Braintree Payment Gateway</a></h3>
	<a href="https://eventespresso.com/product/eea-braintree-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=braintree_addon_link&ap_id=EEspresso" target="_blank"><img class="alignright " alt="Braintree Payment Gateway" src="http://ee-screenshots.s3.amazonaws.com/ee4/braintree-payment-gateway.jpg" width="260" height="202" /></a>
	<p>Braintree is a full stack payment platform that helps merchants accept online payments. Braintree also supports PayPal payments.</p>
	<p><strong>40+ countries, 130 currencies</strong><br>
	And now with the global reach of PayPal. Braintree is your payments platform almost anywhere you do business.</p>
	<p><strong>Instant sign-up</strong><br>
	With instant approval, you can start accepting payments in minutes.</p>	
	<p><strong>Get Started!</strong><br>
	Purchase the <a href="https://eventespresso.com/product/eea-braintree-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=braintree_addon_link&ap_id=EEspresso" target="_blank">Braintree Payment Gateway</a> for Event Espresso 4.</p>


	<h3><a href="https://eventespresso.com/product/eea-payflow-pro-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_payflow_addon_link&ap_id=EEspresso" target="_blank">PayPal Payflow Pro Payment Gateway</a></h3>
	<a href="https://eventespresso.com/product/eea-payflow-pro-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_payflow_addon_link&ap_id=EEspresso" target="_blank"><img class="alignright" alt="PayPal Payflow Pro Payment Gateway" src="http://ee-screenshots.s3.amazonaws.com/ee4/ee4-paypal-payflow-pro-logo-380x2501.jpg" width="260" height="202" /></a>
	<p>PayPal Payflow Pro will let you accept credit or debit cards on-site and is available to merchants in the United States, Canada, Australia, and New Zealand. This means that your registrants/attendees will be able to complete their registrations and pay without ever leaving your site.</p>
	<p>Payflow Pro is different than PayPal Pro as it allows you to use an existing merchant account through another provider (processor). <a href="https://eventespresso.com/product/eea-payflow-pro-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_payflow_addon_link&ap_id=EEspresso" target="_blank">View the full list</a> of supported processors.</p>
	<p>A PayPal Payflow Pro account with PayPal is needed to accept payments via Payflow. Need an account? Call this number to get started: 1-855-456-1338.</p>
	
	<p><strong>Get Started!</strong><br>
	Purchase the <a href="https://eventespresso.com/product/eea-payflow-pro-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_payflow_addon_link&ap_id=EEspresso" target="_blank">PayPal Payflow Pro Payment Gateway</a> for Event Espresso 4.</p>

		<hr>