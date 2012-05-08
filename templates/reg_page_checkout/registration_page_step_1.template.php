<!--**********************************  STEP 1 	**********************************-->		
		
	<h2 id="mer-reg-page-step-title-1-hdr" class="mer-reg-page-step-title-hdr">
		<?php _e('Step 1 -  Attendee Information', 'event_espresso'); ?>
		<a id="mer-reg-page-edit-step-1-lnk" class="mer-reg-page-go-to-step-1 mer-reg-page-edit-step-lnk <?php echo $step_1_edit_lnk_class; ?>"  href="<?php echo $reg_page_step_1_url; ?>"><?php _e('edit', 'event_espresso'); ?></a>
	</h2>
	
	<div id="mer-reg-page-step-1-dv" class="mer-reg-page-step-dv <?php echo $step_1_dv_class; ?>">
		
		<p id="mer-reg-page-step-1-pg" class="mer-reg-page-steps-pg small-text drk-grey-text"><?php _e(' In order to process your registration, we ask you to provide the following information.<br/>
		Please note that all fields marked with an asterisk (<span class="asterisk">*</span>) are required.', 'event_espresso'); ?></p>

		<form id="mer-registration-frm-1" action="<?php echo $reg_page_goto_step_2_url;?>" method="post">
	
			<input type="hidden" id="mer-reg-page-step-1-action" name="ajax_action" value="espresso_process_registration_step_1" />		
			<input type="hidden" id="mer-reg-page-step-1-ajax" name="espresso_ajax" value="0" />		
						
<?php
global $css_class;

$counter = 1;

foreach ( $event_queue as $cart_type => $cart ) { 
	if ( $cart['has_items'] ) {
		foreach ( $cart['items'] as $line_item => $item ) {
?>

			<div id="mer-reg-page-attendee-panel-dv-<?php echo $line_item;?>" class="mer-reg-page-attendee-panel-dv">		
				
				<h3 id="event_title-<?php echo $item['id'] ?>" class="big-event-title-hdr">  
					<a href="<?php //echo $registration_url; ?>" id="a_event_title-<?php echo $item['id'] ?>" class="a_event_title" title="<?php echo $item['name'] ?>"><?php echo $item['name'] ?></a>
				</h3>

	<?php foreach( $item['attendee_questions'][ $line_item ] as $att_nmbr => $attendee_questions ) { ?>
		<?php if ( ! empty( $attendee_questions )) { ?>
	
				<fieldset id="mer-reg-page-attendee-wrap-<?php echo $item['id'] . '-' . $counter;?>" class="mer-reg-page-attendee-wrap-fs">
	  				<legend class="mer-reg-page-attendee-lgnd smaller-text lt-grey-text"><?php echo $item['attendee_headings'][ $line_item ][$att_nmbr]?></legend>

					<?php echo $attendee_questions;?>
					
			<?php if ( $att_nmbr == 1 && $print_copy_info ) { ?>
	
						<input type="hidden" id="primary-attendee" name="qstn<?php echo $prmy_att_input_name ?>[primary_attendee]" value="1" />
	
				<?php if ( count( $additional_attendees )) { ?>	
					
						<div id="mer-reg-page-copy-attendee-dv" class="hide-if-no-js">
						
							<p class="mer-reg-page-copy-all-attendee-pg">
								<label class="wide"><?php  _e('Use Attendee #1\'s information for ALL attendees', 'event_espresso');?>
									<input id="mer-reg-page-copy-all-attendee-chk" class="mer-reg-page-copy-all-attendee-chk ui-widget-content ui-corner-all" type="checkbox" value="copy-all">
								</label>
							</p>					
	
							<p class="mer-reg-page-copy-attendee-pg"><?php _e('This option allows you to use the above information for all additional attendee question fields. <span>( Please note that some events may have additional questions that you may still be required to answer in order to complete your registration. )</span>', 'event_espresso'); ?></p>
							
							<a id="display-more-attendee-copy-options" class="display-the-hidden smaller-text float-right" rel="more-attendee-copy-options" ><?php  _e('more options', 'event_espresso');?></a>
	
							<div id="more-attendee-copy-options-dv" class="">
								<a id="hide-more-attendee-copy-options" class="hide-the-displayed smaller-text float-right" rel="more-attendee-copy-options" ><?php  _e('less options', 'event_espresso');?></a>
								<p class="mer-reg-page-copy-attendee-pg"><?php _e('The following checkboxes allow you to use the above information for only the selected additional event attendees.', 'event_espresso'); ?></p>
	
				<?php 						
							foreach ( $additional_attendees as $attendee ) {
								foreach ( $attendee as $att ) {	
							
									if ( $att['event_hdr'] ) { ?>
								<h6 class="mer-reg-page-copy-attendee-event-hdr"><?php echo $att['event_hdr']; ?></h6>										
						<?php	} ?>										
	
								<p class="event_form_field mer-reg-page-copy-attendee-chk-pg">
									<label><?php echo __('Attendee #', 'event_espresso') . $att['att_nmbr'];?>
										<input 	type="checkbox" 
														id="mer-reg-page-copy-attendee-chk-<?php echo $item['id'].'-'.$att['att_nmbr'].'-'.$line_item;?>" 
														class="mer-reg-page-copy-attendee-chk <?php echo $css_class;?>" 
														value="<?php echo $item['id'].'-1';?>" 
														rel="<?php echo $att['input_id'];?>"
												/>
									</label>
								</p>							
																	
					<?php	} ?>
								<div class="clear-float"></div>
								<hr class="mer-reg-page-copy-attendee-hr" />
				<?php	} ?>											
							</div>
							<div class="clear-float"></div>					
						</div>
		<?php
						}		
						$print_copy_info = FALSE;
					 } ?>			
				</fieldset>
	<?php	
					$counter++;
				} else { 
					 if ( $att_nmbr == 1 && $print_copy_info ) { ?>
					<br />
					<h3><?php _e('No information is required to attend this event. Please proceed to Step 2', 'event_espresso'); ?></h3>
					<input
							type="hidden"
							id="no-questions"
							name="qstn[]"
							value="0"
					/>					
	<?php			$print_copy_info = FALSE;
					}
				}
			 } ?>
			</div>			
	<?php			
		 } // $cart['items'] as $line_item 
	 } // $cart['has_items'] 
 }  // $event_queue as $cart_type
?>

			
			<div><a id="mer-reg-page-display-event-questions-lnk" class="act-like-link smaller-text hidden hide-if-no-js float-right" ><?php _e('show&nbsp;event&nbsp;questions', 'event_espresso'); ?></a></div>
			
			
			<div id="mer-reg-page-whats-next-buttons" class="mer-whats-next-buttons">
			
				<a id="mer-reg-page-go-to-step-2-btn" class="mer-register-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx icon-right hide-if-no-js" >
					<?php _e('Registration&nbsp;Step&nbsp;2&nbsp;', 'event_espresso'); ?><span class="ui-icon ui-icon-carat-1-e"></span>
				</a>
	
				<noscript>
					<input type="submit" 
								id="mer-reg-page-go-to-step-2-sbmt-btn" 
								class="mer-register-btn no-js-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx"
								name="mer-reg-page-go-to-step-2-sbmt-btn" 
								value="&nbsp;<?php  _e('Registration&nbsp;Step&nbsp;2', 'event_espresso'); ?>&nbsp;&raquo;" 
						/>				
				</noscript>	
				
			</div>		
			<!--end mer-whats-next-buttons-->

		</form>		
	
	</div>
	<!--end Step 1-->
	