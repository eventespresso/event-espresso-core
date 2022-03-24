<?php
/**
 * WPGraphQL test case (for PHPUnit)
 *
 * For testing WPGraphQL responses.
 * @since 1.1.0
 * @package Tests\WPGraphQL\TestCase
 */
namespace Tests\WPGraphQL\TestCase;

abstract class WPGraphQLUnitTestCase extends \WP_UnitTestCase {

	use WPGraphQLTestCommon;

	// For capturing the resulting constraint of the assertion.
	protected static $actual          = null;
	protected static $last_constraint = null;

	// Possible field anonymous values.
	const NOT_NULL  = 'phpunit_field_value_not_null';
	const IS_NULL   = 'phpunit_field_value_is_null';
	const NOT_FALSY = 'phpunit_field_value_is_falsy';
	const IS_FALSY  = 'phpunit_field_value_is_falsy';

	// Search operation enumerations.
	const MESSAGE_EQUALS      = 500;
	const MESSAGE_CONTAINS    = 600;
	const MESSAGE_STARTS_WITH = 700;
	const MESSAGE_ENDS_WITH   = 800;

	/**
	 * Console logging function.
	 *
	 * Use --debug flag to view in console.
	 */
	public static function logData( $data ) {
		if ( is_array( $data ) || is_object( $data ) ) {
			fwrite( STDOUT, json_encode( $data, JSON_PRETTY_PRINT ) );
			return;
		}

		fwrite( STDOUT, $data );
	}
}