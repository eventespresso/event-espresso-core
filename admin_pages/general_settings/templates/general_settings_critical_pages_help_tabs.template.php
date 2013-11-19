<?php


function event_list_cpt_info_help_tab_html(){
	?>
	<h2><?php _e('Event List Page', 'event_espresso'); ?></h2>
	<p><?php echo sprintf(__('If you would like to style the look of your events archive page, %s follow the Wordpress instructions for creating a custom template for archive pages %s. ', 'event_espresso'), '<a href="http://codex.wordpress.org/Post_Type_Templates">','</a>'); ?></p>
	<p><?php	_e("Note: if you want to create a custom template for your events, you should create template named 'archive-espresso_events.php' and place it in your theme's root directory (eg 'wp-content/themes/twenty-thirteen/')", "event_espresso"); ?></p>
	<p><?php	_e("Likewise, if you want to create a custom template for styling individual events, create a template named 'single-espresso_events.php' and place it in the same folder", "event_espresso"); ?>
	<?php
}
function registration_page_info_help_tab_html() { 
	?>
	<h2><?php _e('Registration Checkout Page', 'event_espresso'); ?></h2>
	<p><?php echo sprintf(__('This is the page that site visitors are directed to in oreder to complete their registration. It is very important that this page always contains the %s shortcode.', 'event_espresso'), '<strong>[ESPRESSO_CHECKOUT]</strong>'); ?></p>
	<?php
}




function transactions_info_help_tab_html() {
	?>
	<h2><?php _e('Transactions Page', 'event_espresso'); ?></h2>
	<p>
		<?php _e('The URL to which PayPal posts information about the transaction, in the form of Instant Payment Notification messages.', 'event_espresso'); ?>
	</p>
	<p> <?php echo sprintf(__('This page should contain the %s shortcode.', 'event_espresso'), '<strong>[ESPRESSO_TXN_PAGE]</strong>'); ?> </p>
	<p><em class="important"><strong>
		<?php _e('ATTENTION:', 'event_espresso'); ?>
		</strong><br />
		<?php _e('This page should be hidden from from your navigation menu. Exclude pages by using the "Exclude Pages" plugin from http://wordpress.org/extend/plugins/exclude-pages/ or using the "exclude" parameter in your "wp_list_pages" template tag. Please refer to http://codex.wordpress.org/Template_Tags/wp_list_pages for more inforamation about excluding pages.', 'event_espresso'); ?>
		</em> </p>
	<?php
}




function thank_you_page_info_help_tab_html() {
	?>
	<h2><?php _e('Thank You Page', 'event_espresso'); ?></h2>
	<p>
		<?php _e('The URL to which the payer\'s browser is redirected after completing the payment; for example, a URL on your site that displays a "Thank you for your payment" page.', 'event_espresso'); ?>
	</p>
	<p><?php echo sprintf(__("This page should contain the %s shortcode.", 'event_espresso'), '<strong>[ESPRESSO_THANK_YOU]</strong>'); ?></p>
	<p><em class="important"><b>
		<?php _e('ATTENTION:', 'event_espresso'); ?>
		</b><br />
		<?php _e('This page should be hidden from from your navigation menu. Exclude pages by using the "Exclude Pages" plugin from http://wordpress.org/extend/plugins/exclude-pages/ or using the "exclude" parameter in your "wp_list_pages" template tag. Please refer to http://codex.wordpress.org/Template_Tags/wp_list_pages for more inforamation about excluding pages.', 'event_espresso'); ?>
	</em> </p>
<?php
}





function cancel_return_info_help_tab_html() {
	?>
	<h2><?php _e('Cancel/Return Page', 'event_espresso'); ?></h2>
	<p>
		<?php _e('A URL to which the payer\'s browser is redirected if payment is cancelled; for example, a URL on your website that displays a "Payment Canceled" page.', 'event_espresso'); ?>
	</p>
	<p>
		<?php echo sprintf(__('This page should contain the %s shortcode.', 'event_espresso'), '<strong>[ESPRESSO_CANCELLED]</strong>'); ?>
	</p>
	<p><em class="important"><strong>
		<?php _e('ATTENTION:', 'event_espresso'); ?>
		</strong><br />
		<?php _e('This page should be hidden from from your navigation menu. Exclude pages by using the "Exclude Pages" plugin from http://wordpress.org/extend/plugins/exclude-pages/ or using the "exclude" parameter in your "wp_list_pages" template tag. Please refer to http://codex.wordpress.org/Template_Tags/wp_list_pages for more inforamation about excluding pages.', 'event_espresso'); ?>
		</em></p>
	<?php
}


