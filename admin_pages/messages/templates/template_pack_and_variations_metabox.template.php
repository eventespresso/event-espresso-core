<?php
/**
 * This template is responsible for the template pack and variations metabox that appears on the Message Templates editor.
 *
 * @since 4.5.0
 *
 * Template args are:
 *
 * @type $template_packs_selector The selector for a template pack.
 * @type $variations_selector The selector for the variations on the selected template.
 * @type $template_pack_label The label for the template pack selector.
 * @type $template_variation_label The label for the template variation selector.
 * @type $template_pack_description The description for the template packs for the given messenger.
 * @type $template_variation_description The description for the template variations for the given messenger.
 */
?>
<div id="template-variations-selectors">
	<label for="MTP_template_pack"><?php echo $template_pack_label; ?>:</label> <?php echo $template_packs_selector; ?> <span class="spinner"></span>
	<p class="description"><?php echo $template_pack_description; ?><p>
	<label for="MTP_template_variation"><?php echo $template_variation_label; ?>:</label> <?php echo $variations_selector; ?>
	<p class="description"><?php echo $template_variation_description; ?></p>
</div>
