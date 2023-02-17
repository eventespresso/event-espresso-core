<?php

/**
 * @var bool       $on_off_status
 * @var string     $description
 * @var string     $messenger
 * @var string     $nonce
 * @var string     $on_off_action
 * @var string     $show_hide_edit_form
 * @var string     $template_form_fields
 * @var string[][] $hidden_fields
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div class="messenger-settings-content">
    <div class="messenger-description">
        <p><?php echo wp_kses($description, AllowedTags::getAllowedTags()); ?></p>
    </div>
    <div class="messenger-settings<?php echo esc_attr($show_hide_edit_form); ?>">
        <span id="has_form_class" class="hidden">
            <?php echo trim($show_hide_edit_form); // already escaped ?>
        </span>
        <form method="POST" action="" class="mt-settings-form">
            <?php echo wp_kses($template_form_fields, AllowedTags::getWithFormTags()); ?>
            <?php
            foreach ($hidden_fields as $name => $field) {
                echo wp_kses($field['field'], AllowedTags::getWithFormTags());
            } ?>
            <input type="submit"
                   value="<?php esc_attr_e('Submit', 'event_espresso'); ?>"
                   class="button button--secondary button--small no-drag"
            />
        </form>
    </div>
    <div class='activate_messages_on_off_toggle_container'>
        <div id='espresso-ajax-loading' class='ajax-loader-grey'>
            <span class='ee-spinner ee-spin'></span>
            <span class='hidden'>
                <?php esc_html_e('loading...', 'event_espresso'); ?>
            </span>
        </div>
        <span id="on-off-nonce-<?php echo esc_attr($messenger); ?>" class="hidden">
            <?php echo wp_kses($nonce, AllowedTags::getAllowedTags()); ?>
        </span>
        <div class="ee-switch">
            <?php $checked = $on_off_status ? 'checked' : ''; ?>
            <input type='checkbox'
                   class="ee-switch__input"
                   id="ee-on-off-toggle-<?php echo esc_attr($messenger); ?>"
                   value="<?php echo esc_attr($on_off_action); ?>"
                <?php echo esc_attr($checked); ?>
            />
            <label class="ee-switch__toggle" for="ee-on-off-toggle-<?php echo esc_attr($messenger); ?>"></label>
        </div>
    </div> <!-- end .activate_messages_on_off_toggle_container -->
</div>
