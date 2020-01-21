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
                esc_html__(
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

if (count($registrations) > 0) {
    $ticketID = key($template_args['ticket_count']);
    ?>

    <div id="spco-attendee-panel-dv-<?php echo $ticketID; ?>"
        class="spco-attendee-panel-dv spco-attendee-ticket-<?php echo $ticketID; ?>">

        <div class="spco-ticket-info-dv small-text">
            <?php if (!is_admin()) : ?>
                <h5><?php esc_html_e('Details', 'event_espresso'); ?></h5>
            <?php endif; ?>
            <table class="spco-ticket-details">
                <thead>
                <tr>
                    <th scope="col" width="" class="jst-left"><?php esc_html_e('Name and Description', 'event_espresso'); ?></th>
                    <th scope="col" width="7.5%" class="jst-rght">
                        <?php esc_html_e(
                            'Qty',
                            'event_espresso'
                        ); ?></th>
                    <th scope="col" width="17.5%" class="jst-rght">
                        <?php esc_html_e(
                            'Price',
                            'event_espresso'
                        ); ?></th>
                    <th scope="col" width="17.5%" class="jst-rght">
                        <?php esc_html_e(
                            'Total',
                            'event_espresso'
                        ); ?></th>
                </tr>
                </thead>
                <tbody>
                <?php
                // Store previous values to avoid duplicated rows.
                $prev_ticket = 0;
                // Display all tickets inside.
                foreach ($registrations as $registration) {
                    if ($registration instanceof EE_Registration) {
                        if ($registration->ticket()->ID() !== $prev_ticket) {
                            echo $ticket_line_item[ $registration->ticket()->ID() ];
                        }

                        $prev_ticket = $registration->ticket()->ID();
                    }
                }
                ?>
                </tbody>
            </table>
        </div><!-- close spco-ticket-info-dv -->

    <?php
    // Display the forms below the table.
    foreach ($registrations as $registration) {
        if ($registration instanceof EE_Registration) {
            // Attendee Questions.
            $reg_form = EE_Template_Layout::get_subform_name($registration->reg_url_link());
            echo ${$reg_form};
        } // if ( $registration instanceof EE_Registration )
    } // end foreach ( $registrations as $registration )

    ?>
    </div><!-- close spco-attendee-panel-dv -->
    <?php
    echo $default_hidden_inputs;
} // end if ( count( $registrations ) > 0 )

?>

<div class="clearfix">
    <a id="spco-display-event-questions-lnk" class="act-like-link smaller-text hidden hide-if-no-js float-right">
        <?php esc_html_e('show&nbsp;event&nbsp;questions', 'event_espresso'); ?>
    </a>
</div>
