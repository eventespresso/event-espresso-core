jQuery(document).ready(function($) {

	//Logo uploader
	$('#upload_image_button').on( 'click', function() {
		formfield = $('#upload_image').attr('name');
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=1');
		return false;
	});

	window.send_to_editor = function(html) {
		//Add new image
		imgurl = $('img',html).attr('src');
		$('#upload_image').val(imgurl);
		$('#current-image-thumb').attr( 'src', imgurl );
		tb_remove();
	}
	
	// process the remove link in the metabox
	$('#remove-image').on( 'click', function() {
		var answer = confirm( confirm_image_delete.text );
		if (answer){
			$("#upload_image").val('');
			$('#current-image-thumb').attr( 'src', '' );
		}
		return false;
	});

});