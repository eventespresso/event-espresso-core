<?php
/**
 * @var string           $admin_page_wrapper_div_id
 * @var string           $post_body_content
 * @var string|WP_Screen $current_page
 */
$admin_page_wrapper_div_id = esc_attr($admin_page_wrapper_div_id);
?>

<div id="<?php echo $admin_page_wrapper_div_id; // already escaped ?>">
    <div id="post-body" class="metabox-holder columns-1">

        <?php if (! empty($admin_page_header)) : ?>
            <div id="admin-page-header">
                <?php echo $admin_page_header; // already escaped ?>
            </div>
            <!-- admin-page-header -->
        <?php endif; ?>

        <div id="post-body-content">
            <?php echo $post_body_content; // already escaped ?>
        </div>
        <!-- post-body-content -->

        <div id="postbox-container-2" class="postbox-container">
            <?php do_meta_boxes($current_page, 'normal', null); ?>
            <?php do_meta_boxes($current_page, 'advanced', null); ?>
        </div>
        <!-- postbox-container-2 -->
        <div class="clear"></div>

    </div>
    <!-- post-body -->
</div>
<!-- <?php echo $admin_page_wrapper_div_id; // already escaped ?> -->