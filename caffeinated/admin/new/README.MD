## What goes in the "new" folder?

The "caffeinated/new/" folder is where any new EE_Admin_Page files/classes go that provide completely new functionality via pages.

For the purpose of this document we'll assume you are adding a brand new "Venues" system to EE and it requires some Admin pages for settings and managing venues.  Here's how you would do so.  Keep in mind that the way this system works is pretty much *identical* to the system used for implementing new core EE Admin files.

### 1. Create a folder for the new admin system

Using our example, this means we would create a folder called "venues".  The final folder structure would be "caffeinated/new/venues/"


### 2. Use the same file/class naming structure as used for core EE_Admin pages.

So in the new folder we would have (at the minimum):

Venues_Admin_Page_Init.core.php
Venues_Admin_Page.core.php

*and if there's a list table:*
Venues_Admin_List_Table.class.php

File structure, contents etc. pretty much mimics exactly what is found in EE_Core admin files, except...

### 3. Remember the following and make the following additions:

#### When caffeinated is active.  There are two new constants available:

**EE_CORE_CAF_ADMIN** = the path to the caffeinated folder (.../admin/caffeinated)
**EE_CORE_CAF_ADMIN_URL** = the url to the caffeinated folder (.../admin/caffeinated);

Use these constants when referencing any files folders in caffeinated.

#### after calling the parent::__construct() in the new "Admin_Page_Init" file.  Make sure you modify the path for the $_folder property.

Using our example for Venues, this is how you would do so:

	class Venues_Admin_Page_Init extends EE_Admin_Page_Init {


		public function __construct() {
			//define some event categories related constants
			define( 'EE_VENUES_PG_SLUG', 'espresso_venues' );	
			define( 'EE_VENUES_ADMIN_URL', admin_url('admin.php?page=' . EE_VENUES_PG_SLUG ));
			define( 'EE_VENUES_ASSETS_URL', EE_CORE_CAF_ADMIN_URL . 'venues/assets/');

			parent::__construct();
			$this->_folder_name = 'caffeinated/new/' . $this->_folder_name;
		}

		//the rest of the class
	}

Notice WHERE $this->_folder_name is redefined (after calling the parent constructor) This is important for directing further system loading to the right path.


That's it!