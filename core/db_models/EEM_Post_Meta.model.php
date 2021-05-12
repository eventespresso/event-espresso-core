<?php

/**
 * Post Meta Model
 * Model for accessing the wp core postmeta table. Generally it's better to use the
 * built-in wp functions directly, but this is useful if you want to use the EE models
 * and need a query that factors in an EE custom post type's postmeta (eg, attendees, events or venues).
 * Currently, if applying caps to the queries, these are only accessible to site admins;
 * however we may devise some strategy for marking specified postmeta as public.
 * (Using the wp core convention of prefixing meta keys with an underscore might work,
 * see https://codex.wordpress.org/Function_Reference/add_post_meta, but when a postmeta is
 * "non-hidden" it's meant to show in the wp admin's post editing page, not necessarily on the frontend)
 *
 * @package     Event Espresso
 * @subpackage  includes/models/
 * @author      Michael Nelson
 */
class EEM_Post_Meta extends EEM_Base
{

    // private instance of the EE_Post_Meta object
    protected static $_instance;



    protected function __construct(string $timezone = '')
    {
        $this->singular_item = esc_html__('Post Meta', 'event_espresso');
        $this->plural_item = esc_html__('Post Metas', 'event_espresso');
        $this->_tables = array(
            'Post_Meta' => new EE_Primary_Table('postmeta', 'meta_id'),
        );
        $models_this_can_attach_to = array_keys(EE_Registry::instance()->cpt_models());
        $this->_fields = array(
            'Post_Meta' => array(
                'meta_id'    => new EE_Primary_Key_Int_Field(
                    'meta_id',
                    esc_html__("Meta ID", "event_espresso")
                ),
                'post_id'    => new EE_Foreign_Key_Int_Field(
                    'post_id',
                    esc_html__("Primary Key of Post", "event_espresso"),
                    false,
                    0,
                    $models_this_can_attach_to
                ),
                'meta_key'   => new EE_Plain_Text_Field(
                    'meta_key',
                    esc_html__("Meta Key", "event_espresso"),
                    false,
                    ''
                ),
                'meta_value' => new EE_Maybe_Serialized_Text_Field(
                    'meta_value',
                    esc_html__("Meta Value", "event_espresso"),
                    true
                ),
            ),
        );
        $this->_model_relations = array();
        foreach ($models_this_can_attach_to as $model) {
            $this->_model_relations[ $model ] = new EE_Belongs_To_Relation();
        }
        $this->_wp_core_model = true;
        foreach ($this->cap_contexts_to_cap_action_map() as $cap_context => $action) {
            $this->_cap_restriction_generators[ $cap_context ] = new EE_Restriction_Generator_Meta(
                'meta_key',
                'meta_value'
            );
        }
        parent::__construct($timezone);
    }
}
