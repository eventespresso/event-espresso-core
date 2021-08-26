<?php
/**
 * @var string $vnu_enable_for_gmap
 * @var string $vnu_google_map_link
 */
?>

<table class="form-table">
    <tr>
        <td valign="top">
            <fieldset>
                <?php
                if (
                    isset(EE_Registry::instance()->CFG->map_settings)
                    && isset(EE_Registry::instance()->CFG->map_settings->use_google_maps)
                    && EE_Registry::instance()->CFG->map_settings->use_google_maps
                ) { ?>
                    <p>
                        <label for="enable_for_gmap">
                            <?php esc_html_e('Display Google Map for this venue? ', 'event_espresso') ?>
                        </label>
                        <?php echo $vnu_enable_for_gmap;// already escaped ?>
                    </p>
                    <!-- <p>
                    <?php // esc_html_e('Google Map Link (for email):', 'event_espresso'); ?>
                    <input type="text" name="vnu_google_map_link" value="<?php // echo $vnu_google_map_link; ?>"
                    class="all-options" />
                    </p> -->
                    <?php
                }

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
            </fieldset>
        </td>
    </tr>
</table>
