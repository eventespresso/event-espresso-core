<?php

function event_espresso_support() {
    ?>

    <div class="wrap">
        <div id="icon-options-event" class="icon32"></div>
        <h2>
            <?php _e('Help and Support', 'event_espresso'); ?>
        </h2>
        <?php
        if(isset($_REQUEST['action'])) {
            switch ($_REQUEST['action']) {
                case "update_event_dates":
                    update_event_data();
                    break;
                case "event_espresso_update_attendee_data":
                    event_espresso_update_attendee_data();
                    break;
            }
        }
        ?>
        <div id="poststuff" class="metabox-holder has-right-sidebar">
    <?php event_espresso_display_right_column(); ?>
            <div id="post-body">
                <div id="post-body-content">
                    <ul id="event_espresso-sortables">
                        <li>
                            <div class="metabox-holder">
                                <div class="postbox">
                                    <h3>
    <?php _e('Contact Support', 'event_espresso'); ?>
                                    </h3>

                                    <div class="padding">
                                        <p>
    <?php _e('If you are having any problems that are not discussed here, suggestions, comments or gripes please visit the', 'event_espresso'); ?>
                                            <a href="http://eventespresso.com/forums/"><?php _e('Event Espresso forums', 'event_espresso'); ?></a>

    <?php _e('or feel free to send us an', 'event_espresso'); ?>
                                            <a href="http://eventespresso.com/contact/"><?php _e('email', 'event_espresso'); ?></a>.</p>
                                        <h4>
    <?php _e('Premium Support Options', 'event_espresso'); ?>
                                        </h4>
                                        <p>
    <?php _e('We offer premium support to customers who desire or require a level of support beyond the complimentary support included with all Event Espresso products.', 'event_espresso'); ?>
                                        </p>
                                        <p><strong>
    <?php _e('Support Tokens', 'event_espresso'); ?>
                                            </strong></p>
                                        <p>
    <?php _e('A support token can be used to get priority support for a single  incident. It can be used to schedule support via phone or IM for a  single incident (up to 30 minutes), or to receive priority e-mail  support. A support token can be used for &ldquo;how to&rdquo; questions, technical  issues, &ldquo;best practice&rdquo; questions or for custom development consulting. A  support token consists of the PayPal Transaction ID you received from  PayPal at the time of your purchase.', 'event_espresso'); ?>
                                        </p>
                                        <p>
    <?php _e('<strong>You can purchase support tokens</strong> on the <a href="http://eventespresso.com/support/premium-support-options/">Premium Support page</a>. Tokens can be purchased one at a time, or in blocks of three at a discount.', 'event_espresso'); ?>
                                        </p>
                                        <p>Support tokens can be used to schedule live support (phone or IM) or for priority e-mail support. See <a href="http://eventespresso.com/support/">details on premium support</a>.</p><p><strong>1 Premium Support Token</strong><br> Single incident, up to 30 minutes of live support or priority e-mail support.</p><p>Price: $65.00 <a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;i=1TOKEN&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_add_to_cart.gif" alt="Add to Cart" border="0"></a></p><p><strong>3 Premium Support Tokens</strong><br> Up to 90 minutes of live support or priority e-mail support.</p><p>Price: $150.00 <a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;i=3TOKENS&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_add_to_cart.gif" alt="Add to Cart" border="0"></a></p><p><strong>Basic Install</strong><br>
                                            Includes plugin installation and setting up basic pages for the plugin.</p><p>Price: $35.00 <a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;i=BASICINSTALL&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_add_to_cart.gif" alt="Add to Cart" border="0"></a></p><p><strong>Basic Install with Configuration</strong><br> Includes configuration and testing Payment Gateway's .</p><p>Price: $65.00 <a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;i=INSTALLCONFIG&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_add_to_cart.gif" alt="Add to Cart" border="0"></a></p><p><strong>Consulting (1 hour)</strong><br> Developer support and implementation consulting for the Advanced Events Registration plugin for WordPress.</p><p>Price: $135.00 <a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;i=1HRCONSULT&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_add_to_cart.gif" alt="Add to Cart" border="0"></a></p><p>* Requirements for installation service:</p><ul><li> The server must be accessible over the internet.</li><li> The server must meet the server requirements (for Advanced Events Registration).</li><li> You must be able to provide a FTP/SFTP username and password. A MySQL database name, username and password is needed for a Basic Install. A WordPress admin user name, password, and login URL.</li></ul><p><a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_view_cart.gif" alt="View Cart" border="0"></a><br> <script type="text/javascript">//
                                                function EJEJC_lc(th) { return false; }
                                                // ]]&gt;</script><br> <script src="http://www.e-junkie.com/ecom/box.js" type="text/javascript"></script></p>

                                    </div>
                                </div>
                            </div>
                        </li>
                        <li> </li>
                        <li>
                            <div class="metabox-holder">
                                <div class="postbox">
                                    <h3>
    <?php _e('Installation', 'event_espresso'); ?>
                                    </h3>

                                    <div class="padding">
                                        <p>For the latest installation instructions please visit: <a href="http://eventespresso.com/support/installation/" target="_blank">http://eventespresso.com/support/installation/</a></p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="metabox-holder">
                                <div class="postbox">
                                    <h3>
    <?php _e('Trouble Shooting and Frequently Asked Questions', 'event_espresso'); ?>
                                    </h3>

                                    <div class="padding">
                                        <p><strong>
                                            <?php _e('Registration page just refreshes?', 'event_espresso'); ?>
                                            </strong><br />
                                            <?php _e('Usually its because you need to point the &quot;Main registration page:&quot; (in the Organization Settings page) to whatever page you have the shortcode', 'event_espresso'); ?>
                                            [ESPRESSO_EVENTS]
    <?php _e('on', 'event_espresso'); ?>
                                            .</p>
                                        <p><strong><?php _e('Paypal IPN Problem?', 'event_espresso'); ?></strong><br />
    <?php _e('Four things to check with PayPal when payments notifications are not being sent to Event Espresso.', 'event_espresso'); ?></p>
                                        <ol><li><?php _e('Make sure you have a standard or a business PayPal account, personal accounts don\'t work.', 'event_espresso'); ?>
                                            </li><li><?php _e('Turn on your IPN.', 'event_espresso'); ?></li>
                                            <li> <?php _e('Make sure your PayPal account is verified.', 'event_espresso'); ?></li>
                                            <li><?php _e('Make sure your Event Espresso pages are not protected or private.', 'event_espresso'); ?></li></ol>
                                        More information can be found here:<br />
                                        <a href="http://eventespresso.com/forums/?submit.x=0&submit.y=0&s=ipn" target="_blank"> http://eventespresso.com/forums/?submit.x=0&submit.y=0&s=ipn</a>
                                        <p><strong><?php _e('Why are mails are not being sent when somone registers?', 'event_espresso'); ?></strong><br />
    <?php _e('Check your email settings on the', 'event_espresso'); ?> <a href="admin.php?page=event_espresso#email-settings">Event Espresso > General Settings > Email Settings</a> page<br />
                                            <img src="http://ee-updates.s3.amazonaws.com/images/email-settings.png" width="472" height="120" /></p><p><?php _e('If you\'re using WP SMTP with Gmail, also check your spam box to make sure Gmail isn\'t filtering the confirmation emails as spam.', 'event_espresso'); ?>
                                        </p>
                                        <p><strong>
                                            <?php _e('Problems after upgrading?', 'event_espresso'); ?>
                                            </strong><br />
    <?php _e('If you have just upgraded  from  the free version of this plugin, your event dates, times, and categories may be out of order, missing, showing an error, or are wrong.  Pressing the &quot;Run Upgrade Script&quot; button below should fix all of these problems.', 'event_espresso'); ?>
                                        </p>
                                        <form action="<?php echo $_SERVER["REQUEST_URI"] ?>" method="post" name="form" id="form">
                                            <p>
                                                <input type="hidden" name="action" value="update_event_dates" />
                                                <input class="button-primary" type="submit" name="update_event_dates_button" value="<?php _e('Run Upgrade Script', 'event_espresso'); ?>" id="update_event_dates"/>
                                            </p>
                                        </form>
                                        <p>
                                        <?php _e('If you have clicked the button above and event dates that should be expired, are showing an error or seem to be out of order. Go into the &quot;<a href="admin.php?page=events">Event Management</a>&quot; page and click the &quot;Edit this Event&quot; button then click the &quot;Update Event&quot; button on each event that is displaying the wrong date(s). This process should fix the problem. If it doesn\'t then send a support request using the help and support button above.', 'event_espresso'); ?>
                                        </p>
                                        <?php
                                        if (event_espresso_verify_attendee_data() == true) {
                                            ?>
                                            <a name="attendee_data" id="attendee_data"></a>
                                            <p class="red_text"><strong>
        <?php _e('Attendee information is outdated', 'event_espresso'); ?>
                                                </strong></p>
                                            <p>
        <?php _e('Due to recent changes in the way attendee information is handled, attendee data may appear to be missing from some events. In order to reassign attendees to events, please run the attendee update script by pressing the button below.', 'event_espresso'); ?>
                                            </p>
                                            <form action="<?php echo $_SERVER["REQUEST_URI"] ?>" method="post" name="form" id="form">
                                                <p>
                                                    <input type="hidden" name="action" value="event_espresso_update_attendee_data" />
                                                    <input class="button-primary" type="submit" name="event_espresso_update_attendee_data_button" value="<?php _e('Run Attendee Update Script', 'event_espresso'); ?>" id="event_espresso_update_attendee_data_button"/>
                                                </p>
                                            </form>
                                            <?php
                                        }
                                        ?>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
    <?php
}

