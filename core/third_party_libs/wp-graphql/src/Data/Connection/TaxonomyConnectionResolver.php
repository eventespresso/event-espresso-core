<?php
namespace WPGraphQL\Data\Connection;

use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQLRelay\Relay;
use WPGraphQL\AppContext;
use WPGraphQL\Model\Taxonomy;
use WPGraphQL\Model\Term;

/**
 * Class TaxonomyConnectionResolver
 *
 * @package WPGraphQL\Data\Connection
 */
class TaxonomyConnectionResolver extends AbstractConnectionResolver {

	/**
	 * ContentTypeConnectionResolver constructor.
	 *
	 * @param mixed       $source     source passed down from the resolve tree
	 * @param array       $args       array of arguments input in the field as part of the GraphQL query
	 * @param AppContext  $context    Object containing app context that gets passed down the resolve tree
	 * @param ResolveInfo $info       Info about fields passed down the resolve tree
	 *
	 * @throws Exception
	 */
	public function __construct( $source, array $args, AppContext $context, ResolveInfo $info ) {
		parent::__construct( $source, $args, $context, $info );
	}

	public function has_next_page() {

		$last_key = array_key_last( $this->get_ids_for_nodes() );
		$index    = array_search( $last_key, array_keys( $this->get_ids() ), true );
		$count    = count( $this->get_ids() );

		if ( ! empty( $this->args['first'] ) ) {
			return $index + 1 < $count;
		}

		return false;
	}

	public function has_previous_page() {
		$first_key = array_key_first( $this->get_ids_for_nodes() );
		$index     = array_search( $first_key, array_keys( $this->get_ids() ), true );

		if ( ! empty( $this->args['last'] ) ) {
			return $index > 0;
		}

		return false;
	}

	/**
	 * @return bool|int|mixed|null|string
	 */
	public function get_offset() {
		$offset = null;
		if ( ! empty( $this->args['after'] ) ) {
			$offset = substr( base64_decode( $this->args['after'] ), strlen( 'arrayconnection:' ) );
		} elseif ( ! empty( $this->args['before'] ) ) {
			$offset = substr( base64_decode( $this->args['before'] ), strlen( 'arrayconnection:' ) );
		}
		return $offset;
	}

	/**
	 * Get the IDs from the source
	 *
	 * @return array|mixed|null
	 */
	public function get_ids() {

		if ( isset( $this->query_args['name'] ) ) {
			return [ $this->query_args['name'] ];
		}

		if ( isset( $this->query_args['in'] ) ) {
			return is_array( $this->query_args['in'] ) ? $this->query_args['in'] : [ $this->query_args['in'] ];
		}

		$ids     = [];
		$queried = $this->get_query();

		if ( empty( $queried ) ) {
			return $ids;
		}

		foreach ( $queried as $key => $item ) {
			$ids[ $key ] = $item;
		}

		return $ids;

	}

	/**
	 * @return array
	 */
	public function get_query_args() {

		return [
			'show_in_graphql' => true,
		];

	}


	/**
	 * Get the items from the source
	 *
	 * @return array|mixed|null
	 */
	public function get_query() {
		$query_args = $this->get_query_args();
		return get_taxonomies( $query_args );
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_ids_for_nodes() {
		if ( empty( $this->ids ) ) {
			return [];
		}

		$ids = $this->ids;

		// If pagination is going backwards, revers the array of IDs
		$ids = ! empty( $this->args['last'] ) ? array_reverse( $ids ) : $ids;

		if ( ! empty( $this->get_offset() ) ) {
			// Determine if the offset is in the array
			$keys = array_keys( $ids );
			$key  = array_search( $this->get_offset(), $keys, true );

			if ( false !== $key ) {
				$key = absint( $key );
				if ( ! empty( $this->args['before'] ) ) {
					// Slice the array from the back.
					$ids = array_slice( $ids, $key + 1, $this->get_query_amount(), true );
				} else {
					// Slice the array from the front.
					$key ++;
					$ids = array_slice( $ids, $key, null, true );
				}
			}
		}

		$ids = array_slice( $ids, 0, $this->query_amount, true );
		return ! empty( $this->args['last'] ) ? array_reverse( $ids ) : $ids;

	}

	/**
	 * The name of the loader to load the data
	 *
	 * @return string
	 */
	public function get_loader_name() {
		return 'taxonomy';
	}

	/**
	 * Determine if the offset used for pagination is valid
	 *
	 * @param mixed $offset
	 *
	 * @return bool
	 */
	public function is_valid_offset( $offset ) {
		return (bool) get_taxonomy( $offset );
	}

	/**
	 * Determine if the query should execute
	 *
	 * @return bool
	 */
	public function should_execute() {
		return true;
	}

}
