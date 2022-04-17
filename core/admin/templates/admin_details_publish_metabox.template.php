<?php
/**
 * @var string $publish_box_extra_content
 * @var string $publish_hidden_fields
 * @var string $publish_delete_link
 * @var string $save_buttons
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<?php if ($publish_box_extra_content) : ?>
    <div id="minor-publishing">
        <?php echo wp_kses($publish_box_extra_content, AllowedTags::getWithFormTags()); ?>
    </div>
<?php endif; ?>

<div class="submitbox" id="submitpost">

    <div class="hidden-fields">
        <!-- hidden fields -->
        <?php echo wp_kses($publish_hidden_fields, AllowedTags::getWithFormTags()); ?>
    </div>

    <div id="espresso_major_buttons_wrapper">

        <?php if ($publish_delete_link) : ?>
            <div id="delete-action">
                <?php echo wp_kses($publish_delete_link, AllowedTags::getWithFormTags()); ?>
            </div>
        <?php endif; ?>

        <div class="publishing-action">
            <?php echo wp_kses($save_buttons, AllowedTags::getWithFormTags()); ?>
        </div>
        <div class="clear"></div>

    </div>

    <div id="event-editor-floating-save-btns" class="hidden">
        <?php echo wp_kses($save_buttons, AllowedTags::getWithFormTags()); ?>
    </div>

</div> <!-- end #submitpost -->