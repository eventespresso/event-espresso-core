jQuery(document).ready(function($) {

	$.ajaxSetup ({ cache: false });
	// clear firefox and safari cache
	$(window).on("unload", function() {});

	const $wpContent = $('#wpcontent');


	function validate_form_inputs( submittedForm ) {

		var goodToGo = true;
		var cntr = 1;

		$( submittedForm ).find('.required').each( function( index ) {
			if( $(this).val() === '' || $(this).val() === 0 ) {
				$(this).addClass('requires-value').siblings( '.validation-notice-dv' ).fadeIn();
				goodToGo = false;
			}
			$(this).on( 'change', function() {
				if( $(this).val() !== '' || $(this).val() !== 0 ) {
					$(this).removeClass('requires-value').siblings( '.validation-notice-dv' ).fadeOut('fast');
				}
			});
			if ( cntr === 1 ) {
				var thisPos = $(this).offset();
				$(window).scrollTop( thisPos.top - 200 );
			}
			cntr++;
		});
		return goodToGo;
	}


	$('.submit-for-validation').click(function(event) {
		event.preventDefault();
		var submittedForm = $(this).closest('form');
		if ( validate_form_inputs( submittedForm ) ) {
			submittedForm.submit();
		}
	});



	$('#admin-recaptcha-settings-slct').change( function() {
		if ( $(this).val() === 1 ) {
			$('.admin-recaptcha-settings-tr').find('.maybe-required').removeClass('maybe-required').addClass('required');
			$('.admin-recaptcha-settings-tr').show();
			$('.admin-recaptcha-settings-hdr').show();
		} else {
			$('.admin-recaptcha-settings-tr').find('.required').removeClass('required').addClass('maybe-required');
			$('.admin-recaptcha-settings-tr').hide();
			$('.admin-recaptcha-settings-hdr').hide();
		}
	});

	$('#admin-recaptcha-settings-slct').trigger( 'change' );



	function escape_square_brackets( value ) {
		value = value.replace(/[[]/g,'\\\[');
		value = value.replace(/]/g,'\\\]');
		return value;
	}



	//Select All
	function selectAll(x) {
		for(var i=0,l=x.form.length; i<l; i++) {
			if(x.form[i].type === 'checkbox' && x.form[i].name !== 'sAll') {
				x.form[i].checked=x.form[i].checked?false:true;
			}
		}
	}



	var overlay = $( "#espresso-admin-page-overlay-dv" );
	window.eeTimeout = false;
	window.overlay = overlay;



	$('.confirm-delete').click(function() {
		var what = $(this).attr('rel');
		var answer = confirm( eei18n.confirm_delete );
		return answer;
	});

	$('.updated.fade').delay(5000).fadeOut();

	/*
	Floating "Save" and "Save & Close" buttons
	 */
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		var offset = $('#major-publishing-actions .publishing-action').offset();
		if( typeof(offset) !== 'undefined' && offset !== null && typeof(offset.top) !== 'undefined' ) {
			if ( (scrollTop+33) > offset.top ) {
				$('#event-editor-floating-save-btns').removeClass('hidden');
				$('#major-publishing-actions .button--primary').addClass('hidden');
			} else {
				$('#event-editor-floating-save-btns').addClass('hidden');
				$('#major-publishing-actions .button--primary').removeClass('hidden');
			}
		}
	});



	// Tabs for Messages box on Event Editor Page
	$(document).on('click', '.inside .nav-tab', function(e) {
		e.preventDefault();
		var content_id = $(this).attr('rel');
		//first set all content as hidden and other nav tabs as not active
		$('.ee-nav-tabs .nav-tab-content').hide();
		$('.ee-nav-tabs .nav-tab').removeClass('nav-tab-active');
		//set new active tab
		$(this).addClass('nav-tab-active');
		$('#'+content_id).show();
	});



	/**
	 * add in our own statuses IF they exist
	 */
	var our_status = $('#cur_status').text();
	// handle removing "move to trash" text if post_status is trash
	if ( our_status === 'Trashed' ) {
		$('#delete-action').hide();
	}
	if ( typeof(eeCPTstatuses) !== 'undefined' ) {
		var wp_status = $('.ee-status-container', '#misc-publishing-actions').first();
		var extra_statuses = $('#ee_post_status').html();
		if ( our_status !== '' ) {
			$('#post-status-display').text(our_status);
			$('#save-post', '#save-action').val( $('#localized_status_save').text() );
		}

		//if custom stati is selected, let's update the text
		$('.save-post-status', '#post-status-select').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			updatePostStatus();
			return false;
		});


		updatePostStatus = function(cancel) {
			cancel = typeof(cancel) === 'undefined' ? false : true;
			var selector = $('#post_status');
			var chngval = cancel ? $('#cur_stat_id').text() : $(selector).val();
			var chnglabel = typeof eeCPTstatuses[chngval] !== 'undefined'  ? eeCPTstatuses[chngval].label : eeCPTstatuses['draft'].label;
			var save_label = typeof eeCPTstatuses[chngval] !== 'undefined'  ? eeCPTstatuses[chngval].save_label : eeCPTstatuses['draft'].save_label;
			$('#save-post', '#save-action').val(save_label);
			$('#cur_stat_id').text(chngval);
			if ( cancel ) {
				selector.val(chngval);
				$('#post-status-display').text(chnglabel);
			}
		};

		$('.cancel-post-status', '#post-status-select').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			updatePostStatus(true);
			return false;
		});

		$('#post').on('submit', function(e) {
			updatePostStatus();
		});



		if ( extra_statuses !== '' ) {
            $('#post_status').append(extra_statuses);
		}
	}

	/**
	 * temporarily remove preview button
	 */
	$('#preview-action').remove();


	/**
	 * temporarily rmove trash link on venue editor.
	 */
	$('#delete-action', '.event-espresso_page_espresso_venues').remove();


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


	$wpContent.on( 'click', '.espresso-help-tab-lnk', function(){
		var target_help_tab = '#tab-link-' + $(this).attr('id') + ' a';
		if ( $('#contextual-help-wrap').css('display') === 'none' ) {
			$('#contextual-help-link').trigger('click');
		}
		$(target_help_tab).trigger('click');
	});



	/**
	 * lazy loading of content
	 */

	espressoAjaxPopulate = function(el) {
		function show(i, id) {
			var p, e = $('#' + id).find('.widget-loading');
			if ( e.length ) {
				p = e.parent();
				var u = $('#' + id + '_url').text();
				setTimeout( function(){
					p.load( ajaxurl + '?action=espresso-ajax-content&ee_admin_ajax=1&contentid=' + id + '&contenturl=' + u, '', function() {
						p.hide().slideDown('normal', function(){
							$(this).css('display', '');
						});
					});
				}, i * 500 );
			}
		}

		if ( el ) {
			el = el.toString();
			if ( $.inArray(el, eeLazyLoadingContainers) !== -1 ) {
				show(0, el);
			}
		} else {
			$.each( eeLazyLoadingContainers, show );
		}
	};
	if ( typeof eeLazyLoadingContainers !== 'undefined' ) {
		espressoAjaxPopulate();
	}

	const espressoCloseModalMenus = function() {
		$('.ee-modal-menu').each(function () {
			$(this).removeClass('active');
		});
	}

	$wpContent.on( 'click', '.ee-modal-menu__button', function(e) {
		e.preventDefault();
		espressoCloseModalMenus();
		$(this).parent().toggleClass('active');
	});
	$wpContent.on('click', '.ee-modal-menu__close', function () {
		espressoCloseModalMenus();
	});


	$wpContent.on('mouseenter', '.ee-aria-tooltip', function () {
		const label = $(this).attr('aria-label');
		const tooltip = '<span class="ee-tooltip">' + label + '</span>';

		const $tooltip = $(this).append(tooltip).find('.ee-tooltip').hide();

		let windowTop = $(window).scrollTop();
		const windowBottom = windowTop + $(window).height();
		let windowWidth = $(window).width() ;

		// modify window because of toolbars, scrollbars, etc
		windowTop += 32;
		windowWidth -= 32;
		const $adminBar = $('#wpadminbar');
		if ($adminBar.length && $adminBar.css('position') === 'fixed') {
			windowTop += 16;
		}

		// console.log({windowTop, windowBottom, windowWidth});

		const tooltipHeight = $tooltip.height();
		const tooltipWidth = $tooltip.width();
		const tooltipPosition = $(this).offset();

		const tooltipLeft = tooltipPosition.left;
		const tooltipRight = tooltipLeft + tooltipWidth;
		const tooltipTop = tooltipPosition.top;
		const tooltipBottom = tooltipTop + tooltipHeight;

		// console.log({tooltipLeft, tooltipWidth, tooltipRight});
		// console.log({tooltipTop, tooltipHeight, tooltipBottom});

		let shiftLeft = -16;
		let shiftTop = -32

		if (tooltipTop < windowTop) {
			shiftTop = (shiftTop - (windowTop - tooltipTop)) * -1;
		} else if (tooltipBottom > windowBottom) {
			shiftTop -= tooltipBottom - windowBottom;
		}

		if (tooltipLeft < 0) {
			shiftLeft = (shiftTop - tooltipLeft) * -1;
		} else if (tooltipRight > windowWidth) {
			shiftLeft -= tooltipRight - windowWidth;
		}

		// console.log({shiftTop, shiftLeft});
		$tooltip.css({
			left: $tooltip.position().left + shiftLeft + "px",
			top: $tooltip.position().top + shiftTop + "px"
		});

		$tooltip.delay(500).fadeIn(250);
	});

	$wpContent.on('mouseleave', '.ee-aria-tooltip', function () {
		$(this).find('.ee-tooltip').fadeOut(125).remove();
	});
});
