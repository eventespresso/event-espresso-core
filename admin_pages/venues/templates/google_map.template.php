<?php

/**
 * @var string[][] $values
 * @var stdClass   $map_settings
 * @var string     $map_mode            EE_Map_Config::MAP_MODE_SIMPLE or MAP_MODE_ADVANCED
 * @var bool       $manages_google_maps false when another plugin supplies the key and locks the mode
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

$is_advanced_mode = $map_mode === EE_Map_Config::MAP_MODE_ADVANCED;
$api_key_link     = $is_advanced_mode
    ? 'https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,static_maps_backend&keyType=CLIENT_SIDE&reusekey=true'
    : 'https://console.cloud.google.com/apis/library/maps-embed-backend.googleapis.com';
?>

<div class="padding">
    <table class="ee-admin-two-column-layout form-table">
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
            <?php if ($manages_google_maps) { ?>
                <tr>
                    <th>
                        <label for="map_mode">
                            <?php esc_html_e('Map Mode', 'event_espresso') ?>
                        </label>
                    </th>
                    <td>
                        <?php echo wp_kses(
                            EEH_Form_Fields::select_input(
                                'map_mode',
                                [
                                    EE_Map_Config::MAP_MODE_SIMPLE   => esc_html__('Simple', 'event_espresso'),
                                    EE_Map_Config::MAP_MODE_ADVANCED => esc_html__('Advanced', 'event_espresso'),
                                ],
                                $map_mode
                            ),
                            AllowedTags::getWithFormTags()
                        ); ?>
                        <p class="description">
                            <?php esc_html_e(
                                'Simple uses the free Google Maps Embed API. Advanced uses the paid Maps JavaScript, Geocoding and Static Maps APIs and offers the extra navigation and map type controls, which show after you save Advanced.',
                                'event_espresso'
                            ); ?>
                        </p>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label for="ee-google-map-api-key">
                            <?php esc_html_e('Google Maps API Key', 'event_espresso') ?>
                        </label>
                    </th>
                    <td>
                        <input type="text"
                               id="ee-google-map-api-key"
                               class="ee-input-width--big regular-text"
                               name="google_map_api_key"
                               value="<?php echo esc_attr($map_settings->google_map_api_key); ?>"
                        />
                        <?php if ($map_settings->use_google_maps && trim($map_settings->google_map_api_key) === '') { ?>
                            <p class="ee-attention">
                                <?php esc_html_e(
                                    'Every Google map needs an API key. Maps do not show on your site until you enter a key.',
                                    'event_espresso'
                                ); ?>
                            </p>
                        <?php } ?>
                        <p class="description">
                            <?php
                            if ($is_advanced_mode) {
                                printf(
                                    // translators: %1$s: opening link tag, %2$s: closing link tag
                                    esc_html__(
                                        'Advanced mode uses the Maps JavaScript API and the Geocoding API for the venue map, and the Static Maps API for the map image in emails. Google charges for these APIs. Your key must have all three enabled: %1$sclick here to get an API key%2$s',
                                        'event_espresso'
                                    ),
                                    '<a href="' . esc_url($api_key_link) . '" target="_blank" rel="noopener noreferrer">',
                                    '</a>'
                                );
                            } else {
                                printf(
                                    // translators: %1$s: opening link tag, %2$s: closing link tag
                                    esc_html__(
                                        'Simple mode uses the Maps Embed API for every venue map. Google provides it free of charge. Your key must have the Maps Embed API enabled: %1$sclick here to get an API key%2$s',
                                        'event_espresso'
                                    ),
                                    '<a href="' . esc_url($api_key_link) . '" target="_blank" rel="noopener noreferrer">',
                                    '</a>'
                                );
                            }
                            ?>
                        </p>
                    </td>
                </tr>
            <?php } ?>
        </tbody>
    </table>

    <h2 class="ee-admin-settings-hdr">
        <?php esc_html_e('Registration Page Map Settings', 'event_espresso'); ?>
        <?php echo EEH_Template::get_help_tab_link('gmaps_info'); // already escaped ?>
    </h2>

    <table class="ee-admin-two-column-layout form-table">
        <tbody>
            <tr>
                <th>
                    <label for="event_details_map_width">
                        <?php esc_html_e('Set Map Width', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <span>
                        <input type="text"
                               class="ee-input-width--tiny ee-number-input"
                               id="event_details_map_width"
                               name="event_details_map_width"
                               value="<?php echo esc_attr($map_settings->event_details_map_width); ?>"
                        />
                        px
                    </span>
                </td>
            </tr>

            <tr>
                <th>
                    <label for="event_details_map_height">
                        <?php esc_html_e('Set Map Height', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <span>
                        <input type="text"
                               class="ee-input-width--tiny ee-number-input"
                               id="event_details_map_height"
                               size=""
                               name="event_details_map_height"
                               value="<?php echo esc_attr($map_settings->event_details_map_height); ?>"
                        />
                        px
                    </span>
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
                           class="ee-input-width--tiny ee-number-input"
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

            <?php if ($is_advanced_mode) { ?>
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
            <?php } ?>

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

    <table class="ee-admin-two-column-layout form-table">
        <tbody>
            <tr>
                <th>
                    <label for="event_list_map_width">
                        <?php esc_html_e('Set Map Width', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <span>
                        <input id="event_list_map_width"
                               class="ee-input-width--tiny ee-number-input"
                               type="text"
                               name="event_list_map_width"
                               value="<?php echo esc_attr($map_settings->event_list_map_width); ?>"
                        />
                        px
                    </span>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="event_list_map_height">
                        <?php esc_html_e('Set Map Height', 'event_espresso') ?>
                    </label>
                </th>
                <td>
                    <span>
                        <input id="event_list_map_height"
                               class="ee-input-width--tiny ee-number-input"
                               type="text"
                               size=""
                               name="event_list_map_height"
                               value="<?php echo esc_attr($map_settings->event_list_map_height); ?>"
                        />
                        px
                    </span>
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
                           class="ee-input-width--tiny ee-number-input"
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
            <?php if ($is_advanced_mode) { ?>
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
            <?php } ?>

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
