<?php
//This is the event list template page.
//This is a template file for displaying an event lsit on a page.
//There should be a copy of this file in your wp-content/uploads/espresso/ folder.
/*
 * use the following shortcodes in a page or post:
 * [EVENT_LIST]
 * [EVENT_LIST limit=1]
 * [EVENT_LIST css_class=my-custom-class]
 * [EVENT_LIST show_expired=true]
 * [EVENT_LIST show_deleted=true]
 * [EVENT_LIST show_secondary=false]
 * [EVENT_LIST show_recurrence=true]
 * [EVENT_LIST category_identifier=your_category_identifier]
 *
 * Example:
 * [EVENT_LIST limit=5 show_recurrence=true category_identifier=your_category_identifier]
 *
 */


//Print out the array of event status options
//print_r (event_espresso_get_is_active($event_id));
//Here we can create messages based on the event status. These variables can be echoed anywhere on the page to display your status message.
$status = event_espresso_get_is_active(0,$event_meta);
$status_display = ' - ' . $status['display_custom'];
$status_display_ongoing = $status['status'] == 'ONGOING' ? ' - ' . $status['display_custom'] : '';
$status_display_deleted = $status['status'] == 'DELETED' ? ' - ' . $status['display_custom'] : '';
$status_display_secondary = $status['status'] == 'SECONDARY' ? ' - ' . $status['display_custom'] : ''; //Waitlist event
$status_display_draft = $status['status'] == 'DRAFT' ? ' - ' . $status['display_custom'] : '';
$status_display_pending = $status['status'] == 'PENDING' ? ' - ' . $status['display_custom'] : '';
$status_display_denied = $status['status'] == 'DENIED' ? ' - ' . $status['display_custom'] : '';
$status_display_expired = $status['status'] == 'EXPIRED' ? ' - ' . $status['display_custom'] : '';
$status_display_reg_closed = $status['status'] == 'REGISTRATION_CLOSED' ? ' - ' . $status['display_custom'] : '';
$status_display_not_open = $status['status'] == 'REGISTRATION_NOT_OPEN' ? ' - ' . $status['display_custom'] : '';
$status_display_open = $status['status'] == 'REGISTRATION_OPEN' ? ' - ' . $status['display_custom'] : '';

//You can also display a custom message. For example, this is a custom registration not open message:
$status_display_custom_closed = $status['status'] == 'REGISTRATION_CLOSED' ? ' - <span class="espresso_closed">' . __('Regsitration is Closed', 'event_espresso') . '</span>' : '';

?>
<div id="event_data-<?php echo $event_id ?>" class="event_data <?php echo $css_class; ?> <?php echo $category_identifier; ?> event-data-display event-list-display event-display-boxes">
    <h2 id="event_title-<?php echo $event_id ?>" class="event_title"><a title="<?php echo stripslashes_deep($event_name) ?>" class="a_event_title" id="a_event_title-<?php echo $event_id ?>" href="<?php echo $registration_url; ?>"><?php echo stripslashes_deep($event_name) ?></a>
        <?php /* These are custom messages that can be displayed based on the event status. Just un-comment the one you want to use. */ ?>
        <?php //echo $status_display; //Turn this on to display the overall status of the event.  ?>
        <?php //echo $status_display_ongoing; //Turn this on to display the ongoing message. ?>
        <?php //echo $status_display_deleted; //Turn this on to display the deleted message. ?>
        <?php //echo $status_display_secondary; //Turn this on to display the waitlist message. ?>
        <?php //echo $status_display_reg_closed; //Turn this on to display the registration closed message. ?>
        <?php //echo $status_display_not_open; //Turn this on to display the secondary message. ?>
        <?php //echo $status_display_open; //Turn this on to display the not open message. ?>
        <?php //echo $status_display_custom_closed; //Turn this on to display the closed message. ?>
    </h2>
    <?php /* Venue details. Un-comment to display. */ ?>
    <?php //echo $venue_title != ''?'<p id="event_venue_name-'.$event_id.'" class="event_venue_name">'.stripslashes_deep($venue_title).'</p>':'' ?>
    <?php //echo $venue_address != ''?'<p id="event_venue_address-'.$event_id.'" class="event_venue_address">'.stripslashes_deep($venue_address).'</p>':''?>
    <?php //echo $venue_address2 != ''?'<p id="event_venue_address2-'.$event_id.'" class="event_venue_address2">'.stripslashes_deep($venue_address2).'</p>':''?>
    <?php //echo $venue_city != ''?'<p id="event_venue_city-'.$event_id.'" class="event_venue_city">'.stripslashes_deep($venue_city).'</p>':''?>
    <?php //echo $venue_state != ''?'<p id="event_venue_state-'.$event_id.'" class="event_venue_state">'.stripslashes_deep($venue_state).'</p>':''?>
    <?php //echo $venue_zip != ''?'<p id="event_venue_zip-'.$event_id.'" class="event_venue_zip">'.stripslashes_deep($venue_zip).'</p>':''?>
    <?php //echo $venue_country != ''?'<p id="event_venue_country-'.$event_id.'" class="event_venue_country">'.stripslashes_deep($venue_country).'</p>':''
    $event->event_cost = empty($event->event_cost) ? '' : $event->event_cost;
    global $org_options, $ee_gmaps_opts;
     
					// EE gmaps needs it's own org_options array populated on a per page basis to enable common queries in gmaps api function
								$ee_gmaps_opts = array(
								'ee_map_width' => $org_options['ee_map_width'],
								'ee_map_height' => $org_options['ee_map_height'],
								'ee_map_zoom' => $org_options['ee_map_zoom'],
								'ee_map_nav_display' => $org_options['ee_map_nav_display'],
								'ee_map_nav_size' => $org_options['ee_map_nav_size'],
								'ee_map_type_control' => $org_options['ee_map_type_control'],
								'ee_map_align' => $org_options['ee_map_align']
								);
					//var_dump($ee_gmaps_opts);   
    
				if(isset($org_options['thunbnail_popup_lists']) && $org_options['thunbnail_popup_lists'] == 'Y') {
				  $thumb_url = '#TB_inline?height=400&width=500&inlineId=event-thumb-detail' . $event_id  ;
						$thickbox_class = ' thickbox';
				}else {
						$thumb_url = $registration_url;
						$thickbox_class = '';
				}
				?>
    <div class="event-meta">
			 <p id="p_event_price-<?php echo $event_id ?>" class="event_price"><span class="section-title"><?php  echo __('Price: ', 'event_espresso'); ?></span> <?php echo  $org_options['currency_symbol'].$event->event_cost; ?></p>

        <p id="event_date-<?php echo $event_id ?>"><span class="section-title"><?php _e('Date:', 'event_espresso'); ?></span>  <?php echo event_date_display($start_date, get_option('date_format')) ?></p>
    </div>
    <?php
