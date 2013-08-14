jQuery(document).ready(function($) {

	var TKT_helper = {

		ticketRow : 1,
		dateTimeRow: 1,
		context: 'datetime',
		itemdata: {},
		currentDOMElement: {},

		/**
		 * sets the context property on this object (by default context is 'datetime')
		 * @param  {string} context what context the event is being initiated in
		 * @return {TKT_helper} TKT_helper object for chaining
		 */
		setcontext : function(context) {
			if ( typeof(context) !== 'undefined' )
				this.context = context;
			return this;
		},



		/**
		 * sets the dateTimeRow property value
		 * @param  {int}    num dttrownum
		 * @return {TKT_helper} TKT_helper object for chaining
		 */
		setdateTimeRow : function( num ) {
			if ( typeof(num) !== 'undefined' )
				this.dateTimeRow = num;
			return this;
		},


		/**
		 * sets the ticketRow property value
		 * @param  {int}    num ticket row number to set
		 * @return {TKT_helper} TKT_helper object for chaining
		 */
		setticketRow : function( num ) {
			if ( typeof(num) !== 'undefined' )
				this.ticketRow = num;
			return this;
		},


		/**
		 * sets the data property value
		 * @param  {obj}    num data
		 * @return {TKT_helper} TKT_helper object for chaining
		 */
		setitemdata : function( data ) {
			if ( typeof(data) !== 'undefined' )
				this.itemdata = data;
			return this;
		},



		setcurrentDOMElement: function( element ) {
			if ( typeof(element) !== 'undefined' )
				this.currentDOMElement = element;
			return this;
		},



		/**
		 * gets the total row count jQuery object for the given context
		 * @return {jQuery obj}     jQuery obj that contains the row count
		 */
		getrowcountobject: function() {
			var rowcountobj;
			
			switch ( this.context ) {
				case 'datetime' :
					rowcountobj = $('#datetime-total-rows');
					break;
				case 'ticket' :
					rowcountobj = $('#ticket-total-rows');
					break;
			}

			return rowcountobj;
		},


		/**
		 * gets the total rows for a given context in the ui
		 * @return {int}            the row count
		 */
		getrowcount: function() {
			return this.getrowcountobject().val();
		},



		/**
		 * This increments the row count of a given context by one and returns the new row count
		 * @return {int}            the new row count
		 */
		increaserowcount: function() {
			var countobj = this.getrowcountobject();
			var newcount = countobj.val();
			newcount++;
			countobj.val(newcount);

			switch ( this.context ) {
				case 'datetime' :
					this.dateTimeRow = newcount;
					break;

				case 'ticket' :
					this.ticketRow = newcount;
					break;
			}

			return newcount;
		},




		/**
		 * This decrements the row count of a given context by one and returns the new row count
		 * note we do NOT UPDATE the value of the rowcountobject because otherwise we have to update any other existing rows.  We want to make sure we ALWAYS increment row counts.
		 * @return {int}            the new row count
		 */
		decreaserowcount: function() {
			var countobj = this.getrowcountobject(this.context);
			var newcount = countobj.val();
			var existingcount = newcount;
			newcount--;
			switch ( this.context ) {
				case 'datetime' :
					this.dateTimeRow = newcount;
					break;

				case 'ticket' :
					this.ticketRow = newcount;
					break;
			}
			return newcount;
		},




		/**
		 * gets the Ticket Title for the given ticketrow value
		 * @param {int} rownum The rownumber for the we're retrieving.  If not present then we use whats set in the ticketRow property.
		 * @return {string}           The title of the ticket.
		 */
		getTicketTitle: function( rownum ) {
			if ( typeof(rownum) === 'undefined' )
				rownum = this.ticketRow;
			return $('.edit-ticket-TKT-name', '#edit-ticketrow-' + rownum).val();
		},




		/**
		 * This creates a completely new row for an event Datetime and adds it to the UI.
		 * @return {TKT_helper obj}  return "this" to allow for possible chaining.
		 */
		newDTTrow: function() {
			var inputid, inputvalue, DTT_start_time, DTT_end_time, newDTTrow;
			//edit form stuff
			var DTTeditform = $('#edit-datetime-form-holder').html().clone();

			//replace DTTNUM with new row.
			this.context = 'datetime';
			var row = this.increaserowcount();
			DTTeditform = DTTeditform.replace('DTTNUM',row);
			DTTeditformobj = $(DTTeditform);

			//make sure all input vals get their values from the create form!
			DTTeditformobj.find('input').each( function() {
				inputid = this.attr('id').replace('-'+row,'');
				//first handle values we know AREN'T in the add-new-datetime form
				switch (inputid) {
					case 'event-datetime-DTT_ID' :
						$(this).val('0');
						break;
					
					case 'event-datetime-DTT_is_primary' :
						$(this).val(row === 1 ? '1' : '0');
						break;

					case 'event-datetime-DTT_EVT_start' :
						DTT_start_time = $('#add-new-' + inputid, '#add-event-datetime').val();
						$(this).val(DTT_start_time);
						break;

					case 'event-datetime-DTT_EVT_end' :
						DTT_end_time = $('#add-new-' + inputid, '#add-event-datetime').val();
						$(this).val(DTT_end_time);
						break;

					default :
						inputvalue = $('#add-new-' + inputid, '#add-event-datetime').val();
						$(this).val(inputvalue);
						break;
				}
			});

			//get list of available tickets and make sure they are present in the list.
			var existing_datetime_tickets_list = $('#dtt-existing-available-ticket-list-items-holder').html().clone();
			var existing_datetime_tickets_container = $('#edit-datetime-evaliable-tickets-holder').html().clone();

			//str replace on the existing_datetime_tickets so we get the DTTNUM set correctly
			existing_datetime_tickets_container = existing_datetime_tickets_container.replace('DTTNUM',row);
			

			//ARE there tickets?  If so, then we'll use them, if not, then we leave alone.
			if ( $(existing_datetime_tickets_container).contains('li.datetime-ticket') ) {
				$(existing_datetime_tickets_container).find('.datetime-tickets-list').html(existing_datetime_tickets);
			}

			//create new DTT display row.
			var DTT_display_row = $('#dtt_new_display_row_holder').html().clone();
			DTT_display_text = this.DTT_display_text(DTT_start_time, DTT_end_time);
			$(DTT_display_row).find('.datetime-title').text(DTT_display_text);

			//now let's add in the various components together for our new DTT row.
			newDTTrow = '<div id="event-datetime-' + row + '" class="event-datetime-row">' + $(DTT_display_row).html() + DTTeditformobj.html() + $(existing_datetime_tickets_container).html() + '</div>';

			//now let's append to the other rows and we'll scroll up the editor for the user to add/create tickets to the new datetime.
			$('.event-datetimes-container').append(newDTTrow);
			this.context = 'ticket';
			this.DateTimeEditToggle();
			return this;
		},





		/**
		 * This clones a given datetime row and adds the cloned datetime to the ui (updating all ui elements that have datetime references)
		 * @param  {int} row    The given row that we are cloning (DTT)
		 * @return {TKT_helper obj}     The TKT_helper obj that allows chaining.
		 */
		cloneDateTime: function( row ) {
			this.dateTimeRow = row;
			var newrownum = this.increaserowcount();
			var newDTTrow = $('#event-datetime-' + row).clone();
			var newid, newname, curid, curclass, data, curname, ticketsold, tickettitle;

			/*replace all old row values with newrownum*/
			//first let's do the <sections>.
			$(newDTTrow).find('section').each( function() {
				curid = $(this).attr('id');
				curclass = $(this).attr('class');
				newid = curid.replace(row,newrownum);
				$(this).attr('id', newid);
			});

			//next let's do the spans
			$(newDTTrow).find('span').each( function() {
				curclass = $(this).attr('class');
				this.itemdata = $(this).data();
				
				//handle data-datetime-row properties
				if ( typeof(this.itemdata) !== 'undefined' && typeof(this.itemdata.datetimeRow) !== 'undefined' ) {
					$(this).attr( 'data-datetime-row', newrownum ); //not using jquery .data() to set the value because that doesn't change the actual data attribute and if the datetime row is cloned it doesn't appear to clone the data() obj cache for the selector.
				}

				//handle ticket counts!
				if ( curclass == 'datetime-tickets-sold' ) {
					ticketsold = $(this).text().replace(/[0-9]/g,'') + '0';
					$(this).text(ticketsold);
				}

				if ( curclass == 'ticket-list-ticket-name' ) {
					//find out what ticket we are looking at.
					var parentdata = $(this).parent().data();
					
					//now we can get the ticket title from the tickets list and simply replace what's in the datetime ticket with it.  Why do we do this instead of just replacing the numbers?  Because the ticket title may have a number in it.
					tickettitle = TKT_helper.getTicketTitle( parentdata.ticketRow );
					$(this).text(tickettitle + '0');
				}

			});


			//table id updates
			$(newDTTrow).find('table').each( function() {
				curid = $(this).attr('id');

				if ( typeof(curid) !== 'undefined' ) {
					newid = curid.replace(row,newrownum);
					$(this).attr('id', newid);
				}
			});

			//buttons
			$(newDTTrow).find('button').each( function() {
				data = $(this).data();
				if ( typeof(data) !== 'undefined' && typeof(data.datetimeRow) !== 'undefined' )
					$(this).attr('data-datetime-row', newrownum);
			});


			//li
			$(newDTTrow).find('li').each( function() {
				data = $(this).data();
				if ( typeof(data) !== 'undefined' && typeof(data.datetimeRow) !== 'undefined' )
					$(this).attr('data-datetime-row', newrownum);
			});


			//div
			$(newDTTrow).find('div').each( function() {
				curid = $(this).attr('id');
				newid = curid.replace(row, newrownum);
				$(this).attr('id', newid);
			});


			//labels
			$(newDTTrow).find('label').each( function() {
				curid = $(this).attr('for');
				newid = curid.replace(row, newrownum);
				$(this).attr('for', newid);
			});


			//the big enchilda inputs!
			$(newDTTrow).find('input').each( function() {
				curclass = $(this).attr('class');
				curid = $(this).attr('id');
				curname = $(this).attr('name');

				switch ( curclass ) {
					case 'event-datetime-DTT_ID' :
					case 'event-datetime-DTT_is_primary' :
						newname = curname.replace(row, newrownum);
						$(this).attr('name', newname);
						$(this).val('0');
						break;

					case 'event-datetime-DTT_EVT_start' :
					case 'event-datetime-DTT_EVT_end' :
					case 'event-datetime-DTT_reg_limit' :
						newname = curname.replace(row, newrownum);
						newid = curid.replace(row, newrownum);
						$(this).attr('name', newname);
						$(this).attr('id', newid);
						break;

					case 'datetime-ticket-checkbox' :
						newname = TKT_helper.replaceRowValueByPosition(row, newrownum, 1, curname);
						$(this).attr('name', newname);
						break;

					case 'datetime-ticket-ids' :
						newname = TKT_helper.replaceRowValueByPosition(row, newrownum, 1, curname);
						newid = TKT_helper.replaceRowValueByPosition(row, newrownum, 1, curid);
						$(this).attr('name', newname);
						$(this).attr('id', newid);
						break;
				}
			});

			//k all replacements done, let's append the new row to the datetime-row container
			$('.event-datetimes-container').append(newDTTrow);

			// update ALL existing TKT edit forms with the new DTT li element.
			$('.edit-ticket-row').each( function() {
				TKT_helper.newDTTListRow( this );
			});

			//we need to toggle the edit DTT form for the new Datetime cloned.
			this.context = 'datetime';
			this.DateTimeEditToggle();

			return this;
		},



		/**
		 * Simply updates the ui for the updated row.
		 * NOTE: the save button only updates the ui and ensures that the autosave will get the data correctly.  ACTUAL edits to tickets and datetimes etc will NOT be attached to the "main" event post until the user clicks the "publish" or "update" button for the entire post.  That way the user can do manipulations and editing WIHOUT worrying about a "live" event being modified.
		 *
		 * @param  {int} dttrow        this is the dttrow being "updated"
		 * @return {TKT_helper}        this object for chainability
		 */
		updateDTTrow: function( dttrow ) {
			var lidttitem;
			this.dateTimeRow = dttrow;
			//need to update the displayed datetime string for the datetime title...
			var DTT_display_text = this.DTT_display_text( $('.event-datetime-DTT_EVT_start-' + this.dateTimeRow).val(), $('.event-datetime-DTT_EVT_end-' + this.dateTimeRow).val() );
			$('.datetime-title', '#event-datetime-' + this.dateTimeRow).text(DTT_display_text);

			//... and in all related dtt list rows!
			$('.edit-ticket-row').each( function() {
				lidttitem = $('li', '.datetime-tickets-list').find('[data-datetime-row="' + this.dateTimeRow + '"]');
				$('.ticket-list-ticket-name', lidttitem).text(DTT_display_text);
			});

			this.context = 'datetime';
			this.DateTimeEditToggle();
			return this;
		},



		/**
		 * generates a new DTT list row for available ticket rows.
		 * @param  {string} ticketrow this ticket row the dtt list item is being added to
		 * @return {TKT_helper obj}   for chainability
		 */
		newDTTListRow: function(ticketrowitm) {
			var ticketrownum = $(ticketrowitm).attr('id').replace('edit-ticketrow-ticketrow-', '');
			var new_dtt_list_row = $('#dtt-new-available-datetime-list-items-holder').html().clone();
			var default_list_row_for_dtt;

			//replace all instances of DTTNUM with dttrow
			new_dtt_list_row = new_dtt_list_row.replace('/DTTNUM/g', this.datetimeRow);
			default_list_row_for_dtt = new_dtt_list_row; //without TICKET_NUM replaced.
			//replace all instances of TICKETNUM with ticketrownum
			new_dtt_list_row = new_dtt_list_row.replace('/TICKETNUM/g',ticketrownum);

			//append new_dtt_list_row to the ul for datetime-tickets attached to ticket.
			$(ticketrowitm).find('.datetime-tickets-list').append(new_dtt_list_row);

			//append new dtt_list_row to the available dtts row BUT we need to make the ticketnum generic!
			$('#dtt-existing-available-datetime-list-items-holder').append(default_list_row_for_dtt);

			return this;
		},


		/**
		 * Takes care of trashing a datetime in the UI and updating all the relevant ui elements
		 * @param  {int} row dtt row num being trashed
		 * @return {obj}     This object (allows for chaining)
		 */
		trashDTT: function(row) {
			this.decreaserowcount(row);
			var curid, newid, varnewids;
			//remove row from dom
			$('#event-datetime-row-' . row ).remove();


			//update the datetime-ticket-ids tracked values cause ticket no longer can have this datetime associated with it.
			var ticket_datetime_ids = $('#ticket-datetime-ids').val().split(",");
			datetimeids.each( function(i, val) {
				if ( val === row )
					ticket_datetime_ids = TKT_helper.removeFromArray(ticket_datetime_ids, i);
			});
			$('#ticket-datetime-ids').val( ticket_datetime_ids.join(',') );
			

			//updated tickets that have this row attached (and remove as option for tickets)
			$('.datetime-tickets-list', '.event-tickets-container').find('li[data-datetime-row="' + row + '"]').remove();

			//remove the dtt_list_row from the available dtts row
			$('li', '#dtt-existing-available-datetime-list-items-holder').find('[data-datetime-row=' + row + '"]').remove();
			return this;
		},



		/**
		 * Toggle a datetime ticket or ticket datetime list item from active to inactive (and the related attachments to the datetime or ticket).
		 * @param  {obj}        itm  the selected item
		 * @return {TKT_helper}      this object for chainability
		 */
		toggleTicketSelect: function(itm) {
			this.itemdata = $(itm).data();
			var selecting = $(itm).hasClass('ticket-selected') ? false : true;
			var relateditm = this.itemdata.context == 'datetime-ticket' ? $('.datetime-tickets-list', '#edit-ticketrow-ticketrow-' + this.itemdata.ticketRow).find('li[data-datetime-row="' + this.itemdata.ticketRow + '"]') : $('.datetime-tickets-list', '#edit-event-datetime-tickets-' + this.itemdata.datetimeRow).find('li[data-ticket-row="' + this.itemdata.ticketRow + '"]');

			if ( selecting ) {
				$(itm).addClass('ticket-selected');
				relateditm.addClass('ticket-selected');
				//update selected tracking in various contexts
				this.addTicket();
			} else {
				$(itm).removeClass('ticket-selected');
				relateditm.removeClass('ticket-selected');
				this.removeTicket();
			}
			return this;
		},




		/**
		 * wrapper for TKT_helper.changeTicket that makes sure we're ADDING a ticket to an item
		 * @return {TKT_helper} this object for chainability
		 */
		addTicket: function() {
			this.changeTicket(this.itemdata.datetimeRow, this.itemdata.ticketRow);
			this.changeTicket(this.itemdata.ticketRow, this.itemdata.datetimeRow, 'ticket-datetime');
			return this;
		},



		/**
		 * wrapper for TKT_helper.changeTicket that makes sure we're REMOVING a ticket from an item
		 * @return {TKT_helper}      this object for chainability
		 */
		removeTicket: function() {
			this.changeTicket(this.itemdata.datetimeRow, this.itemdata.ticketRow, 'datetime-ticket', true);
			this.changeTicket(this.itemdata.ticketRow, this.itemdata.datetimeRow, 'ticket-datetime', true);
			return this;
		},



		/**
		 * Makes sure that the hidden row recording selected tickets for the current session is updated accordingly
		 * @param  {string} idrow    the row id for the row being updated.
		 * @param  {string} valuerow the row id for the value being recorded.
		 * @param  {string} context  the context that helps us determine which recording id we're using
		 * @param  {bool}   remove     indicate whether we're rmoving the valuerow or adding it.
		 * @return {TKT_helper}      This obj for chainability.
		 */
		changeTicket: function(idrow, valuerow, context, remove) {
			remove = typeof(remove) === 'undefined' ? false : remove;
			context = typeof(context) === 'undefined' ? 'datetime-ticket' : context;
			var changeid = '#' + context + '-ids-' + idrow;
			var curitems = $(changeid).val().split(',');

			if ( remove ) {
				curitems.each( function(i, val) {
					if ( val === valuerow )
						curitems = TKT_helper.removeFromArray(curitems, i);
				});
			} else {
				curitems.push(valuerow);
			}
			$(changeid).val(curitems.join(','));
			return this;
		},



		/**
		 *  Used to replace a row value in a given string.  So something like "datetime-ticket[row][row]" could have "row" replaced by "newrow" via doing TKT_helper.replaceRowValueByPosition(row, 2, 1, 'datetime-ticket[row][row]'); and getting the resulting string of "datetime-ticket[1][row]";
		 * @param  {string} searchstring   What we're replacing
		 * @param  {string} newvalue       What we're replacing with
		 * @param  {int}    position       What position in the stringtosearch we're replacing.
		 * @param  {string} stringtosearch What is being searched
		 * @return {string}                The string with the replaced values
		 */
		replaceRowValueByPosition: function(searchstring, newvalue, position, stringtosearch) {
			var pattern = new RegExp( searchstring, 'g' );
			var pnth = 0;
			var parsedstr = stringtosearch.replace(pattern, function( match, i, original ) {
				pnth++;
				return ( pnth === position ) ? newvalue : match;
			});
			return parsedstr;
		},




		/**
		 * This simply retrieves a human friendly DTT string for display in the DTT_display row
		 * @param {string} start DTT_start_date
		 * @param {string} end   DTT_end_date
		 * @return {strgin} human friendly formatted DTT string combining start and end.
		 */
		DTT_display_text: function(start, end) {
			var datedisplaytext;
			var fullstartdate = moment( start, 'yyyy-MM-dd h:mm a' );
			var fullenddate = moment( end, 'yyyy-MM-dd H:mm a' );

			//first are months equal?
			if ( fullstartdate.month() != fullenddate.month() ) {
				datedisplaytext = fullstartdate.format("MMM D, YYYY h:mm a") + " - " + fullenddate.format("MMM D, YYYY h:mm a");
			} else if ( fullstartdate.month() == fullenddate.month() && fullstartdate.date() != fullenddate.date() ) {
				datedisplaytext = fullstartdate.format("MMM D, h:mm a") + " - " + fullenddate.format("MMM D, h:mm a YYYY");
			} else {
				datedisplaytext = fullstartdate.format("MMMM D, YYYY") + ' @ ' + fullstartdate.format("h:mm a") + ' - ' + fullenddate.format("h:mm a");
			}

			return datedisplayformat;
		},





		/**
		 * This toggles the display of the edit form for a dtt row depending on the context and row num properties set.
		 *
		 */
		DateTimeEditToggle: function() {
			if ( this.context == 'ticket' )
				this.scrollTo($('#edit-event-datetime-tickets-' + this.dateTimeRow )).slideToggle( 500 );
			else if ( this.context == 'datetime' )
				this.scrollTo($('#edit-event-datetime-' + this.dateTimeRow )).slideToggle( 500 );
			return this;
		},




		/**
		 * This toggles the display of the edit form for a Ticket row num given.
		 */
		TicketEditToggle: function() {
			this.scrollTo($('#edit-ticketrow-' + this.ticketRow)).slideToggle(500);
		},



		/**
		 * This helper method simply removes an item (or group of items) from a js array.
		 * @link http://ejohn.org/blog/javascript-array-remove/
		 * @param  {array} array js array to remove items from
		 * @param  {int} from    index of what element is being removed
		 * @param  {int} to      index of what second element is being removed
		 * @return {array}       array with removed items
		 */
		removeFromArray: function( array, from, to ) {
			var rest = array.slice((to || from) +1 || array.length);
			array.length = from < 0 ? array.length + from : from;
			return array.push.apply(array, rest);
		},




		/**
		 * handy helper method for scrolling to an item.
		 * @param  {jQuery obj}    the selector obj that we want to scroll to in the DOM
		 * @return {jQuery obj}    selector for chainability
		 */
		scrollTo: function( selector ) {
			if ( typeof(selector) === 'undefined' )
				selector = this.selector;
			$("html,body").animate({
				scrollTop: selector.offset().top
			}, 2000);
			return selector;
		}




	};


	/**
	 * all event datetims and tickets triggers go below here
	 */

	/**
	 * add datetime/ticket
	 */
	$('#event-and-ticket-form-content').on('click', '.ee-create-button', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		if ( data.context == 'datetime' ) {
			TKT_helper.newDTTrow();
		}
		return true;
	});


	/**
	 * update datetime/ticket
	 */
	$('#event-and-ticket-form-content').on('click', '.ee-save-button', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		if ( data.context == 'datetime' ) {
			TKT_helper.updateDTTrow(data.datetimeRow);
		}
	});

	/**
	 * edit datetime/ticket
	 */
	$('#event-and-ticket-form-content').on('click', '.gear-icon', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		switch ( data.context ) {
			case 'datetime' :
			case 'ticket-datetime' :
				TKT_helper.setcontext('datetime').setDatetimeRow(data.datetimeRow).DateTimeEditToggle();
				break;

			case 'datetime-ticket' :
			case 'ticket' :
				TKT_helper.setticketRow(data.ticketRow).TicketEditToggle();
				break;
			
			case 'short-ticket' :
				TKT_helper.newTicketrow().TicketEditToggle();
		}
		return true;
	});


	/**
	 * assigned tickets toggle
	 */
	$('#event-and-ticket-form-content').on('click', '.ticket-icon', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		TKT_helper.DateTimeEditToggle( 'ticket', data.datetimeRow );
		return true;
	});


	/**
	 * clone icon toggle
	 */
	$('#event-and-ticket-form-content').on('click', '.clone-icon', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		if ( data.context == 'datetime' )
			TKT_helper.cloneDateTime(data.datetimeRow);
		return true;
	});



	/**
	 * trash icon click
	 */
	$('#event-and-ticket-form-content').on('click', '.trash-icon', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		if ( data.context == 'datetime' ) {
			TKT_helper.trashDTT(data.datetimeRow);
		}
		return true;
	});



	/**
	 * datetime/ticket list item clicked to attach detach from related item.
	 */
	$('#event-and-ticket-form-content').on('click', '.datetime-ticket', function(e) {
		e.preventDefault();
		e.stopPropagation();
		TKT_helper.toggleTicketSelect(this);
		return true;
	});
});