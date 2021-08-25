<?php
/**
 * @var string $help_popup_id
 * @var string $help_popup_title
 * @var string $help_popup_content
 */
?>

<div id="<?php echo esc_attr($help_popup_id); ?>" class="ee-pop-help" style="display:none">
    <h2><?php echo $help_popup_title; // already escaped ?></h2>
    <p><?php echo $help_popup_content; // already escaped ?></p>
</div>
<!-- .ee-help-container -->