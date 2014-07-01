		<p id="spco-attendee_information-pg" class="spco-steps-pg small-text drk-grey-text">
			<?php echo apply_filters( 'FHEE__registration_page_attendee_information__attendee_information_pg', sprintf( __('In order to process your registration, we ask you to provide the following information.%1$sPlease note that all fields marked with an asterisk (%2$s) are required.', 'event_espresso'), '<br />', '<span class="asterisk">*</span>' )); ?>
		</p>

		<?php
global $css_class;


$att_nmbr = 0;
$prev_event = '';
$prev_ticket = '';

if ( count( $registrations ) > 0 ) {
	foreach ( $registrations as $registration ) {
		if ( $registration instanceof EE_Registration ) {
		$att_nmbr++;
?>

		<div id="spco-attendee-panel-dv-<?php echo $registration->reg_url_link();?>" class="spco-attendee-panel-dv">

			<?php if ( $registration->event()->ID() != $prev_event ) { ?>
			<h3 id="event_title-<?php echo $registration->event()->ID() ?>" class="big-event-title-hdr">
				<?php echo $registration->event()->name(); ?>
			</h3>
			<?php } ?>
			<?php if ( $registration->ticket()->ID() != $prev_ticket ) { ?>
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
							echo $registration->ticket()->name();
							echo $registration->ticket()->description() ? '<br/>' . $registration->ticket()->description() : '';
						?>
						</td>
						<td class="jst-cntr"><?php echo $ticket_count[ $registration->ticket()->ID() ];?></td>
						<td class="jst-rght"><?php echo EEH_Template::format_currency( $registration->ticket()->price() );?></td>
						<td class="jst-rght"><?php echo EEH_Template::format_currency( $registration->ticket()->price() * $ticket_count[ $registration->ticket()->ID() ] );?></td>
					</tr>
				</table>
			</div>
				<?php } ?>
			<?php } ?>

			<?php
// ATTENDEE QUESTIONS
			echo '<h5 style="color:#2EA2CC;">$registration->reg_url_link() : <span style="color:#E76700">' . $registration->reg_url_link() . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
			?>

		</div>
<?php
			echo $item['additional_attendee_reg_info'];
			$prev_event = $registration->event()->ID();
			$prev_ticket = $registration->ticket()->ID();
		}
	 } // end foreach $registrations as $registration
	//$attendee_information_form->get_html_and_js();
	d( $attendee_information_form );
	if ( $attendee_information_form instanceof EE_Form_Section_Proper ) {
		$attendee_information_form->get_layout_strategy()->layout_subsection( $registration->reg_url_link() );
	}
} // $event_queue['total_items']

?>

		<div class="clearfix">
			<a id="spco-display-event-questions-lnk" class="act-like-link smaller-text hidden hide-if-no-js float-right" >
				<?php _e('show&nbsp;event&nbsp;questions', 'event_espresso'); ?>
			</a>
		</div>


