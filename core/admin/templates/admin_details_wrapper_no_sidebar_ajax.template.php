<?php

/**
 * @var string $admin_page_header
 * @var string $post_body_content
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div id="poststuff">
    <div id="post-body" class="metabox-holder columns-1">

        <div id="admin-page-header">
            <?php echo wp_kses($admin_page_header, AllowedTags::getAllowedTags()); ?>
        </div>
        <!-- admin-page-header -->

        <div id="post-body-content">
            <?php echo wp_kses($post_body_content, AllowedTags::getWithFormTags()); ?>
        </div>
        <!-- post-body-content -->

        <div id="postbox-container-2" class="postbox-container">
        </div>
        <!-- postbox-container-2 -->

    </div>
    <!-- post-body -->
</div>
<!-- poststuff -->