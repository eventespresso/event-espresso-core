<div class="padding">
	<dl id="faqs">
		<dt>
			<?php _e('Registration page just refreshes?', 'event_espresso'); ?>
		</dt>
		<dd>
			<?php _e('Usually its because you need to point the &quot;Main registration page:&quot; (in the Organization Settings page) to whatever page you have the shortcode', 'event_espresso'); ?>
			[ESPRESSO_EVENTS]
		<?php _e('on', 'event_espresso'); ?>
			. </dd>
		<dt>
			<?php _e('Paypal IPN Problem?', 'event_espresso'); ?>
		</dt>
		<dd>
			<p>
<?php _e('Four things to check with PayPal when payments notifications are not being sent to Event Espresso.', 'event_espresso'); ?>
			</p>
			<ol>
				<li>
					<?php _e('Make sure you have a standard or a business PayPal account, personal accounts don\'t work.', 'event_espresso'); ?>
				</li>
				<li>
					<?php _e('Turn on your IPN.', 'event_espresso'); ?>
				</li>
				<li>
					<?php _e('Make sure your PayPal account is verified.', 'event_espresso'); ?>
				</li>
				<li>
<?php _e('Make sure your Event Espresso pages are not protected or private.', 'event_espresso'); ?>
				</li>
			</ol>
			<p class="more-info">
<?php _e('More information can be found here:', 'event_espresso'); ?>
				<br />
				<a href="http://eventespresso.com/search-results/?q=ipn" target="_blank"> http://eventespresso.com/search-results/?q=ipn</a></p>
		</dd>
	</dl>
</div>