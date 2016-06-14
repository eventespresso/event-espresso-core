<?php
namespace EventEspresso\core\services\container;

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use RuntimeException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
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
	 * class name aliases - typically a Fully Qualified Interface that the class implements
	 * identifiers passed to the coffee pot will be run through the filters to find the correct class name
	 *
	 * @var array $filters
	 */
	private $filters = array();

	/**
	 * one of the class constants from CoffeePot:
	 *  CoffeePot::BREW_FACTORY - creates a new instance
	 *  CoffeePot::BREW_PROTOTYPE - creates a shared instance
	 *  CoffeePot::BREW_SINGLETON - creates a cloned instance
	 *
	 * @var string $type
	 */
	private $type;

	/**
	 * array of full server filepaths to files that may contain the class
	 *
	 * @var array $paths
	 */
	private $paths = array();



	/**
	 * Recipe constructor.
	 *
	 * @param string $identifier class identifier: typically a \Fully\Qualified\ClassName
	 * @param string $type       recipe type: one of the class constants on
	 *                           \EventEspresso\core\services\container\CoffeeMaker
	 * @param array  $filters    array of class aliases, or class interfaces
	 * @param array  $paths      if class can not be loaded via PSR-4 autoloading,
	 *                           then supply a filepath, or array of filepaths, so that it can be included
	 */
	public function __construct( $identifier, $type = CoffeeMaker::BREW_NEW, $filters = array(), $paths = array() )
	{
		$this->setIdentifier( $identifier );
		$this->setType( $type );
		$this->setPaths( $paths );
		$this->setFqcn( $identifier );
		$this->setFilters( (array) $filters );
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
		return (array) $this->filters;
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
		return (array) $this->paths;
	}



	/**
	 * @param string $identifier
	 */
	public function setIdentifier( $identifier )
	{
		if ( ! is_string( $identifier ) || empty( $identifier ) ) {
			throw new InvalidIdentifierException(
				is_object( $identifier ) ? get_class( $identifier ) : gettype( $identifier ),
				__( 'class identifier (typically a \Fully\Qualified\ClassName)', 'event_espresso' )
			);
		}
		$this->identifier = $identifier;
	}



	/**
	 * @param string $fqcn
	 */
	public function setFqcn( $fqcn )
	{
		if ( ! is_string( $fqcn ) ) {
			throw new InvalidDataTypeException(
				'$fqcn',
				is_object( $fqcn ) ? get_class( $fqcn ) : gettype( $fqcn ),
				__( 'string (Fully\Qualified\ClassName)', 'event_espresso' )
			);
		}
 		$fqcn = ltrim( $fqcn, '\\' );
		if (
			$fqcn !== Recipe::DEFAULT_ID
			&& ! empty( $fqcn )
			&& empty( $this->paths )
			&& ! class_exists( $fqcn )
		) {
			throw new InvalidClassException( $fqcn );
		}
		$this->fqcn = $fqcn;
	}



	/**
	 * @param array $filters
	 */
	public function setFilters( array $filters )
	{
		if ( empty( $filters ) ) {
			return;
		}
		if ( ! is_array( $filters ) ) {
			throw new InvalidDataTypeException(
				'$filters',
				is_object( $filters ) ? get_class( $filters ) : gettype( $filters ),
				__( 'array of class aliases', 'event_espresso' )
			);
		}
		$this->filters = array_merge( $this->filters, $filters );
	}



	/**
	 * @param string $type
	 */
	public function setType( $type = CoffeeMaker::BREW_NEW )
	{
		$this->type = CoffeeMaker::validateType( $type );
	}



	/**
	 * @param string|array $paths
	 */
	public function setPaths( $paths = array() )
	{
		if ( empty( $paths ) ) {
			return;
		}
		if ( ! ( is_string( $paths ) || is_array( $paths ) ) ) {
			throw new InvalidDataTypeException(
				'$path',
				is_object( $paths ) ? get_class( $paths ) : gettype( $paths ),
				__( 'string or array of strings (full server filepath(s))', 'event_espresso' )
			);
		}
		$paths = (array) $paths;
		foreach ( $paths as $path ) {
			if ( strpos( $path, '*' ) === false && ! is_readable( $path ) ) {
				throw new RuntimeException(
					sprintf(
						__( 'The following filepath is not readable: "%1$s"', 'event_espresso' ),
						$path
					)
				);
			}
		}
		$this->paths = array_merge( $this->paths, $paths );
	}



}
// End of file Recipe.php
// Location: /Recipe.php