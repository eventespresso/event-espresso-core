<!--***************  ATTENDEE INFORMATION STEP 	***************-->
<?php echo do_action( 'AHEE__registration_page_attendee_information__start', $event_queue );?>
<?php if ( ! $from_admin ) : ?>
<h2 id="spco-attendee_information-hdr" class="spco-step-title-hdr">
	<?php echo sprintf( __('%s Attendee Information', 'event_espresso'), $step_nmbr ); ?>
	<a id="spco-edit-attendee_information-lnk" class="spco-edit-step-lnk <?php echo $edit_lnk_class; ?>"  href="<?php echo $edit_lnk_url; ?>" rel="attendee_information"><?php apply_filters( 'FHEE__registration_page_attendee_information__edit_link_text', __( 'edit', 'event_espresso' )); ?></a>
</h2>
<?php endif; //  ! $from_admin ?>
<?php do_action( 'AHEE__registration_page_registration_questions__template__after_spco_attendee_information_header' )?>
<div id="spco-attendee_information-dv" class="spco-step-dv <?php echo $step_dv_class; ?>">

	<p id="spco-attendee_information-pg" class="spco-steps-pg small-text drk-grey-text">
        <?php echo apply_filters( 'FHEE__registration_page_attendee_information__attendee_information_pg', sprintf( __('In order to process your registration, we ask you to provide the following information.%1$sPlease note that all fields marked with an asterisk (%2$s) are required.', 'event_espresso'), '<br />', '<span class="asterisk">*</span>' )); ?>
	</p>
<?php if ( ! $from_admin ) : ?>
	<form id="spco-registration-attendee_information-frm" action="<?php echo $reg_step_form_url;?>" method="post">
		<input type="hidden" id="spco-attendee_information-action" name="ajax_action" value="espresso_<?php echo $reg_step_ajax_action;?>" />
		<input type="hidden" id="spco-attendee_information-noheader" name="noheader" value="" />
		<input type="hidden" id="spco-attendee_information-next-step" name="next_step" value="<?php echo $next_step; ?>" />
		<input type="hidden" id="spco-reg_url_link" name="e_reg_url_link" value="<?php echo $reg_url_link;?>" />
		<input type="hidden" id="spco-revisit" name="revisit" value="<?php echo $revisit;?>" />

<?php
endif; // ! $from_admin
global $css_class;

$att_nmbr = 0;
$prev_event = '';
$prev_ticket = '';

