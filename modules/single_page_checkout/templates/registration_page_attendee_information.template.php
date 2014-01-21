<!--***************  ATTENDEE INFORMATION STEP 	***************-->		
<?php echo do_action( 'AHEE__registration_page_attendee_information__start', $event_queue );?>
<?php if ( !$from_admin ) : ?>
<h2 id="spco-attendee_information-hdr" class="spco-step-title-hdr">
	<?php echo sprintf( __('%s Attendee Information', 'event_espresso'), $step_nmbr ); ?>
	<a id="spco-edit-attendee_information-lnk" class="spco-edit-step-lnk <?php echo $edit_lnk_class; ?>"  href="<?php echo $edit_lnk_url; ?>" rel="attendee_information"><?php _e('edit', 'event_espresso'); ?></a>
</h2>
<?php endif; ?>
<?php do_action( 'AHEE__registration_page_registration_questions__template__after_spco_attendee_information_header' )?>
<div id="spco-attendee_information-dv" class="spco-step-dv <?php echo $step_dv_class; ?>">
	
	<p id="spco-attendee_information-pg" class="spco-steps-pg small-text drk-grey-text">
		<?php sprintf( 
		__(' In order to process your registration, we ask you to provide the following information.%1$sPlease note that all fields marked with an asterisk (%1$s) are required.', 'event_espresso'),
		'<br />',
		'<span class="asterisk">*</span>'
		);?>		
	</p>
<?php if ( !$from_admin ) : ?>
	<form id="spco-registration-attendee_information-frm" action="<?php echo $reg_step_form_url;?>" method="post">

		<input type="hidden" id="spco-attendee_information-action" name="ajax_action" value="espresso_<?php echo $reg_step_ajax_action;?>" />
		<input type="hidden" id="spco-attendee_information-noheader" name="noheader" value="" />
		<input type="hidden" id="spco-attendee_information-next-step" name="next_step" value="<?php echo $next_step; ?>" />
		<input type="hidden" id="spco-reg_url_link" name="e_reg_url_link" value="<?php echo $reg_url_link;?>" />
		<input type="hidden" id="spco-revisit" name="revisit" value="<?php echo $revisit;?>" />
					
<?php
endif; //end from admin conditional
global $css_class;

$att_nmbr = 0;
$prev_event = '';

