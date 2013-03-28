<h2><?php _e('About the Message Template Editor', 'event_espresso'); ?></h2>
<p><?php _e('Here are a few things you should know about the Message Template Editor:', 'event_espresso'); ?></p>
<h3><?php _e('1. The Event Editor Title', 'event_espresso'); ?></h3>
<p><?php echo $img1; ?></p>
<p><?php _e('The Event Editor title is very helpful in indicating what template you are editing.  In the example above, we can tell at a glance that we are editing the template that is for the <strong>email</strong> messenger, the <strong>Payment</strong> message type, and the <strong>Event Admin</strong> context (which for this message type means "recipient")', 'event_espresso'); ?></p>

<h3><?php _e('2. "Context Switcher" and Preview Button', 'event_espresso'); ?></h3>
<p><?php echo $img2; ?></p>
<p><?php _e('The context switcher allows you to quickly switch which template you are editing. The current context you are working on is displayed in the dropdown but you can switch to any other template for contexts available to the messenger and message type template group you are working on.', 'event_espresso'); ?></p>
<p><?php _e('Remember, contexts can represent different things, but in this example they represent "recipients" and so they are labelled as such.  In this example (for email payment confirmations), you may want Event Administrators to receive different information than Primary Attendees (the other context available to edit).', 'event_espresso'); ?></p>
<p><?php _e('The <strong>Preview</strong> button is simply a link to a special view of the current template displayed to give you an idea of how the actual message will look when delivered.  More information on what the preview displays is available in the content of the help tab on the preview page', 'event_espresso'); ?></p>

<h3><?php _e('3. Template Form Fields', 'event_espresso'); ?></h3>
<p><?php echo $img3; ?><?php _e('The entire middle area of the page is dedicated to all the fields related to the message tempalte.  These fields are dynamic in the sense that different messengers may require different fields (and sometimes different message types will add or subtract fields as well.', 'event_espresso'); ?></p>
<p><?php _e('When editing a "Email Payment Template", you will notice that there is a field labelled "Event List" along with "Main Content".  The Event List field is a special field that holds the template for whenever the <strong>[EVENT_LIST]</strong> shortcode is used in the "Main Content" field.  This is so you can more finely control how each "event" in the event list displays when shown in the Main content.  The "Email Registration Template", has an additional field called "Attendee List".  It functions much the same except that the contents of the "Attendee List" field are used to indicate how each attendee is listed in the Main Content when the <strong>[ATTENDEE_LIST]</strong> shortcode is parsed.', 'event_espresso'); ?></p>
<div style="clear:both"></div>

<h3><?php _e('4. Valid Shortcodes Metabox', 'event_espresso'); ?></h3>
<p>
	<?php echo $img4; ?><?php _e('The "Valid Shortcodes" metabox contains a list of all the shortcodes that can be used for the displayed template.  This list may appear to stay the same between templates, but its actually a dynamic list that varies between templates.', 'event_espresso'); ?>
</p>
<p><?php _e('This box is at a fixed height, but contents are scrollable.  You can click the little question mark to find out what the given shortcode will parse to when used in your template.', 'event_espresso'); ?></p>
<p><?php _e('<strong>An important note:</strong> The system has been designed so that when you save the template, checks will be performed on each field to make sure that only valid shortcodes (or values) are used within them.  You will get a warning box with clear instructions if you\'ve tried to use a particular shortcode in a field that does not support it.  Also, you\'ll want to try the Preview button if you\'ve made any changes to the template to see if the changes are as you expected!', 'event_espresso'); ?></p>
