<?php
/*
  Plugin Name: Event Espresso - New Addon (EE4.x+)
  Plugin URI: http://www.eventespresso.com
  Description: The Event Espresso New Addon adds NEW stuff to Event Espresso. Compatible with Event Espresso 4.x or higher
  Version: 1.0.0.dev.000
  Author: Event Espresso
  Author URI: http://www.eventespresso.com
  Copyright 2014 Event Espresso (email : support@eventespresso.com)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License, version 2, as
  published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA02110-1301USA
 *
 * ------------------------------------------------------------------------
 *
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Event Espresso
 * @ copyright	(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version	 	EE4
 *
 * ------------------------------------------------------------------------
 */
define( 'EE_NEW_ADDON_VERSION', '1.0.0.dev.000' );
define( 'EE_NEW_ADDON_PLUGIN_FILE',  __FILE__ );
function load_espresso_new_addon() {
if ( class_exists( 'EE_Addon' )) {
	// new_addon version
	require_once ( plugin_dir_path( __FILE__ ) . 'EE_New_Addon.class.php' );
	EE_New_Addon::register_addon();
}
}
add_action( 'AHEE__EE_System__load_espresso_addons', 'load_espresso_new_addon' );

// End of file espresso_new_addon.php
// Location: wp-content/plugins/espresso-new-addon/espresso_new_addon.php