<?php

/**
 * Venue Model
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Michael Nelson
 *                        ------------------------------------------------------------------------
 */
class EEM_Venue extends EEM_CPT_Base
{
    // private instance of the Attendee object
    protected static $_instance = null;



    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Venue', 'event_espresso');
        $this->plural_item = esc_html__('Venues', 'event_espresso');
        $this->_tables = array(
            'Venue_CPT'  => new EE_Primary_Table('posts', 'ID'),
            'Venue_Meta' => new EE_Secondary_Table('esp_venue_meta', 'VNUM_ID', 'VNU_ID'),
        );
        $this->_fields = array(
            'Venue_CPT'  => array(
                'VNU_ID'         => new EE_Primary_Key_Int_Field('ID', esc_html__("Venue ID", "event_espresso")),
                'VNU_name'       => new EE_Plain_Text_Field(
                    'post_title',
                    esc_html__("Venue Name", "event_espresso"),
                    false,
                    ''
                ),
                'VNU_desc'       => new EE_Post_Content_Field(
                    'post_content',
                    esc_html__("Venue Description", "event_espresso"),
                    false,
                    ''
                ),
                'VNU_identifier' => new EE_Slug_Field('post_name', esc_html__("Venue Identifier", "event_espresso"), false, ''),
                'VNU_created'    => new EE_Datetime_Field(
                    'post_date',
                    esc_html__("Date Venue Created", "event_espresso"),
                    false,
                    EE_Datetime_Field::now
                ),
                'VNU_short_desc' => new EE_Plain_Text_Field(
                    'post_excerpt',
                    esc_html__("Short Description of Venue", "event_espresso"),
                    true,
                    ''
                ),
                'VNU_modified'   => new EE_Datetime_Field(
                    'post_modified',
                    esc_html__("Venue Modified Date", "event_espresso"),
                    false,
                    EE_Datetime_Field::now
                ),
                'VNU_wp_user'    => new EE_WP_User_Field(
                    'post_author',
                    esc_html__("Venue Creator ID", "event_espresso"),
                    false
                ),
                'parent'         => new EE_Integer_Field(
                    'post_parent',
                    esc_html__("Venue Parent ID", "event_espresso"),
                    false,
                    0
                ),
                'VNU_order'      => new EE_Integer_Field('menu_order', esc_html__("Venue order", "event_espresso"), false, 1),
                'post_type'      => new EE_WP_Post_Type_Field('espresso_venues'),
                'password' => new EE_Password_Field(
                    'post_password',
                    esc_html__('Password', 'event_espresso'),
                    false,
                    '',
                    array(
                        'VNU_desc',
                        'VNU_short_desc',
                        'VNU_address',
                        'VNU_address2',
                        'VNU_city',
                        'STA_ID',
                        'CNT_ISO',
                        'VNU_zip',
                        'VNU_phone',
                        'VNU_capacity',
                        'VNU_url',
                        'VNU_virtual_phone',
                        'VNU_virtual_url',
                        'VNU_google_map_link',
                        'VNU_enable_for_gmap',
                    )
                )
            ),
            'Venue_Meta' => array(
                'VNUM_ID'             => new EE_DB_Only_Int_Field(
                    'VNUM_ID',
                    esc_html__("ID of Venue Meta Row", "event_espresso"),
                    false
                ),
                'VNU_ID_fk'           => new EE_DB_Only_Int_Field(
                    'VNU_ID',
                    esc_html__("Foreign Key to Venue Post ", "event_espresso"),
                    false
                ),
                'VNU_address'         => new EE_Plain_Text_Field(
                    'VNU_address',
                    esc_html__("Venue Address line 1", "event_espresso"),
                    true,
                    ''
                ),
                'VNU_address2'        => new EE_Plain_Text_Field(
                    'VNU_address2',
                    esc_html__("Venue Address line 2", "event_espresso"),
                    true,
                    ''
                ),
                'VNU_city'            => new EE_Plain_Text_Field(
                    'VNU_city',
                    esc_html__("Venue City", "event_espresso"),
                    true,
                    ''
                ),
                'STA_ID'              => new EE_Foreign_Key_Int_Field(
                    'STA_ID',
                    esc_html__("State ID", "event_espresso"),
                    true,
                    null,
                    'State'
                ),
                'CNT_ISO'             => new EE_Foreign_Key_String_Field(
                    'CNT_ISO',
                    esc_html__("Country Code", "event_espresso"),
                    true,
                    null,
                    'Country'
                ),
                'VNU_zip'             => new EE_Plain_Text_Field(
                    'VNU_zip',
                    esc_html__("Venue Zip/Postal Code", "event_espresso"),
                    true
                ),
                'VNU_phone'           => new EE_Plain_Text_Field(
                    'VNU_phone',
                    esc_html__("Venue Phone", "event_espresso"),
                    true
                ),
                'VNU_capacity'        => new EE_Infinite_Integer_Field(
                    'VNU_capacity',
                    esc_html__("Venue Capacity", "event_espresso"),
                    true,
                    EE_INF
                ),
                'VNU_url'             => new EE_Plain_Text_Field(
                    'VNU_url',
                    esc_html__('Venue Website', 'event_espresso'),
                    true
                ),
                'VNU_virtual_phone'   => new EE_Plain_Text_Field(
                    'VNU_virtual_phone',
                    esc_html__('Call in Number', 'event_espresso'),
                    true
                ),
                'VNU_virtual_url'     => new EE_Plain_Text_Field(
                    'VNU_virtual_url',
                    esc_html__('Virtual URL', 'event_espresso'),
                    true
                ),
                'VNU_google_map_link' => new EE_Plain_Text_Field(
                    'VNU_google_map_link',
                    esc_html__('Google Map Link', 'event_espresso'),
                    true
                ),
                'VNU_enable_for_gmap' => new EE_Boolean_Field(
                    'VNU_enable_for_gmap',
                    esc_html__('Show Google Map?', 'event_espresso'),
                    false,
                    false
                ),
            ),
        );
        $this->_model_relations = array(
            'Country'           => new EE_Belongs_To_Relation(),
            'Event'             => new EE_Has_Many_Relation(),
            'Datetime'          => new EE_Has_Many_Relation(),
            'State'             => new EE_Belongs_To_Relation(),
            'Term_Relationship' => new EE_Has_Many_Relation(),
            'Term_Taxonomy'     => new EE_HABTM_Relation('Term_Relationship'),
            'WP_User'           => new EE_Belongs_To_Relation(),
        );
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
        $this->model_chain_to_password = '';
        parent::__construct($timezone);
    }
}
