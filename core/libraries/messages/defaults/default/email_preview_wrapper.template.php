<?php

/** @var string $main_body */
use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<div id="ee-message-preview-container" style="margin-top: 10px">
    <?php echo wp_kses($main_body, AllowedTags::getWithFullTags()); ?>
</div>
