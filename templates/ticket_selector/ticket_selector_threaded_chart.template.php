
	<h4 class="event-list-reg-link-title"><span class="section-title"><?php _e( 'Ticket Options', 'event_espresso' ); ?></span></h4>

		<input type="hidden"
					name="tkt-slctr-event-id"
					value="<?php echo $event_id; ?>"
			/>
		
		<?php
		foreach ($meta_keys as $key=>$meta_key) {
		?>
			<input type="hidden"
						name="tkt-slctr-meta-keys-<?php echo $event_id ?>[<?php echo $key; ?>]"
						value="<?php echo $meta_key; ?>"
				/>
		<?php
		}
		
		foreach ($meta_values as $key=>$meta_value) {
		?>
		<input type="hidden"
					name="tkt-slctr-meta-values-<?php echo $event_id ?>[<?php echo $key; ?>]"
					value="<?php echo $meta_value; ?>"
			/>
		<?php
		}
		?>

		<input type="hidden"
					id="tkt-slctr-max-atndz-<?php echo $event_id ?>"
					name="tkt-slctr-max-atndz-<?php echo $event_id ?>"
					value="<?php echo $max_atndz; ?>"
			/>	
				
		<input type="hidden"
					name="tkt-slctr-event-name-<?php echo $event_id ?>"
					value="<?php echo $event_name; ?>"
			/>

		<input type="hidden"
					name="tkt-slctr-return-url-<?php echo $event_id ?>"
					value="<?php echo $_SERVER['REQUEST_URI']?>"
			/>

		<input type="hidden"
					name="tkt-slctr-pre-approval-<?php echo $event_id ?>"
					value="<?php echo $require_pre_approval; ?>"
			/>
		
		<table id="tkt-slctr-tbl-<?php echo $event_id; ?>" class="tkt-slctr-tbl" border="1" cellspacing="0" cellpadding="0">		
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
	
			<?php foreach ( $times as $time ) {  
							if ( $time['date'] == $date ) { ?>

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

						<span class="tkt-sltr-thrd-chrt-price-spn"><?php echo $price['option']; ?></span>

						<!--<div class="float-right">-->
							<select name="qty-slct-<?php echo $event_id; ?>-1" id="ticket-selector-tbl-qty-slct-<?php echo $event_id ?>" class="ticket-selector-tbl-qty-slct ui-widget-content ui-corner-all">
								<option value="0">&nbsp;0&nbsp;&nbsp;&nbsp;</option>
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
		
		