<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * class EEM_Term
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Michael Nelson
 *                        ------------------------------------------------------------------------
 */
class EEM_Term extends EEM_Base
{

    // private instance of the Attendee object
    protected static $_instance = null;



    /**
     *__construct
     *
     * @param string $timezone
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item = __('Term', 'event_espresso');
        $this->plural_item = __('Terms', 'event_espresso');
        $this->_tables = array(
            'Term' => new EE_Primary_Table('terms', 'term_id'),
        );
        $this->_fields = array(
            'Term' => array(
                'term_id'    => new EE_Primary_Key_Int_Field('term_id', __('Term ID', 'event_espresso')),
                'name'       => new EE_Plain_Text_Field('name', __('Term Name', 'event_espresso'), false, ''),
                'slug'       => new EE_Slug_Field('slug', __('Term Slug', 'event_espresso'), false),
                'term_group' => new EE_Integer_Field('term_group', __("Term Group", "event_espresso"), false, 0),
            ),
        );
        $this->_model_relations = array(
            'Term_Taxonomy' => new EE_Has_Many_Relation(),
        );
        $this->_wp_core_model = true;
        $path_to_tax_model = 'Term_Taxonomy';
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Taxonomy_Protected(
            $path_to_tax_model
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ] = false;
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ] = false;
        $path_to_tax_model = $path_to_tax_model . '.';
        // add cap restrictions for editing relating to the "ee_edit_*"
        $this->_cap_restrictions[ EEM_Base::caps_edit ]['ee_edit_event_category'] = new EE_Default_Where_Conditions(
            array(
                $path_to_tax_model . 'taxonomy*ee_edit_event_category' => array('!=', 'espresso_event_categories'),
            )
        );
        $this->_cap_restrictions[ EEM_Base::caps_edit ]['ee_edit_venue_category'] = new EE_Default_Where_Conditions(
            array(
                $path_to_tax_model . 'taxonomy*ee_edit_venue_category' => array('!=', 'espresso_venue_categories'),
            )
        );
        $this->_cap_restrictions[ EEM_Base::caps_edit ]['ee_edit_event_type'] = new EE_Default_Where_Conditions(
            array(
                $path_to_tax_model . 'taxonomy*ee_edit_event_type' => array('!=', 'espresso_event_type'),
            )
        );
        // add cap restrictions for deleting relating to the "ee_deleting_*"
        $this->_cap_restrictions[ EEM_Base::caps_delete ]['ee_delete_event_category'] = new EE_Default_Where_Conditions(
            array(
                $path_to_tax_model . 'taxonomy*ee_delete_event_category' => array('!=', 'espresso_event_categories'),
            )
        );
        $this->_cap_restrictions[ EEM_Base::caps_delete ]['ee_delete_venue_category'] = new EE_Default_Where_Conditions(
            array(
                $path_to_tax_model . 'taxonomy*ee_delete_venue_category' => array('!=', 'espresso_venue_categories'),
            )
        );
        $this->_cap_restrictions[ EEM_Base::caps_delete ]['ee_delete_event_type'] = new EE_Default_Where_Conditions(
            array(
                $path_to_tax_model . 'taxonomy*ee_delete_event_type' => array('!=', 'espresso_event_type'),
            )
        );
        parent::__construct($timezone);
        add_filter('FHEE__Read__create_model_query_params', array('EEM_Term', 'rest_api_query_params'), 10, 3);
    }



    /**
     * retrieves a list of all EE event categories
     *
     * @access public
     * @param bool $show_uncategorized
     * @return \EE_Base_Class[]
     */
    public function get_all_ee_categories($show_uncategorized = false)
    {
        $where_params = array(
            'Term_Taxonomy.taxonomy' => 'espresso_event_categories',
            'NOT'                    => array('name' => __('Uncategorized', 'event_espresso')),
        );
        if ($show_uncategorized) {
            unset($where_params['NOT']);
        }
        return EEM_Term::instance()->get_all(
            array(
                $where_params,
                'order_by' => array('name' => 'ASC'),
            )
        );
    }



    /**
     * retrieves a list of all post_tags associated with an EE CPT
     *
     * @access public
     * @param string $post_type
     * @return array
     */
    public function get_all_CPT_post_tags($post_type = '')
    {
        switch ($post_type) {
            case 'espresso_events':
                return $this->get_all_event_post_tags();
                break;
            case 'espresso_venues':
                return $this->get_all_venue_post_tags();
                break;
            default:
                $event_tags = $this->get_all_event_post_tags();
                $venue_tags = $this->get_all_venue_post_tags();
                return array_merge($event_tags, $venue_tags);
        }
    }


