<?php
/**
 * @var string $admin_page_title
 * @var string $ajax_notices
 * @var string $before_admin_page_content
 * @var string $admin_page_content
 * @var string $after_admin_page_content
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div class="wrap espresso-admin">
    <h1><?php esc_attr_e('Event Espresso', 'event_espresso'); ?>&nbsp;-&nbsp;<?php echo wp_kses($admin_page_title, AllowedTags::getWithFormTags()); ?></h1>

    <div class="ee-notices"><?php echo isset($ajax_notices) ? $ajax_notices  : '';// already escaped ?></div>
    <?php
    do_action('AHEE__admin_wrapper__template__before_admin_page_content');
    echo wp_kses($before_admin_page_content, AllowedTags::getWithFormTags());
    echo wp_kses($admin_page_content, AllowedTags::getWithFormTags());
    echo wp_kses($after_admin_page_content, AllowedTags::getWithFormTags());
    do_action('AHEE__admin_wrapper__template__after_admin_page_content');
    ?>
</div>
<!-- espresso-admin -->