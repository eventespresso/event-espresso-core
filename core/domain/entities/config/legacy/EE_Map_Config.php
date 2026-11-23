<?php

/**
 * Class for defining what's in the EE_Config relating to map settings
 */
class EE_Map_Config extends EE_Config_Base
{
    /**
     * Map mode that loads the Maps JavaScript, Geocoding and Static Maps APIs.
     *
     * @since 5.0.61
     */
    public const MAP_MODE_ADVANCED = 'advanced';

    /**
     * Map mode that draws the venue map with the free Maps Embed API.
     *
     * @since 5.0.61
     */
    public const MAP_MODE_SIMPLE = 'simple';

    /**
     * Name of the persistent admin notice that asks an updated site to choose a map mode.
     *
     * @since 5.0.61
     */
    public const MAP_MODE_NOTICE_NAME = 'google_maps_embed_api_notice';

    /**
     * Default map width, in px, on event, venue and registration pages.
     *
     * @since 5.0.61
     */
    public const DEFAULT_MAP_WIDTH_EVENT_POST = 585;

    /**
     * Default map height, in px, on event, venue and registration pages.
     *
     * @since 5.0.61
     */
    public const DEFAULT_MAP_HEIGHT_EVENT_POST = 362;

    /**
     * Default map zoom level on event, venue and registration pages.
     *
     * @since 5.0.61
     */
    public const DEFAULT_MAP_ZOOM_EVENT_POST = 14;

    /**
     * Default map width, in px, in event lists.
     *
     * @since 5.0.61
     */
    public const DEFAULT_MAP_WIDTH_EVENT_LIST = 300;

    /**
     * Default map height, in px, in event lists.
     *
     * @since 5.0.61
     */
    public const DEFAULT_MAP_HEIGHT_EVENT_LIST = 200;

    /**
     * Default map zoom level in event lists.
     *
     * @since 5.0.61
     */
    public const DEFAULT_MAP_ZOOM_EVENT_LIST = 12;

    protected ?string $map_mode = null;

    /**
     * @var boolean $use_google_maps
     */
    public $use_google_maps = true;

    /**
     * @var string $api_key
     */
    public $google_map_api_key = '';

    /**
     * @var int $event_details_map_width ee_map_width_single
     */
    public $event_details_map_width = EE_Map_Config::DEFAULT_MAP_WIDTH_EVENT_POST;

    /**
     * @var int $event_details_map_height ee_map_height_single
     */
    public $event_details_map_height = EE_Map_Config::DEFAULT_MAP_HEIGHT_EVENT_POST;

    /**
     * @var int $event_details_map_zoomee_map_zoom_single
     */
    public $event_details_map_zoom = EE_Map_Config::DEFAULT_MAP_ZOOM_EVENT_POST;

    /**
     * @var boolean $event_details_display_nav ee_map_nav_display_single
     */
    public $event_details_display_nav = true;

    /**
     * @var boolean $event_details_nav_sizeee_map_nav_size_single
     */
    public $event_details_nav_size = false;

    /**
     * @var string $event_details_control_typeee_map_type_control_single
     */
    public $event_details_control_type = 'default';

    /**
     * @var string $event_details_map_align ee_map_align_single
     */
    public $event_details_map_align = 'center';

    /**
     * @var int $event_list_map_width ee_map_width
     */
    public $event_list_map_width = EE_Map_Config::DEFAULT_MAP_WIDTH_EVENT_LIST;

    /**
     * @var int $event_list_map_height ee_map_height
     */
    public $event_list_map_height = EE_Map_Config::DEFAULT_MAP_HEIGHT_EVENT_LIST;

    /**
     * @var int $event_list_map_zoom ee_map_zoom
     */
    public $event_list_map_zoom = EE_Map_Config::DEFAULT_MAP_ZOOM_EVENT_LIST;

    /**
     * @var boolean $event_list_display_nav ee_map_nav_display
     */
    public $event_list_display_nav = false;

    /**
     * @var boolean $event_list_nav_size ee_map_nav_size
     */
    public $event_list_nav_size = true;

    /**
     * @var string $event_list_control_type ee_map_type_control
     */
    public $event_list_control_type = 'dropdown';

    /**
     * @var string $event_list_map_align ee_map_align
     */
    public $event_list_map_align = 'center';


    public function __construct()
    {
    }


    /**
     * The effective map mode. A never-saved mode with a saved key is a site updated from a release without the
     * setting, so it keeps the Advanced map it already had. Unknown values resolve to Simple.
     *
     * @return string EE_Map_Config::MAP_MODE_SIMPLE or EE_Map_Config::MAP_MODE_ADVANCED
     * @since 5.0.61
     */
    public function mapMode(): string
    {
        if ($this->map_mode === null) {
            return trim((string) $this->google_map_api_key) !== ''
                ? EE_Map_Config::MAP_MODE_ADVANCED
                : EE_Map_Config::MAP_MODE_SIMPLE;
        }
        return $this->map_mode === EE_Map_Config::MAP_MODE_ADVANCED
            ? EE_Map_Config::MAP_MODE_ADVANCED
            : EE_Map_Config::MAP_MODE_SIMPLE;
    }


    /**
     * Whether the effective map mode is Advanced (the Maps JavaScript API map).
     *
     * @return bool true for Advanced, false for Simple
     * @since 5.0.61
     */
    public function isAdvancedMode(): bool
    {
        return $this->mapMode() === EE_Map_Config::MAP_MODE_ADVANCED;
    }


    /**
     * Whether a map mode was ever saved. `false` on new installs and on sites updated from a release without the
     * setting.
     *
     * @return bool true once an owner or the Event Smart lock saved a mode
     * @since 5.0.61
     */
    public function hasSavedMapMode(): bool
    {
        return $this->map_mode !== null;
    }


    /**
     * Stores the map mode. Any value other than Advanced is stored as Simple.
     *
     * @param string $map_mode The submitted mode, normally MAP_MODE_SIMPLE or MAP_MODE_ADVANCED.
     * @since 5.0.61
     */
    public function setMapMode(string $map_mode): void
    {
        $this->map_mode = $map_mode === EE_Map_Config::MAP_MODE_ADVANCED
            ? EE_Map_Config::MAP_MODE_ADVANCED
            : EE_Map_Config::MAP_MODE_SIMPLE;
    }
}
