jQuery(document).ready(function($) {

	var TKT_helper = {

		ticketRow : 1,
		dateTimeRow: 1,
		priceRow: 1,
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
				case 'price' :
					this.ticketRow = this.itemdata.ticketRow;
					rowcountobj = $('#price-total-rows-' + this.ticketRow);
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

				case 'price' :
					this.priceRow = newcount;
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
			return $('.edit-ticket-TKT_name', '#edit-ticketrow-' + rownum).val();
		},




		/**
		 * This creates a completely new row for an event Datetime and adds it to the UI.
		 * @return {TKT_helper obj}  return "this" to allow for possible chaining.
		 */
		newDTTrow: function() {
			var inputid, inputvalue, DTT_start_time, DTT_end_time, newDTTrow;
			this.context = 'datetime';
			var row = this.increaserowcount();

			var DTT_row_container = $('#edit-datetime-form-container-holder').clone().html().replace(/DTTNUM/g, row);
			DTT_row_container = $(DTT_row_container).appendTo('.event-datetimes-container');

			//edit form stuff
			var DTTeditform = $('#edit-datetime-form-holder').clone().html().replace(/DTTNUM/g, row);
			DTTeditform = $(DTTeditform).appendTo(DTT_row_container);

			//make sure all input vals get their values from the create form!
			DTTeditform.find('input').each( function() {
				inputid = $(this).attr('id').replace('-'+row,'');
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

			//clear addnewdtt inputs
			$('#add-event-datetime').find('input').each(function() { $(this).val(''); });

			//get list of available tickets and make sure they are present in the list.
			var existing_datetime_tickets_list = $('#dtt-existing-available-ticket-list-items-holder').clone().html().replace(/DTTNUM/g,row);
			var existing_datetime_tickets_container = $('#edit-datetime-available-tickets-holder').clone().html().replace(/DTTNUM/g,row);

			existing_datetime_tickets_container = $(existing_datetime_tickets_container).appendTo(DTT_row_container);
			

			//ARE there tickets?  If so, then we'll use them, if not, then we leave alone.
			if ( existing_datetime_tickets_list.length > 0 ) {
				$(existing_datetime_tickets_container).find('.datetime-tickets-list').html(existing_datetime_tickets_list);
			}

			//create new DTT display row.
			var DTT_display_row = $('#dtt_new_display_row_holder').clone().html().replace(/DTTNUM/g, row);
			DTT_display_row = $(DTT_display_row).prependTo(DTT_row_container);

			//replace DTTNUM
			DTT_display_text = this.DTT_display_text(DTT_start_time, DTT_end_time);
			$(DTT_display_row).find('.datetime-title').text(DTT_display_text);

			//we need to make sure this new DTT has a related DTT_list_row created and added to all existing tickets and helper containers
			$('.edit-ticket-row', '.event-tickets-container').each( function() {
				TKT_helper.newDTTListRow( this );
			});

			
			//on brand new events the ticket-container is hidden (making sure a datetime gets created first).  let's show that now
			$('.event-tickets-container').fadeIn();
			this.context = 'ticket';
			return this;
		},





		/**
		 * This clones a given datetime row and adds the cloned datetime to the ui (updating all ui elements that have datetime references)
		 * @param  {int} row    The given row that we are cloning (DTT)
		 * @return {TKT_helper obj}     The TKT_helper obj that allows chaining.
		 */
		cloneDateTime: function( row ) {
			this.dateTimeRow = row;
			this.context = 'datetime';
			var newrownum = this.increaserowcount();
			var newDTTrow = $('#event-datetime-' + row).clone().attr('id','event-datetime-' + newrownum).appendTo('.event-datetimes-container');
			var newid, newname, curid, curclass, data, curname, ticketsold, tickettitle;

			/*replace all old row values with newrownum*/
			//first let's do the <sections>.
			newDTTrow.find('section').each( function() {
				curid = $(this).attr('id');
				curclass = $(this).attr('class');
				newid = curid.replace(row,newrownum);
				$(this).attr('id', newid);
			});

			//next let's do the spans
			newDTTrow.find('span').each( function() {
				curclass = $(this).attr('class');
				TKT_helper.itemdata = $(this).data();
				
				//handle data-datetime-row properties
				if ( typeof(TKT_helper.itemdata) !== 'undefined' && typeof(TKT_helper.itemdata.datetimeRow) !== 'undefined' ) {
					$(this).attr( 'data-datetime-row', newrownum ); //not using jquery .data() to set the value because that doesn't change the actual data attribute.
					$(this).data('datetimeRow', newrownum); //we still need to change the data on the element otherwise it remains as the value set on the previous element.
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
					$(this).text(tickettitle + ': 0');
				}

			});


			//table id updates
			newDTTrow.find('table').each( function() {
				curid = $(this).attr('id');

				if ( typeof(curid) !== 'undefined' ) {
					newid = curid.replace(row,newrownum);
					$(this).attr('id', newid);
				}
			});

			//buttons
			newDTTrow.find('button').each( function() {
				data = $(this).data();
				if ( typeof(data) !== 'undefined' && typeof(data.datetimeRow) !== 'undefined' ) {
					$(this).attr('data-datetime-row', newrownum);
					$(this).data('datetimeRow', newrownum);
				}
			});


			//li
			newDTTrow.find('li').each( function() {
				data = $(this).data();
				if ( typeof(data) !== 'undefined' && typeof(data.datetimeRow) !== 'undefined' ) {
					$(this).attr('data-datetime-row', newrownum);
					$(this).data('datetimeRow', newrownum);
				}
			});


			//div
			newDTTrow.find('div').each( function() {
				curid = $(this).attr('id');
				if ( typeof(curid) !== 'undefined' ) {
					newid = curid.replace(row, newrownum);
					$(this).attr('id', newid);
				}
			});


			//labels
			newDTTrow.find('label').each( function() {
				curid = $(this).attr('for');
				newid = curid.replace(row, newrownum);
				$(this).attr('for', newid);
			});


			//the big enchilda inputs!
			newDTTrow.find('input').each( function() {
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


			// update ALL existing TKT edit forms with the new DTT li element.
			$('.edit-ticket-row', '.event-tickets-container').each( function() {
				TKT_helper.newDTTListRow( this );
			});

			//set the context for any potential chains on this.
			this.context = 'datetime';

			return this;
		},



		/**
		 * This clones a ticket from a given row and updates all ui elements
		 * @param  {string} row what row we're cloning
		 * @return {this}       TKT_Helper obj for chainability.
		 */
		cloneTicket: function(row) {
			var newid, newname, curid, curclass, data, curname, ticketsold, tickettitle;
			this.ticketRow = row;
			this.context = 'ticket';
			var newrownum = this.increaserowcount();
			var newTKTrow = $('#display-ticketrow-' + row).clone().attr('id', 'display-ticketrow-' + newrownum).add( $('#edit-ticketrow-' + row ).clone().attr('id', 'edit-ticketrow-' + newrownum));

			newTKTrow = $('.ticket-table', '.event-tickets-container').find('tbody').append(newTKTrow);

			/*replace all old row values with newrownum*/

			//divs
			newTKTrow.find('div').each( function() {
				curid = $(this).attr('id');
				if ( typeof(curid) !== 'undefined' ) {
					newid = curid.replace(row, newrownum);
					$(this).attr('id', newid);
				}
			});

			//first the trs
			newTKTrow.find('tr').each( function() {
				curid = $(this).attr('id');

				// first make sure this isn't a vanilla tr
				if ( typeof(curid) === 'undefined' )
					return true;

				//second make sure this isn't a price tr if it is we handle differently.
				if ( $(this, '.price-table').length > 0 ) {
					newid = TKT_helper.replaceRowValueByPosition(row, newrownum, 1, curid);
				} else {
					newid = curid.replace(row, newrownum);
				}

				$(this).attr('id', newid);
			});

			//spans
			newTKTrow.find('span').each( function() {
				curclass = $(this).attr('class');
				curid = $(this).attr('id');
				TKT_helper.itemdata = $(this).data();

				if ( curclass === 'ticket-display-row-TKT_sold' )
					$(this).text('0');

				if ( typeof(TKT_helper.itemdata) !== 'undefined' && typeof(TKT_helper.itemdata.ticketRow) !== 'undefined' ) {
					$(this).attr('data-ticket-row', newrownum);
					$(this).data('ticketRow', newrownum);
				}

				if ( typeof(curid) !== 'undefined' )
					$(this).attr('id', curid.replace(row, newrownum) );
			});

			//fieldset
			var fieldsetid = newTKTrow.find('fieldset').attr('id');
			newTKTrow.find('fieldset').attr('id', fieldsetid.replace(row, newrownum ) );

			//inputs
			newTKTrow.find('input').each(function() {
				curname = $(this).attr('name');
				curid = $(this).attr('id');

				//are we in the price rows?
				if ( $(this, '.price-table').length > 0 ) {
					newname = TKT_helper.replaceRowValueByPosition(row, newrownum, 1, curname);
				//are we in the dtt list-items?
				} else if ( $(this, '.datetime-tickets-list').length > 0 ) {
					newname = TKT_helper.replaceRowValueByPosition(row, newrownum, 2, curname);
				} else {
					newname = curname.replace(row, newrownum);
				}

				//ids?
				if ( typeof(curid) !== 'undefined' ) {
					newid = curid.replace(row, newrownum);
				}

				$(this).attr('id', newid);
				$(this).attr('name', newname);
			});

			//textarea
			newTKTrow.find('textarea').each( function() {
				curname = $(this).attr('name');

				//are we in the price rows?
				if ( $(this, '.price-table').length > 0 ) {
					newname = TKT_helper.replaceRowValueByPosition(row, newrownum, 1, curname);
				} else {
					newname = curname.replace(row, newrownum);
				}
				$(this).attr('name', newname);
			});

			//select
			newTKTrow.find('select').each( function() {
				curname = $(this).attr('name');
				newname = TKT_helper.replaceRowValueByPosition(row, newrownum, 1, curname);
				$(this).attr('name', newname);
			});

			//li
			newTKTrow.find('li').each( function() {
				$(this).attr('data-ticket-row', newrownum);
				$(this).data('ticketRow', newrownum);
			});

			//button
			newTKTrow.find('button').each( function() {
				$(this).attr('data-ticket-row', newrownum);
				$(this).data('ticketRow', newrownum);
			});

			//okay all the elements have the ticketrownums changed now let's update the related DTT items!
			//update all existing DTT edit forms with the new TKT li element (note we're also making sure that we match the active tickets).
			$('.edit-dtt-row', '.event-datetimes-container').each( function() {
				TKT_helper.newTKTListRow( this );
			});


			//set the context for any potential chains on this.
			this.context = 'ticket';

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
			var DTT_display_text = this.DTT_display_text( $('.event-datetime-DTT_EVT_start', '#edit-event-datetime-' + this.dateTimeRow).val(), $('.event-datetime-DTT_EVT_end', '#edit-event-datetime-' + this.dateTimeRow).val() );

			$('.datetime-title', '#display-event-datetime-' + this.dateTimeRow).text(DTT_display_text);

			//... and in all related dtt list rows!
			$('.edit-ticket-row').each( function() {
				lidttitem = $('.datetime-tickets-list', this).find('li[data-datetime-row="' + TKT_helper.dateTimeRow + '"]');
				if ( typeof(lidttitem) !== 'undefined' )
					$('.ticket-list-ticket-name', lidttitem).text(DTT_display_text);
			});

			this.context = 'datetime';
			this.DateTimeEditToggle();
			return this;
		},




		/**
		 * updates the ui for the updated row
		 * NOTE: the save button only updates the ui and ensures that the autosave will get the data correctly.  ACTUAL edits to tickets and datetimes etc will NOT be attached to the "main" event post until the user clicks the "publish" or "update" button for the entire post.  That way the user can do manipulations and editing WIHOUT worrying about a "live" event being modified.
		 * @param  {int}    tktrow this is the ticket being "updated"
		 * @return {TKT_helper}    this object for chainability
		 */
		updateTKTrow: function( tktrow ) {
			var litktitm;
			var tktsold;
			this.ticketRow = tktrow;

			//need to update the displayed TKT name
			var TKT_name = $('.edit-ticket-TKT_name', '#edit-ticket-row-' + this.ticketRow).val();
			$('.ticket-display-row-TKT_name', '#display-ticket-row-' + this.ticketRow).text(TKT_name);

			tktsold = $('.ticket-display-row-TKT_sold', '#display-ticket-row-' + this.ticketRow).text();

			//..and in all related tkt list rows!
			$('.edit-ticket-row').each( function() {
				litktitm = $('li.datetime-ticket', '.datetime-tickets-list').find('[data-ticket-row="' + TKT_helper.ticketRow + '"]');
				$('.ticket-list-ticket-name', litktitm).text( TKT_name + ': ' + tktsold );
			});

			this.context = 'ticket';
			this.TicketEditToggle();
			return this;
		},



		/**
		 * generates a new DTT list row for available ticket rows.
		 * @param  {string} ticketrow this ticket row the dtt list item is being added to
		 * @return {TKT_helper obj}   for chainability
		 */
		newDTTListRow: function(ticketrowitm) {
			var ticketrownum = $(ticketrowitm).attr('id').replace('edit-ticketrow-', '');
			
			if ( typeof(ticketrownum) === 'undefined' )
				return true; //we may have a blank ticket row.

			var new_dtt_list_row = $('#dtt-new-available-datetime-list-items-holder').clone().html();


			var active_tkts_on_dtt = $('.datetime-tickets-list', '#event-datetime-' + this.dateTimeRow).find('.ticket-selected').data('ticketRow');
			var default_list_row_for_dtt;

			//replace all instances of DTTNUM with dttrow
			new_dtt_list_row = new_dtt_list_row.replace(/DTTNUM/g, this.dateTimeRow);
			//get name for dtt and add to the new li item
			var dttname = $('.datetime-title', '#display-event-datetime-' + this.dateTimeRow ).text();
			new_dtt_list_row = new_dtt_list_row.replace(/DTTDATE/g,dttname);
			default_list_row_for_dtt = new_dtt_list_row; //without TICKET_NUM replaced.
			//replace all instances of TICKETNUM with ticketrownum
			new_dtt_list_row = new_dtt_list_row.replace(/TICKETNUM/g,ticketrownum);



			//is this ticketrow in the active tickets list? if so then we toggle.
			if ( $.inArray(ticketrownum, active_tkts_on_dtt) > -1 ) {
				this.toggleTicketSelect(new_dtt_list_row);
			}


			//append new_dtt_list_row to the ul for datetime-tickets attached to ticket.
			new_dtt_list_row = $(ticketrowitm).find('.datetime-tickets-list').append(new_dtt_list_row);

			//we need to update the jQuery.data() element for new row
			$(new_dtt_list_row).data('datetimeRow', this.dateTimeRow);
			$(new_dtt_list_row).data('ticketRow', ticketrownum);
			$(new_dtt_list_row).data('context', 'ticket-datetime');


			//append new dtt_list_row to the available dtts row BUT we need to make the ticketnum generic! (and only append if it isn't already present!)
			if ( $('li', '#dtt-existing-available-datetime-list-items-holder').find('[data-datetime-row="'+this.dateTimeRow+'"]').length < 1 )
				$('#dtt-existing-available-datetime-list-items-holder').append(default_list_row_for_dtt);

			return this;
		},


		/**
		 * generates a new TKT list row for available dtt rows
		 * @param  {string} dttrowitm this dtt row the tkt list item is being added to
		 * @return {TKT_helper obj}           for chainability
		 */
		newTKTListRow: function(dttrowitm) {
			var dttrownum = $(dttrowitm).attr('id').replace('event-datetime-', '');
			var new_tkt_list_row = $('#dtt-new-available-ticket-list-items-holder').clone().html();
			var active_dtts_on_tkt = $('.datetime-tickets-list', '#edit-ticketrow-' + this.ticketRow).find('.ticket-selected').data('dateTimeRow');
			var default_list_row_for_tkt;

			//replace all instances of TICKETNUM with ticketRow
			new_tkt_list_row = new_tkt_list_row.replace(/TICKETNUM/g, this.ticketRow );
			//get name for ticket and add to the new li item
			var TKT_name = $('.ticket-display-row-TKT_name', '#display-ticketrow-' + this.ticketRow ).text() + ': 0';
			new_tkt_list_row = new_tkt_list_row.replace(/TKTNAME/g, TKT_name);
			default_list_row_for_tkt = new_tkt_list_row; //without DTTNUM replaced.
			//replace all instance of DTTNUM with  dttrownum
			new_tkt_list_row = new_tkt_list_row.replace(/DTTNUM/g, dttrownum);


			//is this ticketrow in the active datetimes list? if so then we toggle.
			if ( $.inArray(dttrownum, active_dtts_on_tkt ) > -1 ) {
				this.toggleTicketSelect(new_tkt_list_row);
			}

			//append new_tkt_list_row to the ul for datetime-tickets attached to datetime
			$(dttrowitm).find('.datetime-tickets-list').append(new_tkt_list_row);

			//append new_tkt_list_row to the available tkts row BUT keeping the DTTNUM generic BUT only if existing row isn't already present
			if ( $('li', '#dtt-existing-available-ticket-list-items-holder').find('[data-ticket-row="'+this.ticketRow+'"]').length < 1 )
				$('#dtt-existing-available-ticket-list-items-holder').append(default_list_row_for_tkt);

			return this;
		},


		/**
		 * Takes care of trashing a datetime in the UI and updating all the relevant ui elements
		 * @param  {int} row dtt row num being trashed
		 * @return {obj}     This object (allows for chaining)
		 */
		trash: function(row) {
			this.decreaserowcount(row);

			switch ( this.context ) {
				case 'datetime' :
					$('#event-datetime-' + row).remove();
					this.ticketRow = 0; //set to 0 so we remove dtts for all tickets.
					this.dateTimeRow = row;
					break;

				case 'ticket' :
					$('#edit-ticketrow-' + row).remove();
					$('#display-ticket-row' + row).remove();
					this.dateTimeRow = 0; //set to 0 so we remove tkts for all datetimes.
					this.ticketRow = row;
					break;
			}
			
			this.toggleActiveDTTorTicket(this.context, true);
			
			return this;
		},




		toggleActiveDTTorTicket: function(what, remove) {
			remove = typeof(remove) === 'undefined' ? false : remove;
			var li_item;
			switch (what) {
				// toggling a dtt attached to a ticket.
				case 'datetime' :
					li_item = TKT_helper.ticketRow === 0 ? $('.datetime-tickets-list', '.event-tickets-container').find('li[data-datetime-row="'+TKT_helper.dateTimeRow+'"]') : $('.datetime-tickets-list', '#edit-ticketrow-' + TKT_helper.ticketRow ).find('li[data-datetime-row="'+TKT_helper.dateTimeRow+'"]');
					break;

				// toggling a ticket attached to a dtt
				case 'ticket' :
					li_item = TKT_helper.dateTimeRow === 0 ? $('.datetime-tickets-list', '.event-datetimes-container').find('li[data-ticket-row="'+TKT_helper.ticketRow+'"]') : $('.datetime-tickets-list', '#edit-event-datetime-tickets-' + TKT_helper.dateTimeRow).find('li[data-ticket-row="'+TKT_helper.ticketRow+'"]');
					break;
			}

			li_item.each( function() {TKT_helper.toggleTicketSelect(this, remove);});
		},




		
		newTicketRow: function() {
			var idref, curval, newval, price_amount;
			var incomingcontext = this.context;
			//replace all instances of TICKETNUM with new generated row number
			this.context = 'ticket';
			var row = this.increaserowcount();

			//edit form stuff
			var newTKTrow = $('#ticket-row-form-holder').find('tbody').clone().html().replace(/TICKETNUM/g, row );
			var initialPRCrow = $('#ticket-edit-row-new-price-row').find('tbody').clone().html().replace(/PRICENUM/g, '1').replace(/TICKETNUM/g, row);


			//append to existing TKTrows
			var currow = $('.ticket-table', '.event-tickets-container').find('tbody').first();
			newTKTrow = $(newTKTrow).appendTo(currow);
			initialPRCrow = $(initialPRCrow).appendTo(newTKTrow.find('.ticket-price-rows'));



			//if this is triggered via the "short-ticket" context then we need to get the values from the create ticket form and add to the new row.
			if ( incomingcontext == 'short-ticket' ) {
				// inputs
				$('.add-datetime-ticket-container','#edit-event-datetime-tickets-' + this.dateTimeRow ).find('input').each( function() {
					idref = $(this).attr('class').replace('add-new-', '.edit-');
					curval = $(this).val();
					newTKTrow.find(idref).val(curval);
					if ( $(this).hasClass('add-new-ticket-PRC_amount') ) {
						price_amount = parseFloat(curval);
						price_amount = price_amount.toFixed(2);
					}
					$(this).val('');
				});

				// selectors
				var selected_price_type_val = $('.add-new-ticket-PRT_ID :selected', '#edit-event-datetime-tickets-' + this.dateTimeRow ).val();

				$('.add-new-ticket-PRT_ID :selected', '#edit-event-datetime-tickets-' + this.dateTimeRow ).val('');
				var selected_price_title = $('.add-new-ticket-PRT_ID :selected', '#edit-event-datetime-tickets-' + this.dateTimeRow ).text();

				newTKTrow.find('.price-title-text', '.price-row-' + row).text(selected_price_title);
				newTKTrow.find('.edit-price-PRT_ID', '.price-row-' + row).val(selected_price_type_val); //todo this prolly doesn't work.  Need to loop through options and trigger selected on the correct option.

				//update totals on the form.
				newTKTrow.find('.edit-price-PRC_amount', '.price-row-' +row).val(price_amount);
				newTKTrow.find('#price-total-amount-' + row).text('$' + price_amount);
				newTKTrow.find('.ticket-price-amount').text('$' + price_amount);
			}


			//now let's setup the display row!
			newTKTrow.find('.ticket-display-row-TKT_name').text(newTKTrow.find('.edit-ticket-TKT_name').val());
			newTKTrow.find('.ticket-display-row-TKT_start_date').text(
				this.TKT_DTT_display_text(
					newTKTrow.find('.edit-ticket-TKT_start_date').val(),
					'MMM D[,] YYYY'
					)
				);
			newTKTrow.find('.ticket-display-row-TKT_end_date').text(
				this.TKT_DTT_display_text(
					newTKTrow.find('.edit-ticket-TKT_end_date').val(),
					'MMM D[,] YYYY'
					)
				);
			newTKTrow.find('.ticket-display-row-TKT_status').text(
				this.getTKTstatus(
					newTKTrow.find('.edit-ticket-TKT_start_date').val(),
					newTKTrow.find('.edit-ticket-TKT_end_date').val()
					)
				);
			var price_total_amount = newTKTrow.find('#price-total-amount-' + row ).text();
			price_total_amount = incomingcontext != 'short-ticket' ? parseFloat(price_total_amount).toFixed(2) : price_total_amount;


			newTKTrow.find('.ticket-display-row-TKT_total_amount').text(price_total_amount);
			newTKTrow.find('.ticket-display-row-TKT_qty').text(newTKTrow.find('.edit-ticket-TKT_qty').val());

			//add li items
			//pull in existing datetimes list items.
			var existing_dtts = $('#dtt-existing-available-datetime-list-items-holder').clone().html();
			//append to newTKTrow and we want to make sure we select the existing dtt if this is triggered from 'short-ticket', otherwise we automatically select ALL dtts.
			newTKTrow.find('.datetime-tickets-list').append(existing_dtts);

			$('.edit-dtt-row', '.event-datetimes-container').each( function() {
				TKT_helper.newTKTListRow(this);
			});

			if ( incomingcontext == 'short-ticket' ) {
				this.toggleActiveDTTorTicket('datetime');
			} else {
				this.dateTimeRow = 0;
				this.toggleActiveDTTorTicket('datetime');
			}

			return this;
		},



		/**
		 * This sets up a new price row for attaching to a ticket.
		 * @return {TKT_helper} this object for chaining.
		 */
		newPriceRow: function() {
			var curid, newid, curname, newname;
			var row = this.itemdata.priceRow;
			this.increaserowcount();
			var newPRCrow = $('#ticket-edit-row-new-price-row').clone().html().replace(/TICKETNUM/g,this.ticketRow).replace('/PRICENUM/g',this.priceRow);
			newPRCrow = $('.price-table', '#edit-ticketrow-' + this.ticketRow).find('tbody').append(newPRCrow);

			//replace existing selector with the price modifier selector.
			newPRCrow.find('td').first().html( $('#ticket-edit-row-price-modifier-selector').clone().html().replace(/TICKETNUM/g,this.ticketRow).replace(/PRICENUM/g,this.priceRow) );

			return this;
		},


		/**
		 * Toggle a datetime ticket or ticket datetime list item from active to inactive (and the related attachments to the datetime or ticket).
		 * @param  {obj}        itm   the selected item
		 * @param  {bool}       trash are we TRASHING this item? then it needs to be removed from the dom.
		 * @return {TKT_helper}       this object for chainability
		 */
		toggleTicketSelect: function(itm, trash) {
			this.itemdata = $(itm).data();
			trash = typeof(trash) === 'undefined' ? false : trash;
			var selecting = $(itm).hasClass('ticket-selected') ? false : true;
			var relateditm = this.itemdata.context == 'datetime-ticket' ? $('.datetime-tickets-list', '#edit-ticketrow-' + this.itemdata.ticketRow).find('li[data-datetime-row="' + this.itemdata.datetimeRow + '"]') : $('.datetime-tickets-list', '#edit-event-datetime-tickets-' + this.itemdata.datetimeRow).find('li[data-ticket-row="' + this.itemdata.ticketRow + '"]');
			var available_list_row = this.itemdata.context === 'datetime-ticket' ? $('li', '#dtt-existing-available-datetime-list-items-holder').find('[data-datetime-row="'+this.itemdata.datetimeRow+'"]') : $('li', '#dtt-existing-available-ticket-list-items-holder').find('[data-ticket-row="' + this.itemdata.ticketRow +'"]' );

			if ( !selecting || trash ) {
				$(itm).removeClass('ticket-selected');
				$('input', itm).prop('checked',false);
				relateditm.removeClass('ticket-selected');
				$('input', relateditm).prop('checked',false);
				this.removeTicket();
				if ( trash ) {
					$(itm).remove();
					available_list_row.remove();
				}
			} else  {
				$(itm).addClass('ticket-selected');
				$('input', itm).prop('checked',true);
				relateditm.addClass('ticket-selected');
				$('input', relateditm).prop('checked',true);
				//update selected tracking in various contexts
				this.addTicket();
			}
			return this;
		},




		/**
		 * wrapper for TKT_helper.changeTicket that makes sure we're ADDING a ticket to an item
		 * @return {TKT_helper} this object for chainability
		 */
		addTicket: function() {
			this.changeTicket(this.itemdata.ticketRow, this.itemdata.datetimeRow, 'ticket-datetime');
			return this;
		},



		/**
		 * wrapper for TKT_helper.changeTicket that makes sure we're REMOVING a ticket from an item
		 * @return {TKT_helper}       this object for chainability
		 */
		removeTicket: function() {
			this.changeTicket(this.itemdata.ticketRow, this.itemdata.datetimeRow, 'ticket-datetime', true);
			return this;
		},



		/**
		 * Makes sure that the hidden row recording selected tickets for the current session is updated accordingly
		 * @param  {string} idrow    the row id for the row being updated.
		 * @param  {string} valuerow the row id for the value being recorded.
		 * @param  {string} context  the context that helps us determine which recording id we're using
		 * @param  {bool}   remove   Indicate whether we're rmoving the valuerow or adding it.
		 * @return {TKT_helper}      This obj for chainability.
		 */
		changeTicket: function(idrow, valuerow, context, remove) {
			remove = typeof(remove) === 'undefined' ? false : remove;
			context = typeof(context) === 'undefined' ? 'datetime-ticket' : context;
			var changeid = '#' + context + '-ids-' + idrow;
			var curitems = $(changeid).val();
			if ( typeof(curitems) !== 'undefined' && curitems !== '' )
					curitems = curitems.split(',');
			else {
				if ( !remove )
					$(changeid).val(valuerow);
				return this;
			}

			if ( remove ) {
				$.each( curitems, function(i, val) {
					if ( val == valuerow ) {
						curitems = TKT_helper.removeFromArray(curitems, val);
					}
				});
			} else {
				curitems.push(valuerow);
			}
			if ( curitems )
				curitems = curitems.join(',');
		
			$(changeid).val(curitems);

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
		 * @return {string} human friendly formatted DTT string combining start and end.
		 */
		DTT_display_text: function(start, end) {
			var datedisplaytext;
			var fullstartdate = moment( start, 'YYYY-MM-DD h:mm a' );
			var fullenddate = moment( end, 'YYYY-MM-DD h:mm a' );

			//first are months equal?
			if ( fullstartdate.month() != fullenddate.month() ) {
				datedisplaytext = fullstartdate.format("MMM D[,] YYYY h:mm a") + " - " + fullenddate.format("MMM D[,] YYYY h:mm a");
			} else if ( fullstartdate.month() == fullenddate.month() && fullstartdate.date() != fullenddate.date() ) {
				datedisplaytext = fullstartdate.format("MMM D[,] h:mm a") + " - " + fullenddate.format("MMM D[,] h:mm a YYYY");
			} else {
				datedisplaytext = fullstartdate.format("MMMM D[,] YYYY") + ' @ ' + fullstartdate.format("h:mm a") + ' - ' + fullenddate.format("h:mm a");
			}

			return datedisplaytext;
		},



		/**
		 * takes incoming date and returns the date in the given format
		 * @param {string} date   incoming date (in format YYYY-MM-DD h:mm a) (needs to be in a format that the moment.js library accepts see @link http://momentjs.com/docs/#/displaying/format/)
		 * @param {string} format format date is returned in.
		 */
		TKT_DTT_display_text: function(date, dttformat) {
			var fulldate = moment( date, 'YYYY-MM-DD h:mm a' );
			return fulldate.format(dttformat);

		},




		/**
		 * calculates what the status for the ticket is based on the incoming start and end date
		 * @param  {string} startdate start date in format (yyyy-MM-dd h:mm a)
		 * @param  {string} enddate   end date in format (yyyy-MM-dd h:mm a)
		 * @return {string}           one of three statuses depending on dates (On Sale, Pending, Expired)
		 */
		getTKTstatus: function(startdate, enddate) {
			startdate = moment(startdate, 'YYYY-MM-DD h:mm a');
			enddate = moment(enddate, 'YYYY-MM-DD h:mm a');
			var now = moment();

			if ( startdate.isAfter(now) )
				return 'Pending';

			if ( enddate.isBefore(now ) )
				return 'Expired';

			if ( startdate.isBefore(now) && enddate.isAfter(now) )
				return 'On Sale';

		},





		/**
		 * This toggles the display of the edit form for a dtt row depending on the context and row num properties set.
		 *
		 */
		DateTimeEditToggle: function() {
			if ( this.context == 'ticket' || this.context == 'short-ticket' ) {
				this.selector = $('#edit-event-datetime-tickets-' + this.dateTimeRow );
				this.selector.slideToggle( 500 );
			} else if ( this.context == 'datetime' ) {
				this.selector = $('#edit-event-datetime-' + this.dateTimeRow );
				this.selector.slideToggle( 500 );
			}
			return this;
		},




		/**
		 * This toggles the display of the edit form for a Ticket row num given.
		 */
		TicketEditToggle: function() {
			this.selector = $('#edit-ticketrow-' + this.ticketRow );
			this.selector.slideToggle(500);
			return this;
		},



		/**
		 * This helper method simply removes any matching items from a js array.
		 * @param  {array} arr js array to remove items from
		 * @param  {string}   itm value of what element is being removed
		 * @return {array}    new array with removed items
		 */
		removeFromArray: function( arr, ind ) {
			return arr.filter( function(i) {
				return i != ind;
			});
		},




		/**
		 * handy helper method for scrolling to an item.
		 * @param  {jQuery obj}    the selector obj that we want to scroll to in the DOM
		 * @return {TKT_helper}    this obj for chainability
		 */
		scrollTo: function( selector ) {
			//do we need to build the selector?
			if ( typeof(selector) === 'undefined' ) {
				selector = this.selector;
			}
			$("html,body").animate({
				scrollTop: selector.offset().top
			}, 2000);
			return this;
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
		switch ( data.context ) {
			case 'datetime' :
				TKT_helper.newDTTrow().setcontext('ticket').DateTimeEditToggle().scrollTo();
				break;
			case 'short-ticket' :
				TKT_helper.setcontext('short-ticket').setdateTimeRow(data.datetimeRow).newTicketRow();
				break;
			case 'ticket' :
				TKT_helper.setcontext('ticket').newTicketRow().TicketEditToggle().scrollTo();
				break;
			case 'price' :
				TKT_helper.setcontext('price').setitemdata(data).newPriceRow();
		}
		return false;
	});


	/**
	 * update datetime/ticket
	 */
	$('#event-and-ticket-form-content').on('click', '.ee-save-button', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		switch ( data.context ) {
			case 'datetime' :
				TKT_helper.updateDTTrow(data.datetimeRow);
				break;

			case 'ticket' :
				TKT_helper.updateTKTrow(data.ticketRow);
		}
		return false;
	});



	/**
	 * handle cancel button clicks
	 */
	$('#event-and-ticket-form-content').on('click', '.ee-cancel-button', function(e) {
		e.preventDefault();
		var data = $(this).data();

		switch ( data.context ) {
			case 'ticket' :
				TKT_helper.setcontext('ticket').setticketRow(data.ticketRow).TicketEditToggle();
				break;
			case 'short-ticket' :
				TKT_helper.setcontext('short-ticket').setdateTimeRow(data.datetimeRow).DateTimeEditToggle();
				break;
			case 'datetime' :
				TKT_helper.setcontext('datetime').setdateTimeRow(data.datetimeRow).DateTimeEditToggle();
				break;
		}
		return false;
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
				TKT_helper.setcontext('datetime').setdateTimeRow(data.datetimeRow).DateTimeEditToggle();
				break;

			case 'ticket-datetime' :
				TKT_helper.setcontext('datetime').setdateTimeRow(data.datetimeRow).DateTimeEditToggle().scrollTo();
				break;

			case 'datetime-ticket' :
				TKT_helper.setcontext('ticket').setticketRow(data.ticketRow).TicketEditToggle().scrollTo();
				break;

			case 'ticket' :
				TKT_helper.setticketRow(data.ticketRow).TicketEditToggle();
				break;
			
			case 'short-ticket' :
				TKT_helper.setcontext('short-ticket').setdateTimeRow(data.datetimeRow).setticketRow(data.ticketRow).newTicketRow().DateTimeEditToggle().setcontext('ticket').TicketEditToggle().scrollTo();
		}
		return false;
	});


	/**
	 * assigned tickets toggle
	 */
	$('#event-and-ticket-form-content').on('click', '.ticket-icon', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		TKT_helper.setdateTimeRow(data.datetimeRow).setcontext('ticket').DateTimeEditToggle();
		return false;
	});


	/**
	 * clone icon toggle
	 */
	$('#event-and-ticket-form-content').on('click', '.clone-icon', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		switch ( data.context ) {
			case 'datetime' :
				TKT_helper.cloneDateTime(data.datetimeRow).DateTimeEditToggle();
				break;

			case 'ticket' :
				TKT_helper.cloneTicket(data.ticketRow).TicketEditToggle();
				break;
		}
		return false;
	});



	/**
	 * trash icon click
	 */
	$('#event-and-ticket-form-content').on('click', '.trash-icon', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		switch ( data.context ) {
			case 'datetime' :
				TKT_helper.setcontext('datetime').trash(data.datetimeRow);
				break;

			case 'ticket' :
				TKT_helper.setcontext('ticket').trash(data.ticketRow);
				break;
		}
		return false;
	});



	/**
	 * datetime/ticket list item clicked to attach detach from related item.
	 */
	$('#event-and-ticket-form-content').on('click', '.datetime-ticket', function(e) {
		e.preventDefault();
		e.stopPropagation();
		TKT_helper.toggleTicketSelect(this);
		return false;
	});
});