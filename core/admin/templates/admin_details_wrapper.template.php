<?php

/**
 * @var bool $add_page_frame
 * @var string           $admin_page_wrapper_div_id
 * @var string           $admin_page_wrapper_div_class
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
<div id="<?php echo esc_attr($admin_page_wrapper_div_id);?>" class="<?php echo esc_attr($admin_page_wrapper_div_class);?>">
    <!-- admin-page-header -->
    <div id="post-body" class="metabox-holder columns-2">

        <?php
        if (! empty($post_body_content)) :
            if ($add_page_frame) {
                if (
                    strpos($post_body_content, 'class="padding"') === false
                    || strpos($post_body_content, 'class="padding"') < 120
                ) {
                    $post_body_content = '<div class="padding">' . $post_body_content . '</div>';
                }
                if (strpos($post_body_content, '<div class="ee-admin-container">') === false) {
                    $post_body_content = '<div class="ee-admin-container">' . $post_body_content . '</div>';
                }
            }
            ?>
            <div id="post-body-content">
                <?php echo wp_kses($post_body_content, AllowedTags::getWithFullTags()); ?>
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
