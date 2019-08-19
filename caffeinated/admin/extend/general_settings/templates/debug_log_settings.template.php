<?php
/** @var string $use_remote_logging */
/** @var string $remote_logging_url */
?>
<h2 class="ee-admin-settings-hdr">
    <?php _e('Debug/Logging Options', 'event_espresso'); ?>
</h2>

<table class="form-table">
    <tbody>
    <tr>
        <th>
            <label for="use_remote_logging">
                <?php _e('Enable Remote Logging', 'event_espresso'); ?>
                <?php echo EEH_Template::get_help_tab_link('remote_logging_info'); ?>
            </label>
        </th>
        <td>
            <?php echo EEH_Form_Fields::select_input('use_remote_logging', $values, $use_remote_logging); ?>
            <p class="description">
                <?php _e('Send debugging data to the remote URL below.', 'event_espresso'); ?>
            </p>
        </td>
    </tr>

    <tr>
        <th>
            <label for="remote_logging_url">
                <?php _e('Remote Logging URL', 'event_espresso'); ?>
                <?php echo EEH_Template::get_help_tab_link('remote_logging_url_info'); ?>
            </label>
        </th>
        <td>
            <input name="remote_logging_url" id="remote_logging_url" size="20" class="regular-text" type="text"
                   value="<?php echo $remote_logging_url; ?>"/>
            <p class="description">
                <?php _e('Example: https://requestbin.com/MY_UNIQUE_ID', 'event_espresso'); ?>

            </p>
        </td>
    </tr>

    </tbody>
</table>
