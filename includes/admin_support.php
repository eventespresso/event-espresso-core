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
                                    <h3><?php _e('Quick Links', 'event_espresso'); ?></h3>
                                    <div class="padding">
                                        <ul>
                                        <li><a href="#install"><?php _e('Installation', 'event_espresso'); ?></a></li>
                                        <li><a href="#shortcodes"><?php _e('Shortcodes', 'event_espresso'); ?></a></li>
                                        <li><a href="#details"><?php _e('Important Information', 'event_espresso'); ?></a></li>
                                        <li><a href="#support"><?php _e('Contact Support', 'event_espresso'); ?></a></li>
                                        
                                        <li><a href="#faq"><?php _e('Frequently Asked Questions', 'event_espresso'); ?></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li><a name="install" id="install"></a>
                            <div class="metabox-holder">
                                <div class="postbox">
                                    <h3><?php _e('Installation', 'event_espresso'); ?></h3>
                                    <div class="padding">
                                        <p><?php _e('For the latest installation instructions please visit:', 'event_espresso'); ?> <a href="http://eventespresso.com/support/installation/" target="_blank">http://eventespresso.com/support/installation/</a></p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="metabox-holder">
                                <div class="postbox"><a name="shortcodes" id="shortcodes"></a>
                                    <h3><?php _e('Shortcodes', 'event_espresso'); ?></h3>
                                    <div class="padding">
                                    <p><?php _e('For more information, please visit:', 'event_espresso'); ?> <br /><a href="http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/" target="_blank">http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/</a></p>
                                    <hr />
                                    <h4><?php _e('Single Events', 'event_espresso'); ?></h4>
                                    <p><?php _e('Displays a single event on a page or post', 'event_espresso'); ?></p>
                                    <p>[SINGLEEVENT single_event_id="your_event_identifier"]</p>
                                    <hr />
                                    <h4><?php _e('Add Events to Cart', 'event_espresso'); ?></h4>
                                    <p><?php _e('Displays an "Add Event to Cart" link that can be added to the event details, page, or post. Requires the <a href="http://eventespresso.com/download/plugins-and-addons/multiple-event-registration/" target="_blank">Multiple Event Registration addon</a>.', 'event_espresso'); ?></p>
                                    <p>[ESPRESSO_CART_LINK]</p>
                                    <p><strong><?php _e('Additonal Examples:', 'event_espresso'); ?></strong></p>
                                    <p>[ESPRESSO_CART_LINK direct_to_cart=1 moving_to_cart="Redirecting to cart..."]<br />
<?php _e('(Used to redirect to the shopping cart page. Must be added to an event description.)', 'event_espresso'); ?></p>
                                    <p>[ESPRESSO_CART_LINK event_id="add_event_id_here" direct_to_cart=1 moving_to_cart="Redirecting to cart..."]<br />
