<?php
/*
  Plugin Name: Testing New Messages Template Pack Variation Addon
  Plugin URI: http://www.eventespresso.com
  Description: This is an addon to provide an example for and test the variations plugin api for the Messages Template Pack Variations system.
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
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version	 	%VER%
 *
 * ------------------------------------------------------------------------
 */

define( 'EE_NEW_VARIATION_TEST_VERSION', '1.0' );
define( 'EE_NEW_VARIATION_TEST_FILE', __FILE__ );
define( 'EE_NEW_VARIATIONS_PATH', plugin_dir_path( __FILE__ ) . 'variations/' );
define( 'EE_NEW_VARIATIONS_URL', plugin_dir_url( __FILE__ ) . 'variations/' );

function ee_variations_test_load_textdomain() {
	load_plugin_textdomain( 'ee-new-variations-test', FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
}
add_action('plugins_loaded', 'ee_variations_test_load_textdomain');

function ee_new_variations_test_register_new_variation() {
	if ( ! class_exists( 'EE_Register_Messages_Template_Variations' ) ) {
		return;
	}

	$variations_setup = array(
		'base_path' => EE_NEW_VARIATIONS_PATH,
		'base_url' => EE_NEW_VARIATIONS_URL,
		'variations' => array(
			'email' => array(
					'default' => array(
						'new_variation_test_blue_lagoon' => __('Blue Lagoon', 'ee-new-variations-test' ),
						'new_variation_test_sunset_red' => __('Sunset Red', 'ee-new-variations-test' )
						)
					)
			)
		);
	EE_Register_Messages_Template_Variations::register( 'ee_new_variations_test', $variations_setup );
}
add_action( 'EE_Brewing_Regular___messages_caf',  'ee_new_variations_test_register_new_variation' );
