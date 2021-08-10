<?php
/**
 * @var string   $default_reg_status
 * @var string[] $reg_status_array
 * @var array    $template_args
 */
?>
<div class="padding">
    <table class="form-table">
        <tbody>
        <tr>
            <th>
                <label for="default_reg_status">
                    <?php esc_html_e('Default Registration Status', 'event_espresso'); ?>
                    <?php echo EEH_Template::get_help_tab_link('default_settings_status_help_tab'); // already escaped ?>
                </label>
            </th>
            <td>
                <p>
                    <?php echo EEH_Form_Fields::select_input(
                        'default_reg_status',
                        $reg_status_array,
                        $default_reg_status
                    ); // already escaped ?>
                </p>
                <p class="description">
                    <?php esc_html_e(
                        'This setting allows you to preselect what the default registration status setting is when creating an event.  Note that changing this setting does NOT retroactively apply it to existing events.',
                        'event_espresso'
                    ); ?>
                </p>
            </td>
        </tr>
        <?php do_action('AHEE__event_settings__template', $template_args); ?>
        </tbody>
    </table>
</div>
