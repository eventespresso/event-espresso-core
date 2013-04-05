<?php



function full_logging_info_help_tab_html() {
	?>
	<h2>
		<?php _e('Full Logging', 'event_espresso'); ?>
	</h2>
	<p><?php _e("Every time a page is accessed on your site. This option will save all Event Espresso registration form data, and debugging information to a file in the \"/wp-content/uploads/espresso/logs/\" directory on your server.", 'event_espresso'); ?></p>
	<p class="red_text"><?php _e('Please use caution when using this feature. These files may be publicly available.', 'event_espresso'); ?></p>
	<?php
}





function remote_logging_info_help_tab_html() {
	?>
	<h2>
		<?php _e('Remote Logging', 'event_espresso'); ?>
	</h2>
	<p><?php _e("Every time a page is accessed on your site. This option will send all Event Espresso registration form data, your server details, and debugging information to a remote server.", 'event_espresso'); ?></p>
	<p class="red_text"><?php _e('Please use caution when using this feature. These files may be pubicly available.', 'event_espresso'); ?></p>
	
	<p><strong><?php _e('Sending login information:', 'event_espresso'); ?></strong><br />
<?php _e('Using constants defined in the wp-config.php. You can a way to send "key" and "pass" parameters in the remote logging action.', 'event_espresso'); ?></p>

	<p><?php _e('Add this to your wp-config, above the line that says "That\'s all, stop editing! Happy blogging."', 'event_espresso'); ?></p>
	<pre>define( 'EELOGGING_PASS', 'YOUR PASSWORD' );
	define( 'EELOGGING_KEY', 'YOUR REMOTE KEY' );</pre>
	<?php
}





function remote_logging_url_info_help_tab_html() {
	?>
	<h2>
		<?php _e('Remote Logging URL', 'event_espresso'); ?>
	</h2>
	<p><?php _e("This option sends all Event Espresso debugging data and get/post variables to the specified URL.", 'event_espresso'); ?></p>
	<p>
		<?php _e('To see for yourself, "Make a PostBin" at <a href="http://www.postbin.org/" target="_blank">PostBin</a>. Then enter the PostBin URL into the "Remote Logging URL" field.', 'event_espresso'); ?>
	</p>
	<?php
}





function affiliate_info_help_tab_html() {
	?>
	<h2>
		<?php _e('Affiliate Details', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('Promote Event Espresso and earn cash!', 'event_espresso'); ?>
	</p>
	<p>Get paid by helping other event mangers understand the power of Event Espresso by becoming an affiliate.</p>
	<ol>
		<li>Go to the <a href="https://www.e-junkie.com/affiliates/?cl=113214&amp;ev=5649f286f0" target="_blank">e-junkie site</a> to get your affiliate link</li>
		<li>All affiliates get 20% from each sale</li>
		<li>Payments are made only through paypal</li>
		<li>Payments are sent at the beginning of each month for the sales of  the previous month</li>
		<li>Payments will be made regardless of the sales volume. There is no  minimum limit</li>
		<li>You can create your own banner or use the ones below</li>
	</ol>
	<p> <a href="http://eventespresso.com/affiliates/" target="_blank">
		<?php _e('Banners and More Info >>', 'event_espresso'); ?>
		</a> </p>
	<?php
}