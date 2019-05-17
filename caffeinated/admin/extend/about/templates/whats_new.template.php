<div class="changelog point-releases">
    <!-- <h3><?php echo esc_html(
        _n('Minor Release Information', 'Minor Releases', 1, 'event_espresso')
    ); ?></h3> -->
    <h3><?php echo esc_html(
        _n('Major Release Information', 'Major Releases', 1, 'event_espresso')
    ); ?></h3>
    <?php // $type = 'minor'; ?>
    <?php $type = 'major'; ?>
    <p><?php
        printf(
            esc_html__('%1$sVersion %2$s%3$s is a %4$s release.', 'event_espresso'),
            '<strong>',
            EVENT_ESPRESSO_VERSION,
            '</strong>',
            $type
        ); ?>
        <?php
        $ver = explode('.', EVENT_ESPRESSO_VERSION);
        array_pop($ver);
        $ver = implode('.', $ver);
        ?>
        <?php printf(
            esc_html__('For more information, see %1$sthe release notes%2$s.', 'event_espresso'),
            '<a href="http://eventespresso.com/wiki/ee4-changelog/#' . $ver . '" target="_blank" rel="noopener noreferrer">',
            '</a>'
        ); ?>
    </p>
</div>

<div class="changelog">
    <?php
    // maintenance mode on?
    if (EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_2_complete_maintenance) {
        ?>
        <div class="ee-attention">
            <h2 class="ee-maintenance-mode-callout"><?php
                esc_html_e('Event Espresso is in full maintenance mode.', 'event_espresso');
                ?></h2>
            <p>
                <?php
                printf(
                    esc_html__(
                        'A previous version of Event Espresso has detected. But before anything else can happen, we need to know whether or not to migrate (copy over) your existing event data so that it can be utilized by EE4. For more instructions on what to do, please visit the %1$sEvent Espresso Maintenance%2$s page.',
                        'event_espresso'
                    ),
                    '<a href="admin.php?page=espresso_maintenance_settings">',
                    '</a>'
                );
                ?>
            </p>
        </div>
        <?php
    }
    ?>

    <h2 class="about-headline-callout">Updates &amp; Fixes in EE 4.10</h2>
    <p>This release brought many background updates/improvements to existing core features, and support for many new
        add-on & features. Here are the most interesting updates:</p>
    <h3>New Features</h3>
    <h4>Attendee Block for WordPress 5 Gutenberg</h4>
    <p>The Event Attendees block allows you to easily insert a list of attendees from any designated event, datetime, or ticket, from anywhere in your content in a post, page or another post type that supports the new WordPress 5.0 page/post Editor.</p>
    <p align="right"><a href="https://eventespresso.com/2018/12/event-espresso-and-wordpress-5-0/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=gutenberg_link&ap_id=EEspresso" target="_blank">Read More</a>
    <hr>
    <h4>New Date and Time Filter Max Checked Option</h4>
    <p>NEED CONTENT</p>
    <p align="right"><a href="####?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=rest_api_core_link&ap_id=EEspresso#questions" target="_blank">Read More</a>
    <hr>
    <h4>GDPR Compliance Features</h4>
    <p>Along with the new GDPR regulations comes new features in WordPress and Event Espresso 4. The<a href="https://wordpress.org/news/2018/05/wordpress-4-9-6-privacy-and-maintenance-release/"> latest Privacy and Maintenance release of WordPress, 4.9.6,</a> comes with many features to help your website become GDPR compliant. Event Espresso has contributed to those new features, and makes use of them in Event Espresso 4.9.62. Below is a list of new features that are shipping with Event Espresso to support the new GDPR regulations.</p>
    <ol>
        <li>Export Personal Data<br><a href="https://wordpress.org/news/2018/05/wordpress-4-9-6-privacy-and-maintenance-release/">WordPress 4.9.6 allows admins to generate a report of an individual’s personal information</a> and send it to them. In Event Espresso 4, we <a href="https://eventespresso.com/features/gdpr-compliant/#export-personal-data">add the individual’s registration details</a> to the report automatically when it’s being created.</li>
        <li>Erase Personal Data<br>Along with the ability to export data, WordPress 4.9.6 adds a tool that allows site admins to erase personal data stored in their WordPress site. When an admin erases an individual’s personal data, <a href="https://eventespresso.com/features/gdpr-compliant/#erase-personal-data">Event Espresso makes sure their registration data is also erased</a>.</li>
        <li>GDPR/Privacy Policy Content Tool<br>Per GDPR regulations, site owners need to have a Privacy Policy page. By default, WordPress doesn’t collect any data from visitors unless they post a comment. However, some plugins add third-party services that collect visitor data. <a href="https://wordpress.org/news/2018/05/wordpress-4-9-6-privacy-and-maintenance-release/">WordPress 4.9.6 adds a Privacy Policy guide</a> to help you create a comprehensive “Privacy Policy” page. Event Espresso 4.9.62 <a href="https://eventespresso.com/features/gdpr-compliant/#privacy-policy-tool">adds suggested text to this guide page</a>, to help you know what Event Espresso is doing with regards to user privacy.</li>
    </ol>
    <p align="right"><a href="https://eventespresso.com/2018/05/gdpr-registration-data-event-ticketing-website/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=gdpr_link&ap_id=EEspresso" target="_blank">Read More</a></p>
    <hr>   
    <h4>REST API WRITE Endpoints</h4>
    <p>With WRITE endpoints in the Event Espresso 4 REST API, developers will find it much easier to create innovative new features for Event Espresso. In fact, we are already starting development of recurring events, and have released the Wait List Manager add-on. Both of these add-ons wouldn’t be possible without the REST API.</p>
    <p align="right"><a href="https://eventespresso.com/2017/09/api-write-endpoints-event-espresso/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=rest_api_link&ap_id=EEspresso">Read More</a>

    <hr>

    <h2 class="about-headline-callout">New Add-ons Available!</h2>

    <h3>
        <a href="https://eventespresso.com/product/eea-wait-lists/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=wait_list_addon_link&ap_id=EEspresso"
           target="_blank">Wait List Manager</a></h3>
    <p><a href="https://eventespresso.com/product/eea-wait-lists/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=wait_list_addon_link&ap_id=EEspresso"
       rel="attachment" target="_blank"><img style="width: 380px; height: 250px; padding: 5px;" alt="Wait List Manager Add-on" class="alignright" src="https://s3.amazonaws.com/ee-screenshots/ee4/ee4-wait-list-manager.jpg" alt="Wait List Manager Add-on" width="380" height="250" /></a></p>
    <p>Keep your events full by accepting pre-registrations from interested attendees and automatically promoting them when spots open up for an event.</p>
    <p>Here is an example to help you understand how the Wait List Manager can work for you:</p>
    <p>1) The Wait List Manager jumps into action as soon as an event becomes sold out<br>
    2) It then collects a name and an email address from attendees that are interested (up to a limit that you choose)<br>
    3) Behind the scenes, it monitors an event for open spots and when a spot opens up, then it reaches out to the next attendee in line through email, and asks them to confirm their registration</p>
    <p>You can think of the Wait List Manager as a personal assistant that works tirelessly for you to keep your events full!</p>
    <p><strong>Get Started!</strong><br>
        Purchase the <a
            href="https://eventespresso.com/product/eea-wait-lists/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=wait_list_addon_link&ap_id=EEspresso"
            target="_blank">Wait List Manager Add-on</a> for Event Espresso 4.</p>


    <h3>
        <a href="https://eventespresso.com/product/eea-paypal-smart-buttons/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_smart_buttons_addon_link&ap_id=EEspresso"
           target="_blank">PayPal Express Checkout Smart Payment Buttons (with Venmo)</a></h3>
    <a href="https://eventespresso.com/product/eea-paypal-smart-buttons/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_smart_buttons_addon_link&ap_id=EEspresso"
       target="_blank"><img style="width: 380px; height: 250px; padding: 5px;" class="alignright " alt="PayPal Express Checkout Smart Payment Buttons (with Venmo) Payment Gateway" src="https://s3.amazonaws.com/ee-screenshots/ee4/event-registrations-with-paypal-express-checkout-smart-payment-buttons.jpg" width="260" height="202"/></a>
    <p>Accept online payments through credit cards, PayPal funds, and Venmo through PayPal Express Checkout Smart Payment Buttons.</p>
    <p>PayPal Express Checkout’s Smart Payment Buttons feature gives event organizers a variety of ways to customize payment buttons on the checkout page, including the option to pay for their event registrations with Venmo.</p>
    <p>With Smart Payment Buttons, you can choose:</p>
    <ul>
    <li>The size and shape of not just your PayPal checkout button, but also buttons for other, multiple alternative payment methods such as PayPal Credit, Venmo, and local funding sources.</li>
    <li>The button layout you prefer: horizontal or vertical.</li>
    </ul>
    <p>Based on your specific configuration and a buyer’s location and cookies, Express Checkout dynamically presents the appropriate funding sources to give your buyers more ways to pay.</p>
    <p><strong>Get Started!</strong><br>
        Purchase the <a
            href="https://eventespresso.com/product/eea-paypal-smart-buttons/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_smart_buttons_addon_link&ap_id=EEspresso"
            target="_blank">PayPal Express Checkout Smart Payment Buttons (with Venmo) Payment Gateway</a> for Event Espresso 4.</p>

    <hr>