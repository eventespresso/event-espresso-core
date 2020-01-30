<?php
/**
 * File holding various third party compatibility shims.
 */

/**
 * ACF compatibility
 */
add_action(
    'plugins_loaded',
    function () {
        if (function_exists('acf_include')) {
            add_filter(
                'acf/get_post_types',
                function ($post_types, $args) {
                    if (! empty($args['show_ui'])) {
                        $ee_post_types = get_post_types(array('show_ee_ui' => 1));
                        $ee_post_types = array_keys($ee_post_types);
                        $post_types = array_merge($post_types, $ee_post_types);
                        $post_types = array_unique($post_types);
                    }
                    return $post_types;
                },
                10,
                2
            );
        }
    },
    100
);
