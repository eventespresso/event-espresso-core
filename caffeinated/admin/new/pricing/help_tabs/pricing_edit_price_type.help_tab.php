<?php
use EventEspresso\core\domain\Domain;
?>
<p><strong><?php esc_html_e('Edit Price Type', 'event_espresso'); ?></strong></p>
<p>
<?php printf(
    esc_html__('This page allows you to edit a price type for %s.', 'event_espresso'),
    Domain::brandName()
); ?>
</p>
<ul>
<li>
<strong><?php esc_html_e('Basic Type', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the kind of base type. Available options are Discount, Surcharge, and Tax.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Price Type Name', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the name of the price type.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Percentage or Fixed Amount?', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Whether this price type should be applied as a percentage (%) or a fixed amount.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Order of Application', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the order in which price types are applied. Higher numbered price types will apply first. For example a price type with a order of application of 50 will apply before one that has an order of application of 20.', 'event_espresso'); ?>
</li>
</ul>
<p>
<strong><?php esc_html_e('Recommendations', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Want to see a tour of this screen? Click on the Edit Price Type Tour button which appears on the right side of the page. To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<strong><?php esc_html_e('Screen Options', 'event_espresso'); ?></strong><br />
<?php esc_html_e('You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>
