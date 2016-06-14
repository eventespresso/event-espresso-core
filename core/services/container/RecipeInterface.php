<?php
namespace EventEspresso\core\services\container;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface RecipeInterface
 *
 * @package EventEspresso\core\services\container
 */
interface RecipeInterface
{
	
	/**
	 * @return string
	 */
	public function identifier();

	/**
	 * @return string
	 */
	public function fqcn();

	/**
	 * @return array
	 */
	public function filters();

	/**
	 * @return string
	 */
	public function type();

	/**
	 * @return array
	 */
	public function paths();

	/**
	 * @param string $identifier
	 */
	public function setIdentifier( $identifier );

	/**
	 * @param string $fqcn
	 */
	public function setFqcn( $fqcn );

	/**
	 * @param array $filters
	 */
	public function setFilters( array $filters );

	/**
	 * @param string $type
	 */
	public function setType( $type = CoffeeMaker::BREW_NEW );

	/**
	 * @param string|array $paths
	 */
	public function setPaths( $paths = array() );

}
// End of file RecipeInterface.php
// Location: /RecipeInterface.php