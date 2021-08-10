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
?>

<div class="messenger-settings-content">
    <div class="activate_messages_on_off_toggle_container">
        <div id="espresso-ajax-loading" class="ajax-loader-grey">
            <span class="ee-spinner ee-spin"></span>
            <span class="hidden">
                <?php esc_html_e('loading...', 'event_espresso'); ?>
            </span>
        </div>
        <span id="on-off-nonce-<?php echo esc_attr($messenger); ?>" class="hidden">
            <?php echo $nonce; // already escaped ?>
        </span>
        <div class="switch">
            <?php $checked = $on_off_status ? ' checked="checked"' : ''; ?>
            <label for="ee-on-off-toggle-<?php echo esc_attr($messenger); ?>">
                <input id="ee-on-off-toggle-<?php echo esc_attr($messenger); ?>" type="checkbox"
                       class="ee-on-off-toggle ee-toggle-round-flat"<?php echo esc_attr($checked); ?>
                       value="<?php echo esc_attr($on_off_action); ?>"
                />
            </label>
        </div>
    </div> <!-- end .activate_messages_on_off_toggle_container -->
    <div class="messenger-description">
        <p><?php echo $description; // already escaped ?></p>
    </div>
    <div class="messenger-settings<?php echo esc_attr($show_hide_edit_form); ?>">
        <span id="has_form_class" class="hidden">
            <?php echo trim($show_hide_edit_form); // already escaped ?>
        </span>
        <form method="POST" action="" class="mt-settings-form">
            <?php echo $template_form_fields; // already escaped ?>
            <?php
            foreach ($hidden_fields as $name => $field) {
                echo $field['field']; // already escaped
            } ?>
            <input type="submit"
                   value="<?php esc_attr_e('Submit', 'event_espresso'); ?>"
                   class="button-secondary no-drag"
            />
        </form>
    </div>
</div>
