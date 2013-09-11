var overlay = $( "#espresso-admin-page-overlay-dv" );
window.eeTimeout = false;
window.overlay = overlay;
/*
generates background overlay for a lightbox affect
 */
window.position_overlay = function position_overlay() {
	var dcmntWidth = parseInt($(document).width(), 10 );
	var dcmntHeight = parseInt($(document).height(), 10 );
	$(window).scrollTop(0);
	var ovrParOff = overlay.parent().offset();
	var ovrlyTop = ovrParOff.top * (-1);
	var ovrlyLeft = ovrParOff.left * (-1);
	overlay.css({ 'top' : ovrlyTop, 'left' : ovrlyLeft, 'width' : dcmntWidth, 'height' : dcmntHeight }).fadeIn('fast').addClass('active');
};


window.position_dialog = function position_dialog() {
	var wndwWidth = parseInt( $(window).width(), 10 );
	var wndwHeight = parseInt( $(window).height(), 10 );
	var scrllTp = $('html').scrollTop();
	var parOff = dialog.parent().offset();
	var dialogTop =  ( wndwHeight / 10 ) - parOff.top + scrllTp;
	var dialogLeft = ( wndwWidth / 4 - parOff.left );
	var dialogWidth = wndwWidth / 2;
	dialog.css({ 'top' : dialogTop, 'left' : dialogLeft, 'width' : dialogWidth }).fadeIn('fast');
};


window.doneResizing = function doneResizing(){
	if ( overlay.hasClass('active') ) {
		position_overlay( /*$( "#admin-page-overlay-dv" ), false*/ );
		position_dialog( /*$( "#txn-admin-apply-payment-dv" )*/ );
		eeTimeout = false;
	}
};



$(window).resize(function(){
 if( eeTimeout !== false) {
	clearTimeout(eeTimeout);
	}
	eeTimeout = setTimeout(doneResizing, 200);
});


jQuery(document).ready(function($) {
	
	//prepare dialog
	var eeDialog = $('.ee-admin-dialog-container').draggable();

	var dialogHelper = {

		displayModal: function() {
			position_overlay();
			position_dialog();
			overlay.on('click', function() {
				dialogHelper.closeModal();
				$('.ee-admin-dialog-container-inner-content').html('');
			});
			return this;
		},

		closeModal: function() {
			dialog.fadeOut( 'fast' );
			overlay.fadeOut( 'fast' );
			return this;
		},

		addContent: function(content) {
			$('.ee-admin-dialog-container-inner-content').html(content);
			return this;
		}
	};

	window.dialogHelper = dialogHelper; //send to global space
	window.dialog = eeDialog; //send to global space
});