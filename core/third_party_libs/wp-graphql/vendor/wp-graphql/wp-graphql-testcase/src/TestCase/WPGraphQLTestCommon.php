<?php
/**
 * WPGraphQL test utility functions/assertions.
 *
 * @since 1.1.0
 * @package Tests\WPGraphQL\TestCase
 */

namespace Tests\WPGraphQL\TestCase;

use PHPUnit\Framework\Constraint\Constraint;
use PHPUnit\Framework\Constraint\LogicalNot;
use PHPUnit\Framework\Constraint\IsNull;
use PHPUnit\Framework\Constraint\IsEqual;
use PHPUnit\Framework\Constraint\IsEmpty;
use PHPUnit\Framework\Constraint\IsTrue;
use PHPUnit\Framework\Constraint\TraversableContains;

/**
 * Trait WPGraphQLTestCommon
 */
trait WPGraphQLTestCommon {

	/**
	 * Console logging function.
	 *
	 * Use --debug flag to view in console.
	 */
	abstract public static function logData( $data );

	/**
	 * Wrapper for the "graphql()" function.
	 *
	 * @return array
	 */
	public function graphql() {
		$results = graphql( ...func_get_args() );

		// use --debug flag to view.
		static::logData( $results );

		return $results;
	}

	/**
	 * Wrapper for the "\WGraphQL::clear_schema()" function.
	 *
	 * @return array
	 */
	public function clearSchema() {
		// Clear schema
		\WPGraphQL::clear_schema();
	}

	/**
	 * A simple helper for clearing a loaders cache. The is good for when
	 * running a query multiple times and wish to ensure that the value returned
	 * isn't a cached value.
	 *
	 * @param string $loader_name  Loader slug name.
	 *
	 * @return void
	 */
	public function clearLoaderCache( $loader_name ) {
		$loader = \WPGraphQL::get_app_context()->getLoader( $loader_name );
		$loader->clearAll();
	}

	/**
	 * Wrapper for the "GraphQLRelay\Relay::toGlobalId()" function.
	 *
	 * @return string
	 */
	public function toRelayId() {
		return \GraphQLRelay\Relay::toGlobalId( ...func_get_args() );
	}

	/**
	 * Returns an expected "Field" type data object.
	 *
	 * @param string $path            Path to the data being tested.
	 * @param mixed  $expected_value  Expected value of the object being evaluted.
	 * @return array
	 */
	public function expectedField( string $path, $expected_value ) {
		$type = $this->get_not() . 'FIELD';
		return compact( 'type', 'path', 'expected_value' );
	}

	/**
	 * Returns an expected "Object" type data object.
	 *
	 * @param string $path            Path to the data being tested.
	 * @param array  $expected_value  Expected value of the object being evaluted.
	 * @return array
	 */
	public function expectedObject( string $path, array $expected_value ) {
		$type = $this->get_not() . 'OBJECT';
		return compact( 'type', 'path', 'expected_value' );
	}

	/**
	 * Returns an expected "Node" type data object.
	 *
	 * @param string       $path            Path to the data being tested.
	 * @param array        $expected_value  Expected value of the node being evaluted.
	 * @param integer|null $expected_index  Expected index of the node being evaluted.
	 * @return array
	 */
	public function expectedNode( string $path, array $expected_value, $expected_index = null ) {
		$type = $this->get_not() . 'NODE';
		return compact( 'type', 'path', 'expected_value', 'expected_index' );
	}

	/**
	 * Returns an expected "Edge" type data object.
	 *
	 * @param string       $path            Path to the data being tested.
	 * @param array        $expected_value  Expected value of the edge being evaluted.
	 * @param integer|null $expected_index  Expected index of the edge being evaluted.
	 * @return array
	 */
	public function expectedEdge( string $path, array $expected_value, $expected_index = null ) {
		$type = $this->get_not() . 'EDGE';
		return compact( 'type', 'path', 'expected_value', 'expected_index' );
	}

	/**
	 * Triggers the "not" flag for the next expect*() call.
	 *
	 * @return WPGraphQLTestCommon
	 */
	public function not() {
		$this->not = '!';
		return $this;
	}

	/**
	 * Clears the "not" flag and return the proper prefix.
	 *
	 * @return string
	 */
	private function get_not() {
		$prefix = $this->not ? '!' : '';
		unset( $this->not );
		return $prefix;
	}

