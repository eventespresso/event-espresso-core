<?php
/** @var string $use_remote_logging */
/** @var string $remote_logging_url */
?>

<div class="padding">
    <h2 class="ee-admin-settings-hdr">
        <?php esc_html_e('Debug/Logging Options', 'event_espresso'); ?>
    </h2>

    <table class="form-table">
        <tbody>
            <tr>
                <th>
                    <label for="use_remote_logging">
                        <?php esc_html_e('Enable Remote Logging', 'event_espresso'); ?>
                        <?php echo EEH_Template::get_help_tab_link('remote_logging_info'); ?>
                    </label>
                </th>
                <td>
                    <?php echo EEH_Form_Fields::select_input('use_remote_logging', $values, $use_remote_logging); ?>
                    <p class="description">
                        <?php esc_html_e('Send debugging data to the remote URL below.', 'event_espresso'); ?>
                    </p>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="remote_logging_url">
                        <?php esc_html_e('Remote Logging URL', 'event_espresso'); ?>
                        <?php echo EEH_Template::get_help_tab_link('remote_logging_url_info'); ?>
                    </label>
                </th>
                <td>
                    <input type="text"
                        class="regular-text"
                        id="remote_logging_url"
                        name="remote_logging_url"
                        size="20"
                        value="<?php echo esc_url_raw($remote_logging_url); ?>"
                    />
                    <p class="description">
                        <?php esc_html_e('Example: https://your-webhook-url.com/', 'event_espresso'); ?>
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</div>
