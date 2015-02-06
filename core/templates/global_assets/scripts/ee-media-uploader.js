//adds special EE media uploaders, for now just used by gateways
//eg:
//<span class='ee_media_uploader_area'>
//	<img class="ee_media_image" src="" />
//	<input class="ee_media_url" type="text" name="attachment_url" value="">
//	<a href="#" class="ee_media_upload"><img src="images/media-button-image.gif" alt="Add an Image"></a>
//</span>
jQuery(document).ready(function($){
	var custom_uploader;
    $('.ee_media_upload').click( function( upload_btn ) {
        upload_btn.preventDefault();
        //If the uploader object has already been created, reopen the dialog
        if (custom_uploader) {
            custom_uploader.open();
            return;
        }
        //Extend the wp.media object
        custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose Image',
            button: {
                text: 'Choose Image'
            },
			frame: 'select',
            multiple: false
        });
        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on( 'select', function() {
            var attachment = custom_uploader.state().get('selection').first().toJSON();
            if ( typeof attachment.url !== 'undefined' ) {
                $( upload_btn.target ).parents( '.ee_media_uploader_area' ).find( '.ee_media_image' ).attr( 'src', attachment.url  );
                $( upload_btn.target ).parents( '.ee_media_uploader_area' ).find( '.ee_media_url' ).val( attachment.url  );
            }
        });
        //Open the uploader dialog
        custom_uploader.open();
	});
});
