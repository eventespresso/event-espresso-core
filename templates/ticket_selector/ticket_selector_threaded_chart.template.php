<div id="event-list-reg-link-div-<?php echo $event_id ?>" class="event-list-reg-link-dv">

	<h4 class="event-list-reg-link-title"><span class="section-title">Ticket Options</span></h4>

	<form id="event-list-reg-link-form-<?php echo $event_id ?>" action="<?php echo $reg_href; ?>" method="post">

		<input type="hidden"
					name="event-list-reg-link-event-id"
					value="<?php echo $event_id ?>"
			/>		

		<input type="hidden"
					id="event-list-reg-link-nmbr-attndees-<?php echo $event_id ?>"
					name="event-list-reg-link-nmbr-attndees"
					value="1"
			/>	
				
		<input type="hidden"
					name="event-list-reg-link-event-name"
					value="<?php echo $event_name ?>"
			/>

		<input type="hidden"
					name="event-list-reg-link-return-url"
					value="<?php echo $_SERVER['REQUEST_URI']?>"
			/>

		<input type="hidden"
					name="event-list-ticket-selector-table-rows"
					value="1"
			/>

		<table id="event-list-ticket-selector-tbl-<?php echo $event_id ?>" class="event-list-ticket-selector-tbl" border="1" cellspacing="0" cellpadding="0">		

			<tbody>
			<?php 
			$row = 1; 
			foreach ( $dates as $date ) {
			?>
				<tr>				
					<td colspan="4">
						<b><?php echo $date; ?></b>
					</td>		
				</tr>				
	
			<?php foreach ( $times as $time ) {  ?>

				<tr>				
					<td>&nbsp;</td>	
								
					<td colspan="3">
						<span><?php _e( 'Time : ', 'event_espresso' ); ?><?php echo $time['formatted']; ?></span>						
					</td>	
				
				</tr>
				
				<tr>										
					<td>&nbsp;</td>									
					<td>&nbsp;</td>									
					<td colspan="2">
					
					<?php foreach ( $prices as $price_key => $price ) {  ?>	

						<span class="tkt-sltr-thrd-chrt-price-spn"><?php echo $price; ?></span>

						<!--<div class="float-right">-->
							<select name="qty-slct-<?php echo $event_id; ?>-1" id="ticket-selector-tbl-qty-slct-<?php echo $event_id ?>" class="ticket-selector-tbl-qty-slct ui-widget-content ui-corner-all">
							<?php for ($i = 1; $i <= $max_atndz; $i++) { ?>
								<option value="<?php echo $i; ?>">&nbsp;<?php echo $i; ?>&nbsp;&nbsp;&nbsp;</option>
							<?php } ?>
							</select>
						<!--</div>-->
						<div class="clear"></div>
						
						<input type="hidden"
									name="tkt-slct-row-<?php echo $row;?>"
									value="1"
							/>
							
							<input type="hidden"
									name="tkt-slct-time-<?php echo $time['start_time']; ?>"
									value="1"
							/>	
							
							<input type="hidden"
									name="tkt-slct-price-<?php echo $price_key; ?>"
									value="1"
							/>																	

				<?php } ?>
					</td>			
						
				</tr>
										
				<?php	}
						$row++;
					}
				?>
				
			</tbody>
			
			<tfoot class="hidden">
				<tr>
					<td colspan="4">
						<a class="event-list-add-ticket-lnk" rel="event-list-ticket-selector-tbl-<?php echo $event_id ?>">
							<span class="ui-icon ui-icon-plus"></span>click here to add another row to the Ticket Options table
						</a>
					</td>
				</tr>			
			</tfoot>
			
		</table>				
		
		
		<div class="event-more-info-dv clear-float">	
		
			<noscript>
				<input type="submit" 
		 					name="event-list-reg-link-sbmt-btn" 
							class="event-list-reg-link-sbmt-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx" 
							value="<?php _e( $sbmt_btn_text, 'event_espresso' ); ?>"
							role="button"
					/>
			</noscript>
	
			<a class="event-list-reg-link-btn alt-mer-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx" style="display:none;">
				<span class="ui-icon ui-icon-cart"></span>&nbsp;<?php _e( $sbmt_btn_text, 'event_espresso' ); ?>
			</a>

		</div>
						

	</form>
</div>
						