<?php _e('(Same as above, but uses the event_id paramter and can be added to a page or post.)', 'event_espresso'); ?></p>
                                    <hr />
                                    <h4><?php _e('Event List', 'event_espresso'); ?></h4>
                                        <p><?php _e('Returns a list of events', 'event_espresso'); ?></p>
                                        <p>[EVENT_LIST]<br>
                                        [EVENT_LIST limit=1]<br>
                                        [EVENT_LIST show_expired=true]<br>
                                        [EVENT_LIST show_deleted=true]<br>
                                        [EVENT_LIST show_secondary=true]<br>
                                        [EVENT_LIST show_recurrence=true]<br>
                                        
                                        [EVENT_LIST category_identifier=your_category_identifier]<br>
                                        [EVENT_LIST order_by=date(start_date),id]</p>
                                        <p><strong><?php _e('Order by parameters:', 'event_espresso'); ?><br>
                                        </strong><?php _e('(comma separated)', 'event_espresso'); ?></p>
                                        <p>id<br>
                                        date(start_date)<br>
                                        date(end_date)<br>
                                        event_name<br>
                                        date(registration_start)<br>
                                        
                                        date(registration_end)<br>
                                        city<br>
                                        state<br>
                                        category_id<br>
                                        venue_title</p>
                                        <p class="yellow_alert"><strong><?php _e('Attention:', 'event_espresso'); ?></strong><br /><?php _e('The [EVENT_LIST] shortcode should not be used as a replacement for the [ESPRESSO_EVENTS] shortcode. Replacing the [ESPRESSO_EVENTS] shortcode will break your registration pages.', 'event_espresso'); ?></p>
										<hr />
                                        <h4><?php _e('Attendee Listings', 'event_espresso'); ?></h4>
                                        <p>[LISTATTENDEES]<br>
                                        [LISTATTENDEES limit="30"] //Number of events to show on the page<br>
                                        [LISTATTENDEES show_expired="true"] //Show expired events<br>
                                        [LISTATTENDEES show_deleted="true"] //Show deleted events<br>
                                        
                                        [LISTATTENDEES show_secondary="true"] //Show secondary/backup events<br>
                                        [LISTATTENDEES show_gravatar="true"] //Show a Gravatar of the attendee<br>
                                        [LISTATTENDEES show_recurrence="false"] //Exclude recurring events<br>
                                        [LISTATTENDEES event_identifier="your_event_identifier"] //Show a single event using the event identifier<br>
                                        [LISTATTENDEES category_identifier="your_category_identifier"] //Show a group of events in a category using the category identifier</p>
                                        <p><?php _e('For more information about the attendee listing shortcodes and customizations. Please view the <a href="http://eventespresso.com/forums/2010/10/attendee-listing-shortcodes/">Attendee Listing Shortcodes</a> page.', 'event_espresso'); ?>
                                        </p>
                                        <hr />
                                        <h4><?php _e('Venue Shortcodes', 'event_espresso'); ?></h4>
                                        
                                        <p><strong><?php _e('As of Event Espresso version 3.1', 'event_espresso'); ?></strong><br>
                                        <a name="venue_shortcode" id="venue_shortcode"></a></p>
                                        <p><?php _e('Event Description Example:', 'event_espresso'); ?><br>
                                        <?php _e('If you want to display venue details within an event, the venue id is not needed. Just add [ESPRESSO_VENUE] to your event description.', 'event_espresso'); ?></p>
                                        <p><?php _e('Example with Optional Parameters:', 'event_espresso'); ?><br>
                                        [ESPRESSO_VENUE outside_wrapper="div" outside_wrapper_class="event_venue"]</p>
                                        <p><?php _e('Page/Post Example:', 'event_espresso'); ?><br>
                                        <?php _e('You can display the details of any venue to a page, post or event by adding the id of the venue to the shortcode.', 'event_espresso'); ?><br>
                                        [ESPRESSO_VENUE id="3"]</p>
                                        
                                        <p><?php _e('Page/Post Example #2:', 'event_espresso'); ?><br>
                                        <?php _e('If you want to display a the details of a venue on a page, post or event add the event id to the  [ESPRESSO_VENUE] shortcode.', 'event_espresso'); ?><br>
                                        [ESPRESSO_VENUE event_id="8"]</p>
                                        <p><strong><?php _e('Available parameters:', 'event_espresso'); ?></strong></p>
                                        <p>outside_wrapper_class = class name for the outside wrapper. Eg. event_venue<br>
                                        outside_wrapper = outside wrapper element. Eg. div<br>
                                        inside_wrapper_class = class name for the outside wrapper. Eg. venue_details<br>
                                        inside_wrapper = inside wrapper element. Eg. p<br>
                                        title_class = class name for the title Eg. venue_name<br>
                                        
                                        title_wrapper = title wrapper element. Eg. h3<br>
                                        show_title = show the venue name? (true|false default true)<br>
                                        image_class = class name for the image. Eg. venue_image<br>
                                        show_image = show the image? (true|false default true)<br>
                                        show_description = show the description? (true|false default true)<br>
                                        show_address = show the address of the venue? (true|false default true)<br>
                                        show_additional_details = show the additional details? (true|false default true)<br>
                                        show_google_map_link = show the Google map link? (true|false default true)<br>
                                        map_link_text = text to display in the link. Eg. Map and Directions</p>
                                        
                                        <hr />
                                        <h4><?php _e('Staff Shortcodes', 'event_espresso'); ?></h4>
                                        <p><strong><?php _e('As of Event Espresso version 3.1', 'event_espresso'); ?></strong><br>
                                        <a name="staff_shortcode" id="staff_shortcode"></a></p>
                                        <p><?php _e('Event Description Example:', 'event_espresso'); ?><br>
                                        <?php _e('If you want to display a list of staff members within an event, the staff id is not needed. Just add [ESPRESSO_STAFF] to your event description.', 'event_espresso'); ?></p>
                                        <p><?php _e('Example with Optional Parameters:', 'event_espresso'); ?><br>
                                        [ESPRESSO_STAFF outside_wrapper="div" outside_wrapper_class="event_staff" inside_wrapper="p" inside_wrapper_class="event_person"]</p>
                                        <p><?php _e('Page/Post Example:', 'event_espresso'); ?><br>
                                        <?php _e('You can display the details of any staff member to a page, post or event by adding the id of the staff member to the shortcode.', 'event_espresso'); ?><br>
                                        
                                        [ESPRESSO_STAFF id="3"]</p>
                                        <p><?php _e('Page/Post Example #2:', 'event_espresso'); ?><br>
                                        <?php _e('If you want to display a list of staff members assigned to an event, to a page, post or event add the event id to the  [ESPRESSO_STAFF] shortcode.', 'event_espresso'); ?><br>
                                        [ESPRESSO_STAFF event_id="8"]</p>
                                        <p><strong>Available parameters:</strong></p>
                                        <p>outside_wrapper_class = class name for the outside wrapper. Eg. event_staff<br>
                                        outside_wrapper = outside wrapper element. Eg. div<br>
                                        inside_wrapper_class = class name for the outside wrapper. Eg. event_person<br>
                                        inside_wrapper = inside wrapper element. Eg. p<br>
                                        
                                        name_class = class name for the persons name<br>
                                        name_wrapper = name wrapper element. Eg. strong<br>
                                        image_class = class name for the image. Eg. venue_image<br>
                                        show_image = show the persons image? (true|false default true)<br>
                                        show_staff_titles = show the role/title? (true|false default true)<br>
                                        show_staff_details = show the details? (true|false default true)<br>
                                        show_image = show the image? (true|false default true)<br>
                                        show_description = show the description? (true|false default true)</p>
                                        
                                        <hr />
                                        <h4>Claendar Shortcodes</h4>
                                        <p>[ESPRESSO_CALENDAR]<br>
                                        [ESPRESSO_CALENDAR show_expired="true"]<br>
                                        [ESPRESSO_CALENDAR event_category_id="your_category_identifier"]<br>
                                        [ESPRESSO_CALENDAR event_category_id="your_category_identifier" show_expired="true"]<br>
                                        [ESPRESSO_CALENDAR cal_view="month"] (Available parameters: month, basicWeek, basicDay, agendaWeek, agendaDay)</p>
                                        <hr />
                                        <h4>Category Shortcodes</h4>
                                        <p>[EVENT_ESPRESSO_CATEGORY event_category_id="your_category_indentifier"]</p>
              

                                    </div>
                                </div>
                            </div>
                        </li>
                        <li><a name="details" id="details"></a>
                            <div class="metabox-holder">
                                <div class="postbox">
                                    <h3><?php _e('Important Information', 'event_espresso'); ?></h3>

                                    <div class="padding">
                                    <?php 
										global $wpdb, $wp_version;
										$wp_req_version = '3.1';
										$php_req_version = '5.2';
										$mysql_req_version = '5.0';
										$is_php_valid = version_compare(phpversion(), $php_req_version, '>');
										$is_mysql_valid = version_compare($wpdb->db_version(), $mysql_req_version, '>');
										
										if ( !version_compare( $wp_version, $wp_req_version, '>=' ) ) {
											echo '<p class="red_alert">'.__('This version of Event Espresso requires WordPress version', 'event_espresso').' '. $wp_req_version.'+. '.__('Please upgrade to the latest version of WordPress.', 'event_espresso').'</p>';
										}
										if(!$is_php_valid){
											echo '<p class="red_alert">'.__('Your version of PHP is out of date, please update to the latest version of PHP. <br>Required version of PHP:', 'event_espresso'). ' ' .$php_req_version.'</p>';
										}
										if(!$is_mysql_valid){
											echo '<p class="red_alert">'.__('Your version of MySQL is out of date, please update to the latest version of MySQL. <br>Required version of MySQL:', 'event_espresso'). ' ' .$mysql_req_version.'</p>';
										}
									?>
                                        <p><strong><?php _e('WordPress Version:', 'event_espresso'); ?></strong><br /><?php echo $wp_version; ?></p>
                                        <p><strong><?php _e('PHP Version:', 'event_espresso'); ?></strong><br /><?php echo phpversion(); ?></p>
                                        <p><strong><?php _e('MySQL Version:', 'event_espresso'); ?></strong><br /><?php echo $wpdb->db_version(); ?></p>
                                        <p><strong>Event Espresso Version:</strong><br /><?php echo EVENT_ESPRESSO_VERSION ?></p>
                                        <p><strong><?php _e('WordPress Address (URL):', 'event_espresso'); ?></strong><br /><?php echo site_url(); ?></p>
                                        <p><strong><?php _e('WordPress Content Directory:', 'event_espresso'); ?></strong><br /><?php echo WP_CONTENT_DIR; ?></p>
                                        <p><strong><?php _e('Site address (URL):', 'event_espresso'); ?></strong><br /><?php echo home_url(); ?></p>
                                        <p><strong><?php _e('Event Espresso Plugin URL:', 'event_espresso'); ?></strong><br /><?php echo EVENT_ESPRESSO_PLUGINFULLURL ?></p>
                                        <p><strong><?php _e('Event Espresso Plugin Path:', 'event_espresso'); ?></strong><br /><?php echo EVENT_ESPRESSO_PLUGINFULLPATH; ?></p>
                                        <p><strong><?php _e('Event Espresso Upload URL:', 'event_espresso'); ?></strong><br /><?php echo EVENT_ESPRESSO_UPLOAD_URL; ?></p>
                                        <p><strong><?php _e('Event Espresso Upload Path:', 'event_espresso'); ?></strong><br /><?php echo EVENT_ESPRESSO_UPLOAD_DIR; ?></p>
                                        <p><strong><?php _e('Event Espresso Template Path:', 'event_espresso'); ?></strong><br /><?php echo EVENT_ESPRESSO_TEMPLATE_DIR; ?></p>
                                        <p><strong><?php _e('Event Espresso Gateway Path:', 'event_espresso'); ?></strong><br /><?php echo EVENT_ESPRESSO_GATEWAY_DIR; ?></p>
                                        
                                    </div>
                                </div>
                            </div>
                        </li>
                         
                        <li><a name="support" id="support"></a>
                            <div class="metabox-holder">
                                <div class="postbox">
                                    <h3><?php _e('Contact Support', 'event_espresso'); ?></h3>

                                    <div class="padding">
                                    <p><strong><?php _e('Attention:', 'event_espresso'); ?></strong><br /><?php _e('When requesting support. Please copy and paste the details displayed of the <a href="admin.php?page=support#details">Important Information</a> section above. This will help us determine potential problems with your server, WordPress installation, and/or the Event Espresso plugin. Please also include a list (or screenshot) of all <a href="plugins.php?plugin_status=active">active plugins</a>.', 'event_espresso'); ?></p>
    
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
                        
                          
                        <li>
                            <div class="metabox-holder">
                                <div class="postbox"><a name="faq" id="faq"></a>
                                    <h3><?php _e('Frequently Asked Questions', 'event_espresso'); ?></h3>

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
                                        <p><?php _e('More information can be found here:', 'event_espresso'); ?><br />
                                        <a href="http://eventespresso.com/forums/?submit.x=0&submit.y=0&s=ipn" target="_blank"> http://eventespresso.com/forums/?submit.x=0&amp;submit.y=0&amp;s=ipn</a></p>
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