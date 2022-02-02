<?php
/**
 * @var string[][] $event_attendees
 */
?>
<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
    <br />
    <div class="admin-primary-mbox-tbl-wrap">
        <table id="txn-admin-transaction-attendees-table" class="admin-primary-mbox-tbl">
            <thead>
                <tr>
                    <th class="jst-cntr no-pad"></th>
                    <th class='jst-left'><?php esc_html_e('Event Name and Ticket', 'event_espresso'); ?></th>
                    <th class='jst-rght'><?php esc_html_e('Ticket Price', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('Registrant', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('Email', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('Address', 'event_espresso'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php if (isset($event_attendees) && is_array($event_attendees)) : ?>
                    <?php foreach ($event_attendees as $registration => $attendee) : ?>
                        <tr style="display: table-row;" >
                            <td class="jst-cntr no-pad">
                                <span class="ee-status-dot ee-status-dot--<?php echo esc_attr($attendee['STS_ID']);?>">
                                </span>
                            </td>
                            <td class='jst-left'><?php echo esc_html($attendee['event_ticket_name']); ?></td>
                            <td class='jst-rght'><?php echo $attendee['ticket_price']; // already escaped ?></td>
                            <td class="jst-left">
                                <?php
                                $att_link = EE_Admin_Page::add_query_args_and_nonce(
                                    ['action' => 'view_registration', '_REG_ID' => $registration],
                                    REG_ADMIN_URL
                                );
                                ?>
                                <a href="<?php echo esc_url_raw($att_link); ?>"
                                   title="<?php esc_attr_e('View details for this registrant', 'event_espresso'); ?>"
                                >
                                    <?php echo esc_html($attendee['attendee']); ?>
                                </a>
                            </td>
                            <td class="jst-left"><?php echo $attendee['email']; // already escaped ?></td>
                            <td class="jst-left"><?php echo $attendee['address']; // already escaped ?></td>
                        </tr>
                    <?php endforeach; // $event_attendees?>
                <?php endif; // isset( $event_attendees )?>
            </tbody>
        </table>
    </div>
</div>
