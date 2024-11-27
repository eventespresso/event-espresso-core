<?php
/**
 * @var string[][] $states
 * @var string     $add_new_state_nonce
 * @var string     $delete_state_nonce
 */
?>

<table id="general-setting-country-states-tbl" class="form-table">
    <thead>
    <tr>
        <th><?php esc_html_e('Code', 'event_espresso'); ?></th>
        <th><?php esc_html_e('Name', 'event_espresso'); ?></th>
        <th colspan="2"><?php esc_html_e('State Appears in Dropdown Select Lists', 'event_espresso'); ?></th>
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
                <a aria-label="<?php echo sprintf(esc_attr__('Delete State #%d?', 'event_espresso'), $STA_ID); ?>"
                   class="button button--secondary button--icon-only delete-state-lnk"
                   id="delete-state-<?php echo absint($STA_ID); ?>-lnk"
                   href="<?php echo esc_url_raw($state['delete_state_url']); ?>"
                   rel="<?php echo esc_attr($STA_ID); ?>"
                >
                    <span class="dashicons dashicons-post-trash"></span>
                </a>
                <input type="hidden" id="delete_state_nonce" name="espresso_delete_state" value="<?php echo esc_attr($delete_state_nonce); ?>">
            </td>
        </tr>
            <?php
        }
        ?>
        <tr>
            <td></td>
            <td>
                <input class="button button--primary save"
                       id='country_settings_save3'
                       name="save"
                       type="submit"
                       value="<?php esc_html_e('Save States/Provinces', 'event_espresso'); ?>"
                />
            </td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
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
                <label for="STA_abbrev-XXX"><?php esc_html_e('Code', 'event_espresso'); ?></label>
                <input class="STA_abbrev ee-input-width--small"
                       id='STA_abbrev-XXX'
                       name="STA_abbrev_XXX"
                       type="text"
                       value=""
                />
            </td>
            <td class="general-settings-country-state-input-td">
                <label for="STA_name-XXX"><?php esc_html_e('Name', 'event_espresso'); ?></label>
                <input type="text"
                       class="STA_name ee-input-width--big"
                       id="STA_name-XXX"
                       name="STA_name_XXX"
                       title=""
                       value=""
                />
                <input type="hidden" id="add_new_state_nonce" name="espresso_add_new_state_nonce" value="<?php echo esc_attr($add_new_state_nonce); ?>">
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                <input class="button button--secondary"
                       id='add-new-state-btn'
                       type='submit'
                       value="<?php esc_html_e('Add New State/Province', 'event_espresso'); ?>"
                />
            </td>
            <td></td>
            <td></td>
        </tr>

    </tbody>
</table>
