<?php
namespace EventEspresso\core\services\container;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Interface CoffeeMakerInterface
 * for CoffeeMaker classes which are responsible
 * for building objects that are requested from the CoffeeShop
 *
 * @package EventEspresso\core\services\container
 */
interface CoffeeMakerInterface
{

    /**
     * @return array
     */
    public static function getTypes();



    /**
     * @param $type
     */
    public static function validateType($type);



    /**
     * @param RecipeInterface $recipe
     * @param array           $arguments
     * @return mixed
     */
    public function brew(RecipeInterface $recipe, $arguments = array());



    /**
     * @return string
     */
    public function type();

}
// End of file CoffeeMakerInterface.php
// Location: /CoffeeMakerInterface.php