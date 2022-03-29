<?php

/**
 * a template with options for resetting and/or deleting EE data
 *
 * @var string $delete_db_url
 * @var string $reset_capabilities_button
 * @var string $reset_db_url
 * @var string $reset_reservations_button
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<h2>
    <?php esc_html_e('Reset/Delete Data for Event Espresso', 'event_espresso'); ?>
</h2>
<br />

<div class="padding">
    <h4 class="espresso-header"><span class="dashicons dashicons-update ee-icon-size-22"></span>
        <?php esc_html_e('Reset Ticket and Datetime Reserved Counts', 'event_espresso'); ?>
    </h4>
    <p><?php esc_html_e('Use this to reset the counts for ticket and datetime reservations.', 'event_espresso'); ?></p>
    <div class="float-right"><?php echo wp_kses($reset_reservations_button, AllowedTags::getAllowedTags()); ?></div>
    <div class="clear"></div>
</div>
<br />
<br />

<!-- reset DB url is here. Just need to make it look pretty and unhide it-->
<div class="padding">
    <h4 class="espresso-header"><span class="dashicons dashicons-update ee-icon-size-22"></span>
        <?php esc_html_e('Reset Event Espresso Capabilities', 'event_espresso'); ?>
    </h4>
    <p>
        <?php esc_html_e(
            'Use this to reset the capabilities on WP roles to the defaults as defined via EE_Capabilities.  Note this reset does not REMOVE any existing capabilities, it just ensures that all the defaults are ADDED to the roles.',
            'event_espresso'
        ); ?>
    </p>
    <div class="float-right"><?php echo wp_kses($reset_capabilities_button, AllowedTags::getAllowedTags()); ?></div>
    <div class="clear"></div>
</div>
<br />
<br />

<div class="padding">
    <h4 class="espresso-header"><span class="dashicons dashicons-update ee-icon-size-22"></span>
        <?php esc_html_e('Reset Event Espresso Data', 'event_espresso'); ?>
    </h4>
    <p>
        <?php esc_html_e(
            ' This will reset data for Event Espresso 4, and for all active add-ons. Inactive add-ons will not be affected.',
            'event_espresso'
        ); ?>
    </p>
    <p>
        <?php esc_html_e(
            'Your Event Espresso data will return to its default settings. The rest of your website will be unaffected.',
            'event_espresso'
        ); ?>
    </p>
    <div class="float-right">
        <a class="button button-primary ee-confirm" href="<?php echo esc_url_raw($reset_db_url); ?>">
            <?php esc_html_e('Reset Event Espresso Tables', 'event_espresso'); ?>
        </a>
    </div>
    <div class="clear"></div>
</div>
<br />
<br />

<div class="padding">
    <h4 class="espresso-header">
        <span class="dashicons dashicons-post-trash ee-icon-size-22"></span>
        <?php esc_html_e('Permanently Delete ALL Event Espresso Data', 'event_espresso'); ?>
    </h4>
    <p>
        <?php esc_html_e(
            ' This will delete data for Event Espresso 4, and all currently active add-ons. Event Espresso will then be deactivated. You may need to manually deactivate each add-on individually.',
            'event_espresso'
        ); ?>
    </p>
    <p>
        <?php esc_html_e(
            'If you know for certain that you will no longer be using Event Espresso and you wish to remove ALL traces of the plugin from your system, then perform the following steps.',
            'event_espresso'
        ); ?>
    </p>
    <p class="important-notice">
        <?php printf(
            esc_html__('Please note: %sThis is permanent and can NOT be undone.%s', 'event_espresso'),
            '<em>',
            '</em>'
        ); ?>
        <br />
    </p>
    <ol>
        <li>
            <?php printf(
                esc_html__(
                    'First, click the button below to permanently delete all Event Espresso tables, records, and options from your WordPress database . If you receive a "500 Internal Server Error" or a blank white screen, it means the server has timed out due to the large number of records being updated. This is not a cause for concern. Simply %1$srefresh the page%2$s and the Database Update will continue where it left off.',
                    'event_espresso'
                ),
                '<strong>',
                '</strong>'
            ); ?>
        </li>
        <li>
            <?php printf(
                esc_html__(
                    'Then, locate Event Espresso on the WordPress Plugins page, and click on %sDelete%s',
                    'event_espresso'
                ),
                '<strong>',
                '</strong>'
            ); ?>
        </li>
        <li>
            <?php printf(
                esc_html__(
                    'Once you are on the Delete Plugin page, click on %sYes, Delete these files and data%s',
                    'event_espresso'
                ),
                '<strong>',
                '</strong>'
            ); ?>
        </li>
        <li>
            <?php printf(
                esc_html__('Note: Event Espresso 4 categories are %snot%s deleted by this script', 'event_espresso'),
                '<strong>',
                '</strong>'
            ); ?>
            <br>
            <a href="<?php echo esc_url_raw(admin_url('edit-tags.php?taxonomy=espresso_event_categories')); ?>">
                <?php esc_html_e('You can go here to delete Event Espresso categories', 'event_espresso'); ?>
            </a>
        </li>
    </ol>
    <div class="float-right">
        <a href="<?php echo esc_url_raw($delete_db_url); ?>" id="delete-all-data-btn" class="button-primary ee-confirm">
            <?php esc_html_e('Permanently Delete All Event Espresso Data', 'event_espresso'); ?>
        </a>
    </div>
    <div class="clear"></div>
</div>
<br />
<br />


