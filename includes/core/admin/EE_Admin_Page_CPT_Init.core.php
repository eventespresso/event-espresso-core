<?php
abstract class EE_Admin_Page_CPT_Init extends EE_Admin_Page_Init {
	
	public function __construct() {
		parent::__construct();
	}



	public function do_initial_loads() {
		//we want to use the corresponding admin page object (but not route it!).  To do this we just set _routing to false.  That way this page object is being loaded on all pages to make sure we hook into admin properly.  But note... we are ONLY doing this if the given page is NOT pages we WANT to load ;)
		//This is important because we have hooks that help redirect custom post type saves
		if ( !isset( $_REQUEST['page'] ) || ( isset( $_REQUEST['page'] ) && $_REQUEST['page'] != $this->menu_slug ) ) {
			$this->_routing = FALSE;
			$this->_initialize_admin_page();
		} else {
			//normal init loads
			$this->_initialize_admin_page();
		}
	}
}