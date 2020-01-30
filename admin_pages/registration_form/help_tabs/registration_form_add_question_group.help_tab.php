<?php
use EventEspresso\core\domain\Domain;
?>
<p><strong><?php esc_html_e('Add New Question Group', 'event_espresso'); ?></strong></p>
<p>
<?php printf(
    esc_html__('This page allows you to add a new question group for %s.', 'event_espresso'),
    Domain::brandName()
); ?>
</p>
<ul>
<li>
<strong><?php esc_html_e('Group Name', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the name (title) of the question group as it will be displayed on the registration form. HTML cannot be used.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Group Identifier', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is a unique name (slug) for this group. It helps you tell the difference between this group and other groups that may appear to be similar. It is not shown to registrants and HTML cannot be used.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Group Description', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the description for the question group as it will be shown on the registration form. This can be shown to registrants and HTML is allowed.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Question Group Order', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Question Groups can be sorted by using the drag and drop feature on the Questions Group page. Another way to sort question groups is to adjust their order of application by using this field. A smaller order of application will be shown first. For example, a question group with an order of application of 1 will appear before one that has an order of application of 5.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Show Name', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Whether the group name will be displayed on the registration form.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Show Description', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Whether the description for the question group be will displayed on the registration form.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Questions that appear in this group', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This shows all available custom questions. If checked, then that question will appear with this question group.', 'event_espresso'); ?>
</li>
</ul>
<p>
<strong><?php esc_html_e('Recommendations', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Want to see a tour of this screen? Click on the Add New Question Group Tour button which appears on the right side of the page. To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<strong><?php esc_html_e('Screen Options', 'event_espresso'); ?></strong><br />
<?php esc_html_e('You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>