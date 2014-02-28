<?php
class EE_Admin_File_Uploader_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 * 
	 * @return string of html to display the field
	 */
	function display(){
		wp_enqueue_media();
		wp_enqueue_script('media-upload');
		wp_enqueue_script('ee-payments',EVENT_ESPRESSO_PLUGINFULLURL.'includes/core/admin/payments/assets/ee-payments.js');
		$input = $this->_input;	
		
		return "<span class='ee_media_uploader_area'>".
					"<img class='ee_media_image' src='{$input->sanitized_value()}' />".
					"<input class='ee_media_url {$input->html_class()}' type='text' name='{$input->html_name()}' size='34' value='{$input->sanitized_value()}'>".
					"<a href='#' class='ee_media_upload'><img src='".admin_url('images/media-button-image.gif')."' alt='Add an Image'></a>".
				"</span>";
	}
	
}