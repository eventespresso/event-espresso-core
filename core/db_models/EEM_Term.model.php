<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * class EEM_Term
 *
 * @package     Event Espresso
 * @subpackage  includes/models/
 * @author      Michael Nelson
 */
class EEM_Term extends EEM_Base
{

    /**
     * @var EEM_Term
     */
    protected static $_instance;


    /**
     * @param string $timezone
     * @throws EE_Error
     */
    protected function __construct(string $timezone = '')
    {
        $this->singular_item                                        = esc_html__('Term', 'event_espresso');
        $this->plural_item                                          = esc_html__('Terms', 'event_espresso');
        $this->_tables                                              = [
            'Term' => new EE_Primary_Table('terms', 'term_id'),
        ];
        $this->_fields                                              = [
            'Term' => [
                'term_id'    => new EE_Primary_Key_Int_Field(
                    'term_id',
                    esc_html__('Term ID', 'event_espresso')
                ),
                'name'       => new EE_Plain_Text_Field(
                    'name',
                    esc_html__('Term Name', 'event_espresso'),
                    false,
                    ''
                ),
                'slug'       => new EE_Slug_Field(
                    'slug',
                    esc_html__('Term Slug', 'event_espresso'),
                    false
                ),
                'term_group' => new EE_Integer_Field(
                    'term_group',
                    esc_html__("Term Group", "event_espresso"),
                    false,
                    0
                ),
            ],
        ];
        $this->_model_relations                                     = [
            'Term_Taxonomy' => new EE_Has_Many_Relation(),
        ];
        $this->_wp_core_model                                       = true;
        $path_to_tax_model                                          = 'Term_Taxonomy';
        $this->_cap_restriction_generators[ EEM_Base::caps_read ]   = new EE_Restriction_Generator_Public();
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ]
                                                                    = new EE_Restriction_Generator_Taxonomy_Protected(
            $path_to_tax_model
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ]   = false;
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ] = false;
        $path_to_tax_model                                          = $path_to_tax_model . '.';
        // add cap restrictions for editing relating to the "ee_edit_*"
        $this->_cap_restrictions[ EEM_Base::caps_edit ]['ee_edit_event_category'] = new EE_Default_Where_Conditions(
            [
                $path_to_tax_model . 'taxonomy*ee_edit_event_category' => ['!=', 'espresso_event_categories'],
            ]
        );
        $this->_cap_restrictions[ EEM_Base::caps_edit ]['ee_edit_venue_category'] = new EE_Default_Where_Conditions(
            [
                $path_to_tax_model . 'taxonomy*ee_edit_venue_category' => ['!=', 'espresso_venue_categories'],
            ]
        );
        $this->_cap_restrictions[ EEM_Base::caps_edit ]['ee_edit_event_type']     = new EE_Default_Where_Conditions(
            [
                $path_to_tax_model . 'taxonomy*ee_edit_event_type' => ['!=', 'espresso_event_type'],
            ]
        );
        // add cap restrictions for deleting relating to the "ee_deleting_*"
        $this->_cap_restrictions[ EEM_Base::caps_delete ]['ee_delete_event_category'] = new EE_Default_Where_Conditions(
            [
                $path_to_tax_model . 'taxonomy*ee_delete_event_category' => ['!=', 'espresso_event_categories'],
            ]
        );
        $this->_cap_restrictions[ EEM_Base::caps_delete ]['ee_delete_venue_category'] = new EE_Default_Where_Conditions(
            [
                $path_to_tax_model . 'taxonomy*ee_delete_venue_category' => ['!=', 'espresso_venue_categories'],
            ]
        );
        $this->_cap_restrictions[ EEM_Base::caps_delete ]['ee_delete_event_type']     = new EE_Default_Where_Conditions(
            [
                $path_to_tax_model . 'taxonomy*ee_delete_event_type' => ['!=', 'espresso_event_type'],
            ]
        );
        parent::__construct($timezone);
        add_filter('FHEE__Read__create_model_query_params', ['EEM_Term', 'rest_api_query_params'], 10, 3);
    }


    /**
     * retrieves a list of all EE event categories
     *
     * @access public
     * @param bool $show_uncategorized
     * @return EE_Base_Class[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_ee_categories(bool $show_uncategorized = false): array
    {
        $where_params = [
            'Term_Taxonomy.taxonomy' => 'espresso_event_categories',
            'NOT'                    => ['name' => esc_html__('Uncategorized', 'event_espresso')],
        ];
        if ($show_uncategorized) {
            unset($where_params['NOT']);
        }
        return EEM_Term::instance()->get_all(
            [
                $where_params,
                'order_by' => ['name' => 'ASC'],
            ]
        );
    }


    /**
     * retrieves a list of all post_tags associated with an EE CPT
     *
     * @access public
     * @param string $post_type
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_CPT_post_tags(string $post_type = ''): array
    {
        switch ($post_type) {
            case 'espresso_events':
                return $this->get_all_event_post_tags();
            case 'espresso_venues':
                return $this->get_all_venue_post_tags();
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
     * @return EE_Term|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_post_tag_for_event_or_venue(string $tag): ?EE_Term
    {
        $post_tag_results = $this->get_all_wpdb_results(
            [
                [
                    'slug'                   => $tag,
                    'Term_Taxonomy.taxonomy' => 'post_tag',
                    'OR'                     => [
                        'Term_Taxonomy.Venue.post_type' => 'espresso_venues',
                        'Term_Taxonomy.Event.post_type' => 'espresso_events',
                    ],
                ],
                'default_where_conditions' => 'none',
                'extra_selects'            => [
                    'event_post_type' => ['Term_Taxonomy___Event_CPT.post_type', '%s'],
                    'venue_post_type' => ['Term_Taxonomy___Venue_CPT.post_type', '%s'],
                ],
                'group_by'                 => [
                    'event_post_type',
                    'venue_post_type',
                ],
                'limit'                    => 2,
            ]
        );

        $post_types = [];
        foreach ((array) $post_tag_results as $row) {
            if ($row['event_post_type'] === 'espresso_events') {
                $post_types[] = EEM_Event::instance()->post_type();
            } elseif ($row['venue_post_type'] === 'espresso_venues') {
                $post_types[] = EEM_Venue::instance()->post_type();
            }
        }
        $post_tag_row = reset($post_tag_results);
        $post_tag     = $this->instantiate_class_from_array_or_object($post_tag_row);
        if (! $post_tag instanceof EE_Term) {
            return null;
        }

        if ($post_tag->post_type === null) {
            $post_tag->post_type = [];
        }
        $post_tag->post_type = array_merge($post_tag->post_type, array_unique($post_types));
        return $post_tag;
    }


    /**
     * get_all_event_post_tags
     *
     * @return EE_Base_Class[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_event_post_tags(): array
    {
        $post_tags = EEM_Term::instance()->get_all(
            [
                [
                    'Term_Taxonomy.taxonomy'        => 'post_tag',
                    'Term_Taxonomy.Event.post_type' => 'espresso_events',
                ],
                'order_by'   => ['name' => 'ASC'],
                'force_join' => ['Term_Taxonomy.Event'],
            ]
        );
        foreach ($post_tags as $key => $post_tag) {
            if (! isset($post_tag->post_type)) {
                $post_tag->post_type = [];
            }
            $post_tag->post_type[] = 'espresso_events';
            $post_tags[ $key ]     = $post_tag;
        }
        return $post_tags;
    }


    /**
     * get_all_venue_post_tags
     *
     * @return EE_Base_Class[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_venue_post_tags(): array
    {
        $post_tags = EEM_Term::instance()->get_all(
            [
                [
                    'Term_Taxonomy.taxonomy'        => 'post_tag',
                    'Term_Taxonomy.Venue.post_type' => 'espresso_venues',
                ],
                'order_by'   => ['name' => 'ASC'],
                'force_join' => ['Term_Taxonomy'],
            ]
        );
        foreach ($post_tags as $key => $post_tag) {
            if (! isset($post_tag->post_type)) {
                $post_tag->post_type = [];
            }
            $post_tag->post_type[] = 'espresso_venues';
            $post_tags[ $key ]     = $post_tag;
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
     * @throws EE_Error
     * @throws EE_Error
     */
    public static function rest_api_query_params(
        array $model_query_params,
        array $querystring_query_params,
        EEM_Base $model
    ): array {
        if ($model === EEM_Term::instance()) {
            $taxonomies = get_taxonomies(['show_in_rest' => true]);
            if (! empty($taxonomies)) {
                $model_query_params[0]['Term_Taxonomy.taxonomy'] = ['IN', $taxonomies];
            }
        }
        return $model_query_params;
    }
}