function update_event_data() {
    global $wpdb;
    $wpdb->show_errors();
    $event_dates = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE start_date = '' OR start_date LIKE '%--%' OR end_date = '' OR end_date LIKE '%--%'");
    foreach ($event_dates as $event_date) {
        $event_id = $event_date->id;
        $start_month = $event_date->start_month;
        $start_day = $event_date->start_day;
        $start_year = $event_date->start_year;
        $end_month = $event_date->end_month;
        $end_day = $event_date->end_day;
        $end_year = $event_date->end_year;

        if ($start_month == "Jan" || $start_month == "January") {
            $month_no = '01';
        }
        if ($start_month == "Feb" || $start_month == "February") {
            $month_no = '02';
        }
        if ($start_month == "Mar" || $start_month == "March") {
            $month_no = '03';
        }
        if ($start_month == "Apr" || $start_month == "April") {
            $month_no = '04';
        }
        if ($start_month == "May" || $start_month == "May") {
            $month_no = '05';
        }
        if ($start_month == "Jun" || $start_month == "June") {
            $month_no = '06';
        }
        if ($start_month == "Jul" || $start_month == "July") {
            $month_no = '07';
        }
        if ($start_month == "Aug" || $start_month == "August") {
            $month_no = '08';
        }
        if ($start_month == "Sep" || $start_month == "September") {
            $month_no = '09';
        }
        if ($start_month == "Oct" || $start_month == "October") {
            $month_no = '10';
        }
        if ($start_month == "Nov" || $start_month == "November") {
            $month_no = '11';
        }
        if ($start_month == "Dec" || $start_month == "December") {
            $month_no = '12';
        }
        $start_date = $start_year . "-" . $month_no . "-" . $start_day;

        if ($end_month == "Jan" || $end_month == "January") {
            $end_month_no = '01';
        }
        if ($end_month == "Feb" || $end_month == "February") {
            $end_month_no = '02';
        }
        if ($end_month == "Mar" || $end_month == "March") {
            $end_month_no = '03';
        }
        if ($end_month == "Apr" || $end_month == "April") {
            $end_month_no = '04';
        }
        if ($end_month == "May" || $end_month == "May") {
            $end_month_no = '05';
        }
        if ($end_month == "Jun" || $end_month == "June") {
            $end_month_no = '06';
        }
        if ($end_month == "Jul" || $end_month == "July") {
            $end_month_no = '07';
        }
        if ($end_month == "Aug" || $end_month == "August") {
            $end_month_no = '08';
        }
        if ($end_month == "Sep" || $end_month == "September") {
            $end_month_no = '09';
        }
        if ($end_month == "Oct" || $end_month == "October") {
            $end_month_no = '10';
        }
        if ($end_month == "Nov" || $end_month == "November") {
            $end_month_no = '11';
        }
        if ($end_month == "Dec" || $end_month == "December") {
            $end_month_no = '12';
        }
        $end_date = $end_year . "-" . $end_month_no . "-" . $end_day;

        $sql_dates = "UPDATE " . EVENTS_DETAIL_TABLE . " SET start_date='" . $start_date . "', end_date='" . $end_date . "' WHERE id = '" . $event_id . "'";
        if (!$wpdb->query($sql_dates)) {
            $error = true;
        }
    }
    //Change fields that have 'yes' and 'no' values to 'Y' and 'N' values
    $events_Y = $wpdb->get_results("SELECT id FROM " . EVENTS_DETAIL_TABLE . " WHERE is_active = 'yes' OR is_active = 'Yes'");
    foreach ($events_Y as $event_Y) {
        $event_id = $event_Y->id;
        $is_active = "Y";
        $update_events_Y = "UPDATE " . EVENTS_DETAIL_TABLE . " SET is_active = '" . $is_active . "' WHERE id = '" . $event_id . "'";
        if (!$wpdb->query($update_events_Y)) {
            $error = true;
        }
    }

    $events_N = $wpdb->get_results("SELECT id FROM " . EVENTS_DETAIL_TABLE . " WHERE is_active = 'no' OR is_active = 'No'");
    foreach ($events_N as $event_N) {
        $event_id = $event_N->id;
        $is_active = "N";
        $update_events_N = "UPDATE " . EVENTS_DETAIL_TABLE . " SET is_active = '" . $is_active . "' WHERE id = '" . $event_id . "'";
        if (!$wpdb->query($update_events_N)) {
            $error = true;
        }
    }
    //End change fields that have 'yes' and 'no' values to 'Y' and 'N' values
    //This section copies the current prices, discounts, and event times from events and places them in their respective tables.
    $wpdb->get_results("SELECT id FROM " . EVENTS_DISCOUNT_CODES_TABLE);
    $disc_codes_num_rows = $wpdb->num_rows;

    $wpdb->get_results("SELECT id FROM " . EVENTS_START_END_TABLE);
    $times_num_rows = $wpdb->num_rows;

    $wpdb->get_results("SELECT id FROM " . EVENTS_PRICES_TABLE);
    $prices_num_rows = $wpdb->num_rows;

    $events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE);
    foreach ($events as $event) {
        $event_id = $event->id;
        $end_time = $event->end_time;
        $start_time = $event->start_time;
        $coupon_code = $event->coupon_code;
        $coupon_code_price = $event->coupon_code_price;
        $use_percentage = $event->use_percentage;
        $event_cost = $event->event_cost;
        if ($times_num_rows == 0) {
            $sql_times = "INSERT INTO " . EVENTS_START_END_TABLE . " (event_id, start_time, end_time) VALUES ('" . $event_id . "', '" . $start_time . "', '" . $end_time . "')";
            //echo "$sql_times <br>";
            if (!$wpdb->query($sql_times)) {
                $error = true;
            }
        }

        if ($disc_codes_num_rows == 0) {
            if ($coupon_code != '') {
                $sql_disc = "INSERT INTO " . EVENTS_DISCOUNT_CODES_TABLE . " (coupon_code, coupon_code_price, use_percentage) VALUES ('" . $coupon_code . "', '" . $coupon_code_price . "', '" . $use_percentage . "')";
                echo "$sql_disc <br>";
                if (!$wpdb->query($sql_disc)) {
                    $error = true;
                }

                //Copy the discount codes to the relationship tables
                $discount_id = $wpdb->insert_id;
                $sql_disc_rel = "INSERT INTO " . EVENTS_DISCOUNT_REL_TABLE . " (event_id, discount_id) VALUES ('" . $event_id . "', '" . $discount_id . "')";
                echo "$sql_disc_rel <br>";
                if (!$wpdb->query($sql_disc_rel)) {
                    $error = true;
                }
            }
        }

        if ($prices_num_rows == 0) {
            if ($event_cost != '') {
                $sql_price = "INSERT INTO " . EVENTS_PRICES_TABLE . " (event_id, event_cost) VALUES ('" . $event_id . "', '" . $event_cost . "')";
                //echo "$sql_price <br>";
                if (!$wpdb->query($sql_price)) {
                    $error = true;
                }
            }
        }
    }

    if ($error != true) {
        ?>
        <div id="message" class="updated fade">
            <p><strong>
        <?php _e('Event data has been updated!', 'event_espresso'); ?>
                </strong></p>
        </div>
    <?php } else { ?>
        <div id="message" class="error">
            <p><strong>
                    <?php _e('There was an error in your submission, please try again.', 'event_espresso'); ?>
        <?php $wpdb->print_error(); ?>
                    .</strong></p>
        </div>
        <?php
    }
}
