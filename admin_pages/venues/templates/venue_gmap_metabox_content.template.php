<?php

/**
 * @var string $vnu_enable_for_gmap
 * @var string $vnu_google_map_link
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div class="ee-layout-row ee-layout-row--spaced">
    <?php
    if (
        isset(EE_Registry::instance()->CFG->map_settings)
        && isset(EE_Registry::instance()->CFG->map_settings->use_google_maps)
        && EE_Registry::instance()->CFG->map_settings->use_google_maps
    ) { ?>
        <label for="enable_for_gmap">
            <?php esc_html_e('Display Google Map for this venue? ', 'event_espresso') ?>
        </label>
        <?php echo wp_kses($vnu_enable_for_gmap, AllowedTags::getWithFormTags()); ?>
    <?php } ?>
</div>
<?php
if (
    ! isset(EE_Registry::instance()->CFG->map_settings)
    || ! isset(EE_Registry::instance()->CFG->map_settings->use_google_maps)
    || ! EE_Registry::instance()->CFG->map_settings->use_google_maps
) { ?>
    <p class="ee-notice">
        <?php
        printf(
            esc_html__(
                'To display a Google Map for event venues, go to %sEvent Espresso General Settings%sGoogle Maps%s, and set "Activate Google Maps" to "Yes"',
                'event_espresso'
            ),
            '<b>',
            '</b> &raquo; <b>',
            '</b>'
        );
        ?>
    </p>
<?php } ?>
