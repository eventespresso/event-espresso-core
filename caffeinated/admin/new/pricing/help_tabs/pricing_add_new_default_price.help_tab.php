<?php
use EventEspresso\core\domain\Domain;
?>
<p><strong><?php esc_html_e('Add New Default Price', 'event_espresso'); ?></strong></p>
<p>
<?php printf(
    esc_html__('This page allows you to create a new default price for %s.', 'event_espresso'),
    Domain::brandName()
); ?>
</p>
<ul>
<li>
<strong><?php esc_html_e('Type', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the type of pricing. Available options are Base Price, Percent Discount, Fixed Discount, Percent Surcharge, Fixed Surcharge, Regional Tax, and Federal Tax.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Name', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the name of the default pricing.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Description', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the description for the default pricing.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Amount', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the value of the default pricing and is shown as a flat amount or a percentage.', 'event_espresso'); ?>
</li>
</ul>
<p>
<strong><?php esc_html_e('Recommendations', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Want to see a tour of this screen? Click on the Add New Default Price Tour button which appears on the right side of the page. To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<strong><?php esc_html_e('Screen Options', 'event_espresso'); ?></strong><br />
<?php esc_html_e('You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>
