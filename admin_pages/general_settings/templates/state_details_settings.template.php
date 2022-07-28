<?php
/**
 * @var string[][] $states
 */
?>

<table id="general-setting-country-states-tbl" class="form-table">
    <thead>
    <tr>
        <th><?php esc_html_e('Code', 'event_espresso'); ?></th>
        <th><?php esc_html_e('Name', 'event_espresso'); ?></th>
        <th colspan="2">
            <span class="small-text">
                <?php printf(
                    esc_html__('State Appears in%1$sDropdown Select Lists ', 'event_espresso'),
                    '<br />'
                ); ?>
            </span>
        </th>
    </tr>
    </thead>
    <tbody>
    <?php
    if ($states) {
        foreach ($states as $STA_ID => $state) {
            ?>
        <tr id="state-<?php echo absint($STA_ID); ?>-tr" class="country-state-columns">
            <?php
            foreach ($state['inputs'] as $ID => $input) {
                if ($ID != 'STA_ID' && $ID != 'CNT_ISO') {
                    echo EEH_Form_Fields::generate_form_input($input); // already escaped
                }
            }
            ?>
            <td class="delete-state-td">
                <a class="dashicons dashicons-post-trash ee-icon-size-20 delete-state-lnk"
                   id="delete-state-<?php echo absint($STA_ID); ?>-lnk"
                   href="<?php echo esc_url_raw($state['delete_state_url']); ?>"
                   rel="<?php echo esc_attr($STA_ID); ?>"
                   aria-label="<?php echo sprintf(esc_attr__('Delete State #%d?', 'event_espresso'), $STA_ID); ?>"
                >
                </a>
            </td>
        </tr>
            <?php
        }
        ?>
    </tbody>
</table>
<br/>
<input class="button-primary save right"
       id='country_settings_save3'
       type="submit"
       name="save"
       value="<?php esc_html_e('Save States/Provinces', 'event_espresso'); ?>"
/>
<br/>
        <?php
    }
    ?>
<table class="form-table add-new-state-tbl">
    <tbody>
    <tr>
        <td colspan="2">
            <h4><?php esc_html_e('Add New State/Province', 'event_espresso'); ?></h4>
        </td>
    </tr>

    <tr>
        <td class="general-settings-country-state-input-td">
            <label for="STA_abbrev_XXX"><?php esc_html_e('Code', 'event_espresso'); ?></label>
            <br/>
            <input class="STA_abbrev small-text "
                   id='STA_abbrev-XXX'
                   name="STA_abbrev_XXX"
                   type="text"
                   value=""
            />
        </td>
        <td class="general-settings-country-state-input-td">
            <label for="STA_name_XXX"><?php esc_html_e('Name', 'event_espresso'); ?></label>
            <br/>
            <input id="STA_name-XXX" class="STA_name regular-text " type="text" value="" name="STA_name_XXX">
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <input class="secondary-button button right"
                   id='add-new-state-btn'
                   type='submit'
                   value="<?php esc_html_e('Add New State/Province', 'event_espresso'); ?>"
            />
        </td>
    </tr>

    </tbody>
</table>