    /**
     * returns an EE_Term object for the given tag
     * if it has been utilized by any EE_Events or EE_Venues
     *
     * @param string $tag
     * @return EE_Term
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_post_tag_for_event_or_venue($tag)
    {
        global $wpdb;
        $SQL = "
SELECT Term.term_id                                               AS 'Term.term_id',
       Term.name                                                  AS 'Term.name',
       Term.slug                                                  AS 'Term.slug',
       Term.term_group                                            AS 'Term.term_group',
       Term_Taxonomy.term_taxonomy_id                             AS 'Term_Taxonomy.term_taxonomy_id',
       Term_Taxonomy.term_id                                      AS 'Term_Taxonomy.term_id',
       Term_Taxonomy.taxonomy                                     AS 'Term_Taxonomy.taxonomy',
       Term_Taxonomy.description                                  AS 'Term_Taxonomy.description',
       Term_Taxonomy.parent                                       AS 'Term_Taxonomy.parent',
       Term_Taxonomy.count                                        AS 'Term_Taxonomy.count',
       Term_Taxonomy___Term_Relationship.object_id                AS 'Term_Taxonomy___Term_Relationship.object_id',
       Term_Taxonomy___Term_Relationship.term_taxonomy_id         AS 'Term_Taxonomy___Term_Relationship.term_taxonomy_id',
       Term_Taxonomy___Term_Relationship.term_order               AS 'Term_Taxonomy___Term_Relationship.term_order',
       Term_Taxonomy___Event_CPT.ID                               AS 'Term_Taxonomy___Event_CPT.ID',
       Term_Taxonomy___Event_CPT.post_type                        AS 'Term_Taxonomy___Event_CPT.post_type',
       Term_Taxonomy___Event_CPT.post_title                       AS 'Term_Taxonomy___Event_CPT.post_title',
       Term_Taxonomy___Event_CPT.post_content                     AS 'Term_Taxonomy___Event_CPT.post_content',
       Term_Taxonomy___Event_CPT.post_name                        AS 'Term_Taxonomy___Event_CPT.post_name',
       Term_Taxonomy___Event_CPT.post_date                        AS 'Term_Taxonomy___Event_CPT.post_date',
       Term_Taxonomy___Event_CPT.post_excerpt                     AS 'Term_Taxonomy___Event_CPT.post_excerpt',
       Term_Taxonomy___Event_CPT.post_modified                    AS 'Term_Taxonomy___Event_CPT.post_modified',
       Term_Taxonomy___Event_CPT.post_author                      AS 'Term_Taxonomy___Event_CPT.post_author',
       Term_Taxonomy___Event_CPT.post_parent                      AS 'Term_Taxonomy___Event_CPT.post_parent',
       Term_Taxonomy___Event_CPT.menu_order                       AS 'Term_Taxonomy___Event_CPT.menu_order',
       Term_Taxonomy___Event_CPT.post_status                      AS 'Term_Taxonomy___Event_CPT.post_status',
       Term_Taxonomy___Event_CPT.comment_status                   AS 'Term_Taxonomy___Event_CPT.comment_status',
       Term_Taxonomy___Event_CPT.ping_status                      AS 'Term_Taxonomy___Event_CPT.ping_status',
       Term_Taxonomy___Event_Meta.EVT_display_desc                AS 'Term_Taxonomy___Event_Meta.EVT_display_desc',
       Term_Taxonomy___Event_Meta.EVT_display_ticket_selector     AS 'Term_Taxonomy___Event_Meta.EVT_display_ticket_selector',
       Term_Taxonomy___Event_Meta.EVT_visible_on                  AS 'Term_Taxonomy___Event_Meta.EVT_visible_on',
       Term_Taxonomy___Event_Meta.EVT_additional_limit            AS 'Term_Taxonomy___Event_Meta.EVT_additional_limit',
       Term_Taxonomy___Event_Meta.EVT_default_registration_status AS 'Term_Taxonomy___Event_Meta.EVT_default_registration_status',
       Term_Taxonomy___Event_Meta.EVT_member_only                 AS 'Term_Taxonomy___Event_Meta.EVT_member_only',
       Term_Taxonomy___Event_Meta.EVT_phone                       AS 'Term_Taxonomy___Event_Meta.EVT_phone',
       Term_Taxonomy___Event_Meta.EVT_allow_overflow              AS 'Term_Taxonomy___Event_Meta.EVT_allow_overflow',
       Term_Taxonomy___Event_Meta.EVT_timezone_string             AS 'Term_Taxonomy___Event_Meta.EVT_timezone_string',
       Term_Taxonomy___Event_Meta.EVT_external_URL                AS 'Term_Taxonomy___Event_Meta.EVT_external_URL',
       Term_Taxonomy___Event_Meta.EVT_donations                   AS 'Term_Taxonomy___Event_Meta.EVT_donations',
       Term_Taxonomy___Event_Meta.EVTM_ID                         AS 'Term_Taxonomy___Event_Meta.EVTM_ID',
       Term_Taxonomy___Venue_CPT.ID                               AS 'Term_Taxonomy___Venue_CPT.ID',
       Term_Taxonomy___Venue_CPT.post_type                        AS 'Term_Taxonomy___Venue_CPT.post_type',
       Term_Taxonomy___Venue_CPT.post_title                       AS 'Term_Taxonomy___Venue_CPT.post_title',
       Term_Taxonomy___Venue_CPT.post_content                     AS 'Term_Taxonomy___Venue_CPT.post_content',
       Term_Taxonomy___Venue_CPT.post_name                        AS 'Term_Taxonomy___Venue_CPT.post_name',
       Term_Taxonomy___Venue_CPT.post_date                        AS 'Term_Taxonomy___Venue_CPT.post_date',
       Term_Taxonomy___Venue_CPT.post_excerpt                     AS 'Term_Taxonomy___Venue_CPT.post_excerpt',
       Term_Taxonomy___Venue_CPT.post_modified                    AS 'Term_Taxonomy___Venue_CPT.post_modified',
       Term_Taxonomy___Venue_CPT.post_author                      AS 'Term_Taxonomy___Venue_CPT.post_author',
       Term_Taxonomy___Venue_CPT.post_parent                      AS 'Term_Taxonomy___Venue_CPT.post_parent',
       Term_Taxonomy___Venue_CPT.menu_order                       AS 'Term_Taxonomy___Venue_CPT.menu_order',
       Term_Taxonomy___Venue_CPT.post_status                      AS 'Term_Taxonomy___Venue_CPT.post_status',
       Term_Taxonomy___Venue_CPT.comment_status                   AS 'Term_Taxonomy___Venue_CPT.comment_status',
       Term_Taxonomy___Venue_CPT.ping_status                      AS 'Term_Taxonomy___Venue_CPT.ping_status',
       Term_Taxonomy___Venue_Meta.VNU_address                     AS 'Term_Taxonomy___Venue_Meta.VNU_address',
       Term_Taxonomy___Venue_Meta.VNU_address2                    AS 'Term_Taxonomy___Venue_Meta.VNU_address2',
       Term_Taxonomy___Venue_Meta.VNU_city                        AS 'Term_Taxonomy___Venue_Meta.VNU_city',
       Term_Taxonomy___Venue_Meta.STA_ID                          AS 'Term_Taxonomy___Venue_Meta.STA_ID',
       Term_Taxonomy___Venue_Meta.CNT_ISO                         AS 'Term_Taxonomy___Venue_Meta.CNT_ISO',
       Term_Taxonomy___Venue_Meta.VNU_zip                         AS 'Term_Taxonomy___Venue_Meta.VNU_zip',
       Term_Taxonomy___Venue_Meta.VNU_phone                       AS 'Term_Taxonomy___Venue_Meta.VNU_phone',
       Term_Taxonomy___Venue_Meta.VNU_capacity                    AS 'Term_Taxonomy___Venue_Meta.VNU_capacity',
       Term_Taxonomy___Venue_Meta.VNU_url                         AS 'Term_Taxonomy___Venue_Meta.VNU_url',
       Term_Taxonomy___Venue_Meta.VNU_virtual_phone               AS 'Term_Taxonomy___Venue_Meta.VNU_virtual_phone',
       Term_Taxonomy___Venue_Meta.VNU_virtual_url                 AS 'Term_Taxonomy___Venue_Meta.VNU_virtual_url',
       Term_Taxonomy___Venue_Meta.VNU_google_map_link             AS 'Term_Taxonomy___Venue_Meta.VNU_google_map_link',
       Term_Taxonomy___Venue_Meta.VNU_enable_for_gmap             AS 'Term_Taxonomy___Venue_Meta.VNU_enable_for_gmap',
       Term_Taxonomy___Venue_Meta.VNUM_ID                         AS 'Term_Taxonomy___Venue_Meta.VNUM_ID'
FROM wp_terms AS Term
       LEFT JOIN wp_term_taxonomy AS Term_Taxonomy ON Term_Taxonomy.term_id = Term.term_id
       LEFT JOIN wp_term_relationships AS Term_Taxonomy___Term_Relationship
         ON Term_Taxonomy___Term_Relationship.term_taxonomy_id = Term_Taxonomy.term_taxonomy_id
       LEFT JOIN wp_posts AS Term_Taxonomy___Event_CPT
         ON Term_Taxonomy___Event_CPT.ID = Term_Taxonomy___Term_Relationship.object_id
       LEFT JOIN wp_esp_event_meta AS Term_Taxonomy___Event_Meta
         ON Term_Taxonomy___Event_CPT.ID = Term_Taxonomy___Event_Meta.EVT_ID
       LEFT JOIN wp_posts AS Term_Taxonomy___Venue_CPT
         ON Term_Taxonomy___Venue_CPT.ID = Term_Taxonomy___Term_Relationship.object_id
       LEFT JOIN wp_esp_venue_meta AS Term_Taxonomy___Venue_Meta
         ON Term_Taxonomy___Venue_CPT.ID = Term_Taxonomy___Venue_Meta.VNU_ID
WHERE Term.slug = '$tag'
    AND Term_Taxonomy.taxonomy = 'post_tag'
    AND (
          (
              Term_Taxonomy___Event_CPT.post_type = 'espresso_events'
                AND Term_Taxonomy___Event_CPT.post_status NOT IN  ('auto-draft', 'trash')
          ) OR (
              Term_Taxonomy___Venue_CPT.post_type = 'espresso_venues'
                AND Term_Taxonomy___Venue_CPT.post_status NOT IN ('auto-draft', 'trash')
          )
      )";
        $results = $wpdb->get_results($SQL, ARRAY_A);

        $results = is_array($results) ? $results : array($results);
        $post_type = array();
        foreach ($results as $key => $result) {
            foreach ($result as $property => $value) {
                if(strpos($property, '.post_type') === (strlen($property) - 10)) {
                    $post_type[] = $value;
                }
            }
        }
        $post_tags = EEM_Term::instance()->_create_objects($results);
        $post_tag = is_array($post_tags) ? reset($post_tags) : $post_tags;
        if ($post_tag->post_type === null) {
            $post_tag->post_type = array();
        }
        $post_tag->post_type = array_merge($post_tag->post_type, array_unique($post_type));
        return $post_tag;
    }



    /**
     * get_all_event_post_tags
     *
     * @return EE_Base_Class[]
     */
    public function get_all_event_post_tags()
    {
        $post_tags = EEM_Term::instance()->get_all(
            array(
                array(
                    'Term_Taxonomy.taxonomy'        => 'post_tag',
                    'Term_Taxonomy.Event.post_type' => 'espresso_events',
                ),
                'order_by'   => array('name' => 'ASC'),
                'force_join' => array('Term_Taxonomy.Event'),
            )
        );
        foreach ($post_tags as $key => $post_tag) {
            if (! isset($post_tags[ $key ]->post_type)) {
                $post_tags[ $key ]->post_type = array();
            }
            $post_tags[ $key ]->post_type[] = 'espresso_events';
        }
        return $post_tags;
    }



