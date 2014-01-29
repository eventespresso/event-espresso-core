<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEH_Activation Helper
 *
 * @package		Event Espresso
 * @subpackage	/includes/core/EE_Load_Textdomain.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Load_Textdomain extends EE_Base {
	/**
	 * this takes care of retrieving a matching textdomain for event espresso for the current WPLANG from EE github repo (if necessary) and then loading it for translations.
	 * should only be called in wp plugins_loaded callback
	 * 
	 * @return void
	 */
	public static function load_textdomain() {
		self::_maybe_get_langfile();

		//now load the textdomain
		if ( !empty($lang) && file_exists(EE_LANGUAGES_SAFE_DIR.'event_espresso-'.$lang.'.mo') ){
			load_plugin_textdomain('event_espresso', false, EE_LANGUAGES_SAFE_LOC);
		}else{
			load_plugin_textdomain('event_espresso', false, dirname(EE_PLUGINPATH) . '/languages/');
		}
	}



	/**
	 * The purpose of this method is to sideload the lang file for the given WPLANG locale (if necessary).
	 *
	 * @access private
	 * @static
	 * @return void
	 */
	private static function _maybe_get_langfile() {
		$lang = get_locale();
		if ( $has_check = get_option( 'ee_lang_check_' . $lang . '_' . EVENT_ESPRESSO_VERSION ) || empty( $lang ) )
			return;

		//if lang is en_US or empty then lets just get out.  (Event Espresso core is en_US)
		if ( empty( $lang ) || $lang == 'en_US' )
			return;

		//made it here so let's get the file from the github repo
		//@todo: this for now is pointing to the repo for EE3.1.  We'll need to update to the new EE4 languages repo once we've got it working.
		$sideloader_args = array(
			'_upload_to' => EE_PLUGIN_DIR_PATH . 'languages/',
			'_upload_from' => 'https://github.com/eventespresso/languages-ee4/blob/master/event_espresso-' . $lang . '.mo?raw=true',
			'_new_file_name' => 'event_espresso-' . $lang . '.mo'
			);
		

		$sideloader = EE_Registry::instance()->load_helper('Sideloader', $sideloader_args, FALSE );

		$success = $sideloader->sideload();
		update_option( 'ee_lang_check_' . $lang . '_' . EVENT_ESPRESSO_VERSION, 1 );
	}
} //end EE_Load_Textdomain