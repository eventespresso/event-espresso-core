<?php

//This is the registration form.
//This is a template file for displaying a registration form for an event on a page.
// The following keys are available in the $data array:
// event_id, event_name, is_active, registration_url, reg_start_date, display_reg_form, event, use_coupon_code, use_groupon_code, location, org_options, google_map_link, show_ee_gmap_no_shortcode, end_date, start_date, display_desc, event_desc
function espresso_display_reg_page($data) {
?>

	<div id="event_espresso_registration_form" class="event-display-boxes">
		<h2 class="event_title ui-widget-header ui-corner-top" id="event_title-<?php echo $data['event_id']; ?>"> <?php echo $data['event_name'] ?> <?php echo $data['is_active']['status'] == 'EXPIRED' ? ' - <span class="expired_event">Event Expired</span>' : ''; ?> <?php echo $data['is_active']['status'] == 'PENDING' ? ' - <span class="expired_event">Event is Pending</span>' : ''; ?> <?php echo $data['is_active']['status'] == 'DRAFT' ? ' - <span class="expired_event">Event is a Draft</span>' : ''; ?> </h2>

		<div class="event_espresso_form_wrapper event-data-display ui-widget-content ui-corner-bottom">
		
			<form method="post" action="<?php echo $data['registration_url']; ?>" id="registration_form">

			<?php echo EE_Error::get_notices(); ?>
			
				<?php
				switch ($data['is_active']['status']) {
					case 'EXPIRED': //only show the event description.
						echo '<h3 class="expired_event">' . __('This event has passed.</h3>', 'event_espresso') . '</h3>';
						break;

					case 'REGISTRATION_CLOSED': //only show the event description.
						// if todays date is after $reg_end_date
						?>
						<div class="event-registration-closed event-messages ui-corner-all ui-state-highlight">
							<span class="ui-icon ui-icon-alert"></span>
							<p class="event_full">
								<strong>
									<?php _e('We are sorry but registration for this event is now closed.', 'event_espresso'); ?>
								</strong>
							</p>
							<p class="event_full">
								<strong>
									<?php _e('Please <a href="contact" title="contact us">contact us</a> if you would like to know if spaces are still available.', 'event_espresso'); ?>
								</strong>
							</p>
						</div>
						<?php
						break;

					case 'REGISTRATION_NOT_OPEN': //only show the event description.
						// if todays date is after $reg_end_date
						// if todays date is prior to $reg_start_date
						?>
						<div class="event-registration-pending event-messages ui-corner-all ui-state-highlight">
							<span class="ui-icon ui-icon-alert"></span>
							<p class="event_full">
								<strong>
									<?php _e('We are sorry but this event is not yet open for registration.', 'event_espresso'); ?>
								</strong>
							</p>
							<p class="event_full">
								<strong>
									<?php
									_e('You will be able to register starting ', 'event_espresso');
									echo event_espresso_no_format_date($data['reg_start_date'], 'F d, Y');
									?>
								</strong>
							</p>
						</div>
						<?php
						break;

					default://This will display the registration form

						/*
						 * * This section shows the registration form if it is an active event * *
						 */

						if ($data['display_reg_form']) {


							do_action( 'action_hook_espresso_ticket_selector', $data['event'] );

							//Added for seating chart addon. Creates a field to select a seat from a popup.
							do_action('action_hook_espresso_seating_chart_select', $data['event_id']);

							/* Displays the social media buttons */
							do_action('action_hook_espresso_social_display_buttons', $data['event_id']);

							//Coupons
							if (function_exists('event_espresso_coupon_registration_page') && $data['use_coupon_code']) {
								echo event_espresso_coupon_registration_page($data['use_coupon_code'], $data['event_id']);
							}//End coupons display
							//Groupons
							if (function_exists('event_espresso_groupon_registration_page')) {
								echo event_espresso_groupon_registration_page($data['use_groupon_code'], $data['event_id']);
							}//End groupons display
							?>

							<input type="hidden" name="event_id" id="event_id-<?php echo $data['event_id']; ?>" value="<?php echo $data['event_id']; ?>">

							<p class="event_form_submit" id="event_form_submit-<?php echo $data['event_id']; ?>">

								<a 	id="event_form_field-<?php echo $data['event_id']; ?>"
										class="event-list-reg-link-btn show-if-js ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx float-right"
										style="display:none;"
										>
									<span class="ui-icon ui-icon-cart"></span>&nbsp;<?php _e('Submit Registration', 'event_espresso'); ?>
								</a>

								<noscript>
								<input type="submit"
											 id="event_form_field-<?php echo $data['event_id']; ?>"
											 name="event-list-reg-link-sbmt-btn"
											 class="event-list-reg-link-sbmt-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx float-right"
											 value="<?php _e('Submit Registration', 'event_espresso'); ?>"
											 role="button"
											 />
								</noscript>
							<div class="clear"></div>
							</p>
							<?php
						}
						break;
				}//End Switch statement to check the status of the event


				/* Display the address and google map link if available */
				if ($data['location'] != '' && (empty($data['org_options']['template_settings']['display_address_in_regform']) || $data['org_options']['template_settings']['display_address_in_regform'])) {
					?>
					<p class="event_address" id="event_address-<?php echo $data['event_id'] ?>"><span class="section-title"><?php echo __('Address:', 'event_espresso'); ?></span> <br />
						<span class="address-block"> <?php echo stripslashes_deep($data['location']); ?><br />
							<span class="google-map-link"><?php echo $data['google_map_link']; ?></span></span> </p>
					<?php
				}

				if ($data['show_ee_gmap_no_shortcode'] && $data['event_meta']['enable_for_gmap'] && isset($data['ee_gmap_location'])) {
					echo ee_gmap_display($data['ee_gmap_location'], $data['event_id']);
				}

				//Meta example
				//echo do_shortcode('[EE_META type="event_meta" name="test_meta"]');
				if ( $data['single_event'] ) :
				?>
				<p class="start_date">
						<?php if ($data['end_date'] !== $data['start_date']) { ?>
						<span class="section-title">
						<?php _e('Start Date: ', 'event_espresso'); ?>
						</span>
						<?php } else { ?>
						<span class="section-title">
						<?php _e('Date: ', 'event_espresso'); ?>
						</span>
						<?php
					}
					echo $data['start_date'];
					if ($data['end_date'] !== $data['start_date']) {
						echo '<br />';
						?>
						<span class="section-title">
						<?php _e('End Date: ', 'event_espresso'); ?>
						</span> <?php
						echo $data['end_date'];
					}
					?>
				</p>

				<?php
				endif; // single_event
				
				if (!empty($data['event_meta']['display_thumb_in_regpage']) && !empty($data['event_meta']['event_thumbnail_url'])) {
					?>
					<p><a href="<?php echo $data['event_meta']['event_thumbnail_url'] ?>"><img src="<?php echo $data['event_meta']['event_thumbnail_url'] ?>" alt=""></a></p>
					<?php
				}

				if ($data['display_desc']) {//Show the description or not
					?>
					<p class="section-title">
					<?php _e('Description:', 'event_espresso') ?>
					</p>
					<div class="event_description clearfix"><?php echo espresso_format_content($data['event_desc']); //Code to show the actual description. The Wordpress function "wpautop" adds formatting to your description. ?></div>
					<?php
				}

				//End display description
				?>
			</form>
	<?php echo '<p class="register-link-footer">' . espresso_edit_this($data['event_id']) . '</p>' ?> 
	</div>
</div>
<?php
}
