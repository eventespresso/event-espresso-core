<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

function espresso_system_check() {
	global $caffeinated;
	$caffeinated = defined('EE_CAFFEINATED') ? EE_CAFFEINATED : TRUE;
	return $caffeinated;
}

//make sure EVENT_ESPRESSO_UPLOAD_DIR is defined

if ( !defined('EVENT_ESPRESSO_UPLOAD_DIR' ) ) {
	$uploads = wp_upload_dir();
	$upload_dir = $uploads['basedir'] . DIRECTORY_SEPARATOR . 'espresso' . DIRECTORY_SEPARATOR;
} else {
	$upload_dir = EVENT_ESPRESSO_UPLOAD_DIR;
}

//Custom includes support
if (file_exists( $upload_dir . "custom_includes.php")){
	require_once($upload_dir . "custom_includes.php");
}

//Custom functions support
if (file_exists($upload_dir . "custom_functions.php")){
	require_once($upload_dir . "custom_functions.php");
}

//Custom shortcode support
if (file_exists($upload_dir . "custom_shortcodes.php")){
	require_once($upload_dir . "custom_shortcodes.php");
}


//the below is just experimental for how we'll utilize built in WP admin page stuff for custom post type pages (so we don't have to rewrite a lot of the pages).  So we're just going to register a dummy post type.
add_action( 'init', 'ee_experiment_create_post_type');
function ee_experiment_create_post_type() {
	 $labels = array(
	    'name' => 'Books',
	    'singular_name' => 'Book',
	    'add_new' => 'Add New',
	    'add_new_item' => 'Add New Book',
	    'edit_item' => 'Edit Book',
	    'new_item' => 'New Book',
	    'all_items' => 'All Books',
	    'view_item' => 'View Book',
	    'search_items' => 'Search Books',
	    'not_found' =>  'No books found',
	    'not_found_in_trash' => 'No books found in Trash', 
	    'parent_item_colon' => '',
	    'menu_name' => 'Books'
	  );

	  $args = array(
	    'labels' => $labels,
	    'public' => true,
	    'publicly_queryable' => true,
	    'show_ui' => false, 
	    'show_in_menu' => false, 
	    'query_var' => true,
	    'rewrite' => array( 'slug' => 'book' ),
	    'capability_type' => 'post',
	    'has_archive' => true, 
	    'hierarchical' => false,
	    'menu_position' => null,
	    'supports' => array( 'revisions', 'custom-fields', 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
	  ); 

  register_post_type( 'espresso_books', $args );
}