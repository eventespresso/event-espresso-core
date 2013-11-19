## What goes in the "extend" Folder?

The caffeinated/extend folder is where you place any funcionality that *extends* existing functionality found in a core EE_Admin_Page file.  

**When would you want to do that?** Typically, there will be times where the entire functionality of a *route* within the core file is being replaced (vs. just hooking into the existing route).  This is where extending becomes useful because you can extend the original Core class and just modify the properties/methods that need the new functionality.

For the purpose of this document we'll assume you are extending the core Events_Admin_Page class.  Here's how you would do so.


### 1. Create a folder matching what you are extending.

Since *Events_Admin_Page.core.php* is found in 'admin/events/'.  Your new folder would be 'caffeinated/extend/events/'.  This enables the automatic caffeinated loader to know what you are connecting your extended page with.

### 2. Create a file containing the extending class.

It is important you follow a very specific naming format for the extending file and class:

'Extend_Events_Admin_Page.core.php'  is the file
'Extend_Events_Admin_Page' is the classname

Notice basically the format of the file and classname is the word "Extend_" followed by the original core file and classname.

### 3. Initialize the extending class properly.
All you have to do within the new extend file (eg. 'Extend_Events_Admin_Page.core.php') is something like this.

	class Extend_Events_Admin_Page extends Events_Admin_Page {

		public function __construct() {
			parent::__construct();
		}
	}


Then of course you would override any methods or redefine any configuration arrays in the new class.  For example:  If I wanted to add a new route and config in the core Events_Admin_Page class one way of doing it is like this:

	class Extend_Events_Admin_Page extends Events_Admin_Page {


		public function __construct() {
			parent::__construct();
		}


		protected function _extend_page_config() {
			$this->_page_routes['new_route'] = '_new_route_callback';

			$this->_page_config['new_route'] = array(
				'nav' => array(
					'label' => __('New Tab', 'event_espresso'),
					'order' => 60
					),
				);
		}



		protected function _new_route_callback() {
			$this->_template_args['admin_page_content'] =  'this is a test';
			$this->display_admin_page_with_no_sidebar();
		}

	}

The *_extend_page_config()* method is a special custom "magic" method made available via the EE_Admin_Page class that allows you to override or add to existing page configuration arrays from the core class.