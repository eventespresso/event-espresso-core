<div id="recaptcha_info">
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