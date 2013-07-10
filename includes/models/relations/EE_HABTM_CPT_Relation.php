<?php

require_once( EE_MODELS . 'relations/EE_Model_Relation_Base.php');
class EE_HABTM_Relation extends EE_Model_Relation_Base{
	/**
	 * The Foriegn key on the model that acts as the PRIMARY KEY used in special autosave handling where we query for autosaves.  The _primary_cpt_field is what is equivalent to the post_id field on a cpt join.
	 * @var string
	 */
	private $_primary_cpt_field;
	
	/**
	 * Object representing the relationship between two models. HasAndBelongsToMany relations always use a join-table
	 * (and an ee joining-model.) This knows how to join the models,
	 * get related models across the relation, and add-and-remove the relationships.
	 * @param string $primary_cpt_field See property description for details
	 * @param boolean $block_deletes for this type of relation, we block by default for now. if there are related models across this relation, block (prevent and add an error) the deletion of this model
	 * @param type $blocking_delete_error_message a customized error message on blocking deletes instead of the default
	 */
	function __construct($joining_model_name, $primary_cpt_field, $block_deletes = true, $blocking_delete_error_message =''){
		$this->_joining_model_name = $joining_model_name;
		$this->_primary_cpt_field = $primary_cpt_field;
		parent::__construct($block_deletes, $blocking_delete_error_message);
	}
	/**
	 * Gets the joining model's object
	 * @return EEM_Base
	 */
	function get_join_model(){
		return $this->_get_model($this->_joining_model_name);
	}


	/**
	 * gets the primary_cpt_field property
	 * @return string
	 */
	public function get_primary_cpt_field_name() {
		return $this->_primary_cpt_field;
	}


	/**
	 * this returns the Field object for the _primary_cpt_field.
	 * @return EE_Model_Field
	 */
	public function get_primary_cpt_field_object() {
		return  $this->_get_model()->field_settings_for( $this->_primary_cpt_field );
	}


	/**
	 * Gets the SQL string for joining the main model's table containing the pk to the join table. Eg "LEFT JOIN real_join_table AS join_table_alias ON this_table_alias.pk = join_table_alias.fk_to_this_table"
	 * @return string of SQL
	 */
	function get_join_to_intermediate_model_statement(){
		//create sql like
		//LEFT JOIN join_table AS join_table_alias ON this_table_alias.this_table_pk = join_table_alias.join_table_fk_to_this
		//LEFT JOIN other_table AS other_table_alias ON join_table_alias.join_table_fk_to_other = other_table_alias.other_table_pk
		
		$this_table_pk_field = $this->get_this_model()->get_primary_key_field();//get_foreign_key_to($this->get_other_model()->get_this_model_name());
		$join_table_fk_field_to_this_table = $this->get_join_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		$this_table_alias = $this_table_pk_field->get_table_alias();
		
		$join_table_alias = $join_table_fk_field_to_this_table->get_table_alias();
		$join_table = $this->get_join_model()->get_table_for_alias($join_table_alias);	
		
		//phew! ok, we have all the info we need, now we can create the SQL join string
		$SQL = $this->_left_join($join_table, $join_table_alias, $join_table_fk_field_to_this_table->get_table_column(), $this_table_alias, $this_table_pk_field->get_table_column()) . $this->get_join_model()->_construct_internal_join_to_table_with_alias($join_table_alias);
				
		return $SQL;
	}
	/**
	 * Gets the SQL string for joining the join table to the other model's pk's table. Eg "LEFT JOIN real_other_table AS other_table_alias ON join_table_alias.fk_to_other_table = other_table_alias.pk"
	 * If you want to join between modelA -> joinModelAB -> modelB (eg, Event -> Event_Question_Group -> Question_Group),
	 * you shoudl prepend the result of this function with results from get_join_to_intermediate_model_statement(),
	 * so that you join first to the intermediate join table, and then to the other model's pk's table
	 * @return string of SQL
	 */
	function get_join_statement(){
		$join_table_fk_field_to_this_table = $this->get_join_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		$join_table_alias = $join_table_fk_field_to_this_table->get_table_alias();
		
		$other_table_pk_field = $this->get_other_model()->get_primary_key_field();
		$join_table_fk_field_to_other_table = $this->get_join_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		$other_table_alias = $other_table_pk_field->get_table_alias();
		$other_table = $this->get_other_model()->get_table_for_alias($other_table_alias);
		
		$SQL = $this->_left_join($other_table, $other_table_alias, $other_table_pk_field->get_table_column(), $join_table_alias, $join_table_fk_field_to_other_table->get_table_column()) . $this->get_other_model()->_construct_internal_join_to_table_with_alias($other_table_alias);
		return $SQL;
	}
	
	/**
	 * Ensures there is an entry in the join table between these two models. Feel free to do this manually if you like.
	 * If the join table has additional columns (eg, the Event_Question_Group table has a is_primary column), then you'll
	 * want to directly use the EEM_Event_Question_Group model to add the entry to the table and set those extra columns' values
	 * @param EE_Base_Class/int $this_obj_or_id
	 * @param EE_Base_Class/int $other_obj_or_id
	 * @return EE_Base_Class
	 */
	 function add_relation_to($this_obj_or_id, $other_obj_or_id ){
		 $this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		//check if such a relationship already exists
		 $join_model_fk_to_this_model = $this->get_join_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		 $join_model_fk_to_other_model = $this->get_join_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		 $query_params = array(
			 array(
				 $join_model_fk_to_this_model->get_name() => $this_model_obj->ID(),
				 $join_model_fk_to_other_model->get_name() => $other_model_obj->ID()));
		 $existing_entry_in_join_table = $this->get_join_model()->get_one($query_params);
		//if there is already an entry in the join table, indicating a relationship, we're done
		 //again, if you want more sophisticated logic or insertions (handling more columns than just 2 foreign keys to
		 //the other tables, use the joining model directly!
		 if( ! $existing_entry_in_join_table ){
			$this->get_join_model()->insert(
					array(
						$join_model_fk_to_this_model->get_name() => $this_model_obj->ID(),
						$join_model_fk_to_other_model->get_name() => $other_model_obj->ID()
					));
		}
		return $other_model_obj;
	 }
	/**
	 * Deletes any rows in the join table that have foreign keys matching the other model objects specified
	 * @param EE_Base_Class/int $this_obj_or_id
	 * @param EE_Base_Class/int $other_obj_or_id
	 * @return void
	 */
	 function remove_relation_to($this_obj_or_id, $other_obj_or_id){
		  $this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		//check if such a relationship already exists
		 $join_model_fk_to_this_model = $this->get_join_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		 $join_model_fk_to_other_model = $this->get_join_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		 $existing_entry_in_join_table = $this->get_join_model()->delete(array(
			 array(
				 $join_model_fk_to_this_model->get_name() => $this_model_obj->ID(),
				 $join_model_fk_to_other_model->get_name() => $other_model_obj->ID())));
		
	 }
}
