<?php

/**
 * EE_DMS_4_6_0_billing_info
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_DMS_4_6_0_transactions extends EE_Data_Migration_Script_Stage_Table
{
    protected string $_transaction_table;

    protected string $_payment_method_table;


    public function __construct()
    {
        global $wpdb;
        $this->_old_table            = $wpdb->prefix . 'esp_extra_meta';
        $this->_transaction_table    = $wpdb->prefix . 'esp_transaction';
        $this->_payment_method_table = $wpdb->prefix . 'esp_payment_method';
        $this->_pretty_name          = esc_html__('Transaction Payment Method Relations', 'event_espresso');
        $this->_extra_where_sql      = "WHERE EXM_key = 'gateway' AND EXM_type = 'Transaction'";
        parent::__construct();
    }


    protected function _migrate_old_row($old_row)
    {
        global $wpdb;
        // get the payment method's ID
        $PMD_ID = $this->_get_payment_method_id_by_gateway_name($old_row['EXM_value']);
        if (! $PMD_ID) {
            $this->add_error(
                sprintf(
                    esc_html__(
                        'Could not find payment method with PMD_type = \'%1$s\' when migrating extra meta row %2$s',
                        'event_espresso'
                    ),
                    $old_row['EXM_value'],
                    $this->_json_encode($old_row)
                )
            );
            return;
        }
        $new_values          = ['PMD_ID' => $PMD_ID];
        $wheres              = ['TXN_ID' => $old_row['OBJ_ID']];
        $new_value_data_types = ['%d'];
        $where_data_types     = ['%d'];
        $success             = $wpdb->update(
            $this->_transaction_table,
            $new_values,
            $wheres,
            $new_value_data_types,
            $where_data_types
        );
        if (! $success) {
            $this->add_error(
                sprintf(
                    esc_html__('Couldn\'t set %1$s row in table %2$s where %3$s', 'event_espresso'),
                    $this->_json_encode($new_values),
                    $this->_transaction_table,
                    $this->_json_encode($wheres)
                )
            );
        }
    }


    /**
     * @param string $gateway_name
     * @return string
     * @global wpdb  $wpdb
     */
    protected function _get_payment_method_id_by_gateway_name(string $gateway_name): string
    {
        global $wpdb;
        return $wpdb->get_var(
            $wpdb->prepare(
                "SELECT PMD_ID FROM " . $wpdb->prefix . "esp_payment_method WHERE PMD_type = %s",
                $gateway_name
            )
        );
    }
}
