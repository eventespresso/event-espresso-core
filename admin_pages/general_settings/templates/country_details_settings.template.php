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
            <br/>
            <input
                type="submit"
                name="save"
                id="country_settings_save_2"
                class="button-primary save"
                value="<?php esc_html_e('Save Country Details', 'event_espresso'); ?>"
            />
            <input
                type="hidden"
                id="country-currency-setting-disabled-input"
                value="<?php echo $CNT_cur_disabled ? 'true' : 'false'; ?>"
            />
        </td>
    </tr>
    </tbody>
</table>
