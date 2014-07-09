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
	<p><?php _e('This section allows you to change the layout of this message template using any registered messages template packs.  Note, that when you select a new template pack you will lose any customizations on your existing message template.', 'event_espresso'); ?><p>
	<label for="MTP_template_pack"><?php _e('Template Pack:', 'event-espresso'); ?></label> <?php echo $template_packs_selector; ?><br>
	<p><?php _e('Here are all the variations available for the selected template pack.  Whereas template packs affect the entire layout of the template, variations are different styles for the selected template.  You can change a variation and not lose any customizations.', 'event_espresso' ); ?></p>
	<label for="MTP_template_variation"><?php _e("Template_Variation", 'event_espresso'); ?></label><?php echo $variations_selector; ?>
</div>
