<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
function edit_event($event_id = 0) {
    global $wpdb, $org_options, $espresso_premium;

    $events = $wpdb->get_results($wpdb->prepare("SELECT e.*, ev.id as venue_id
	    FROM " . EVENTS_DETAIL_TABLE . " e
	    LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " vr ON e.id = vr.event_id
	    LEFT JOIN " . EVENTS_VENUE_TABLE . " ev ON vr.venue_id = ev.id
	    WHERE e.id = %d", $event_id));

    foreach ($events as $event) {

        $event_id = $event->id;
        $event_name = stripslashes_deep($event->event_name);
        $event_desc = stripslashes_deep($event->event_desc);
        $display_desc = $event->display_desc;
        $display_reg_form = $event->display_reg_form;
        $event_description = stripslashes_deep($event->event_desc);
        $member_only = $event->member_only;
		$ticket_id = $event->ticket_id;

        $phone = stripslashes_deep($event->phone);
        $externalURL = stripslashes_deep($event->externalURL);

        //Early discounts
        $early_disc = stripslashes_deep($event->early_disc);
        $early_disc_date = stripslashes_deep($event->early_disc_date);
        $early_disc_percentage = stripslashes_deep($event->early_disc_percentage);

        $post_id = $event->post_id;
        $post_type = $event->post_type;

        $event_identifier = stripslashes_deep($event->event_identifier);

        $registration_start = $event->registration_start;
        $registration_end = $event->registration_end;
        $registration_startT = $event->registration_startT;
        $resitration_endT = $event->registration_endT;
        $timezone_string = $event->timezone_string;

        $start_date = $event->start_date;
        $end_date = $event->end_date;

        $tax_percentage = $event->tax_percentage;
        $tax_mode = $event->tax_mode;

        $start_time = isset($event->start_time) ? $event->start_time : '';
        $end_time = isset($event->end_time) ? $event->end_time : '';
        $reg_limit = $event->reg_limit;
        $additional_limit = $event->additional_limit;
        $allow_overflow = $event->allow_overflow;
        $overflow_event_id = $event->overflow_event_id;
        $allow_multiple = $event->allow_multiple;
        $event_cost = unserialize(isset($event->event_cost) ? $event->event_cost : '');
        $is_active = $event->is_active;
        $status = array();
        $status = event_espresso_get_is_active($event_id);
        $event_status = $event->event_status;
        $conf_mail = stripslashes_deep($event->conf_mail);
        $send_mail = stripslashes_deep($event->send_mail);
        $use_coupon_code = $event->use_coupon_code;
        if (function_exists('event_espresso_edit_event_groupon')) {
            $use_groupon_code = $event->use_groupon_code;
        }
        $alt_email = $event->alt_email;

        $address = stripslashes_deep($event->address);
        $address2 = stripslashes_deep($event->address2);
        $city = stripslashes_deep($event->city);
        $state = stripslashes_deep($event->state);
        $zip = stripslashes_deep($event->zip);
        $country = stripslashes_deep($event->country);

        $venue_id = stripslashes_deep($event->venue_id);
        $venue_title = stripslashes_deep($event->venue_title);
        $venue_url = stripslashes_deep($event->venue_url);
        $venue_phone = stripslashes_deep($event->venue_phone);
        $venue_image = stripslashes_deep($event->venue_image);

        $email_id = $event->email_id;
        $wp_user = $event->wp_user;
        //echo 'date_submitted = '.$event->submitted;
        $date_submitted = $event->submitted != '0000-00-00 00:00:00' ? (empty($event->submitted) ? '' : event_date_display($event->submitted, get_option('date_format')) ) : 'N/A';

        $google_map_link = espresso_google_map_link(array('address' => $address, 'city' => $city, 'state' => $state, 'zip' => $zip, 'country' => $country));


        //Virtual location
        $virtual_url = stripslashes_deep($event->virtual_url);
        $virtual_phone = stripslashes_deep($event->virtual_phone);

        $question_groups = unserialize($event->question_groups);

        $item_groups = unserialize($event->item_groups);

        $event_meta = unserialize($event->event_meta);

        $recurrence_id = $event->recurrence_id;
        $visible_on = $event->visible_on;
        $require_pre_approval = $event->require_pre_approval;
    }

    $values = array(
        array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
        array('id' => 'N', 'text' => __('No', 'event_espresso')));

    //If user is an event manager, then show only their events
    if (function_exists('espresso_is_my_event') && espresso_is_my_event($event_id) != true) {
        echo '<h2>' . __('Sorry, you do not have permission to edit this event.', 'event_espresso') . '</h2>';
        return;
    }
    ?>
<!--Update event display-->

<div id="side-info-column" class="inner-sidebar">
  <div id="side-sortables" class="meta-box-sortables ui-sortable">
    <div id="submitdiv" class="postbox">
      <div class="handlediv" title="Click to toggle"><br />
      </div>
      <h3 class='hndle'> <span>
        <?php _e('Quick Overview', 'event_espresso'); ?>
        </span> </h3>
      <div class="inside">
        <div class="submitbox" id="submitpost">
          <div id="minor-publishing">
            <div id="minor-publishing-actions" class="clearfix">
              <div id="preview-action"> <a class="preview button" href="<?php echo espresso_reg_url($event_id); ?>" target="_blank" id="event-preview" tabindex="5">
                <?php _e('View Event', 'event_espresso'); ?>
                </a>
                <input type="hidden" name="event-preview" id="event-preview" value="" />
              </div>
              <div id="copy-action"> <a class="preview button" href="admin.php?page=events&amp;action=copy_event&event_id=<?php echo $event_id ?>" id="post-copy" tabindex="4" onclick="return confirm('<?php _e('Are you sure you want to copy ' . $event_name . '?', 'event_espresso'); ?>')">
                <?php _e('Duplicate Event', 'event_espresso'); ?>
                </a>
                <input  type="hidden" name="event-copy" id="event-copy" value="" />
              </div>
            </div>
            <!-- /minor-publishing-actions -->
            
            <div id="misc-publishing-actions">
              <div class="misc-pub-section curtime" id="visibility"> <span id="timestamp">
                <?php _e('Start Date', 'event_espresso'); ?>
                <b> <?php echo event_date_display($start_date); ?> <?php echo event_date_display($start_time, get_option('time_format')); ?></b> </span> </div>
              <div class="misc-pub-section">
                <label for="post_status">
                  <?php _e('Current Status:', 'event_espresso'); ?>
                </label>
                <span id="post-status-display"> <?php echo $status['display']; ?></span> </div>
              <div class="misc-pub-section" id="visibility"> <img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/group.png" width="16" height="16" alt="<?php _e('View Attendees', 'event_espresso'); ?>" /> <?php echo!empty($number_attendees) ? __('Attendees', 'event_espresso') : '<a href="admin.php?page=attendees&amp;event_admin_reports=list_attendee_payments&amp;event_id=' . $event_id . '">' . __('Attendees', 'event_espresso') . '</a>'; ?>: <?php echo get_number_of_attendees_reg_limit($event_id, 'num_attendees_slash_reg_limit'); ?> </div>
              <div class="misc-pub-section <?php echo (function_exists('espresso_is_admin') && espresso_is_admin() == true && $espresso_premium == true) ? '' : 'misc-pub-section-last'; ?>" id="visibility2"> <a href="admin.php?page=attendees&amp;event_admin_reports=event_newsletter&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/email_go.png" width="16" height="16" alt="<?php _e('Newsletter', 'event_espresso'); ?>" /></a> <a href="admin.php?page=attendees&amp;event_admin_reports=event_newsletter&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>">
                <?php _e('Email Event Attendees', 'event_espresso'); ?>
                </a></div>
              <?php
                                if (function_exists('espresso_is_admin') && espresso_is_admin() == true && $espresso_premium == true) {
                                    $user_name = espresso_user_meta($wp_user, 'user_firstname') != '' ? espresso_user_meta($wp_user, 'user_firstname') . ' ' . espresso_user_meta($wp_user, 'user_lastname') : espresso_user_meta($wp_user, 'display_name');
                                    $user_company = espresso_user_meta($wp_user, 'company') != '' ? espresso_user_meta($wp_user, 'company') : '';
                                    $user_organization = espresso_user_meta($wp_user, 'organization') != '' ? espresso_user_meta($wp_user, 'organization') : '';
                                    $user_co_org = $user_company != '' ? $user_company : $user_organization;
                                    echo '<div class="misc-pub-section misc-pub-section-last" id="visibility3">';
                                    echo '<ul>';
                                    echo '<li><strong>' . __('Submitted By:', 'event_espresso') . '</strong> ' . $user_name . '</li>';
                                    echo '<li><strong>' . __('Email:', 'event_espresso') . '</strong> ' . espresso_user_meta($wp_user, 'user_email') . '</li>';
                                    echo $user_co_org != '' ? '<li><strong>' . __('Organization:', 'event_espresso') . '</strong> ' . espresso_user_meta($wp_user, 'company') . '</li>' : '';
                                    echo '<li><strong>' . __('Date Submitted:', 'event_espresso') . '</strong> ' . $date_submitted . '</li>';
                                    echo '</ul>';
                                    echo '</div>';
                                }
                                ?>
            </div>
            <!-- /misc-publishing-actions --> 
          </div>
          <!-- /minor-publishing -->
          
          <div id="major-publishing-actions" class="clearfix">
            <?php if ($recurrence_id > 0) : ?>
            <div id="delete-action"> &nbsp; <a class="submitdelete deletion" href="admin.php?page=events&amp;action=delete_recurrence_series&recurrence_id=<?php echo $recurrence_id ?>" onclick="return confirm('<?php _e('Are you sure you want to delete ' . $event_name . '?', 'event_espresso'); ?>')">
              <?php _e('Delete all events in this series', 'event_espresso'); ?>
              </a> </div>
            <?php else: ?>
            <div id="delete-action"> <a class="submitdelete deletion" href="admin.php?page=events&amp;action=delete&event_id=<?php echo $event_id ?>" onclick="return confirm('<?php _e('Are you sure you want to delete ' . $event_name . '?', 'event_espresso'); ?>')">
              <?php _e('Delete Event', 'event_espresso'); ?>
              </a> </div>
            <?php endif; ?>
            <div id="publishing-action">
              <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Event', 'event_espresso'); ?>" id="save_event_setting" />
            </div>
            <!-- /publishing-action --> 
          </div>
          <!-- /major-publishing-actions --> 
        </div>
        <!-- /submitpost --> 
      </div>
      <!-- /inside --> 
    </div>
    <!-- /submitdiv -->
    
    <?php
            $advanced_options = '';
            if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/event-management/advanced_settings.php')) {
                require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "includes/admin-files/event-management/advanced_settings.php");
            } else {
                //Display Lite version options
                $status = array(array('id' => 'A', 'text' => __('Active', 'event_espresso')), array('id' => 'D', 'text' => __('Deleted', 'event_espresso')));
                $advanced_options = '<p><strong>' . __('Advanced Options:', 'event_espresso') . '</strong></p>'
                        . '<p><label>' . __('Is this an active event? ', 'event_espresso') . '</label>' . __(select_input('is_active', $values, $is_active)) . '</p>'
                        . '<p><label>' . __('Display  description? ', 'event_espresso') . '</label>' . select_input('display_desc', $values, $display_desc) . '</p>'
                        . '<p><label>' . __('Display  registration form? ', 'event_espresso') . '</label>' . select_input('display_reg_form', $values, $display_reg_form) . '</p>';
            }//Display Lite version options - End
            postbox('event-status', 'Event Options', '<p><label for"reg-limit">' . __('Attendee Limit', 'event_espresso') . ': </label><input name="reg_limit" id="reg-limit" size="10" type="text" value="' . $reg_limit . '" /><br />' .
                    '<span>(' . __('leave blank for unlimited', 'event_espresso') . ')</span></p>' .
                    '<p><label>' . __('Allow group registrations?', 'event_espresso') . '</label> ' . select_input('allow_multiple', $values, $allow_multiple) . '</p>' .
                    '<p><label for="addit-limit">' . __('Max Group Registrants', 'event_espresso') . ':</label> <input type="text" id="addit-limit" name="additional_limit" value="' . $additional_limit . '" size="4" />' . '</p>' .
                    $advanced_options
            );

		/*
		 * Added for seating chart addon
		 */
		if ( defined('ESPRESSO_SEATING_CHART') ){
			$seating_chart_id = 0;
			$seating_chart_event = $wpdb->get_row("select * from ".EVENTS_SEATING_CHART_EVENT_TABLE." where event_id = $event_id");
			if ( $seating_chart_event !== NULL)
			{
				$seating_chart_id = $seating_chart_event->seating_chart_id;
			}
	?>
    <div style="display: block;" id="seating_chart-options" class="postbox">
      <div class="handlediv" title="Click to toggle"><br />
      </div>
      <h3 class="hndle"><span>
        <?php _e('Seating chart','event_espresso'); ?>
        </span></h3>
      <div class="inside">
        <p>
          <select name="seating_chart_id" id="seating_chart_id" style="float:none;">
            <option value="0" <?php if ( $seating_chart_id == 0 ) { echo 'selected="selected"'; } ?> >None</option>
            <?php
			$seating_charts = $wpdb->get_results("select * from ".EVENTS_SEATING_CHART_TABLE." order by name");
			foreach($seating_charts as $seating_chart){
			?>
            	<option value="<?php echo $seating_chart->id; ?>" <?php if ( $seating_chart_id == $seating_chart->id ) { echo 'selected="selected"'; } ?> ><?php echo $seating_chart->name; ?></option>
            <?php                        
			}
			?>
          </select>
        </p>
      </div>
    </div>
    <?php
		}
		/*
		 * End
		 */
		 
		  
	###### Modification by wp-developers to introduce attendee pre-approval requirement ##########
	if ($org_options['use_attendee_pre_approval'] == 'Y' && $espresso_premium == true) {
	?>
        <div id="attendee-pre-approval-options" class="postbox">
          <div class="handlediv" title="Click to toggle"><br />
          </div>
          <h3 class="hndle"> <span>
            <?php _e('Attendee pre-approval required?', 'event_espresso'); ?>
            </span> </h3>
          <div class="inside">
            <p class="pre-approve">
            <?php
                $pre_approval_values = array(array('id' => '1', 'text' => __('Yes', 'event_espresso')), array('id' => '0', 'text' => __('No', 'event_espresso')));
                echo select_input("require_pre_approval", $pre_approval_values, $require_pre_approval);
            ?>
            </p>
          </div>
        </div>
    <?php
	}
	########## END #################################
			
            if (function_exists('espresso_ticket_dd') && $espresso_premium == true) {
          ?>
                <div  id="ticket-options" class="postbox">
                  <div class="handlediv" title="Click to toggle"><br>
                  </div>
                  <h3 class="hndle"> <span>
                    <?php _e('Custom Tickets', 'event_espresso'); ?>
                    </span> </h3>
                  <div class="inside">
                    <p><?php echo espresso_ticket_dd($ticket_id); ?></p>
                  </div>
                </div>
                <!-- /ticket-options -->
  		  <?php
            }

            if (get_option('events_members_active') == 'true' && $espresso_premium == true) {
          ?>
                <div  id="member-options" class="postbox">
                  <div class="handlediv" title="Click to toggle"><br>
                  </div>
                  <h3 class="hndle"> <span>
                    <?php _e('Member Options', 'event_espresso'); ?>
                    </span> </h3>
                  <div class="inside">
                    <p><?php echo event_espresso_member_only($member_only); ?></p>
                  </div>
                </div>
                <!-- /member-options -->
  		  <?php
            }

            if (get_option('event_mailchimp_active') == 'true' && $espresso_premium == true) {
                MailChimpView::event_list_selection();
            }
            ?>
    <?php if (function_exists('espresso_fb_createevent') && $espresso_premium == true) { ?>
    <?php
                $eventstable = $wpdb->prefix . "fbevents_events";
                $fb_e_id = $wpdb->get_var("SELECT fb_event_id FROM $eventstable WHERE event_id='{$event_id}'");
                ?>
    <div  id="event-meta" class="postbox">
      <div class="handlediv" title="Click to toggle"><br>
      </div>
      <h3 class="hndle"> <span>
        <?php _e('Post to Facebook', 'event_espresso'); ?>
        </span> </h3>
      <div class="inside">
        <input type="checkbox" name="espresso_fb" id="espresso_fb" <?php echo ($fb_e_id ? "CHECKED=TRUE" : null); ?>/>
        <?php _e('Post to Facebook', 'event_espresso'); ?>
        <?php if (!empty($fb_e_id)) { ?>
        <a href="http://www.facebook.com/event.php?eid=<?php echo $fb_e_id; ?>"
                               target="_blank">
        <?php _e('Event Page On Facebook', 'event_espresso'); ?>
        </a>
        <?php } ?>
      </div>
    </div>
    <?php } ?>
    <div  id="event-categories" class="postbox">
      <div class="handlediv" title="Click to toggle"><br>
      </div>
      <h3 class="hndle"> <span>
        <?php _e('Event Category', 'event_espresso'); ?>
        </span> </h3>
      <div class="inside"> <?php echo event_espresso_get_categories($event_id); ?> </div>
    </div>
    <!-- /event-category -->
    
    <?php
            if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/event-management/promotions_box.php')) {
                require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/event-management/promotions_box.php');
            }
            ?>
    <!-- /event-promotions --> 
    
    <?php echo espresso_event_question_groups($question_groups, $event_meta['add_attendee_question_groups'], $event_id) ?> 
    <!-- /event-questions -->
    
    <?php
            if (function_exists('espresso_personnel_cb') && $org_options['use_personnel_manager'] == 'Y' && $espresso_premium == true) {
                ?>
    <div id="event-staff" class="postbox">
      <div class="handlediv" title="Click to toggle"><br>
      </div>
      <h3 class="hndle"> <span>
        <?php _e('Event Staff / Speakers', 'event_espresso'); ?>
        </span> </h3>
      <div class="inside"> <?php echo espresso_personnel_cb($event_id); ?> </div>
    </div>
    <?php
            }

            if (get_option('events_groupons_active') == 'true' && $espresso_premium == true) {
                ?>
    <div id="groupon-options" class="postbox">
      <div class="handlediv" title="Click to toggle"><br>
      </div>
      <h3 class="hndle"> <span>
        <?php _e('Groupon Options', 'event_espresso'); ?>
        </span> </h3>
      <div class="inside">
        <p><?php echo event_espresso_edit_event_groupon($use_groupon_code); ?></p>
      </div>
    </div>
    <!-- /groupon-options -->
    <?php } ?>
		         <!-- Add thumbnail image -->
             <div id="set-featured-image" class="postbox">
					      <div class="handlediv" title="Click to toggle"><br />
      	      </div>
					      <h3 class="hndle">
						     <span>
							     <?php _e('Featured Image', 'event_espresso'); ?>
						     </span>
					      </h3>
					      <div class="inside">
					      <div id="featured-image">
								 <?php
								 
								 if(!empty($event_meta['event_thumbnail_url'])){ 
								   $event_thumb = $event_meta['event_thumbnail_url'];
								 } else {
								   $event_thumb = '';
								 }?>
								 
								 <?php // var_dump($event_meta['event_thumbnail_url']); ?>
					        <label for="upload_image"><?php _e('Add Featured Image', 'event_espresso'); ?></label>
				          <input id="upload_image" type="hidden" size="36" name="upload_image" value="<?php echo $event_thumb ?>" />
	               <input id="upload_image_button" type="button" value="Upload Image" />
									
									<?php if($event_thumb){ ?>
									<p class="event-featured-thumb"><img  src="<?php echo $event_thumb ?>" alt="" /></p>
									<?php } ?>
									
								</div>
   					  <p>
						     <label><?php _e('Enable image in event lists', 'event_espresso'); ?></label>
								 <?php echo select_input('show_thumb_in_lists', $values, isset($event_meta['display_thumb_in_lists']) ? $event_meta['display_thumb_in_lists'] : ''); ?>								 
						    </p>
					      <p>
						     <label><?php _e('Enable image in registration', 'event_espresso'); ?></label>
								 <?php echo select_input('show_thumb_in_regpage', $values, isset($event_meta['display_thumb_in_regpage']) ? $event_meta['display_thumb_in_regpage'] : ''); ?>								 
						    </p>								 	
    					 <?php if (function_exists('espresso_calendar_config_mnu') && $espresso_premium == true) { ?>
					      <p>
								  <label><?php _e('Add image to event calendar', 'event_espresso'); ?></label>
								  <?php echo select_input('show_on_calendar', $values, isset($event_meta['display_thumb_in_calendar']) ? $event_meta['display_thumb_in_calendar'] : ''); ?>
						    </p>
				     <?php } ?>
									 					
					      </div>
				       </div>	
  </div>
  <!-- /side-sortables --> 
