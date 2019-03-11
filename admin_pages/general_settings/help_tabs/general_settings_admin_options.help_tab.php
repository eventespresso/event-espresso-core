<p><strong><?php esc_html_e('Admin Options', 'event_espresso'); ?></strong></p>
<p>
<?php esc_html_e("This page shows various options for your organization.", 'event_espresso'); ?>
</p>
<p><strong><?php esc_html_e('Debug / Logging Options', 'event_espresso'); ?></strong></p>
<p class="ee-attention">
<?php esc_html_e('Notice: Your log files may be publicly accessible. Logging should be turned off when its not needed.', 'event_espresso'); ?>
</p>
<ul>
<li>
<strong><?php esc_html_e('Enable Full Logging', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This option will save all Event Espresso registration form data, and debugging information to a file in the /wp-content/uploads/espresso/logs directory on your server. This will occur each time a page is accessed on your site until this option is turned off.', 'event_espresso'); ?>
<br/>
<?php printf(
    esc_html__('Note that if you are accessing your filesystem over FTP or SSH, and logging writes to the filesystem on every request, you should put your credentials in your wp-config.php file, as described %1$shere.%2$s', 'event_espresso'),
    '<a href="https://codex.wordpress.org/Editing_wp-config.php#WordPress_Upgrade_Constants" target="_blank" rel="noopener noreferrer">',
    '</a>'
); ?>
</li>
<li>
<strong><?php esc_html_e('Enable Remote Logging', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Every time a page is accessed on your site, this option will send all Event Espresso registration form data, your server details, and debugging information to a remote server.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Remote Logging URL', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This option sends all Event Espresso debugging data and get / post variables to the specified URL.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Send Login Information (Optional)', 'event_espresso'); ?></strong><br />
<?php esc_html_e('By using constants in th wp-config.php file, you can send a "key" and "pass" parameters in the remote logging action.', 'event_espresso'); ?>
<?php esc_html_e('Add the constants below to your wp-config.php file, above the line that says "That\'s all, stop editing! Happy blogging."', 'event_espresso'); ?>
<pre>define( 'EELOGGING_PASS', 'YOUR PASSWORD' );
define( 'EELOGGING_KEY', 'YOUR REMOTE KEY' );</pre>
</li>
</ul>
<p><strong><?php esc_html_e('Promote Event Espresso', 'event_espresso'); ?></strong></p>
<ul>
<li>
<strong><?php esc_html_e('Link to Event Espresso in your Registration Page?', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Help spread the word about Event Espresso by allowing us to show a small link back to the to Event Espresso website in your registration page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Event Espresso Affiliate ID', 'event_espresso'); ?></strong><br />
<?php printf(
    esc_html__(
        'You can also monetize this link by signing up to our %1$saffiliate program%2$s and adding in your affiliate ID here.',
        'event_espresso'
    ),
    '<a href="https://eventespresso.com/affiliates/">',
    '</a>'
); ?>
</li>
</ul>
<p><strong><?php esc_html_e('Help Tour Global Activation', 'event_espresso'); ?></strong></p>
<p>
<?php esc_html_e('Turn help tours off or on.', 'event_espresso'); ?>
</p>
<p>
<strong><?php esc_html_e('Recommendations', 'event_espresso'); ?></strong>
<?php esc_html_e('Want to see a tour of this screen? Click on the Admin Options Tour button which appears on the right side of the page. To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<strong><?php esc_html_e('Screen Options', 'event_espresso'); ?></strong><br />
<?php esc_html_e('You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>
