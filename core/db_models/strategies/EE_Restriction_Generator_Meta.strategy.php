<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Meta
 * Generates restrictions which make meta, except for whitelisted items, only readable
 * by admins
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Meta extends EE_Restriction_Generator_Base{

	/**
	 *
	 * @var string the name of the field containing the meta key
	 */
	protected $_key_field_name = null;
	
	/**
	 *
	 * @var string the name of the field containing the meta value
	 */
	protected $_value_field_name = null;

	/**
	 * Accepts the name of the field that indicates whether or not an object is a "system" one or not
	 * @param string $key_field_name
	 * @param string $value_field_name
	 */
	public function __construct( $key_field_name, $value_field_name ) {
		$this->_key_field_name = $key_field_name;
		$this->_value_field_name = $value_field_name;
	}


	/**
	 *
	 * @return \EE_Default_Where_Conditions
	 * @throws EE_Error
	 */
	protected function _generate_restrictions() {
		$whitelisted_meta_keys = apply_filters( 'FHEE__EE_Restriction_Generator_Meta___generate_restrictions__whitelisted_meta_keys', array() );
		$blacklisted_meta_keys = apply_filters( 'FHEE__EE_Restriction_Generator_Meta___generate_restrictions__blacklisted_meta_keys', array() );
		$conditions = array(
			$this->_key_field_name => array( 'NOT_LIKE', "\\\\_%" ),//each slash is escaped because we are using double quotes, and 
			//stripslashes will be called on this because the models assume this is from user input
			$this->_value_field_name => array( 'NOT_REGEXP', '^[aOs]:[\d]:.*$')					
		);
		if( ! empty( $blacklisted_meta_keys ) ) {
			$conditions[ $this->_key_field_name . '*blacklisted' ] = array( 'NOT_IN', $blacklisted_meta_keys );
		}
		if( ! empty( $whitelisted_meta_keys ) ) {
			$conditions = array(
				'OR*whitelisted-or-normal' => array(
					'AND' => $conditions,
					$this->_key_field_name . '*whitelisted' => array( 'IN', $whitelisted_meta_keys ) 
				)
			);
		}
		return array(
			//only allow access to non-protected metas if they're an admin
			EE_Restriction_Generator_Base::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions(),
			//don't allow access to protected metas to anyone. If they want that, don't apply caps to the query
			'apply-to-all-queries-using-caps' => new EE_Default_Where_Conditions( $conditions ),
		);
	}
}

// End of file EE_Restriction_Generator_Protected.strategy.php