</div>
<!-- /side-info-column --> 

<!-- Left Column -->
<div id="post-body">
  <div id="post-body-content">
    <div id="titlediv"> <strong>
      <?php _e('Event Title', 'event_espresso'); ?>
      </strong>
      <div id="titlewrap">
        <label class="screen-reader-text" for="title">
          <?php _e('Event Title', 'event_espresso'); ?>
        </label>
        <input type="text" name="event" size="30" tabindex="1" value="<?php echo $event_name; ?>" id="title" autocomplete="off" />
      </div>
      <!-- /titlewrap -->
      <div class="inside">
        <div id="edit-slug-box"> <strong>
          <?php _e('Unique Event Identifier:', 'event_espresso'); ?>
          </strong>
          <input disabled="disabled" type="text" size="30" tabindex="2" name="event_identifier" id="event_identifier" value ="<?php echo $event_identifier; ?>" />
          <?php echo '<a href="#" class="button" onclick="prompt(&#39;Event Shortcode:&#39;, \'[SINGLEEVENT single_event_id=&#34;\' + jQuery(\'#event_identifier\').val() + \'&#34;]\'); return false;">' . __('Shortcode') . '</a>' ?> <?php echo '<a href="#" class="button" onclick="prompt(&#39;Short URL:&#39;, \'' . espresso_reg_url($event_id) . '\'); return false;">' . __('Short URL') . '</a>' ?> <?php echo '<a href="#" class="button" onclick="prompt(&#39;Full URL:&#39;, \'' . home_url() . '/?page_id=' . $org_options['event_page_id'] . '&amp;regevent_action=register&amp;event_id=' . $event_id . '\'); return false;">' . __('Full URL') . '</a>' ?> </div>
        <!-- /edit-slug-box --> 
      </div>
      <!-- /.inside --> 
    </div>
    <!-- /titlediv -->
    
    <div id="descriptiondivrich" class="postarea"> <strong>
      <?php _e('Event Description', 'event_espresso'); ?>
      </strong>
      <?php
                /*
                  This is the editor used by WordPress. It is very very hard to find documentation for this thing, so I pasted everything I could find below.
                  param: string $content Textarea content.
                  param: string $id Optional, default is 'content'. HTML ID attribute value.
                  param: string $prev_id Optional, default is 'title'. HTML ID name for switching back and forth between visual editors.
                  param: bool $media_buttons Optional, default is true. Whether to display media buttons.
                  param: int $tab_index Optional, default is 2. Tabindex for textarea element.
                 */
                //the_editor($content, $id = 'content', $prev_id = 'title', $media_buttons = true, $tab_index = 2)
                the_editor(espresso_admin_format_content($event_desc), $id = 'event_desc'/* , $prev_id = 'title', $media_buttons = true, $tab_index = 3 */);
                ?>
      <table id="post-status-info" cellspacing="0">
        <tbody>
          <tr>
            <td id="wp-word-count"></td>
            <td class="autosave-info"><span id="autosave">&nbsp;</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- /postdivrich -->
    
    <div id="normal-sortables" class="meta-box-sortables ui-sortable">
      <div style="display: block;" id="event-date-time" class="postbox">
        <div class="handlediv" title="Click to toggle"><br>
        </div>
        <h3 class="hndle"> <span>
          <?php _e('Event Date/Times', 'event_espresso'); ?>
          </span> </h3>
        <div class="inside">
          <table width="100%" border="0" cellpadding="5">
            <tr valign="top">
              <td class="a"><fieldset id="add-reg-dates">
                  <legend>
                  <?php _e('Registration Dates', 'event_espresso'); ?>
                  </legend>
                  <p>
                    <label for="registration_start"> <?php echo __('Registration Start:', 'event_espresso') ?></label>
                    <input type="text" class="datepicker" size="15" id="registration_start" name="registration_start"  value="<?php echo $registration_start ?>" />
                  </p>
                  <p>
                    <label for="registration_end"><?php echo __('Registration End:', 'event_espresso') ?></label>
                    <input type="text" class="datepicker" size="15" id="registration_end" name="registration_end"  value="<?php echo $registration_end ?>" />
                  </p>
                </fieldset>
                <fieldset>
                  <legend>
                  <?php _e('Event Dates', 'event_espresso'); ?>
                  </legend>
                  <p>
                    <label for="start_date"><?php echo __('Event Start Date', 'event_espresso') ?></label>
                    <input type="text" class="datepicker" size="15" id="start_date" name="start_date" value="<?php echo $start_date ?>" />
                  </p>
                  <p>
                    <label for="end_date"><?php echo __('Event End Date', 'event_espresso') ?></label>
                    <input type="text" class="datepicker" size="15" id="end_date" name="end_date" value="<?php echo $end_date ?>" />
                  </p>
                </fieldset>
                <?php if (isset($org_options['use_event_timezones']) && $org_options['use_event_timezones'] == 'Y' && $espresso_premium == true) { ?>
                <fieldset id="event-timezone">
                  <p>
                    <label>
                      <?php _e('Event Timezone', 'event_espresso') ?>
                      :</label>
                    <?php echo eventespresso_ddtimezone($event_id) ?></p>
                </fieldset>
                <?php } ?></td>
              <?php // ADD TIME REGISTRATION  ?>
              <td class="b"><fieldset id="add-register-times">
                  <legend>
                  <?php _e('Registration Times', 'event_espresso'); ?>
                  </legend>
                  <?php echo event_espresso_timereg_editor($event_id); ?>
                </fieldset>
                <fieldset id="add-event-times">
                  <legend>
                  <?php _e('Event Times', 'event_espresso'); ?>
                  </legend>
                  <?php echo event_espresso_time_editor($event_id); ?>
                </fieldset>
                <?php if ((!isset($org_options['use_event_timezones']) || $org_options['use_event_timezones'] != 'Y') && $espresso_premium == true) { ?>
                <p><span class="run-in">
                  <?php _e('Current Time', 'event_espresso'); ?>
                  :</span> <span class="current-date"> <?php echo date(get_option('date_format')) . ' ' . date(get_option('time_format')); ?></span> <a class="change-date-time" href="options-general.php" target="_blank">
                  <?php _e('Change timezone and date format settings?', 'event_espresso'); ?>
                  </a></p>
                <?php } ?></td>
            </tr>
          </table>
        </div>
      </div>
      <?php
                /**
                 * Load the recurring events form if the add-on has been installed.	*
                 */
                if (get_option('event_espresso_re_active') == 1 && $espresso_premium == true) {
                    require_once(EVENT_ESPRESSO_RECURRENCE_FULL_PATH . "functions/re_view_functions.php");
                    //For now, only the recurring events will show the form
                    if ($recurrence_id > 0)
                        event_espresso_re_form($recurrence_id);
                }
                ?>
      <div id="event-pricing" class="postbox">
        <div class="handlediv" title="Click to toggle"><br>
        </div>
        <h3 class="hndle"> <span>
          <?php _e('Event Pricing', 'event_espresso'); ?>
          </span> </h3>
        <div class="inside">
          <table width="100%" border="0" cellpadding="5">
            <tr valign="top">
              <td id="standard-pricing" class="a"><?php event_espresso_multi_price_update($event_id); //Standard pricing ?></td>
              <?php
                                //If the members addon is installed, define member only event settings
                                if (get_option('events_members_active') == 'true' && $espresso_premium == true) {
                                    ?>
              <td id="member-pricing" class="b"><?php echo event_espresso_member_only_pricing($event_id); //Show the the member only pricing options. ?></td>
              <?php } ?>
            </tr>
          </table>
        </div>
      </div>
      <h2>
        <?php _e('Advanced Options', 'event_espresso'); ?>
      </h2>
      <div id="event-location" class="postbox">
        <div class="handlediv" title="Click to toggle"><br />
        </div>
        <h3 class="hndle"> <span>
          <?php _e('Additional Event/Venue Information', 'event_espresso'); ?>
          </span> </h3>
        <div class="inside">
          <table width="100%" border="0" cellpadding="5">
              <tr valign="top">
            
            <?php
                                if (function_exists('espresso_venue_dd') && $org_options['use_venue_manager'] == 'Y' && $espresso_premium == true) {
                                    $ven_type = 'class="use-ven-manager"';
                                    ?>
            <td <?php echo $ven_type ?>><fieldset id="venue-manager">
                <legend><?php echo __('Venue Information', 'event_espresso') ?></legend>
                <?php if (!espresso_venue_dd()) : ?>
                <p class="info"><b>
                  <?php _e('You have not created any venues yet.', 'event_espresso'); ?>
                  </b></p>
                <p><a href="admin.php?page=event_venues"><?php echo __('Add venues to the Venue Manager', 'event_espresso') ?></a></p>
                <?php else: ?>
                <?php echo espresso_venue_dd($venue_id) ?>
                <?php endif; ?>
              </fieldset></td>
            <?php
    } else {
        $ven_type = 'class="manual-venue"';
        ?>
            <td <?php echo $ven_type ?>><fieldset>
                <legend>
                <?php _e('Physical Location', 'event_espresso'); ?>
                </legend>
                <p>
                  <label for="phys-addr">
                    <?php _e('Address:', 'event_espresso'); ?>
                  </label>
                  <input size="20" id="phys-addr" tabindex="100"  type="text"  value="<?php echo $address ?>" name="address" />
                </p>
                <p>
                  <label for="phys-addr-2">
                    <?php _e('Address 2:', 'event_espresso'); ?>
                  </label>
                  <input size="20" id="phys-addr-2" tabindex="101"  type="text"  value="<?php echo $address2 ?>" name="address2" />
                </p>
                <p>
                  <label for="phys-city">
                    <?php _e('City:', 'event_espresso'); ?>
                  </label>
                  <input size="20" id="phys-city" tabindex="102"  type="text"  value="<?php echo $city ?>" name="city" />
                </p>
                <p>
                  <label for="phys-state">
                    <?php _e('State:', 'event_espresso'); ?>
                  </label>
                  <input size="20" id="phys-state" tabindex="103"  type="text"  value="<?php echo $state ?>" name="state" />
                </p>
                <p>
                  <label for="zip-postal">
                    <?php _e('Zip/Postal Code:', 'event_espresso'); ?>
                  </label>
                  <input size="20" id="zip-postal"  tabindex="104"  type="text"  value="<?php echo $zip ?>" name="zip" />
                </p>
                <p>
                  <label for="phys-country">
                    <?php _e('Country:', 'event_espresso'); ?>
                  </label>
                  <input size="20" id="phys-country" tabindex="105"  type="text"  value="<?php echo $country ?>" name="country" />
                </p>
                <p>
                  <?php _e('Google Map Link (for email):', 'event_espresso'); ?>
                  <br />
                  <?php echo $google_map_link; ?> </p>
              </fieldset></td>
              <td <?php echo $ven_type; ?>>
            
              <fieldset>
            
            <legend>
            <?php _e('Venue Information', 'event_espresso'); ?>
            </legend>
            <p>
              <label for="ven-title">
                <?php _e('Title:', 'event_espresso'); ?>
              </label>
              <input size="20"id="ven-title" tabindex="106"  type="text"  value="<?php echo $venue_title ?>" name="venue_title" />
            </p>
            <p>
              <label for="ven-website">
                <?php _e('Website:', 'event_espresso'); ?>
              </label>
              <input size="20" id="ven-website" tabindex="107"  type="text"  value="<?php echo $venue_url ?>" name="venue_url" />
            </p>
            <p>
              <label for="ven-phone">
                <?php _e('Phone:', 'event_espresso'); ?>
              </label>
              <input size="20" id="ven-phone" tabindex="108"  type="text"  value="<?php echo $venue_phone ?>" name="venue_phone" />
            </p>
            <p>
              <label for="ven-image">
                <?php _e('Image:', 'event_espresso'); ?>
              </label>
              <input size="20" id="ven-image" tabindex="110"  type="text"  value="<?php echo $venue_image ?>" name="venue_image" />
            </p>
            <?php } ?>
              </td>
            
            <td <?php echo $ven_type ?>><fieldset id="virt-location">
                <legend>
                <?php _e('Virtual Location', 'event_espresso'); ?>
                </legend>
                <p>
                  <label for="virt-phone">
                    <?php _e('Phone:', 'event_espresso'); ?>
                  </label>
                  <input size="20" id="virt-phone" type="text" tabindex="111" value="<?php echo $phone ?>" name="phone" />
                </p>
                <p>
                  <label for="url-event">
                    <?php _e('URL of Event:', 'event_espresso'); ?>
                  </label>
                  <textarea id="url-event" cols="30" rows="4" tabindex="112"  name="virtual_url"><?php echo $virtual_url ?></textarea>
                </p>
                <p>
                  <label for="call-in-num">
                    <?php _e('Call in Number:', 'event_espresso'); ?>
                  </label>
                  <input id="call-in-num" size="20" tabindex="113"  type="text"  value="<?php echo $virtual_phone ?>" name="virtual_phone" />
                </p>
              </fieldset></td>
              </tr>
            
          </table>
        </div>
      </div>
      <!-- /event-location-->
      <?php if ($espresso_premium == true) { ?>
      <div id="event-meta" class="postbox">
        <div class="handlediv" title="Click to toggle"><br>
        </div>
        <h3 class="hndle"> <span>
          <?php _e('Event Meta', 'event_espresso'); ?>
          </span> </h3>
        <div class="inside">
          <?php event_espresso_meta_edit($event_meta); ?>
        </div>
      </div>
      <?php } ?>
      <!-- /event-meta-->
      <div id="confirmation-email" class="postbox">
        <div class="handlediv" title="Click to toggle"><br />
        </div>
        <h3 class="hndle"> <span>
          <?php _e('Email Confirmation:', 'event_espresso') ?>
          </span> </h3>
        <div class="inside">
          <div id="emaildescriptiondivrich" class="postarea">
            <div class="email-conf-opts">
              <p><?php echo __('Send custom confirmation emails for this event?', 'event_espresso') . ' ' . select_input('send_mail', $values, $send_mail); ?> <?php echo '<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_info"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/question-frame.png" width="16" height="16" /></a>'; ?></p>
              <p>
                <?php _e('Use a ', 'event_espresso'); ?>
                <a href="admin.php?page=event_emails" target="_blank">
                <?php _e('pre-existing email', 'event_espresso'); ?>
                </a>? <?php echo espresso_db_dropdown('id', 'email_name', EVENTS_EMAIL_TABLE, 'email_name', $email_id, 'desc') . ' <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=email_manager_info"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/question-frame.png" width="16" height="16" /></a>'; ?> </p>
              <br />
              <em>OR</em>
              <p>
                <?php _e('Create a custom email:', 'event_espresso') ?>  <?php echo '<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=event_custom_emails"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/question-frame.png" width="16" height="16" /></a>'; ?>
                </p>
            </div>
            <div class="visual-toggle">
              <p><a class="toggleVisual">
                <?php _e('Visual', 'event_espresso'); ?>
                </a> <a class="toggleHTML">
                <?php _e('HTML', 'event_espresso'); ?>
                </a></p>
            </div>
            <div class="postbox">
              <textarea name="conf_mail" class="theEditor" id="conf_mail"><?php echo espresso_admin_format_content($conf_mail); ?></textarea>
              <table id="email-confirmation-form" cellspacing="0">
                <tr>
                  <td class="aer-word-count"></td>
                  <td class="autosave-info"><span><a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_info">
                    <?php _e('View Custom Email Tags', 'event_espresso'); ?>
                    </a> | <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_example">
                    <?php _e('Email Example', 'event_espresso'); ?>
                    </a></span></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- /confirmation-email-->
      <?php
                if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/event-management/edit_event_post.php')) {
                    require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "includes/admin-files/event-management/edit_event_post.php");
                }
                ?>
    </div>
    <!-- /normal-sortables--> 
  </div>
  <!-- /post-body-content -->
  <?php include_once('create_events_help.php'); ?>
