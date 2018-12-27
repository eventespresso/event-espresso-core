<?php

namespace EventEspresso\core\domain\services\admin\privacy\export;

use EEM_Transaction;
use EventEspresso\core\services\privacy\export\PersonalDataExporterInterface;

/**
 * Class ExportTransaction
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class ExportTransaction implements PersonalDataExporterInterface
{
    /**
     * @var EEM_Transaction $transaction_model
     */
    protected $transaction_model;

    /**
     * ExportTransaction constructor.
     *
     * @param $transaction_model
     */
    public function __construct(EEM_Transaction $transaction_model)
    {
        $this->transaction_model = $transaction_model;
    }


    /**
     * Returns data for export.
     *
     * @param string    $email_address ,
     * @param int       $page          starts at 1, not 0
     * @return array {
     * @type array      $data          {
     * @type array {
     * @type string     $group_id      (not translated, same for all exports)
     * @type string     $group_label   (translated string)
     * @type string|int $item_id
     * @type array      $data          {
     * @type array {
     * @type string     $name          what's shown in the left-column of the export row
     * @type string     $value         what's showin the right-column of the export row
     *                                 }
     *                                 }
     *                                 }
     *                                 }
     *                                 }
     */
    public function export($email_address, $page = 1)
    {
        $page_size = 10;
        $transactions = $this->transaction_model->get_all(
            array(
                array(
                    'Registration.Attendee.ATT_email' => $email_address,
                ),
                'limit' => array(
                    ($page - 1) * $page_size,
                    $page_size,
                ),
            )
        );
        $export_fields = array_intersect_key(
            EEM_Transaction::instance()->field_settings(),
            array_flip(
                array(
                    'TXN_timestamp',
                    'TXN_total',
                    'TXN_paid',
                    'TXN_session_data',
                )
            )
        );
        $export_items = array();
        $found_something = false;
        foreach ($transactions as $transaction) {
            $found_something = true;
            $data = array();
            foreach ($export_fields as $field_name => $field_obj) {
                if ($field_name === 'TXN_session_data') {
                    $value = $transaction->get_pretty($field_name, 'print_r');
                } else {
                    $value = $transaction->get_pretty($field_name);
                }
                $data[] = array(
                    'name'  => $field_obj->get_nicename(),
                    'value' => $value,
                );
            }
            $export_items[] = array(
                'group_id'    => 'transactions',
                'group_label' => esc_html__('Transactions', 'event_espresso'),
                'item_id'     => $transaction->ID(),
                'data'        => $data,
            );
        }
        return array(
            'data' => $export_items,
            'done' => ! $found_something,
        );
    }

    /**
     * Gets the Translated name of this exporter
     *
     * @return string
     */
    public function name()
    {
        return esc_html__('Event Espresso Transaction Exporter', 'event_espresso');
    }
}
// End of file ExportTransaction.php
// Location: EventEspresso\core\domain\services\admin\privacy\export/ExportTransaction.php
