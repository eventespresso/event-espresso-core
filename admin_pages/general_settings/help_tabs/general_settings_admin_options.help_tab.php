<h2><?php _e('Admin Options', 'event_espresso'); ?></h2>
<p>
<?php _e("This page shows various options for your organization.", 'event_espresso'); ?>
</p>
<h3><?php _e('Debug / Logging Options', 'event_espresso'); ?></h3>
<p class="ee-attention">
<?php _e('Notice: Your log files may be publicly accessible. Logging should be turned off when its not needed.', 'event_espresso'); ?>
</p>
<ul>
<li>
<?php _e('<strong>Enable Full Logging</strong>', 'event_espresso'); ?><br />
<?php _e('This option will save all Event Espresso registration form data, and debugging information to a file in the /wp-content/uploads/espresso/logs directory on your server. This will occur each time a page is accessed on your site until this option is turned off.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Enable Remote Logging</strong>', 'event_espresso'); ?><br />
<?php _e('Every time a page is accessed on your site, this option will send all Event Espresso registration form data, your server details, and debugging information to a remote server.', 'event_espresso'); ?>
<?php _e(' To see for yourself, make a PostBin at <a href="http://www.postbin.org/" target="_blank">PostBin</a>. Then enter the PostBin URL into the "Remote Logging URL" field and update settings.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Remote Logging URL</strong>', 'event_espresso'); ?><br />
<?php _e('This option sends all Event Espresso debugging data and get / post variables to the specified URL.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Send Login Information (Optional)</strong>', 'event_espresso'); ?><br />
<?php _e('By using constants in th wp-config.php file, you can send a "key" and "pass" parameters in the remote logging action.', 'event_espresso'); ?>
<?php _e('Add the contants below to your wp-config, above the line that says "That\'s all, stop editing! Happy blogging."', 'event_espresso'); ?>
<pre>define( 'EELOGGING_PASS', 'YOUR PASSWORD' );
define( 'EELOGGING_KEY', 'YOUR REMOTE KEY' );</pre>
</li>
</ul>
<h3><?php _e('Promote Event Espresso', 'event_espresso'); ?></h3>
<ul>
<li>
<?php _e('<strong>Link to Event Espresso in your Registration Page?</strong>', 'event_espresso'); ?><br />
<?php _e('Help spread the word about Event Espresso by allowing us to show a small link in the footer of your registration page.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Event Espresso Affiliate ID</strong>', 'event_espresso'); ?><br />
<?php _e(' You can also monetize this link by signing up to our <a href="http://eventespresso.com/affiliates/">affiliate program</a> and adding in your affiliate ID here.', 'event_espresso'); ?>
</li>
</ul>
<h3><?php _e('Help Tour Global Activation', 'event_espresso'); ?></h3>
<p>
<?php _e('Turn help tours off or on.', 'event_espresso'); ?>
</p>
<p>
<?php _e('<strong>Recommendations</strong><br /> Want to see a tour of this screen? Click on the Admin Options Tour button which appears on the right side of the page. <br />To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<?php _e('<strong>Screen Options</strong><br /> You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>