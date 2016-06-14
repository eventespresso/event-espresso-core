<?php
namespace EventEspresso\core\services\container;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface CoffeeMakerInterface
 *
 * @package EventEspresso\core\services\container
 */
interface CoffeeMakerInterface {

	/**
	 * @param Recipe    $recipe
	 * @param array     $arguments
	 * @return mixed
	 */
	public function brew( Recipe $recipe, $arguments = array() );

	/**
	 * @return string
	 */
	public function type();

}
// End of file CoffeeMakerInterface.php
// Location: /CoffeeMakerInterface.php