<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Admin_File_Uploader_Display_Strategy
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Mike Nelson
 * @since                4.6
 *
 */
class EE_Admin_File_Uploader_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 *
	 * @return string of html to display the field
	 */

	function display(){

		EE_Registry::instance()->load_helper( 'HTML' );
		// the actual input
		$input = '<input type="text" size="34" ';
		$input .= 'name="' . $this->_input->html_name() . '" ';
		$input .= $this->_input->html_class() != '' ? 'class="large-text ee_media_url ' . $this->_input->html_class() . '" ' : 'class="large-text ee_media_url" ';
		$input .= 'value="' . $this->_input->raw_value_in_form() . '">';
		// image uploader
		$uploader = EEH_HTML::link( '#', '<img src="' . admin_url( 'images/media-button-image.gif' ) . '" >', __( 'click to add an image', 'event_espresso' ), '', 'ee_media_upload' );
		//only attempt to show the image if it at least exists
		$image = $this->src_exists( $this->_input->raw_value() ) ? EEH_HTML::br(2) . EEH_HTML::img( $this->_input->raw_value(), __( 'logo', 'event_espresso' ), '', 'ee_media_image' ) : '';
		// html string
		return EEH_HTML::div( $input . EEH_HTML::nbsp() . $uploader . $image, '', 'ee_media_uploader_area' );
	}


	
	/**
	 * Asserts an image actually exists as quickly as possible by sending a HEAD
	 * request
	 * @param string $src
	 * @return boolean
	 */
	protected function src_exists( $src ){
		$results = wp_remote_head( $src );
		if( is_array( $results) && ! $results instanceof WP_Error){
			return strpos($results['headers']['content-type'], "image" ) !== FALSE;
		}else{
			return FALSE;
		}
	}

}
