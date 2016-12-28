<?php

/**
 * Class EE_HABTM_Any_Relation
 * Joins any two models together via a has-and-belongs-to-many relation, using the esp_extra_join table.
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson
 */
class EE_HABTM_Any_Relation extends EE_HABTM_Relation
{
    /**
     * @var string
     */
    protected $_alphabetically_first_model_name;

    /**
     * Object representing the relationship between two models. HasAndBelongsToMany relations always use a join-table
     * (and an ee joining-model.) This knows how to join the models,
     * get related models across the relation, and add-and-remove the relationships.
     *
     * @param boolean $block_deletes                 for this type of relation, we block by default for now. if there
     *                                               are related models across this relation, block (prevent and add an
     *                                               error) the deletion of this model
     * @param string  $blocking_delete_error_message a customized error message on blocking deletes instead of the
     *                                               default
     */
    public function __construct($block_deletes = true, $blocking_delete_error_message = '')
    {
        parent::__construct('Extra_Join', $block_deletes, $blocking_delete_error_message);
    }


    /**
     * @param $this_model_name
     * @param $other_model_name
     * @throws EE_Error
     */
    public function _construct_finalize_set_models($this_model_name, $other_model_name)
    {
        if ($this_model_name < $other_model_name) {
            $this->_alphabetically_first_model_name = $this_model_name;
        } else {
            $this->_alphabetically_first_model_name = $other_model_name;
        }
        parent::_construct_finalize_set_models($this_model_name, $other_model_name);
    }


    /**
     * @param string $model_name
     * @param string $id_or_name_field should be the string 'ID' or 'name' only
     * @return EE_Model_Field_Base
     * @throws \EE_Error
     */
    public function get_join_table_fk_field_to($model_name, $id_or_name_field)
    {
        $order = null;
        if ($model_name === $this->_alphabetically_first_model_name) {
            $order = 'first';
        } else {
            $order = 'second';
        }
        return $this->get_join_model()->field_settings_for('EXJ_' . $order . '_model_' . $id_or_name_field);
    }


    /**
     * Gets the SQL string for joining the main model's table containing the pk to the join table. Eg "LEFT JOIN
     * real_join_table AS join_table_alias ON this_table_alias.pk = join_table_alias.fk_to_this_table"
     *
     * @param string $model_relation_chain like 'Event.Event_Venue.Venue'
     * @return string of SQL
     * @throws \EE_Error
     */
    public function get_join_to_intermediate_model_statement($model_relation_chain)
    {
        //create sql like
        //LEFT JOIN join_table AS join_table_alias ON this_table_alias.this_table_pk = join_table_alias.join_table_fk_to_this
        //LEFT JOIN other_table AS other_table_alias ON join_table_alias.join_table_fk_to_other = other_table_alias.other_table_pk
        //remember the model relation chain to the JOIN model, because we'll
        //need it for get_join_statement()
        $this->_model_relation_chain_to_join_model = $model_relation_chain;
        $this_table_pk_field                       = $this->get_this_model()->get_primary_key_field();
        $join_table_fk_field_to_this_table         = $this->get_join_table_fk_field_to(
            $this->get_this_model()->get_this_model_name(),
            'ID');
        $field_with_model_name                     = $this->get_join_table_fk_field_to(
            $this->get_this_model()->get_this_model_name(),
            'name');
        $this_table_alias                          = EE_Model_Parser::extract_table_alias_model_relation_chain_prefix($model_relation_chain,
                $this->get_this_model()->get_this_model_name()) . $this_table_pk_field->get_table_alias();
        $join_table_alias                          = EE_Model_Parser::extract_table_alias_model_relation_chain_prefix($model_relation_chain,
                $this->get_join_model()->get_this_model_name()) . $join_table_fk_field_to_this_table->get_table_alias();
        $join_table                                = $this->get_join_model()->get_table_for_alias($join_table_alias);
        //phew! ok, we have all the info we need, now we can create the SQL join string
        $SQL = $this->_left_join(
                $join_table,
                $join_table_alias,
                $join_table_fk_field_to_this_table->get_table_column(),
                $this_table_alias,
                $this_table_pk_field->get_table_column(),
                $field_with_model_name->get_qualified_column() . "='" . $this->get_this_model()->get_this_model_name() . "'") .
               $this->get_join_model()->_construct_internal_join_to_table_with_alias($join_table_alias);

        return $SQL;
    }


