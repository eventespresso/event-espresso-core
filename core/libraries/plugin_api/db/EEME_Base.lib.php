<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EEME_Base
 * For magically adding fields, relations, and functions onto existing models.
 * example child class: adds a class called EEME_Sample_Attendee which adds an extra table for
 * meta info that we want to use for frequent querying (otherwise we could just use the extra meta features),
 * and adds a field named 'ATT_foobar' on the Attendee model,
 * which is actually a foreign key to transactions, and
 * a relation to transactions, and a function called new_func() onto EEM_Attendee which
 * gets all attendees which have a direct relation to the specified transaction.
 * For example,
 *
 * class EEME_Sample_Attendee extends EEME_Base{
	function __construct() {
		$this->_model_name_extended = 'Attendee';
		$this->_extra_tables = array(
			'Mock_Attendee_Meta' => new EE_Secondary_Table('esp_mock_attendee_meta', 'MATTM_ID', 'ATT_ID' )
		);
		$this->_extra_fields = array('Mock_Attendee_Meta'=>array(
			'MATTM_ID'=> new EE_DB_Only_Int_Field('MATTM_ID', __('Mock Attendee Meta Row ID','event_espresso'), false),
			'MATT_ID_fk'=>new EE_DB_Only_Int_Field('ATT_ID', __("Foreign Key to Attendee in Post Table", "event_espresso"), false),
			'ATT_foobar'=>new EE_Foreign_Key_Int_Field('ATT_foobar', __("Foobar", 'event_espresso'), true,0,'Transaction')));
		$this->_extra_relations = array('Transaction'=>new EE_Belongs_To_Relation());
		parent::__construct();
	}
	function ext_new_func($arg1){
		return $this->_->get_all(array(array('Transaction.TXN_ID'=>$arg1)));
	}
}
 *
 * example usage: early you need to simply construct this extension, and it will automatically
 * add any of its needed hooks. Like so: new EEME_Sample_Attendee();
 * then you can use that field, relation, and function on the EEM_Attendee singleton. Eg.
 * $attendees_directly_related_to_txn_1 = EEM_Attendee::instance()->new_func(1);
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
abstract class EEME_Base {

	const extending_method_prefix = 'ext_';
	const dynamic_callback_method_prefix = 'dynamic_callback_method_';

	protected $_extra_tables = array();
	protected $_extra_fields = array();
	protected $_extra_relations = array();

	/**
	 * The model name that is extended (not classname)
	 * @var string
	 */
	protected $_model_name_extended = NULL;

	/**
	 * The model this extends
	 * @var EEM_Base
	 */
	protected $_ = NULL;



	/**
	 * @throws \EE_Error
	 */
	public function __construct(){
		if( ! $this->_model_name_extended){
            throw new EE_Error(
                __( "When declaring a model extension, you must define its _model_name_extended property. It should be a model name like 'Attendee' or 'Event'",
                "event_espresso" )
            );
		}
		$construct_end_action = 'AHEE__EEM_'.$this->_model_name_extended.'__construct__end';
		if ( did_action( $construct_end_action )) {
			throw new EE_Error(
				sprintf(
					__( "Hooked in model extension '%s' too late! The model %s has already been used! We know because the action %s has been fired", "event_espresso"),
					get_class($this),
					$this->_model_name_extended,
					$construct_end_action
				)
			);
		}
		add_filter('FHEE__EEM_'.$this->_model_name_extended.'__construct__tables',array($this,'add_extra_tables_on_filter'));
		add_filter('FHEE__EEM_'.$this->_model_name_extended.'__construct__fields',array($this,'add_extra_fields_on_filter'));
		add_filter('FHEE__EEM_'.$this->_model_name_extended.'__construct__model_relations',array($this,'add_extra_relations_on_filter'));
		$this->_register_extending_methods();
	}



    /**
     * @param array $existing_tables
     * @return array
     */
    public function add_extra_tables_on_filter( $existing_tables ){
        return array_merge( (array)$existing_tables, $this->_extra_tables );
	}



