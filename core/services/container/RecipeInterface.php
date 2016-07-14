<?php
namespace EventEspresso\core\services\container;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Interface RecipeInterface
 * for Recipe DTOs (Data Transfer Object) used in CoffeeShop
 * for relaying information about how to construct an object
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
    public function ingredients();

    /**
     * @return string
     */
    public function type();

    /**
     * @return array
     */
    public function filters();

    /**
     * @return array
     */
    public function paths();

    /**
     * @param  string $identifier Identifier for the entity class that the Recipe applies to
     *                            Typically a Fully Qualified Class Name
     */
    public function setIdentifier($identifier);

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
     */
    public function setFqcn($fqcn);

    /**
     * @param array $ingredients    an array of dependencies where keys are the aliases and values are the FQCNs
     *                              example:
     *                              array( 'ClassInterface' => 'Fully\Qualified\ClassName' )
     */
    public function setIngredients(array $ingredients);

    /**
     * @param string $type one of the class constants returned from CoffeeMaker::getTypes()
     */
    public function setType($type = CoffeeMaker::BREW_NEW);

    /**
     * @param array $filters    an array of filters where keys are the aliases and values are the FQCNs
     *                          example:
     *                          array( 'ClassInterface' => 'Fully\Qualified\ClassName' )
     */
    public function setFilters(array $filters);

    /**
     * Ensures incoming paths is a valid filepath, or array of valid filepaths,
     * and merges them in with any existing filepaths
     * PLZ NOTE:
     *  Recipe::setFqcn() has a check to see if Recipe::$paths is empty or not,
     *  therefore you should always call Recipe::setPaths() before Recipe::setFqcn()
     *
     * @param string|array $paths
     */
    public function setPaths($paths = array());

}
// End of file RecipeInterface.php
// Location: /RecipeInterface.php