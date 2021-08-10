<?php
/**
 * @var string $admin_page_content
 * @var string $admin_page_title
 * @var string $tab_active_details
 * @var string $tab_active_overview
 * @var string $tab_active_reports
 * @var string $tab_active_settings
 * @var string $tab_details
 * @var string $tab_lnk_details
 * @var string $tab_lnk_overview
 * @var string $tab_lnk_reports
 * @var string $tab_lnk_settings
 * @var string $tab_url_details
 * @var string $tab_url_overview
 * @var string $tab_url_reports
 * @var string $tab_url_settings
 */
?>

<div class="wrap">

    <h2>
        <?php
        esc_attr_e('Event Espresso', 'event_espresso');
        echo esc_html("&nbsp;-&nbsp;$admin_page_title");
        ?>
    </h2>

    <h2 class="nav-tab-wrapper">
        <a class="nav-tab<?php echo esc_attr($tab_active_overview); ?>"
           href="<?php echo esc_url_raw($tab_url_overview); ?>"
        >
            <?php echo esc_html($tab_lnk_overview); ?>
        </a>
        <?php if ($tab_details) : ?>
        <a class="nav-tab<?php echo esc_attr($tab_active_details); ?>"
           href="<?php echo esc_url_raw($tab_url_details); ?>"
        >
            <?php echo esc_html($tab_lnk_details); ?>
        </a>
        <?php endif; ?>
        <a class="nav-tab<?php echo esc_attr($tab_active_reports); ?>"
           href="<?php echo esc_url_raw($tab_url_reports); ?>"
        >
            <?php echo esc_html($tab_lnk_reports); ?>
        </a>
        <a class="nav-tab<?php echo esc_attr($tab_active_settings); ?>"
           href="<?php echo esc_url_raw($tab_url_settings); ?>"
        >
            <?php echo esc_html($tab_lnk_settings); ?>
        </a>
    </h2>

    <?php echo esc_html($admin_page_content); ?>

</div>