    /**
     * @param array $existing_fields
     * @return array
     */
    public function add_extra_fields_on_filter( $existing_fields ){
		if( $this->_extra_fields){
			foreach($this->_extra_fields as $table_alias => $fields){
				if( ! isset( $existing_fields[ $table_alias ] ) ){
					$existing_fields[ $table_alias ] = array();
				}
				$existing_fields[$table_alias] = array_merge(
                    (array)$existing_fields[$table_alias],
                    $this->_extra_fields[$table_alias]
                );

			}
		}
		return $existing_fields;
	}



    /**
     * @param array $existing_relations
     * @return array
     */
    public function add_extra_relations_on_filter( $existing_relations ){
        return  array_merge((array)$existing_relations,$this->_extra_relations);
	}



	/**
	 * scans the child of EEME_Base for functions starting with ext_, and magically makes them functions on the
	 * model extended. (Internally uses filters, and the __call magic method)
	 */
	protected function _register_extending_methods(){
		$all_methods = get_class_methods(get_class($this));
		foreach($all_methods as $method_name){
			if(strpos($method_name, self::extending_method_prefix) === 0){
				$method_name_on_model = str_replace(self::extending_method_prefix, '', $method_name);
				$callback_name = "FHEE__EEM_{$this->_model_name_extended}__$method_name_on_model";
				add_filter($callback_name,array($this,self::dynamic_callback_method_prefix.$method_name_on_model),10,10);
			}
		}
	}

	/**
	 * scans the child of EEME_Base for functions starting with ext_, and magically REMOVES them as functions on the
	 * model extended. (Internally uses filters, and the __call magic method)
	 */
	public function deregister(){
		remove_filter('FHEE__EEM_'.$this->_model_name_extended.'__construct__tables',array($this,'add_extra_tables_on_filter'));
		remove_filter('FHEE__EEM_'.$this->_model_name_extended.'__construct__fields',array($this,'add_extra_fields_on_filter'));
		remove_filter('FHEE__EEM_'.$this->_model_name_extended.'__construct__model_relations',array($this,'add_extra_relations_on_filter'));
		$all_methods = get_class_methods(get_class($this));
		foreach($all_methods as $method_name){
			if(strpos($method_name, self::extending_method_prefix) === 0){
				$method_name_on_model = str_replace(self::extending_method_prefix, '', $method_name);
				$callback_name = "FHEE__EEM_{$this->_model_name_extended}__$method_name_on_model";
				remove_filter($callback_name,array($this,self::dynamic_callback_method_prefix.$method_name_on_model),10);
			}
		}
        /** @var EEM_Base $model_to_reset */
        $model_to_reset = 'EEM_' . $this->_model_name_extended;
		if ( class_exists( $model_to_reset ) ) {
			$model_to_reset::reset();
		}
	}



    /**
     * @param string $callback_method_name
     * @param array  $args
     * @return mixed
     * @throws EE_Error
     */
    public function __call( $callback_method_name, $args){
		if(strpos($callback_method_name, self::dynamic_callback_method_prefix) === 0){
			//it's a dynamic callback for a method name
			$method_called_on_model = str_replace(self::dynamic_callback_method_prefix, '', $callback_method_name);
			list( $original_return_val, $model_called, $args_provided_to_method_on_model ) = (array) $args;
			$this->_ = $model_called;
			$extending_method = self::extending_method_prefix.$method_called_on_model;
			if(method_exists($this, $extending_method)){
				return call_user_func_array(array($this,$extending_method), $args_provided_to_method_on_model);
			}else{
				throw new EE_Error(
				    sprintf(
				        __("An odd error occurred. Model '%s' had a method called on it that it didn't recognize. So it passed it onto the model extension '%s' (because it had a function named '%s' which should be able to handle it), but the function '%s' doesnt exist!)", "event_espresso"),
                        $this->_model_name_extended,
                        get_class($this),
                        $extending_method,$extending_method
                    )
                );
			}

		}else{
			throw new EE_Error(
			    sprintf(
			        __("There is no method named '%s' on '%s'", "event_espresso"),
                    $callback_method_name,
                    get_class($this)
                )
            );
		}
	}

}
// End of file EEME_Base.model.php