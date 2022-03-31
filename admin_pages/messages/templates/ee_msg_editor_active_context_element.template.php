<?php

/**
 * Template for control that activates/deactivates message template context
 * Variables in this template
 *
 * @var string $context                   Message context this is for.
 * @var string $nonce                     Nonce for changes.
 * @var bool   $is_active                 Whether the template is active for this context or not
 * @var string $on_off_action             The current action state for the toggle.
 * @var string $context_label             The label for the context
 * @var int    $message_template_group_id The ID for the message template group this context belongs to.
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

$active_message   = sprintf(
    esc_html__(
        'The template for %1$s is currently %2$sactive%3$s.',
        'event_espresso'
    ),
    $context_label,
    '<strong>',
    '</strong>'
);
$inactive_message = sprintf(
    esc_html__(
        'The template for %1$s is currently %2$sinactive%3$s.',
        'event_espresso'
    ),
    $context_label,
    '<strong>',
    '</strong>'
);

$context = esc_attr($context);
?>

<div class="context-active-control-container">
    <span class="spinner"></span>
    <div class="activate_context_on_off_toggle_container">
        <span id="on-off-nonce-<?php echo esc_attr($context); ?>" class="hidden">
            <?php echo wp_kses($nonce, AllowedTags::getWithFormTags()); ?>
        </span>
        <span class="ee-on-off-toggle-label">
            <?php
            echo ($is_active
                ? wp_kses($active_message, AllowedTags::getAllowedTags())
                : wp_kses($inactive_message, AllowedTags::getAllowedTags()));
            ?>
        </span>
        <div class="hidden js-data">
            <span class="ee-active-message"><?php echo wp_kses($active_message, AllowedTags::getAllowedTags()); ?></span>
            <span class="ee-inactive-message"><?php echo wp_kses($inactive_message, AllowedTags::getAllowedTags()); ?></span>
        </div>
        <div class="switch">
            <?php $checked = $is_active ? 'checked' : ''; ?>
            <input class='ee-on-off-toggle ee-toggle-round-flat' <?php echo esc_attr($checked); ?>
                   data-grpid="<?php echo absint($message_template_group_id); ?>"
                   id="ee-on-off-toggle-<?php echo esc_attr($context); ?>"
                   type="checkbox"
                   value="<?php echo esc_attr($on_off_action); ?>"
            />
            <label for="ee-on-off-toggle-<?php echo esc_attr($context); ?>"></label>
        </div>
    </div>
</div>
