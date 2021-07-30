<p>
    <strong>
<?php esc_html_e('Templates', 'event_espresso'); ?>
    </strong>
</p>
<p>
<?php esc_html_e('This page shows options for single event pages and event list pages.', 'event_espresso'); ?>
</p>
<p>
    <strong>
<?php esc_html_e('Single Event Pages', 'event_espresso'); ?>
    </strong>
</p>
<ul>
<li>
<strong><?php esc_html_e('Display Status Banner', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Specify whether event status banners should be shown next to the title on the single event page. Notice: Some themes do not use the_title() tag correctly and this may cause things to appear broken (stray html). You can use this option to test your theme.', 'event_espresso'); ?>
</li>
</ul>
<ul>
<li>
<strong><?php esc_html_e('Display Venue Details', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Whether Venue information, such as the address and Google Map should be shown on the Single Event pages.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Display Order', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This setting controls the order of the event elements on the single event page. For example, if you want the venue details to appear above the ticket selector on the single event pages, just set the "Venue Display Order" setting to "1", and set the "Tickets Display Order" setting to "2". The lower the number, the further down the page the venue details will appear.', 'event_espresso'); ?>
</li>
</ul>
<p><strong>
<?php esc_html_e('Event List Pages', 'event_espresso'); ?>
</strong></p>
<ul>
<li>
<strong><?php esc_html_e('Event Listings URL', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the URL (website address) for your event list page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Display Status Banner', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Specify whether event status banners should be shown next to the title on the event list page. Notice: Some themes do not use the_title() tag correctly and this may cause things to appear broken (stray html). You can use this option to test your theme.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Display Descriptions', 'event_espresso'); ?></strong><br />
<?php printf(
    esc_html__(
        'Whether descriptions should be shown on the event list page.%1$sSelecting "none" will NOT display any of the text content you entered into the main text editor on the event admin page.%1$sSelecting "excerpt" will display the text you entered into the "Excerpt" textarea on the event admin page, OR, any text in the main text editor above the %2$s tag.%1$sSelecting "full description" will display ALL of the text content you entered into the main text editor on the event admin page.',
        'event_espresso'
    ),
    '<br/>',
    htmlentities('<!--more-->')
);?>
</li>
<li>
<strong><?php esc_html_e('Display Ticket Selector', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Whether the ticket options table (Ticket Selector) should be shown on the event list page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Display Datetimes', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Whether the event datetimes should be shown on the event list page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Display Venue Details', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Whether the venue details should be shown on the event list page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Display Expired Events', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Whether expired events should be shown on the event list page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Reset Event List Settings', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This option allows you to reset your event list settings to defaults.', 'event_espresso'); ?>
</li>
</ul>
<p>
<strong><?php esc_html_e('Recommendations', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Want to see a tour of this screen? Click on the Templates Tour button which appears on the right side of the page. <br />To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<strong><?php esc_html_e('Screen Options', 'event_espresso'); ?></strong><br />
<?php esc_html_e('You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>