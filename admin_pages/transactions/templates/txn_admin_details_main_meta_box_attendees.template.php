<?php

/**
 * @var string[][] $event_attendees
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
    <br />
    <div class="admin-primary-mbox-tbl-wrap">
        <table id="txn-admin-transaction-attendees-table" class="admin-primary-mbox-tbl">
            <thead>
                <tr>
                    <th class="jst-left"><?php esc_html_e('#', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('Event Name and Ticket', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('Registrant', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('Ticket Price', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('Email', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('Address', 'event_espresso'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php if (isset($event_attendees) && is_array($event_attendees)) : ?>
                    <?php foreach ($event_attendees as $registration => $attendee) : ?>
                        <tr class="ee-status-strip reg-status-<?php echo esc_attr($attendee['STS_ID']); ?>"
                            style="display: table-row;"
                        >
                            <td class="jst-left"><?php echo esc_html($attendee['att_num']); ?></td>
                            <td class="jst-left"><?php echo esc_html($attendee['event_ticket_name']); ?></td>
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
                            <td class="jst-rght"><?php echo wp_kses($attendee['ticket_price'], AllowedTags::getAllowedTags()); ?></td>
                            <td class="jst-left"><?php echo wp_kses($attendee['email'], AllowedTags::getAllowedTags()); ?></td>
                            <td class="jst-left"><?php echo wp_kses($attendee['address'], AllowedTags::getAllowedTags()); ?></td>
                        </tr>
                    <?php endforeach; // $event_attendees?>
                <?php endif; // isset( $event_attendees )?>
            </tbody>
        </table>
    </div>

</div>
