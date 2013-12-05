<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEH_Qtip	
 *
 * This is a helper utility class that provides a PHP api for setting up qtip js library programmatically.
 *
 * @package		Event Espresso
 * @subpackage	/helpers/EEH_Qtip.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */



require_once( EE_HELPERS . 'EEH_Base.helper.php' );
class EEH_Qtip extends EEH_Base {



	/**
	 * Call this from wp_enqueue_scripts or admin_enqueue_scripts to setup and enqueu the qtip library
	 * @return void
	 */
	public static function register_and_enqueue() {
		$qtips_js = !defined('SCRIPT_DEBUG') ? EE_THIRD_PARTY_URL . 'qtip/jquery.qtip.min.js' : EE_THIRD_PARTY_URL . 'qtip/jquery.qtip.js';
		$qtip_imagesloaded = EE_THIRD_PARTY_URL . 'qtip/imagesloaded.pkg.min.js';
		$qtip_map = EE_THIRD_PARTY_URL . 'qtip/jquery.qtip.min.map';
		$qtipcss = !defined('SCRIPT_DEBUG') ? EE_THIRD_PARTY_URL . 'qtip/jquery.qtip.min.css' : EE_THIRD_PARTY_URL . 'qtip/jquery.qtip.css';

		wp_register_script('qtip-map', $qtip_map, array(), '3', TRUE );
		wp_register_script('qtip-images-loaded', $qtip_images_loaded, array(), '2.2.0', TRUE );
		wp_register_script('qtip', $qtip_js, array('jquery', 'qtip-map', 'qtip-images-loaded'), '2.2.0', TRUE );

		wp_register_style('qtip-css', $qtipcss, array(), '2.2' );

		wp_enqueue_script('qtip');
		wp_enqueue_style('qtip-css');
	}


} //end EEH_Template class