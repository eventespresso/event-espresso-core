<?php
/**
 * @var string $current_screen_widget_class
 * @var string $admin_page_header
 * @var string $post_body_content
 * @var string $current_page
 * @var int $num_columns
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div id="poststuff">
    <div id="dashboard-widgets" class="metabox-holder <?php echo esc_attr($current_screen_widget_class); ?>">
        <div id="admin-page-header">
            <?php echo wp_kses($admin_page_header, AllowedTags::getAllowedTags()); ?>
        </div> <!-- admin-page-header -->

        <div id="post-body-content">
            <?php echo wp_kses($post_body_content, AllowedTags::getWithFormTags()); ?>
        </div> <!-- post-body-content -->

        <?php
        // let's loop through the columns
        for ($i = 1; $i <= $num_columns; $i++) {
            $context = ($i === 1) ? 'normal' : 'side';
            $context = ($i > 2) ? 'column' . $i : $context;
            ?>
        <div id='postbox-container-<?php echo absint($i); ?>' class='postbox-container'>
            <?php do_meta_boxes($current_page, $context, null); ?>
        </div>
        <?php } // end column loop ?>
    </div> <!-- post-body -->
</div> <!-- poststuff -->