//Show short descriptions
    if ($event_desc != '' && isset($org_options['display_short_description_in_event_list']) && $org_options['display_short_description_in_event_list'] == 'Y') {
        ?>
        <div class="event-desc">
            <p><?php echo espresso_format_content($event_desc); ?></p>
        </div>
					
					
	<?php
    }
    ?>
<?php if( isset($event_meta['display_thumb_in_lists']) 
                     && $event_meta['display_thumb_in_lists'] == 'Y' 
																					&& !empty($event_meta['event_thumbnail_url'])){ ?>
					
					<a id="ee-event-list-thumb" class="ee-thumbs<?php echo $thickbox_class ?>" href="<?php echo $thumb_url ?>">
      <span><img src="<?php echo $event_meta['event_thumbnail_url'] ?>" alt="" /></span>
     </a>
     <?php }?>
    
				<?php if ($location != '' && $org_options['display_address_in_event_list'] == 'Y') { ?>
        <p class="event_address" id="event_address-<?php echo $event_id ?>"><span class="section-title"><?php echo __('Address:', 'event_espresso'); ?></span> <br />
            <span class="address-block"><?php echo stripslashes_deep($location); ?>
                <span class="google-map-link"><?php  echo $google_map_link; ?></span></span>
        </p>
								
    <?php } ?>
				
				<?php //print_r($event_meta['enable_for_gmap']); ?>
				
				<?php if(isset($event_meta['enable_for_gmap']) && 'Y' == $event_meta['enable_for_gmap']){ 
						 ee_gmap_display($ee_gmap_location, $event_id); 
					} ?>
				
					
				<?php if( espresso_show_social_media($event_id, 'twitter') || espresso_show_social_media($event_id, 'facebook')  ){ ?>
     <p class="social-media-buttons"><?php echo espresso_show_social_media($event_id, 'twitter'); ?> <?php echo espresso_show_social_media($event_id, 'facebook'); ?></p>
    <?php  } ?>
				
    <?php
    $num_attendees = get_number_of_attendees_reg_limit($event_id, 'num_attendees'); //Get the number of attendees. Please visit http://eventespresso.com/forums/?p=247 for available parameters for the get_number_of_attendees_reg_limit() function.
    if ($num_attendees >= $reg_limit) {
        ?>
        <p id="available_spaces-<?php echo $event_id ?>"><span class="section-title"><?php _e('Available Spaces:', 'event_espresso') ?> </span><?php echo get_number_of_attendees_reg_limit($event_id, 'available_spaces', 'All Seats Reserved') ?></p>
        <?php if ($overflow_event_id != '0' && $allow_overflow == 'Y') { ?>
            <p id="register_link-<?php echo $overflow_event_id ?>" class="register-link-footer"><a class="a_register_link" id="a_register_link-<?php echo $overflow_event_id ?>" href="<?php echo espresso_reg_url($overflow_event_id); ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('Join Waiting List', 'event_espresso'); ?></a></p>
            <?php
        }
    } else {
        if ($display_reg_form == 'Y' && $externalURL == '') {
            ?>			<p id="available_spaces-<?php echo $event_id ?>" class="spaces-available"><span class="section-title"><?php _e('Available Spaces:', 'event_espresso') ?></span> <?php echo get_number_of_attendees_reg_limit($event_id, 'available_spaces') ?></p>
            <?php
        }

        /**
         * Load the multi event link.
         * */
        //Un-comment these next lines to check if the event is active
        //echo event_espresso_get_status($event_id);
        //print_r( event_espresso_get_is_active($event_id));

        if ($multi_reg && event_espresso_get_status($event_id) == 'ACTIVE') {

            $params = array(
                //REQUIRED, the id of the event that needs to be added to the cart
                'event_id' => $event_id,
                //REQUIRED, Anchor of the link, can use text or image
                'anchor' => __("Add to Cart", 'event_espresso'), //'anchor' => '<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/cart_add.png" />',
                //REQUIRED, if not available at this point, use the next line before this array declaration
                // $event_name = get_event_field('event_name', EVENTS_DETAIL_TABLE, ' WHERE id = ' . $event_id);
                'event_name' => $event_name,
                //OPTIONAL, will place this term before the link
                'separator' => __(" or ", 'event_espresso')
            );

            $cart_link = event_espresso_cart_link($params);
        }
        if ($display_reg_form == 'Y') {
            ?>

            <p id="register_link-<?php echo $event_id ?>" class="register-link-footer">
                <a class="a_register_link" id="a_register_link-<?php echo $event_id ?>" href="<?php echo $registration_url; ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('Register for Event', 'event_espresso'); ?></a>
                <?php echo isset($cart_link) && $externalURL == '' ? $cart_link : ''; ?>
            </p>
        <?php } else { ?>
            <p id="register_link-<?php echo $event_id ?>" class="register-link-footer">
                <a class="a_register_link" id="a_register_link-<?php echo $event_id ?>" href="<?php echo $registration_url; ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('View Details', 'event_espresso'); ?></a> <?php echo isset($cart_link) && $externalURL == '' ? $cart_link : ''; ?>
            </p>
        <?php
        }
    }
    ?>
		<?php ######### event list event popup markup ########### ?>
		<div style="display: none;">
   <div id="event-thumb-detail<?php echo $event_id ?>" class="pop-help ee-tb-popups events-lists-popups" >
    <div class="TB-ee-frame">
      <h2 class="tb-ee-event-title"><?php echo stripslashes_deep($event_name) ?> <span class="event-status"><?php echo $status_display ?></span></h2>	
						
						<img class="tb-ee-event-thumb" src="<?php echo $event_meta['event_thumbnail_url'] ?>" alt="" />
						
						<div class="tb-ee-event-desc">
						  <?php echo espresso_format_content($event_desc); ?>
								
						</div>
						<div class="event-dates-times">
						<h4 class="section-title"><?php _e('Event Dates &amp; Times:', 'event_espresso'); ?></h4>
						  <p><span><?php _e('Date:', 'event_espresso'); ?></span>  <?php echo event_date_display($start_date, get_option('date_format')) ?></p>
						</div>
						
						<?php if($venue_address) {?>
						<div class="event-address-block">
						<h4 class="section-title"><?php _e('Venue:', 'event_espresso'); ?></h4>
						<?php if($venue_address) {?>
								<p><?php echo $venue_address ?></p>
						<?php } ?>
						
						<?php if($venue_address2){ ?>
								<p><?php echo $venue_address2  ?></p>
						<?php } ?>
						
						<?php if($venue_city) {?>
								<p><?php echo $venue_city ?></p>
						<?php } ?>
						
						<p class="google-map-link"><?php echo $google_map_link; ?></p>
						
						</div>
						<?php } ?>
				 
					<?php if( espresso_show_social_media($event_id, 'twitter') || espresso_show_social_media($event_id, 'facebook') ){ ?>
      <p class="social-media-buttons"><?php echo espresso_show_social_media($event_id, 'twitter'); ?> <?php echo espresso_show_social_media($event_id, 'facebook'); ?></p>
     <?php  } ?>
						
						<p id="register_link-<?php echo $event_id ?>" class="register-link-footer">
         <a class="a_register_link" id="a_register_link-<?php echo $event_id ?>" href="<?php echo $registration_url; ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('Register for this Event', 'event_espresso'); ?></a>
          <?php echo isset($cart_link) && $externalURL == '' ? $cart_link : ''; ?>
      </p>
				</div>
   </div><!-- / .pop-help -->
  </div><!-- / hide thickbox content -->		

</div>