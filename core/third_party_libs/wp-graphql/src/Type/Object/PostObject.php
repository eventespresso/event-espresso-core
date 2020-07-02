<?php

namespace WPGraphQL\Type\Object;

use WPGraphQL\Model\Post;
use WPGraphQL\Registry\TypeRegistry;

/**
 * WPObject - PostObject
 *
 * @package WPGraphQL\Type
 */
class PostObject {

	/**
	 * Registers a post_type WPObject type to the schema.
	 *
	 * @param \WP_Post_Type $post_type_object Post type.
	 * @param TypeRegistry  $type_registry    The Type Registry
	 */
	public static function register_post_object_types( $post_type_object, $type_registry ) {

		$single_name = $post_type_object->graphql_single_name;

		$interfaces = [ 'Node', 'ContentNode', 'UniformResourceIdentifiable' ];

		if ( post_type_supports( $post_type_object->name, 'title' ) ) {
			$interfaces[] = 'NodeWithTitle';
		}

		if ( post_type_supports( $post_type_object->name, 'editor' ) ) {
			$interfaces[] = 'NodeWithContentEditor';
		}

		if ( post_type_supports( $post_type_object->name, 'author' ) ) {
			$interfaces[] = 'NodeWithAuthor';
		}

		if ( post_type_supports( $post_type_object->name, 'thumbnail' ) ) {
			$interfaces[] = 'NodeWithFeaturedImage';
		}

		if ( post_type_supports( $post_type_object->name, 'excerpt' ) ) {
			$interfaces[] = 'NodeWithExcerpt';
		}

		if ( post_type_supports( $post_type_object->name, 'comments' ) ) {
			$interfaces[] = 'NodeWithComments';
		}

		if ( post_type_supports( $post_type_object->name, 'trackbacks' ) ) {
			$interfaces[] = 'NodeWithTrackbacks';
		}

		if ( post_type_supports( $post_type_object->name, 'revisions' ) ) {
			$interfaces[] = 'NodeWithRevisions';
		}

		if ( post_type_supports( $post_type_object->name, 'page-attributes' ) ) {
			$interfaces[] = 'NodeWithPageAttributes';
		}

		if ( $post_type_object->hierarchical || in_array(
			$post_type_object->name,
			[
				'attachment',
				'revision',
			],
			true
		) ) {
			$interfaces[] = 'HierarchicalContentNode';
		}

		register_graphql_object_type(
			$single_name,
			[
				/* translators: post object singular name w/ description */
				'description' => sprintf( __( 'The %s type', 'wp-graphql' ), $single_name ),
				'interfaces'  => $interfaces,
				'fields'      => self::get_post_object_fields( $post_type_object, $type_registry ),
			]
		);

		/**
		 * Register fields to the Type used for attachments (MediaItem)
		 */
		if ( 'attachment' === $post_type_object->name && true === $post_type_object->show_in_graphql && isset( $post_type_object->graphql_single_name ) ) {

			/**
			 * Register fields custom to the MediaItem Type
			 */
			register_graphql_fields(
				$post_type_object->graphql_single_name,
				[
					'caption'      => [
						'type'        => 'String',
						'description' => __( 'The caption for the resource', 'wp-graphql' ),
						'args'        => [
							'format' => [
								'type'        => 'PostObjectFieldFormatEnum',
								'description' => __( 'Format of the field output', 'wp-graphql' ),
							],
						],
						'resolve'     => function( $source, $args ) {
							if ( isset( $args['format'] ) && 'raw' === $args['format'] ) {
								// @codingStandardsIgnoreLine.
								return $source->captionRaw;
							}

							// @codingStandardsIgnoreLine.
							return $source->captionRendered;
						},
					],
					'altText'      => [
						'type'        => 'String',
						'description' => __( 'Alternative text to display when resource is not displayed', 'wp-graphql' ),
					],
					'srcSet'       => [
						'type'        => 'string',
						'args'        => [
							'size' => [
								'type'        => 'MediaItemSizeEnum',
								'description' => __( 'Size of the MediaItem to calculate srcSet with', 'wp-graphql' ),
							],
						],
						'description' => __( 'The srcset attribute specifies the URL of the image to use in different situations. It is a comma separated string of urls and their widths.', 'wp-graphql' ),
						'resolve'     => function( $source, $args ) {
							$size = 'medium';
							if ( ! empty( $args['size'] ) ) {
								$size = $args['size'];
							}

							$src_set = wp_get_attachment_image_srcset( $source->ID, $size );

							return ! empty( $src_set ) ? $src_set : null;
						},
					],
					'sizes'        => [
						'type'        => 'string',
						'args'        => [
							'size' => [
								'type'        => 'MediaItemSizeEnum',
								'description' => __( 'Size of the MediaItem to calculate sizes with', 'wp-graphql' ),
							],
						],
						'description' => __( 'The sizes attribute value for an image.', 'wp-graphql' ),
						'resolve'     => function( $source, $args ) {
							$size = 'medium';
							if ( ! empty( $args['size'] ) ) {
								$size = $args['size'];
							}

							$url = wp_get_attachment_image_src( $source->ID, $size );
							if ( empty( $url[0] ) ) {
								return null;
							}

							$sizes = wp_calculate_image_sizes( $size, $url[0], null, $source->ID );

							return ! empty( $sizes ) ? $sizes : null;
						},
					],
					'description'  => [
						'type'        => 'String',
						'description' => __( 'Description of the image (stored as post_content)', 'wp-graphql' ),
						'args'        => [
							'format' => [
								'type'        => 'PostObjectFieldFormatEnum',
								'description' => __( 'Format of the field output', 'wp-graphql' ),
							],
						],
						'resolve'     => function( $source, $args ) {
							if ( isset( $args['format'] ) && 'raw' === $args['format'] ) {
								// @codingStandardsIgnoreLine.
								return $source->descriptionRaw;
							}

							// @codingStandardsIgnoreLine.
							return $source->descriptionRendered;
						},
					],
					'mediaItemUrl' => [
						'type'        => 'String',
						'description' => __( 'Url of the mediaItem', 'wp-graphql' ),
					],
					'mediaType'    => [
						'type'        => 'String',
						'description' => __( 'Type of resource', 'wp-graphql' ),
					],
					'sourceUrl'    => [
						'type'        => 'String',
						'description' => __( 'Url of the mediaItem', 'wp-graphql' ),
						'args'        => [
							'size' => [
								'type'        => 'MediaItemSizeEnum',
								'description' => __( 'Size of the MediaItem to return', 'wp-graphql' ),
							],
						],
						'resolve'     => function( $image, $args, $context, $info ) {
							// @codingStandardsIgnoreLine.
							$size = null;
							if ( isset( $args['size'] ) ) {
								$size = ( 'full' === $args['size'] ) ? 'large' : $args['size'];
							}

							return ! empty( $size ) ? $image->sourceUrlsBySize[ $size ] : $image->sourceUrl;
						},
					],
					'mimeType'     => [
						'type'        => 'String',
						'description' => __( 'The mime type of the mediaItem', 'wp-graphql' ),
					],
					'mediaDetails' => [
						'type'        => 'MediaDetails',
						'description' => __( 'Details about the mediaItem', 'wp-graphql' ),
					],
				]
			);
		}
	}

