<div class="changelog point-releases">
	<h3><?php echo _n( 'Minor Release Information', 'Minor Releases', 1 ); ?></h3>
	<!-- <h3><?php echo _n( 'Major Release Information', 'Major Releases', 1 ); ?></h3>-->
	<?php $type = 'minor'; ?>
	<?php //$type = 'major'; ?>
	<p><?php printf( __( '<strong>Version %1$s</strong> is a %2$s bug fix/enhancement release.', 'event_espresso'), EVENT_ESPRESSO_VERSION, $type ); ?>
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
	
	
	<h2 class="about-headline-callout">Initial EE4 Decaf (free) Release</h2>
	<p>This is the inital release of EE4 Decaf. This is the free version of our very powerful event registration and management plugin for WordPress.</p>
	
	<hr>
	
	
	<h2 class="about-headline-callout">Updates &amp; Fixes in EE 4.3</h2>
	<p>This release brings many improvements to existing core features and a few new features, such as duplicate events, iCal integration, batch email/newsletter system, and registration form optimizations.</p>
<p><strong>New Features</strong></p>
<ul>
	<li>Duplicate Event (Caffeinated Only)</li>
	<li>Ticket Required Option (Caffeinated Only)</li>
	<li>Added iCal Integration</li>
	<li>Drag-n-drop Answer Values (Caffeinated Only)</li>
	<li>Order Questions by Question Group (Caffeinated Only)</li>
	<li>Question Editor Style Changes (Caffeinated Only)</li>
	<li>Re-order Datetimes in Ticket Editor and Single Page Checkout (Caffeinated Only)</li>
	<li>Moved the Ticket Selector Above the Event Dates and Description</li>
	<li>New Hooks and Filters for Developers Added to the Registration Process</li>
</ul>
<strong>Fixes</strong>
<ul>
	<li>Gateways</li>
	<li>Messages System</li>
	<li>Migration Issues</li>
	<li>Miscellaneous Spelling Errors</li>
</ul>

<p><a href="http://ee-screenshots.s3.amazonaws.com/2014/05/ticket-bundles.png"><strong>Support for “Ticket Bundles” &amp; “Graduated Pricing”</strong></a><br>
Ticket bundles allow you to sell ticket packages that include several tickets to the same event or multiple different events.</p>
<ul>
	<li><a href="http://eventespresso.com/wiki/create-ticket-bundle/" target="_blank">Ticket Bundles</a>
Starting with Event Espresso 4.3 you can offer discount pricing based on ticket quantities. <a href="http://eventespresso.com/wiki/create-ticket-bundle/" target="_blank">This article</a> shows how to create a ticket bundle where you can set a lower price per ticket when purchased in a bundle.</li>
	<li><a href="http://eventespresso.com/wiki/set-graduated-ticket-pricing/" target="_blank">Graduated Ticket Pricing</a>
Starting with Event Espresso 4.3 you can offer graduated pricing based on ticket quantities. <a href="http://eventespresso.com/wiki/set-graduated-ticket-pricing/" target="_blank">This article</a> shows how to set graduated ticket pricing where you can set a lower price per ticket for larger quantity ticket purchases.</li>
</ul>
<p><strong>Messages System Changes/Fixes</strong><br />
	We’ve improved the Custom Template System, added a “Newsletter” Message Type for sending batch emails, and made a couple of minor updates.</p>
<ul>
<li>Messages Admin – Updated to implement a new Custom Template creation/edit process</li>
<li>Event Editor – Modify Messages metabox in event editor to use new custom template system</li>
<li>Messages System – Default ‘From’ Email shortcode changed to [CO_FORMATTED_EMAIL]</li>
<li>Message Type – Newsletter message type</li>
</ul>
<p><a href="http://eventespresso.com/wp-content/uploads/2014/05/acf-home-panel-fields.png"><strong>Advanced Custom Fields Integration</strong></a><br>
Fully customize WordPress edit screens with powerful custom fields.</p>
<ul>
<li><a href="http://eventespresso.com/2014/05/developers-corner-using-advanced-custom-fields-extend-ee4/" target="_blank">Developers Corner: Using Advanced Custom Fields to Quickly Extend EE4</a></li>
<li><a href="http://eventespresso.com/wiki/add-course-curriculum-events-using-advanced-custom-fields/" target="_blank">Add a Course Curriculum Section to the “Thank You” Page Using Advanced Custom Fields</a></li>
<li><a href="http://eventespresso.com/wiki/add-sponsors-section-events-using-advanced-custom-fields/" target="_blank">Add a Sponsors Section to Events Using Advanced Custom Fields</a></li>
<li><a href="http://eventespresso.com/wiki/ee4-thank-page-actions-filters-hooks/" target="_blank">EE4 “Thank You” Page Actions &amp; Filters</a></li>
<li><a href="http://eventespresso.com/wiki/ee4-single-page-checkout-page-actions-filters/" target="_blank">EE4 “Single Page Checkout” Page Actions &amp; Filters</a></li>
</ul>
<p><strong>Payment Gateway Fixes</strong></p>
<ul>
<li>Thank You page now uses the WordPress Heartbeat API to automatically display payment status updates</li>
<li>Show failed payments in payment response</li>
<li>Fix for Single Page Checkout so it displays the correct amount owed based on when a payment has already been entered into the system</li>
<li>Send address fields to Mijireh</li>
</ul>

	<hr>

