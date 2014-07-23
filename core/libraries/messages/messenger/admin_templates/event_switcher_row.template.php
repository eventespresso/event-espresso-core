<?php
/**
 * This file is the wrapper template for the messages-custom-template-switcher rows
 * This template is content for event_switcher_wrapper.template.php
 * @package Event Espresso
 * @subpackage Admin
 * @since 4.3.0
 */

/**
 * Template args in this template
 * $mt_name			Message Type Name
 * $mt_slug				Message Type Slug
 * $messenger_slug	Messenger Name
 * $selector 			Selector for choosing what template gets used for this message type
 * $create_button		To create a new custom template based off the selected template
 * $edit_button			To edit the selected template.
 */
?>
<tr id="<?php echo $messenger_slug; ?>-message-selector-row-<?php echo $mt_slug; ?>">
	<td><?php echo $mt_name; ?></td>
	<td><?php echo $selector; ?></td>
	<td class="message-selector-action-column"><?php echo $create_button; ?><?php echo $edit_button; ?></td>
</tr>
