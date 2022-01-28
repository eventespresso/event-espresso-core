<?php
/**
 * @var string $sidebar_box_id
 * @var string $sidebar_h4_title
 * @var string $sidebar_description
 * @var string $sidebar_content
 */
?>

<div id="admin-secondary-mbox-dv-<?php echo esc_attr($sidebar_box_id); ?>" class="admin-primary-mbox-dv">

    <h4 class="admin-secondary-mbox-h4">
        <?php echo isset($sidebar_h4_title) ? esc_attr($sidebar_h4_title) : ''; ?>
    </h4>
    <p><?php echo isset($sidebar_description) ? esc_html($sidebar_description) : ''; ?></p>
    <?php echo esc_html($sidebar_content); ?>
</div> <!-- end #admin-secondary-mbox-dv -->
