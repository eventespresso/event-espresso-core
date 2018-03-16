<?php
namespace EventEspresso\core\services\container;

use EventEspresso\core\exceptions\InvalidClassException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class LoadOnlyCoffeeMaker
 * Sometimes we only need to load a file that contains
 * a class that another class depends on.
 * Examples are abstract parent classes, interfaces, etc.
 * and we don't and/or can not actually instantiate
 * anything for these classes anyways.
 * This CoffeeMaker doesn't do anything other
 * than ensure the class files are loaded.
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class LoadOnlyCoffeeMaker extends CoffeeMaker
{

    /**
     * @return string
     */
    public function type()
    {
        return CoffeeMaker::BREW_LOAD_ONLY;
    }



    /**
     * @param RecipeInterface $recipe
     * @param array           $arguments
     * @return mixed
     * @throws InvalidClassException
     */
    public function brew(RecipeInterface $recipe, $arguments = array())
    {
        return $this->resolveClassAndFilepath($recipe);
    }



}
// End of file LoadOnlyCoffeeMaker.php
// Location: /LoadOnlyCoffeeMaker.php