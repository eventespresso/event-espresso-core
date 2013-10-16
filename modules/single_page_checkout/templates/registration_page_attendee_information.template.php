<!--**********************************  STEP 1 	**********************************-->		
<?php echo do_action('AHEE_registration_page_step_1_start',$event_queue);?>

	<h2 id="spco-step-title-1-hdr" class="spco-step-title-hdr">
		<?php _e('Step 1 -  Attendee Information', 'event_espresso'); ?>
		<a id="spco-edit-step-1-lnk" class="spco-go-to-step-1 spco-edit-step-lnk <?php echo $edit_lnk_class; ?>"  href="<?php echo $edit_lnk_url; ?>"><?php _e('edit', 'event_espresso'); ?></a>
	</h2>
	<?php do_action('after_spco-step-title-1-hdr')?>
	<div id="spco-step-1-dv" class="spco-step-dv <?php echo $step_dv_class; ?>">
		
		<p id="spco-step-1-pg" class="spco-steps-pg small-text drk-grey-text"><?php _e(' In order to process your registration, we ask you to provide the following information.<br/>
		Please note that all fields marked with an asterisk (<span class="asterisk">*</span>) are required.', 'event_espresso'); ?></p>

		<form id="mer-registration-frm-1" action="<?php echo $reg_step_form_url;?>" method="post">
	
			<input type="hidden" id="spco-step-1-action" name="ajax_action" value="espresso_process_registration_step_1" />		
			<input type="hidden" id="spco-step-1-noheader" name="noheader" value="" />		
						
<?php
	global $css_class;
	
	$counter = 1;
	
		if ( $event_queue['has_items'] ) {
			foreach ( $event_queue['items'] as $line_item => $item ) {
			
?>

			<div id="spco-attendee-panel-dv-<?php echo $line_item;?>" class="spco-attendee-panel-dv">		
				
				<h3 id="event_title-<?php echo $item['ticket_id'] ?>" class="big-event-title-hdr">  
					<a href="<?php //echo $registration_url; ?>" id="a_event_title-<?php echo $item['ticket_id'] ?>" class="a_event_title" title="<?php echo $item['ticket_name'] ?>"><?php echo $item['ticket_name'] ?></a>
				</h3>
				<p><?php echo $item['ticket_desc'] ? __('Ticket Details: ', 'event_espresso') . $item['ticket_desc'] : ''; ?></p>

		<?php foreach( $item['attendee_questions'][ $line_item ] as $att_nmbr => $attendee_questions ) { ?>

				<fieldset id="spco-attendee-wrap-<?php echo $item['ticket_id'] . '-' . $counter;?>" class="spco-attendee-wrap-fs">
	  				<legend class="spco-attendee-lgnd smaller-text lt-grey-text"><?php echo $item['attendee_headings'][ $line_item ][$att_nmbr];?></legend>

			<?php if ( ! empty( $attendee_questions )) { ?>
						<?php //do an action before the questions output, including the item and count 
					echo do_action('AHEE_registration_page_step_1_before_questions',$item, $counter);?>
					<?php echo $attendee_questions;?>
					
				<?php if ( $att_nmbr == 1 && $print_copy_info ) { ?>
	
						<input type="hidden" id="primary-attendee" name="qstn<?php echo $prmy_att_input_name ?>[primary_attendee]" value="1" />
	
					<?php if ( count( $additional_attendees )) { ?>	
					
						<div id="spco-copy-attendee-dv" class="hide-if-no-js">
						
							<p class="spco-copy-all-attendee-pg">
								<label class="wide"><?php  _e('Use Attendee #1\'s information for ALL attendees', 'event_espresso');?>
									<input id="spco-copy-all-attendee-chk" class="spco-copy-all-attendee-chk ui-widget-content ui-corner-all" type="checkbox" value="copy-all">
								</label>
							</p>					
	
							<p class="spco-copy-attendee-pg"><?php _e('This option allows you to use the above information for all additional attendee question fields. <span>(&nbsp;Please note that some events may have additional questions that you may still be required to answer in order to complete your registration.&nbsp;)</span>', 'event_espresso'); ?></p>
							
							<a id="display-more-attendee-copy-options" class="display-the-hidden smaller-text float-right" rel="more-attendee-copy-options" ><?php  _e('more options', 'event_espresso');?></a>
	
							<div id="more-attendee-copy-options-dv" class="">
								<a id="hide-more-attendee-copy-options" class="hide-the-displayed smaller-text float-right" rel="more-attendee-copy-options" ><?php  _e('less options', 'event_espresso');?></a>
								<p class="spco-copy-attendee-pg"><?php _e('The following checkboxes allow you to use the above information for only the selected additional event attendees.', 'event_espresso'); ?></p>
	
						<?php 						
								foreach ( $additional_attendees as $attendee ) {
									foreach ( $attendee as $att ) {
								
										if ( $att['event_hdr'] ) { ?>
								<h6 class="spco-copy-attendee-event-hdr"><?php echo $att['event_hdr']; ?></h6>										
										<?php	} ?>										
	
								<p class="event_form_field spco-copy-attendee-chk-pg">
									<label><?php echo __('Attendee #', 'event_espresso') . $att['att_nmbr'];?>
										<input 	type="checkbox" 
														id="spco-copy-attendee-chk-<?php echo $item['ticket_id'].'-'.$att['att_nmbr'].'-'.$line_item;?>" 
														class="spco-copy-attendee-chk <?php echo $css_class;?>" 
														value="<?php echo $item['ticket_id'].'-1';?>" 
														rel="<?php echo $att['input_id'];?>"
												/>
									</label>
								</p>							
																	
						<?php	} ?>
								<div class="clear-float"></div>
								<hr class="spco-copy-attendee-hr" />
					<?php	} ?>											
							</div>
							<div class="clear-float"></div>					
						</div>
				<?php
							}
							$print_copy_info = FALSE;
						}
						$counter++;
					} else {
						 if ( $att_nmbr == 1 && $print_copy_info ) {
				?>
					<br />
					<h3><?php _e('No information is required to attend this event. Please proceed to Step 2', 'event_espresso'); ?></h3>
					<input
							type="hidden"
							id="no-questions"
							name="qstn[]"
							value="0"
					/>					
				<?php
							$print_copy_info = FALSE;
						} 
					}
				?>			
				</fieldset>
				<?php	
				 }
		?>
			</div>			
	<?php			
			 } // $event_queue['items'] as $line_item 
		 } // $event_queue['has_items'] 
?>

			
			<div><a id="spco-display-event-questions-lnk" class="act-like-link smaller-text hidden hide-if-no-js float-right" ><?php _e('show&nbsp;event&nbsp;questions', 'event_espresso'); ?></a></div>
			
			
			<div id="spco-whats-next-buttons" class="mer-whats-next-buttons">
			
		<!--<a href ="" onclick="return false" id="spco-go-to-step-2-btn" class="mer-register-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx icon-right hide-if-no-js" >-->
				<a href =""  id="spco-go-to-step-2-btn" class="mer-register-btn ui-button ui-button-big hide-if-no-js" >
					<?php echo $next_step; ?><span class="ui-icon ui-icon-carat-1-e"></span>
				</a>
	
				<noscript>
					<input type="submit" 
								id="spco-go-to-step-2-sbmt-btn" 
								class="mer-register-btn no-js-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx"
								name="spco-go-to-step-2-sbmt-btn" 
								value="&nbsp;<?php echo $next_step; ?>&nbsp;&raquo;" 
						/>				
				</noscript>	
				
			</div>		
			<!--end mer-whats-next-buttons-->

		</form>		
	
	</div>
	<!--end Step 1-->

