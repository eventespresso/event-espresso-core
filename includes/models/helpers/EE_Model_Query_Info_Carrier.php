<?php


/**
* Internal class for simply carrying data during the EEMerimental_Base::_extract_related_model_info_from_query_param method.
 * We want to temporarily store the information gathered (between method calls only) because that information is sometimes
 * used in different orders, or sometimes not used at all. Eg, we don't know what joins to perform (at the beginning of the query) until we've parsed the where and having
 * conditions (at the end of the query).
* We could have returned an array
* with two keys 'join_sql' and 'data_types', but this better-defines the data being passed around
*/
class EE_Model_Query_Info_Carrier extends EE_Base{
   /**
	* @var string SQL for performing joins (Eg, "INNER JOIN blah ON blah=blah INNER JOIN FOO ON foo=foo...")
	*/
   private $_join_sql;
   /**
	*
	* @var array an array of data types like returned from EEMerimental_Base::_get_data_types() 
	*/
   private  $_data_types;
   /**
    *
    * @var array numerically-indexed array stating all the models that have been included thus far,so we don't get duplicates
    */
   private $_models_included;
   /**
    * After we've acquired all the data types, we can create this sql.
    * @var string 
    */
   private $_where_sql;
   /**
    * Full join sql. Eg, in a select query, that's everything after the "FROM", and before the "WHERE", so it includes
    * the declaration of the main model's tables, and then appends all the joining sql to other models
    * @var string 
    */
   private $_main_join_sql;
   
   
   private $_limit_sql;
   
   private $_order_by_sql;
   
   private $_having_sql;
   
   private $_group_by_sql;
   
   function set_limit_sql($limit_sql){
	   $this->_limit_sql = $limit_sql;
	}
	
	function set_order_by_sql($order_by_sql){
		$this->_order_by_sql = $order_by_sql;
	}
	function set_group_by_sql($group_by_sql){
		$this->_group_by_sql = $group_by_sql;
	}
	function set_having_sql($having_sql){
		$this->_having_sql = $having_sql;
	}
	function get_limit_sql(){
		return $this->_limit_sql;
	}
	function get_order_by_sql(){
		return $this->_order_by_sql;
	}
	function get_group_by_sql(){
		return $this->_group_by_sql;
	}
	function get_having_sql(){
		return $this->_having_sql;
	}
   /**
    * 
    * @param type $model_included_name
    * @param type $join_sql
    * @param type $data_types
    */
   public function __construct($model_included_name= array(), $join_sql = '', $data_types =array()){
	   $this->_models_included = $model_included_name;
	   $this->_join_sql = $join_sql;
	   $this->_data_types = $data_types;
   }
   
   /**
    * Merges info from the other EEM_Related_Model_Info_Carrier into this one.
    * @param EE_Model_Query_Info_Carrier $other_join_sql_and_data_types_carrier
    */
   public function merge( $other_join_sql_and_data_types_carrier ){
	   if( $other_join_sql_and_data_types_carrier && ! $this->_have_already_included_one_of_these_models($other_join_sql_and_data_types_carrier->get_model_names_included())){
		   $model_included_on_other_join_sql_and_data_types_carrier =  $other_join_sql_and_data_types_carrier->get_model_names_included();
		   $this->_models_included = array_merge( $this->_models_included, $model_included_on_other_join_sql_and_data_types_carrier );
			$this->_join_sql .= $other_join_sql_and_data_types_carrier->_join_sql;
			$this->_data_types = $this->_data_types + $other_join_sql_and_data_types_carrier->get_data_types();
	   }
	   //otherwise don't merge our data.
	   //yes, this means that we must immediately merge any model data into our grand list
	   //as soon as we get some from ONE model, or else we could reject a EEM_Related_Model_Info_Carrier
	   //which is carrying info from two models WHERE one is already included but the other is NOT
	  
   }
   protected function  _have_already_included_one_of_these_models($model_names){
	   foreach($this->_models_included as $model_included){
		   if(in_array($model_included, $model_names)){
			   return true;
		   }
	   }
	   return false;
   }
   
   protected function get_first_model_name_included(){
	   return array_shift($this->_models_included);
   }
   public function get_model_names_included(){
	   return $this->_models_included;
   }
   public function get_data_types(){
	   return $this->_data_types;
   }
   /**
    * sets the $where_sql for later use from client code
    * @param string $where_sql
    */
   public function set_where_sql($where_sql){
	   $this->_where_sql = $where_sql;
   }
   public function get_where_sql(){
	   return $this->_where_sql;
   }

  public function get_main_model_join_sql() {
    return $this->_main_join_sql;
  }


   /**
    * Prepends the main model join sql onto the already-added other-model-join-sql,
    * to make the full join sql statement (in a select, that's everything after the FROM and before
    * the WHERE. In an update that's everything after the UPDATE and before the SET. In a delete, that's
    * after the FROM and before the WHERE.)
    * @param string $join_sql
    */
   public function set_main_model_join_sql($join_sql){
	   $this->_main_join_sql = $join_sql;
   }
   public function get_full_join_sql(){
	   return $this->_main_join_sql . $this->_join_sql;
   }
}