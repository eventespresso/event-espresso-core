<div class="padding">
<p>This page highlights frequently asked questions with Event Espresso.</p>
	<dl id="faqs">
		<dt>
			<?php _e('<strong>Why do the events and registrations pages say "Not found"?</strong>', 'event_espresso'); ?>
		</dt>
		<dd>
			<?php _e('Usually, this means the WordPress Permalink rewrite rules need to be flushed. You can flush the rules by going to Settings --> Permalinks. Then click on the Save Changes button.', 'event_espresso'); ?>
		<br />	
			<?php _e('Quick Link:', 'event_espresso'); ?>
			<a href="<?php echo site_url('/wp-admin/options-permalink.php'); ?>"><?php _e('Permalinks Settings', 'event_espresso'); ?></a>
		</dd>
		<br />	
		<dt>
			<?php _e('<strong>How do I change the part of the URL on the events pages to something other than "events"?</strong>', 'event_espresso'); ?>
		</dt>
		<dd>
			<?php _e('You can change this by adding a code snippet to your theme\'s functions.php file or in a custom snippet plugin. The following code snippet example shows how to change the URL slug to be "workshops".', 'event_espresso'); ?>
<?php // this may end up becoming a link to a documentation page at ee.com instead of a code snippet
?>
<pre>add_filter( 'FHEE__EE_Register_CPTs__register_CPT__rewrite', 'my_custom_event_slug', 10, 2 );
function my_custom_event_slug( $slug, $post_type ) {
	if ( $post_type == 'espresso_events' ) {
		$custom_slug = array( 'slug' => 'workshops' );
		return $custom_slug;
	}
	return $slug;
}</pre>
		</dd>
		<dt>
			<?php _e('<strong>How do I add the events page to my website\'s navigation menu?</strong>', 'event_espresso'); ?>
		</dt>
		<dd>
			<?php _e('You can add the events or venues page as items to the navigation menu by going to Appearance --> Menus and check the boxes found under the <strong>Event Espresso Pages</strong> section. Then click the Add to Menu button and finally click on the Save Menu button.', 'event_espresso'); ?>
		<br />	
			<?php _e('Quick Link:', 'event_espresso'); ?>
			<a href="<?php echo site_url('/wp-admin/nav-menus.php'); ?>"><?php _e('Menu Manager', 'event_espresso'); ?></a>
		</dd>	
		<br />	
		<dt>
			<?php _e('<strong>I see payments for tickets in my PayPal account, but they are not marked as paid in Event Espresso. How can I fix this issue?</strong>', 'event_espresso'); ?>
		</dt>
		<dd>
			<p>
				<?php _e('Here are four things you can check in your PayPal account and Event Espresso settings when payments notifications are not being sent to Event Espresso:', 'event_espresso'); ?>
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
				<a href="http://eventespresso.com/wiki/how-to-set-up-paypal-ipn/" target="_blank"><?php _e('How to set up the PayPal IPN', 'event_espresso'); ?></a></p>
		</dd>
	</dl>
</div>