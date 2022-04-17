<?php

/**
 * @var string           $admin_page_wrapper_div_id
 * @var string           $post_body_content
 * @var string|WP_Screen $current_page
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div id="<?php echo esc_attr($admin_page_wrapper_div_id); ?>">
    <div id="post-body" class="metabox-holder columns-1">

        <?php if (! empty($admin_page_header)) : ?>
            <div id="admin-page-header">
                <?php echo wp_kses($admin_page_header, AllowedTags::getWithFormTags()); ?>
            </div>
            <!-- admin-page-header -->
        <?php endif; ?>

        <div id="post-body-content">
            <?php echo wp_kses($post_body_content, AllowedTags::getWithFormTags()); ?>
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
<!-- <?php echo esc_attr($admin_page_wrapper_div_id); ?> -->
