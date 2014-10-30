<div id="single-page-checkout" class="ui-widget">
	<?php do_action( 'AHEE__registration_page_registration_questions__template__after_spco_attendee_information_header' )?>
	<div id="spco-attendee_information-dv" class="spco-step-dv">

		<p id="spco-attendee_information-pg" class="spco-steps-pg small-text drk-grey-text">
			<?php printf(
			__('In order to process your registration, we ask you to provide the following information.%1$sPlease note that all fields marked with an asterisk (%2$s) are required.', 'event_espresso'),
			'<br />',
			'<span class="asterisk">*</span>'
			);?>
		</p>

	<?php
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
			<p class="spco-ticket-info-pg">
			<?php
				echo $item['ticket']->name() . ':  ' . EEH_Template::format_currency( $item['ticket']->price(), FALSE, FALSE );
				echo $item['ticket']->qty() ? ' &nbsp; x &nbsp; ' . $ticket_count[ $item['ticket']->ID() ] . __(' tickets', 'event_espresso') . ' &nbsp; = &nbsp; ' . EEH_Template::format_currency( $item['ticket']->price() * $ticket_count[ $item['ticket']->ID() ] ) : '';
				echo $item['ticket']->description() ? '<br/>' . __('Ticket Details: ', 'event_espresso') . $item['ticket']->description() : '';
			?>
			</p>

			<?php
				}
			?>

				<fieldset id="spco-attendee-wrap-<?php echo $line_item;?>" class="spco-attendee-wrap-fs">
	  				<legend class="spco-attendee-lgnd smaller-text lt-grey-text"><?php echo __('Registrant #', 'event_espresso') . $att_nmbr;?></legend>

			<?php
				//do an action before the questions output, including the item and count
				echo do_action( 'AHEE__registration_page_registration_questions__template___before_questions', $item, $att_nmbr );
				echo $item['attendee_questions'];

				if ( $att_nmbr == 1 && $print_copy_info ) { ?>

						<input type="hidden" id="primary-attendee" name="qstn[primary_attendee]" value="<?php echo $prmy_att_input_name ?>" />

						<div id="spco-copy-attendee-dv" class="hide-if-no-js">

							<p class="spco-copy-all-attendee-pg">
								<label class="wide"><?php  _e('Use Registrant #1\'s information for ALL registrants', 'event_espresso');?>
									<input id="spco-copy-all-attendee-chk" class="spco-copy-all-attendee-chk ui-widget-content ui-corner-all" type="checkbox" value="copy-all">
								</label>
							</p>

							<p class="spco-copy-attendee-pg"><?php _e('This option allows you to use the above information for all additional registrant question fields. <span>(&nbsp;Please note that some events may have additional questions that you may still be required to answer in order to complete your registration.&nbsp;)</span>', 'event_espresso'); ?></p>

							<a id="display-more-attendee-copy-options" class="display-the-hidden smaller-text float-right" rel="more-attendee-copy-options" ><?php  _e('more options', 'event_espresso');?></a>

							<div id="more-attendee-copy-options-dv" class="">
								<a id="hide-more-attendee-copy-options" class="hide-the-displayed smaller-text float-right" rel="more-attendee-copy-options" ><?php  _e('less options', 'event_espresso');?></a>
								<p class="spco-copy-attendee-pg">
									<?php _e('The following checkboxes allow you to use the above information for only the selected additional event registrants.', 'event_espresso'); ?>
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
						<?php _e('The above information will be used for any additional tickets/registrants.', 'event_espresso'); ?>
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
				<input type="hidden" id="no-questions" name="qstn[]" value="0" />
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
		<div><a id="spco-display-event-questions-lnk" class="act-like-link smaller-text hidden hide-if-no-js float-right" ><?php _e('show&nbsp;event&nbsp;questions', 'event_espresso'); ?></a></div>
	</div>
</div> <!-- #single-page-checkout -->