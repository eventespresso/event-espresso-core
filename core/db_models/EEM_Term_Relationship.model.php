<?php

/**
 * Attendee Model
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Michael Nelson
 */
class EEM_Term_Relationship extends EEM_Base
{

    /**
     * @var EEM_Term_Relationship
     */
    protected static $_instance;


    /**
     * EEM_Term_Relationship constructor.
     *
     * @param string $timezone
     * @throws EE_Error
     */
    protected function __construct(string $timezone = '')
    {
        $this->singular_item       = esc_html__('Term Relationship', 'event_espresso');
        $this->plural_item         = esc_html__('Term Relationships', 'event_espresso');
        $this->_tables             = [
            'Term_Relationship' => new EE_Primary_Table('term_relationships'),
        ];
        $models_this_can_attach_to = array_keys(EE_Registry::instance()->cpt_models());
        $this->_fields             = [
            'Term_Relationship' => [
                'object_id'        => new EE_Foreign_Key_Int_Field(
                    'object_id',
                    esc_html__('Object(Post) ID', 'event_espresso'),
                    false,
                    0,
                    $models_this_can_attach_to
                ),
                'term_taxonomy_id' => new EE_Foreign_Key_Int_Field(
                    'term_taxonomy_id',
                    esc_html__(
                        'Term (in context of a taxonomy) ID',
                        'event_espresso'
                    ),
                    false,
                    0,
                    'Term_Taxonomy'
                ),
                'term_order'       => new EE_Integer_Field(
                    'term_order',
                    esc_html__('Term Order', 'event_espresso'),
                    false,
                    0
                ),
            ],
        ];
        $this->_model_relations    = [
            'Term_Taxonomy' => new EE_Belongs_To_Relation(),
        ];
        foreach ($models_this_can_attach_to as $model_name) {
            $this->_model_relations[ $model_name ] = new EE_Belongs_To_Relation();
        }
        $this->_wp_core_model = true;
        $this->_indexes       = [
            'PRIMARY' => new EE_Primary_Key_Index(['object_id', 'term_taxonomy_id']),
        ];
        $path_to_event_model  = 'Event';
        $this->_cap_restriction_generators[ EEM_Base::caps_read ]
                              = new EE_Restriction_Generator_Event_Related_Public(
            $path_to_event_model
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ]
                              = new EE_Restriction_Generator_Event_Related_Protected(
            $path_to_event_model
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ]
                              = new EE_Restriction_Generator_Event_Related_Protected(
            $path_to_event_model
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ]
                              = new EE_Restriction_Generator_Event_Related_Protected(
            $path_to_event_model,
            EEM_Base::caps_edit
        );
        $path_to_tax_model    = 'Term_Taxonomy.';
        // add cap restrictions for editing term relations to the "ee_assign_*"
        // and for deleting term relations too
        $cap_contexts_affected = [EEM_Base::caps_edit, EEM_Base::caps_delete];
        foreach ($cap_contexts_affected as $cap_context_affected) {
            $this->_cap_restrictions[ $cap_context_affected ]['ee_assign_event_category']
                = new EE_Default_Where_Conditions(
                [
                    $path_to_tax_model . 'taxonomy*ee_assign_event_category' => [
                        '!=',
                        'espresso_event_categories',
                    ],
                ]
            );
            $this->_cap_restrictions[ $cap_context_affected ]['ee_assign_venue_category']
                = new EE_Default_Where_Conditions(
                [
                    $path_to_tax_model . 'taxonomy*ee_assign_venue_category' => [
                        '!=',
                        'espresso_venue_categories',
                    ],
                ]
            );
            $this->_cap_restrictions[ $cap_context_affected ]['ee_assign_event_type']
                = new EE_Default_Where_Conditions(
                [
                    $path_to_tax_model . 'taxonomy*ee_assign_event_type' => ['!=', 'espresso_event_type'],
                ]
            );
        }
        parent::__construct($timezone);
        add_filter(
            'FHEE__Read__create_model_query_params',
            ['EEM_Term_Relationship', 'rest_api_query_params'],
            10,
            3
        );
    }


    /**
     * Makes sure all term-taxonomy counts are correct
     *
     * @param int|null $term_taxonomy_id the id of the term taxonomy to update. If NULL, updates ALL
     * @return int the number of rows affected
     * @throws EE_Error
     * @global wpdb    $wpdb
     */
    public function update_term_taxonomy_counts(int $term_taxonomy_id = 0): int
    {
        // because this uses a subquery and sometimes assigning to column to be another column's
        // value, we just write the SQL directly.
        global $wpdb;

        $query = "
                UPDATE {$wpdb->term_taxonomy} AS tt
                SET count = (
                    select count(*) as proper_count from {$wpdb->term_relationships} AS tr
                    WHERE tt.term_taxonomy_id = tr.term_taxonomy_id
                )";

        if ($term_taxonomy_id) {
            $query .= ' WHERE tt.term_taxonomy_id = %d';
            $query = $wpdb->prepare(
                $query,
                $term_taxonomy_id
            );
        }
        return $this->_do_wpdb_query(
            'query',
            [
                $query,
            ]
        );
    }


    /**
     * Overrides the parent to also make sure term-taxonomy counts are up-to-date after
     * inserting
     *
     * @param array $field_n_values @see EEM_Base::insert
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function insert($field_n_values): bool
    {
        $return = parent::insert($field_n_values);
        if (isset($field_n_values['term_taxonomy_id'])) {
            $this->update_term_taxonomy_counts($field_n_values['term_taxonomy_id']);
        }
        return $return;
    }


    /**
     * Overrides parent so that after an update, we also check the term_taxonomy_counts are
     * all ok
     *
     * @param array   $fields_n_values         see EEM_Base::update
     * @param array   $query_params            @see
     *                                         https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @param boolean $keep_model_objs_in_sync if TRUE, makes sure we ALSO update model objects
     *                                         in this model's entity map according to $fields_n_values that match
     *                                         $query_params. This obviously has some overhead, so you can disable it
     *                                         by setting this to FALSE, but be aware that model objects being used
     *                                         could get out-of-sync with the database
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update($fields_n_values, $query_params, $keep_model_objs_in_sync = true): int
    {
        $count = parent::update($fields_n_values, $query_params, $keep_model_objs_in_sync);
        if ($count) {
            $this->update_term_taxonomy_counts();
        }
        return $count;
    }


    /**
     * Overrides parent so that after running this, we also double-check
     * the term taxonomy counts are up-to-date
     *
     * @param array   $query_params @see
     *                              https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @param boolean $allow_blocking
     * @return int @see EEM_Base::delete
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function delete($query_params, $allow_blocking = true): int
    {
        $count = parent::delete($query_params, $allow_blocking);
        if ($count) {
            $this->update_term_taxonomy_counts();
        }
        return $count;
    }


    /**
     * Makes sure that during REST API queries, we only return term relationships
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
        if ($model === EEM_Term_Relationship::instance()) {
            $taxonomies = get_taxonomies(['show_in_rest' => true]);
            if (! empty($taxonomies)) {
                $model_query_params[0]['Term_Taxonomy.taxonomy'] = ['IN', $taxonomies];
            }
        }
        return $model_query_params;
    }
}
