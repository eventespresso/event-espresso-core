<?php
/**
 * @var string $event_name
 * @var string $step_content
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

    <h1>
        <span class="small-text not-bold">
            <?php esc_html_e('Adding Registration For: ', 'event_espresso'); ?>
        </span>
        <?php echo wp_kses($event_name, AllowedTags::getAllowedTags()); ?>
    </h1>

    <?php echo wp_kses($step_content, AllowedTags::getWithFormTags());
