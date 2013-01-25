<?php 
function build_post_types() {
	register_post_type( 'espresso_event',
		array(
			'labels' => array(
				'name' => __( 'Event Posts' ),
				'singular_name' => __( 'Event' ),
				'add_new' => __( 'Add New' ),
				'add_new_item' => __( 'Add New Event' ),
				'edit' => __( 'Edit' ),
				'edit_item' => __( 'Edit Event' ),
				'new_item' => __( 'New Event' ),
				'view' => __( 'View Event' ),
				'view_item' => __( 'View Events' ),
				'search_items' => __( 'Search Events' ),
				'not_found' => __( 'No events found' ),
				'not_found_in_trash' => __( 'No events found in Trash' ),
				'parent' => __( 'Parent Event' ),
			),
			'supports' => array(
				'thumbnail' => __( 'Event Thumbnail' ),
			),
			'public' => true,
			'show_ui' => true,//Enable to show the GUI
			'inherit_type' => 'page',
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'menu_position' => 20,
			'menu_icon' => EVENT_ESPRESSO_PLUGINFULLURL.'images/events_icon_16.png',
			'query_var' => true,
			'capability_type' => 'post',
			'hierarchical' => false,
			'supports' => array( 'title', 'editor', 'excerpt', 'custom-fields', 'thumbnail', 'page-attributes','author' ),
			'rewrite' => array("slug" => "events"),
			'can_export' => 'false',
			'taxonomies' => array('category', 'espresso_event_category'),
		)
	);
}
add_action( 'init', 'build_post_types' );

/*function build_taxonomies() {
	register_taxonomy(
	'espresso_event_category',
	'espresso_event',
	array( 'hierarchical' => true, 'label' => 'Event Categories', 'query_var' => true, 'rewrite' => false )
	);
}
add_action( 'init', 'build_taxonomies' );*/