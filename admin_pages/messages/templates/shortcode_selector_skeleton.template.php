<?php

/**
 * This file contains the template for the Messages Shortcode selector.
 *
 * Template args available are:
 *
 * @type    array  $shortcodes      An array indexed by shortcode and the values are the labels.
 * @type    string $fieldname       The name of the field the chooser is associated with.
 * @type    string $linked_input_id The name of the input that the shortcode gets inserted to.
 */

if (! empty($shortcodes)) : ?>
<div class="ee-messages-shortcodes-chooser-wrap">
    <button class="ee-messages-shortcodes-chooser js-open-list-trigger button button-secondary"
            aria-label="<?php echo esc_html__('open shortcode selector', 'event_espresso'); ?>"
    >
        <span class="dashicons dashicons-shortcode"></span>
    </button>
    <div id="ee_shortcode_chooser_<?php echo esc_attr($fieldname); ?>" class='ee_shortcode_chooser_container hidden'>
        <button class='ee-messages-shortcodes-close-btn js-close-list-trigger'
                aria-label="<?php esc_html_e('close shortcode selector', 'event_espresso'); ?>"
        >
            <span class='dashicons dashicons-no'></span> 
        </button>
        <h6>
            <?php esc_html_e('Available Message Template Shortcodes', 'event_espresso'); ?>
        </h6>
        <h4>
            <?php
            printf(
                esc_html__('"%1$s" field', 'event_espresso'),
                esc_attr($fieldname)
            ); ?>
        </h4>
        <ul>
        <?php
        foreach (array_keys($shortcodes) as $shortcode) : ?>
            <li>
                <span class="js-shortcode-selection"
                      data-linked-input-id="<?php echo esc_attr($linked_input_id); ?>"
                      data-value="<?php echo esc_attr($shortcode); ?>"
                >
                    <?php echo esc_html($shortcode); ?>
                </span>
            </li>
        <?php endforeach; ?>
        </ul>
    </div>
</div>
<?php endif; ?>