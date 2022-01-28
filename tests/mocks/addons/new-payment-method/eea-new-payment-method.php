<?php
/*
  Plugin Name: Event Espresso - New Payment Method (EE 4.x+)
  Plugin URI: http://www.eventespresso.com
  Description: The Event Espresso New Payment Method adds 2 new payment methods: new onsite and new offsite
  Version: 0.0.1.dev.002
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
 * @ license		https://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version	 	EE4
 *
 * ------------------------------------------------------------------------
 */
define( 'EE_NEW_PAYMENT_METHOD_VERSION', '0.0.1.dev.002' );
define( 'EE_NEW_PAYMENT_METHOD_PLUGIN_FILE',  __FILE__ );
function load_espresso_new_payment_method() {
if ( class_exists( 'EE_Addon' )) {
	// new_payment_method version
	require_once ( plugin_dir_path( __FILE__ ) . 'EE_New_Payment_Method.class.php' );
	EE_New_Payment_Method::register_addon();
}
}
add_action( 'AHEE__EE_System__load_espresso_addons', 'load_espresso_new_payment_method' );

// End of file espresso_new_payment_method.php
// Location: wp-content/plugins/espresso-new-payment-method/espresso_new_payment_method.php