<?php
namespace EventEspresso\core\services\container;

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\LooseCollection;
use EventEspresso\core\services\container\exceptions\InvalidServiceException;
use EventEspresso\core\services\container\exceptions\ServiceExistsException;
use EventEspresso\core\services\container\exceptions\ServiceNotFoundException;
use OutOfBoundsException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CoffeeShop
 * A Dependency Injection container
 *
 * @see     /docs/N--Core-Functionality/dependency-injection-coffeepot.md
 *          for extensive documentation and examples
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.9.1
 */
class CoffeeShop implements CoffeePotInterface
{


    /**
     * This was the best coffee related name I could think of to represent class name "aliases"
     * So classes can be found via an alias identifier,
     * that is revealed when it is run through... the filters... eh? get it?
     *
     * @var array $filters
     */
    private $filters = array();

    /**
     * These are the classes that will actually build the objects (to order of course)
     *
     * @var array $coffee_makers
     */
    private $coffee_makers = array();

    /**
     * where the instantiated "singleton" objects are stored
     *
     * @var CollectionInterface $carafe
     */
    private $carafe;

    /**
     * collection of Recipes that instruct us how to brew objects
     *
     * @var CollectionInterface $recipes
     */
    private $recipes;

    /**
     * collection of closures for brewing objects
     *
     * @var CollectionInterface $reservoir
     */
    private $reservoir;



    /**
     * CoffeeShop constructor
     */
    public function __construct()
    {
        // array for storing class aliases
        $this->filters = array();
        // create collection for storing shared services
        $this->carafe = new LooseCollection( '' );
        // create collection for storing recipes that tell how to build services and entities
        $this->recipes = new Collection('EventEspresso\core\services\container\RecipeInterface');
        // create collection for storing closures for constructing new entities
        $this->reservoir = new Collection('Closure');
        // create collection for storing the generators that build our services and entity closures
        $this->coffee_makers = new Collection('EventEspresso\core\services\container\CoffeeMakerInterface');
    }



    /**
     * Returns true if the container can return an entry for the given identifier.
     * Returns false otherwise.
     * `has($identifier)` returning true does not mean that `get($identifier)` will not throw an exception.
     * It does however mean that `get($identifier)` will not throw a `ServiceNotFoundException`.
     *
     * @param string $identifier  Identifier of the entry to look for.
     *                            Typically a Fully Qualified Class Name
     * @return boolean
     */
    public function has($identifier)
    {
        $identifier = $this->filterIdentifier($identifier);
        return $this->carafe->has($identifier);
    }



    /**
     * finds a previously brewed (SHARED) service and returns it
     *
     * @param  string $identifier Identifier for the entity class to be constructed.
     *                            Typically a Fully Qualified Class Name
     * @return mixed
     * @throws ServiceNotFoundException No service was found for this identifier.
     */
    public function get($identifier)
    {
        $identifier = $this->filterIdentifier($identifier);
        if ($this->carafe->has($identifier)) {
            return $this->carafe->get($identifier);
        }
        throw new ServiceNotFoundException($identifier);
    }



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
     * @throws ServiceNotFoundException No service was found for this identifier.
     */
    public function brew($identifier, $arguments = array(), $type = '')
    {
        // resolve any class aliases that may exist
        $identifier = $this->filterIdentifier($identifier);
        try {
            // is a shared service being requested?
            if (empty($type) || $type === CoffeeMaker::BREW_SHARED) {
                // if a shared service was requested and an instance is in the carafe, then return it
                return $this->get($identifier);
            }
        } catch (ServiceNotFoundException $e) {
            // if not then we'll just catch the ServiceNotFoundException but not do anything just yet,
            // and instead, attempt to build whatever was requested
        }
        $brewed = false;
        // if the reservoir doesn't have a closure already for the requested identifier,
        // then neither a shared service nor a closure for making entities has been built yet
        if ( ! $this->reservoir->has($identifier)) {
            // so let's brew something up and add it to the proper collection
            $brewed = $this->makeCoffee($identifier, $arguments, $type);
        }
        // was the brewed item a callable factory function ?
        if (is_callable($brewed)) {
            // then instantiate a new entity from the cached closure
            $entity = $brewed($arguments);
        } else if ($brewed) {
            // requested object was a shared entity, so attempt to get it from the carafe again
            // because if it wasn't there before, then it should have just been brewed and added,
            // but if it still isn't there, then this time
            // the thrown ServiceNotFoundException will not be caught
            $entity = $this->get($identifier);
        } else {
            // if identifier is for a non-shared entity,
            // then either a cached closure already existed, or was just brewed
            $closure = $this->reservoir->get($identifier);
            $entity = $closure($arguments);
        }
        return $entity;
    }



