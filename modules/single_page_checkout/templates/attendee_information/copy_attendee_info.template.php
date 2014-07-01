<?php if ( $att_nmbr == 1 ) { ?>
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
