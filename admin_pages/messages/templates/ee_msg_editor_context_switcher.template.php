<?php

/**
 * @var array  $args
 * @var array  $context_label
 * @var array  $context_templates
 * @var string $context_details
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div class='ee-msg-switcher-container'>
    <?php
    foreach ($args as $name => $value) {
        if ($name === 'context' || empty($value) || $name === 'extra') {
            continue;
        }
        ?>
        <input type="hidden"
               name="<?php echo esc_attr($name); ?>"
               value="<?php echo esc_attr($value); ?>"
        />
        <?php
    }
    // setup nonce_url
    wp_nonce_field($args['action'] . '_nonce', $args['action'] . '_nonce', false);
    $id = 'ee-' . sanitize_key($context_label['label']) . '-select';
    ?>
    <label for='<?php echo esc_attr($id); ?>' class='screen-reader-text'>
        <?php esc_html_e('message context options', 'event_espresso'); ?>
    </label>
    <select id="<?php echo esc_attr($id); ?>" name="context">
        <?php
        if (is_array($context_templates)) :
            foreach ($context_templates as $context => $template_fields) :
                $checked = ($context === $args['context']) ? 'selected' : '';
                ?>
                <option value="<?php echo esc_attr($context); ?>" <?php echo esc_attr($checked); ?>>
                    <?php echo esc_html($context_details[ $context ]['label']); ?>
                </option>
            <?php endforeach;
        endif; ?>
    </select>
    <?php $button_text = sprintf(
        esc_html__('Switch %s', 'event_espresso'),
        ucwords($context_label['label'])
    ); ?>
    <input class='button--secondary'
           id="submit-msg-context-switcher-sbmt"
           type="submit"
           value="<?php echo esc_attr($button_text); ?>"
    />
    <?php echo wp_kses($args['extra'], AllowedTags::getWithFormTags()); ?>
</div> <!-- end .ee-msg-switcher-container -->
