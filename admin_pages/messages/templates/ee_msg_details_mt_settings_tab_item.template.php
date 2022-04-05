<?php

/**
 * @var string $slug_id
 * @var string $class
 * @var string $label
 * @var string $content
 * @var string $mt_nonce
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<li id="<?php echo esc_attr($slug_id); ?>" class="ui-widget-content ui-corner-tr mt-tab <?php echo esc_attr($class); ?>">
    <div id="<?php echo esc_attr($slug_id); ?>-handle"
         class="mt-handlediv no-drag"
         title="<?php esc_attr_e('Click to toggle', 'event_espresso'); ?>"
    >
        <br>
    </div>
    <strong class="ui-widget-header"><?php echo esc_attr($label); ?></strong>
    <?php echo wp_kses($content, AllowedTags::getWithFormTags()); ?>
    <span class="mt_nonce hidden"><?php echo esc_html($mt_nonce); ?></span>
</li>
