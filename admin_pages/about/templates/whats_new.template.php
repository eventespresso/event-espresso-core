<div class="changelog point-releases">
	<!--<h3><?php echo _n( 'Minor Release Information', 'Minor Releases', 1 ); ?></h3>
	<p>4.2.1 blah...blah...blah</p>-->
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
	<h2 class="about-headline-callout">Two New Major Features Added</h2>
	<h3>Support for Mijireh Checkout</h3>
	<img class="alignright " alt="mijireh-checkout-large" src="http://ee-screenshots.s3.amazonaws.com/ee4/mijireh-checkout-large.png" width="131" height="147" /><p>Announcing the ability to integrate Event Espresso with <strong>over 90 different gateways and payment providers</strong>, using the Mijireh Checkout system! <a href="http://www.mijireh.com/" target="_blank">Mijireh Checkout</a> is a PCI compliant checkout page that looks exactly like your site, with support for over 90 gateways and payment providers to use on Mijireh's <a href="http://www.mijireh.com/docs/payment-gateways/" target="_blank">secure PCI compliant servers</a>.</p>
	<p>Mijireh Checkout helps increase your conversion rates by using your existing website design. Your checkout process remains seamless to your customers while Mijireh Checkout securely handles collecting and transmitting of the credit card data for you.</p>
	<h3>Support for the Calendar Add-on in EE 4.2+</h3>
	<a href="http://ee-screenshots.s3.amazonaws.com/ee4/ee4-calendar-3-0.jpg"><img class="alignright" alt="calendar-large" src="http://ee-screenshots.s3.amazonaws.com/ee4/ee4-calendar-3-0.jpg" width="206" height="282" /></a>
	<p>The calendar add-on for EE 4.2 is now available for purchase on the <a target="_blank" href="http://eventespresso.com">Event Espresso</a> website. The events calendar allows you to display your events in a way that your attendees/registrants are familiar with. It is another way for customers to find your events and even allows you to invite your attendees/registrants to add the events to their own calendars.</p>
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
	<h2 class="about-headline-callout">Additional Features &amp; Enhancements in EE 4.2</h2>
	<p>In addition to better out of the box support for themes and plugins, we have added an array of new features such as drag and drop ordering of tickets in the event editor, ordering of questions within question groups, datetime names and descriptions, and the option to turn off the ticket selector in the event details page, and much more:</p>
	<ul>
		<li>Added support for Mijireh Checkout</li>
		<li>Added support for the Calendar add-on</li>
		<li>Added drag and drop ordering of tickets in the event editor</li>
		<li>Order Questions by Question Group (replaces ordering questions by question order)</li>
		<li>Added option to turn ff the Ticket Selector in the Event Details page for events without tickets/registrations</li>
		<li>Ability to add/Edit Event Datetime Names</li>
		<li>Ability to add/Edit Event Datetime Descriptions</li>
		<li>Added Event Datetime Name messages shortcode</li>
		<li>Event Datetime Description messages shortcode</li>
		<li>Added datetime titles and descriptions to the order confirmation</li>
		<li>Added front-end "Maintenance Mode" option</li>
		<li>Added "Register Now" or "View Details" button in the event list when the Ticket Selector is turned off</li>
	</ul>
	<hr>
	<h2 class="about-headline-callout">New Hooks, Filters, and Stuff for Developers</h2>
	<p>Here are a few more of the new features and cool stuff for developers available in 4.2 and we'd like to invite you to take a look and offer feedback (praises, report bugs, etc.):</p>
	<ul>
		<li>Hook/Filter to Set No-cost events as "Free"</li>
		<li>Add filter so the email messenger CSS file can be swapped out by developers for another CSS file</li>
		<li>Added a hook in the Admin panel after each ticket row description</li>
		<li>Added a hook in the Admin panel after each ticket create and update model</li>
		<li>Added hook in the Front-end after each ticket date on a single event</li>
		<li>Made Single Page Check Out (SPCO) button text filterable</li>
		<li>Models make acceptance of empty strings more consistent</li>
		<li>Simplified the EE_System Constructor and Hook point's to allow for external module/add-on/plugin development</li>
		<li>EEH_Template::locate_template() to accept full paths as well as relatives paths (from plugin root)</li>
		<li>Filter for adding caffeinated modules to EE_Config $modules_to_register array</li>
		<li>Make Single Page Check Out (SPCO) button text filterable</li>
	</ul>
	<hr>