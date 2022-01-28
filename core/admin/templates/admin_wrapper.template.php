<?php
/**
 * @var string $admin_page_title
 * @var string $nav_tabs
 * @var string $before_admin_page_content
 * @var string $admin_page_content
 * @var string $after_admin_page_content
 */
?>

<div class="wrap espresso-admin">

    <h1><?php esc_html_e('Event Espresso', 'event_espresso'); ?>&nbsp;-&nbsp;<?php echo $admin_page_title; // already escaped ?></h1>

    <div id="ajax-notices-container"></div>

    <?php echo $nav_tabs; // already escaped ?>

    <?php
    do_action('AHEE__admin_wrapper__template__before_admin_page_content');
    echo $before_admin_page_content; // already escaped
    echo $admin_page_content; // already escaped
    echo $after_admin_page_content; // already escaped
    do_action('AHEE__admin_wrapper__template__after_admin_page_content');
    ?>

</div>
