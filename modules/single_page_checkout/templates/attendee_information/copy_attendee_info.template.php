<div id="spco-copy-attendee-dv" class="hide-if-no-js">

	<p class="spco-copy-all-attendee-pg">
		<label class="wide"><?php  _e('Use Attendee #1\'s information for ALL attendees', 'event_espresso');?>
			<input id="spco-copy-all-attendee-chk" class="spco-copy-all-attendee-chk ui-widget-content ui-corner-all" type="checkbox" value="copy-all">
		</label>
	</p>

	<p class="spco-copy-attendee-pg"><?php
		echo apply_filters(  'FHEE__registration_page_attendee_information__copy_attendee_pg', sprintf( __('This option allows you to use the above information for all additional attendee question fields. %sPlease note:%s some events may have additional questions that you may still be required to answer in order to complete your registration.', 'event_espresso'), '<strong>', '</strong>' )); ?></p>

	<a id="display-more-attendee-copy-options" class="display-the-hidden smaller-text float-right" rel="more-attendee-copy-options" ><?php  _e('advanced copy options', 'event_espresso');?></a>
	<a id="hide-more-attendee-copy-options" class="hide-the-displayed smaller-text float-right" rel="more-attendee-copy-options" style="display: none;"><?php  _e('basic copy options', 'event_espresso');?></a>

	<div id="more-attendee-copy-options-dv" class="">

		<p class="spco-copy-attendee-pg">
			<?php _e('The following checkboxes allow you to use the above information for only the selected additional tickets/attendees.', 'event_espresso'); ?>
		</p>

		<?php
		//d( $spco_copy_attendee_chk );
//		foreach ( $spco_copy_attendee_chk as $copy_attendee_info_input ) {
			//echo $copy_attendee_info_input;
//		}
		?>

	</div>
	<div class="clear-float"></div>
</div>

