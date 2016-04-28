<?php
namespace EventEspresso\Core\Exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class InvalidDataTypeException
 * thrown when an incorrect data type is provided to a function or returned from a function call
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidDataTypeException extends \EE_Error {

	/**
	 * InvalidDataTypeException constructor
	 *
	 * @param string $var_name name of the variable that was of the wrong type ie: "$my_var"
	 * @param mixed  $variable the actual variable that was of the wrong data type, ie: $my_var
	 * @param string $expected data type we wanted ie: "integer", "string", "array", etc.
	 */
	public function __construct( $var_name, $variable, $expected ) {
		parent::__construct(
			sprintf(
				__(
					'The supplied data for "%1$s" was %2$s, but %3$s was expected.',
					'event_espresso'
				),
				$var_name,
				$this->addIndefiniteArticle( gettype( $variable ) ),
				$this->addIndefiniteArticle( $expected )
			)
		);
	}



	/**
	 * @param $string
	 * @return string
	 */
	protected function addIndefiniteArticle( $string ) {
		return ( stripos( 'aeiou', $string[0] ) !== false ? 'an ' : 'a ' ) . $string;
	}
}
// End of file InvalidDataTypeException.php
// Location: /InvalidDataTypeException.php