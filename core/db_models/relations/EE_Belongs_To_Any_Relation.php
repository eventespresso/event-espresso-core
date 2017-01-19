<?php
require_once(EE_MODELS . 'relations/EE_Belongs_To_Relation.php');


/**
 * Class EE_Belongs_To_Any_Relation
 * The current model has the foreign key pointing to the other model, but the foreign key can point to ANY model object
 * (roughly any table) specified on the field. Note: Also requires this model to have a field of type
 * EE_Any_Foreign_Model_Name_Field, in order to specify which model the foreign key points to (eg, the foreign key may
 * have a value of 34, but is that Transaction with ID 34 or Registration with ID 34? The
 * EE_Any_Foreign_Model_name_Field specifies which of the two).
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson
 */
class EE_Belongs_To_Any_Relation extends EE_Belongs_To_Relation
{


    /**
     * get_join_statement
     *
     * @param string $model_relation_chain
     * @return string
     * @throws \EE_Error
     */
    public function get_join_statement($model_relation_chain)
    {
        //create the sql string like
        $this_table_fk_field = $this->get_this_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
        //ALSO, need to get the field with the model name
        $field_with_model_name = $this->get_this_model()->get_field_containing_related_model_name();


        $other_table_pk_field = $this->get_other_model()->get_primary_key_field();
        $this_table_alias     = EE_Model_Parser::extract_table_alias_model_relation_chain_prefix($model_relation_chain,
                $this->get_this_model()->get_this_model_name()) . $this_table_fk_field->get_table_alias();
        $other_table_alias    = EE_Model_Parser::extract_table_alias_model_relation_chain_prefix($model_relation_chain,
                $this->get_other_model()->get_this_model_name()) . $other_table_pk_field->get_table_alias();
        $other_table          = $this->get_other_model()->get_table_for_alias($other_table_alias);
        return $this->_left_join($other_table,
                $other_table_alias,
                $other_table_pk_field->get_table_column(),
                $this_table_alias,
                $this_table_fk_field->get_table_column(),
                $field_with_model_name->get_qualified_column() . "='" . $this->get_other_model()->get_this_model_name() . "'")
               . $this->get_other_model()->_construct_internal_join_to_table_with_alias($other_table_alias);
    }


    /**
     * Sets this model object's foreign key to the other model object's primary key. Feel free to do this manually if
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
        //find the field on THIS model which a foreign key to the other model
        $fk_on_this_model = $this->get_this_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
        //set that field on the other model to this model's ID
        $this_model_obj->set($fk_on_this_model->get_name(), $other_model_obj->ID());
        //and make sure this model's field with the foreign model name is set to the correct value
        $this_model_obj->set($this->get_this_model()->get_field_containing_related_model_name()->get_name(),
            $this->get_other_model()->get_this_model_name());
        $this_model_obj->save();
        return $other_model_obj;
    }


    /**
     * Sets the this model object's foreign key to its default, instead of pointing to the other model object
     *
     * @param EE_Base_Class|int $this_obj_or_id
     * @param EE_Base_Class|int $other_obj_or_id
     * @param array             $where_query
     * @return \EE_Base_Class
     * @throws \EE_Error
     */
    public function remove_relation_to($this_obj_or_id, $other_obj_or_id, $where_query = array())
    {
        $this_model_obj  = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
        $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id);
        //find the field on the other model which is a foreign key to this model
        $fk_on_this_model = $this->get_this_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
        //set that field on the other model to this model's ID
        $this_model_obj->set($fk_on_this_model->get_name(), null, true);
        $this_model_obj->set($this->get_this_model()->get_field_containing_related_model_name()->get_name(), null,
            true);
        $this_model_obj->save();
        return $other_model_obj;
    }
}
