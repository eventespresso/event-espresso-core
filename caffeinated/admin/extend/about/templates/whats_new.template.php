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
	<h3><a href="http://eventespresso.com/product/eea-multi-event-registration/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">Multiple Event Registration Add-on Released for Event Espresso 4.7</a></h3>
	<a href="http://eventespresso.com/product/eea-multi-event-registration/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank"><img class="alignright " alt="Multi Event Registration" src="http://ee-screenshots.s3.amazonaws.com/ee4/mutliple-event-registration.jpg" width="260" height="202" /></a>
	<p>Announcing the ability to allow attendees to register for multiple events during a single checkout! <strong><a href="http://eventespresso.com/2015/06/multiple-event-registration-now-available-for-event-espresso-4/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">Read the announcement.</a></strong></p>
	<p>With the <a href="http://eventespresso.com/product/eea-multi-event-registration/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">Multiple Event Registration add-on</a>, attendees can <strong>register for several events at once</strong> and even add additional attendees to any of the same events–in the same checkout process. Additional attendees also get the customized registration form as the first/primary attendee.</p>
	<h4>How does it work?</h4>
	<p>The Event Registration Cart gives the person registering the ability to select the type and quantity of tickets and update the cart total. Proceeding to the Checkout allows the person to then complete the registration form for each of the tickets and events (all on the same page). The Checkout also allows the person registering to reuse the personal information input into prior registration forms into subsequent event forms.</p>
	<p><strong>Get Started!</strong><br>
	Purchase the <a href="http://eventespresso.com/product/eea-people-addon/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">Multiple Event Registration add-on</a> add-on for Event Espresso 4.</p>


	<h3><a href="http://eventespresso.com/product/eea-people-addon/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">EE4 People Add-on</a></h3>
	<a href="http://eventespresso.com/product/eea-people-addon/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank"><img class="alignright " alt="People Add-on" src="http://ee-screenshots.s3.amazonaws.com/ee4/people-addon1-380x250.jpg" width="260" height="202" /></a>
	<p>The <a href="http://eventespresso.com/product/eea-people-addon/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">Event Espresso People add-on</a> creates an interface for managing staff, instructors, speakers, volunteers, sponsors, or just about any type of role someone might fill within an event and/or organization.</p>	
	<h4>How does it work?</h4>
	<p>The People add-on creates a new interface within the Event Espresso 4 admin for managing people associated with an organization and/or event. People can be organized by type (eg. as staff (default), volunteer, speaker, sponsor, etc.) and categories.</p>
	<p><strong>Get Started!</strong><br>
	Purchase the <a href="http://eventespresso.com/product/ee4-multiple-event-registration-add-on/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">People add-on</a> add-on for Event Espresso 4.</p>
	

	<h3><a href="http://eventespresso.com/product/eea-wp-user-integration/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">EE4 WP User Integration</a></h3>
	<a href="http://eventespresso.com/product/eea-people-addon/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank"><img class="alignright " alt="People Add-on" src="http://ee-screenshots.s3.amazonaws.com/ee4/ee4-wp-user-integration-300x197.jpg" width="260" height="202" /></a>
	<p>The <a href="http://eventespresso.com/product/eea-wp-user-integration/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">EE4 WP User Integration add-on</a> allows you to take full advantage of the WordPress user system. Create member only events and tickets, set the minimum WP User Capability for ticket purchase, create new users on registration, and more!</p>
	<h4>How does it work?</h4>
	<p>You’ll be able to display member only tickets to your logged-in members; members can store personal information into the WordPress database allowing your members to quickly register for events by auto-filling in the personal information on the event registration form.</p>
	<p><strong>Get Started!</strong><br>
	Purchase the <a href="http://eventespresso.com/product/eea-wp-user-integration/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=link&ap_id=EEspresso" target="_blank">WP User Integration</a> add-on for Event Espresso 4.</p>


		<hr>
	
	<h2 class="about-headline-callout">Updates &amp; Fixes in EE 4.7</h2>
	<p>This release brought a few improvements to existing core features and support for a new add-on.</p>
	<p><strong>New Features</strong></p>
		<ul>
			<li>Added support for the Multi Event Registration add-on</li>
		</ul>
	<p><strong>Enhancements/Fixes</strong></p>
		<ul>
			<li>Less memory intensive data migrations between versions</li>
			<li>Fixed the Payment/Refund Modal (in the admin) not refreshing on save</li>
			<li>Venues can now be trashed and restored like other EE objects</li>
			<li>Restored the dropdown question type description field</li>
			<li>Only allow question type changes to a question type of the same category</li>
		</ul>


	<hr>

