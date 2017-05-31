<?php
/** @var string $admin_page_wrapper_div_id */
/** @var string $post_body_content */
/** @var string|WP_Screen $current_page */
?>

<div id="<?php echo $admin_page_wrapper_div_id; ?>">
    <div id="post-body" class="metabox-holder columns-1">

        <?php if ( ! empty($admin_page_header)) : ?>
        <div id="admin-page-header">
            <?php echo $admin_page_header; ?>
        </div>
        <!-- admin-page-header -->
        <?php endif; ?>

        <div id="post-body-content">
            <?php echo $post_body_content; ?>
        </div>
        <!-- post-body-content -->


        <div id="postbox-container-2" class="postbox-container">
            <?php do_meta_boxes( $current_page, 'normal', NULL ); ?>
            <?php do_meta_boxes( $current_page, 'advanced', NULL ); ?>
        </div>
        <!-- postbox-container-2 -->
        <div class="clear"></div>

    </div>
    <!-- post-body -->
</div>
<!-- <?php echo $admin_page_wrapper_div_id; ?> -->