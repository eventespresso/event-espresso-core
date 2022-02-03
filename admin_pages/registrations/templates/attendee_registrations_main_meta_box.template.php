<?php
/**
 * @var EE_Registration[] $registrations
 */
?>

<div class="admin-primary-mbox-dv">
    <br />
    <div class="admin-primary-mbox-tbl-wrap">
        <table class="admin-primary-mbox-tbl striped">
            <thead>
                <tr>
                    <th class="jst-left"><?php esc_html_e('Event Name', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('REG ID', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('TXN ID', 'event_espresso'); ?></th>
                    <th class="jst-left"><?php esc_html_e('Reg Code', 'event_espresso'); ?></th>
                    <th class="jst-rght"><?php esc_html_e('Ticket Price', 'event_espresso'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($registrations as $registration) : ?>
                    <tr>
                        <td class="jst-left">
                            <?php
                            $EVT_ID = absint($registration->event_ID());
                            $event_url = add_query_arg(
                                ['action' => 'edit', 'post' => $EVT_ID],
                                admin_url('admin.php?page=espresso_events')
                            );
                            echo EE_Registry::instance()->CAP->current_user_can(
                                'ee_edit_event',
                                'espresso_events_edit',
                                $EVT_ID
                            )
                                ? '<a href="' . esc_url_raw($event_url) . '"  title="'
                                  . esc_attr__('Edit Event', 'event_espresso') . '">'
                                  . esc_html($registration->event_name()) . '</a>'
                                : esc_html($registration->event_name());
                            ?>
                        </td>
                        <td class="jst-left">
                            <?php
                            $REG_ID = absint($registration->ID());
                            $reg_url = EE_Admin_Page::add_query_args_and_nonce(
                                ['action' => 'view_registration', '_REG_ID' => $REG_ID],
                                REG_ADMIN_URL
                            );
                            echo EE_Registry::instance()->CAP->current_user_can(
                                'ee_read_registration',
                                'espresso_registrations_view_registration',
                                $REG_ID
                            )
                                ? '<a href="' . esc_url_raw($reg_url) . '" title="'
                                  . esc_attr__('View Registration Details', 'event_espresso') . '">'
                                  . esc_html__('View Registration', 'event_espresso') . '</a>'
                                : $REG_ID;
                            ?>
                        </td>
                        <td class="jst-left">
                            <?php
                            $TXN_ID = absint($registration->transaction_ID());
                            $txn_url = EE_Admin_Page::add_query_args_and_nonce(
                                ['action' => 'view_transaction', 'TXN_ID' => $TXN_ID],
                                TXN_ADMIN_URL
                            );
                            echo EE_Registry::instance()->CAP->current_user_can(
                                'ee_read_transaction',
                                'espresso_transactions_view_transaction'
                            )
                                ? '<a href="' . esc_url_raw($txn_url) . '" title="'
                                  . esc_attr__('View Transaction Details', 'event_espresso') . '">'
                                  . sprintf(
                                      esc_html__('View Transaction %d', 'event_espresso'),
                                      $TXN_ID
                                  ) .
                                  '</a>'
                                : $TXN_ID;
                            ?>
                        </td>
                        <td class="jst-left"><?php echo esc_html($registration->reg_code()); ?></td>
                        <td class="jst-rght">
                            <?php echo EEH_Template::format_currency($registration->final_price()); // already escaped ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>
