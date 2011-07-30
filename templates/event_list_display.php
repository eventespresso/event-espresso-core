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
$status = event_espresso_get_is_active($event_id);
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
<div id="event_data-<?php echo $event_id ?>" class="event_data <?php echo $css_class; ?> <?php echo $category_identifier; ?> event-data-display">
    <h3 id="event_title-<?php echo $event_id ?>" class="event_title"><a title="<?php echo stripslashes_deep($event_name) ?>" class="a_event_title" id="a_event_title-<?php echo $event_id ?>" href="<?php echo $registration_url; ?>"><?php echo stripslashes_deep($event_name) ?></a>
<?php /* These are custom messages that can be displayed based on the event status. Just un-comment the one you want to use. */ ?>
        <?php //echo $status_display; //Turn this on to display the overall status of the event.  ?>
        <?php //echo $status_display_ongoing; //Turn this on to display the ongoing message. ?>
        <?php //echo $status_display_deleted; //Turn this on to display the deleted message. ?>
        <?php //echo $status_display_secondary; //Turn this on to display the waitlist message. ?>
        <?php //echo $status_display_reg_closed; //Turn this on to display the registration closed message. ?>
        <?php //echo $status_display_not_open; //Turn this on to display the secondary message. ?>
        <?php //echo $status_display_open; //Turn this on to display the not open message. ?>
        <?php //echo $status_display_custom_closed; //Turn this on to display the closed message. ?>
    </h3>
        <?php /* Venue details. Un-comment to display. */ ?>
    <?php //echo $venue_title != ''?'<p id="event_venue_name-'.$event_id.'" class="event_venue_name">'.stripslashes_deep($venue_title).'</p>':'' ?>
    <?php //echo $venue_address != ''?'<p id="event_venue_address-'.$event_id.'" class="event_venue_address">'.stripslashes_deep($venue_address).'</p>':''?>
    <?php //echo $venue_address2 != ''?'<p id="event_venue_address2-'.$event_id.'" class="event_venue_address2">'.stripslashes_deep($venue_address2).'</p>':''?>
    <?php //echo $venue_city != ''?'<p id="event_venue_city-'.$event_id.'" class="event_venue_city">'.stripslashes_deep($venue_city).'</p>':''?>
    <?php //echo $venue_state != ''?'<p id="event_venue_state-'.$event_id.'" class="event_venue_state">'.stripslashes_deep($venue_state).'</p>':''?>
    <?php //echo $venue_zip != ''?'<p id="event_venue_zip-'.$event_id.'" class="event_venue_zip">'.stripslashes_deep($venue_zip).'</p>':''?>
    <?php //echo $venue_country != ''?'<p id="event_venue_country-'.$event_id.'" class="event_venue_country">'.stripslashes_deep($venue_country).'</p>':''?>

    <p id="p_event_price-<?php echo $event_id ?>" class="event_price">
				<span class="section-title"><?php echo __('Price: ', 'event_espresso')?></span> <?php echo event_espresso_get_price($event_id); ?>
    </p>

    <p id="event_date-<?php echo $event_id ?>"><span class="section-title"><?php _e('Start Date:', 'event_espresso'); ?></span>  <?php echo event_date_display($start_date, get_option('date_format')) ?></p><p><span class="section-title"> <?php _e('End Date:', 'event_espresso'); ?></span> <?php echo event_date_display($end_date, get_option('date_format')) ?></p>

<?php
//Show short descriptions
if ($event_desc != '' && isset($org_options['display_short_description_in_event_list']) && $org_options['display_short_description_in_event_list'] == 'Y') {?>
	<p><?php echo stripslashes_deep(wpautop($event_desc)); ?></p>
<?php 
} 
?>

<?php 
if ($location != '' && $org_options['display_address_in_event_list'] == 'Y') { ?>
	<p class="event_address" id="event_address-<?php echo $event_id ?>"><span class="section-title"><?php echo __('Event Address:', 'event_espresso'); ?></span> <br />
		<span class="address-block"><?php echo stripslashes_deep($location); ?><br />
		<?php echo $google_map_link; ?></span>
	</p>
<?php 
}
?>

	<p><?php echo espresso_show_social_media($event_id, 'twitter'); ?> <?php echo espresso_show_social_media($event_id, 'facebook'); ?></p>

    <?php
    $num_attendees = get_number_of_attendees_reg_limit($event_id, 'num_attendees'); //Get the number of attendees. Please visit http://eventespresso.com/forums/?p=247 for available parameters for the get_number_of_attendees_reg_limit() function.
    if ($num_attendees >= $reg_limit) {
        ?>
        <p id="available_spaces-<?php echo $event_id ?>"><span class="section-title"><?php _e('Available Spaces:', 'event_espresso') ?> </span><?php echo get_number_of_attendees_reg_limit($event_id, 'available_spaces', 'All Seats Reserved') ?></p>
<?php 
		if ($overflow_event_id != '0' && $allow_overflow == 'Y') { ?>
            <p id="register_link-<?php echo $overflow_event_id ?>" class="register-link-footer"><a class="a_register_link" id="a_register_link-<?php echo $overflow_event_id ?>" href="<?php echo home_url() ?>/?page_id=<?php echo $event_page_id ?>&regevent_action=register&event_id=<?php echo $overflow_event_id ?>&name_of_event=<?php echo stripslashes_deep($event_name) ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('Join Waiting List', 'event_espresso'); ?></a></p>
<?php
		}
    } else {
		if ($display_reg_form == 'Y'&&$externalURL == '') {
?>			<p id="available_spaces-<?php echo $event_id ?>"><span class="section-title"><?php _e('Available Spaces:', 'event_espresso') ?></span> <?php echo get_number_of_attendees_reg_limit($event_id, 'available_spaces') ?></p>
<?php
		}
		
		/**
		* Load the multi event link.
		**/
				 
		//Un-comment these next lines to check if the event is active
		//echo event_espresso_get_status($event_id);
		//print_r( event_espresso_get_is_active($event_id));
				
		if ($multi_reg && event_espresso_get_status($event_id)=='ACTIVE') {

			$params = array(
			//REQUIRED, the id of the event that needs to be added to the cart
			'event_id' => $event_id,
			//REQUIRED, Anchor of the link, can use text or image
			'anchor' => __("Add to Cart and Add More Events", 'event_espresso'), //'anchor' => '<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/cart_add.png" />',
			//REQUIRED, if not available at this point, use the next line before this array declaration
			// $event_name = get_event_field('event_name', EVENTS_DETAIL_TABLE, ' WHERE id = ' . $event_id);
			'event_name' => $event_name,
			//OPTIONAL, will place this term before the link
			'separator' => __(" or ", 'event_espresso')
			);

			$cart_link= event_espresso_cart_link($params);
		}
		if ($display_reg_form == 'Y') {
?>
            <p id="register_link-<?php echo $event_id ?>" class="register-link-footer">

                <a class="a_register_link" id="a_register_link-<?php echo $event_id ?>" href="<?php echo $registration_url; ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('Register for this Event', 'event_espresso'); ?></a> <?php echo isset($cart_link)&&$externalURL == ''?$cart_link:'';?></p>
                <?php
            } else {
                ?>
            <p id="register_link-<?php echo $event_id ?>" class="register-link-footer">
                <a class="a_register_link" id="a_register_link-<?php echo $event_id ?>" href="<?php echo $registration_url; ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('View Details', 'event_espresso'); ?></a> <?php echo isset($cart_link)&&$externalURL == ''?$cart_link :'';?>
            </p>
            <?php
        }
    }
    ?>
</div>
