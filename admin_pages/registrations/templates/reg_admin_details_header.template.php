<div style="float:right">
	<?php printf( __( 'View %1$sRegistrations%4$s /  %2$sTransactions%4$s for this %3$sevent%4$s.', 'event_espresso' ), '<a href="' . $filtered_registrations_link . '">', '<a href="' . $filtered_transactions_link . '">', '<a href="' . $event_link . '">', '</a>' );?>
</div>
<h3 id="reg-admin-reg-details-reg-nmbr-hdr"><?php echo $previous_registration . '&nbsp;'; echo __( 'Registration # ', 'event_espresso' ) . $reg_nmbr['value']; echo '&nbsp;' . $next_registration; ?></h3>
<h2 id="reg-admin-reg-details-reg-date-hdr"><?php echo $reg_datetime['value'];?></h2>

<?php if ( $registration->group_size() > 1 ) : ?>
	<a id="scroll-to-other-attendees" class="scroll-to" href="#other-attendees"><?php echo __( 'Scroll to Other Registrations in the Same Transaction', 'event_espresso' );?></a>
<?php endif; ?>

<?php do_action( 'AHEE__reg_status_change_buttons__after_header', $REG_ID ); ?>

