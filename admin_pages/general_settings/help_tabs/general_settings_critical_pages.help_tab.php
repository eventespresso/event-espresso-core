<h2><?php _e('Registration Checkout Page', 'event_espresso'); ?></h2>
<p><?php echo sprintf(__('This is the page that displays all your events and is required, even if it is not visible in your menus. It is very important that this page always contains the %s shortcode.', 'event_espresso'), '<strong>[ESPRESSO_CHECKOUT]</strong>'); ?></p>

<h2><?php _e('Transactions Page', 'event_espresso'); ?></h2>
<p>
<?php _e('This processes the payments. It should not be visible on your menus, and the page should NOT contain anything other than the shortcode.', 'event_espresso'); ?>
</p>
<p> <?php echo sprintf(__('This page should contain the %s shortcode.', 'event_espresso'), '<strong>[ESPRESSO_TXN_PAGE]</strong>'); ?> </p>
<p><em class="important"><strong>
<?php _e('ATTENTION:', 'event_espresso'); ?>
</strong><br />
<?php _e('This page should be hidden from from your navigation menu.', 'event_espresso'); ?>
</em> </p>

<h2><?php _e('Thank You Page', 'event_espresso'); ?></h2>
<p>
<?php _e('This page is displayed after a successful transaction. Feel free to add extra content to this page to personalise it!', 'event_espresso'); ?>
</p>
<p><?php echo sprintf(__("This page should contain the %s shortcode.", 'event_espresso'), '<strong>[ESPRESSO_THANK_YOU]</strong>'); ?></p>
<p><em class="important"><b>
<?php _e('ATTENTION:', 'event_espresso'); ?>
</b><br />
<?php _e('This page should be hidden from from your navigation menu.', 'event_espresso'); ?>
</em> </p>

<h2><?php _e('Cancel/Return Page', 'event_espresso'); ?></h2>
<p>
<?php _e('This page is displayed after an unsuccessful transaction. Feel free to add extra content to this page to personalise it!', 'event_espresso'); ?>
</p>
<p>
<?php echo sprintf(__('This page should contain the %s shortcode.', 'event_espresso'), '<strong>[ESPRESSO_CANCELLED]</strong>'); ?>
</p>
<p><em class="important"><strong>
<?php _e('ATTENTION:', 'event_espresso'); ?>
</strong><br />
<?php _e('This page should be hidden from from your navigation menu.', 'event_espresso'); ?>
</em></p>

<h2><?php _e('Event List Page', 'event_espresso'); ?></h2>
<p><?php echo sprintf(__('If you would like to style the look of your events archive page, %s follow the Wordpress instructions for creating a custom template for archive pages %s. ', 'event_espresso'), '<a href="http://codex.wordpress.org/Post_Type_Templates">','</a>'); ?></p>
<p><?php	_e("Note: if you want to create a custom template for your events, you should create template named 'archive-espresso_events.php' and place it in your theme's root directory (eg 'wp-content/themes/twenty-thirteen/')", "event_espresso"); ?></p>
<p><?php	_e("Likewise, if you want to create a custom template for styling individual events, create a template named 'single-espresso_events.php' and place it in the same folder", "event_espresso"); ?></p>