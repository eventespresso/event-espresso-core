<?php
namespace EventEspresso\core\services\container;

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use RuntimeException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class Recipe
 * Fairly simple DTO (Data Transfer Object) for relaying information about how to construct an object
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class Recipe implements RecipeInterface
{

    /**
     * A default Recipe to use if none is specified for a class
     */
    const DEFAULT_ID = '*';

    /**
     * Identifier for the entity class to be constructed.
     * Typically a Fully Qualified Class Name
     *
     * @var string $identifier
     */
    private $identifier;

    /**
     * Fully Qualified Class Name
     *
     * @var string $fqcn
     */
    private $fqcn;

    /**
     * a dependency class map array
     * If a Recipe is for a single class (or group of classes that shares the EXACT SAME constructor arguments),
     * and that class type hints for an interface, then this property allows you to configure what dependencies
     * get used when instantiating the class.
     * For example:
     *  There's a class called Coffee, and one of its constructor arguments is BeanInterface
     *  There are two implementations of BeanInterface: HonduranBean, and KenyanBean
     *  We want one Coffee object to use HonduranBean for its BeanInterface,
     *  and the 2nd Coffee object to use KenyanBean for its BeanInterface.
     *  To do this, we need to create two Recipes:
     *      one with an identifier of 'HonduranCoffee' using the following ingredients :
     *          array('BeanInterface' => 'HonduranBean')
     *      and the other with an identifier of 'KenyanCoffee' using the following ingredients :
     *          array('BeanInterface' => 'KenyanBean')
     *  Then, whenever the CoffeeShop brews an instance of HonduranCoffee,
     *  an instance of HonduranBean will get injected for the BeanInterface dependency,
     *  and whenever the CoffeeShop brews an instance of KenyanCoffee,
     *  an instance of KenyanBean will get injected for the BeanInterface dependency
     *
     * @var array $ingredients
     */
    private $ingredients = array();

    /**
     * one of the class constants from CoffeeShop:
     *  CoffeeMaker::BREW_NEW - creates a new instance
     *  CoffeeMaker::BREW_SHARED - creates a shared instance
     *  CoffeeMaker::BREW_LOAD_ONLY - loads but does not instantiate
     *
     * @var string $type
     */
    private $type;

    /**
     * class name aliases - typically a Fully Qualified Interface that the class implements
     * identifiers passed to the CoffeeShop will be run through the filters to find the correct class name
     *
     * @var array $filters
     */
    private $filters = array();

    /**
     * array of full server filepaths to files that may contain the class
     *
     * @var array $paths
     */
    private $paths = array();



    /**
     * Recipe constructor.
     *
     * @param string $identifier    class identifier, can be an alias, or FQCN, or whatever
     * @param string $fqcn          \Fully\Qualified\ClassName, optional if $identifier is FQCN
     * @param array  $ingredients   array of dependencies that can not be resolved automatically,
     *                              used for resolving concrete classes for type hinted interfaces
     *                              for the dependencies of THIS class
     * @param string $type          recipe type: one of the class constants on
     *                              \EventEspresso\core\services\container\CoffeeMaker
     * @param array  $filters       array of class aliases, or class interfaces
     *                              this works somewhat opposite to the $ingredients array above,
     *                              in that this array specifies interfaces or aliases
     *                              that this Recipe can be used for when resolving OTHER class's dependencies
     * @param array  $paths         if class can not be loaded via PSR-4 autoloading,
     *                              then supply a filepath, or array of filepaths, so that it can be included
     */
    public function __construct(
	    $identifier,
        $fqcn = '',
        $filters = array(),
        $ingredients = array(),
	    $type = CoffeeMaker::BREW_NEW,
	    $paths = array()
    )
    {
        $this->setIdentifier($identifier);
        $this->setFilters((array)$filters);
        $this->setIngredients((array)$ingredients);
        $this->setType($type);
        $this->setPaths($paths);
        $this->setFqcn($fqcn);
    }



    /**
     * @return string
     */
    public function identifier()
    {
        return $this->identifier;
    }



    /**
     * @return string
     */
    public function fqcn()
    {
        return $this->fqcn;
    }



    /**
     * @return array
     */
    public function filters()
    {
        return (array)$this->filters;
    }



    /**
     * @return array
     */
    public function ingredients()
    {
        return $this->ingredients;
    }



    /**
     * @return string
     */
    public function type()
    {
        return $this->type;
    }



    /**
     * @return array
     */
    public function paths()
    {
        return (array)$this->paths;
    }



    /**
     * @param  string $identifier Identifier for the entity class that the Recipe applies to
     *                            Typically a Fully Qualified Class Name
     */
    public function setIdentifier($identifier)
    {
        if ( ! is_string($identifier) || empty($identifier)) {
            throw new InvalidIdentifierException(
                is_object($identifier) ? get_class($identifier) : gettype($identifier),
                __('class identifier (typically a \Fully\Qualified\ClassName)', 'event_espresso')
            );
        }
        $this->identifier = $identifier;
    }



    /**
     * Ensures incoming string is a valid Fully Qualified Class Name,
     * except if this is the default wildcard Recipe ( * ),
     * or it's NOT an actual FQCN because the Recipe is using filepaths
     * for classes that are not PSR-4 compatible
     * PLZ NOTE:
     *  Recipe::setFqcn() has a check to see if Recipe::$paths is empty or not,
     *  therefore you should always call Recipe::setPaths() before Recipe::setFqcn()
     *
     * @param string $fqcn
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     * @throws InvalidInterfaceException
     */
    public function setFqcn($fqcn)
    {
	    $fqcn = ! empty($fqcn) ? $fqcn : $this->identifier;
        if ( ! is_string($fqcn)) {
            throw new InvalidDataTypeException(
                '$fqcn',
                is_object($fqcn) ? get_class($fqcn) : gettype($fqcn),
                __('string (Fully\Qualified\ClassName)', 'event_espresso')
            );
        }
        $fqcn = ltrim($fqcn, '\\');
        if (
            $fqcn !== Recipe::DEFAULT_ID
            && ! empty($fqcn)
            && empty($this->paths)
            && ! (class_exists($fqcn) || interface_exists($fqcn))
        ) {
            throw new InvalidClassException($fqcn);
        }
        $this->fqcn = $fqcn;
    }



    /**
     * @param array $ingredients    an array of dependencies where keys are the aliases and values are the FQCNs
     *                              example:
     *                              array( 'ClassInterface' => 'Fully\Qualified\ClassName' )
     */
    public function setIngredients(array $ingredients)
    {
        if (empty($ingredients)) {
            return;
        }
        if ( ! is_array($ingredients)) {
            throw new InvalidDataTypeException(
                '$ingredients',
                is_object($ingredients) ? get_class($ingredients) : gettype($ingredients),
                __('array of class dependencies', 'event_espresso')
            );
        }
        $this->ingredients = array_merge($this->ingredients, $ingredients);
    }


    /**
     * @param string $type one of the class constants returned from CoffeeMaker::getTypes()
     */
    public function setType($type = CoffeeMaker::BREW_NEW)
    {
        $this->type = CoffeeMaker::validateType($type);
    }



    /**
     * @param array $filters an array of filters where keys are the aliases and values are the FQCNs
     *                          example:
     *                          array( 'ClassInterface' => 'Fully\Qualified\ClassName' )
     */
    public function setFilters(array $filters)
    {
        if (empty($filters)) {
            return;
        }
        if ( ! is_array($filters)) {
            throw new InvalidDataTypeException(
                '$filters',
                is_object($filters) ? get_class($filters) : gettype($filters),
                __('array of class aliases', 'event_espresso')
            );
        }
        $this->filters = array_merge($this->filters, $filters);
    }



    /**
     * Ensures incoming paths is a valid filepath, or array of valid filepaths,
     * and merges them in with any existing filepaths
     *
     * PLZ NOTE:
     *  Recipe::setFqcn() has a check to see if Recipe::$paths is empty or not,
     *  therefore you should always call Recipe::setPaths() before Recipe::setFqcn()
     *
     * @param string|array $paths
     */
    public function setPaths($paths = array())
    {
        if (empty($paths)) {
            return;
        }
        if ( ! (is_string($paths) || is_array($paths))) {
            throw new InvalidDataTypeException(
                '$path',
                is_object($paths) ? get_class($paths) : gettype($paths),
                __('string or array of strings (full server filepath(s))', 'event_espresso')
            );
        }
        $paths = (array)$paths;
        foreach ($paths as $path) {
            if (strpos($path, '*') === false && ! is_readable($path)) {
                throw new RuntimeException(
                    sprintf(
                        __('The following filepath is not readable: "%1$s"', 'event_espresso'),
                        $path
                    )
                );
            }
        }
        $this->paths = array_merge($this->paths, $paths);
    }



}
// End of file Recipe.php
// Location: /Recipe.php