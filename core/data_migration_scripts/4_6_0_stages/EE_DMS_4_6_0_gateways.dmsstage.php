<?php

/**
 * EE_DMS_4_6_0_gateways
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 * Migrates 4.1-4.5-style gateway settings (which were stores in EE_Config)
 * to 4.6-style payment methods (which have their database table)
 */
class EE_DMS_4_6_0_gateways extends EE_Data_Migration_Script_Stage
{
    protected string $_new_table_name;

    protected string $_extra_meta_table_name;

    protected string $_currency_table_name;

    protected string $_currency_payment_method_table_name;

    /**
     * each key is the name of a 4.1-style gateway we know how to migrate to 4.6
     *
     * @var array
     */
    protected array $_gateway_we_know_to_migrate = [
        'Aim',
        'Bank',
        'Check',
        'Invoice',
        'Mijireh',
        'Paypal_Pro',
        'Paypal_Standard',
    ];


    /**
     * Just initializes the status of the migration
     */
    public function __construct()
    {
        global $wpdb;
        $this->_new_table_name        = $wpdb->prefix . "esp_payment_method";
        $this->_extra_meta_table_name = $wpdb->prefix . "esp_extra_meta";
        $this->_currency_table_name   = $wpdb->prefix . "esp_currency";
        $this->_pretty_name           = esc_html__('Gateways', 'event_espresso');
        parent::__construct();
    }


    /**
     * Counts the records to migrate; the public version may cache it
     *
     * @return int
     */
    protected function _count_records_to_migrate(): int
    {
        return count(EE_Config::instance()->gateway->payment_settings);
    }


    /**
     * IMPORTANT: if an error is encountered, or everything is finished, this stage should update its status property
     * accordingly. Note: it should not alter the count of items migrated. That is done in the public function that
     * calls this. IMPORTANT: The count of items migrated should ONLY be less than $num_items_to_migrate when it's the
     * last migration step, otherwise it should always return $num_items_to_migrate. (Eg, if we're migrating attendees
     * rows from the database, and $num_items_to_migrate is set to 50, then we SHOULD actually migrate 50 rows,but at
     * very least we MUST report/return 50 items migrated)
     *
     * @param int $num_items_to_migrate
     * @return int number of items ACTUALLY migrated
     * @throws EE_Error
     */
    protected function _migration_step($num_items_to_migrate = 50)
    {
        $items_actually_migrated = 0;
        $gateways_to_deal_with   = array_slice(
            EE_Config::instance()->gateway->payment_settings,
            $this->count_records_migrated(),
            $num_items_to_migrate
        );
        foreach ($gateways_to_deal_with as $old_gateway_slug => $old_gateway_settings) {
            if (in_array($old_gateway_slug, $this->_gateway_we_know_to_migrate)) {
                if (! $old_gateway_settings) {
                    // no settings existed for this gateway anyways... weird...
                    $items_actually_migrated++;
                    continue;
                }
                // now prepare the settings to make sure they're in the 4.1 format
                $success = $this->_convert_gateway_settings(
                    $old_gateway_slug,
                    $old_gateway_settings,
                    isset(EE_Config::instance()->gateway->active_gateways[ $old_gateway_slug ])
                );
                if ($success) {
                    EE_Config::instance()->gateway->payment_settings[ $old_gateway_slug ] = 'Deprecated';
                }
            }
            $items_actually_migrated++;
        }

        EE_Config::instance()->update_espresso_config(false, false);
        if ($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()) {
            $this->set_completed();
        }
        return $items_actually_migrated;
    }