	/**
	 * Returns an expected "location" error data object.
	 *
	 * @param string $path Path to the data being tested.
	 * @return array
	 */
	public function expectedErrorPath( string $path ) {
		$type = 'ERROR_PATH';
		return compact( 'type', 'path' );
	}

	/**
	 * Returns an expected "Edge" type data object.
	 *
	 * @param string   $path            Path to the data being tested.
	 * @param int|null $search_type  Expected index of the edge being evaluted.
	 * @return array
	 */
	public function expectedErrorMessage( string $needle, int $search_type = self::MESSAGE_EQUALS ) {
		$type = 'ERROR_MESSAGE';
		return compact( 'type', 'needle', 'search_type' );
	}

	/**
	 * Checks if the provided is a expected data rule object.
	 *
	 * @param array $expected_data
	 *
	 * @return bool
	 */
	public static function isNested( array $expected_data ) {
		$rule_keys = array( 'type', 'path', 'expected_value' );

		return ! empty( $expected_data[0] )
			&& is_array( $expected_data[0] )
			&& 3 === count( array_intersect( array_keys( $expected_data[0] ), $rule_keys ) );
	}

	/**
	 * Asserts if $expected_value matches $data.
	 *
	 * @param array  $data            Data object be evaluted.
	 * @param mixed  $expected_value  Value $data is expected to evalute to.
	 * @param bool   $match_wanted    Whether $expected_value and $data should be equal or different.
	 * @param string $message         Error message to be display if assertion fails.
	 *
	 * @return bool
	 */
	public static function doesFieldMatch( $data, $expected_value, $match_wanted ) {
		// Get data/value type and log assertion.
		$log_type   = is_array( $data ) ? 'ACTUAL_DATA_OBJECT' : 'ACTUAL_DATA';
		$value_type = $match_wanted ? 'WANTED_VALUE': 'UNWANTED_VALUE';
		static::logData(
			array(
				$value_type => $expected_value,
				$log_type   => $data,
			)
		);

		// If match wanted, matching condition set other not matching condition is set.
		$condition = $match_wanted
			? $data === $expected_value
			: $data !== $expected_value;

		// Return condtion.
		return $condition;
	}

	/**
	 * Asserts if $expected_value matches one of the entries in $data.
	 *
	 * @param array  $data            Data object be evaluted.
	 * @param mixed  $expected_value  Value $data is expected to evalute to.
	 * @param bool   $match_wanted    Whether $expected_value and $data should be equal or different.
	 *
	 * @return bool
	 */
	public static function doesFieldMatchGroup( $data, $expected_value, $match_wanted ) {
		$item_type  = $match_wanted ? 'WANTED VALUE' : 'UNWANTED VALUE';

		// Log data objects before the coming assertion.
		$assertion_log = array(
			$item_type           => $expected_value,
			'VALUES_AT_LOCATION' => $data,
		);
		static::logData( $assertion_log );

		// Loop through possible node/edge values for the field.
		foreach ( $data as $item ) {
			// Check if field value matches $expected_value.
			$field_matches = static::doesFieldMatch(
				$item,
				$expected_value,
				$match_wanted
			);

			// Pass if match found and match wanted.
			if ( $field_matches && $match_wanted ) {
				return true;

				// Fail if match found and no matches wanted.
			} elseif ( ! $field_matches && ! $match_wanted ) {
				return false;
			}
		}

		// Fail if no matches found but matches wanted.
		if ( $match_wanted ) {
			return false;
		}

		// Pass if no matches found and no matches wanted.
		return true;
	}