    /**
     * @param CoffeeMakerInterface $coffee_maker
     * @param string               $type
     * @return bool
     */
    public function addCoffeeMaker(CoffeeMakerInterface $coffee_maker, $type)
    {
        $type = CoffeeMaker::validateType($type);
        return $this->coffee_makers->add($coffee_maker, $type);
    }



    /**
     * @param string   $identifier
     * @param callable $closure
     * @return callable|null
     */
    public function addClosure($identifier, $closure)
    {
        if ( ! is_callable($closure)) {
            throw new InvalidDataTypeException('$closure', $closure, 'Closure');
        }
        $identifier = $this->processIdentifier($identifier);
        if ($this->reservoir->add($closure, $identifier)) {
            return $closure;
        }
        return null;
    }



    /**
     * @param string   $identifier
     * @return boolean
     */
    public function removeClosure($identifier)
    {
        $identifier = $this->processIdentifier($identifier);
        if ($this->reservoir->has($identifier)) {
            $this->reservoir->remove($this->reservoir->get($identifier));
            if ( ! $this->reservoir->has($identifier)) {
                return true;
            }
        }
        return false;
    }



    /**
     * @param  string $identifier Identifier for the entity class that the service applies to
     *                            Typically a Fully Qualified Class Name
     * @param mixed  $service
     * @return bool
     */
    public function addService($identifier, $service)
    {
        $identifier = $this->processIdentifier($identifier);
        $service = $this->validateService($identifier, $service);
        return $this->carafe->add($service, $identifier);
    }



    /**
     * @param string $identifier
     * @return boolean
     */
    public function removeService($identifier)
    {
        $identifier = $this->processIdentifier($identifier);
        if ($this->carafe->has($identifier)) {
            $this->carafe->remove($this->carafe->get($identifier));
            if ( ! $this->carafe->has($identifier)) {
                return true;
            }
        }
        return false;
    }



    /**
     * Adds instructions on how to brew objects
     *
     * @param RecipeInterface $recipe
     * @return mixed
     */
    public function addRecipe(RecipeInterface $recipe)
    {
        $this->addAliases($recipe->identifier(), $recipe->filters());
        $identifier = $this->processIdentifier($recipe->identifier());
        return $this->recipes->add($recipe, $identifier);
    }



    /**
     * @param string $identifier The Recipe's identifier
     * @return boolean
     */
    public function removeRecipe($identifier)
    {
        $identifier = $this->processIdentifier($identifier);
        if ($this->recipes->has($identifier)) {
            $this->recipes->remove(
                $this->recipes->get($identifier)
            );
            if ( ! $this->recipes->has($identifier)) {
                return true;
            }
        }
        return false;
    }



    /**
     * Get instructions on how to brew objects
     *
     * @param  string $identifier Identifier for the entity class that the recipe applies to
     *                            Typically a Fully Qualified Class Name
     * @param string $type
     * @return RecipeInterface
     */
    public function getRecipe($identifier, $type = '')
    {
        $identifier = $this->processIdentifier($identifier);
        if ($this->recipes->has($identifier)) {
            return $this->recipes->get($identifier);
        }
        $default_recipes = $this->getDefaultRecipes();
        $matches = array();
        foreach ($default_recipes as $wildcard => $default_recipe) {
            // is the wildcard recipe prefix in the identifier ?
            if (strpos($identifier, $wildcard) !== false) {
                // track matches and use the number of wildcard characters matched for the key
                $matches[strlen($wildcard)] = $default_recipe;
            }
        }
        if (count($matches) > 0) {
            // sort our recipes by the number of wildcard characters matched
            ksort($matches);
            // then grab the last recipe form the list, since it had the most matching characters
            $match = array_pop($matches);
            // since we are using a default recipe, we need to set it's identifier and fqcn
            return $this->copyDefaultRecipe($match, $identifier, $type);
        }
        if ($this->recipes->has(Recipe::DEFAULT_ID)) {
            // since we are using a default recipe, we need to set it's identifier and fqcn
            return $this->copyDefaultRecipe($this->recipes->get(Recipe::DEFAULT_ID), $identifier, $type);
        }
        throw new OutOfBoundsException(
            sprintf(
                __('Could not brew coffee because no recipes were found for class "%1$s".', 'event_espresso'),
                $identifier
            )
        );
    }



    /**
     * adds class name aliases to list of filters
     *
     * @param  string $identifier Identifier for the entity class that the alias applies to
     *                            Typically a Fully Qualified Class Name
     * @param  array  $aliases
     * @return void
     * @throws InvalidIdentifierException
     */
    public function addAliases($identifier, $aliases)
    {
        if (empty($aliases)) {
            return;
        }
        $identifier = $this->processIdentifier($identifier);
        foreach ((array)$aliases as $alias) {
            $this->filters[$this->processIdentifier($alias)] = $identifier;
        }
    }



