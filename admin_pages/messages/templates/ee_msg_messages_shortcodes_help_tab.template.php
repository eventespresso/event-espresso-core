<p><strong><?php _e('Message Shortcodes', 'event_espresso'); ?></strong></p>
<p><?php _e('The following list of shortcodes can be used for this Messenger and Message Type. You can use the descriptions to learn what the shortcode will be parsed to when the final message is generated.', 'event_espresso'); ?></p>

<?php
foreach ( $shortcodes as $name => $description ) :
?>
	<p><strong><?php echo $name; ?></strong></p>
	<p><?php echo $description; ?></p>
<?php endforeach; ?>