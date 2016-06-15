<?php
namespace EventEspresso\core\services\container;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Interface CoffeePotInterface
 * for Event Espresso compatible Dependency Injection containers
 *
 * @package EventEspresso\core\services\container
 */
interface CoffeePotInterface extends ContainerInterface
{



    /**
     * returns an instance of the requested entity type using the supplied arguments.
     * If a shared service is requested and an instance is already in the carafe, then it will be returned.
     * If it is not already in the carafe, then the service will be constructed, added to the carafe, and returned
     * If the request is for a new entity and a closure exists in the reservoir for creating it,
     * then a new entity will be instantiated from the closure and returned.
     * If a closure does not exist, then one will be built and added to the reservoir
     * before instantiating the requested entity.
     *
     * @param  string $identifier Identifier for the entity class to be constructed.
     *                            Typically a Fully Qualified Class Name
     * @param array   $arguments  an array of arguments to be passed to the entity constructor
     * @param string  $type
     * @return mixed
     */
    public function brew($identifier, $arguments = array(), $type = '');



    /**
     * @param string   $identifier
     * @param callable $closure
     */
    public function addClosure($identifier, $closure);



    /**
     * @param string $identifier
     * @param mixed  $service
     * @return boolean
     */
    public function addService($identifier, $service);



    /**
     * Adds instructions on how to brew objects
     *
     * @param RecipeInterface $recipe
     * @return mixed
     */
    public function addRecipe(RecipeInterface $recipe);



    /**
     * Get instructions on how to brew objects
     *
     * @param string $identifier
     * @return Recipe
     */
    public function getRecipe($identifier);



    /**
     * adds class name aliases to list of filters
     *
     * @param  string $identifier
     * @param  array  $aliases
     * @return string
     */
    public function addAliases($identifier, $aliases);



}
// End of file CoffeePotInterface.php
// Location: /CoffeePotInterface.php