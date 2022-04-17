<?php

/**
 * @var string $preview_img
 * @var string $preview_text
 * @var string $preview_action_button
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<div id="ee-admin-caf-preview-container">
    <div class="ee-admin-caf-preview-img"><?php echo wp_kses($preview_img, AllowedTags::getAllowedTags()); ?></div>
    <div class="ee-admin-caf-preview-contents">

        <div class="ee-caf-preview-text">
            <p><?php echo wp_kses($preview_text, AllowedTags::getWithFormTags()); ?></p>
        </div>
        <div class="ee-caf-preview-action-box">
            <?php echo wp_kses($preview_action_button, AllowedTags::getWithFormTags()); ?>
        </div>
        <div style="clear:both"></div>
    </div>
</div>