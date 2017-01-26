<?php
namespace EventEspresso\core\services\container;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Interface InjectorInterface
 * for classes that recursively resolve and inject dependencies
 * into the arguments array passed to a class upon instantiation.
 *
 * @package EventEspresso\core\services\container
 */
interface InjectorInterface
{

    /**
     * getReflectionClass
     * checks if a ReflectionClass object has already been generated for a class
     * and returns that instead of creating a new one
     *
     * @access public
     * @param string $class_name
     * @return \ReflectionClass
     */
    public function getReflectionClass($class_name);



    /**
     * resolveDependencies
     * examines the constructor for the requested class to determine
     * if any dependencies exist, and if they can be injected.
     * If so, then those classes will be added to the array of arguments passed to the constructor
     * PLZ NOTE: this is achieved by type hinting the constructor params
     * For example:
     *        if attempting to load a class "Foo" with the following constructor:
     *        __construct( Bar $bar_class, Fighter $grohl_class )
     *        then $bar_class and $grohl_class will be added to the $arguments array,
     *        but only IF they are NOT already present in the incoming arguments array,
     *        and the correct classes can be loaded
     *
     * @access public
     * @param \EventEspresso\core\services\container\RecipeInterface $recipe
     * @param \ReflectionClass                                       $reflector
     * @param array                                                  $arguments
     * @return array
     */
    public function resolveDependencies(RecipeInterface $recipe, \ReflectionClass $reflector, $arguments = array());

}
// End of file InjectorInterface.php
// Location: /InjectorInterface.php