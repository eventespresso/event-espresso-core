<?php

/**
 * @var string $no_venues_info
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<table class="form-table">
    <tr>
        <td valign="top" class="use-ven-manager">
            <fieldset id="venue-manager">
                <?php echo wp_kses($no_venues_info, AllowedTags::getWithFormTags()); ?>
                <p>
                    <a href="admin.php?page=espresso_venues" target="_blank">
                        <?php echo esc_html__('Add venues to the Venue Manager', 'event_espresso') ?>
                    </a>
                </p>
            </fieldset>
        </td>
    </tr>
</table>
