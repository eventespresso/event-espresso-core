<?php
/**
 * @var string           $admin_page_wrapper_div_id
 * @var string           $post_body_content
 * @var string|WP_Screen $current_page
 */
$admin_page_wrapper_div_id= esc_attr($admin_page_wrapper_div_id);

global $post_type, $post;
// action for registering metaboxes
do_action('add_meta_boxes', (string) $post_type, $post);
?>

<?php if (! empty($admin_page_header)) : ?>
    <div id="admin-page-header">
        <?php echo $admin_page_header; // already escaped ?>
    </div>
<?php endif; ?>
<div id="<?php echo $admin_page_wrapper_div_id; // already escaped ?>">
    <!-- admin-page-header -->
    <div id="post-body" class="metabox-holder columns-2">

        <?php if (! empty($post_body_content)) : ?>
            <div id="post-body-content">
                <?php echo $post_body_content; // already escaped ?>
            </div>
            <!-- post-body-content -->
        <?php endif; ?>

        <div id="postbox-container-1" class="postbox-container">
            <?php do_meta_boxes($current_page, 'side', null); ?>
        </div>
        <!-- postbox-container-1 -->

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