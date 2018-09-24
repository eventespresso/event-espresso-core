<?php
/**
 * @var EE_Question_Form_Input[] $inputs
 * @var boolean $CNT_cur_disabled
 * @var string $CNT_name_for_site
 */
?>
<table id="general-setting-country-details-tbl" class="form-table">
    <tbody>
    <?php
    foreach ($inputs as $ID => $input) {
        echo EEH_Form_Fields::generate_form_input($input);
    }
    ?>
    <tr>
        <th></th>
        <td>
            <?php if ($CNT_cur_disabled) { ?>
                <p>
                    <span class="reminder-spn">
                        <?php printf(
                            esc_html__(
                                'Currency setting inputs are currently only enabled for the country "%1$s" which is the selected country for the site. This can be changed in the "Contact Information" section under the "Your Organization" tab of the Event Espresso - General Settings.',
                                'event_espresso'
                            ),
                            $CNT_name_for_site
                        ); ?>
                    </span>
                </p>
            <?php } ?>
            <br/>
            <input id="country_settings_save_2" class="button-primary save" type="submit" name="save"
                        value="<?php _e('Save Country Details', 'event_espresso'); ?>">
        </td>
    </tr>
    </tbody>
</table>
