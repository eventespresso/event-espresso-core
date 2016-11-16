<p><strong><?php esc_html_e('Message Template Editor', 'event_espresso'); ?></strong></p>
<p><?php _e('Here are a few things that you should know about the Message Template Editor:', 'event_espresso'); ?></p>
<p><strong><?php esc_html_e('1. The Event Editor Title', 'event_espresso'); ?></strong></p>
<p><?php echo $img1; ?></p>
<p><?php printf( esc_html__( 'The Event Editor title is very helpful in indicating which template you are currently editing.  In the example above, we can see that we are editing the template that for the %1$sEmail%2$s messenger, the %1$sPayment%2$s message type, and the %1$sEvent Admin%2$s context (which for this message type means "recipient").', 'event_espresso'), '<strong>','</strong>' ); ?></p>
<p><strong><?php esc_html_e('2. "Context Switcher" and Preview Button', 'event_espresso'); ?></strong></p>
<p><?php echo $img2; ?></p>
<p><?php esc_html_e('The context switcher allows you to quickly switch between templates. The current context you are working on is displayed in the dropdown. You can switch to any other template for contexts available to the messenger and message type template group you are working on.', 'event_espresso'); ?></p>
<p><?php esc_html_e('Remember that contexts can represent different things. In this example they represent "recipients" and so they are labelled as such. In this example (for email payment confirmations), you may want Event Administrators to receive different information than Primary Registrants (the other context available to edit).', 'event_espresso'); ?></p>
<p><?php printf( esc_html__('The %sPreview%s button is simply a link to a special view of the current template displayed to give you an idea of how the actual message will look when delivered. More information on what the preview displays is available in the content of the help tab on the preview page.', 'event_espresso'), '<strong>', '</strong>' ); ?>
</p>
<p><strong><?php esc_html_e('3. Template Form Fields', 'event_espresso'); ?></strong></p>
<p><?php echo $img3; ?><?php esc_html_e('The middle area of the page is dedicated to all the fields related to the message template. These fields are dynamic in the sense that different messengers may require different fields (and sometimes different message types will add or subtract fields as well.', 'event_espresso'); ?></p>
<p><?php printf( esc_html__('When editing a "Email Payment Template", you will notice that there is a field labelled "Event List" along with "Main Content". The Event List field is a special field that holds the template for whenever the %1$s[EVENT_LIST]%2$s shortcode is used in the "Main Content" field. This is so you can more finely control how each "event" in the event list displays when shown in the Main content. The "Email Registration Template", has an additional field called "Registration List". It functions much the same except that the contents of the "Registration List" field are used to indicate how each registrant is listed in the Main Content when the %1$s[ATTENDEE_LIST]%2$s shortcode is parsed.', 'event_espresso'), '<strong>', '</strong>' ); ?></p>
<div style="clear:both"></div>
<p><strong><?php esc_html_e('4. Valid Shortcodes Metabox', 'event_espresso'); ?></strong></p>
<p>
	<?php echo $img4; ?><?php esc_html_e('The "Valid Shortcodes" metabox contains a list of all the shortcodes that can be used for the displayed template. This list is dynamic and will vary between templates.', 'event_espresso'); ?>
</p>
<p><?php _e('This box is at a fixed height, but contents are scrollable. You can click the question mark to find out what the given shortcode will parse to when used in your template.', 'event_espresso'); ?></p>
<p><?php printf( esc_html__('%sAn important note:%s The system has been designed so that when you save the template, checks will be performed on each field to make sure that only valid shortcodes (or values) are used within them.  You will get a warning box with clear instructions if you\'ve tried to use a particular shortcode in a field that does not support it.  Also, you\'ll want to try the Preview button if you\'ve made any changes to the template to see if the changes are as you expected!', 'event_espresso'), '<strong>', '</strong>' ); ?>
</p>
<div style="clear:both"></div>
<p><strong><?php esc_html_e('5. Override All Custom', 'event_espresso'); ?></strong></p>
<p>
	<?php echo $img5; ?>
	<?php printf( esc_html__( 'When you are editing a template that is a global template (not a custom event template), you\'ll see an option in the Publish metabox in the right column labelled "Override all custom". When this option is selected, custom event templates for that %1$smessenger%2$s, %1$smessage type%2$s, and %1$scontext%2$s will be ignored and the global template will be used. Why would you want to do this? For this given example, you may want to be able to allow custom event templates to be able to modify the looks and content of what goes out to Primary Registrant but to never affect what the Event Administrator receives (as set by the global template).', 'event_espresso'), '<em>', '</em>' ); ?>
</p>
<p>
<strong><?php esc_html_e('Recommendations', 'event_espresso'); ?></strong><br />
<?php _e('Want to see a tour of this screen? Click on the Message Template Editor Tour button which appears on the right side of the page. <br />To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<strong><?php esc_html_e('Screen Options', 'event_espresso'); ?></strong><br />
<?php _e('You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>