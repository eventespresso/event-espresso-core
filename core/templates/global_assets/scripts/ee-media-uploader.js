//adds special EE media uploaders, for now just used by gateways
//eg:
//<span class='ee_media_uploader_area'>
//	<img class="ee_media_image" src="" />
//	<input class="ee_media_url" type="text" name="attachment_url" value="">
//	<a href="#" class="ee_media_upload"><img src="images/media-button-image.gif" alt="Add an Image"></a>
//</span>
jQuery(document).ready(function(){
	jQuery('.ee_media_upload').click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;

		wp.media.editor.send.attachment = function(props, attachment) {


			jQuery(e.target).parents('.ee_media_uploader_area').find('.ee_media_image').attr('src', attachment.url);
			jQuery(e.target).parents('.ee_media_uploader_area').find('.ee_media_url').val(attachment.url);

			wp.media.editor.send.attachment = send_attachment_bkp;
		}

		wp.media.editor.open();

		return false;       
	});
});