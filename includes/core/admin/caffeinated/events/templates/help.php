<div id="alt_email_info" style="display:none">
	<h2><?php _e('Alternate Email Address', 'event_espresso'); ?></h2>
	<p><?php _e('If an alternate email address is entered. Admin email notifications wil be sent to this address instead.', 'event_espresso'); ?></p>
</div>

<div style="display: none;">
	<?php
	/**
	 * Pre-existing Emails Help Box
	 */
	?>
	<div id="email_manager_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Pre-existing Emails', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('These emails will override the custom email if a pre-existing email is selected. You must select "Yes" in the "Send custom confirmation emails for this event?" above.', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
	/**
	 * Coupon/Promo Code Help Box
	 */
	global $org_options;
	?>
	<div id="coupon_code_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Coupon/Promo Code', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('This is used to apply discounts to events.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('A coupon or promo code could can be anything you want. For example: Say you have an event that costs', 'event_espresso'); ?>
				<?php echo $org_options['currency_symbol'] ?>200.
				<?php _e('If you supplied a promo like "PROMO50" and entered 50.00 into the "Discount w/Promo Code" field your event will be discounted', 'event_espresso'); ?>
				<?php echo $org_options['currency_symbol'] ?>50.00,
				<?php _e('Bringing the cost of the event to', 'event_espresso'); ?>
				<?php echo $org_options['currency_symbol'] ?>150.</p>
		</div>
	</div>
	<?php
	/**
	 * Event Identifier Help Box
	 */
	?>
	<div id="unique_id_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Event Identifier', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('This should be a unique identifier for the event. Example: "Event1" (without qoutes.)</p><p>The unique ID can also be used in individual pages using the', 'event_espresso'); ?>
				[SINGLEEVENT single_event_id="
				<?php _e('Unique Event ID', 'event_espresso'); ?>
				"]
				<?php _e('shortcode', 'event_espresso'); ?>
				.</p>
		</div>
	</div>
	<?php
	/**
	 * Waitlist Events Help Box
	 */
	?>
	<div id="secondary_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Waitlist Events', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('These types of events can be used as a overflow or waiting list events.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('If an event is set up as an "Waitlist Event," it can be set to not appear in your event listings template. You may need to customize your event_listing.php file to make this work. For more information, please', 'event_espresso'); ?>
				<a href="http://eventespresso.com/forums/?p=512" target="_blank">
					<?php _e('visit the forums', 'event_espresso'); ?>
				</a>.
		</div>
	</div>
	<?php
	/**
	 * Off-site Registration URL Help Box
	 */
	?>
	<div id="external_URL_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Off-site Registration Page', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('If an off-site registration page is entered, it will override your registration page and send attendees to the URL that is entered.', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
	/**
	 * Event Status Type Help Box
	 */
	?>
	<div id="status_types_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Event Status Types', 'event_espresso'); ?>
			</h2>
			<ul>
				<li><strong>
						<?php _e('Public', 'event_espresso'); ?>
					</strong><br />
					<?php _e('This type if event will appear in the event listings. It is a live event (not deleted, ongoing or secondary.)', 'event_espresso'); ?>
				</li>
				<li><strong>
						<?php _e('Waitlist', 'event_espresso'); ?>
					</strong><br />
					<?php _e('This type of event can be hidden and used as a waiting list for a primary event. Template customizations may be required. For more information, please', 'event_espresso'); ?>
					<a href="http://eventespresso.com/forums/?p=512" target="_blank">
						<?php _e('visit the forums', 'event_espresso'); ?>
					</a></li>
				<li><strong>
						<?php _e('Ongoing', 'event_espresso'); ?>
					</strong><br />
					<?php _e('This type of an event can be set to appear in your event listings and display a registration page. Template customizations are required. For more information, please', 'event_espresso'); ?>
					<a href="http://eventespresso.com/forums/?p=518" target="_blank">
						<?php _e('visit the forums', 'event_espresso'); ?>
					</a></li>
				<li><strong>
						<?php _e('Deleted', 'event_espresso'); ?>
					</strong><br />
					<?php _e('This is event type will not appear in the event listings and will not dispaly a registrations page. Deleted events can still be accessed in the', 'event_espresso'); ?>
					<a href="admin.php?page=espresso_events"><?php _e('Registration Overview', 'event_espresso'); ?></a>
					<?php _e('page', 'event_espresso'); ?>
					.</li>
			</ul>
		</div>
	</div>
	<?php
	/**
	 * Registration Date/Time Help Box
	 */
	?>
	<div id="reg_date_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Registration Dates/Times', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('The event will automatically turn the registration form on and off between these dates and times.', 'event_espresso'); ?>
			</p>
			<p><strong>
					<?php _e('Note:', 'event_espresso'); ?>
				</strong>
				<?php _e('If the date of your event occurs before the regisration end date. Then the registation form will be displayed and also accept registrations.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('All events require registration start/end dates and start/end times in order to display properly on your pages.', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
	/**
	 * Event Date Help Box
	 */
	?>
	<div id="event_date_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Event Date', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('This is the date of the event.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('All events require a start and end date in order to display properly on your pages.', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
	/**
	 * Event Time Help Box
	 */
	?>
	<div id="event_times_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Event Times', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('Each event can have an unlimited amount of start/end times. This is useful for event/class organizers to manage several different sessions in their events.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('All events require a start and end time in order to display properly on your pages.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('Event times can be entered in the format of: 09:00/21:00  or 9am/9pm ', 'event_espresso') ?>
			</p>
		</div>
	</div>
	<?php
	/**
	 * Current Time Help Box
	 */
	?>
	<div id="current_time_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Current Time', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('This is the current time of your website. The timezone and date/time formats can be changed in your <a href="options-general.php" target="_blank">WordPress settings</a>.', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
	/**
	 * Custom Ticket Help Box
	 */
	?>
	<div id="custom_ticket_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Custom Ticket', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('Choose a ticket template to be used for this event. If no template is selected, the default template will be used. Templates can be created on the Tickets page.', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php ########## help box ########## ?>
	<div id="event-meta-boxes" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e("Using the Event Meta boxes", "event_espresso"); ?>
			</h2>
			<p>
				<?php _e("Event meta boxes allow you to add extra information to your event that you can display in your templates or use in your custom pages. The name parameter is the the first box labeled 'Key' and allows the shortcode to identify which meta box is to be displayed; the 'Value' is the actual content you wish to be shown.", "event_espresso"); ?>
			</p>
			<h4><?php _e('Shortcodes', 'event_espresso'); ?></h4>
			<p>
				<?php _e("This extra information can be displayed in your event listings or registration pages via shortcodes added to the event description. The Shortcodes take the form of:", "event_espresso"); ?>
			</p>
			<code>[EE_META type='event_meta' name='my_meta_key']</code>


			<p>
				<?php _e("If you are using custom templates (moved to the uploads folder) you can add the shortcode directly to the template, this would take the form of:", "event_espresso") ?>
			</p>
			<code>echo do_shortcode('[EE_META type='event_meta' name='my_meta_key']');</code>
			<h4><?php _e('Adding Default Meta Key/Values', 'event_espresso'); ?></h4>
			<p>
				<?php _e('To add default meta values, add the following code to your theme-name/functions.php file.', 'event_espresso'); ?></p>
			<pre>
function my_event_meta(){
	$array = array("event_hashtag" => "#eventespresso",
		"event_format" => "Conference",
		"livestreamed" => "N");
	return $array;
}
add_filter( 'filter_hook_espresso_filter_default_event_meta', 'my_event_meta' );
			</pre>

			<p> <?php echo __('Further information on shortcodes is available ', 'event_espresso') . "<a href='" . admin_url('admin.php?page=espresso_support#shortcodes') . " '>" . __('on the Help &amp; Support page', 'event_espresso') . "</a>" . __(' or from the', 'event_espreso') . " <a href='http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/'>" . __('forums', 'event_espresso') . "</a>."; ?> </p>
		</div>
	</div>

	<?php ########## help box ########## ?>
	<div id="event_custom_emails" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e("Using Custom Emails Editor", "event_espresso"); ?>
			</h2>
			<p>
				<?php _e("This area is used to add a  customized email to your registration. You must select \"Yes\" in the \"Send custom confirmation emails for this event?\" and nothing should be selected in the \"Use a pre-existing email?\" dropdown.", "event_espresso"); ?>
			</p>
			<p>
				<?php _e("Please be aware that clicking the HTML will destroy all formatting.", "event_espresso") ?>
			</p>
		</div>
	</div>
	<?php
	/**
	 * A dummy example help box
	 * use this to create new help boxes
	 */
	?>
	<div id="example_example_info" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Example Example', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('Hey Mickey, you\'re so fine, you\'re so fine you blow my mind, hey Mickey', 'event_espresso'); ?>
			</p>
		</div>
	</div>
</div>
<!--End <div style="display: none;"> -->
