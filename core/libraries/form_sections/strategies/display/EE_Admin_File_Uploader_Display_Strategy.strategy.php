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
	 * Its important this media only get enqueued AFTER init, but before the footer... where the
	 * rest of our forms JS gets enqueued. Otherwise the JS gets enqueued fine, and loaded on the page fine,
	 * but when you upload an image it gets uploaded fine to the server, but it doesn't display and reports an error
	 * (also it doesn't show any of the currently existing media in the modal window that pops up when you click the button
	 * to select media).
	 * Besides that, no special consideration should be required to make the media uploader appear, besides having
	 * this input displayed.
	 * @deprecated. enqueue_js should be called automatically now
	 */
	static function enqueue_scripts(){
		EE_Error::doing_it_wrong( __FUNCTION__, __( 'EE_Admin_File_Uploader_Display_Strategy::enqueue_scripts() no longer needs to be called in order to display the admin uploader input correctly. This is handled now by EE_Admin_File_Uploader_Display_Strategy::enqueue_js() which is called automatically when enqueueing JS and CSS for the form'), '4.9.8.rc.015' );
		wp_enqueue_media();
		wp_enqueue_script('media-upload');
		wp_enqueue_script('ee-payments',EE_GLOBAL_ASSETS_URL.'scripts/ee-media-uploader.js');
	}
	
	/**
	 * Enqueues the JS and CSS needed to display this input
	 */
	public function enqueue_js() {
		wp_enqueue_media();
		wp_enqueue_script('media-upload');
		wp_enqueue_script('ee-payments',EE_GLOBAL_ASSETS_URL.'scripts/ee-media-uploader.js');
		parent::enqueue_js();
	}



	/**
	 *
	 * @return string of html to display the field
	 */

	function display(){
		// the actual input
		$input = '<input type="text" size="34" ';
		$input .= 'name="' . $this->_input->html_name() . '" ';
		$input .= $this->_input->html_class() != '' ? 'class="large-text ee_media_url ' . $this->_input->html_class() . '" ' : 'class="large-text ee_media_url" ';
		$input .= 'value="' . $this->_input->raw_value_in_form() . '" ';
		$input .= $this->_input->other_html_attributes() . '>';
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
