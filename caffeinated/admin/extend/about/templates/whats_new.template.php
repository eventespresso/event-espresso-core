<div class="changelog point-releases">
    <!-- <h3><?php echo _n('Minor Release Information', 'Minor Releases', 1, 'event_espresso'); ?></h3> -->
    <h3><?php echo _n('Major Release Information', 'Major Releases', 1, 'event_espresso'); ?></h3>
    <?php // $type = 'minor'; ?>
    <?php $type = 'major'; ?>
    <p><?php
        printf(
            __('<strong>Version %1$s</strong> is a %2$s release.', 'event_espresso'),
            EVENT_ESPRESSO_VERSION,
            $type
        ); ?>
        <?php
        $ver = explode('.', EVENT_ESPRESSO_VERSION);
        array_pop($ver);
        $ver = implode('.', $ver);
        ?>
        <?php printf(
            __('For more information, see <a href="%s" target="_blank">the release notes</a>.', 'event_espresso'),
            'http://eventespresso.com/wiki/ee4-changelog/#' . $ver
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
                _e('Event Espresso is in full maintenance mode.', 'event_espresso');
                ?></h2>
            <p>
                <?php
                printf(
                    __(
                        'A previous version of Event Espresso has detected. But before anything else can happen, we need to know whether or not to migrate (copy over) your existing event data so that it can be utilized by EE4. For more instructions on what to do, please visit the %sEvent Espresso Maintenance%s page.',
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
    <p><strong>Attendee Block for WordPress 5 Gutenberg</strong>
        <br>The Event Attendees block allows you to easily insert a list of attendees from any designated event, datetime, or ticket, from anywhere in your content in a post, page or another post type that supports the new WordPress 5.0 page/post Editor.</p>
    <p align="right"><a href="https://eventespresso.com/2018/12/event-espresso-and-wordpress-5-0/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=gutenberg_link&ap_id=EEspresso" target="_blank">Read More</a>

    <p><strong>New Date and Time Filter Max Checked Option</strong><br>
        NEED CONTENT</p>
    <p align="right"><a href="https://eventespresso.com/2016/04/event-espresso-4-9-beta-now-available/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=rest_api_core_link&ap_id=EEspresso#questions" target="_blank">Read More</a>

    <p><strong>GDPR Compliance Features</strong><br>
        Along with the new GDPR regulations comes new features in WordPress and Event Espresso 4. The<a href="https://wordpress.org/news/2018/05/wordpress-4-9-6-privacy-and-maintenance-release/"> latest Privacy and Maintenance release of WordPress, 4.9.6,</a> comes with many features to help your website become GDPR compliant. Event Espresso has contributed to those new features, and makes use of them in Event Espresso 4.9.62. Below is a list of new features that are shipping with Event Espresso to support the new GDPR regulations.</p>
    <ol>
        <li><strong>Export Personal Data</strong><br><a href="https://wordpress.org/news/2018/05/wordpress-4-9-6-privacy-and-maintenance-release/">WordPress 4.9.6 allows admins to generate a report of an individual’s personal information</a> and send it to them. In Event Espresso 4, we <a href="https://eventespresso.com/features/gdpr-compliant/#export-personal-data">add the individual’s registration details</a> to the report automatically when it’s being created.</li>
        <li><strong>Erase Personal Data</strong>Along with the ability to export data, WordPress 4.9.6 adds a tool that allows site admins to erase personal data stored in their WordPress site. When an admin erases an individual’s personal data, <a href="https://eventespresso.com/features/gdpr-compliant/#erase-personal-data">Event Espresso makes sure their registration data is also erased</a>.</li>
        <li><strong>GDPR/Privacy Policy Content Tool</strong><br>Per GDPR regulations, site owners need to have a Privacy Policy page. By default, WordPress doesn’t collect any data from visitors unless they post a comment. However many plugins add third-party services that collect visitor data. <a href="https://wordpress.org/news/2018/05/wordpress-4-9-6-privacy-and-maintenance-release/">WordPress 4.9.6 adds a Privacy Policy guide</a> to help you create a comprehensive “Privacy Policy” page. Event Espresso 4.9.62 <a href="https://eventespresso.com/features/gdpr-compliant/#privacy-policy-tool">adds suggested text to this guide page</a>, to help you know what Event Espresso is doing with regards to user privacy.</li>
    </ol>
    <p align="right"><a href="https://eventespresso.com/2018/05/gdpr-registration-data-event-ticketing-website/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=gdpr_link&ap_id=EEspresso" target="_blank">Read More</a></p>

    <h3>REST API WRITE Endpoints</h3>
    <p>With WRITE endpoints in the Event Espresso 4 REST API, developers will find it much easier to create innovative new features for Event Espresso. In fact, we are already starting development of recurring events, and are close to releasing a beta version of the Waiting List Manager. Both of these add-ons wouldn’t be possible without the REST API.</p>
    <p align="right"><a href="https://eventespresso.com/2017/09/api-write-endpoints-event-espresso/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=rest_api_link&ap_id=EEspresso">Read
            More</a>


    <hr>

    <h2 class="about-headline-callout">New Add-ons Available!</h2>

    <h3>
        <a href="https://eventespresso.com/product/eea-affiliatewp/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=affiliatewp_addon_link&ap_id=EEspresso"
           target="_blank">AffiliateWP Add-on Released for Event Espresso</a></h3>
    <a href="https://eventespresso.com/product/eea-affiliatewp/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=affiliatewp_addon_link&ap_id=EEspresso"
       rel="attachment" target="_blank"><img alt="AffiliateWP Add-on" class="alignright"
                                             src="http://ee-screenshots.s3.amazonaws.com/ee4/affiliate-wp-integration-1.jpg"
                                             alt="AffiliateWP-Logo" width="260" height="202"/></a>
    <p>Do you want to offer your attendees, customers, or other patrons an incentive to promote your events? Now you
        can! With our <a
            href="https://eventespresso.com/product/eea-affiliatewp/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=affiliatewp_addon_link&ap_id=EEspresso"
            target="_blank">AffiliateWP Integration add-on</a> for EE4, the process is quite simple.</p>
    <p>AffiliateWP is an affiliate plugin for WordPress. With AffiliateWP, your affiliates can promote your products and
        services, which improves your website's SEO rankings, drives more traffic to your site, and increases
        sales/revenue. Visit the <a href="http://evts.io/1MEy1My" target="_blank">AffiliateWP website</a> to learn more.
    </p>
    <p><strong>Get Started!</strong><br>
        Purchase the <a
            href="https://eventespresso.com/product/eea-affiliatewp/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=affiliatewp_addon_link&ap_id=EEspresso"
            target="_blank">AffiliateWP Add-on add-on</a> for Event Espresso 4.</p>


    <h3>
        <a href="https://eventespresso.com/product/eea-braintree-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=braintree_addon_link&ap_id=EEspresso"
           target="_blank">Braintree Payment Gateway</a></h3>
    <a href="https://eventespresso.com/product/eea-braintree-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=braintree_addon_link&ap_id=EEspresso"
       target="_blank"><img class="alignright " alt="Braintree Payment Gateway"
                            src="http://ee-screenshots.s3.amazonaws.com/ee4/braintree-payment-gateway.jpg" width="260"
                            height="202"/></a>
    <p>Braintree is a full stack payment platform that helps merchants accept online payments. Braintree also supports
        PayPal payments.</p>
    <p><strong>40+ countries, 130 currencies</strong><br>
        And now with the global reach of PayPal. Braintree is your payments platform almost anywhere you do business.
    </p>
    <p><strong>Instant sign-up</strong><br>
        With instant approval, you can start accepting payments in minutes.</p>
    <p><strong>Get Started!</strong><br>
        Purchase the <a
            href="https://eventespresso.com/product/eea-braintree-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=braintree_addon_link&ap_id=EEspresso"
            target="_blank">Braintree Payment Gateway</a> for Event Espresso 4.</p>


    <h3>
        <a href="https://eventespresso.com/product/eea-payflow-pro-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_payflow_addon_link&ap_id=EEspresso"
           target="_blank">PayPal Payflow Pro Payment Gateway</a></h3>
    <a href="https://eventespresso.com/product/eea-payflow-pro-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_payflow_addon_link&ap_id=EEspresso"
       target="_blank"><img class="alignright" alt="PayPal Payflow Pro Payment Gateway"
                            src="http://ee-screenshots.s3.amazonaws.com/ee4/ee4-paypal-payflow-pro-logo-380x2501.jpg"
                            width="260" height="202"/></a>
    <p>PayPal Payflow Pro will let you accept credit or debit cards on-site and is available to merchants in the United
        States, Canada, Australia, and New Zealand. This means that your registrants/attendees will be able to complete
        their registrations and pay without ever leaving your site.</p>
    <p>Payflow Pro is different than PayPal Pro as it allows you to use an existing merchant account through another
        provider (processor). <a
            href="https://eventespresso.com/product/eea-payflow-pro-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_payflow_addon_link&ap_id=EEspresso"
            target="_blank">View the full list</a> of supported processors.</p>
    <p>A PayPal Payflow Pro account with PayPal is needed to accept payments via Payflow. Need an account? Call this
        number to get started: 1-855-456-1338.</p>

    <p><strong>Get Started!</strong><br>
        Purchase the <a
            href="https://eventespresso.com/product/eea-payflow-pro-gateway/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=paypal_payflow_addon_link&ap_id=EEspresso"
            target="_blank">PayPal Payflow Pro Payment Gateway</a> for Event Espresso 4.</p>

    <hr>