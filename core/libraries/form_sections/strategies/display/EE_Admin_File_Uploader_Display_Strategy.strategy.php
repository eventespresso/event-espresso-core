<?php
class EE_Admin_File_Uploader_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 * IMPORTANT! In order for the media JS to work properly, this can't be called too early.
	 * I, MIke, assume it needs to be called after wp_enqueue_scripts, but haven't confirmed that.
	 * At very least, it needs to be called after INIT, otherwise the JS gets enqueud fine, and loaded on the page fine,
	 * but when you upload an image it gets uploaded fine to the server, but it doesn't display andr eports an error 
	 * (also it doesn't show any of the currently existing media in the modal window that pops up when you click the button
	 * to select media).
	 * Besides that, no special consideration should be required to make the media uploader apepar, besides having
	 * this input displayed.
	 * @return string of html to display the field
	 */
	function display(){
		
		wp_enqueue_media();
		wp_enqueue_script('media-upload');
		wp_enqueue_script('ee-payments',EE_GLOBAL_ASSETS_URL.'scripts/ee-media-uploader.js');
		$input = $this->_input;	
		
		return "<span class='ee_media_uploader_area'>".
					"<img class='ee_media_image' src='{$input->sanitized_value()}' />".
					"<input class='ee_media_url {$input->html_class()}' type='text' name='{$input->html_name()}' size='34' value='{$input->sanitized_value()}'>".
					"<a href='#' class='ee_media_upload'><img src='".admin_url('images/media-button-image.gif')."' alt='Add an Image'></a>".
				"</span>";
	}
	
}