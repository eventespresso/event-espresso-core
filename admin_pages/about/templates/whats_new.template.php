<div class="changelog point-releases">
	<!-- <h3><?php echo _n( 'Minor Release Information', 'Minor Releases', 1 ); ?></h3>-->
	<h3><?php echo _n( 'Major Release Information', 'Major Releases', 1 ); ?></h3>
	<?php //$type = 'minor'; ?>
	<?php $type = 'major'; ?>
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
	<?php 
	/*
	<h2 class="about-headline-callout">New Add-on Available</h2>
	<h3>Mailchimp Add-on Released</h3>
	<img class="alignright " alt="mijireh-checkout-large" src="http://ee-screenshots.s3.amazonaws.com/ee4/mijireh-checkout-large.png" width="131" height="147" /><p>Announcing the ability to integrate Event Espresso with <strong>over 90 different gateways and payment providers</strong>, using the Mijireh Checkout system! <a href="http://www.mijireh.com/" target="_blank">Mijireh Checkout</a> is a PCI compliant checkout page that looks exactly like your site, with support for over 90 gateways and payment providers to use on Mijireh's <a href="http://www.mijireh.com/docs/payment-gateways/" target="_blank">secure PCI compliant servers</a>.</p>
	<p>Mijireh Checkout helps increase your conversion rates by using your existing website design. Your checkout process remains seamless to your customers while Mijireh Checkout securely handles collecting and transmitting of the credit card data for you.</p>
	<h3>Support for the Calendar Add-on in EE 4.2+</h3>
	<a class="thickbox" href="http://ee-screenshots.s3.amazonaws.com/ee4/ee4-calendar-3-0-01.jpg"><img class="alignright size-medium wp-image-132" alt="ee4-calendar-3-0-01" src="http://ee-screenshots.s3.amazonaws.com/ee4/ee4-calendar-3-0-01.jpg" width="265" height="300" /></a>
	<p>The calendar add-on for EE 4.2 is now available for purchase on the <a target="_blank" href="http://eventespresso.com/product/ee4-events-calendar/">Event Espresso</a> website. The events calendar allows you to display your events in a way that your attendees/registrants are familiar with. It is another way for customers to find your events and even allows you to invite your attendees/registrants to add the events to their own calendars.</p>
	<p>The EE4 Calendar add-on includes:</p>
	<ul>
		<li>Inline calendar images</li>
		<li>Category filtering</li>
		<li>Venue filtering</li>
		<li>Featured images</li>
		<li>Datetime and format settings</li>
		<li>Tooltips</li>
		<li>Color coded categories</li>
		<li>Better compatibility with themes</li>
		<li>and much more</li>
	</ul>
	<hr>
	*/
	?>
	<h2 class="about-headline-callout">Updates &amp; Fixes in EE 4.3</h2>
	<p>Many of the changes in this version have been related to fixing the EE4 core features, and much more:</p>
	<ul>
		<li>Added support for "Ticket Bundles"<br />
			<ul>
				<li><a href="http://eventespresso.com/wiki/set-graduated-ticket-pricing/" target="_blank">How to set graduated ticket pricing</a></li>
				<li><a href="http://eventespresso.com/wiki/create-ticket-bundle/" target="_blank">How to create a ticket bundle</a></li>				
			</ul>
		</li>
		<li>Messages System Changes/Fixes<br />
			<ul>
				<li>Messages Admin - Updated to implement a new Custom Template creation/edit process</li>
				<li>Event Editor - Modify Messages metabox in event editor to use new custom template system</li>
				<li>Messages System - Default 'From' Email shortcode changed to [CO_FORMATTED_EMAIL]</li>
			</ul>
		</li>
		<li>Advanced Custom Fields Integration<br />
			<ul>
				<li><a href="http://eventespresso.com/?p=96627" target="_blank">Developers Corner: Using Advanced Custom Fields to Quickly Extend EE4</a></li>
				<li><a href="http://eventespresso.com/?post_type=wpwtds_article&p=96889" target="_blank">Add a Course Curriculum Section to the "Thank You" Page Using Advanced Custom Fields</a></li>
				<li><a href="http://eventespresso.com/?post_type=wpwtds_article&p=96892" target="_blank">Add a Sponsors Section to Events Using Advanced Custom Fields</a></li>
				<li><a href="http://eventespresso.com/?post_type=wpwtds_article&p=96650" target="_blank">EE4 "Thank You" Page Actions & Filters</a></li>
				<li><a href="http://eventespresso.com/?post_type=wpwtds_article&p=96904" target="_blank">EE4 "Single Page Checkout" Page Actions & Filters</a></li>	
			</ul>
		</li>
		<li>Payment Gateway Fixes<br />
			<ul>
				<li>Better support for delayed/laggy off-site gateway responses</li>
				<li>Restored the download invoice link in the payment overview page</li>
				<li>Show failed payments in payment response</li>
				<li>Added support for partial payments in Single Page Checkout</li>
				<li>Send address fields to Mijireh</li>
			</ul>
		</li>
		<li>iCal Integration</li>
		<li>Added logic to event templates so the single event content can be marked up differently than the event archive</li>
		<li>Fixed migration issues</li>
	</ul>
	<hr>
	<?php 
	/*<h2 class="about-headline-callout">New Hooks, Filters, and Stuff for Developers</h2>
	<p>Here are a few more of the new features and cool stuff for developers available in 4.3:</p>
	<ul>
		<li></li>
	</ul>
	<hr> */ 
	?>