</div>

<!-- /post-body -->
<input type="hidden" name="edit_action" value="update">
<input type="hidden" name="date_submitted" value="<?php echo $date_submitted; ?>">
<input type="hidden" name="recurrence_id" value="<?php echo $recurrence_id; ?>">
<input type="hidden" name="action" value="edit">
<input type="hidden" name="event_id" value="<?php echo $event_id ?>">
<script type="text/javascript" charset="utf-8">
        //<![CDATA[
        jQuery(document).ready(function() {

            postboxes.add_postbox_toggles('events');

            jQuery(".datepicker" ).datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: "yy-mm-dd",
                showButtonPanel: true
            }); // close doc.ready
        
        		var header_clicked = false;
        		jQuery('#upload_image_button').click(function() {
	            formfield = jQuery('#upload_image').attr('name');
	            tb_show('', 'media-upload.php?type=image&amp;TB_iframe=1');
			         header_clicked = true;
	            return false;
	           });
	 
		         window.original_send_to_editor = window.send_to_editor;
		
	          window.send_to_editor = function(html) {
         		if(header_clicked) {
	            imgurl = jQuery('img',html).attr('src');
	            jQuery('#' + formfield).val(imgurl);
		           header_clicked = false;
						
		         //jQuery('#event_thumbnail').val(imgurl);
						
		         //jQuery('#featured-image').append("<p><img src='"+imgurl+"' alt='' /></p>")
							
	           tb_remove();
		          } else{
		           window.original_send_to_editor(html);
		          }
	          }
	
					});				
    //]]>
    </script>
<?php
    espresso_tiny_mce();
}

