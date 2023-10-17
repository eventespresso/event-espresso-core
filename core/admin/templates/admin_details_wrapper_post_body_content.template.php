<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * @var bool   $is_ajax
 * @var bool   $add_page_frame
 * @var string $post_body_content
 */

if (! empty($post_body_content)) :
    if ($add_page_frame && ! $is_ajax) {
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
<?php endif;
