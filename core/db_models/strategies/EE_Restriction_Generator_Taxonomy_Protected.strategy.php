<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Public
 * Generates cap restrictions array that essentially makes this model controlled by
 * the 'manage_event/venue_categories' permissions
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Taxonomy_Protected extends EE_Restriction_Generator_Base{

	/**
	 * Model chain/path to taxonomy model, including the term_taxonomy model itself
	 * @var string
	 */
	protected $_path_to_taxonomy_model;
	/**
	 *
	 * @param string $path_to_taxonomy_model Model chain/path to taxonomy model, including the term_taxonomy model itself
	 */
	public function __construct( $path_to_taxonomy_model ){
		if( $path_to_taxonomy_model !== '' && substr( $path_to_taxonomy_model, -1, 1 ) != '.' ) {
			$path_to_taxonomy_model .= '.';
		}
		$this->_path_to_taxonomy_model = $path_to_taxonomy_model;
	}
	protected function _generate_restrictions() {
		//if there are no standard caps for this model, then for allow full access
		if( ! $this->model()->cap_slug() ) {
			return array(
			);
		}

		return array(
			'ee_manage_event_categories' => new EE_Default_Where_Conditions( array(
				$this->_path_to_taxonomy_model . 'taxonomy*no_ee_manage_event_categories' => array( '!=', 'espresso_event_categories' )
			)),
			'ee_manage_venue_categories' => new EE_Default_Where_Conditions( array(
				$this->_path_to_taxonomy_model . 'taxonomy*no_ee_manage_venue_categories' => array( '!=', 'espresso_venue_categories' )
			)),
			'ee_manage_event_types' => new EE_Default_Where_Conditions( array(
				$this->_path_to_taxonomy_model . 'taxonomy*ee_manage_event_types' => array( '!=', 'espresso_event_types' )
			)),
		);
	}
}

// End of file EE_Restriction_Generator_Public.strategy.php