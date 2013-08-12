<?php

function get_custom_post_type_template($single_template) {
     global $post;

     if ($post->post_type == 'my_post_type') {
          $single_template = dirname( __FILE__ ) . '/post-type-template.php';
     }
     return $single_template;
}
add_filter( "single_template", "get_custom_post_type_template" ) ;





function get_custom_post_type_template($single_template) {
     global $post;

     if ($post->post_type == 'my_post_type') {
          $single_template = dirname( __FILE__ ) . '/post-type-template.php';
     }
     return $single_template;
}
add_filter( "archive_template", "plugin_function_name" );
