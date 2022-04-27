<?php

/**
 * @var string $help_popup_id
 * @var string $help_popup_title
 * @var string $help_popup_content
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div id="<?php echo esc_attr($help_popup_id); ?>" class="ee-pop-help" style="display:none">
    <h2><?php echo wp_kses($help_popup_title, AllowedTags::getWithFormTags()); ?></h2>
    <p><?php echo wp_kses($help_popup_content, AllowedTags::getWithFormTags()); ?></p>
</div>
<!-- .ee-help-container -->