    /**
     * get_all_venue_post_tags
     *
     * @return EE_Base_Class[]
     */
    public function get_all_venue_post_tags()
    {
        $post_tags = EEM_Term::instance()->get_all(
            array(
                array(
                    'Term_Taxonomy.taxonomy'        => 'post_tag',
                    'Term_Taxonomy.Venue.post_type' => 'espresso_venues',
                ),
                'order_by'   => array('name' => 'ASC'),
                'force_join' => array('Term_Taxonomy'),
            )
        );
        foreach ($post_tags as $key => $post_tag) {
            if (! isset($post_tags[ $key ]->post_type)) {
                $post_tags[ $key ]->post_type = array();
            }
            $post_tags[ $key ]->post_type[] = 'espresso_venues';
        }
        return $post_tags;
    }



    /**
     * Makes sure that during REST API queries, we only return terms
     * for term taxonomies which should be shown in the rest api
     *
     * @param array    $model_query_params
     * @param array    $querystring_query_params
     * @param EEM_Base $model
     * @return array
     */
    public static function rest_api_query_params($model_query_params, $querystring_query_params, $model)
    {
        if ($model === EEM_Term::instance()) {
            $taxonomies = get_taxonomies(array('show_in_rest' => true));
            if (! empty($taxonomies)) {
                $model_query_params[0]['Term_Taxonomy.taxonomy'] = array('IN', $taxonomies);
            }
        }
        return $model_query_params;
    }
}
