<p><strong><?php _e('Critical Pages', 'event_espresso'); ?></strong></p>
<p>
<?php _e('This page shows all critical pages that Event Espresso needs to work correctly.', 'event_espresso'); ?>
</p>
<p><strong><?php _e('Shortcodes', 'event_espresso'); ?></strong></p>
<ul>
<li>
<strong><?php _e('Registration Checkout Page', 'event_espresso'); ?></strong><br />
<?php printf( __('This page displays all your events and is required. It is important that this page always contain the %s shortcode. It is not required to be in your navigation menu.', 'event_espresso'), '<strong>[ESPRESSO_CHECKOUT]</strong>' ); ?>
</li>
<li>
<strong><?php _e('Transactions Page', 'event_espresso'); ?></strong><br />
<?php printf( __('This page processes the payments and is required. It should only contain the %s shortcode. No other content should be added and it should be hidden from your navigation menu.', 'event_espresso'), '<strong>[ESPRESSO_TXN_PAGE]</strong>' ); ?>
</li>
<li>
<strong><?php _e('Thank You Page', 'event_espresso'); ?></strong><br />
<?php printf( __('This page is displayed after a successful transaction and is required. It should contain the %s shortcode. Additionally, you may customize this page by adding extra content to the page. It should be hidden from your navigation menu.', 'event_espresso'), '<strong>[ESPRESSO_THANK_YOU]</strong>' ); ?>
</li>
<li>
<strong><?php _e('Cancel / Return Page', 'event_espresso'); ?></strong><br />
<?php printf( __('This page is displayed after an unsuccessful transaction and is required.  It should contain the %s shortcode. Additionally, you may customize this page by adding extra content to the page. It should be hidden from your navigation menu.', 'event_espresso'), '<strong>[ESPRESSO_CANCELLED]</strong>' ); ?>
</li>
<li>
<strong><?php _e('Event List', 'event_espresso'); ?></strong><br />
<?php printf(__('If you would like to style the look of your events archive page, then follow the WordPress instructions for %1$screating a custom template for archive pages%2$s.', 'event_espresso'), '<a href="http://codex.wordpress.org/Post_Type_Templates">','</a>'); ?>
<ul>
<li style="list-style-type: circle;">
<?php printf( __('Build a template for your events - create a theme template named %1$s Then place it in your theme\'s root directory. For the default WordPress Twenty Thirteen theme, this location will be %2$s.', 'event_espresso'), '<strong>archive-espresso_events.php</strong>','wp-content/themes/twenty-fourteen' ); ?>
</li>
<li style="list-style-type: circle;">
<?php printf( __('Build a template for a single event - create a theme template named %1$s Then place it in your theme\'s root directory. For the default WordPress Twenty Thirteen theme, this location will be %2$s.', 'event_espresso'), '<strong>single-espresso_events.php</strong>','wp-content/themes/twenty-fourteen' ); ?>
</li>
</ul>
</li>
<li>
<strong><?php _e('Venue List', 'event_espresso'); ?></strong><br />
<?php printf(__('If you would like to style the look of your venues archive page, then follow the WordPress instructions for %1$screating a custom template for archive pages%2$s.', 'event_espresso'), '<a href="http://codex.wordpress.org/Post_Type_Templates">','</a>'); ?>
<ul>
<li style="list-style-type: circle;">
<?php printf( __('Build a template for your events - create a theme template named %1$s Then place it in your theme\'s root directory. For the default WordPress Twenty Thirteen theme, this location will be %2$s.', 'event_espresso'), '<strong>archive-espresso_venues.php</strong>','wp-content/themes/twenty-fourteen' ); ?>
</li>
<li style="list-style-type: circle;">
<?php printf( __('Build a template for a single event - create a theme template named %1$s Then place it in your theme\'s root directory. For the default WordPress Twenty Thirteen theme, this location will be %2$s.', 'event_espresso'), '<strong>single-espresso_venues.php</strong>','wp-content/themes/twenty-fourteen' ); ?>
</li>
</ul>
</li>
</ul>
</p>
<p>
<strong><?php _e('Recommendations', 'event_espresso'); ?></strong><br />
<?php _e('Want to see a tour of this screen? Click on the Critical Pages Tour button which appears on the right side of the page. <br />To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Screen Options', 'event_espresso'); ?></strong><br />
<?php _e('You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>