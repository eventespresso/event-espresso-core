<div class="padding">
    <?php
    global $wpdb, $wp_version;
    $wp_req_version    = '3.1';
    $php_req_version   = '5.2';
    $mysql_req_version = '5.0';
    $php_is_valid      = version_compare(phpversion(), $php_req_version, '>');
    $mysql_is_valid    = version_compare($wpdb->db_version(), $mysql_req_version, '>');
    $wp_is_valid    = version_compare($wp_version, $wp_req_version, '>=');

    if (! $wp_is_valid) {
        echo esc_html(
            '<p class="red_alert">'
             . __(
                 'This version of Event Espresso requires WordPress version',
                 'event_espresso'
             )
             . " $wp_req_version+. "
             . __(
                 'Please upgrade to the latest version of WordPress.',
                 'event_espresso'
             )
             . '</p>'
        );
    }
    if (! $php_is_valid) {
        echo esc_html(
            '<p class="red_alert">'
             . __(
                 'Your version of PHP is out of date, please update to the latest version of PHP. <br>Required version of PHP:',
                 'event_espresso'
             )
             . " $php_req_version"
             . '</p>'
        );
    }
    if (! $mysql_is_valid) {
        echo esc_html(
            '<p class="red_alert">'
             . __(
                 'Your version of MySQL is out of date, please update to the latest version of MySQL. <br>Required version of MySQL:',
                 'event_espresso'
             )
             . " $mysql_req_version"
             . '</p>'
        );
    }

    $system_status_link = EE_Admin_Page::add_query_args_and_nonce(
        [
            'page'   => 'espresso_maintenance_settings',
            'action' => 'system_status',
        ],
        admin_url('admin.php')
    );

    ?>
    <a href="<?php echo esc_url_raw($system_status_link); ?>" class="button-secondary right">
        <?php esc_html_e('System Information', 'event_espresso'); ?>
    </a>
    <div class="localhost-information">
        <p>
            <strong><?php esc_html_e('WordPress Version:', 'event_espresso'); ?></strong>
            &nbsp;<?php echo esc_html($wp_version); ?>
        </p>
        <p><strong><?php esc_html_e('PHP Version:', 'event_espresso'); ?></strong>
            &nbsp;<?php echo esc_html(phpversion()); ?>
        </p>
        <p><strong><?php esc_html_e('MySQL Version:', 'event_espresso'); ?></strong>
            &nbsp;<?php echo esc_html($wpdb->db_version()); ?>
        </p>
        <p>
            <strong><?php esc_html_e('Event Espresso Version:', 'event_espresso'); ?></strong>
            &nbsp;<?php echo esc_html(EVENT_ESPRESSO_VERSION) ?>
        </p>
        <p>
            <strong><?php esc_html_e('WordPress Address (URL):', 'event_espresso'); ?></strong>
            &nbsp;<?php echo esc_url_raw(site_url()); ?>
        </p>
        <p>
            <strong><?php esc_html_e('Site address (URL):', 'event_espresso'); ?></strong>
            &nbsp;<?php echo esc_url_raw(home_url()); ?>
        </p>
    </div>
</div>
