<?php
require_once(EE_MODELS . 'relations/EE_Model_Relation_Base.php');


/**
 * Class EE_Has_Many_Relation
 * In this relation, the OTHER model has the foreign key pointing to this model
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson
 */
class EE_Has_Many_Relation extends EE_Model_Relation_Base
{

    /**
     * Object representing the relationship between two models. Has_Many_Relations are where the OTHER model has the
     * foreign key this model. IE, there can be many other model objects related to one of this model's objects (but
     * NOT through a JOIN table, which is the case for EE_HABTM_Relations). This knows how to join the models, get
     * related models across the relation, and add-and-remove the relationships.
     *
     * @param boolean $block_deletes                 For this type of r elation, we block by default. If there are
     *                                               related models across this relation, block (prevent and add an
     *                                               error) the deletion of this model
     * @param string  $blocking_delete_error_message a customized error message on blocking deletes instead of the
     *                                               default
     */
    public function __construct($block_deletes = true, $blocking_delete_error_message = null)
    {
        parent::__construct($block_deletes, $blocking_delete_error_message);
    }


    /**
     * Gets the SQL string for performing the join between this model and the other model.
     *
     * @param string $model_relation_chain like 'Event.Event_Venue.Venue'
     * @return string of SQL, eg "LEFT JOIN table_name AS table_alias ON this_model_primary_table.pk =
     *                other_model_primary_table.fk" etc
     * @throws \EE_Error
     */
    public function get_join_statement($model_relation_chain)
    {
        //create the sql string like
        // LEFT JOIN other_table AS table_alias ON this_table_alias.pk = other_table_alias.fk extra_join_conditions
        $this_table_pk_field  = $this->get_this_model()->get_primary_key_field();
        $other_table_fk_field = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
        $pk_table_alias       = EE_Model_Parser::extract_table_alias_model_relation_chain_prefix($model_relation_chain,
                $this->get_this_model()->get_this_model_name()) . $this_table_pk_field->get_table_alias();
        $fk_table_alias       = EE_Model_Parser::extract_table_alias_model_relation_chain_prefix($model_relation_chain,
                $this->get_other_model()->get_this_model_name()) . $other_table_fk_field->get_table_alias();
        $fk_table             = $this->get_other_model()->get_table_for_alias($fk_table_alias);

        return $this->_left_join($fk_table, $fk_table_alias, $other_table_fk_field->get_table_column(), $pk_table_alias,
                $this_table_pk_field->get_table_column()) . $this->get_other_model()->_construct_internal_join_to_table_with_alias($fk_table_alias);
    }


    /**
     * Sets the other model object's foreign key to this model object's primary key. Feel free to do this manually if
     * you like.
     *
     * @param EE_Base_Class|int $this_obj_or_id
     * @param EE_Base_Class|int $other_obj_or_id
     * @param array             $extra_join_model_fields_n_values
     * @return \EE_Base_Class
     * @throws \EE_Error
     */
    public function add_relation_to($this_obj_or_id, $other_obj_or_id, $extra_join_model_fields_n_values = array())
    {
        $this_model_obj  = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
        $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);

        //find the field on the other model which is a foreign key to this model
        $fk_field_on_other_model = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
        if ($other_model_obj->get($fk_field_on_other_model->get_name()) != $this_model_obj->ID()) {
            //set that field on the other model to this model's ID
            $other_model_obj->set($fk_field_on_other_model->get_name(), $this_model_obj->ID());
            $other_model_obj->save();
        }
        return $other_model_obj;
    }


    /**
     * Sets the other model object's foreign key to its default, instead of pointing to this model object.
     * If $other_obj_or_id doesn't have any other relations, this function is essentially orphaning it
     *
     * @param EE_Base_Class|int $this_obj_or_id
     * @param EE_Base_Class|int $other_obj_or_id
     * @param array             $where_query
     * @return \EE_Base_Class
     * @throws \EE_Error
     */
    public function remove_relation_to($this_obj_or_id, $other_obj_or_id, $where_query = array())
    {
        $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
        //find the field on the other model which is a foreign key to this model
        $fk_field_on_other_model = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
        //set that field on the other model to this model's ID
        $other_model_obj->set($fk_field_on_other_model->get_name(), null, true);
        $other_model_obj->save();
        return $other_model_obj;
    }
}
