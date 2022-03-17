<?php
/**
 * @var EE_Attendee $attendee
 * @var string      $state_html   html for displaying the attendee's state
 * @var string      $country_html html for displaying the attendee's country
 */
EEH_Template_Validator::verify_instanceof($attendee, '$attendee', 'EE_Attendee');
?>
<div style="padding:1em;">

    <div id="att-admin-add-new-attendee-messages-dv"></div>

    <input type="hidden" name="ATT_ID" value="<?php echo absint($attendee->ID()); ?>">

    <table class="form-table">
        <tbody>

            <tr valign="top">
                <th>
                    <label for="ATT_fname">
                        <?php esc_html_e('First Name', 'event_espresso'); ?>
                        <span class="denotes-required-spn">*</span>
                    </label>
                </th>
                <td>
                    <div class="validation-notice-dv">
                        <?php esc_html_e('The following is  a required field', 'event_espresso'); ?>
                    </div>
                    <input class="regular-text required"
                           id="ATT_fname"
                           name="ATT_fname"
                           type="text"
                           value="<?php echo esc_attr($attendee->fname()); ?>"
                    />
                    <br />
                    <p class="description">
                        <?php esc_html_e('The registrant\'s given name. ( required value )', 'event_espresso'); ?>
                    </p>
                </td>
            </tr>

            <tr valign="top">
                <th>
                    <label for="ATT_lname">
                        <?php esc_html_e('Last Name', 'event_espresso'); ?>
                        <span class="denotes-required-spn">*</span>
                    </label>
                </th>
                <td>
                    <div class="validation-notice-dv">
                        <?php esc_html_e('The following is  a required field', 'event_espresso'); ?>
                    </div>
                    <input class="regular-text required"
                           type="text"
                           id="ATT_lname"
                           name="ATT_lname"
                           value="<?php echo esc_attr($attendee->lname()); ?>"
                    />
                    <br />
                    <p class="description">
                        <?php esc_html_e('The registrant\'s family name. ( required value )', 'event_espresso'); ?>
                    </p>
                </td>
            </tr>

            <tr valign="top">
                <th>
                    <label for="ATT_email">
                        <?php esc_html_e('Email Address', 'event_espresso'); ?>
                        <span class="denotes-required-spn">*</span>
                    </label>
                </th>
                <td>
                    <div class="validation-notice-dv">
                        <?php esc_html_e('The following is  a required field', 'event_espresso'); ?>
                    </div>
                    <input class="regular-text required"
                           type="text"
                           id="ATT_email"
                           name="ATT_email"
                           value="<?php esc_attr($attendee->get_pretty('ATT_email')); ?>"
                    />
                    <br />
                    <p class="description"><?php esc_html_e('( required value )', 'event_espresso'); ?></p>
                </td>
            </tr>

            <tr valign="top">
                <th>
                    <label for="ATT_phone"><?php esc_html_e('Phone Number', 'event_espresso'); ?></label>
                </th>
                <td>
                    <input class="regular-text"
                           type="text"
                           id="ATT_phone"
                           name="ATT_phone"
                           value="<?php echo esc_attr($attendee->phone()); ?>"
                    />
                </td>
            </tr>

            <tr valign="top">
                <th>
                    <label for="ATT_address"><?php esc_html_e('Address', 'event_espresso'); ?></label>
                </th>
                <td>
                    <input class="regular-text"
                           type="text"
                           id="ATT_address"
                           name="ATT_address"
                           value="<?php echo esc_attr($attendee->address()); ?>"
                    />
                    <br />
                    <input class="regular-text"
                           type="text"
                           id="ATT_address2"
                           name="ATT_address2"
                           value="<?php echo esc_attr($attendee->address2()); ?>"
                    />
                    <br />
                    <p class="description">
                        <?php esc_html_e('The registrant\'s street address.', 'event_espresso'); ?>
                    </p>
                </td>
            </tr>

            <tr valign="top">
                <th>
                    <label for="ATT_city"><?php esc_html_e('City', 'event_espresso'); ?></label>
                </th>
                <td>
                    <input class="regular-text"
                           type="text"
                           id="ATT_city"
                           name="ATT_city"
                           value="<?php echo esc_attr($attendee->city()); ?>"
                    />
                </td>
            </tr>

            <tr valign="top">
                <th>
                    <label for="STA_ID"><?php esc_html_e('State/Province', 'event_espresso'); ?></label>
                </th>
                <td>
                    <?php echo esc_html($state_html) ?>
                </td>
            </tr>

            <tr valign="top">
                <th>
                    <label for="CNT_ISO"><?php esc_html_e('Country', 'event_espresso'); ?></label>
                </th>
                <td>
                    <?php echo esc_html($country_html) ?>
                </td>
            </tr>

            <tr valign="top">
                <th>
                    <label for="ATT_zip"><?php esc_html_e('Zip/Postal Code', 'event_espresso'); ?></label>
                </th>
                <td>
                    <input class="medium-text"
                           type="text"
                           id="ATT_zip"
                           name="ATT_zip"
                           value="<?php echo esc_attr($attendee->zip()); ?>"
                    />
                </td>
            </tr>

            <?php do_action('AHEE__attendee_details_main_meta_box__template__table_body_end', $attendee); ?>
        </tbody>
    </table>
    <?php do_action('AHEE__attendee_details_main_meta_box__template__after_table', $attendee); ?>
</div>