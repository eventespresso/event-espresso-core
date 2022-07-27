<?php

/**
 * EEM_Term_Taxonomy model
 *
 * @package     Event Espresso
 * @subpackage  core/db_models
 * @author      Michael Nelson
 * @method EE_Term_Taxonomy[] get_all($query_params)
 */
class EEM_Term_Taxonomy extends EEM_Base
{
    /**
     * @var EEM_Term_Taxonomy
     */
    protected static $_instance = null;


    /**
     * @param $timezone
     * @throws EE_Error
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Term Taxonomy', 'event_espresso');
        $this->plural_item = esc_html__('Term Taxonomy', 'event_espresso');
        $this->_tables = array(
            'Term_Taxonomy' => new EE_Primary_Table('term_taxonomy', 'term_taxonomy_id'),
        );
        $this->_fields = array(
            'Term_Taxonomy' => array(
                'term_taxonomy_id' => new EE_Primary_Key_Int_Field(
                    'term_taxonomy_id',
                    esc_html__('Term-Taxonomy ID', 'event_espresso')
                ),
                'term_id'          => new EE_Foreign_Key_Int_Field(
                    'term_id',
                    esc_html__("Term Id", "event_espresso"),
                    false,
                    0,
                    'Term'
                ),
                'taxonomy'         => new EE_Plain_Text_Field(
                    'taxonomy',
                    esc_html__('Taxonomy Name', 'event_espresso'),
                    false,
                    'category'
                ),
                'description'      => new EE_Post_Content_Field(
                    'description',
                    esc_html__("Description of Term", "event_espresso"),
                    false,
                    ''
                ),
                'parent'           => new EE_Integer_Field('parent', esc_html__("Parent Term ID", "event_espresso"), false, 0),
                'term_count'       => new EE_Integer_Field(
                    'count',
                    esc_html__("Count of Objects attached", 'event_espresso'),
                    false,
                    0
                ),
            ),
        );
        $this->_model_relations = array(
            'Term_Relationship' => new EE_Has_Many_Relation(),
            'Term'              => new EE_Belongs_To_Relation(),
        );
        $cpt_models = array_keys(EE_Registry::instance()->cpt_models());
        foreach ($cpt_models as $model_name) {
            $this->_model_relations[ $model_name ] = new EE_HABTM_Relation('Term_Relationship');
        }
        $this->_wp_core_model = true;
        $this->_indexes = array(
            'term_id_taxonomy' => new EE_Unique_Index(array('term_id', 'taxonomy')),
        );
        $path_to_tax_model = '';
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Taxonomy_Protected(
            $path_to_tax_model
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ] = false;
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ] = false;
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
        add_filter('FHEE__Read__create_model_query_params', array('EEM_Term_Taxonomy', 'rest_api_query_params'), 10, 3);
    }


    /**
     * Makes sure that during REST API queries, we only return term-taxonomies
     * for term taxonomies which should be shown in the rest api
     *
     * @param array    $model_query_params
     * @param array    $querystring_query_params
     * @param EEM_Base $model
     * @return array
     * @throws EE_Error
     */
    public static function rest_api_query_params($model_query_params, $querystring_query_params, $model)
    {
        if ($model === EEM_Term_Taxonomy::instance()) {
            $taxonomies = get_taxonomies(array('show_in_rest' => true));
            if (! empty($taxonomies)) {
                $model_query_params[0]['taxonomy'] = array('IN', $taxonomies);
            }
        }
        return $model_query_params;
    }
}
// End of file EEM_Term_Taxonomy.model.php
// Location: /includes/models/EEM_Term_Taxonomy.model.php
