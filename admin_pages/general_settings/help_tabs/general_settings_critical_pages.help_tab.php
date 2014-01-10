<h2><?php _e('Critical Pages', 'event_espresso'); ?></h2>
<p>
<?php _e("This page shows all critical pages that Event Espresso needs to work correctly.", 'event_espresso'); ?>
</p>
<h3><?php _e('Shortcodes', 'event_espresso'); ?></h3>
<ul>
<li>
<?php _e('Registration Checkout Page', 'event_espresso'); ?><br />
<?php _e('This page displays all your events and is required. It is important that this page always contain the <strong>[ESPRESSO_CHECKOUT]</strong> shortcode. It is not required to be in your navigation menu.', 'event_espresso'); ?>
</li>
<li>
<?php _e('Transactions Page', 'event_espresso'); ?><br />
<?php _e('This page processes the payments and is required. It should only contain the <strong>[ESPRESSO_TXN_PAGE]</strong> shortcode. No other content should be added and it should be hidden from your navigation menu.', 'event_espresso'); ?>
</li>
<li>
<?php _e('Thank You Page', 'event_espresso'); ?><br />
<?php _e('This page is displayed after a successful transaction and is required. It should contain the <strong>[ESPRESSO_THANK_YOU]</strong> shortcode. Additionally, you may customize this page by adding extra content to the page. It should be hidden from your navigation menu.', 'event_espresso'); ?>
</li>
<li>
<?php _e('Cancel / Return Page', 'event_espresso'); ?><br />
<?php _e('This page is displayed after an unsuccessful transaction and is required.  It should contain the <strong>[ESPRESSO_CANCELLED]</strong> shortcode. Additionally, you may customize this page by adding extra content to the page. It should be hidden from your navigation menu.', 'event_espresso'); ?>
</li>
<li>
<?php _e('Event List', 'event_espresso'); ?><br />
<?php _e('If you would like to style the look of your events archive page, then follow the WordPress instructions for <a href="http://codex.wordpress.org/Post_Type_Templates">creating a custom template for archive pages</a>.', 'event_espresso'); ?>
<ul>
<li style="list-style-type: circle;">
<?php _e('Template for your events - create a theme template named <strong>archive-espresso_events.php</strong> and place it in your theme\'s root directory. For the default WordPress Twenty Thirteen theme, this location will be wp-content/themes/twenty-fourteen.', 'event_espresso'); ?>
</li>
<li style="list-style-type: circle;">
<?php _e('Template for a single event - create a theme template named <strong>single-espresso_events.php</strong> and place it in your theme\'s root directory. For the default WordPress Twenty Thirteen theme, this location will be wp-content/themes/twenty-fourteen.', 'event_espresso'); ?>
</li>
</ul>
</li>
</ul>
</p>
<?php _e('<strong>Recommendations</strong><br /> Want to see a tour of this screen? Click on the Critical Pages Tour button which appears on the right side of the page. <br />To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<?php _e('<strong>Screen Options</strong><br /> You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>