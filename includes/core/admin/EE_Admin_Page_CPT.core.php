<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link				{@link http://www.eventespresso.com}
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------
 */
	


/**
 * EE_Admin_Page_CPT class
 *
 * This class is for child classes that utilize core WP CPT views for add/edit pages.  All you have to do is extend this class instead of the usual EE_Admin_Page class for your child.
 *
 * Please not the following caveats:
 *
 * 1. When using add_meta_box() - it must use $this->wp_page_slug as the screen_id for the page NOT $this->_current_screen->id.  This is b/c there is a bug with how WP renders its custom post type pages that doesn't accept the default current_screen for metaboxes.
 *
 * 2. the same is true for any help_tabs or screen_options you want to add to custom post type views.
 *
 * 3. it is EXPECTED that $this->page_slug will be IDENTICAL to what slug/id was used when doing register_post_type().  So for instance, if you registered a "books" post type then $this->page_slug = 'espresso_books'  would NOT be valid.  So the correct id for the new post type would be "espresso_books".  Remember, you can still use something totally different for front-end rewrite slugs in your configuration array for the register post type.
 * 
 * @package		Event Espresso
 * @subpackage 	includes/core/admin/EE_Admin_Page.core.php
 * @abstract
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Admin_Page_CPT extends EE_Admin_Page {
	

	/**
	 * This gets set in _setup_cpt
	 * It will contain the object for the custom post type.
	 * @var object
	 */
	protected $_cpt_object;



	/**
	 * a boolean flag to set whether the current route is a cpt route or not.
	 * @var bool
	 */
	protected $_cpt_route = FALSE;






	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}






	/**
	 * This is hooked into the WordPress do_action('save_post') hook and runs after the custom post type has been saved.  Child classes are required to declare this method.  Typically you would use this to save any additional data.
	 *
	 * Keep in mind also that "save_post" runs on EVERY post update to the database.  
	 * ALSO very important.  When a post transitions from scheduled to published, the save_post action is fired but you will NOT have any _POST data containing any extra info you may have from other meta saves.  So MAKE sure that you handle this accordingly.
	 *
	 * @access public
	 * @abstract
	 * @param  string $post_id The ID of the cpt that was saved (so you can link relationally)
	 * @param  object $post    The post object of the cpt that was saved. 
	 * @return void          
	 */
	abstract public function insert_update_cpt_item( $post_id, $post );




	/**
	 * This is hooked into the WordPress do_action('trashed_post') hook and runs after a cpt has been trashed.
	 *
	 * @abstract
	 * @access public
	 * @param  string $post_id The ID of the cpt that was trashed
	 * @return void
	 */
	abstract public function trash_cpt_item( $post_id );





	/**
	 * This is hooked into the WordPress do_action('untrashed_post') hook and runs after a cpt has been untrashed
	 * @param  string $post_id theID of the cpt that was untrashed
	 * @return void
	 */
	abstract public function restore_cpt_item( $post_id );





	/**
	 * This is hooked into the WordPress do_action('delete_cpt_item') hook and runs after a cpt has been fully deleted from the db
	 * @param  string $post_id the ID of the cpt that was deleted
	 * @return void
	 */
	abstract public function delete_cpt_item( $post_id );




	/**
	 * Just utilizing the method EE_Admin exposes for doing things before page setup.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _before_page_setup() {
		$this->_cpt_object = get_post_type_object( $this->page_slug );
	}




	/**
	 * This takes care of setting up default routes and pages that utilize the core WP admin pages.  Child classes can override the defaults (in cases for adding metaboxes etc.) but take care that you include the defaults here otherwise your core WP admin pages for the cpt won't work!
	 *
	 * @access protected
	 * @return void
	 */
	protected function _extend_page_config() {
				
		$this->_cpt_route = $this->_req_action == 'create_new' || $this->_req_action == 'edit' ? TRUE : FALSE;
		add_action('filter_hook_espresso_admin_load_page_dependencies', array( $this, 'modify_current_screen') );


		if ( empty( $this->_cpt_object ) ) {
			$msg = sprintf( __('This page has been set as being related to a registered custom post type, however, the custom post type object could not be retrieved because the slug for the page does NOT match the reference for the registered custome post type.  The slug used, "%s" must be what you use to register the associated custom post type'), $this->page_slug );
			throw new EE_Error( $msg );
		}


		$this->_page_routes = array_merge( array(
			'create_new' => '_create_new_cpt_item',
			'edit' => '_edit_cpt_item'
			), $this->_page_routes );


		$this->_page_config = array_merge( array(
			'create_new' => array(
				'nav' => array(
					'label' => $this->_cpt_object->labels->add_new_item,
					'order' => 5
					),
				),
			'edit' => array(
				'nav' => array(
					'label' => $this->_cpt_object->labels->edit_item,
					'order' => 5,
					'persistent' => false,
					'url' => ''
					)
				) ),
			$this->_page_config
		);

		


		//now let's do some automatic filters into the wp_system and we'll check to make sure the CHILD class automatically has the required methods in place.
		
		//the following filters are for setting all the redirects on DEFAULT WP custom post type actions	
		//let's add a hidden input to the post-edit form so we know when we have to trigger our custom redirects!  Otherwise the redirects will happen on ALL post saves which wouldn't be good of course!
		add_action('edit_form_after_title', array( $this, 'cpt_post_form_hidden_input') );

		//inject our Admin page nav tabs...
		add_action('post_edit_form_tag', array( $this, 'inject_nav_tabs' ) );

		//modify the post_updated messages array
		add_action('post_updated_messages', array( $this, 'post_update_messages' ), 10 );

		
	}


	/**
	 * admin_init_global
	 * This runs all the code that we want executed within the WP admin_init hook.
	 * This method executes for ALL EE Admin pages.
	 *
	 * @access public
	 * @return void
	 */
	public function admin_init_global() {
		add_filter('redirect_post_location', array( $this, 'cpt_post_location_redirect'), 10, 2 );

		//NOTE we ONLY want to run these hooks if we're on the right class for the given post type.  Otherwise we could see some really freaky things happen!
		//try to get post type from $_POST data
		$post_type = isset( $this->_req_data['post_type'] ) ? $this->_req_data['post_type'] : FALSE;

		if ( $post_type && $post_type == $this->page_slug ) {

			if ( has_action('save_post', array( $this, 'insert_update_cpt_item') ) ) {
				var_dump('yup');
			}

			//$post_id, $post
			add_action('save_post', array( $this, 'insert_update_cpt_item'), 10, 2 );
			//$post_id
			add_action('trashed_post', array( $this, 'trash_cpt_item' ), 10 );
			add_action('untrashed_post', array( $this, 'restore_cpt_item'), 10 );
			add_action('after_delete_post', array( $this, 'delete_cpt_item'), 10 );
		}
	}




	/**
	 * Execution of this method is added to the end of the load_page_dependencies method in the parent, so that we can fix a bug where default core metaboxes weren't being called in the sidebar.  To fix we have to reset the current_screen using the page_slug (which is identical - or should be - to our registered_post_type id.)
	 *
	 * Also, since the core WP file loads the admin_header.php for WP (and there are a bunch of other things edit-form-advanced.php loads that need to happen really early) we need to load it NOW, hence our _route_admin_request in here. (Otherwise screen options won't be set).
	 * 
	 * @return void
	 */
	public function modify_current_screen() {
		//ONLY do this if the current page_route IS a cpt route
		if ( !$this->_cpt_route ) return;
		//routeing things REALLY early b/c this is a cpt admin page
		set_current_screen( $this->page_slug );
		$this->_current_screen = get_current_screen();
		$this->_current_screen->base = 'event-espresso'; 
		try {
			$this->_route_admin_request();
		} catch ( EE_Error $e ) {
			$e->get_error();
		}
	}




	/**
	 * overriding the parent route_admin_request method so we DON'T run the route twice on cpt core page loads (it's already run in modify_current_screen())
	 * @return void
	 */
	public function route_admin_request() {
		if ( $this->_cpt_route ) return;
		try {
			$this->_route_admin_request();
		} catch ( EE_Error $e ) {
			$e->get_error();
		}
	}




	/**
	 * Add a hidden form input to cpt core pages so that we know to do redirects to our routes on saves
	 * @return string html
	 */
	public function cpt_post_form_hidden_input() {
		echo '<input type="hidden" name="ee_cpt_item_redirect_url" value="' . $this->_admin_base_url . '" />';
	}




	/**
	 * This is the callback for the 'redirect_post_location' filter in wp-admin/post.php so that we can hijack the default redirect locations for wp custom post types that WE'RE using and send back to OUR routes.
	 * @param  string $location This is the incoming currently set redirect location
	 * @param  string $post_id  This is the 'ID' value of the wp_posts table
	 * @return string           the new location to redirect to
	 */
	public function cpt_post_location_redirect( $location, $post_id ) {
		//first let's see if we should even do a redirect
		if ( !isset( $this->_req_data['ee_cpt_item_redirect_url'] ) )
			return $location;


		//shared query_args
		$query_args = array( 'action' => 'edit', 'id' => $post_id );
		$admin_url = $this->_req_data['ee_cpt_item_redirect_url'];
		$message = '';
		$append = '';

		if ( isset( $this->_req_data['save'] ) || isset( $this->_req_data['publish'] ) ) {
			$status = get_post_status( $post_id );
			if ( isset( $this->_req_data['publish'] ) ) {
				switch ( $status ) {
					case 'pending':
						$message = 8;
						break;
					case 'future':
						$message = 9;
						break;
					default:
						$message = 6;
				}
			} else {
					$message = 'draft' == $status ? 10 : 1;
			}
		} else if ( isset( $this->_req_data['addmeta']) && $this->_req_data['addmeta'] ) {
			$message = 2;
			$append = '#postcustom';
		} else if ( isset( $this->_req_data['deletemeta']) && $this->_req_data['deletemeta'] ) {
			$message = 3;
			$append = '#postcustom';
		} elseif ( $this->_req_data['action'] == 'post-quickpress-save-cont' ) {
			$message = 7;
		} else {
			$message = 4;
		}

		$query_args = array_merge( array( 'message' => $message ), $query_args );
		return self::add_query_args_and_nonce( $query_args, $admin_url );
	}



	/**
	 * This method is called to inject nav tabs on core WP cpt pages
	 *
	 * @access public
	 * @return string html
	 */
	public function inject_nav_tabs() {
		//can we hijack and insert the nav_tabs?
		$nav_tabs = $this->_get_main_nav_tabs();
		//first close off existing form tag
		$html = '>';
		$html .= $nav_tabs;
		//now let's handle the remaining tag
		$html .= '<span></span';
		echo $html;
	}




	/**
	 * This just sets up the post update messages when an update form is loaded
	 *
	 * @access public
	 * @param  array $messages the original messages array
	 * @return array           the new messages array
	 */
	public function post_update_messages( $messages ) {
		global $post;
		$id = isset( $this->_req_data['id'] ) ? $this->_req_data['id'] : NULL;
		$id = empty( $id ) && is_object( $post ) ? $post->ID : NULL;

		$messages[$this->page_slug] = array(
			0 => '', //Unused. Messages start at index 1.
			1 => sprintf( __( '%1$s updated. <a href="%2$s">View %1$s</a>', 'event_espresso'), $this->_cpt_object->labels->singular_name, esc_url( get_permalink( $id ) ) ),
			2 => __('Custom field updated'),
			3 => __('Custom field deleted.'),
			4 => sprintf( __( '%1$s updated.', 'event_espresso'), $this->_cpt_object->labels->singular_name ),
			5 => isset( $_GET['revision'] ) ? sprintf( __('%s restored to revision from %s', 'event_espresso'), $this->_cpt_object->labels->singular_name, wp_post_revision_title( (int) $_GET['revision'], FALSE ) ) : FALSE,
			6 => sprintf( __( '%1$s published. <a href="%2$s">View %1$s</a>', 'event_espresso'), $this->_cpt_object->labels->singular_name, esc_url( get_permalink( $id ) ) ),
			7 => sprintf( __( '%1$s saved.', 'event_espresso'), $this->_cpt_object->labels->singular_name ),
			8 => sprintf( __('%1$s submitted. <a target="_blank" href="%s">Preview %1$s</a>'), $this->_cpt_object->labels->singular_name, esc_url( add_query_arg( 'preview', 'true', get_permalink($id) ) ) ),
			9 => sprintf( __('%1$s scheduled for: <strong>%2$s</strong>. <a target="_blank" href="%3$s">Preview %1$s</a>'), $this->_cpt_object->labels->singular_name, date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink($id) ) ),
			10 => sprintf( __('%1$s draft updated. <a target="_blank" href="%s">Preview page</a>'), $this->_cpt_object->labels->singular_name, esc_url( add_query_arg( 'preview', 'true', get_permalink($id) ) ) )
			);
		return $messages;
	}







	/**
	 * default method for the 'create_new' route for cpt admin pages.
	 * For reference what to include in here, see wp-admin/post-new.php
	 *
	 * @access  protected
	 * @return string template for add new cpt form
	 */
	protected function _create_new_cpt_item() {
		global $post;
		$this->_template_args['post_type'] = $this->page_slug;
		$this->_template_args['post_type_object'] = $this->_cpt_object;
		$this->_template_args['title'] = $this->_template_args['post_type_object']->labels->add_new_item;
		$this->_template_args['editing'] = TRUE;
		wp_enqueue_script( 'autosave' );
		$this->_template_args['post'] = $post = get_default_post_to_edit( $this->page_slug, TRUE );
		$this->_template_args['post_ID'] = $this->_template_args['post']->ID;
		$template = WP_ADMIN_PATH . 'edit-form-advanced.php';

		espresso_display_template( $template, $this->_template_args );
	}





	/**
	 * default method for the 'edit' route for cpt admin pages
	 *
	 * For reference on what to put in here, refer to wp-admin/post.php
	 *
	 * @access protected
	 * @return string   template for edit cpt form
	 */			
	protected function _edit_cpt_item() {
		global $post;
		$post_id = isset( $this->_req_data['id'] ) ? $this->_req_data['id'] : NULL;
		$post = !empty( $post_id ) ? get_post( $post_id, OBJECT, 'edit' ) : NULL;

		if ( empty ( $post ) ) {
			wp_die( __('You attempted to edit an item that doesn&#8217;t exist. Perhaps it was deleted?') );
		}


		$this->_template_args['editing'] = TRUE;
		$this->_template_args['post_ID'] = $post_id;
		$this->_template_args['post'] = $post;
		$this->_template_args['post_type'] = $this->page_slug;
		$this->_template_args['post_type_object'] = $this->_cpt_object;
		if ( $last = wp_check_post_lock( $post->ID ) ) {
			add_action('admin_notices', '_admin_notice_post_locked' );
		} else {
			$this->_template_args['active_post_lock'] = wp_set_post_lock( $post->ID );
			wp_enqueue_script('autosave');
		}

		$this->_template_args['title'] = $this->_cpt_object->labels->edit_item;

		if ( post_type_supports($this->page_slug, 'comments') ) {
			wp_enqueue_script('admin-comments');
			enqueue_comment_hotkeys_js();
		}

		$template = WP_ADMIN_PATH . 'edit-form-advanced.php';
		espresso_display_template( $template, $this->_template_args );

	}

}