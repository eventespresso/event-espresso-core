jQuery(document).ready(function($) {

    const EENewsletterTrigger = {

        //used to hold whatever the selected MTP is in the selector.
        selectedMTP: 0,
        formContent: '',
        batchMessageSendForm: null,

        /**
         * this retrieves the form from the page if not already cached in the internal var
         * @return {string}  form html
         */
        getForm: function() {
            if ( this.formContent === '' ) {
                this.batchMessageSendForm = $('#ee-batch-message-send-form');
                this.formContent = this.batchMessageSendForm.html();
                this.batchMessageSendForm.html('');
            }
            //make sure all formContent is empty.
            return this.formContent;
        },


        /**
         * displays the content retrieved from ajax
         * @param  {string} content the content to display
         * @param  {string} what    what to do with existing content in the target container ('clear', 'append', 'prepend')
         * @return {void}
         */
        display_content: function(content, what ) {
            const $spinner = $('#espresso-ajax-loading');
            $spinner.eeRemoveOverlay().hide();
            if ( typeof(what) === 'undefined' ) what = 'clear';

            //if content is empty let's get out
            if ( ( content === '' || typeof(content) === 'undefined' ) )
                return;

            const $contentDiv = $('.ee-notices', '.ee-admin-dialog-container');

            $spinner.eeRemoveOverlay().hide();
            if ( what === 'clear' ) {
                $contentDiv.html('');
                $contentDiv.html(content);
            } else if ( what === 'append' ) {
                $contentDiv.append(content);
            } else if ( what === 'prepend' ) {
                $contentDiv.prepend(content);
            }
        },



        /**
         * this displays the form in an ee-dialog.
         * @return void
         */
         displayForm: function() {
            const selected = [];
            //let's get all selected regs/contacts.
            $('#the-list input[type=checkbox]').each( function() {
                if ( $(this).prop("checked") )
                    selected.push($(this).val());
            });

            const selectedCount = selected.length;
            const selectedSerialized = JSON.stringify( selected );

            if ( selectedCount === 0 )
                return;

            //get the form
            const content = this.getForm();

            dialogHelper.displayModal(true).addContent(content);
            const $header = $('.newsletter-send-form-title');
            $header.text($header.text().replace('[NUMPEOPLE]', selectedCount));

            //add values to input
            $('#newsletter-batch-ids').val(selectedSerialized);

            $('.ee-admin-dialog-container').eeScrollTo(400);
         },



         /**
          * This resets form inputs, closes ee-dialog.
          * @return {void}
          */
         closeForm: function() {
           this.resetFormInputs();
            $('.batch-message-edit-fields').hide();
            dialogHelper.closeModal();
            this.setClickEventForShortcodePicker(false);
         },



         /**
          * all this does is reset the form inputs
          * @return {void}
          */
         resetFormInputs: function() {
             $('input', '.batch-message-edit-fields').each( function() {
                $(this).val('');
            });

            $('textarea', '.batch-message-edit-fields').val('');
         },


         /**
          * updates the form inputs to be filled with data from the selected mtp.
          * @param  {string} selected_mtp the id for the selected mtp
          * @return {void}
          */
         updateForm: function( selected_mtp ) {
            const selectedMtp = parseInt(selected_mtp,10);
            const $editFields = $('.batch-message-edit-fields');
            //if the selected_mtp is 0 then let's just reset the form inputs and hide the form
            if ( typeof selectedMtp === 'undefined' || selectedMtp === 0 ) {
                this.resetFormInputs();
                $editFields.hide();
                return;
            }

             $editFields.show();

            //we have a selected_mtp so let's query and get the data for the form.
            this.doAjax(selectedMtp);
         },




         /**
          * This populates the form with the incoming response from ajax
          * @param  {object} response
          * @return {void}
          */
         populateForm:function( response ) {
            $('#espresso-ajax-loading').eeRemoveOverlay().hide();
            //so we need to go through the response and update the related inputs.
            $('#batch-message-from').val(response?.batch_message_from);
            $('#batch-message-subject').val(response?.batch_message_subject);
            $('#batch-message-content').val(response?.batch_message_content);
            this.setClickEventForShortcodePicker();
         },



        /**
         * Sets the namespaced click event for the shortcode picker.
         * @param {boolean} bind whether to bind or unbind the click event
         */
        setClickEventForShortcodePicker: function(bind)
        {
            const $shortcodeContainer = $('.ee_shortcode_chooser_container', '.batch-message-edit-fields'),
                clickHandler = function() {
                    EENewsletterTrigger.shortCodePickerClickEvent(this);
                };

            if (typeof bind === 'undefined' || typeof bind !== 'boolean') {
                $('.js-shortcode-selection', $shortcodeContainer).on('click.shortcodeClick', clickHandler)
            } else {
                $('.js-shortcode-selection', $shortcodeContainer).off('click.shortcodeClick', clickHandler)
            }
        },


        /**
         * Handler for a clicked shortcode element.
         * @param {object} clickedEl
         */
        shortCodePickerClickEvent: function(clickedEl) {
            const shortcodeRequested = $(clickedEl).data('value');
            const input = $(clickedEl).data('linkedInputId');
            this.addShortcodeToInput(input, shortcodeRequested);
        },


        /**
         * Adds the given shortcode to the attached input.
         * @param {string} inputId
         * @param {string} shortcodeRequested
         */
        addShortcodeToInput: function(inputId, shortcodeRequested) {
            if (typeof inputId !== 'string' || typeof shortcodeRequested !== 'string') {
                return;
            }
            const input = document.getElementById(inputId);
            const $input = $(input);

            if(document.selection) {
                // Go the IE way
                $input[0].focus();
                document.selection.createRange().text=shortcodeRequested;
            } else if ('selectionStart' in input) {
                const startPos = input.selectionStart;
                input.value = input.value.substr(0, startPos) + shortcodeRequested + input.value.substr(input.selectionEnd, input.value.length);
                input.selectionStart = startPos + input.value.length;
                input.selectionEnd = startPos + shortcodeRequested.length;
            }
        },



         /**
          * does the ajax to update the form inputs from the given selected_mtp id
          *
          * @since 4.3.0
          *
          * @param  {int}       selected_mtp id for the message template selected.
          * @return {void}
          */
         doAjax: function( selected_mtp ) {
                $('#espresso-ajax-loading').eeCenter('fixed').eeAddOverlay(0.5).show();
                const data = {
                    'action' : 'get_newsletter_form_content',
                    'page' : 'espresso_registrations',
                    'get_newsletter_form_content_nonce' : $('#get_newsletter_form_content_nonce').val(),
                    'GRP_ID' : selected_mtp,
                    'ee_admin_ajax' : true
                };
                //do post
            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: data,
                success: function(response, status, xhr) {
                    const ct = xhr.getResponseHeader("content-type") || "";
                    let resp = '', isjson = true;
                    if (ct.indexOf('html') > -1) {
                        //last verification that we definitely DON'T have JSON (possibly via exceptions)
                        try {
                            resp = $.parseJSON(response);
                        } catch (e) {
                            EENewsletterTrigger.display_content(response, 'clear');
                            isjson = false;
                        }

                    }

                    if ( ct.indexOf('json') > -1 || isjson ) {
                        resp = resp === '' ? response : resp;

                        if ( resp.error ) {
                            console.log(resp);
                            EENewsletterTrigger.display_content(resp.notices, 'clear');
                        } else {
                            EENewsletterTrigger.populateForm(resp.data);
                        }
                        if ( resp.data.close ) {
                            $('#espresso-ajax-loading').eeRemoveOverlay().hide();
                            EENewsletterTrigger.closeForm();
                        }
                    }
                },
                error: function(xhr) {
                    EENewsletterTrigger.display_content(xhr.responseText, 'clear');
                }
            });
         }

    };

    $('.list-table-bottom-buttons').on('click', '#selected-batch-send-trigger', function(e) {
            e.preventDefault();
            e.stopPropagation();
            EENewsletterTrigger.displayForm();
    });

    $('.wp-list-table').on('change', 'input[type="checkbox"]', function() {
        //count all checkboxes that are checked.
        const checkCount = $('#the-list input[type=checkbox]:checked').length;
        $('.send-selected-newsletter-count', '#selected-batch-send-trigger').text(checkCount);
    });

    const $mainDoc = $(document);

    $mainDoc.on('change', '#newsletter_mtp_selected', function() {
        //get selected value and send to server
        EENewsletterTrigger.updateForm($(this).val());
    });


    $mainDoc.on('click', '.js-open-list-trigger', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const container = '#' + $(this).attr('id').replace('toggle', 'container');
        $(container).removeClass('ee-mini-modal--closed' ).addClass('ee-mini-modal--open');
    });

    $mainDoc.on('click', '.ee-mini-modal-close-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).parent('.ee-mini-modal').removeClass('ee-mini-modal--open' ).addClass('ee-mini-modal--closed');
    });

    $mainDoc.on('click', '.batch-message-cancel', function(e) {
        e.preventDefault();
        e.stopPropagation();
        EENewsletterTrigger.closeForm();
    });

    $mainDoc.on('click', '.batch-message-submit', function() {
      $('#espresso-ajax-loading').eeCenter('fixed').eeAddOverlay(0.5).show();
    });

});
