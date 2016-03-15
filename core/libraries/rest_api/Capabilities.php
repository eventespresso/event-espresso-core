<?php
namespace EventEspresso\core\libraries\rest_api;
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * Capabilities
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class Capabilities {

	/**
	 * The current user can see at least SOME of these entities.
	 * @param \EEM_Base $model
	 * @param string $model_context one of the return values from EEM_Base::valid_cap_contexts()
	 * @return boolean
	 */
	public static function current_user_has_partial_access_to( $model, $model_context = \EEM_Base::caps_read ) {
		if( apply_filters( 'FHEE__Capabilities__current_user_has_partial_access_to__override_begin', false, $model, $model ) ) {
			return true;
		}
		foreach( $model->caps_missing( $model_context ) as $capability_name => $restriction_obj ) {
			if( $restriction_obj instanceof \EE_Return_None_Where_Conditions ){
				return false;
			}
		}
		if( apply_filters( 'FHEE__Capabilities__current_user_has_partial_access_to__override_end', false, $model, $model ) ) {
			return false;
		}
		return true;
	}
	/**
	 * Gets an array of all the capabilities the current user is missing that affected
	 * the query
	 *
	 * @param \EEM_Base $model
	 * @param string $request_type one of the constants on WP_JSON_Server
	 * @return array
	 */
	public static function get_missing_permissions( $model, $request_type = \EEM_Base::caps_read ) {
		return $model->caps_missing( $request_type );
	}
	/**
	 * Gets a string of all the capabilities the current user is missing that affected
	 * the query
	 *
	 * @param \EEM_Base $model
	 * @param string $model_context one of the return values from EEM_Base::valid_cap_contexts()
	 * @return string
	 */
	public static function get_missing_permissions_string( $model, $model_context = \EEM_Base::caps_read ) {
		return implode(',', array_keys( self::get_missing_permissions( $model, $model_context ) ) );
	}

	/**
	 * Takes a entity that's ready to be returned and removes fields which the user shouldn't be able to access.
	 * @param array $entity
	 * @param \EEM_Base $model
	 * @param string $request_type one of the return values from EEM_Base::valid_cap_contexts()
	 * @param Model_Version_Info $model_version_info
	 * @return array ready for converting into json
	 */
	public static function filter_out_inaccessible_entity_fields( $entity,  $model, $request_type, $model_version_info ) {
		//we only care to do this for frontend reads and when the user can't edit the item
		if(  $request_type !== \EEM_Base::caps_read ||
				$model->exists( array(
					array( $model->primary_key_name() => $entity[ $model->primary_key_name() ] ),
					'default_where_conditions' => 'none',
					'caps' => \EEM_Base::caps_edit ) ) ) {
			return $entity;
		}
		foreach( $model->field_settings() as $field_name => $field_obj ){
			if( $model_version_info->field_has_rendered_format( $field_obj )
			    && isset( $entity[ $field_name ] )
				&& is_array( $entity[ $field_name ] )
				&& isset( $entity[ $field_name ][ 'raw' ] )
			) {
				unset( $entity[ $field_name ][ 'raw' ] );
			}
		}
		//theoretically we may want to filter out specific fields for specific models

		return apply_filters( 'FHEE__Capabilities__filter_out_inaccessible_entity_fields', $entity, $model, $request_type );
	}
}

// End of file Capabilities.php