if ( $event_queue['total_items'] > 0 ) {
	foreach ( $event_queue['items'] as $line_item => $item ) {
		$att_nmbr++;			
		if ( $item['attendee_questions'] != '' ) { 
?>

		<div id="spco-attendee-panel-dv-<?php echo $line_item;?>" class="spco-attendee-panel-dv">		
			
			<?php if ( $item['ticket']->name() != $prev_event ) { ?>
			<h3 id="event_title-<?php echo $item['ticket']->ID() ?>" class="big-event-title-hdr">
				<?php echo $item['event']->name(); ?>				
			</h3>
				<?php if ( $payment_required && ! $revisit ) { ?>
			<p class="spco-ticket-info-pg">
			<?php 
				echo $item['ticket']->name() . ':  ' . EEH_Template::format_currency( $item['ticket']->price(), FALSE, FALSE );
				echo $item['ticket']->qty() ? ' &nbsp; x &nbsp; ' . $ticket_count[ $item['ticket']->ID() ] . __(' tickets', 'event_espresso') . ' &nbsp; = &nbsp; ' . EEH_Template::format_currency( $item['ticket']->price() * $ticket_count[ $item['ticket']->ID() ] ) : ''; 
				echo $item['ticket']->description() ? '<br/>' . __('Ticket Details: ', 'event_espresso') . $item['ticket']->description() : ''; 
			?>				
			</p>

			<?php 
					}
				} 
			?>
			
			<fieldset id="spco-attendee-wrap-<?php echo $line_item;?>" class="spco-attendee-wrap-fs">
  				<legend class="spco-attendee-lgnd smaller-text lt-grey-text"><?php echo __('Attendee #', 'event_espresso') . $att_nmbr;?></legend>

		<?php 
			//do an action before the questions output, including the item and count 
			echo do_action( 'AHEE__registration_page_registration_questions__template___before_questions', $item, $att_nmbr );
			echo $item['attendee_questions'];
			
			if ( $att_nmbr == 1 ) { ?>
					<input type="hidden" id="primary-attendee" name="qstn[primary_attendee]" value="<?php echo $prmy_att_input_name ?>" />
			<?php } ?>	

			<?php if ( $att_nmbr == 1 && $print_copy_info ) { ?>

					<div id="spco-copy-attendee-dv" class="hide-if-no-js">
					
						<p class="spco-copy-all-attendee-pg">
							<label class="wide"><?php  _e('Use Attendee #1\'s information for ALL attendees', 'event_espresso');?>
								<input id="spco-copy-all-attendee-chk" class="spco-copy-all-attendee-chk ui-widget-content ui-corner-all" type="checkbox" value="copy-all">
							</label>
						</p>					

						<p class="spco-copy-attendee-pg"><?php _e('This option allows you to use the above information for all additional attendee question fields. <strong>Please note:</strong> some events may have additional questions that you may still be required to answer in order to complete your registration.', 'event_espresso'); ?></p>
						
						<a id="display-more-attendee-copy-options" class="display-the-hidden smaller-text float-right" rel="more-attendee-copy-options" ><?php  _e('advanced copy options', 'event_espresso');?></a><a id="hide-more-attendee-copy-options" class="hide-the-displayed smaller-text float-right" rel="more-attendee-copy-options" style="display: none;"><?php  _e('basic copy options', 'event_espresso');?></a>

						<div id="more-attendee-copy-options-dv" class="">
							
							<p class="spco-copy-attendee-pg">
								<?php _e('The following checkboxes allow you to use the above information for only the selected additional tickets/attendees.', 'event_espresso'); ?>								
							</p>

					<?php 						
							foreach ( $additional_event_attendees as $event_attendees ) {
								foreach ( $event_attendees as $attendee ) {
									
									if ( $attendee['event_hdr'] ) { ?>							
							<h6 class="spco-copy-attendee-event-hdr"><?php echo $attendee['event_hdr']; ?></h6>										
									<?php	} ?>										

							<p class="event_form_field spco-copy-attendee-chk-pg">
								<label><?php echo __('Attendee #', 'event_espresso') . $attendee['att_nmbr'];?>
									<input 	type="checkbox" 
													id="spco-copy-attendee-chk-<?php echo $attendee['input_id'];?>" 
													class="spco-copy-attendee-chk <?php echo $css_class;?>" 
													value="<?php echo $attendee['input_id'];?>" 
											/>
								</label>
							</p>			
																
						<?php	} ?>
							<div class="clear-float"></div>	
							<hr class="spco-copy-attendee-hr" />
					<?php } ?>	
																
						</div>
						<div class="clear-float"></div>	
					</div>
			<?php
						$print_copy_info = FALSE;
						
					} else if ( $att_nmbr == 1 ) { 
				?>
					<p id="spco-auto-copy-attendee-pg" class="smaller-text lt-grey-text">
						<?php _e('The above information will be used for any additional tickets/attendees.', 'event_espresso'); ?>								
					</p>						
				<?php	
						
					}
			?>			
			</fieldset>
			
		</div>			
<?php	
					
				} else {
					 if ( $att_nmbr == 1 ) {
			?>
		<div id="spco-attendee-panel-dv-<?php echo $line_item;?>" class="spco-attendee-panel-dv">		
			<h3 id="event_title-<?php echo $item['ticket']->ID() ?>" class="big-event-title-hdr">
				<?php echo $item['event']->name(); ?>				
			</h3>
			<fieldset id="spco-attendee-wrap-<?php echo $line_item;?>" class="spco-attendee-wrap-fs">
 				<h6><?php _e('No information is required to attend this event. Please proceed to the next Step', 'event_espresso'); ?></h6>
				<input
						type="hidden"
						id="no-questions"
						name="qstn[]"
						value="0"
				/>					
			</fieldset>			
		</div>			
		<?php
					
				}
			}
			echo $item['additional_attendee_reg_info'];
			$prev_event = $item['ticket']->name(); 
		 } // $event_queue['items'] as $line_item 
	 } // $event_queue['total_items'] 
?>

<?php if ( !$from_admin ) : ?>	
		<div><a id="spco-display-event-questions-lnk" class="act-like-link smaller-text hidden hide-if-no-js float-right" ><?php _e('show&nbsp;event&nbsp;questions', 'event_espresso'); ?></a></div>
		
		<?php do_action( 'AHEE__before_spco_whats_next_buttons', 'attendee_information', $next_step ); ?>
		
		<div id="spco-attendee_information-whats-next-buttons-dv" class="spco-whats-next-buttons">
		
			<a href =""  id="spco-go-to-step-<?php echo $next_step; ?>-btn" class="spco-next-step-btn ee-button ee-register-button huge ee-green hide-if-no-js" rel="attendee_information" >
				<?php echo $next_step_text; ?>
			</a>

			<noscript>
				<input type="submit" 
					id="spco-go-to-step-<?php echo $next_step; ?>-sbmt-btn" 
					class="spco-next-step-btn ee-button ee-register-button huge ee-green no-js-btn"
					name="spco-go-to-step-<?php echo $next_step; ?>-sbmt-btn" 
					value="&nbsp;<?php echo $next_step_text; ?>&nbsp;&raquo;"							
				/>				
			</noscript>	
			
		</div>		
		<!--end spco-whats-next-buttons-->
	</form>		

	<?php do_action( 'AHEE__SPCO_after_reg_step_form', 'attendee_information', $next_step ); ?>
<?php endif; //end from_admin conditional ?>
</div>
<!--end Step 1-->

