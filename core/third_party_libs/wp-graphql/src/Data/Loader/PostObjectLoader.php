<?php

namespace WPGraphQL\Data\Loader;

use GraphQL\Deferred;
use WPGraphQL\Model\Post;

/**
 * Class PostObjectLoader
 *
 * @package WPGraphQL\Data\Loader
 */
class PostObjectLoader extends AbstractDataLoader {

	/**
	 * Given array of keys, loads and returns a map consisting of keys from `keys` array and loaded
	 * posts as the values
	 *
	 * Note that order of returned values must match exactly the order of keys.
	 * If some entry is not available for given key - it must include null for the missing key.
	 *
	 * For example:
	 * loadKeys(['a', 'b', 'c']) -> ['a' => 'value1, 'b' => null, 'c' => 'value3']
	 *
	 * @param array $keys
	 *
	 * @return array
	 * @throws \Exception
	 */
	public function loadKeys( array $keys ) {

		if ( empty( $keys ) ) {
			return $keys;
		}

		/**
		 * Prepare the args for the query. We're provided a specific
		 * set of IDs, so we want to query as efficiently as possible with
		 * as little overhead as possible. We don't want to return post counts,
		 * we don't want to include sticky posts, and we want to limit the query
		 * to the count of the keys provided. The query must also return results
		 * in the same order the keys were provided in.
		 */
		$post_types = \WPGraphQL::get_allowed_post_types();
		$post_types = array_merge( $post_types, [ 'revision', 'nav_menu_item' ] );
		$args       = [
			'post_type'           => $post_types,
			'post_status'         => 'any',
			'posts_per_page'      => count( $keys ),
			'post__in'            => $keys,
			'orderby'             => 'post__in',
			'no_found_rows'       => true,
			'split_the_query'     => false,
			'ignore_sticky_posts' => true,
		];

		/**
		 * Ensure that WP_Query doesn't first ask for IDs since we already have them.
		 */
		add_filter(
			'split_the_query',
			function( $split, \WP_Query $query ) {
				if ( false === $query->get( 'split_the_query' ) ) {
					return false;
				}

				return $split;
			},
			10,
			2
		);

		new \WP_Query( $args );

		$loaded_posts = [];

		/**
		 * Loop over the posts and return an array of all_posts,
		 * where the key is the ID and the value is the Post passed through
		 * the model layer.
		 */
		foreach ( $keys as $key ) {

			/**
			 * The query above has added our objects to the cache
			 * so now we can pluck them from the cache to return here
			 * and if they don't exist we can throw an error, otherwise
			 * we can proceed to resolve the object via the Model layer.
			 */
			$post_object = get_post( (int) $key );

			if ( ! $post_object instanceof \WP_Post ) {
				$loaded_posts[ $key ] = null;
			}

			/**
			 * If there's a Post Author connected to the post, we need to resolve the
			 * user as it gets set in the globals via `setup_post_data()` and doing it this way
			 * will batch the loading so when `setup_post_data()` is called the user
			 * is already in the cache.
			 */
			$context     = $this->context;
			$user_id     = null;
			$post_parent = null;

			if ( ! empty( $post_object->post_author ) && absint( $post_object->post_author ) ) {

				if ( ! empty( $post_object->post_author ) ) {
					$user_id = $post_object->post_author;
					$this->context->getLoader( 'user' )->buffer( [ $user_id ] );
				}
			}

			if ( 'revision' === $post_object->post_type && ! empty( $post_object->post_parent ) && absint( $post_object->post_parent ) ) {
				$post_parent = $post_object->post_parent;
				$this->context->getLoader( 'post_object' )->buffer( [ $post_parent ] );
			}

			/**
			 * This is a deferred function that allows us to do batch loading
			 * of dependant resources. When the Model Layer attempts to determine
			 * access control of a Post, it needs to know the owner of it, and
			 * if it's a revision, it needs the Parent.
			 *
			 * This deferred function allows for the objects to be loaded all at once
			 * instead of loading once per entity, thus reducing the n+1 problem.
			 */
			$load_dependencies = new Deferred(
				function() use ( $post_object, $user_id, $post_parent, $context ) {

					if ( ! empty( $user_id ) ) {
						$context->getLoader( 'user' )->load( $user_id );
					}
					if ( ! empty( $post_parent ) ) {
						$context->getLoader( 'post_object' )->load( $post_parent );
					}

					/**
					 * Run an action when the dependencies are being loaded for
					 * Post Objects
					 */
					do_action( 'graphql_post_object_loader_load_dependencies', $this, $post_object );

					return;
				}
			);

			/**
			 * Once dependencies are loaded, return the Post Object
			 */
			$loaded_posts[ $key ] = $load_dependencies->then(
				function() use ( $post_object ) {
					$post = new Post( $post_object );
					if ( ! isset( $post->fields ) || empty( $post->fields ) ) {
						return null;
					}
					return $post;
				}
			);

		}

		return ! empty( $loaded_posts ) ? $loaded_posts : [];

	}

}
