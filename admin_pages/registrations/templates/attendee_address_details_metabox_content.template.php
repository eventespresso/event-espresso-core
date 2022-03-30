<?php
/**
 * @var        $attendee     EE_Attendee
 * @var string $state_html   html for displaying the attendee's state
 * @var string $country_html html for displaying the attendee's country
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

EEH_Template_Validator::verify_instanceof($attendee, '$attendee', 'EE_Attendee');
?>
<table class="form-table">
    <tbody>
        <tr valign="top">
            <td>
                <label for="ATT_address"><?php esc_html_e('Address:', 'event_espresso'); ?></label>
                <br>
                <input class="all-options"
                       type="text"
                       id="ATT_address"
                       name="ATT_address"
                       value="<?php echo esc_attr($attendee->address()); ?>"
                />
                <br />
                <input class="all-options"
                       type="text"
                       id="ATT_address2"
                       name="ATT_address2"
                       value="<?php echo esc_attr($attendee->address2()); ?>"
                />
                <br />
                <p class="description">
                    <?php esc_html_e('The contact\'s street address.', 'event_espresso'); ?>
                </p>
            </td>
        </tr>
        <tr valign="top">
            <td>
                <label for="ATT_city"><?php esc_html_e('City', 'event_espresso'); ?></label><br>
                <input class="all-options"
                       type="text"
                       id="ATT_city"
                       name="ATT_city"
                       value="<?php echo esc_attr($attendee->city()); ?>"
                />
            </td>
        </tr>
        <tr valign="top">
            <td>
                <?php echo wp_kses($state_html, AllowedTags::getWithFormTags()); ?>
            </td>
        </tr>
        <tr valign="top">
            <td>
                <?php echo wp_kses($country_html, AllowedTags::getWithFormTags()); ?>
            </td>
        </tr>
        <tr valign="top">
            <td>
                <label for="ATT_zip"><?php esc_html_e('Zip/Postal Code', 'event_espresso'); ?></label><br>
                <input class="all-options"
                       type="text"
                       id="ATT_zip"
                       name="ATT_zip"
                       value="<?php echo esc_attr($attendee->zip()); ?>"
                />
            </td>
        </tr>
    </tbody>
</table>
