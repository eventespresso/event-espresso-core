<?php
/**
 * This file contains the template for the Messages Shortcode selector.
 *
 * Template args available are:
 * @type    array   $shortcodes An array indexed by shortcode and the values are the labels.
 * @type    string  $fieldname  The name of the field the chooser is associated with.
 * @type    string  $linked_input_id The name of the input that the shortcode gets inserted to.
 */
if ( ! empty( $shortcodes ) ) : ?>
<span class="ee-messages-shortcodes-chooser js-open-list-trigger dashicons dashicons-menu">
	<ul id="ee_shortcode_chooser_<?php echo $fieldname; ?>" class="ee_shortcode_chooser_container hidden">
		<?php foreach( $shortcodes as $shortcode => $label ) : ?>
			<li>
				<span class="js-shortcode-selection" data-value="<?php echo esc_attr( $shortcode ); ?>" data-linked-input-id="<?php echo esc_attr( $linked_input_id ); ?>"><?php echo $shortcode; ?></span>
			</li>
		<?php endforeach; ?>
	</ul>
</span>
<?php endif ; ?>