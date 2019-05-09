<?php
use EventEspresso\core\domain\Domain;
?>
<p><strong><?php esc_html_e('Questions Overview Table Column Headings', 'event_espresso'); ?></strong></p>
<ul>
<li>
<strong><?php esc_html_e('ID', 'event_espresso'); ?></strong><br />
<?php printf(
    esc_html__(
        'This is the numerical ID for the question. This value is used internally for %s.',
        'event_espresso'
    ),
    Domain::brandName()
); ?>
</li>
<li>
<strong><?php esc_html_e('Question', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This shows the question as it will be displayed on the registration form. Clicking on the question will take you to another page so that you can edit the options for the selected question.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Admin Label', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This field is only shown to the admin. It is useful for understanding the difference between questions that appear to be similar but are used in various situations. Also shows if this question is a system question.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Type', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This shows the type of question. Available options are Text, Textarea, Checkboxes, Radio Buttons, Dropdown, State/Province Dropdown, Country Dropdown, and Date Picker.', 'event_espresso'); ?>
<ul>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Text', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This option is useful for questions that need a short response (less than 140 characters).', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Textarea', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This option is useful for long text answers such as paragraphs of information.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Single', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This option uses radio buttons and lets you choose a single answer.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Dropdown', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This option option uses a dropdown field.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Multiple Choice', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This option uses checkmark fields and allows multiple answers from a predetermined set of choices.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Date', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This option shows a calendar and allows users to select a date.', 'event_espresso'); ?>
</li>
</ul>
</li>
<li>
<strong><?php esc_html_e('Values', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This shows the answers to a question if it has multiple answers. If it does not, then N/A will be displayed.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Req', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is short for "required" and shows if a question must be answered in the registration form.', 'event_espresso'); ?>
</li>
</ul>
<p>
<strong><?php esc_html_e('Notice', 'event_espresso'); ?></strong><br />
<?php printf(
    esc_html__(
        'System questions are created by %s and cannot be deleted. However, they can be edited. Be careful when editing these system questions as they are required for registrations to work correctly.',
        'event_espresso'
    ),
    Domain::brandName()
); ?>
</p>
