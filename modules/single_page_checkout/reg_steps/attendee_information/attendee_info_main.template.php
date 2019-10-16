<?php
/** @var boolean $revisit */
/** @var array $ticket_line_item */
/** @var string $default_hidden_inputs */
?>
<?php if (!is_admin()) : ?>
    <p id="spco-attendee_information-pg" class="spco-steps-pg small-text drk-grey-text">
        <?php echo apply_filters(
            'FHEE__registration_page_attendee_information__attendee_information_pg',
            sprintf(
                __(
                    'In order to process your registration, we ask you to provide the following information.%1$sPlease note that all fields marked with an asterisk (%2$s) are required.',
                    'event_espresso'
                ),
                '<br />',
                '<span class="asterisk">*</span>'
            )
        ); ?>
</p>
<?php endif; ?>

<?php
$att_nmbr = 0;
$prev_event = 0;
$prev_ticket = 0;
$total_registrations = count($registrations);
$reg_forms = [];

if ($total_registrations > 0) {
    // Loop registrations to get the reg. forms.
    foreach ($registrations as $registration) {
        if ($registration instanceof EE_Registration) {
            // Attendee questions.
            $reg_form = trim(${ EE_Template_Layout::get_subform_name($registration->reg_url_link()) });
            if (!empty($reg_form)) {
                $reg_forms[] = $reg_form;
            }
        }
    }

    // Store the total extracted forms.
    $total_forms = count($reg_forms);

    foreach ($registrations as $registration) {
        if ($registration instanceof EE_Registration) {
            $att_nmbr++;
            ?>

            <div id="spco-attendee-panel-dv-<?php echo $registration->reg_url_link(); ?>"
                 class="spco-attendee-panel-dv spco-attendee-ticket-<?php echo $registration->ticket()->ID(); ?>">

                <?php if (!is_admin() && $registration->event()->ID() !== $prev_event) { ?>
                    <h4 id="event_title-<?php echo $registration->event()->ID() ?>" class="big-event-title-hdr">
                        <?php echo $registration->event()->name(); ?>
                    </h4>
                <?php } ?>
                <?php if ($registration->ticket()->ID() !== $prev_ticket) { ?>
                    <?php if (! $revisit) { ?>
                        <div class="spco-ticket-info-dv small-text">
                            <?php if (!is_admin()) : ?>
                                <h5><?php _e('Details', 'event_espresso'); ?></h5>
                            <?php endif; ?>
                            <table class="spco-ticket-details">
                                <thead>
                                <tr>
                                    <th scope="col" width="" class="jst-left"><?php _e('Name and Description', 'event_espresso'); ?></th>
                                    <th scope="col" width="7.5%" class="jst-rght">
                                        <?php _e(
                                            'Qty',
                                            'event_espresso'
                                        ); ?></th>
                                    <th scope="col" width="17.5%" class="jst-rght">
                                        <?php _e(
                                            'Price',
                                            'event_espresso'
                                        ); ?></th>
                                    <th scope="col" width="17.5%" class="jst-rght">
                                        <?php _e(
                                            'Total',
                                            'event_espresso'
                                        ); ?></th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php echo $ticket_line_item[ $registration->ticket()->ID() ]; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php } ?>
                <?php } ?>

                <?php
                // If only one form is available, we display the form once.
                if ($total_forms == 1 && $att_nmbr - 1 == $total_forms) {
                    // Display the first and only form.
                    echo $reg_forms[0];
                } elseif ($total_forms > 1) {
                    // Display the extra forms normally.
                    echo $reg_forms[ $att_nmbr - 1 ];
                }
                ?>

            </div>
            <?php
            $prev_event = $registration->event()->ID();
            $prev_ticket = $registration->ticket()->ID();
        } // if ( $registration instanceof EE_Registration )
    } // end foreach ( $registrations as $registration )

    echo $default_hidden_inputs;
} // end if ( count( $registrations ) > 0 )

?>

<div class="clearfix">
    <a id="spco-display-event-questions-lnk" class="act-like-link smaller-text hidden hide-if-no-js float-right">
        <?php _e('show&nbsp;event&nbsp;questions', 'event_espresso'); ?>
    </a>
</div>


