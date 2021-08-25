<?php

/**
 * This file is the wrapper template for the messages-custom-template-switcher content
 * @package Event Espresso
 * @subpackage Admin
 * @since 4.3.0
 */

/**
 * Template args in this template
 * @var string $selector_rows   contains all the rows for the table.
 */
?>
<table class="messages-custom-template-switcher">
    <thead>
        <tr>
            <td><?php esc_html_e('Message Type', 'event_espresso'); ?></td>
            <td><?php esc_html_e('Template In Use', 'event_espresso'); ?></td>
            <td><?php esc_html_e('Actions', 'event_espresso'); ?></td>
        </tr>
    </thead>
    <tbody>
        <?php echo $selector_rows; // already escaped ?>
    </tbody>
</table>
