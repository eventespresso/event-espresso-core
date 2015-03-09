<?php
/**
 * This file is the template for newsletter send form
 *
 * @since 4.3.0
 *
 * @package Event Espresso
 * @subpackage Admin, Messages
 */

/**
 * Template args found in this template.
 *
 * $form_action
 * $form_route
 * $form_nonce_name
 * $form_nonce
 * $redirect_back_to
 * $ajax_nonce
 * $template_selector
 * $shortcodes
 * $id_type
 */
?>
<div id="ee-batch-message-send-form" style="display:none;">
    <div class="ee-batch-message-send-form">
        <form id="newsletter-send-form" method="POST" action="<?php echo $form_action; ?>">
                <input type="hidden" name="page" value="espresso_registrations">
                <input id="newsletter_action" type="hidden" name="action" value="<?php echo $form_route; ?>">
                <input type="hidden" name="<?php echo $form_nonce_name; ?>" value="<?php echo $form_nonce; ?>">
                <input type="hidden" name="redirect_back_to" value="<?php echo $redirect_back_to; ?>">
                <input type="hidden" id="get_newsletter_form_content_nonce" name="get_newsletter_form_content_nonce" value="<?php echo $ajax_nonce; ?>">
                <input type="hidden" name="batch_message[id_type]" value="<?php echo $id_type; ?>">
                <input id="newsletter-batch-ids" type="hidden" name="batch_message[ids]" value="">
                <h3 class="newsletter-send-form-title"><?php printf( __('Sending batch message to %s people...', 'event_espresso'), '[NUMPEOPLE]' ); ?></h3>
                <label for="batch-message-template-selector"><?php _e('Select Template:', 'event_espresso'); ?></label>
                <?php echo $template_selector; ?>
                <div class="batch-message-edit-fields" style="display:none;">
                    <p>
                        <label for="batch-message-from"><?php _e('From:', 'event_espresso'); ?></label>
                        <span id="shortcode-toggle-from" class="alignright dashicons dashicons-menu shortcodes-info ee-icon-size-22 clickable"></span><br>
                        <div id="shortcode-container-from" class="shortcodes-info-container" style="display:none">
                             <p><?php _e('The following shortcodes can be used in the from field:', 'event_espresso'); ?></p>
                             <p><?php echo $shortcodes['From']; ?></p>
                        </div>
                        <input type="text" name="batch_message[from]" id="batch-message-from" class="batch-message-input">
                    </p>
                    <p>
                        <label for="batch-message-subject"><?php _e('Subject:', 'event_espresso'); ?></label>
                        <span id="shortcode-toggle-subject" class="alignright dashicons dashicons-menu shortcodes-info ee-icon-size-22 clickable"></span><br>
                        <div id="shortcode-container-subject"class="shortcodes-info-container" style="display:none">
                             <p><?php _e('The following shortcodes can be used in the subject field:', 'event_espresso'); ?></p>
                             <p><?php echo $shortcodes['Subject']; ?></p>
                        </div>
                        <input type="text" name="batch_message[subject]" id="batch-message-subject" class="batch-message-input">
                    </p>
                    <p>
                        <label for="batch-message-content"><?php _e('Message Content:', 'event_espresso'); ?></label>
                        <span id="shortcode-toggle-content" class="alignright dashicons dashicons-menu shortcodes-info ee-icon-size-22 clickable"></span><br>
                        <div id="shortcode-container-content" class="shortcodes-info-container" style="display:none">
                             <p><?php _e('The following shortcodes can be used in the content area:', 'event_espresso'); ?></p>
                             <p><?php echo $shortcodes['[NEWSLETTER_CONTENT]']; ?></p>
                        </div>
                        <textarea name="batch_message[content]" id="batch-message-content" class="batch-message-textarea"></textarea>
                    </p>
                    <input type="submit" class="batch-message-submit button button-primary alignright" name="batch-message-submit" value="<?php _e('Send', 'event_espresso'); ?>">
                    <button class="batch-message-cancel button button-secondary alignright"><?php _e('Cancel', 'event_espresso'); ?></button>
                    <div style="clear:both"></div>
                </div>
        </form>
    </div>
</div>
