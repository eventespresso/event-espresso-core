<?php
/**
 * This template is responsible for the template pack and variations metabox that appears on the Message Templates editor.
 *
 * @since %VER%
 *
 * Template args are:
 *
 * @type $template_packs_selector The selector for a template pack.
 * @type $variations_selector The selector for the variations on the selected template.
 */
?>
<div id="template-variations-selectors">
	<label for="MTP_template_pack"><?php _e('Template Pack:', 'event-espresso'); ?></label> <?php echo $template_packs_selector; ?>
	<p class="description"><?php _e('Template packs are entire new layouts for a message template.', 'event_espresso'); ?><p>
	<label for="MTP_template_variation"><?php _e("Template Variation", 'event_espresso'); ?></label><?php echo $variations_selector; ?>
	<p class="description"><?php _e('Variations are different styles available for the selected template pack.', 'event_espresso' ); ?></p>
</div>