	/**
	 * Reports an error identified by $message if $response does not contain data defined
	 * in $expected_data.
	 *
	 * @param array  $response       GraphQL query response object
	 * @param array  $expected_data  Expected data object to be evaluated.
	 * @param string $message        Error message.
	 *
	 * @throws \Exception Invalid rule object provided for evaluation.
	 *
	 * @return bool
	 */
	public static function _assertExpectedDataFound( array $response, array $expected_data, string $current_path = null, &$message = null ) {
		// Throw if "$expected_data" invalid.
		if ( empty( $expected_data['type'] ) ) {
			static::logData( array( 'INVALID_DATA_OBJECT' => $expected_data ) );
			throw new \Exception( 'Invalid rule object provided for evaluation.' );
		}

		// Deconstruct $expected_data.
		extract( $expected_data );

		// Get flags.
		$check_order = isset( $expected_index ) && ! is_null( $expected_index );

		// Set current path in response.
		if ( empty( $current_path ) ) {
			$path = "data.{$path}";
		} else {
			$path = "{$current_path}.{$path}";
		}

		// Add index to path if provided.
		$full_path   = $check_order ? "{$path}.{$expected_index}" : "{$path}";

		// Get data at path for evaluation.
		$actual_data    = static::getPossibleDataAtPath( $response, $full_path, $is_group );

		// Set actual data for final assertion
		static::$actual = $actual_data;

		// Handle if "$expected_value" set to field value constants.
		switch( is_array( $expected_value ) ? $expected_value : "{$expected_value}" ) {
			case static::IS_NULL:
				// Set IS_NULL constraint.
				static::$last_constraint = static::isNull();

				// Set "expected_value" to "null" for later comparison.
				$expected_value = null;
				break;

			case static::NOT_FALSY:
				// Set NOT_FALSY constraint.
				static::$last_constraint = static::logicalNot( static::isEmpty() );

				// Fail if data found at path is a falsy value (null, false, []).
				if ( empty( $actual_data ) ) {
					$message = $message
						?? sprintf(
							'Expected data at path "%s" not to be falsy value. "%s" Given',
							$full_path,
							is_array( $actual_data ) ? '[]' : (string) $actual_data
						);

					return false;
				}

				// Return true because target value not falsy.
				return true;

			case static::IS_FALSY:
				// Set IS_FALSY constraint.
				static::$last_constraint = static::isEmpty();

				// Fail if data found at path is not falsy value (null, false, 0, []).
				if ( ! empty( $actual_data ) ) {
					$message = $message
					?? sprintf(
						'Expected data at path "%s" to be falsy value. "%s" Given',
						$full_path,
						is_array( $actual_data ) ? json_encode( $actual_data, JSON_PRETTY_PRINT ) : $actual_data
					);

					return false;
				}

				// Return true because target value is falsy.
				return true;

			case static::NOT_NULL:
			default: // Check if "$expected_value" is not null if comparing to provided value.
				// Set NOT_NULL constraint.
				static::$last_constraint = static::logicalNot( static::isNull() );

				// Fail if no data found at path.
				if ( is_null( $actual_data ) ) {
					$message = $message ?? sprintf( 'No data found at path "%s"', $full_path );

					return false;
				}

				// Return true because target value not null.
				if ( $expected_value === static::NOT_NULL ) {
					return true;
				}
		}

		$match_wanted   = ! static::startsWith( '!', $type );
		$is_field_rule  = static::endsWith( 'FIELD', $type );
		$is_object_rule = static::endsWith( 'OBJECT', $type );
		$is_node_rule   = static::endsWith( 'NODE', $type );
		$is_edge_rule   = static::endsWith( 'EDGE', $type );

		// Set matcher and constraint.
		$matcher                 = ( ( $is_group && $is_field_rule ) || ( ! $check_order && ! $is_field_rule ) )
			? 'doesFieldMatchGroup'
			: 'doesFieldMatch';
		static::$last_constraint = ( ( $is_group && $is_field_rule ) || ( ! $check_order && ! $is_field_rule ) )
			? static::contains( $expected_value )
			: static::isEqual( $expected_value );

		if ( ! $match_wanted ) {
			static::$last_constraint = static::logicalNot( static::$last_constraint );
		}

		// Evaluate rule by type.
		switch( true ) {
			case $is_field_rule:
				// Fail if matcher fails
				if ( ! static::{$matcher}( $actual_data, $expected_value, $match_wanted ) ) {
					$message = $message
						?? sprintf(
							'Data found at path "%1$s" %2$s the provided value',
							$path,
							$match_wanted ? 'doesn\'t match' : 'shouldn\'t match'
						);

					return false;
				}

				// Pass if matcher passes.
				return true;
			case $is_object_rule:
			case $is_node_rule:
			case $is_edge_rule:
				// Handle nested rules recursively.
				if ( is_array( $expected_value ) && static::isNested( $expected_value ) ) {
					foreach ( $expected_value as $nested_rule ) {
						$next_path           = ( $check_order || $is_object_rule ) ? $full_path : "{$full_path}.#";
						$next_path          .= $is_edge_rule ? '.node' : '';
						$nested_rule_passing = static::_assertExpectedDataFound( $response, $nested_rule, $next_path, $message );

						if ( ! $nested_rule_passing ) {
							return false;
						}
					}
					return true;
				}

				// Fail if matcher fails.
				if ( ! static::{$matcher}( $actual_data, $expected_value, $match_wanted ) ) {
					if ( $check_order ) {
						$message = $message
							?? sprintf(
								'Data found at path "%1$s" %2$s the provided value',
								$full_path,
								$match_wanted ? 'doesn\'t match' : 'shouldn\'t match'
							);
					} else {
						$message = $message
							?? sprintf(
								'%1$s found in %2$s list at path "%3$s"',
								$match_wanted ? 'Undesired data ' : 'Expected data not ',
								strtolower( $type ),
								$full_path
							);
					}

					return false;
				}

				// Pass if matcher passes.
				return true;
			default:
				static::logData( array( 'INVALID_DATA_OBJECT', $expected_data ) );
				throw new \Exception( 'Invalid data object provided for evaluation.' );
		}
	}

