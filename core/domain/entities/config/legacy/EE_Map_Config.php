<?php

/**
 * Class for defining what's in the EE_Config relating to map settings
 */
class EE_Map_Config extends EE_Config_Base
{
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
    public $event_details_map_width = 585;

    /**
     * @var int $event_details_map_height ee_map_height_single
     */
    public $event_details_map_height = 362;

    /**
     * @var int $event_details_map_zoomee_map_zoom_single
     */
    public $event_details_map_zoom = 14;

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
    public $event_list_map_width = 300;

    /**
     * @var int $event_list_map_height ee_map_height
     */
    public $event_list_map_height = 185;

    /**
     * @var int $event_list_map_zoom ee_map_zoom
     */
    public $event_list_map_zoom = 12;

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
}
