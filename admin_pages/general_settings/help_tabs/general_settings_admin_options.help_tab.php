<p><strong><?php _e('Admin Options', 'event_espresso'); ?></strong></p>
<p>
<?php _e("This page shows various options for your organization.", 'event_espresso'); ?>
</p>
<p><strong><?php _e('Debug / Logging Options', 'event_espresso'); ?></strong></p>
<p class="ee-attention">
<?php _e('Notice: Your log files may be publicly accessible. Logging should be turned off when its not needed.', 'event_espresso'); ?>
</p>
<ul>
<li>
<strong><?php _e('Enable Full Logging', 'event_espresso'); ?></strong><br />
<?php _e('This option will save all Event Espresso registration form data, and debugging information to a file in the /wp-content/uploads/espresso/logs directory on your server. This will occur each time a page is accessed on your site until this option is turned off.', 'event_espresso'); ?>
<br/>
<?php printf( 
		__('Note that if you are accessing your filesystem over FTP or SSH, and logging writes to the filesystem on every request, you should put your credentials in your wp-config.php file, as described %1$shere.%2$s', 'event_espresso'),
		'<a href="https://codex.wordpress.org/Editing_wp-config.php#WordPress_Upgrade_Constants" target="_blank">',
		'</a>' ); ?>
</li>
<li>
<strong><?php _e('Enable Remote Logging', 'event_espresso'); ?></strong><br />
<?php _e('Every time a page is accessed on your site, this option will send all Event Espresso registration form data, your server details, and debugging information to a remote server.', 'event_espresso'); ?>
<?php _e(' To see for yourself, make a PostBin at <a href="http://www.postbin.org/" target="_blank">PostBin</a>. Then enter the PostBin URL into the "Remote Logging URL" field and update settings.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Remote Logging URL', 'event_espresso'); ?></strong><br />
<?php _e('This option sends all Event Espresso debugging data and get / post variables to the specified URL.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Send Login Information (Optional)', 'event_espresso'); ?></strong><br />
<?php _e('By using constants in th wp-config.php file, you can send a "key" and "pass" parameters in the remote logging action.', 'event_espresso'); ?>
<?php _e('Add the constants below to your wp-config.php file, above the line that says "That\'s all, stop editing! Happy blogging."', 'event_espresso'); ?>
<pre>define( 'EELOGGING_PASS', 'YOUR PASSWORD' );
define( 'EELOGGING_KEY', 'YOUR REMOTE KEY' );</pre>
</li>
</ul>
<p><strong><?php _e('Promote Event Espresso', 'event_espresso'); ?></strong></p>
<ul>
<li>
<strong><?php _e('Link to Event Espresso in your Registration Page?', 'event_espresso'); ?></strong><br />
<?php _e('Help spread the word about Event Espresso by allowing us to show a small link back to the to Event Espresso website in your registration page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Event Espresso Affiliate ID', 'event_espresso'); ?></strong><br />
<?php _e(' You can also monetize this link by signing up to our <a href="http://eventespresso.com/affiliates/">affiliate program</a> and adding in your affiliate ID here.', 'event_espresso'); ?>
</li>
</ul>
<p><strong><?php _e('Help Tour Global Activation', 'event_espresso'); ?></strong></p>
<p>
<?php _e('Turn help tours off or on.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Recommendations', 'event_espresso'); ?></strong><br />
<?php _e('Want to see a tour of this screen? Click on the Admin Options Tour button which appears on the right side of the page. <br />To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Screen Options', 'event_espresso'); ?></strong><br />
<?php _e('You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>