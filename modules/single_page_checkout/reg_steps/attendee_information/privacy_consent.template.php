<?php

/**
 * @var EE_Checkbox_Multi_Input $input
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<div class="ee-privacy-consent-assertion">
    <?php echo wp_kses($input->get_html_for_input(), AllowedTags::getWithFormTags()); ?>
</div>
