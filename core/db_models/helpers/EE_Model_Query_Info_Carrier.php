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
    * @var array stating all the models that have been included thus far,so we don't get duplicates.
    * Keys are the model relation chains to them from the queried model
    * (eg, "Registration.Transaction.Payment"), and valuesare model names (eg "Payment")
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
   public function __construct($model_included_name= array(), $join_sql = ''){
	   $this->_models_included = $model_included_name;
	   $this->_join_sql = $join_sql;
   }
   
   /**
    * Merges info from the other EEM_Related_Model_Info_Carrier into this one.
    * @param EE_Model_Query_Info_Carrier $other_model_query_info_carrier
    */
   public function merge( $other_model_query_info_carrier ){
	   if( $other_model_query_info_carrier && ! $this->_have_already_included_one_of_these_models($other_model_query_info_carrier->get_model_names_included())){
			$model_included_on_other_join_sql_and_data_types_carrier =  $other_model_query_info_carrier->get_model_names_included();
			$this->_models_included = array_merge( $this->_models_included, $model_included_on_other_join_sql_and_data_types_carrier );
			$this->_join_sql .= $other_model_query_info_carrier->_join_sql;
	   }
	   //otherwise don't merge our data.
	   //yes, this means that we must immediately merge any model data into our grand list
	   //as soon as we get some from ONE model, or else we could reject a EEM_Related_Model_Info_Carrier
	   //which is carrying info from two models WHERE one is already included but the other is NOT
	  
   }
   /**
    * Checks whether or not we have already included all the models mentione din $model_names on the query info varrier
    * @param array $model_names just like EE_MOdel_QUery_Info_Carrier::_models_included: keys are model chain paths, values are the model names only
    * @return boolean
    */
   protected function  _have_already_included_one_of_these_models($model_names){
	   foreach($this->_models_included as $model_relation_path=>$model_included){
		   if(array_key_exists($model_relation_path, $model_names)){
			   return true;
		   }
	   }
	   return false;
   }
   /**
    * Array keys are model names, values are "model relation paths". See EE_Model_Query_Info_Carrier::_models_included for details
    * @return array like EE_Model_Query_Info_Carrier::_models_included
    */
   public function get_model_names_included(){
	   return $this->_models_included;
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

   /**
    * Gets the SQL for joining the main model to other models involves in the query, which was set earlier on
    * the EE_Model_Query_info_Carrier by calling set_main_model_join_sql()
    * @return string
    */
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