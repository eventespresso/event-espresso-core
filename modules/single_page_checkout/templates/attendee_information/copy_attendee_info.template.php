<div id="spco-copy-attendee-dv" class="hide-if-no-js">

	<p class="spco-copy-all-attendee-pg">
		<label class="ee-checkbox-label-before ee-checkbox-label-wide"><?php  _e('Use Attendee #1\'s information for ALL attendees', 'event_espresso');?>
			<input id="spco-copy-all-attendee-chk" class="spco-copy-all-attendee-chk ee-do-not-validate" type="checkbox" value="copy-all">
		</label>
	</p>

	<p class="spco-copy-attendee-pg"><?php echo apply_filters(  'FHEE__registration_page_attendee_information__copy_attendee_pg', sprintf( __('This option allows you to use the above information for all additional attendee question fields. %sPlease note:%s some events may have additional questions that you may still be required to answer in order to complete your registration.', 'event_espresso'), '<strong>', '</strong>' )); ?></p>

	<a id="display-more-attendee-copy-options" class="display-the-hidden smaller-text float-right" rel="more-attendee-copy-options" ><span class="dashicons dashicons-arrow-right"></span><?php  _e('advanced copy options', 'event_espresso');?></a>
	<a id="hide-more-attendee-copy-options" class="hide-the-displayed smaller-text float-right" rel="more-attendee-copy-options" style="display: none;"><span class="dashicons dashicons-arrow-down"></span><?php  _e('basic copy options', 'event_espresso');?></a>

	<div id="more-attendee-copy-options-dv" class="" style="display: none;">

		<p class="spco-copy-attendee-pg">
			<?php _e('Only copy the above information to the following selected additional attendees.', 'event_espresso'); ?>
		</p>

		<?php foreach ( $spco_copy_attendee_chk as $spco_copy_chk ) { echo $spco_copy_chk; } ?>

	</div>
	<div class="clear-float"></div>
</div>

