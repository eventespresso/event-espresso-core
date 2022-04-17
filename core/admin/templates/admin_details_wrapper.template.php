<?php

/**
 * @var string           $admin_page_wrapper_div_id
 * @var string           $post_body_content
 * @var string|WP_Screen $current_page
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

global $post_type, $post;

// action for registering metaboxes
do_action('add_meta_boxes', (string) $post_type, $post);
?>

<?php if (! empty($admin_page_header)) : ?>
    <div id="admin-page-header">
        <?php echo wp_kses($admin_page_header, AllowedTags::getWithFormTags()); ?>
    </div>
<?php endif; ?>
<div id="<?php echo esc_attr($admin_page_wrapper_div_id); ?>">
    <!-- admin-page-header -->
    <div id="post-body" class="metabox-holder columns-2">

        <?php if (! empty($post_body_content)) : ?>
            <div id="post-body-content">
                <?php echo wp_kses($post_body_content, AllowedTags::getWithFormTags()); ?>
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
<!-- <?php echo esc_html($admin_page_wrapper_div_id); ?> -->
