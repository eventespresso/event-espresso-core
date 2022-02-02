<?php
/**
 * @var string     $attendee_notice
 * @var string     $currency_sign
 * @var string[][] $attendees
 */
?>

<a id="other-attendees"></a>
<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
    <br />
    <?php echo esc_html($attendee_notice); ?>
    <?php if (! empty($attendees)) : ?>
        <div class="admin-primary-mbox-tbl-wrap">
            <table id="reg-admin-transaction-attendees-table" class="admin-primary-mbox-tbl">
                <thead>
                    <tr>
                        <th class="jst-cntr no-pad"></th>
                        <th class="jst-left"><?php esc_html_e('#', 'event_espresso'); ?></th>
                        <th class="jst-left"><?php esc_html_e('Event Name', 'event_espresso'); ?></th>
                        <th class="jst-left"><?php esc_html_e('Attendee', 'event_espresso'); ?></th>
                        <th class="jst-rght"><?php esc_html_e('Price Paid', 'event_espresso'); ?></th>
                        <th class="jst-left"><?php esc_html_e('Email', 'event_espresso'); ?></th>
                        <th class="jst-left"><?php esc_html_e('Address', 'event_espresso'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach ($attendees as $att_nmbr => $attendee) : ?>
                        <tr>
                            <th class='jst-cntr no-pad'>
                                <span class="ee-status-dot ee-status-dot--<?php echo esc_attr($attendee['STS_ID']); ?> ee-aria-tooltip"
                                      aria-label="<?php echo esc_attr(EEH_Template::pretty_status($attendee['STS_ID'], false, "sentence" ));?>">
                                </span>
                            </th>
                            <td class="jst-left"><?php echo esc_html($att_nmbr); ?></td>
                            <td class="jst-left"><?php echo esc_html($attendee['event_name']); ?></td>
                            <td class="jst-left">
                                <a href="<?php echo esc_url_raw($attendee['att_link']); ?>"
                                   aria-label="<?php esc_attr_e('View details for this attendee', 'event_espresso'); ?>"
                                   class="ee-aria-tooltip"
                                >
                                    <?php echo esc_html($attendee['fname'] . ' ' . $attendee['lname']); ?>
                                </a>
                            </td>
                            <td class="jst-rght">
                                <?php
                                $final_price = number_format((float) $attendee['final_price'], 2);
                                echo esc_html("$currency_sign $final_price");
                                ?>
                            </td>
                            <td class="jst-left"><?php echo esc_html($attendee['email']); ?></td>
                            <td class="jst-left"><?php echo esc_html($attendee['address']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
</div>
