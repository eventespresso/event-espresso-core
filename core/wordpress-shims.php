<?php
/**
 * This file contains shims for WordPress core functions that may not be found in WordPress versions that EE supports.
 * Note: this file should only be required right before calling the function the shim is for.  This is to ensure that
 * it does not override any existing definition of the function in WP.
 */
if ( ! function_exists( 'get_preview_post_link' ) ) {
    /**
     * Function was added in WordPress 4.4.0
     * @param null   $post
     * @param array  $query_args
     * @param string $preview_link
     * @return mixed
     */
    function get_preview_post_link($post = null, $query_args = array(), $preview_link = '')
    {
        $post = get_post($post);
        if (! $post) {
            return '';
        }

        $post_type_object = get_post_type_object($post->post_type);
        if (is_post_type_viewable($post_type_object)) {
            if (! $preview_link) {
                $preview_link = set_url_scheme(get_permalink($post));
            }

            $query_args['preview'] = 'true';
            $preview_link          = add_query_arg($query_args, $preview_link);
        }

        /**
         * Filters the URL used for a post preview.
         *
         * @since 2.0.5
         * @since 4.0.0 Added the `$post` parameter.
         * @param string  $preview_link URL used for the post preview.
         * @param WP_Post $post         Post object.
         */
        return apply_filters('preview_post_link', $preview_link, $post);
    }
}

if ( ! function_exists( 'is_post_type_viewable' ) ) {
    function is_post_type_viewable( $post_type ) {
        if ( is_scalar( $post_type ) ) {
            $post_type = get_post_type_object( $post_type );
            if ( ! $post_type ) {
                return false;
            }
        }
     
        return $post_type->publicly_queryable || ( $post_type->_builtin && $post_type->public );
    }
}