	/**
	 * Reports an error identified by $message if $response does not contain error defined
	 * in $expected_data.
	 *
	 * @param array  $response       GraphQL query response object
	 * @param array  $expected_data  Expected data object to be evaluated.
	 * @param string $message        Error message.
	 */
	public static function _assertExpectedErrorFound( array $response, array $expected_data, &$message = null ) {
		// Deconstruct $expected_data.
		extract( $expected_data );

		switch( $type ) {
			case 'ERROR_PATH':
				$target_path = array_map(
					function( $v ) {
						return is_numeric( $v ) ? absint( $v ) : $v;
					},
					explode( '.', $path )
				);

				// Set constraint.
				static::$actual          = self::getPossibleDataAtPath( $response['errors'], '.#.path' );
				static::$last_constraint = static::contains( $target_path );

				foreach ( $response['errors'] as $error ) {
					if ( empty( $error['path'] ) ) {
						continue;
					}

					// Pass if match found.
					if ( $target_path === $error['path'] ) {
						return true;
					}
				}

				// Fail if no match found.
				$message = $message ?? sprintf( 'No errors found that occured at path "%1$s"', $path );
				return false;
			case 'ERROR_MESSAGE':
				foreach ( $response['errors'] as $error ) {
					// Set constraint.
					static::$actual          = self::getPossibleDataAtPath( $response['errors'], '.#.message' );
					static::$last_constraint = static::contains( $needle );

					if ( empty( $error['message'] ) ) {
						continue;
					}

					// Pass if match found.
					if ( static::findSubstring( $needle, $error['message'], $search_type ) ) {
						return true;
					}
				}

				$search_type_messages = array(
					self::MESSAGE_EQUALS      => 'equals',
					self::MESSAGE_CONTAINS    => 'contains',
					self::MESSAGE_STARTS_WITH => 'starts with',
					self::MESSAGE_ENDS_WITH   => 'ends with',
				);

				// Fail if no match found.
				$message = $message
					?? sprintf(
						'No errors found with a message that %1$s "%2$s"',
						$search_type_messages[ $search_type ],
						$needle
					);

				return false;
			default:
				throw new \Exception( 'Invalid data object provided for evaluation.' );
		}
	}


	/**
	 * Reports an error identified by $message if $response is not a valid GraphQL response object.
	 *
	 * @param array  $response  GraphQL query response object.
	 * @param string $message   References that outputs error message.
	 *
	 * @return bool
	 */
	private static function _assertIsValidQueryResponse( $response, &$message = null ) {
		if ( array_keys( $response ) === range( 0, count( $response ) - 1 ) ) {
			$message = $message ?? 'The GraphQL query response must be provided as an associative array.';
			return false;
		}

		if ( empty( $response ) ) {
			$message = $message ?? 'GraphQL query response is empty.';
			return false;
		}

		if ( 0 === count( array_intersect( array_keys( $response ), array( 'data', 'errors' ) ) ) ) {
			$message = $message ?? 'A valid GraphQL query response must contain a "data" or "errors" object.';
			return false;
		}

		return true;
	}


	/**
	 * See _assertIsValidQueryResponse
	 *
	 * @param array  $response  GraphQL query response object.
	 * @param string $message   Error message.
	 * @return void
	 */
	public static function assertIsValidQueryResponse( $response, $message = null ) {
		// Validate format.
		static::assertThat(
			static::_assertIsValidQueryResponse( $response, $message ),
			static::isTrue(),
			$message ?? ''
		);
	}