    /**
     * Gets the SQL string for joining the join table to the other model's pk's table. Eg "LEFT JOIN real_other_table
     * AS other_table_alias ON join_table_alias.fk_to_other_table = other_table_alias.pk" If you want to join between
     * modelA -> joinModelAB -> modelB (eg, Event -> Event_Question_Group -> Question_Group), you should prepend the
     * result of this function with results from get_join_to_intermediate_model_statement(), so that you join first to
     * the intermediate join table, and then to the other model's pk's table
     *
     * @param string $model_relation_chain like 'Event.Event_Venue.Venue'
     * @return string of SQL
     * @throws \EE_Error
     */
    public function get_join_statement($model_relation_chain)
    {
        if ($this->_model_relation_chain_to_join_model === null) {
            throw new EE_Error(sprintf(__('When using EE_HABTM_Relation to create a join, you must call get_join_to_intermediate_model_statement BEFORE get_join_statement',
                'event_espresso')));
        }
        $join_table_fk_field_to_this_table  = $this->get_join_table_fk_field_to(
            $this->get_this_model()->get_this_model_name(),
            'ID');
        $join_table_fk_field_to_other_table = $this->get_join_table_fk_field_to(
            $this->get_other_model()->get_this_model_name(),
            'ID');
        $field_with_other_model_name        = $this->get_join_table_fk_field_to(
            $this->get_other_model()->get_this_model_name(),
            'name');

        $join_table_alias = EE_Model_Parser::extract_table_alias_model_relation_chain_prefix($this->_model_relation_chain_to_join_model,
                $this->get_join_model()->get_this_model_name()) . $join_table_fk_field_to_this_table->get_table_alias();

        $other_table_pk_field = $this->get_other_model()->get_primary_key_field();
        $other_table_alias    = EE_Model_Parser::extract_table_alias_model_relation_chain_prefix($model_relation_chain,
                $this->get_other_model()->get_this_model_name()) . $other_table_pk_field->get_table_alias();
        $other_table          = $this->get_other_model()->get_table_for_alias($other_table_alias);

        $SQL = $this->_left_join(
                $other_table,
                $other_table_alias,
                $other_table_pk_field->get_table_column(),
                $join_table_alias,
                $join_table_fk_field_to_other_table->get_table_column(),
                $field_with_other_model_name->get_qualified_column() . "='" . $this->get_other_model()->get_this_model_name() . "'"
            ) .
               $this->get_other_model()->_construct_internal_join_to_table_with_alias($other_table_alias);
        return $SQL;
    }


