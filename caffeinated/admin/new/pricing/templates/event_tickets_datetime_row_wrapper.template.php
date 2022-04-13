<?php

/**
 * template vars used in template
 *
 * @var string $dtt_edit_row
 * @var string $dtt_attached_tickets_row
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

echo wp_kses($dtt_edit_row, AllowedTags::getWithFormTags());
echo wp_kses($dtt_attached_tickets_row, AllowedTags::getWithFormTags());
