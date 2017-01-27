jQuery(document).ready(function($) {
	var overlay = $( "#espresso-admin-page-overlay-dv" );
	window.eeTimeout = false;
	window.overlay = overlay;
	/*
	generates background overlay for a lightbox affect
	 */
	window.position_overlay = function position_overlay(scrollToTop) {
		scrollToTop = typeof scrollToTop === 'undefined' ? true : scrollToTop;
		var dcmntWidth = parseInt($(document).width(), 10 );
		var dcmntHeight = parseInt($(document).height(), 10 );
		if ( scrollToTop ) {
			$(window).scrollTop(0);
		}
		var ovrParOff = overlay.parent().offset();
		var ovrlyTop = ovrParOff.top * (-1);
		var ovrlyLeft = ovrParOff.left * (-1);
		overlay.css({ 'top' : ovrlyTop, 'left' : ovrlyLeft, 'width' : dcmntWidth, 'height' : dcmntHeight }).fadeIn('fast').addClass('active');
	};


	window.position_dialog = function position_dialog(dialogWidthFraction, scrollToTop) {
		// console.log(scrollToTop);
		dialogWidthFraction = typeof dialogWidthFraction === 'undefined' || typeof dialogWidthFraction === null ? 1.5 : dialogWidthFraction;
		scrollToTop = typeof scrollToTop === 'undefined' ? true : scrollToTop;
		// console.log(scrollToTop);

		var wndwWidth = parseInt( $(window).width(), 10 );
		var wndwHeight = parseInt( $(window).height(), 10 );
		var scrllTp = scrollToTop ? $('html').scrollTop() : $(this).scrollTop();
		var parOff = eedialog.parent().offset();
		var dialogTop =  ( wndwHeight / 10 ) - parOff.top + scrllTp;
		var dialogLeft =  ( (wndwWidth - ( wndwWidth/dialogWidthFraction ) ) /2 ) - parOff.left;
		var dialogWidth = wndwWidth / dialogWidthFraction;
		eedialog.css({ 'top' : dialogTop, 'left' : dialogLeft, 'width' : dialogWidth }).fadeIn('fast');
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
		eeTimeout = setTimeout(doneResizing, 100);
	});

	//prepare dialog
	var eeDialog = $('.ee-admin-dialog-container').draggable( { disabled: true } );

	var dialogHelper = {

		dialogContentContainer : $('.ee-admin-dialog-container-inner-content'),

		displayModal: function(overlaystick, draggable, scrollToTop) {
			overlaystick = typeof(overlaystick) === 'undefined' || typeof overlaystick === null ? false : overlaystick;
			draggable = typeof(draggable) === 'undefined' || typeof draggable === null ? false : draggable;
			scrollToTop = typeof scrollToTop === 'undefined' ? true : scrollToTop;
			position_overlay(scrollToTop);
			position_dialog(1.5, scrollToTop);

			//if draggable has been turned on
			if ( draggable ) {
				$('.ee-admin-dialog-container').draggable( "option", "disabled", false );
			}
			if ( ! overlaystick ) {
				overlay.on('click', function() {
					dialogHelper.closeModal();
				});
			}

			return this;
		},

		closeModal: function() {
			eedialog.fadeOut( 'fast' );
			overlay.fadeOut( 'fast' );
			overlay.removeClass('active');
			$('.ee-admin-dialog-container-inner-content').html('');
			return this;
		},

		addContent: function(content) {
			$('.ee-admin-dialog-container-inner-content').html(content);
			//event for any cancel button present
			$('.ee-modal-cancel').on('click', function() {
				dialogHelper.closeModal();
			});
			return this;
		}
	};

	window.dialogHelper = dialogHelper; //send to global space
	window.eedialog = eeDialog; //send to global space
});
