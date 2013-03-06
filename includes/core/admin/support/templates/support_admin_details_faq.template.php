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
				<a href="http://eventespresso.com/forums/?submit.x=0&submit.y=0&s=ipn" target="_blank"> http://eventespresso.com/forums/?submit.x=0&amp;submit.y=0&amp;s=ipn</a></p>
		</dd>
		<dt>
			<?php _e('Why are mails are not being sent when somone registers?', 'event_espresso'); ?>
		</dt>
		<dd>
			<p>
<?php _e('Check your email settings on the', 'event_espresso'); ?>
			<a href="admin.php?page=espresso_messages"><?php _e('Event Espresso', 'event_espresso'); ?> > <?php _e('Messages', 'event_espresso'); ?></a> <?php _e('page', 'event_espresso'); ?><br />
				<img class="email-settings-img" src="http://ee-updates.s3.amazonaws.com/images/email-settings.png" width="472" height="120" />
			</p>
			<p>
<?php _e('If you\'re using WP SMTP with Gmail, also check your spam box to make sure Gmail isn\'t filtering the confirmation emails as spam.', 'event_espresso'); ?>
			</p>
		</dd>
		<dt>
<?php _e('My events are not importing correctly when I use the CSV upload tool.', 'event_espresso'); ?>
		</dt>
		<dd>
			<p>
<?php _e('Check your CSV for any apotrophes in the title or description. Using Excel (or someother spreadsheet application) find and replace all apostrophes with <tt>\&amp;#039;</tt>.  This is the HTML entity for \' and is how the titles are entered into the database.  For more information, see <a href="http://eventespresso.com/forums/2011/08/import-csv-malfunction" target="_blank">this forum post</a>.', 'event_espresso'); ?>
			</p>
		</dd>
	</dl>
</div>