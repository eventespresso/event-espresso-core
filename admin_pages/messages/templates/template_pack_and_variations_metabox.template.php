<?php

/**
 * This template is responsible for the template pack and variations metabox that appears on the Message Templates
 * editor.
 *
 * @since 4.5.0
 * @var string $template_packs_selector        The selector for a template pack.
 * @var string $variations_selector            The selector for the variations on the selected template.
 * @var string $template_pack_label            The label for the template pack selector.
 * @var string $template_variation_label       The label for the template variation selector.
 * @var string $template_pack_description      The description for the template packs for the given messenger.
 * @var string $template_variation_description The description for the template variations for the given messenger.
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<div id="template-variations-selectors">
    <label for="MTP_template_pack">
        <?php echo wp_kses($template_pack_label, AllowedTags::getAllowedTags()); ?>:&nbsp;
    </label>
    <?php echo wp_kses($template_packs_selector, AllowedTags::getWithFormTags()); ?>
    <span class="spinner"></span>
    <p class="description">
        <?php echo wp_kses($template_pack_description, AllowedTags::getAllowedTags()); ?>
    <p>
        <label for="MTP_template_variation">
            <?php echo wp_kses($template_variation_label, AllowedTags::getAllowedTags()); ?>:&nbsp;
        </label>
        <?php echo wp_kses($variations_selector, AllowedTags::getWithFormTags()); ?>
    <p class="description">
        <?php echo wp_kses($template_variation_description, AllowedTags::getWithFormTags()); ?>
    </p>
</div>
