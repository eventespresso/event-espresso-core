
<div id="contact_info" class="pop-help" style="display:none">
	<h2>
		<?php _e('Contact Information', 'event_espresso'); ?>
	</h2>
	<p><?php echo __('Displayed on all emails and invoices.', 'event_espresso'); ?></p>
</div>
<div id="return_url_info" class="pop-help" style="display:none">
	<h2>
		<?php _e('Auto Return URL', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('The URL to which the payer\'s browser is redirected after completing the payment; for example, a URL on your site that displays a "Thank you for your payment" page.', 'event_espresso'); ?>
	</p>
	<p><?php echo sprintf(__("This page should contain the %s shortcode.", 'event_espresso'), '<strong>[ESPRESSO_PAYMENTS]</strong>'); ?></p>
	<p><em class="important"><b>
		<?php _e('ATTENTION:', 'event_espresso'); ?>
		</b><br />
		<?php _e('This page should be hidden from from your navigation menu. Exclude pages by using the "Exclude Pages" plugin from http://wordpress.org/extend/plugins/exclude-pages/ or using the "exclude" parameter in your "wp_list_pages" template tag. Please refer to http://codex.wordpress.org/Template_Tags/wp_list_pages for more inforamation about excluding pages.', 'event_espresso'); ?>
		</em> </p>
</div>
<div id="cancel_return_info" class="pop-help" style="display:none">
	<h2>
		<?php _e('Cancel Return URL', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('A URL to which the payer\'s browser is redirected if payment is cancelled; for example, a URL on your website that displays a "Payment Canceled" page.', 'event_espresso'); ?>
	</p>
	<p>
		<?php _e('This should be a page on your website that contains a cancelled message. No short tags are needed.', 'event_espresso'); ?>
	</p>
	<p><em class="important"><b>
		<?php _e('ATTENTION:', 'event_espresso'); ?>
		</b><br />
		<?php _e('This page should be hidden from from your navigation menu. Exclude pages by using the "Exclude Pages" plugin from http://wordpress.org/extend/plugins/exclude-pages/ or using the "exclude" parameter in your "wp_list_pages" template tag. Please refer to http://codex.wordpress.org/Template_Tags/wp_list_pages for more inforamation about excluding pages.', 'event_espresso'); ?>
		</em></p>
</div>
<div id="notify_url_info" class="pop-help" style="display:none">
	<h2>
		<?php _e('Notify URL', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('The URL to which PayPal posts information about the transaction, in the form of Instant Payment Notification messages.', 'event_espresso'); ?>
	</p>
	<p> <?php echo sprintf(__('This page should contain the %s shortcode.', 'event_espresso'), '<strong>[ESPRESSO_TXN_PAGE]</strong>'); ?> </p>
	<p><em class="important"><b>
		<?php _e('ATTENTION:', 'event_espresso'); ?>
		</b><br />
		<?php _e('This page should be hidden from from your navigation menu. Exclude pages by using the "Exclude Pages" plugin from http://wordpress.org/extend/plugins/exclude-pages/ or using the "exclude" parameter in your "wp_list_pages" template tag. Please refer to http://codex.wordpress.org/Template_Tags/wp_list_pages for more inforamation about excluding pages.', 'event_espresso'); ?>
		</em> </p>
</div>
<div id="registration_page_info" class="pop-help" style="display:none">
	<h2>
		<?php _e('Main Events Page', 'event_espresso'); ?>
	</h2>
	<p><?php echo sprintf(__('This is the page that displays your events and doubles as your registration page. It is very important that this page always contains the %s shortcode.', 'event_espresso'), '<strong>[ESPRESSO_EVENTS]</strong>'); ?></p>
	<p><?php echo sprintf(__("This page should ALWAYS contain the %s shortcode.", 'event_espresso'), '<strong>[ESPRESSO_EVENTS]</strong>'); ?></p>
</div>
<div id="affiliate_info" class="pop-help" style="display:none">
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
</div>
<div id="recaptcha_info" class="pop-help" style="display:none">
	<h2>
		<?php _e('reCAPTCHA Information', 'event_espresso'); ?>
	</h2>
	<p> <?php echo sprintf(__('%s helps prevent automated abuse of your site (such as comment spam or bogus registrations) by using a %s to ensure that only humans perform certain actions.', 'event_espresso'), '<a href="https://admin.recaptcha.net/accounts/signup/?next=%2Frecaptcha%2Fsites%2F" target="_blank">reCAPTCHA</a>', '<a href="http://recaptcha.net/captcha.html">CAPTCHA</a>'); ?> </p>
	<p> <?php echo sprintf(__('You must sign up for a free %s account to use it with this plugin. If you already have a reCAPTCHA account enter your "Public" and "Private" keys on this page.', 'event_espresso'), '<a href="https://admin.recaptcha.net/accounts/signup/?next=%2Frecaptcha%2Fsites%2F" target="_blank">reCAPTCHA</a>'); ?> </p>
	<p><strong>
		<?php _e('Helpful Links:', 'event_espresso'); ?>
		</strong></p>
	<ul>
		<li><a href="http://recaptcha.net/" target="_blank">reCAPTCHA Home Page</a></li>
		<li><a href="http://recaptcha.net/learnmore.html" target="_blank">What is reCAPTCHA</a></li>
		<li><a href="https://admin.recaptcha.net/accounts/login/?next=/recaptcha/sites/" target="_blank">reCAPTCHA Account</a></li>
		<li><a href="http://recaptcha.net/apidocs/captcha/client.html" target="_blank">reCAPTCHA Client API Documentation</a></li>
	</ul>
</div>
<div id="fancyemailheaders" class="pop-help" style="display:none">
	<h2>
		<?php _e('Personalized Email Headers', 'event_espresso'); ?>
	</h2>
	<p><?php echo sprintf(__("This option enables the use of the email header format: %s From: name %s %s Reply-to: name %s", 'event_espresso'), '<br />', '&lt;email@address.com&gt;', '<br />', '&lt;email@address.com&gt;'); ?></p>
	<p>
		<?php _e("You should only use this if you know it will not cause email delivery problems. Some servers will not send emails that use this format.", 'event_espresso'); ?>
	</p>
</div>

<div id="full_logging_info" class="pop-help" style="display:none">
	<h2>
		<?php _e('Full Logging', 'event_espresso'); ?>
	</h2>
	<p><?php _e("Every time a page is accessed on your site. This option will save all Event Espresso registration form data, and debugging information to a file in the \"/wp-content/uploads/espresso/logs/\" directory on your server.", 'event_espresso'); ?></p>
	<p class="red_text"><?php _e('Please use caution when using this feature. These files may be pubicly available.', 'event_espresso'); ?></p>
	
</div>


<div id="remote_logging_info" class="pop-help" style="display:none">
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


</div>

<div id="remote_logging_url_info" class="pop-help" style="display:none">
	<h2>
		<?php _e('Remote Logging URL', 'event_espresso'); ?>
	</h2>
	<p><?php _e("This option sends all Event Espresso debugging data and get/post variables to the specified URL.", 'event_espresso'); ?></p>
	<p>
		<?php _e('To see for yourself, "Make a PostBin" at <a href="http://www.postbin.org/" target="_blank">PostBin</a>. Then enter the PostBin URL into the "Remote Logging URL" field.', 'event_espresso'); ?>
	</p>
	
	<p>
		<?php //_e('<a href="admin.php?page=event_espresso&create_postbin=Y&Submit_4=true#remote_logging_stuff" target="_self">Create a new PostBin Now</a>', 'event_espresso'); ?>
	</p>
</div>