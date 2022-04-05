<?php

/**
 * @var int        $REG_ID
 * @var string     $reg_questions_form_action
 * @var string[][] $att_questions
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div id="admin-primary-mbox-questions-dv" class="admin-primary-mbox-dv">
    <p>
        <?php esc_html_e(
            'This displays the custom questions and answers for this registrant.  Please note that any answers to system questions have been saved with the contact record.  You can edit those answers via the "View/Edit this Contact" link in the Contact Details metabox in the sidebar.',
            'event_espresso'
        ); ?>
    </p>

    <form action='<?php echo esc_url_raw(REG_ADMIN_URL); ?>'
          id="reg-admin-attendee-questions-frm"
          name="reg-admin-attendee-questions-frm"
          method="post"
    >
        <?php wp_nonce_field($reg_questions_form_action . '_nonce', $reg_questions_form_action . '_nonce'); ?>
        <input type="hidden" name="page" value="<?php echo esc_attr(REG_PG_SLUG); ?>" />
        <input type="hidden" name="action" value="<?php echo esc_attr($reg_questions_form_action); ?>" />
        <input type="hidden" name="_REG_ID" value="<?php echo esc_attr($REG_ID); ?>" />
        <input type="hidden" name="espresso_ajax" id="espresso-ajax" value="0" />
        <input type="hidden" name="noheader" id="reg-admin-noheader-inp" value="true" />
        <?php
        echo wp_kses($att_questions, AllowedTags::getWithFormTags());
        if (! empty($att_questions)) :
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_edit_registration',
                    'edit-reg-questions-mbox',
                    $REG_ID
                )
            ) : ?>
                <input class='button--primary'
                       id="reg-admin-attendee-questions-submit"
                       type="submit"
                       value="<?php esc_html_e('Update Registration Questions', 'event_espresso'); ?>"
                />
                <?php
            endif;
        else :
            ?>
            <p class="ee-attention">
                <?php esc_html_e('There were no custom questions asked for this registration.', 'event_espresso'); ?>
            </p>
        <?php endif; ?>

    </form>
    <br class="clear" />

</div>
