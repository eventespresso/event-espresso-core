<h3><?php _e('Questions Overview Table Column Headings', 'event_espresso'); ?></h3>
<p>
<ul>
<li>
<?php _e('<strong>ID</strong>', 'event_espresso'); ?><br />
<?php _e('This is the numerical ID for the question. This value is used internally for Event Espresso.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Question</strong>', 'event_espresso'); ?><br />
<?php _e('This shows the question as it will be displayed on the registration form. Clicking on the question will take you to another page so that you can edit the options for the selected question.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Admin Label</strong>', 'event_espresso'); ?><br />
<?php _e('This field is only shown to the admin. It is useful for understanding the difference between questions that appear to be similar but are used in various situations. Also shows if this question is a system question.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Type</strong>', 'event_espresso'); ?><br />
<?php _e('This shows the type of question. Available options are Text, Textarea, Single, Dropdown, Multiple Choice, and Date.', 'event_espresso'); ?>
<ul>
<li style="list-style-type: none;">
<?php _e('<strong>Text</strong><br />This option is useful for questions that need a short reponse (less than 140 characters).', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<?php _e('<strong>Textarea</strong><br />This option is useful for long text answers such as paragraphs of information.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<?php _e('<strong>Single</strong><br />This option uses radio buttons and lets you choose a single answer.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<?php _e('<strong>Dropdown</strong><br />This option option uses a dropdown field.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<?php _e('<strong>Multiple Choice</strong><br />This option uses checkmark fields and allows multiple answers from a predetermined set of choices.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<?php _e('<strong>Date</strong><br />This option shows a calendar and allows users to select a date.', 'event_espresso'); ?>
</li>
</ul>
</li>
<li>
<?php _e('<strong>Values</strong>', 'event_espresso'); ?><br />
<?php _e('This shows the answers to a question if it has multiple answers. If it does not, then N/A will be displayed.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Req</strong>', 'event_espresso'); ?><br />
<?php _e('This is short for "required" and shows if a question must be answered in the registration form.', 'event_espresso'); ?>
</li>
</ul>
</p>
<p>
<?php _e('<strong>Notice</strong><br />System questions are created by Event Espresso and cannot be deleted. However, they can be edited. Be careful when editing these system questions as they are required for regisrations to work correctly.'); ?>
</p>