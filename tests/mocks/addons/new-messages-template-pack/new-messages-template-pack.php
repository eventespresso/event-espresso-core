<?php
/*
  Plugin Name: Testing New Messages Template Pack Addon
  Plugin URI: http://www.eventespresso.com
  Description: This is an addon to provide an example for and test the template pack plugin api for the Messages Template Pack system.
  Version: 1.0
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
 * @ package		New Messages Template Pack Variation
 * @ author			Event Espresso
 * @ copyright	(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license		https://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version	 	4.5.0
 *
 * ------------------------------------------------------------------------
 */

define( 'EE_NEW_TP_TEST_VERSION', '1.0' );
define( 'EE_NEW_TP_TEST_FILE', __FILE__ );
define( 'EE_NEW_TP_PATH', plugin_dir_path( __FILE__ ) . '/' );
define( 'EE_NEW_TP_URL', plugin_dir_url( __FILE__ ) . '/' );

function ee_new_messages_template_pack_test_load_textdomain() {
	load_plugin_textdomain( 'ee-new-messages-template-pack-test', FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
}
add_action('plugins_loaded', 'ee_new_messages_template_pack_test_load_textdomain');

function ee_new_template_pack_test_register_new_variation() {
	if ( ! class_exists( 'EE_Register_Messages_Template_Pack' ) ) {
		return;
	}

	$setup = array(
		'path' => rtrim(EE_NEW_TP_PATH, '/'),
		'classname' => 'EE_Messages_Template_Pack_New_Template_Pack',
		);
	EE_Register_Messages_Template_Pack::register( 'ee_new_template_pack', $setup );
}
add_action( 'EE_Brewing_Regular___messages_caf',  'ee_new_template_pack_test_register_new_variation' );
