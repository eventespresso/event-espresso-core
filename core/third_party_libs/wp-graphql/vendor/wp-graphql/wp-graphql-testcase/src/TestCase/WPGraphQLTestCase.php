<?php
/**
 * WPGraphQL test case (For Codeception)
 *
 * For testing WPGraphQL responses.
 * @since 1.0.0
 * @package Tests\WPGraphQL\TestCase
 */

namespace Tests\WPGraphQL\TestCase;

/**
 * WPGraphQLTestCase class.
 */
class WPGraphQLTestCase extends \Codeception\TestCase\WPTestCase {

	use WPGraphQLTestCommon;

	// For capturing the resulting constraint of the assertion.
	protected static $actual          = null;
	protected static $last_constraint = null;

	// Possible field anonymous values.
	const NOT_NULL  = 'codecept_field_value_not_null';
	const IS_NULL   = 'codecept_field_value_is_null';
	const NOT_FALSY = 'codecept_field_value_is_falsy';
	const IS_FALSY  = 'codecept_field_value_is_falsy';

	// Search operation enumerations.
	const MESSAGE_EQUALS      = 100;
	const MESSAGE_CONTAINS    = 200;
	const MESSAGE_STARTS_WITH = 300;
	const MESSAGE_ENDS_WITH   = 400;

	/**
	 * Console logging function.
	 *
	 * Use --debug flag to view in console.
	 */
	protected static function logData( $data ) {
		if ( is_array( $data ) || is_object( $data ) ) {
			\codecept_debug( json_encode( $data, JSON_PRETTY_PRINT ) );
			return;
		}

		\codecept_debug( $data );
	}
}
