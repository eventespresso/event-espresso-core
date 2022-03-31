<?php

/**
 * @var string     $description
 * @var string     $show_form
 * @var string     $template_form_fields
 * @var string[][] $hidden_fields
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div class="mt-settings-content">
    <div class="mt-description">
        <p><?php echo esc_html($description); ?></p>
    </div>
    <div class="mt-settings">
        <form method="POST" action="" class="mt-settings-form<?php echo esc_attr($show_form); ?>">
            <?php
            echo wp_kses($template_form_fields, AllowedTags::getWithFormTags());
            foreach ($hidden_fields as $field) {
                echo wp_kses($field['field'], AllowedTags::getWithFormTags());
            }
            ?>
            <input class='button-secondary mt-settings-submit no-drag'
                   type="submit"
                   value="<?php esc_attr_e('Submit', 'event_espresso'); ?>"
            />
        </form>
    </div>
</div>
