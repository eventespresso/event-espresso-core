<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * @var string           $admin_page_wrapper_div_id
 * @var string           $admin_page_wrapper_div_class
 * @var string|null      $post_body_content
 * @var string|WP_Screen $current_page
 * @var WP_Post          $post
 */
?>

<div id="<?php echo esc_attr($admin_page_wrapper_div_id);?>" class="<?php echo esc_attr($admin_page_wrapper_div_class);?>"
>
    <div id="post-body" class="metabox-holder columns-1">

        <?php if (! empty($admin_page_header)) : ?>
            <div id="admin-page-header">
                <?php echo wp_kses($admin_page_header, AllowedTags::getWithFormTags()); ?>
            </div>
            <!-- admin-page-header -->
        <?php endif; ?>

        <?php echo (string) $post_body_content; ?>

        <div id="postbox-container-2" class="postbox-container">
            <?php do_meta_boxes($current_page, 'normal', $post); ?>
            <?php do_meta_boxes($current_page, 'advanced', $post); ?>
        </div>
        <!-- postbox-container-2 -->
        <div class="clear"></div>

    </div>
    <!-- post-body -->
</div>
<!-- <?php echo esc_attr($admin_page_wrapper_div_id); ?> -->
