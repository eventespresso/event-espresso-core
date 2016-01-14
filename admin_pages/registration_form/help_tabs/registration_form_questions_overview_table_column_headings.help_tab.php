<p><strong><?php _e('Questions Overview Table Column Headings', 'event_espresso'); ?></strong></p>
<p>
<ul>
<li>
<strong><?php _e('ID', 'event_espresso'); ?></strong><br />
<?php _e('This is the numerical ID for the question. This value is used internally for Event Espresso.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Question', 'event_espresso'); ?></strong><br />
<?php _e('This shows the question as it will be displayed on the registration form. Clicking on the question will take you to another page so that you can edit the options for the selected question.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Admin Label', 'event_espresso'); ?></strong><br />
<?php _e('This field is only shown to the admin. It is useful for understanding the difference between questions that appear to be similar but are used in various situations. Also shows if this question is a system question.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Type', 'event_espresso'); ?></strong><br />
<?php _e('This shows the type of question. Available options are Text, Textarea, Checkboxes, Radio Buttons, Dropdown, State/Province Dropdown, Country Dropdown, and Date Picker.', 'event_espresso'); ?>
<ul>
<li style="list-style-type: none;">
<strong><?php _e('Text', 'event_espresso'); ?></strong><br />
<?php _e('This option is useful for questions that need a short response (less than 140 characters).', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Textarea', 'event_espresso'); ?></strong><br />
<?php _e('This option is useful for long text answers such as paragraphs of information.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Single', 'event_espresso'); ?></strong><br />
<?php _e('This option uses radio buttons and lets you choose a single answer.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Dropdown', 'event_espresso'); ?></strong><br />
<?php _e('This option option uses a dropdown field.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Multiple Choice', 'event_espresso'); ?></strong><br />
<?php _e('This option uses checkmark fields and allows multiple answers from a predetermined set of choices.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Date', 'event_espresso'); ?></strong><br />
<?php _e('This option shows a calendar and allows users to select a date.', 'event_espresso'); ?>
</li>
</ul>
</li>
<li>
<strong><?php _e('Values', 'event_espresso'); ?></strong><br />
<?php _e('This shows the answers to a question if it has multiple answers. If it does not, then N/A will be displayed.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Req', 'event_espresso'); ?></strong><br />
<?php _e('This is short for "required" and shows if a question must be answered in the registration form.', 'event_espresso'); ?>
</li>
</ul>
</p>
<p>
<strong><?php _e('Notice', 'event_espresso'); ?></strong><br />
<?php _e('System questions are created by Event Espresso and cannot be deleted. However, they can be edited. Be careful when editing these system questions as they are required for registrations to work correctly.', 'event_espresso'); ?>
</p>
