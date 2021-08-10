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
?>
<div id="template-variations-selectors">
    <label for="MTP_template_pack">
        <?php echo $template_pack_label; // already escaped ?>:&nbsp;
    </label>
    <?php echo $template_packs_selector; // already escaped ?>
    <span class="spinner"></span>
    <p class="description">
        <?php echo $template_pack_description; // already escaped ?>
    <p>
        <label for="MTP_template_variation">
            <?php echo $template_variation_label; // already escaped ?>:&nbsp;
        </label>
        <?php echo $variations_selector; // already escaped ?>
    <p class="description">
        <?php echo $template_variation_description; // already escaped ?>
    </p>
</div>
