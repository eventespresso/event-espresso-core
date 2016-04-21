<p><strong><?php _e('Registration Form Settings', 'event_espresso'); ?></strong></p>
<p>
<?php _e('This page shows options for Email Validation, the EE "Bot Trap" and reCAPTCHA which can help prevent SPAM registrations on your site.', 'event_espresso'); ?>
</p>
<div id="email_validation_info">
<p><strong><?php _e('Email Validation', 'event_espresso');?></strong></p>
<p><?php _e("Validating an email address is extremely difficult to do correctly. Your server's configuration, as well as your own tolerances and needs, can affect the type of validation needed. We offer different types of validation so that you can control how strict your registration form responds to entered email addresses. If you are receiving too many bogus email addresses, then you can try the WordPress Default validation setting. If you find that the form validation is blocking a valid email address you can try the Basic setting, or if available, the International validation settings.", 'event_espresso'); ?>
</p>
<p><strong><?php _e('Validation Options:', 'event_espresso' );?></strong></p>
<ul>
<li>
	<?php _e('"Basic" - only checks that an email address follows the most basic structure guidelines ( ie: text@text.text ). Will work with the widest range of email addresses but will also allow the most garbage through.', 'event_espresso'); ?></li>
<li>
	<?php _e('"WordPress Default" - uses built in WordPress email validation, but does not support unicode characters (ie: international characters from non-latin based languages).','event_espresso'); ?></li>
<li>
	<?php _e('"International" - supports unicode characters but may not be supported by all server configurations. Try this first if you need to international language support, but drop back down to "Basic" if your server configuration conflicts.', 'event_espresso'); ?>
</li>
<li>
	<?php _e('"International + DNS Check" - same as "International" but also performs MX and A record DNS checks to verify that the email address domain exists (ie: the portion of the address after the "@"). Can not verify that the local portion of the email address is valid (ie: the first portion of the address before the "@").', 'event_espresso'); ?>
</li>
</ul>
</div>
<div id="recaptcha_info">
<p><strong><?php _e('reCAPTCHA Information', 'event_espresso'); ?></strong></p>
<p><?php echo sprintf(__('%s helps prevent automated abuse of your site (such as comment spam or bogus registrations) by using a %s to ensure that only humans perform certain actions.', 'event_espresso'), '<a href="https://www.google.com/recaptcha/intro/index.html" target="_blank">reCAPTCHA</a>', '<a href="https://www.google.com/recaptcha/admin#whyrecaptcha">reCAPTCHA</a>'); ?> </p>
<p><?php echo sprintf(__('You must sign up for a free %s account to use it with this plugin. If you already have a reCAPTCHA account enter your "Public" and "Private" keys on this page.', 'event_espresso'), '<a href="https://www.google.com/recaptcha/admin#createsite" target="_blank">reCAPTCHA</a>'); ?> </p>
<p><strong><?php _e('Helpful Links:', 'event_espresso'); ?></strong></p>
<ul>
<li><a href="https://www.google.com/recaptcha/intro/index.html#the-recaptcha-advantage" target="_blank">What is reCAPTCHA</a></li>
<li><a href="https://www.google.com/recaptcha/intro/index.html" target="_blank">reCAPTCHA Home Page</a></li>
</ul>
</div>
<p>
<strong><?php _e('Recommendations', 'event_espresso'); ?></strong><br />
<?php _e('Want to see a tour of this screen? Click on the Registration Form Settings Tour button which appears on the right side of the page. <br />To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Screen Options', 'event_espresso'); ?></strong><br />
<?php _e('You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>