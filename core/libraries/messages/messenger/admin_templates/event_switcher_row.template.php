<?php

/**
 * This file is the wrapper template for the messages-custom-template-switcher rows
 * This template is content for event_switcher_wrapper.template.php
 *
 * @package Event Espresso
 * @subpackage Admin
 * @since 4.3.0
 *
 * Template args in this template
 *
 * @var string $mt_name         Message Type Name
 * @var string $mt_slug         Message Type Slug
 * @var string $messenger_slug  Messenger Name
 * @var string $selector        Selector for choosing what template gets used for this message type
 * @var string $create_button   To create a new custom template based off the selected template
 * @var string $edit_button     To edit the selected template.
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<tr id="<?php echo esc_attr($messenger_slug); ?>-message-selector-row-<?php echo esc_attr($mt_slug); ?>">
    <td><?php echo esc_html($mt_name); ?></td>
    <td><?php echo wp_kses($selector, AllowedTags::getWithFormTags()); ?></td>
    <td class="message-selector-action-column">
        <?php echo wp_kses($create_button . $edit_button, AllowedTags::getWithFormTags()); ?>
    </td>
</tr>