    /**
     * Ensures there is an entry in the join table between these two models. Feel free to do this manually if you like.
     *
     * @param EE_Base_Class|int $this_obj_or_id
     * @param EE_Base_Class|int $other_obj_or_id
     * @param array             $extra_join_model_fields_n_values col=>val pairs that are used as extra conditions for
     *                                                            checking existing values and for setting new rows if
     *                                                            no exact matches.
     * @return EE_Base_Class
     * @throws \EE_Error
     */
    public function add_relation_to($this_obj_or_id, $other_obj_or_id, $extra_join_model_fields_n_values = array())
    {
        $this_model_obj  = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
        $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
        //check if such a relationship already exists
        $join_model_fk_to_this_model          = $this->get_join_table_fk_field_to(
            $this->get_this_model()->get_this_model_name(),
            'ID');
        $join_model_name_field_to_this_model  = $this->get_join_table_fk_field_to(
            $this->get_this_model()->get_this_model_name(),
            'name');
        $join_model_fk_to_other_model         = $this->get_join_table_fk_field_to(
            $this->get_other_model()->get_this_model_name(),
            'ID');
        $join_model_name_field_to_other_model = $this->get_join_table_fk_field_to(
            $this->get_other_model()->get_this_model_name(),
            'name');

        $cols_n_values = array(
            $join_model_fk_to_this_model->get_name()          => $this_model_obj->ID(),
            $join_model_name_field_to_this_model->get_name()  => $this_model_obj->get_model()->get_this_model_name(),
            $join_model_fk_to_other_model->get_name()         => $other_model_obj->ID(),
            $join_model_name_field_to_other_model->get_name() => $other_model_obj->get_model()->get_this_model_name(),
        );

        //if $where_query exists lets add them to the query_params.
        if (! empty($extra_join_model_fields_n_values)) {
            //make sure we strip any of the join model names from the $where_query cause we don't need that in here (why? because client code may have used the same conditionals for get_all_related which DOES need the join model name)
            //make sure we strip THIS models name from the query param
            $parsed_query = array();
            foreach ($extra_join_model_fields_n_values as $query_param => $val) {
                $query_param                = str_replace($this->get_join_model()->get_this_model_name() . ".", "",
                    $query_param);
                $parsed_query[$query_param] = $val;
            }
            $cols_n_values = array_merge($cols_n_values, $parsed_query);
        }

        $query_params = array($cols_n_values);


        $existing_entry_in_join_table = $this->get_join_model()->get_one($query_params);
        //if there is already an entry in the join table, indicating a relationship, we're done
        //again, if you want more sophisticated logic or insertions (handling more columns than just 2 foreign keys to
        //the other tables, use the joining model directly!
        if (! $existing_entry_in_join_table) {
            $this->get_join_model()->insert($cols_n_values);
        }
        return $other_model_obj;
    }


    /**
     * Deletes any rows in the join table that have foreign keys matching the other model objects specified
     *
     * @param EE_Base_Class|int $this_obj_or_id
     * @param EE_Base_Class|int $other_obj_or_id
     * @param array             $where_query col=>val pairs that are used as extra conditions for checking existing
     *                                       values and for removing existing rows if exact matches exist.
     * @return EE_Base_Class
     * @throws \EE_Error
     */
    public function remove_relation_to($this_obj_or_id, $other_obj_or_id, $where_query = array())
    {
        $this_model_obj  = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
        $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
        //check if such a relationship already exists
        $join_model_fk_to_this_model          = $this->get_join_table_fk_field_to(
            $this->get_this_model()->get_this_model_name(),
            'ID');
        $join_model_name_field_to_this_model  = $this->get_join_table_fk_field_to(
            $this->get_this_model()->get_this_model_name(),
            'name');
        $join_model_fk_to_other_model         = $this->get_join_table_fk_field_to(
            $this->get_other_model()->get_this_model_name(),
            'ID');
        $join_model_name_field_to_other_model = $this->get_join_table_fk_field_to(
            $this->get_other_model()->get_this_model_name(),
            'name');

        $cols_n_values = array(
            $join_model_fk_to_this_model->get_name()          => $this_model_obj->ID(),
            $join_model_name_field_to_this_model->get_name()  => $this_model_obj->get_model()->get_this_model_name(),
            $join_model_fk_to_other_model->get_name()         => $other_model_obj->ID(),
            $join_model_name_field_to_other_model->get_name() => $other_model_obj->get_model()->get_this_model_name(),
        );

        //if $where_query exists lets add them to the query_params.
        if (! empty($where_query)) {
            //make sure we strip any of the join model names from the $where_query cause we don't need that in here (why? because client code may have used the same conditionals for get_all_related which DOES need the join model name)
            //make sure we strip THIS models name from the query param
            $parsed_query = array();
            foreach ($where_query as $query_param => $val) {
                $query_param                = str_replace($this->get_join_model()->get_this_model_name() . ".", "",
                    $query_param);
                $parsed_query[$query_param] = $val;
            }
            $cols_n_values = array_merge($cols_n_values, $parsed_query);
        }

        $this->get_join_model()->delete(array($cols_n_values));
        return $other_model_obj;
    }
}
