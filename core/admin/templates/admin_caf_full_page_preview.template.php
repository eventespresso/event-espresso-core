<?php
/**
 * @var string $preview_img
 * @var string $preview_text
 * @var string $preview_action_button
 */
?>
<div id="ee-admin-caf-preview-container">
    <div class="ee-admin-caf-preview-img"><?php echo $preview_img; // already escaped ?></div>
    <div class="ee-admin-caf-preview-contents">

        <div class="ee-caf-preview-text">
            <p><?php echo $preview_text; // already escaped ?></p>
        </div>
        <div class="ee-caf-preview-action-box">
            <?php echo $preview_action_button; // already escaped ?>
        </div>
        <div style="clear:both"></div>
    </div>
</div>