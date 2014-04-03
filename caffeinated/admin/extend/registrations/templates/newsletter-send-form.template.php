<?php
/**
 * This file is the template for newsletter send form
 *
 * @since 4.4.0
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
 * $template_selector
 * $shortcodes_available
 */
?>
<div id="ee-batch-message-send-form" style="display:none;">
    <div class="ee-batch-message-send-form">
        <form id="newsletter-send-form" method="POST" action="<?php echo $form_action; ?>">
                <input type="hidden" name="page" value="espresso_registrations">
                <input type="hidden" name="action" value="<?php echo $form_route; ?>">
                <input type="hidden" name="<?php echo $form_nonce_name; ?>" value="<?php echo $form_nonce; ?>">
                <h3><?php printf( __('Sending batch message to %s people...', 'event-espresso'), '[NUMPEOPLE]' ); ?></h3>
                <label for="batch-message-template-selector"><?php _e('Select Template:', 'event_espresso'); ?></label>
                <?php echo $template_selector; ?>
                <div class="batch-message-edit-fields" style="display:none;">
                    <p>
                        <label for="batch-message-from"><?php _e('From:', 'event_espresso'); ?></label><br>
                        <input type="text" name="batch-message[from]" id="batch-message-from" class="batch-message-input">
                    </p>
                    <p>
                        <label for="batch-message-subject"><?php _e('Subject:', 'event_espresso'); ?></label><br>
                        <input type="text" name="batch-message[subject]" id="batch-message-subject" class="batch-message-input">
                    </p>
                    <p>
                        <label for="batch-message-content"><?php _e('Message Content:', 'event_espresso'); ?></label>
                        <span class="dashicons dash-icons-menu shortcodes_info" style="display:none;"></span><br>
                        <div class="shortcodes-info-container">
                             <p><?php _e('The following shortcodes can be used in the content area:', 'event_espresso'); ?></p>
                             <p><?php echo $shortcodes_available; ?></p>
                        </div>
                        <textarea name="batch-message[content]" id="batch-message-content" class="batch-message-textarea"></textarea>
                    </p>
                    <input type="submit" class="batch-message-submit" name="batch-message-submit" value="<?php _e('Send', 'event_espresso'); ?>">
                </div>
        </form>
    </div>
</div>