	/**
	 * Registers common post type fields on schema type corresponding to provided post type object.
	 *
	 * @param \WP_Post_Type $post_type_object Post type.
	 * @param TypeRegistry  $type_registry    The Type Registry
	 *
	 * @return array
	 */
	public static function get_post_object_fields( $post_type_object, $type_registry ) {
		$single_name = $post_type_object->graphql_single_name;
		$fields      = [
			'id'                => [
				'description' => sprintf(
				/* translators: %s: custom post-type name */
					__( 'The globally unique identifier of the %s object.', 'wp-graphql' ),
					$post_type_object->name
				),
			],
			$single_name . 'Id' => [
				'type'              => [
					'non_null' => 'Int',
				],
				'deprecationReason' => __( 'Deprecated in favor of the databaseId field', 'wp-graphql' ),
				'description'       => __( 'The id field matches the WP_Post->ID field.', 'wp-graphql' ),
				'resolve'           => function( Post $post, $args, $context, $info ) {
					return absint( $post->ID );
				},
			],
		];

		if ( 'page' === $post_type_object->name ) {
			$fields['isFrontPage'] = [
				'type'        => [ 'non_null' => 'Bool' ],
				'description' => __( 'Whether this page is set to the static front page.', 'wp-graphql' ),
				'resolve'     => function( Post $page ) {
					return isset( $page->isFrontPage ) ? (bool) $page->isFrontPage : false;
				},
			];
		}

		if ( ! $post_type_object->hierarchical &&
			! in_array(
				$post_type_object->name,
				[
					'attachment',
					'revision',
				],
				true
			) ) {
			$fields['ancestors']['deprecationReason'] = __( 'This content type is not hierarchical and typcially will not have ancestors', 'wp-graphql' );
			$fields['parent']['deprecationReason']    = __( 'This content type is not hierarchical and typcially will not have a parent', 'wp-graphql' );
		}

		$fields['template'] = [
			'description' => __( 'The template assigned to the node', 'wp-graphql' ),
			'type'        => 'ContentTemplateUnion',
			'resolve'     => function( Post $post_object, $args, $context, $info ) use ( $post_type_object, $type_registry ) {

				$registered_templates = wp_get_theme()->get_post_templates();
				if ( ! isset( $registered_templates[ $post_object->post_type ] ) ) {
					return null;
				}

				$set_template = get_post_meta( $post_object->ID, '_wp_page_template', true );

				$template_name = get_page_template_slug( $post_object->ID );

				$template = [
					'__typename'   => 'DefaultTemplate',
					'templateName' => ! empty( $template_name ) ? $template_name : 'Default',
				];

				if ( ! empty( $registered_templates[ $post_object->post_type ][ $set_template ] ) ) {
					$name     = ucwords( $registered_templates[ $post_object->post_type ][ $set_template ] );
					$name     = preg_replace( '/[^\w]/', '', $name );
					$template = [
						'__typename'   => $name . 'Template',
						'templateName' => ucwords( $registered_templates[ $post_object->post_type ][ $set_template ] ),
					];
				}

				return $template;
			},
		];

		return $fields;

	}
}
