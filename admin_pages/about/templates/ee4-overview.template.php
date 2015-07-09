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

	<h2 class="about-headline-callout"><?php _e('Welcome to the Decaf (free) Version of Event Espresso 4!', 'event_espresso'); ?></h2>
	<p>Manage your events from your WordPress dashboard. Reduce your admin, reduce your costs, make your life easier!</p>
	<p>Event Espresso is a <a href="http://eventespresso.com/?utm_source=wordpress_org&amp;utm_medium=link&amp;utm_campaign=plugin_description_tab&amp;utm_content=EE4+Decaf" rel="nofollow">WordPress event manager</a> which makes it easy for you to register attendees for classes, workshops, events, trainings, conferences or concerts, all from your WordPress website. Event Espresso events are created from the WordPress admin area. You can create signup forms to collect information about your attendees, accept payments, and create reports. The lite version of the plugin provides everything that you need to manage your event using WordPress.</p>
	<div class="feature-section col three-col about-updates">
		<div class="col-1">
			<img src="<?php echo EE_GLOBAL_ASSETS_URL; ?>images/screenshots/publish_meta_box.jpg">
			<h3><?php  _e('Optimized aesthetic', 'event_espresso'); ?></h3>
			<p><?php  _e('The Event Espresso 4 dashboard has a fresh, uncluttered design that embraces clarity and simplicity.', 'event_espresso'); ?></p>
		</div>
		<div class="col-2">
			<img src="<?php echo EE_GLOBAL_ASSETS_URL; ?>images/screenshots/registrations-overview.jpg">
			<h3><?php  _e('Integrated management', 'event_espresso'); ?></h3>
			<p><?php  _e('We’ve made it easier to know who your customers are and how they’ve done business with you over time.', 'event_espresso'); ?></p>
		</div>
		<div class="col-3 last-feature">
			<img src="<?php echo EE_GLOBAL_ASSETS_URL; ?>images/screenshots/refined-bookkeeping.jpg">
			<h3><?php _e('Easy bookkeeping', 'event_espresso'); ?></h3>
			<p><?php _e('Registrations, payment, and transactions have been substantially improved in Event Espresso 4.', 'event_espresso'); ?></p>
		</div>
	</div>

</div>
<hr>

<div class="changelog">
	<div class="feature-section col two-col">
		<div>
			<h3><?php  _e('Higher customer retention', 'event_espresso'); ?></h3>
			<p><?php  _e('The Event Espresso 4 registration process is faster than ever. With quick ticket selections, single page check-out, and customizable notifications! Registration that can scale to your business needs.', 'event_espresso'); ?></p>
			<h4><?php  _e('Ticket selection boxes on any post page or post', 'event_espresso'); ?></h4>
			<p><?php  _e('Customers can easily register for classes, events, or conferences, in just a few simple steps. No matter how you use it, Event Espresso 4 will adapt to a multitude of different ticketing and pricing scenarios.', 'event_espresso'); ?></p>
		</div>
		<div class="last-feature about-colors-img">
			<img src="<?php echo EE_GLOBAL_ASSETS_URL; ?>images/screenshots/registrtation-page-large.jpg">
		</div>
	</div>
</div>


<div class="changelog">
	<div class="feature-section col two-col">
		<div>
			<h3><?php _e('Refined event management', 'event_espresso'); ?></h3>
			<p><?php _e('The new event management screen lets you survey your events at a glance. Want more information? Click to view more. Quickly add/edit prices, dates, or information in any event.', 'event_espresso'); ?></p>
			<h4><?php _e('Smoother price types, taxes, and price modifiers', 'event_espresso'); ?></h4>
			<p><?php _e('Price Types allow you to create new prices that adjust the default ticket (base) price for your system-default ticket', 'event_espresso'); ?>.</p>
			<p><?php _e('Easily categorize a price modifier and indicate how that price gets applied to the running total when a transaction occurs.', 'event_espresso'); ?></p>
		</div>
		<div class="last-feature about-themes-img">
			<img src="<?php echo EE_GLOBAL_ASSETS_URL; ?>images/screenshots/event-management.jpg">
		</div>
	</div>
</div>
<br />
<hr>

<div class="changelog about-event-espresso">
	<h2 class="about-headline-callout"><?php _e('Espresso Arabica 2014, a child theme for events', 'event_espresso'); ?></h2>
	<div class="feature-section col one-col">
		<div>
			<h3><?php _e('Turn your blog into a complete event registration and management system', 'event_espresso'); ?></h3>
			<p><?php _e('Create a beautiful event page with ticket selection, venue details, and an integrated single page checkout system. With WordPress, Event Espresso, and Espresso Arabica 2014 (based on the "Twenty Fourteen" theme by WordPress), your events will certainly sell out faster than ever!', 'event_espresso'); ?></p>
			<p><?php _e('With a striking design that does not compromise the simplicity of WordPress and Event Espresso 4, Espresso Arabica 2014 will be the best event theme on the market.', 'event_espresso'); ?></p>
			<p><?php echo sprintf( __('%sLearn more >>%s', 'event_espresso'), '<a href="http://eventespresso.com/wiki/setup-event-espresso-arabica-theme/">', '</a>' ); ?></p>
		</div>
	</div>
	<img src="<?php echo EE_GLOBAL_ASSETS_URL; ?>images/screenshots/single-event-page.jpg">


</div>
<hr>

<h3><?php _e('Pick a theme, any theme', 'event_espresso'); ?></h3>
	<p><?php  _e('We’ve made it super easy to integrate Event Espresso with almost any properly coded WordPress theme, including many of the thousands of themes available on WordPress.org.', 'event_espresso'); ?></p>
	<p><img class="about-overview-img" src="<?php echo EE_GLOBAL_ASSETS_URL; ?>images/screenshots/multiple-themes.jpg" /></p>
<hr>

