<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
//Add/Delete/Edit Events
require_once('event_functions.php');
require_once("event_list.php");

function event_espresso_manage_events() {
    ?>
    <div id="event_overview" class="wrap meta-box-sortables ui-sortable">
        <div id="event_reg_theme" class="wrap">
            <div id="icon-options-event" class="icon32"></div>
            <h2>
                <?php
             
                    _e('Event Overview', 'event_espresso');
                    if (isset($_REQUEST['action']) && ($_REQUEST['action'] == 'edit' || $_REQUEST['action'] == 'add_new_event')) {

                    } else {
                        echo '<a href="admin.php?page=events&amp;action=add_new_event" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Event', 'event_espresso') . '</a>';
                    }
                ?>
            </h2>
            <?php
            global $wpdb, $org_options;
            if (isset($_REQUEST['action'])) {
                switch ($_REQUEST['action']) {
                    case ( 'copy_event' ):
                        require_once("copy_event.php");
                        copy_event();
                        break;
                    case ( 'delete' ):
                        //This function is called from the "/functions/admin.php" file.
                        event_espresso_delete_event();
                        break;
                    case ( 'delete_recurrence_series' ):

                        $r = $wpdb->get_results("SELECT id FROM " . EVENTS_DETAIL_TABLE . " ed
                                    WHERE recurrence_id = " . $_REQUEST['recurrence_id']);

                        if ($wpdb->num_rows > 0) {

                            foreach ($r as $row) {

                                event_espresso_delete_event($row->id);
                            }
                        }
                        break;
                    case ( 'csv_import' ):
                        require_once ('csv_import.php');
                        csv_import();
                        break;
                    case ( 'add' ):
                        require_once("insert_event.php");
                        add_event_to_db();
                        break;
                }
            }

            //Update the event
            if (isset($_REQUEST['edit_action']) && $_REQUEST['edit_action'] == 'update') {
                require_once("update_event.php");
                update_event();
            }
            //If we need to add or edit a new event then we show the add or edit forms
            if (isset($_REQUEST['action']) && ($_REQUEST['action'] == 'add_new_event' || $_REQUEST['action'] == 'edit')) {
                ?>
                <form name="form" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
                    <div id="poststuff" class="metabox-holder has-right-sidebar">
                        <?php
                        if ($_REQUEST['action'] == 'edit') {//show the edit form
                            require_once("edit_event.php");
                            edit_event($_REQUEST['event_id']);
                        } else {//Show the add new event form
                            require_once("add_new_event.php");
                            add_new_event();
                        }
                        ?>
                        <br class="clear" />
                    </div>
                    <!-- /poststuff -->
                </form>
                <!-- /event_reg_theme -->
                <?php
            } else {
                //If we are not adding or editing an event then show the list of events
                event_espresso_edit_list();
            }
//Do not remove anything below this line. These are the info box popups.
            ?></div>
    </div>
    <div id="email_manager_info" style="display:none">
        <h2><?php _e('Pre-existing Emails', 'event_espresso'); ?></h2>
        <p><?php _e('These emails will override the custom email if a pre-existing email is selected. You must select "Yes" in the "Send custom confirmation emails for this event?" above.', 'event_espresso'); ?></p>
    </div>
    <div id="coupon_code_info" style="display:none">
        <h2><?php _e('Coupon/Promo Code', 'event_espresso'); ?></h2><p><?php _e('This is used to apply discounts to events.', 'event_espresso'); ?></p><p><?php _e('A coupon or promo code could can be anything you want. For example: Say you have an event that costs', 'event_espresso'); ?> <?php echo $org_options['currency_symbol'] ?>200. <?php _e('If you supplied a promo like "PROMO50" and entered 50.00 into the "Discount w/Promo Code" field your event will be discounted', 'event_espresso'); ?>  <?php echo $org_options['currency_symbol'] ?>50.00, <?php _e('Bringing the cost of the event to', 'event_espresso'); ?> <?php echo $org_options['currency_symbol'] ?>150.</p>
    </div>
    <div id="unique_id_info" style="display:none">
        <h2><?php _e('Event Identifier', 'event_espresso'); ?></h2><p><?php _e('This should be a unique identifier for the event. Example: "Event1" (without qoutes.)</p><p>The unique ID can also be used in individual pages using the', 'event_espresso'); ?> [SINGLEEVENT single_event_id="<?php _e('Unique Event ID', 'event_espresso'); ?>"] <?php _e('shortcode', 'event_espresso'); ?>.</p>
    </div>
    <div id="secondary_info" style="display:none">
        <h2><?php _e('Waitlist Events', 'event_espresso'); ?></h2>
        <p><?php _e('These types of events can be used as a overflow or waiting list events.', 'event_espresso'); ?></p>
        <p><?php _e('If an event is set up as an "Waitlist Event," it can be set to not appear in your event listings template. You may need to customize your event_listing.php file to make this work. For more information, please', 'event_espresso'); ?> <a href="http://eventespresso.com/forums/?p=512" target="_blank"><?php _e('visit the forums', 'event_espresso'); ?></a>.
    </div>
    <div id="external_URL_info" style="display:none">
        <h2><?php _e('Off-site Registration Page', 'event_espresso'); ?></h2>
        <p><?php _e('If an off-site registration page is entered, it will override your registration page and send attendees to the URL that is entered.', 'event_espresso'); ?></p>
    </div>
    <div id="alt_email_info" style="display:none">
        <h2><?php _e('Alternate Email Address', 'event_espresso'); ?></h2>
        <p><?php _e('If an alternate email address is entered. Admin email notifications wil be sent to this address instead.', 'event_espresso'); ?></p>
    </div>
    <div id="status_types_info" style="display:none;">
        <h2><?php _e('Event Status Types', 'event_espresso'); ?></h2>
        <ul>
            <li><strong><?php _e('Primary', 'event_espresso'); ?></strong><br /><?php _e('This type if event should always appear in the event lsiting. It is a live event (not deleted, ongoing or secondary.)', 'event_espresso'); ?></li>
            <li><strong><?php _e('Waitlist', 'event_espresso'); ?></strong><br /><?php _e('This type of event can be hidden and used as a waiting list for a primary event. Template customizations may be required. For more information, please', 'event_espresso'); ?> <a href="http://eventespresso.com/forums/?p=512" target="_blank"><?php _e('visit the forums', 'event_espresso'); ?></a></li>
            <li><strong><?php _e('Ongoing', 'event_espresso'); ?></strong><br /><?php _e('This type of an event can be set to appear in your event listings and display a registration page. Template customizations are required. For more information, please', 'event_espresso'); ?> <a href="http://eventespresso.com/forums/?p=518" target="_blank"><?php _e('visit the forums', 'event_espresso'); ?></a></li>
            <li><strong><?php _e('Deleted', 'event_espresso'); ?></strong><br /><?php _e('This is event type will not appear in the event listings and will not dispaly a registrations page. Deleted events can still be accessed in the', 'event_espresso'); ?> <a href="admin.php?page=events"><?php _e('Attendee Reports', 'event_espresso'); ?></a> <?php _e('page', 'event_espresso'); ?>.</li>
        </ul>
    </div>
    <?php
    echo event_espresso_custom_email_info();
}
