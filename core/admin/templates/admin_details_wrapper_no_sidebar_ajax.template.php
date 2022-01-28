<?php
/**
 * @var string $admin_page_header
 * @var string $post_body_content
 */
?>

<div id="poststuff">
    <div id="post-body" class="metabox-holder columns-1">

        <div id="admin-page-header">
            <?php echo $admin_page_header; // already escaped ?>
        </div>
        <!-- admin-page-header -->

        <div id="post-body-content">
            <?php echo $post_body_content; // already escaped ?>
        </div>
        <!-- post-body-content -->

        <div id="postbox-container-2" class="postbox-container">
        </div>
        <!-- postbox-container-2 -->

    </div>
    <!-- post-body -->
</div>
<!-- poststuff -->