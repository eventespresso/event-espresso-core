<?php

/**
 * This file is the template for newsletter send form
 *
 * @since      4.3.0
 *
 * @package    Event Espresso
 * @subpackage Admin, Messages
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * Template args found in this template.
 *
 * @var string $form_action
 * @var string $form_route
 * @var string $form_nonce_name
 * @var string $form_nonce
 * @var string $redirect_back_to
 * @var string $ajax_nonce
 * @var string $template_selector
 * @var array  $shortcodes
 * @var string $id_type
 */
?>
<div id="ee-batch-message-send-form" style="display:none;">

    <button class="batch-message-cancel ee-close-modal button button--secondary button--ghost button--icon-only"
            aria-label="<?php esc_html_e('close', 'event_espresso'); ?>"
    >
        <span class="dashicons dashicons-no"></span>
    </button>
    <div class="ee-batch-message-send-form">
        <form id="newsletter-send-form" method="POST" action="<?php echo esc_url_raw($form_action); ?>">
            <div class="ee-layout-stack">
                <h3 class="newsletter-send-form-title extreme-text">
                    <?php
                    printf(
                        esc_html__('Sending batch message to %s people...', 'event_espresso'),
                        '[NUMPEOPLE]'
                    ); ?>
                </h3>
                <label for="batch-message-template-selector">
                    <?php esc_html_e('Select Template:', 'event_espresso'); ?>
                </label>
                <?php echo wp_kses($template_selector, AllowedTags::getWithFormTags()); ?>
            </div>
            <br/>
            <div class="batch-message-edit-fields" style="display:none;">
                <section class="ee-section ee-section--alt">
                    <div class="ee-layout-stack">
                        <div class="ee-layout-row ee-layout-row--spaced">
                            <label for="batch-message-from">
                                <?php esc_html_e('From:', 'event_espresso'); ?>
                            </label>
                            <div class="ee-messages-shortcodes-chooser-wrap ee-layout-row ee-layout-row--justify-end"
                                 style="display: inline-flex; position: relative; width: fit-content;"
                            >
                                <button id="shortcode-toggle-from"
                                        class="button button--secondary button--icon-only shortcodes-info js-open-list-trigger"
                                        aria-label="open shortcode selector">
                                    <span class="dashicons dashicons-shortcode"></span>
                                </button>
                                <div id="shortcode-container-from"
                                     class="shortcodes-info-container ee_shortcode_chooser_container ee-mini-modal ee-mini-modal--closed ee-status-outline ee-status-outline--info ee-status-outline--ok"
                                     style="position: absolute;"
                                >
                                    <button class='ee-mini-modal-close-btn js-close-list-trigger'
                                            aria-label="<?php esc_html_e(
                                                'close shortcode selector',
                                                'event_espresso'
                                            ); ?>"
                                    >
                                        <span class='dashicons dashicons-no'></span>
                                    </button>
                                    <h6>
                                        <?php esc_html_e('Message Template Shortcodes', 'event_espresso'); ?>
                                    </h6>
                                    <h4>
                                        <?php esc_html_e('"from" field:', 'event_espresso'); ?>
                                    </h4>
                                    <?php echo wp_kses($shortcodes['From'], AllowedTags::getAllowedTags()); ?>
                                </div>
                            </div>
                        </div>
                        <input type="text"
                               name="batch_message[from]"
                               id="batch-message-from"
                               class="batch-message-input ee-input-width--big"
                        >
                    </div>
                    <br/>

                    <div class="ee-layout-stack">
                        <div class="ee-layout-row ee-layout-row--spaced">
                            <label for="batch-message-subject">
                                <?php esc_html_e('Subject:', 'event_espresso'); ?>
                            </label>
                            <div class="ee-messages-shortcodes-chooser-wrap ee-layout-row ee-layout-row--justify-end"
                                 style="display: inline-flex; position: relative; width: fit-content;"
                            >
                                <button id="shortcode-toggle-subject"
                                        class="button button--secondary button--icon-only shortcodes-info js-open-list-trigger"
                                        aria-label="open shortcode selector">
                                    <span class="dashicons dashicons-shortcode"></span>
                                </button>
                                <div id="shortcode-container-subject"
                                     class="shortcodes-info-container ee_shortcode_chooser_container ee-mini-modal ee-mini-modal--closed ee-status-outline ee-status-outline--info ee-status-outline--ok"
                                     style="position: absolute;"
                                >
                                    <button class='ee-mini-modal-close-btn js-close-list-trigger'
                                            aria-label="<?php esc_html_e(
                                                'close shortcode selector',
                                                'event_espresso'
                                            ); ?>"
                                    >
                                        <span class='dashicons dashicons-no'></span>
                                    </button>
                                    <h6>
                                        <?php esc_html_e('Message Template Shortcodes', 'event_espresso'); ?>
                                    </h6>
                                    <h4>
                                        <?php esc_html_e('"subject" field:', 'event_espresso'); ?>
                                    </h4>
                                    <?php echo wp_kses($shortcodes['Subject'], AllowedTags::getAllowedTags()); ?>
                                </div>
                            </div>
                        </div>
                        <input type="text"
                               name="batch_message[subject]"
                               id="batch-message-subject"
                               class="batch-message-input ee-input-width--big"
                        >
                    </div>
                    <br/>

                    <div class="ee-layout-stack">
                        <div class="ee-layout-row ee-layout-row--spaced">
                            <label for="batch-message-content">
                                <?php esc_html_e('Message Content:', 'event_espresso'); ?>
                            </label>
                            <div class="ee-messages-shortcodes-chooser-wrap ee-layout-row ee-layout-row--justify-end"
                                 style="display: inline-flex; position: relative; width: fit-content;"
                            >
                                <button id="shortcode-toggle-content"
                                        class="button button--secondary button--icon-only shortcodes-info js-open-list-trigger"
                                        aria-label="open shortcode selector">
                                    <span class="dashicons dashicons-shortcode"></span>
                                </button>
                                <div id="shortcode-container-content"
                                     class="shortcodes-info-container ee_shortcode_chooser_container ee-mini-modal ee-mini-modal--closed ee-status-outline ee-status-outline--info ee-status-outline--ok"
                                     style="position: absolute;"
                                >
                                    <button class='ee-mini-modal-close-btn js-close-list-trigger'
                                            aria-label="<?php esc_html_e(
                                                'close shortcode selector',
                                                'event_espresso'
                                            ); ?>"
                                    >
                                        <span class='dashicons dashicons-no'></span>
                                    </button>
                                    <h6>
                                        <?php esc_html_e('Message Template Shortcodes', 'event_espresso'); ?>
                                    </h6>
                                    <h4>
                                        <?php esc_html_e('"content" field:', 'event_espresso'); ?>
                                    </h4>
                                    <?php echo wp_kses(
                                        $shortcodes['[NEWSLETTER_CONTENT]'],
                                        AllowedTags::getAllowedTags()
                                    ); ?>
                                </div>
                            </div>
                        </div>
                        <textarea name="batch_message[content]"
                                  id="batch-message-content"
                                  class="batch-message-textarea ee-input-size--bigger ee-input-width--big"
                        ></textarea>
                    </div>
                    <div class="ee-layout-row ee-layout-row--justify-end">
                        <input type="submit"
                               class="batch-message-submit button button--primary"
                               name="batch-message-submit"
                               value="<?php esc_html_e('Send', 'event_espresso'); ?>"
                        >
                        <button class="batch-message-cancel button button--secondary">
                            <?php esc_html_e('Cancel', 'event_espresso'); ?>
                        </button>
                    </div>
                </section>
            </div>

            <input type="hidden" name="page" value="espresso_registrations">
            <input type="hidden" id="newsletter_action" name="action" value="<?php echo esc_attr($form_route); ?>">
            <input type="hidden"
                   name="<?php echo esc_attr($form_nonce_name); ?>"
                   value="<?php echo esc_attr($form_nonce); ?>">
            <input type="hidden" name="redirect_back_to" value="<?php
            echo esc_attr($redirect_back_to); ?>">
            <input type="hidden"
                   id="get_newsletter_form_content_nonce"
                   name="get_newsletter_form_content_nonce"
                   value="<?php echo esc_attr($ajax_nonce); ?>">
            <input type="hidden" name="batch_message[id_type]" value="<?php echo esc_attr($id_type); ?>">
            <input type="hidden" id="newsletter-batch-ids" name="batch_message[ids]" value="">
        </form>
    </div>
</div>
