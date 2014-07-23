<?php
/**
 * This file is the wrapper template for the messages-custom-template-switcher content
 * @package Event Espresso
 * @subpackage Admin
 * @since 4.3.0
 */

/**
 * Template args in this template
 * $selector_rows	contains all the rows for the table.
 */
?>
<table class="messages-custom-template-switcher">
	<thead>
		<tr>
			<td><?php _e('Message Type', 'event_espresso'); ?></td>
			<td><?php _e('Template In Use', 'event_espresso'); ?></td>
			<td><?php _e('Actions', 'event_espresso'); ?></td>
		</tr>
	</thead>
	<tbody>
		<?php echo $selector_rows; ?>
	</tbody>
</table>
