<?php
/**
 * This file contains the EE_Register_CPT class that implements EEI_Plugin_API
 * @package      Event Espresso
 * @subpackage plugin api, custom post type, custom taxonomy
 * @since           4.5.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * Use this to register or deregister a new custom post type or custom taxonomy for the EE CPT system.
 *
 * @package        Event Espresso
 * @subpackage  plugin api, custom post type, custom taxonomy
 * @since            4.5.0
 * @author          Darren Ethier
 */
class EE_Register_CPT implements EEI_Plugin_API {

	/**
	 * Holds values for registered variations
	 *
	 * @since 4.5.0
	 *
	 * @var array
	 */
	protected static $_registry = array();



	/**
	 * Used to register new CPTs and Taxonomies.
	 *
	 * @param string $cpt_ref        reference used for the addon registering cpts and cts
	 * @param array  $setup_args {
	 *                           An array of required values for registering the cpts and taxonomies
	 *                           @type array $cpts {
	 *                                 An array of cpts and their arguments.(short example below)
	 *                                 @see EE_Register_CPTs.core.php get_CPTs() for a more complete example.
	 *                                 'people' => array(
	 *                                 		'singular_name' => __('People', 'event_espresso'),
	 *                                 		'plural_name' => __('People', 'event_espresso'),
	 *                                 		'singular_slug' => __('people', 'event_espresso'),
	 *                                 		'plural_slug' => __('peoples', 'event_espresso'),
	 *                                 		'class_name' => 'EE_People'
	 *                                 		)
	 *                           },
	 *                           @type array $cts {
	 *                                 An array of custom taxonomies and their arguments (short example below).
	 *                                 @see EE_Register_CPTs.core.php get_taxonomies() for a more complete example.
	 *                                 'espresso_people_type' => array(
	 *                                 		'singular_name' => __('People Type', 'event_espresso'),
	 *                                 		'plural_name' => __('People Types', 'event_espresso'),
	 *                                 		'args' => array()
	 *                                 )
	 *                           },
	 *                           @type array $default_terms {
	 *                                 An array of terms to set as the default for a given taxonomy and the custom post types
	 *                                 applied to.
	 *                                 'taxonomy_name' => array(
	 *                                 		'term' => array( 'cpt_a_name', 'cpt_b_name' )
	 *                                 )
	 *                           }
	 * }
	 *
	 * @throws  EE_Error
	 * @return void
	 */
	public static function register( $cpt_ref = NULL, $setup_args = array() ) {

		//check for requred params
		if ( empty( $cpt_ref ) ) {
			throw new EE_Error(
				__('In order to register custom post types and custom taxonomies, you must include a value to reference what had been registered', 'event_espresso' )
				);
		}

		if ( ! is_array( $setup_args ) || ( empty( $setup_args['cpts'] ) && empty( $setup_args['cts'] ) ) ) {
			throw new EE_Error(
				__( 'In order to register custom post types or custom taxonomies, you must include an array containing either an array of custom post types to register (key "cpts"), an array of custom taxonomies ("cts") or both.', 'event_espresso' )
				);
		}

		//make sure we don't register twice
		if( isset( self::$_registry[ $cpt_ref ] ) ){
			return;
		}

		//make sure cpt ref is unique.
		if ( isset( self::$_registry[$cpt_ref] ) ) {
			$cpt_ref = uniqid() . '_' . $cpt_ref;
		}

		//make sure this was called in the right place!
		if ( did_action( 'AHEE__EE_System__load_CPTs_and_session__complete' ) ) {
			EE_Error::doing_it_wrong(
				__METHOD__,
				sprintf(
					__('EE_Register_CPT has been called and given a reference of "%s".  It may or may not work because it should be called on or before "AHEE__EE_System__load_CPTs_and_session__complete" action hook.', 'event_espresso'),
					$cpt_ref
				),
				'4.5.0'
			);
		}

		//validate incoming args
		$validated = array(
			'cpts' => isset( $setup_args['cpts'] ) ? (array) $setup_args['cpts'] : array(),
			'cts' => isset( $setup_args['cts'] ) ? (array) $setup_args['cts'] : array(),
			'default_terms' => isset( $setup_args['default_terms'] ) ? (array) $setup_args['default_terms'] : array()
			);

		self::$_registry[$cpt_ref] = $validated;

		//hook into to cpt system
		add_filter( 'FHEE__EE_Register_CPTs__get_CPTs__cpts', array( __CLASS__, 'filter_cpts' ), 5 );
		add_filter( 'FHEE__EE_Register_CPTs__get_taxonomies__taxonomies', array( __CLASS__, 'filter_cts' ), 5 );
		add_action( 'AHEE__EE_Register_CPTs__construct_end', array( __CLASS__, 'default_terms'), 5 );
	}




	/**
	 * Callback for FHEE__EE_Register_CPTs__get_CPTs__cpts that adds additional custom post types to be
	 * registered.
	 *
	 * @param array $cpts array of cpts that are already set
	 *
	 * @return array new array of cpts and their registration information
	 */
	public static function filter_cpts( $cpts ) {
		foreach( self::$_registry as  $registries ) {
			foreach ( $registries['cpts'] as $cpt_name => $cpt_settings ) {
				$cpts[$cpt_name] = $cpt_settings;
			}
		}
		return $cpts;
	}



	/**
	 * Callback for FHEE__EE_Register_CPTs__get_taxonomies__taxonomies that adds additional custom
	 * taxonomies to be registered.
	 *
	 * @param array $cts array of cts that are already set.
	 *
	 * @return array new array of cts and their registration information.
	 */
	public static function filter_cts( $cts ) {
		foreach( self::$_registry as $registries ) {
			foreach( $registries['cts'] as $ct_name => $ct_settings ) {
				$cts[$ct_name] = $ct_settings;
			}
		}
		return $cts;
	}




	/**
	 * Callback for AHEE__EE_Register_CPTs__construct_end which is used to set the default terms
	 *
	 * @param EE_Register_CPTs $cpt_class
	 *
	 * @return void
	 */
	public static function default_terms( EE_Register_CPTs $cpt_class ) {
		foreach( self::$_registry as $registries ) {
			foreach( $registries['default_terms'] as $taxonomy => $terms ) {
				foreach ( $terms as $term => $cpts ) {
					$cpt_class->set_default_term( $taxonomy, $term, $cpts );
				}
			}
		}
	}



	/**
	 * This deregisters whats been registered on this class (for the given slug).
	 *
	 * @since 4.5.0
	 *
	 * @param string $cpt_ref The reference for the item registered to be removed.
	 *
	 * @return void
	 */
	public static function deregister( $cpt_ref = null ) {
		if ( !empty( self::$_registry[$cpt_ref] ) ) {
			unset( self::$_registry[$cpt_ref] );
		}
	}
} //end class EE_Register_CPT
