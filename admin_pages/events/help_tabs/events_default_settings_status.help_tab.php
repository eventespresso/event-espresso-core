<p>
    <strong><?php esc_html_e('Default Registration Status', 'event_espresso'); ?></strong>
</p>
<p>
    <strong>
        <?php echo EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence'); ?>
    </strong>
    <br />
    <?php sprintf(
        esc_html__(
            'A status of %s means that a registration has been accepted as complete. The registration will count towards the registration limit, remaining tickets, and calculations for available seats. Payments (if necessary) can also be made by primary registrants with this status.',
            'event_espresso'
        ),
        EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence')
    );
?>
</p>
<p>
    <strong>
        <?php echo EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence'); ?>
    </strong>
    <br />
    <?php printf(
        esc_html__(
            'A status of %1$s means that a registration has not paid but they ARE able to make payments (if necessary).  %2$s registrations do NOT count towards registration limits, remaining tickets, and calculations for available seats.  If registration for a free event occurs, then registrations are automatically set to %3$s. For paid tickets, %1$s registrations are set to %3$s when full payment is recorded.',
            'event_espresso'
        ),
        EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence'),
        EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence'),
        EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence')
    );
?>
</p>
<p>
    <strong>
        <?php echo EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, false, 'sentence'); ?>
    </strong>
    <br />
    <?php printf(
        esc_html__(
            'A status of %1$s means that a registration has not paid and they cannot make payments for towards an event.  Un-approved registrations do NOT count towards registration limits, remaining tickets, and calculations for available seats.  This setting differs from the "%2$s" default in that free ticket registrations and paid in full ticket registrations do NOT automatically switch the Registration to %3$s.  Instead, the event admin must manually set the registration to either "%2$s" for registrations requiring payments, or "%3$s" for free events.',
            'event_espresso'
        ),
        EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, false, 'sentence'),
        EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'upper'),
        EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'upper')
    ); ?>
</p>