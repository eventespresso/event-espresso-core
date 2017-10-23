<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 * @ package            Event Espresso
 * @ author                Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                    http://www.eventespresso.com
 * @ version            4.0
 * ------------------------------------------------------------------------
 * Venue Model
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Michael Nelson
 *                        ------------------------------------------------------------------------
 */
require_once(EE_MODELS . 'EEM_Base.model.php');



class EEM_Venue extends EEM_CPT_Base
{

    // private instance of the Attendee object
    protected static $_instance = null;



    protected function __construct($timezone = null)
    {
        $this->singular_item = __('Venue', 'event_espresso');
        $this->plural_item = __('Venues', 'event_espresso');
        $this->_tables = array(
            'Venue_CPT'  => new EE_Primary_Table('posts', 'ID'),
            'Venue_Meta' => new EE_Secondary_Table('esp_venue_meta', 'VNUM_ID', 'VNU_ID'),
        );
        $this->_fields = array(
            'Venue_CPT'  => array(
                'VNU_ID'         => new EE_Primary_Key_Int_Field('ID', __("Venue ID", "event_espresso")),
                'VNU_name'       => new EE_Plain_Text_Field('post_title', __("Venue Name", "event_espresso"), false,
                    ''),
                'VNU_desc'       => new EE_Post_Content_Field('post_content', __("Venue Description", "event_espresso"),
                    false, ''),
                'VNU_identifier' => new EE_Slug_Field('post_name', __("Venue Identifier", "event_espresso"), false, ''),
                'VNU_created'    => new EE_Datetime_Field('post_date', __("Date Venue Created", "event_espresso"),
                    false, EE_Datetime_Field::now),
                'VNU_short_desc' => new EE_Plain_Text_Field('post_excerpt',
                    __("Short Description of Venue", "event_espresso"), true, ''),
                'VNU_modified'   => new EE_Datetime_Field('post_modified', __("Venue Modified Date", "event_espresso"),
                    false, EE_Datetime_Field::now),
                'VNU_wp_user'    => new EE_WP_User_Field('post_author', __("Venue Creator ID", "event_espresso"),
                    false),
                'parent'         => new EE_Integer_Field('post_parent', __("Venue Parent ID", "event_espresso"), false,
                    0),
                'VNU_order'      => new EE_Integer_Field('menu_order', __("Venue order", "event_espresso"), false, 1),
                'post_type'      => new EE_WP_Post_Type_Field('espresso_venues'),
                // EE_Plain_Text_Field('post_type', __("Venue post type", "event_espresso"), false, 'espresso_venues'),
            ),
            'Venue_Meta' => array(
                'VNUM_ID'             => new EE_DB_Only_Int_Field('VNUM_ID',
                    __("ID of Venue Meta Row", "event_espresso"), false),
                'VNU_ID_fk'           => new EE_DB_Only_Int_Field('VNU_ID',
                    __("Foreign Key to Venue Post ", "event_espresso"), false),
                'VNU_address'         => new EE_Plain_Text_Field('VNU_address',
                    __("Venue Address line 1", "event_espresso"), true, ''),
                'VNU_address2'        => new EE_Plain_Text_Field('VNU_address2',
                    __("Venue Address line 2", "event_espresso"), true, ''),
                'VNU_city'            => new EE_Plain_Text_Field('VNU_city', __("Venue City", "event_espresso"), true,
                    ''),
                'STA_ID'              => new EE_Foreign_Key_Int_Field('STA_ID', __("State ID", "event_espresso"), true,
                    null, 'State'),
                'CNT_ISO'             => new EE_Foreign_Key_String_Field('CNT_ISO',
                    __("Country Code", "event_espresso"), true, null, 'Country'),
                'VNU_zip'             => new EE_Plain_Text_Field('VNU_zip',
                    __("Venue Zip/Postal Code", "event_espresso"), true),
                'VNU_phone'           => new EE_Plain_Text_Field('VNU_phone', __("Venue Phone", "event_espresso"),
                    true),
                'VNU_capacity'        => new EE_Infinite_Integer_Field('VNU_capacity',
                    __("Venue Capacity", "event_espresso"), true, EE_INF),
                'VNU_url'             => new EE_Plain_Text_Field('VNU_url', __('Venue Website', 'event_espresso'),
                    true),
                'VNU_virtual_phone'   => new EE_Plain_Text_Field('VNU_virtual_phone',
                    __('Call in Number', 'event_espresso'), true),
                'VNU_virtual_url'     => new EE_Plain_Text_Field('VNU_virtual_url', __('Virtual URL', 'event_espresso'),
                    true),
                'VNU_google_map_link' => new EE_Plain_Text_Field('VNU_google_map_link',
                    __('Google Map Link', 'event_espresso'), true),
                'VNU_enable_for_gmap' => new EE_Boolean_Field('VNU_enable_for_gmap',
                    __('Show Google Map?', 'event_espresso'), false, false),
            ),
        );
        $this->_model_relations = array(
            'Event'             => new EE_HABTM_Relation('Event_Venue'),
            'State'             => new EE_Belongs_To_Relation(),
            'Country'           => new EE_Belongs_To_Relation(),
            'Event_Venue'       => new EE_Has_Many_Relation(),
            'WP_User'           => new EE_Belongs_To_Relation(),
            'Term_Relationship' => new EE_Has_Many_Relation(),
            'Term_Taxonomy'     => new EE_HABTM_Relation('Term_Relationship'),
        );
        //this model is generally available for reading
        $this->_cap_restriction_generators[EEM_Base::caps_read] = new EE_Restriction_Generator_Public();
        parent::__construct($timezone);
    }

}
// End of file EEM_Venue.model.php
// Location: /includes/models/EEM_Venue.model.php
