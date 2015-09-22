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
		<?php printf( __( 'For more information, see <a href="%s">the release notes</a>.' ), 'http://eventespresso.com/wiki/ee4-changelog/#' . $ver ); ?>
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
	
	<h2 class="about-headline-callout">New Add-ons Available!</h2>
	<h3><a href="http://eventespresso.com/product/eea-promotions/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=promotions_addon_link&ap_id=EEspresso" target="_blank">Promotions & Discounts Add-on Released for Event Espresso 4.8</a></h3>
	<a href="http://eventespresso.com/product/eea-promotions/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=promtions_addon_link&ap_id=EEspresso" target="_blank"><img class="alignright " alt="Promotions Add-on" src="http://ee-screenshots.s3.amazonaws.com/ee4/promotions-discounts-addon.jpg" width="260" height="202" /></a>
	<p>Announcing the ability to allow discounts and promotion codes for your events! <strong><a href="http://eventespresso.com/2015/08/promotions-discounts-now-available-for-event-espresso-4/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=promotions_addon_link&ap_id=EEspresso" target="_blank">Read the announcement.</a></strong></p>
	<p>With the <a href="http://eventespresso.com/product/eea-promotions/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=promotions_addon_link&ap_id=EEspresso" target="_blank">Promotions & Discounts add-on</a>, attendees can <strong>apply coupon codes</strong> and receive automatic and/or date based discounts when registering for events.</p>
	<h4>How does it work?</h4>
	<p><strong>As an event organizer, promotions and and discount codes allow you to:</strong></p>
	<ul>
	<li> - Target and re-target attendees with banners or email campaigns offering <strong>automatic discounts</strong> or giving them <strong>special discounts</strong> with a code</li>
	<li> - Distribute and promote your event through partners (speakers, sponsors, venues, affiliates, etc.) by offering them a <strong>special coupon code</strong> they can share with their audience</li>
	<li> - Track and measure the performance of marketing campaigns and advertising</li>
	<li> - Reward loyal customers by offering them a special discount and incentivize them to attend again</li>
	<li> - Encourage customers to take action now by offering limited quantity or <strong>limited time discounts</strong></li>
	<li> - Test and discover what pricing, distribution, marketing or advertising strategy works best for your audience(s)</li>
	<li> - Offer discounts to different target audiences so that your event is priced perfectly</li>
	</ul>
	....and much more!
	<p><strong>Get Started!</strong><br>
	Purchase the <a href="http://eventespresso.com/product/eea-promotions/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">Promotions & Discounts add-on</a> for Event Espresso 4.</p>


	<h3><a href="http://eventespresso.com/2015/07/event-espresso-4-rest-api-add-on-available/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=rest_api_addon_link&ap_id=EEspresso" target="_blank">REST API Add-on</a></h3>
	<a href="http://eventespresso.com/2015/07/event-espresso-4-rest-api-add-on-available/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=rest_api_addon_link&ap_id=EEspresso" target="_blank"><img class="alignright " alt="REST API Add-on" src="http://ee-screenshots.s3.amazonaws.com/ee4/rest-api.jpg" width="260" height="202" /></a>
	<p>WordPress and Event Espresso Developers will be most interested in the <a href="http://eventespresso.com/2015/07/event-espresso-4-rest-api-add-on-available/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=rest_api_addon_link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">REST API add-on</a>, because it will allow for faster development of a wide array of features, including custom reporting tools, mobile application development, and theme development.</p>
	<h4>How does it work?</h4>
	<p>The Event Espresso 4 REST API will provide an easy to use API, available via HTTP, to grab your site's event and registration data in simple JSON format. Retrieving or updating data is as simple as sending a HTTP request.</p>
	<p><strong>Get Started!</strong><br>
	Download the REST API from <a href="http://eventespresso.com/rest-api/" target="_blank">Github.com</a>.</p>


		<hr>
	
	<h2 class="about-headline-callout">Updates &amp; Fixes in EE 4.8</h2>
	<p>This release brought many background updates/improvements to existing core features, and support for a new add-on. Here are the most interesting updates:</p>
	<p><strong>New Features</strong></p>
		<ul>
			<li> - Added support for the Promotions & Discounts add-on</li>
		</ul>
	<p><strong>Enhancements/Fixes</strong></p>
		<ul>
			<li> - Localized the Date Picker in the Ticket Editor</li>
			<li> - Datetime Refactor (<a href="http://developer.eventespresso.com/important-changes-to-ee-datetime-system-coming-to-ee/">read more</a>)</li>
			<li> - Added an anchor to the registration form. This takes the registrant right to the registration form, rather than the top of the page, after selecting tickets.</li>
		</ul>


	<hr>

