<?php
/**
 * @var string $admin_page_title
 * @var string $admin_page_subtitle
 * @var string $nav_tabs
 * @var string $about_admin_page_content
*/

$admin_page_subtitle = ! empty($admin_page_subtitle) ? $admin_page_subtitle : ''
?>

<div class="wrap espresso-admin about-wrap full-width-layout">

    <h1><?php echo esc_html($admin_page_title); ?></h1>
    <div class="about-text">
        <?php echo $admin_page_subtitle; // already escaped ?>
    </div>
    <div class="ee-badge">
        <span class='ee-icon ee-icon-ee-cup-thick ee-icon-size-20'></span>
        <?php printf(esc_html__('Version %s', 'event_espresso'), EVENT_ESPRESSO_VERSION); ?>
    </div>

    <?php echo $nav_tabs; // already escaped ?>


    <?php
    do_action('AHEE__admin_wrapper__template__before_about_admin_page_content');
    echo $about_admin_page_content; // already escaped
    do_action('AHEE__admin_wrapper__template__after_about_admin_page_content');
    ?>

</div>