	/**
	 * Reports an error identified by $message if $response does not contain all data
	 * and specifications defined in the $expected array.
	 *
	 * @param array  $response  GraphQL query response.
	 * @param array  $expected  List of expected data objects.
	 * @param string $message   Error message.
	 */
	public static function assertQuerySuccessful( array $response, array $expected, $message = null ) {
		static::$actual          = null;
		static::$last_constraint = null;

		$data_passing        = null;  // Create individual data rule evaluation flag for later use.
		$response_valid      = static::_assertIsValidQueryResponse( $response, $message ); // Validate response shape with sub assertion.
		$response_successful = ! in_array( 'errors', array_keys( $response ) ); // Ensure no errors thrown.

		// If errors thrown sent error message.
		if ( $response_valid && ! $response_successful ) {
			$message = $message ?? 'An error was thrown during the previous GraphQL requested. May need to use "--debug" flag to see contents of previous request.';
		}

		// If no failures no far loop through and evaluate rule using sub assertion.
		if ( $response_valid && $response_successful ) {
			foreach( $expected as $expected_data ) {
				$data_passing = static::_assertExpectedDataFound( $response, $expected_data, '', $message );
				if ( ! $data_passing ) {
					break;
				}
			}
		}

		if ( $response_valid && $response_successful && $data_passing ) {
			static::assertThat( true, static::isTrue(), '' );
			return;
		}

		// Assert no failures.
		static::assertThat(
			! empty( static::$actual ) ? static::$actual : false,
			! empty( static::$last_constraint ) ? static::$last_constraint : static::isTrue(),
			$message ?? ''
		);
	}

	/**
	 * Reports an error identified by $message if $response does not contain the error
	 * specifications defined in the $expected array.
	 *
	 * @param array  $response  GraphQL query response.
	 * @param array  $expected  Expected error data.
	 * @param string $message   Error message.
	 * @return void
	 */
	public function assertQueryError( array $response, array $expected, $message = null ) {
		$error_passing  = null;  // Create individual error rule evaluation flag for later use.
		$data_passing    = null;  // Create individual data rule evaluation flag for later use.
		$response_valid  = static::_assertIsValidQueryResponse( $response, $message ); // Validate response shape with sub assertion.
		$response_failed = in_array( 'errors', array_keys( $response ) ); // Ensure no errors thrown.

		// If errors thrown sent error message.
		if ( $response_valid && ! $response_failed ) {
			$message = $message ?? 'No errors was thrown during the previous GraphQL requested. May need to use "--debug" flag to see contents of previous request.';
		}

		// If no failures no far loop through and evaluate rule using sub assertion.
		if ( $response_valid && $response_failed ) {
			foreach( $expected as $expected_data ) {
				if ( empty( $expected_data['type'] ) ) {
					static::logData( array( 'INVALID_DATA_OBJECT' => $expected_data ) );
					throw new \Exception( 'Invalid data object provided for evaluation.' );
				}

				// If error data evaluate error rule and continue.
				if ( static::startsWith( 'ERROR_', $expected_data['type'] ) ) {
					$error_passing = static::_assertExpectedErrorFound( $response, $expected_data, $message );
					if ( ! $error_passing ) {
						break;
					}
					continue;
				}

				// Else assume it is an data rule and act accordingly.
				$data_passing = static::_assertExpectedDataFound( $response, $expected_data, '', $message );
				if ( ! $data_passing ) {
					break;
				}
			}
		}

		if ( $response_valid && $response_failed && $error_passing && $data_passing ) {
			static::assertThat( true, static::isTrue(), '' );
			return;
		}

		// Assert no failures.
		static::assertThat(
			! empty( static::$actual ) ? static::$actual : false,
			! empty( static::$last_constraint ) ? static::$last_constraint : static::isTrue(),
			$message ?? ''
		);
	}

	/**
	 * The value returned for undefined resolved values.
	 *
	 * Clone of the "get" function from the Lodash JS libra
	 *
	 * @param array  $object   The object to query.
	 * @param string $path     The path of the property to get.
	 * @param mixed  $default  The value returned for undefined resolved values.
	 * @return void
	 */
	protected static function lodashGet( array $data, string $string, $default = null ) {
		$arrStr = explode( '.', $string );
		if ( ! is_array( $arrStr ) ) {
			$arrStr = [ $arrStr ];
		}

		$result = $data;
		foreach ( $arrStr as $lvl ) {
			if ( ! is_null( $lvl ) && isset( $result[ $lvl ] ) ) {
				$result = $result[ $lvl ];
			} else {
				$result = $default;
			}
		}

		return $result;
	}