if ( $event_queue['total_items'] > 0 ) {
	foreach ( $event_queue['items'] as $line_item => $item ) {
		$att_nmbr++;
?>

		<div id="spco-attendee-panel-dv-<?php echo $line_item;?>" class="spco-attendee-panel-dv">

			<?php if ( $item['event']->ID() != $prev_event ) { ?>
			<h3 id="event_title-<?php echo $item['event']->ID() ?>" class="big-event-title-hdr">
				<?php echo $item['event']->name(); ?>
			</h3>
			<?php } ?>
			<?php if ( $item['ticket']->ID() != $prev_ticket ) { ?>
				<?php if ( ! $revisit ) { ?>
			<div class="spco-ticket-info-dv">
				<h4><?php _e('Ticket Details', 'event_espresso');?></h4>
				<table>
					<tr>
						<th scope="col" width=""><?php _e('Ticket Name and Description', 'event_espresso');?></th>
						<th scope="col" width="5%" class="jst-cntr"><?php _e('Qty', 'event_espresso');?></th>
						<th scope="col" width="15%" class="jst-rght"><?php _e('Price', 'event_espresso');?></th>
						<th scope="col" width="15%" class="jst-rght"><?php _e('Total', 'event_espresso');?></th>
					</tr>
					<tr>
						<td>
						<?php
							echo $item['ticket']->name();
							echo $item['ticket']->description() ? '<br/>' . $item['ticket']->description() : '';
						?>
						</td>
						<td class="jst-cntr"><?php echo $ticket_count[ $item['ticket']->ID() ];?></td>
						<td class="jst-rght"><?php echo EEH_Template::format_currency( $item['ticket']->price() );?></td>
						<td class="jst-rght"><?php echo EEH_Template::format_currency( $item['ticket']->price() * $ticket_count[ $item['ticket']->ID() ] );?></td>
					</tr>
				</table>
			</div>
				<?php } ?>
			<?php } ?>

			<fieldset id="spco-attendee-wrap-<?php echo $line_item;?>" class="spco-attendee-wrap-fs">
  				<legend class="spco-attendee-lgnd smaller-text"><?php echo __('Attendee #', 'event_espresso') . $item['reg_count'];?></legend>

		<?php
			if ( $item['attendee_questions'] ) {
				//do an action before the questions output, including the item and count
				echo do_action( 'AHEE__registration_page_registration_questions__template___before_questions', $item, $att_nmbr );
				echo $item['attendee_questions'];
			} else {
			?>
				<p class="spco-attendee-info-not-required-pg smaller-text lt-grey-text">
					<?php echo apply_filters( 'FHEE__registration_page_attendee_information__attendee_info_not_required_pg', __( 'This ticket type does not require any information for additional attendees, so attendee #1\'s information will be used for it\'s registration purposes.', 'event_espresso' ));?>
				</p>
			<?php

			}

			if ( $att_nmbr == 1 ) { ?>
					<input type="hidden" id="primary-attendee" name="qstn[primary_attendee]" value="<?php echo $prmy_att_input_name ?>" />
			<?php } ?>

			<?php if (  ! $revisit && $att_nmbr == 1 && $print_copy_info ) { ?>

					<div id="spco-copy-attendee-dv" class="hide-if-no-js">

						<p class="spco-copy-all-attendee-pg">
							<label class="wide"><?php  _e('Use Attendee #1\'s information for ALL attendees', 'event_espresso');?>
								<input id="spco-copy-all-attendee-chk" class="spco-copy-all-attendee-chk ui-widget-content ui-corner-all" type="checkbox" value="copy-all">
							</label>
						</p>

						<p class="spco-copy-attendee-pg"><?php
                            echo apply_filters(  'FHEE__registration_page_attendee_information__copy_attendee_pg', sprintf( __('This option allows you to use the above information for all additional attendee question fields. %sPlease note:%s some events may have additional questions that you may still be required to answer in order to complete your registration.', 'event_espresso'), '<strong>', '</strong>' )); ?></p>

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
									<input 	type="checkbox" id="spco-copy-attendee-chk-<?php echo $attendee['input_id'];?>" class="spco-copy-attendee-chk <?php echo $css_class;?>" value="<?php echo $attendee['input_id'];?>" />
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
						<?php echo apply_filters( 'FHEE__registration_page_attendee_information__auto_copy_attendee_pg', __('The above information will be used for any additional tickets/attendees.', 'event_espresso' ));?>
					</p>
				<?php

					}
			?>
			</fieldset>

		</div>
<?php
			echo $item['additional_attendee_reg_info'];
			$prev_event = $item['event']->ID();
			$prev_ticket = $item['ticket']->ID();
		 } // $event_queue['items'] as $line_item
	 } // $event_queue['total_items']
?>

		<div class="clearfix">
			<a id="spco-display-event-questions-lnk" class="act-like-link smaller-text hidden hide-if-no-js float-right" >
				<?php _e('show&nbsp;event&nbsp;questions', 'event_espresso'); ?>
			</a>
		</div>
<?php if ( !$from_admin ) : ?>

		<?php do_action( 'AHEE__before_spco_whats_next_buttons', 'attendee_information', $next_step ); ?>

		<div id="spco-attendee_information-whats-next-buttons-dv" class="spco-whats-next-buttons">
			<?php echo EEH_Form_Fields::submit_button( $edit_lnk_url, 'spco-go-to-step-' . $next_step, 'spco-next-step-btn', $next_step_text, 'spco-go-to-step-' . $next_step, TRUE, 'rel="attendee_information"' ); ?>
		</div>
		<!--end spco-whats-next-buttons-->
	</form>

	<?php do_action( 'AHEE__SPCO_after_reg_step_form', 'attendee_information', $next_step ); ?>
<?php endif; //end from_admin conditional ?>
</div>
<!--end Step 1-->

