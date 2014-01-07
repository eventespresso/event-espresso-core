<h2>
<?php _e('Question Text', 'event_espresso'); ?>
</h2>
<p>
<?php _e("The actual question to display to registrants who are signing up for events.", 'event_espresso'); ?>
</p>

<h2>
<?php _e('Question Label', 'event_espresso'); ?>
</h2>
<p>
<?php _e('An administrative label for this question to help you differentiate between two questions that may appear the same to registrants (but are for different events). For example: You could have two questions that simply ask the registrant to choose a "Size", then use this field to label one "T-shirt Size" and the other "Shoe Size".', 'event_espresso'); ?>
</p>
<p><?php _e('System questions will always be used internally for their intended purpose and any attempts to change them to something else may result in errors. For example, changing the sytem question for "Email" to ask for anything other than an email address will cause registration form validation errors, because the system will still be expecting that field to contain an email address. Admin Labels for System questions can not be edited','event_espresso')?></p>

<h2><?php _e('Question Admin Only', 'event_espresso'); ?></h2>
<p><?php _e('This setting allows you to indicate that the question should ONLY appear to admins.', 'event_espresso'); ?></p>
<p><strong><?php _e('Note: If you make the question admin only, then the "Required Question" setting will be set to optional and cannot be changed.', 'event_espresso'); ?></strong></p>

<h2><?php _e('Question Order', 'event_espresso'); ?></h2>
<p><?php _e('This setting allows you to indicate what order the question should appear when listed with other questions in a question group.', 'event_espresso'); ?></p>


<h2>
<?php _e('Question Type', 'event_espresso'); ?>
</h2>
<p>
<?php
    echo sprintf(
                 __("
                    'TEXT' is best for small text based answers (fewer than 100 characters).%s
                    'TEXTAREA' is best for large text based answers (paragraphs).%s
                    'SINGLE' (radio buttons) is for a multiple-choice question where registrants can only choose one predetermined answer option.%s
                    'MULTIPLE' (checkboxes) allow users to select multiple answer options. Best when there are only a few predetermined answer options.%s
                    'DROPDOWN' (select boxes) allow users to select one or more answer options. Best when there are many predetermined answer options%s
                    'DATE' uses a javascript calendar to allow users to select a date."  ,'event_espresso'),
                    '<br />',
                    '<br />',
                    '<br />',
                    '<br />',
                    '<br />'
                    );?></p>

<h2>
<?php _e('Required Question', 'event_espresso'); ?>
</h2>
<p>
<?php _e("Whether or not registrants are required to answer this question.", 'event_espresso'); ?>
</p>

<h2>
<?php _e('Required Text', 'event_espresso'); ?>
</h2>
<p>
<?php _e("Text to display when the registrant does not answer the question but is required to.", 'event_espresso'); ?>
</p>