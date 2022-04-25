<?php

/**
 * @var string $admin_page_title
 * @var string $admin_page_subtitle
 * @var string $nav_tabs
 * @var string $about_admin_page_content
*/

use EventEspresso\core\services\request\sanitizers\AllowedTags;

$admin_page_subtitle = ! empty($admin_page_subtitle) ? $admin_page_subtitle : ''
?>

<div class="wrap espresso-admin about-wrap full-width-layout">

    <h1><?php echo esc_html($admin_page_title); ?></h1>
    <div class="about-text">
        <?php echo wp_kses($admin_page_subtitle, AllowedTags::getWithFormTags()); ?>
    </div>
    <div class="ee-badge">
        <span class='ee-icon ee-icon-ee-cup-thick ee-icon-size-20'></span>
        <?php printf(esc_html__('Version %s', 'event_espresso'), EVENT_ESPRESSO_VERSION); ?>
    </div>

    <?php echo wp_kses($nav_tabs, AllowedTags::getWithFormTags()); ?>

    <?php
    do_action('AHEE__admin_wrapper__template__before_about_admin_page_content');
    echo wp_kses($about_admin_page_content, AllowedTags::getWithFormTags());
    do_action('AHEE__admin_wrapper__template__after_about_admin_page_content');
    ?>

</div>
