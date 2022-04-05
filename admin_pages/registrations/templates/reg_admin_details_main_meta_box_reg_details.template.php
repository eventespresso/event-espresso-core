<?php

/**
 * @var int        $REG_ID
 * @var string     $line_item_table
 * @var string     $resend_registration_button
 * @var string     $view_transaction_button
 * @var string[][] $reg_details
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div id="admin-primary-mbox-reg-details-dv" class="admin-primary-mbox-dv">

    <?php do_action('AHEE__reg_admin_details_main_meta_box_reg_details__top', $REG_ID); ?>

    <h3 class="admin-primary-mbox-h4 hdr-has-icon"><span class="dashicons dashicons-clipboard"></span>
        <?php esc_html_e('Registration Items', 'event_espresso'); ?>
    </h3>

    <?php echo wp_kses($line_item_table, AllowedTags::getWithFormTags()); ?>

    <div id="additional-registration-actions-dv">
        <ul>
            <li>
                <?php echo wp_kses($resend_registration_button, AllowedTags::getWithFormTags()); ?>
            </li>
            <li>
                <?php echo wp_kses($view_transaction_button, AllowedTags::getWithFormTags()); ?>
            </li>
        </ul>
    </div>

    <a id="display-additional-registration-session-info" class="display-the-hidden smaller-text"
       rel="additional-registration-session-info"
    >
        <span class="dashicons dashicons-plus-alt"></span>
        <?php esc_html_e('view additional registration session details', 'event_espresso'); ?>
    </a>

    <div id="additional-registration-session-info-dv" class="hidden">
        <a id="hide-additional-registration-session-info" class="hide-the-displayed hidden smaller-text"
           rel="additional-registration-session-info"
        >
            <span class="dashicons dashicons-dismiss"></span>
            <?php esc_html_e('hide additional registration session details', 'event_espresso'); ?>
        </a>
        <br class="clear" />

        <h3 class="admin-primary-mbox-h4">
            <?php esc_html_e('Registration Session Details', 'event_espresso'); ?>
        </h3>
        <table id="admin-primary-mbox-reg-extra-session-info-tbl" class="form-table skinny-rows">
            <tbody>
                <?php foreach ($reg_details as $key => $reg_detail) : ?>
                    <tr>
                        <th>
                            <label for="<?php echo esc_attr($key); ?>">
                                <?php echo esc_html($reg_detail['label']); ?>
                            </label>
                        </th>
                        <td>
                            <?php echo esc_html($reg_detail['value']); ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <br class="clear" />
</div>