    /**
     * Converts the 4.1-style gateway to a 4.6-style payment method and saves it to the DB
     *
     * @param string  $old_gateway_slug
     * @param array   $old_gateway_settings
     * @param boolean $active indicates the gateway is currently active
     * @return boolean success
     * @throws EE_Error
     */
    protected function _convert_gateway_settings(
        string $old_gateway_slug,
        array $old_gateway_settings,
        bool $active
    ): bool {
        switch ($old_gateway_slug) {
            case 'Aim':
                $extra_meta_key_values = [
                    'login_id'          => $old_gateway_settings['authnet_aim_login_id'],
                    'transaction_key'   => $old_gateway_settings['authnet_aim_transaction_key'],
                    'test_transactions' => $old_gateway_settings['test_transactions'],
                ];
                $desc                  =
                    esc_html__('Please provide the following billing information.', 'event_espresso');
                break;
            case 'Bank':
                $extra_meta_key_values = [
                    'page_title'           => $old_gateway_settings['page_title'],
                    'payment_instructions' => sprintf(
                        esc_html__(
                            '%1$s<br/>Name on Bank Account: %2$s<br/>Bank Account Number: %3$s<br/>Bank Name: %4$s<br/>Bank Address:%5$s',
                            'event_espresso'
                        ),
                        $old_gateway_settings['bank_instructions'],
                        $old_gateway_settings['account_name'],
                        $old_gateway_settings['account_number'],
                        $old_gateway_settings['bank_name'],
                        $old_gateway_settings['bank_address']
                    ),
                ];
                $desc                  =
                    esc_html__('Make payment using an electronic funds transfer from your bank.', 'event_espresso');
                break;
            case 'Check':
                $extra_meta_key_values = [
                    'check_title'             => $old_gateway_settings['check_title'],
                    'payment_instructions'    => $old_gateway_settings['check_instructions'],
                    'address_to_send_payment' => $old_gateway_settings['payment_address'],
                ];
                $desc                  = esc_html__(
                    'On the next page you will be given instructions on how to make a payment by check.',
                    'event_espresso'
                );
                break;
            case 'Invoice':
                $extra_meta_key_values = [
                    'pdf_payee_name'         => $old_gateway_settings['template_invoice_payee_name'],
                    'pdf_payee_email'        => $old_gateway_settings['template_invoice_email'],
                    'pdf_payee_tax_number'   => $old_gateway_settings['template_invoice_tax_number'],
                    'pdf_payee_address'      => $old_gateway_settings['template_invoice_address'],
                    'pdf_instructions'       => $old_gateway_settings['template_payment_instructions'],
                    'pdf_logo_image'         => $old_gateway_settings['invoice_logo_url'],
                    'page_confirmation_text' => $old_gateway_settings['page_instructions'] ?? '',
                    'page_extra_info'        => $old_gateway_settings['payment_address'] ?? '',
                    'legacy_invoice_css'     => $old_gateway_settings['invoice_css'] ?? '',
                ];
                // if they didnt want the invoice gateway to show, pretend it was inactive
                if (! $old_gateway_settings['show']) {
                    $active = false;
                }
                $desc = esc_html__(
                    'On the next page you will be able to access your invoice and instructions on how to pay it.',
                    'event_espresso'
                );
                break;
            case 'Mijireh':
                $extra_meta_key_values = [
                    'access_key' => $old_gateway_settings['access_key'],
                ];
                $desc                  = esc_html__(
                    'On the next page you will be able to enter your billing information to make the payment.',
                    'event_espresso'
                );
                break;
            case 'Paypal_Pro':
                $extra_meta_key_values = [
                    'username'          => $old_gateway_settings['username'],
                    'password'          => $old_gateway_settings['password'],
                    'signature'         => $old_gateway_settings['signature'],
                    'credit_card_types' => $old_gateway_settings['credit_cards'],
                ];
                $desc                  =
                    esc_html__('Please provide the following billing information.', 'event_espresso');
                break;
            case 'Paypal_Standard':
                $extra_meta_key_values = [
                    'paypal_id'        => $old_gateway_settings['paypal_id'],
                    'image_url'        => $old_gateway_settings['image_url'],
                    'shipping_details' => $old_gateway_settings['no_shipping'] ?? false,

                ];
                $desc                  = sprintf(
                    esc_html__(
                        'After clicking \'Finalize Registration\', you will be forwarded to PayPal to make your payment. Make sure you return to this site in order to properly finalize your registration.',
                        'event_espresso'
                    ),
                    '<strong>',
                    '</strong>'
                );
                break;
            default:
                // if we don't recognize the payment method, just put everything in it into extra meta. At least this way its preserved somewhere
                $extra_meta_key_values = $old_gateway_settings;
                $desc                  = '';
        }
        $pretty_name      = $old_gateway_settings['display_name'] ?? $old_gateway_slug;
        $offline_gateways = ['Bank', 'Check', 'Invoice'];
        if ($active && in_array($old_gateway_slug, $offline_gateways)) {
            $scope = ['CART', 'ADMIN'];
        } elseif ($active && ! in_array($old_gateway_slug, $offline_gateways)) {
            $scope = ['CART'];
        } elseif (! $active && in_array($old_gateway_slug, $offline_gateways)) {
            $scope = ['ADMIN'];
        } else {
            $scope = [];
        }
        $payment_method_col_values = [
            'PMD_type'       => $old_gateway_slug,
            'PMD_name'       => $pretty_name,
            'PMD_desc'       => $desc,
            'PMD_admin_name' => $pretty_name,
            'PMD_slug'       => sanitize_key($old_gateway_slug),
            'PMD_debug_mode' => $old_gateway_settings['use_sandbox'] ?? false,
            'PMD_button_url' => $old_gateway_settings['button_url'] ?? null,
            'PMD_scope'      => serialize($scope),
        ];
        $db_types                  = [
            '%s',// PMD_type
            '%s',// PMD_name
            '%s',// PMD_desc
            '%s',// PMD_admin_name
            '%s',// PMD_slug
            '%d',// PMD_debug_mode
            '%s',// PMD_button_url
            '%s',// PMD_scope
        ];
        global $wpdb;
        // first: check if it already exists
        $id = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT PMD_ID FROM $this->_new_table_name WHERE PMD_slug=%s",
                $payment_method_col_values['PMD_slug']
            )
        );
        if ($id) {
            // just update that payment method instead of creating a new one
            $success = $wpdb->update(
                $this->_new_table_name,
                $payment_method_col_values,
                [
                    'PMD_ID' => $id,
                ],
                $db_types,
                [
                    '%d',// PMD_ID
                ]
            );
            if (! $success) {
                $this->add_error(
                    sprintf(
                        esc_html__(
                            'Could not update payment method %d with properties %s because %s',
                            "event_espresso"
                        ),
                        $id,
                        wp_json_encode($payment_method_col_values),
                        $wpdb->last_error
                    )
                );
            }
        } else {
            $success = $wpdb->insert(
                $this->_new_table_name,
                $payment_method_col_values,
                $db_types
            );
            if (! $success) {
                $this->add_error($wpdb->last_error);
                return false;
            } else {
                $id = $wpdb->insert_id;
            }
        }

        if ($id) {
            $this->_convert_extra_meta_values($id, $extra_meta_key_values);
            $this->get_migration_script()->set_mapping(
                'EE_Gateway_Config',
                $old_gateway_slug,
                $this->_new_table_name,
                $id
            );
            return true;
        }
        return false;
    }


    /**
     * Converts old gateway settings which don't map onto the Payment_Method model
     * to extra meta fields
     *
     * @param int   $id
     * @param array $extra_meta_key_values
     */
    private function _convert_extra_meta_values(int $id, array $extra_meta_key_values)
    {
        global $wpdb;
        foreach ($extra_meta_key_values as $key => $value) {
            $exm_args = [
                'OBJ_ID'    => $id,
                'EXM_type'  => 'Payment_Method',
                'EXM_key'   => $key,
                'EXM_value' => maybe_serialize($value),
            ];
            $success  = $wpdb->insert(
                $this->_extra_meta_table_name,
                $exm_args,
                [
                    '%d',// OBJ_ID
                    '%s',// EXM_type
                    '%s',// EXM_key
                    '%s',// EXM_value
                ]
            );
            if (! $success) {
                $this->add_error(
                    sprintf(
                        esc_html__('Could not insert extra meta key with values %s. %s', "event_espresso"),
                        wp_json_encode($exm_args),
                        $wpdb->last_error
                    )
                );
            }
        }
    }
}
