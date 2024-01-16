jQuery(document).ready(function($) {

	$.ajaxSetup ({ cache: false });
	// clear firefox and safari cache
	$(window).on("unload", function() {});

	const $wpwrap = $('#wpwrap');


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


	$wpwrap.on( 'click', '.espresso-help-tab-lnk', function(){
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
            const page = $('#espresso_admin_current_page').val();
			if ( e.length ) {
				p = e.parent();
				var u = $('#' + id + '_url').text();
				setTimeout( function(){
					p.load( ajaxurl + '?page=' + page + '&action=espresso-ajax-content&ee_admin_ajax=1&contentid=' + id + '&contenturl=' + u, '', function() {
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

	$wpwrap.on( 'click', '.ee-modal-menu__button', function(e) {
		e.preventDefault();
		espressoCloseModalMenus();
		$(this).parent().toggleClass('active');
	});
	$wpwrap.on('click', '.ee-modal-menu__close', function () {
		espressoCloseModalMenus();
	});


	$wpwrap.on('mouseenter', '.ee-aria-tooltip', function () {
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

		const tooltipHeight = $tooltip.outerHeight();
		const tooltipWidth = $tooltip.outerWidth();
		const tooltipOffset = $(this).offset();
        const tooltipLeft = tooltipOffset.left;
        const tooltipRight = tooltipLeft + tooltipWidth;
        const tooltipTop = tooltipOffset.top;
        const tooltipBottom = tooltipTop + tooltipHeight;

		let shiftLeft = -16; // plus 1 rem for a bit of space
		let shiftTop = (tooltipHeight + 8) * -1; // plus half rem for a bit of space

        // does tooltip go off the top of the screen?
		if (tooltipTop < windowTop) {
			shiftTop -= tooltipTop - windowTop;
		}
        // or the bottom of the screen?
        if (tooltipBottom > windowBottom) {
			shiftTop -= tooltipBottom - windowBottom;
		}
        // what about the left side of the screen?
		if (tooltipLeft < 0) {
			shiftLeft = 16; // just set left to 1 rem for a bit of space
		}
        // or the right side?
        if (tooltipRight > windowWidth) {
			shiftLeft -= tooltipRight - windowWidth;
		}

        const $parent = $(this).closest('.ee-aria-tooltip__bounding-box');
        if ($parent.length) {
            const parentHeight = $parent.height();
            const parentWidth = $parent.width();
            const parentOffset = $parent.offset();
            const parentLeft = parentOffset.left;
            const parentRight = parentLeft + parentWidth;
            const parentTop = parentOffset.top;
            const parentBottom = parentTop + parentHeight;

            // does tooltip go off the top of the parent container?
            if ((tooltipTop + shiftTop) < parentTop) {
                shiftTop += tooltipTop - parentTop;
            }
            // or the bottom of the parent container?
            if ((tooltipBottom + shiftTop) > parentBottom) {
                shiftTop -= tooltipBottom - parentBottom;
            }
            // what about the left side of the parent container?
            if ((tooltipLeft + shiftLeft) < parentLeft) {
                shiftLeft = parentLeft + 16;
            }
            // or the right side of the parent container?
            if ((tooltipRight + shiftLeft) > parentRight) {
                shiftLeft -= tooltipRight - parentRight + 16;
            }
        }
        const tooltipStyles = {
            left: shiftLeft + "px",
            top: shiftTop + "px"
        };

		$tooltip.css(tooltipStyles).delay(500).fadeIn(250);
	});

	$wpwrap.on('mouseleave', '.ee-aria-tooltip', function () {
        // comment this out if you need to adjust tooltip styles and want them to stay open
		$(this).find('.ee-tooltip').fadeOut(125).remove();
	});

	// list table filters
	$('.ee-list-table-filter-submit').click(function () {
		$('#ee-list-table-use-filters').val('yes');
	});


	const $listTableFilters = $('#ee-list-table-filters-dv');
	const $filtersToggle = $('#ee-list-table-filters-toggle');
	const $filtersToggleText = $('.ee-list-table-filters-toggle-text');
	const $filtersToggleHideText = $filtersToggle.data('hideText');
	const $filtersToggleShowText = $filtersToggle.data('showText');
	// kinda lame, but we need to delay toggling the button text by the slightest amount
	// because otherwise the visibility of $listTableFilters is off and incorrect
	let delayedToggleTextChange;
	// if the toggle filters button is clicked...
	$filtersToggle.on('click', function (e) {
		e.preventDefault();
		delayedToggleTextChange = setTimeout(toggleListTableFilters, 1);
	});
	// or the window orientation changes
	$(window).on("orientationchange",function(){
		delayedToggleTextChange = setTimeout(toggleListTableFilters, 1);
	});
	const toggleListTableFilters = function(el) {
		if ($listTableFilters.is(":visible")) {
			$listTableFilters.fadeOut("fast", function() {
				$filtersToggleText.text($filtersToggleShowText);
			});
		} else {
			$listTableFilters.css("display", "flex").hide().fadeIn("fast", function() {
				$filtersToggleText.text($filtersToggleHideText);
			});
		}
		clearTimeout(delayedToggleTextChange);
	}
});