	/**
	 * Returns array of possible values for paths where "#" is being used instead of numeric index
	 * in $path.
	 *
	 * @param array $data        Data to be search
	 * @param string $path       Formatted lodash path.
	 * @param boolean $is_group  Function passback.
	 *
	 * @return mixed
	 */
	protected static function getPossibleDataAtPath( array $data, string $path, &$is_group = false ) {
		$branches = explode( '.#', $path );

		if ( 1 < count( $branches ) ) {
			$is_group      = true;
			$possible_data = self::lodashGet( $data, $branches[0] );

			// Loop throw top branches and build out the possible data options.
			if ( ! empty( $possible_data ) && is_array( $possible_data ) ) {
				foreach ( $possible_data as &$next_data ) {
					if ( ! is_array( $next_data ) ) {
						continue;
					}

					$next_data = self::getPossibleDataAtPath(
						$next_data,
						ltrim( implode( '.#', array_slice( $branches, 1 ) ), '.' ),
						$is_group
					);
				}
			}

			return $possible_data;
		}

		return self::lodashGet( $data, $path, null );
	}

	/**
	 * Processes substring searches
	 *
	 * @param string $needle       String being searched for.
	 * @param string $haystack     String being searched.
	 * @param int    $search_type  Search operation enumeration.
	 *
	 * @return boolean
	 */
	protected static function findSubstring( $needle, $haystack, $search_type ) {
		switch( $search_type ) {
			case self::MESSAGE_EQUALS:
				return $needle === $haystack;
			case self::MESSAGE_CONTAINS:
				return false !== strpos( $haystack, $needle );
			case self::MESSAGE_STARTS_WITH:
				return static::startsWith( $needle, $haystack );
			case self::MESSAGE_ENDS_WITH:
				return static::endsWith( $needle, $haystack );
		}
	}

	/**
	 * Simple string startsWith function
	 *
	 * @param string $needle    String to search for
	 * @param string $haystack  String being searched.
	 *
	 * @return bool
	 */
	protected static function startsWith( $needle, $haystack ) {
		$len = strlen( $needle );
		return ( substr( $haystack, 0, $len ) === $needle );
	}

	/**
	 * Simple string endsWith function
	 *
	 * @param string $needle    String to search for
	 * @param string $haystack  String being searched.
	 *
	 * @return bool
	 */
	protected static function endsWith( $needle, $haystack ) {
		$len = strlen( $needle );
		if ( $len === 0 ) {
			return true;
		}
		return ( substr( $haystack, -$len ) === $needle );
	}

	/**
	 * Wrapper for IsTrue constraint.
	 *
	 * @return IsTrue
	 */
	public static function isTrue(): IsTrue {
        return new IsTrue;
    }

	/**
	 * Wrapper for IsEmpty constraint.
	 *
	 * @return IsEmpty
	 */
	public static function isEmpty(): IsEmpty {
        return new IsEmpty;
    }

	/**
	 * Wrapper for IsEqual constraint.
	 *
	 * @param mixed $value  Desired contained value
	 *
	 * @return IsEqual
	 */
    public static function isEqual( $value ): IsEqual {
        return new IsEqual( $value );
    }

	/**
	 * Wrapper for TraversableContainsIdentical constraint.
	 *
	 * @param mixed $value  Desired contained value
	 *
	 * @return TraversableContains
	 */
    public static function contains( $value, bool $checkForObjectIdentity = true, bool $checkForNonObjectIdentity = false ): TraversableContains {
        return new TraversableContains( $value, $checkForObjectIdentity, $checkForNonObjectIdentity );
    }

	/**
	 * Wrapper for IsNull constraint.
	 *
	 * @return IsNull
	 */
	public static function isNull(): IsNull {
        return new IsNull;
    }

	/**
	 * Wrapper for LogicalNot constraint.
	 *
	 * @return LogicalNot
	 */
    public static function logicalNot( Constraint $last_constraint ): LogicalNot {
        return new LogicalNot( $last_constraint );
    }
}
