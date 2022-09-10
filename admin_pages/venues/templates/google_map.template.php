<?php

/**
 * @var string[][] $values
 * @var stdClass   $map_settings
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div class="padding">
    <table class="form-table">
        <tbody>
            <tr>
                <th>
                    <label for="ee-display-map-no-shortcodes">
                        <?php esc_html_e('Activate Google Maps', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <?php echo wp_kses(
                        EEH_Form_Fields::select_input(
                            'use_google_maps',
                            $values,
                            $map_settings->use_google_maps,
                            'id="ee-display-map-no-shortcodes"'
                        ),
                        AllowedTags::getWithFormTags()
                    ); ?>
                    <p class="description">
                        <?php esc_html_e(
                            'Turn Google maps on or off site wide for Event Espresso.',
                            'event_espresso'
                        ); ?>
                    </p>
                </td>
            </tr>
            <?php
            if (apply_filters('FHEE__google_map__show_api_key_input', true)) { ?>
                <tr>
                    <th>
                        <label for="ee-google-map-api-key">
                            <?php esc_html_e('Google Maps API Key', 'event_espresso') ?>
                        </label>
                    </th>
                    <td>
                        <input type="text"
                               id="ee-google-map-api-key"
                               class="regular-text"
                               name="google_map_api_key"
                               value="<?php echo esc_attr($map_settings->google_map_api_key); ?>"
                        />
                        <p class="description">
                            <?php printf(
                                esc_html__(
                                    'An API key is now required to use the Google Maps API: %1$sclick here to get an API key%2$s',
                                    'event_espresso'
                                ),
                                '<a href="https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend,static_maps_backend&keyType=CLIENT_SIDE&reusekey=true" target="_blank" rel="noopener noreferrer">',
                                '</a>'
                            );
                            ?>
                        </p>
                    </td>
                </tr>
            <?php } ?>
        </tbody>
    </table>

    <h2 class="ee-admin-settings-hdr">
        <?php esc_html_e('Reg Page Map Settings', 'event_espresso'); ?>
        <?php echo wp_kses(EEH_Template::get_help_tab_link('gmaps_info'), AllowedTags::getAllowedTags()); ?>
    </h2>

    <table class="form-table">
        <tbody>
            <tr>
                <th>
                    <label for="event_details_map_width">
                        <?php esc_html_e('Set Map Width', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <input type="text"
                           id="event_details_map_width"
                           name="event_details_map_width"
                           value="<?php echo esc_attr($map_settings->event_details_map_width); ?>"
                    />
                </td>
            </tr>

            <tr>
                <th>
                    <label for="event_details_map_height">
                        <?php esc_html_e('Set Map Height', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <input type="text"
                           id="event_details_map_height"
                           size=""
                           name="event_details_map_height"
                           value="<?php echo esc_attr($map_settings->event_details_map_height); ?>"
                    />
                </td>
            </tr>
            <tr>
                <th>
                    <label for="event_details_map_zoom">
                        <?php esc_html_e('Set Map Zoom level: Range 1 - 19', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <input id="event_details_map_zoom"
                           type="number"
                           size=""
                           name="event_details_map_zoom"
                           value="<?php echo esc_attr($map_settings->event_details_map_zoom); ?>"
                           min="1"
                           max="19"
                           step="1"
                    />
                </td>
            </tr>

            <tr>
                <th>
                    <label for="event_details_display_nav">
                        <?php esc_html_e('Set Map Navigation Overlay', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <?php echo wp_kses(
                        EEH_Form_Fields::select_input(
                            'event_details_display_nav',
                            $values,
                            $map_settings->event_details_display_nav,
                            'id="event_details_display_nav" '
                        ),
                        AllowedTags::getWithFormTags()
                    ); ?>
                </td>
            </tr>

            <tr>
                <th>
                    <label for="event_details_nav_size">
                        <?php esc_html_e('Keep Map Navigation Small', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <?php echo wp_kses(
                        EEH_Form_Fields::select_input(
                            'event_details_nav_size',
                            $values,
                            $map_settings->event_details_nav_size,
                            'id="event_details_nav_size"'
                        ),
                        AllowedTags::getWithFormTags()
                    ); ?>
                </td>
            </tr>

            <tr>
                <th>
                    <?php esc_html_e('Set Map Type Control', 'event_espresso') ?>
                </th>
                <td>
                    <label for="event_details_control_type-default" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_details_control_type == 'default'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_details_control_type-default"
                               type="radio"
                               name="event_details_control_type"
                               value="default"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Default', 'event_espresso') ?>
                    </label>

                    <label for="event_details_control_type-horizontal" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_details_control_type == 'horizontal'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_details_control_type-horizontal"
                               type="radio"
                               name="event_details_control_type"
                               value="horizontal"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Horizontal', 'event_espresso') ?>
                    </label>

                    <label for="event_details_control_type-dropdown" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_details_control_type == 'dropdown'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_details_control_type-dropdown"
                               type="radio"
                               name="event_details_control_type"
                               value="dropdown"
                            <?php echo esc_attr($checked); ?>>
                        <?php esc_html_e(' Dropdown', 'event_espresso') ?>
                    </label>
                </td>
            </tr>

            <tr>
                <th>
                    <?php esc_html_e('Set Map Alignment', 'event_espresso') ?>
                </th>
                <td>
                    <label for="event_details_map_align-none" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_details_map_align == 'none'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_details_map_align-none"
                               type="radio"
                               name="event_details_map_align"
                               value="none"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' None', 'event_espresso') ?>
                    </label>

                    <label for="event_details_map_align-left" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_details_map_align == 'left'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_details_map_align-left"
                               type="radio"
                               name="event_details_map_align"
                               value="left"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Align Left', 'event_espresso') ?>
                    </label>

                    <label for="event_details_map_align-center" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_details_map_align == 'center'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_details_map_align-center"
                               type="radio"
                               name="event_details_map_align"
                               value="center"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Align Center', 'event_espresso') ?>
                    </label>

                    <label for="event_details_map_align-right" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_details_map_align == 'right'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_details_map_align-right"
                               type="radio"
                               name="event_details_map_align"
                               value="right"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Align Right', 'event_espresso') ?>
                    </label>
                </td>
            </tr>

        </tbody>
    </table>

    <h2 class="ee-admin-settings-hdr">
        <?php esc_html_e('Events List Options', 'event_espresso'); ?>
    </h2>

    <table class="form-table">
        <tbody>
            <tr>
                <th>
                    <label for="event_list_map_width">
                        <?php esc_html_e('Set Map Width', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <input id="event_list_map_width"
                           type="text"
                           name="event_list_map_width"
                           value="<?php echo esc_attr($map_settings->event_list_map_width); ?>"
                    />
                </td>
            </tr>
            <tr>
                <th>
                    <label for="event_list_map_height">
                        <?php esc_html_e('Set Map Height', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <input id="event_list_map_height"
                           type="text"
                           size=""
                           name="event_list_map_height"
                           value="<?php echo esc_attr($map_settings->event_list_map_height); ?>"
                    />
                </td>
            </tr>
            <tr>
                <th>
                    <label for="event_list_map_zoom">
                        <?php esc_html_e('Set Map Zoom level: Range: 1 - 19', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <input id="event_list_map_zoom"
                           type="number"
                           size=""
                           name="event_list_map_zoom"
                           value="<?php echo esc_attr($map_settings->event_list_map_zoom); ?>"
                           min="1"
                           max="19"
                           step="1"
                    />
                </td>
            </tr>
            <tr>
                <th>
                    <label for="event_list_display_nav">
                        <?php esc_html_e('Set Map Navigation Overlay ', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <?php echo wp_kses(
                        EEH_Form_Fields::select_input(
                            'event_list_display_nav',
                            $values,
                            $map_settings->event_list_display_nav,
                            'id="event_list_display_nav"'
                        ),
                        AllowedTags::getWithFormTags()
                    ); ?>
                </td>
            </tr>

            <tr>
                <th>
                    <label for="event_list_nav_size">
                        <?php esc_html_e('Keep Map Navigation Small', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <?php echo wp_kses(
                        EEH_Form_Fields::select_input(
                            'event_list_nav_size',
                            $values,
                            $map_settings->event_list_nav_size,
                            'id="event_list_nav_size"'
                        ),
                        AllowedTags::getWithFormTags()
                    ); ?>
                </td>
            </tr>

            <tr>
                <th>
                    <?php esc_html_e('Set Map Type Control', 'event_espresso') ?>
                </th>
                <td>
                    <label for="event_list_control_type-default" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_list_control_type == 'default'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_list_control_type-default"
                               type="radio"
                               name="event_list_control_type"
                               value="default"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Default', 'event_espresso') ?>
                    </label>

                    <label for="event_list_control_type-horizontal" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_list_control_type == 'horizontal'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_list_control_type-horizontal"
                               type="radio"
                               name="event_list_control_type"
                               value="horizontal"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Horizontal', 'event_espresso') ?>
                    </label>

                    <label for="event_list_control_type-dropdown" class="ee-admin-radio-lbl">
                        <?php $checked =
                            $map_settings->event_list_control_type == 'dropdown'
                                ? 'checked'
                                : ''; ?>
                        <input id="event_list_control_type-dropdown"
                               type="radio"
                               name="event_list_control_type"
                               value="dropdown"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Dropdown', 'event_espresso') ?>
                    </label>

                </td>
            </tr>

            <tr>
                <th>
                    <?php esc_html_e('Set Map Alignment', 'event_espresso') ?>
                </th>
                <td>
                    <label for="event_list_map_align-none" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_list_map_align == 'none'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_list_map_align-none"
                               type="radio"
                               name="event_list_map_align"
                               value="none"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' None', 'event_espresso') ?>
                    </label>

                    <label for="event_list_map_align-left" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_list_map_align == 'left'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_list_map_align-left"
                               type="radio"
                               name="event_list_map_align"
                               value="left"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Align Left', 'event_espresso') ?>
                    </label>

                    <label for="event_list_map_align-center" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_list_map_align == 'center'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_list_map_align-center"
                               type="radio"
                               name="event_list_map_align"
                               value="center"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Align Center', 'event_espresso') ?>
                    </label>

                    <label for="event_list_map_align-right" class="ee-admin-radio-lbl">
                        <?php $checked = $map_settings->event_list_map_align == 'right'
                            ? 'checked'
                            : ''; ?>
                        <input id="event_list_map_align-right"
                               type="radio"
                               name="event_list_map_align"
                               value="right"
                            <?php echo esc_attr($checked); ?>
                        />
                        <?php esc_html_e(' Align Right', 'event_espresso') ?>
                    </label>
                </td>
            </tr>
        </tbody>
    </table>

</div>