    /**
     * Adds a service to one of the internal collections
     *
     * @param        $identifier
     * @param array  $arguments
     * @param string $type
     * @return mixed
     * @throws ServiceExistsException
     */
    private function makeCoffee($identifier, $arguments = array(), $type = '')
    {
        if ((empty($type) || $type === CoffeeMaker::BREW_SHARED) && $this->has($identifier)) {
            throw new ServiceExistsException($identifier);
        }
        $identifier = $this->filterIdentifier($identifier);
        $recipe = $this->getRecipe($identifier, $type);
        $type = ! empty($type) ? $type : $recipe->type();
        $coffee_maker = $this->getCoffeeMaker($type);
        return $coffee_maker->brew($recipe, $arguments);
    }



    /**
     * filters alias identifiers to find the real class name
     *
     * @param  string $identifier Identifier for the entity class that the filter applies to
     *                            Typically a Fully Qualified Class Name
     * @return string
     * @throws InvalidIdentifierException
     */
    private function filterIdentifier($identifier)
    {
        $identifier = $this->processIdentifier($identifier);
        return isset($this->filters[$identifier]) && ! empty($this->filters[$identifier])
            ? $this->filters[$identifier]
            : $identifier;
    }



    /**
     * verifies and standardizes identifiers
     *
     * @param  string $identifier Identifier for the entity class
     *                            Typically a Fully Qualified Class Name
     * @return string
     * @throws InvalidIdentifierException
     */
    private function processIdentifier($identifier)
    {
        if ( ! is_string($identifier)) {
            throw new InvalidIdentifierException(
                is_object($identifier) ? get_class($identifier) : gettype($identifier),
                '\Fully\Qualified\ClassName'
            );
        }
        return ltrim($identifier, '\\');
    }



    /**
     * @param string $type
     * @return CoffeeMakerInterface
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     */
    private function getCoffeeMaker($type)
    {
        if ( ! $this->coffee_makers->has($type)) {
            throw new OutOfBoundsException(
                __('The requested coffee maker is either missing or invalid.', 'event_espresso')
            );
        }
        return $this->coffee_makers->get($type);
    }



    /**
     * Retrieves all recipes that use a wildcard "*" in their identifier
     * This allows recipes to be set up for handling
     * legacy classes that do not support PSR-4 autoloading.
     * for example:
     * using "EEM_*" for a recipe identifier would target all legacy models like EEM_Attendee
     *
     * @return array
     */
    private function getDefaultRecipes()
    {
        $default_recipes = array();
        $this->recipes->rewind();
        while ($this->recipes->valid()) {
            $identifier = $this->recipes->getInfo();
            // does this recipe use a wildcard ? (but is NOT the global default)
            if ($identifier !== Recipe::DEFAULT_ID && strpos($identifier, '*') !== false) {
                // strip the wildcard and use identifier as key
                $default_recipes[str_replace('*', '', $identifier)] = $this->recipes->current();
            }
            $this->recipes->next();
        }
        return $default_recipes;
    }



    /**
     * clones a default recipe and then copies details
     * from the incoming request to it so that it can be used
     *
     * @param RecipeInterface $default_recipe
     * @param string          $identifier
     * @param string          $type
     * @return RecipeInterface
     */
    private function copyDefaultRecipe(RecipeInterface $default_recipe, $identifier, $type = '')
    {
        $recipe = clone($default_recipe);
        if ( ! empty($type)) {
            $recipe->setType($type);
        }
        // is this the base default recipe ?
        if ($default_recipe->identifier() === Recipe::DEFAULT_ID) {
            $recipe->setIdentifier($identifier);
            $recipe->setFqcn($identifier);
            return $recipe;
        }
        $recipe->setIdentifier($identifier);
        foreach ($default_recipe->paths() as $path) {
            $path = str_replace('*', $identifier, $path);
            if (is_readable($path)) {
                $recipe->setPaths($path);
            }
        }
        $recipe->setFqcn($identifier);
        return $recipe;
    }



    /**
     * @param  string $identifier Identifier for the entity class that the service applies to
     *                            Typically a Fully Qualified Class Name
     * @param mixed  $service
     * @return object
     * @throws InvalidServiceException
     */
    private function validateService($identifier, $service)
    {
        if ( ! is_object($service)) {
            throw new InvalidServiceException(
                $identifier,
                $service
            );
        }
        return $service;
    }

}
// End of file CoffeeShop.php
// Location: /CoffeeShop.php