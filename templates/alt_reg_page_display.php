<?php
//This tmplate can be used inconjunction with the event meta shortcodes
?>

<div id="event_espresso_registration_form" class="event-display-boxes">
  <div class="event_espresso_form_wrapper event-data-display">
    <form method="post" action="<?php echo home_url() ?>/?page_id=<?php echo $event_page_id ?>" id="registration_form">
      <h2 class="event_title" id="event_title-<?php echo $event_id; ?>"> <?php echo $event_name ?> <?php echo $is_active['status'] == 'EXPIRED' ? ' - <span class="expired_event">Event Expired</span>' : ''; ?> <?php echo $is_active['status'] == 'PENDING' ? ' - <span class="expired_event">Event is Pending</span>' : ''; ?> <?php echo $is_active['status'] == 'DRAFT' ? ' - <span class="expired_event">Event is a Draft</span>' : ''; ?> </h2>	
	<?php 

	switch ($is_active['status']) {
		case 'EXPIRED': //only show the event description.
			_e('<h3 class="expired_event">This event has passed.</h3>', 'event_espresso');
		break;
		case 'REGISTRATION_CLOSED': //only show the event description.
		// if todays date is after $reg_end_date
		?>
          <div class="event-registration-closed event-messages">
            
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
          <div class="event-registration-pending event-messages">
            <p class="event_full">
			<strong><?php _e('We are sorry but this event is not yet open for registration.', 'event_espresso'); ?></strong></p>
            <p class="event_full"><strong><?php _e('You will be able to register starting ' . event_espresso_no_format_date($reg_start_date, 'F d, Y'), 'event_espresso'); ?></strong>
            </p>
          </div>
<?php
		break;

		default:
			//This will display the registration form
			echo espresso_format_content($event_desc); //Code to show the actual description. The Wordpress function "wpautop" adds formatting to your description.
			/* Displays the social media buttons */
			if (function_exists('espresso_show_social_media')){
				echo '<p class="espresso_social">'.espresso_show_social_media($event_id, 'twitter').' '.espresso_show_social_media($event_id, 'facebook').'</p>'; 
			}
			?>
	  
			<input type="hidden" name="regevent_action" id="regevent_action-<?php echo $event_id; ?>" value="post_attendee">
			<input type="hidden" name="event_id" id="event_id-<?php echo $event_id; ?>" value="<?php echo $event_id; ?>">
			<?php
			//Recaptcha portion
			if ($org_options['use_captcha'] == 'Y' && $_REQUEST['edit_details'] != 'true') {
				if (!function_exists('recaptcha_get_html')) {
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/recaptchalib.php');
				}//End require captcha library
				# the response from reCAPTCHA
				$resp = null;
				# the error code from reCAPTCHA, if any
				$error = null;
			?>
			  <p class="event_form_field" id="captcha-<?php echo $event_id; ?>">
				<?php _e('Anti-Spam Measure: Please enter the following phrase', 'event_espresso'); ?>
				<?php echo recaptcha_get_html($org_options['recaptcha_publickey'], $error); ?> </p>
			  <?php } //End use captcha ?>
			  <p class="event_form_submit" id="event_form_submit-<?php echo $event_id; ?>">
				<input class="btn_event_form_submit" id="event_form_field-<?php echo $event_id; ?>" type="submit" name="Submit" value="<?php _e('Submit', 'event_espresso'); ?>">
			  </p>
			  <?php
			
        break;
	}
?>
    </form>
    <?php if(isset($ee_style['event_espresso_form_wrapper_close'])) echo $ee_style['event_espresso_form_wrapper_close']; ?>
    <?php echo '<p class="register-link-footer">' . espresso_edit_this($event_id) . '</p>' ?> </div>
</div>