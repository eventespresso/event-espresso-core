jQuery(document).ready(function($) {

	$.ajaxSetup ({ cache: false });
	// clear firefox and safari cache
	$(window).unload( function() {}); 
	
	
	var overlay = $( "#espresso-admin-page-overlay-dv" );
	window.eeTimeout = false;
	window.overlay = overlay;



	$('.confirm-delete').click(function() {
		var what = $(this).attr('rel');
		var answer = confirm('Are you absolutely sure you want to delete this '+what+'?\nThis action will delete ALL DATA asscociated with this '+what+'!!!\nThis can NOT be undone!!!');
  		return answer;
	});

	$('.updated.fade').delay(5000).fadeOut();	
	
	/*
	Floating "Save" and "Save & Close" buttons
	 */
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		var offset = $('#event_editor_major_buttons_wrapper').offset();
		if( typeof offset !== 'undefined' ) {
			if ( (scrollTop+25) > offset.top ) {
				$('#event-editor-floating-save-btns').removeClass('hidden');
				$('#event_editor_major_buttons_wrapper .button-primary').addClass('hidden');
			} else {
				$('#event-editor-floating-save-btns').addClass('hidden');
				$('#event_editor_major_buttons_wrapper .button-primary').removeClass('hidden');
			}
		}
	});



	/*
	Tabs for Messages box on Event Editor Page
	 */
	$('.nav-tab-wrapper', '.ee-nav-tabs').on('click', '.nav-tab', function(e) {
		e.preventDefault();
		var content_id = $(this).attr('rel');
		//first set all content as hidden and other nav tabs as not active
		$('.ee-nav-tabs .nav-tab-content').hide();
		$('.ee-nav-tabs .nav-tab').removeClass('nav-tab-active');
		//set new active tab
		$(this).addClass('nav-tab-active');
		$('#'+content_id).show();
	});/**/


	// generic click event for displaying and giving focus to an element and hiding control 
	$('.display-the-hidden').on( 'click', function() {
		$('.auto-hide').slideUp(500);
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_display = $(this).attr("rel"); 
		var control = $(this);
		// display the target's div container - use slideToggle or removeClass
		$('#'+item_to_display+'-dv').slideToggle(500, function() {		
			if ( ! control.hasClass('no-hide') ){
				// hide the control element
				control.addClass('hidden'); 
			} 
			// display the target div's hide link
			$('#hide-'+item_to_display).removeClass('hidden'); 
			// if hiding/showing a form input, then id of the form input must = item_to_display
			//$('#'+item_to_display).focus(); // add focus to the target
		}); 
		return false;
	});

	// generic click event for re-hiding an element and displaying it's display control 
	$('.hide-the-displayed').on( 'click', function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_hide = $(this).attr("rel"); 
		var control = $(this);
		// hide the target's div container - use slideToggle or addClass
		$('#'+item_to_hide+'-dv').slideToggle(500, function() {
			//$('#'+item_to_hide+'-dv').delay(250).addClass('hidden'); 
			if ( ! control.hasClass('no-hide') ){
				// hide the control element
				control.addClass('hidden'); 
			}
			// display the control element that toggles display of this element
			$('#display-'+item_to_hide).removeClass('hidden');  
		}); 
		return false;
	});	



	/*
	generates background overlay for a lightbox affect
	 */
	window.position_overlay = function position_overlay() {
		var dcmntWidth = parseInt($(document).width() );
		var dcmntHeight = parseInt($(document).height() );
		$(window).scrollTop(0);
		var ovrParOff = overlay.parent().offset();
		var ovrlyTop = ovrParOff.top * (-1);
		var ovrlyLeft = ovrParOff.left * (-1);
		overlay.css({ 'top' : ovrlyTop, 'left' : ovrlyLeft, 'width' : dcmntWidth, 'height' : dcmntHeight }).fadeIn('fast').addClass('active');
	}


	window.position_dialog = function position_dialog() {
		var wndwWidth = parseInt( $(window).width() );
		var wndwHeight = parseInt( $(window).height() );		
		var scrllTp = $('html').scrollTop();
		var parOff = dialog.parent().offset();
		var dialogTop =  ( wndwHeight / 10 ) - parOff.top + scrllTp;
		var dialogLeft = ( wndwWidth / 4 - parOff.left );
		var dialogWidth = wndwWidth / 2;
		dialog.css({ 'top' : dialogTop, 'left' : dialogLeft, 'width' : dialogWidth }).fadeIn('fast');		
	}


	window.doneResizing = function doneResizing(){
		if ( overlay.hasClass('active') ) {
			position_overlay( /*$( "#admin-page-overlay-dv" ), false*/ ); 
			position_dialog( /*$( "#txn-admin-apply-payment-dv" )*/ ); 
			eeTimeout = false;	
		}
	}



	$(window).resize(function(){	
	 if( eeTimeout !== false) {
		    clearTimeout(eeTimeout);
		}
		eeTimeout = setTimeout(doneResizing, 200);
	});	
	

	window.do_before_admin_page_ajax = function do_before_admin_page_ajax() {
		// stop any message alerts that are in progress
		$('#message').stop().hide();
		// spinny things pacify the masses
		var st = $('html').scrollTop();
		var po = $('#espresso-admin-page-ajax-loading').parent().offset();		
		var mal_top = ( st+( parseInt( $(window).height() )/5 )-po.top ) - 15;
		var ww = $('#espresso-admin-page-ajax-loading').parent().width();
		var mal_left = ( ww/2 ) -15;
		//alert( 'mal_top = ' + mal_top + '\n' + 'mal_left = ' + mal_left );
		$('#espresso-admin-page-ajax-loading').css({ 'top' : mal_top, 'left' : mal_left }).show();	
	}		
	


	window.show_admin_page_ajax_msg = function show_admin_page_ajax_msg( response, beforeWhat, closeModal ) {
			
		$('#espresso-admin-page-ajax-loading').fadeOut('fast');
		//alert( response.toSource() );
		if (( response.success != undefined && response.success != '' ) || ( response.errors != undefined && response.errors != '' )) {
		
			if ( closeModal == undefined ) {
				closeModal = false;
			}

			var fadeaway = true;

			if ( response.success != undefined && response.success != '' ) {
				msg = '<div id="message" class="updated hidden"><p>' + response.success + '</p></div>';
				//closeModal = true;
			}
		
			if ( response.errors != undefined && response.errors != '' ) {
				msg = '<div id="message" class="error hidden"><p>' + response.errors + '</p></div>';
				//closeModal = false;
				fadeaway = false;
			}
			
			if ( beforeWhat == undefined ) {
				beforeWhat = '#post-body-content';
			}
			
			// display message
			$( beforeWhat ).before( msg );
			if ( fadeaway == true ) {
				$('#message').removeClass('hidden').show().delay(8000).fadeOut();
//				$('#message').removeClass('hidden').show().delay(8000).fadeOut( function(){
//						if ( closeModal ) {
//							overlay.trigger('click');
//						}
//				});
			} else {
				$('#message').removeClass('hidden').show();
//				$('#message').removeClass('hidden').show().delay(8000).queue( function() {
//						if ( closeModal ) {
//							overlay.trigger('click');
//						}
//				});
			}

		} 

	}

	/**
	 * EE Help dialog loads
	 */
	$('.espresso-admin').on('click', '.ee-dialog', function(e) {
		e.preventDefault();
		//parse url to get the dialog ref
		var url = $(this).attr('href');
		//create dummy url for parser
		url = 'http://dummyurl.com/' + url;
		console.log(url);
		var queryparts = parseUri(url);

		console.log(queryparts);
		console.log()

		//set dialog window
		var help_dialog = $( '#' + queryparts.queryKey.inlineId ).draggable();
		window.dialog = help_dialog;

		position_overlay();
		position_dialog();
		overlay.on('click', function() {
			dialog.fadeOut( 'fast' );
			overlay.fadeOut( 'fast' );
		});
	});


	// add functions to global scope
//	window.overlay = overlay;
//	window.eeTimeout = eeTimeout;
//	window.position_overlay = position_overlay;
//	window.position_dialog = position_dialog;
//	window.doneResizing = doneResizing;
//	window.do_before_admin_page_ajax = do_before_admin_page_ajax;
//	window.show_admin_page_ajax_msg = show_admin_page_ajax_msg;
	
});

