<?php
class EE_Admin_File_Uploader_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 *
	 * @return string of html to display the field
	 */

	function display(){

		add_action('AHEE__EE_Form_Section_Proper__localize_script_for_all_forms__begin',array('EE_Admin_File_Uploader_Display_Strategy','enqueue_scripts'));
		$input = $this->_input;
		//only attempt to show the image if it at least exists
		if( $this->src_exists( $input->raw_value() ) ){
			$image_src = $input->raw_value();
		}else{
			$image_src = '';
		}
		return "<span class='ee_media_uploader_area'>".
					"<input class='ee_media_url {$input->html_class()}' type='text' name='{$input->html_name()}' size='34' value='{$input->raw_value_in_form()}'>".
					"<a href='#' class='ee_media_upload'><img src='".admin_url('images/media-button-image.gif')."' alt='Add an Image'></a>".
					"<img class='ee_media_image' src='$image_src' />".
				"</span>";
	}
	/**
	 * Its important this media only get enqueued AFTER init, but before the footer... where the
	 * rest of our forms JS gets enqueued. Otherwise the JS gets enqueud fine, and loaded on the page fine,
	 * but when you upload an image it gets uploaded fine to the server, but it doesn't display andr eports an error
	 * (also it doesn't show any of the currently existing media in the modal window that pops up when you click the button
	 * to select media).
	 * Besides that, no special consideration should be required to make the media uploader apepar, besides having
	 * this input displayed.
	 */
	static function enqueue_scripts(){
		wp_enqueue_media();
		wp_enqueue_script('media-upload');
		wp_enqueue_script('ee-payments',EE_GLOBAL_ASSETS_URL.'scripts/ee-media-uploader.js');
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