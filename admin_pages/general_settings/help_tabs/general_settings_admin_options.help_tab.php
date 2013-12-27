<h2>
<?php _e('Full Logging', 'event_espresso'); ?>
</h2>
<p>
<?php _e("Every time a page is accessed on your site. This option will save all Event Espresso registration form data, and debugging information to a file in the \"/wp-content/uploads/espresso/logs/\" directory on your server.", 'event_espresso'); ?>
</p>
<p class="red_text">
<?php _e('Please use caution when using this feature. These files may be publicly available.', 'event_espresso'); ?>
</p>

<h2>
<?php _e('Remote Logging', 'event_espresso'); ?>
</h2>
<p>
<?php _e("Every time a page is accessed on your site, this option will send all Event Espresso registration form data, your server details, and debugging information to a remote server.", 'event_espresso'); ?>
</p>
<p>
<?php _e('To see for yourself, "Make a PostBin" at <a href="http://www.postbin.org/" target="_blank">PostBin</a>. Then enter the PostBin URL into the "Remote Logging URL" field.', 'event_espresso'); ?>
</p>
<p class="red_text">
<?php _e('Please use caution when using this feature. These files may be pubicly available.', 'event_espresso'); ?>
</p>

<h2>
<?php _e('Remote Logging URL', 'event_espresso'); ?>
</h2>
<p>
<?php _e("This option sends all Event Espresso debugging data and get/post variables to the specified URL.", 'event_espresso'); ?>
</p>

<p><strong>
<?php _e('Sending login information (optional):', 'event_espresso'); ?>
</strong><br />
<?php _e('Using constants defined in the wp-config.php. You can a way to send "key" and "pass" parameters in the remote logging action.', 'event_espresso'); ?>
</p>
<p>
<?php _e('Add this to your wp-config, above the line that says "That\'s all, stop editing! Happy blogging."', 'event_espresso'); ?>
</p>
<pre>define( 'EELOGGING_PASS', 'YOUR PASSWORD' );
define( 'EELOGGING_KEY', 'YOUR REMOTE KEY' );</pre>