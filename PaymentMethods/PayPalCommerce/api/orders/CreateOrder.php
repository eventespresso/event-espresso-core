<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\orders;

use EE_Error;
use EE_Line_Item;
use EE_Transaction;
use EEM_State;
use EventEspresso\core\services\request\sanitizers\RequestSanitizer;
use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\currency\CurrencyManager;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;
use ReflectionException;

/**
 * Class CreateOrder
 *
 * Generates and sends a Create Order request using PayPal API.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class CreateOrder extends OrdersApi
{
    /**
     * Line items total.
     *
     * @var float
     */
    protected $items_total = 0;

    /**
     * Promotions total.
     *
     * @var float
     */
    protected $promos_total = 0;

    /**
     * Tax total.
     *
     * @var float
     */
    protected $tax_total = 0;

    /**
     * Currency.
     *
     * @var string
     */
    protected $currency_code;

    /**
     * Billing info.
     *
     * @var array
     */
    protected $billing_info;

    /**
     * Transaction this order is for.
     *
     * @var EE_Transaction
     */
    protected $transaction;


    /**
     * CreateOrder constructor.
     *
     * @param PayPalApi      $api
     * @param EE_Transaction $transaction
     * @param array          $billing_info
     */
    public function __construct(PayPalApi $api, EE_Transaction $transaction, array $billing_info)
    {
        parent::__construct($api);
        $this->transaction   = $transaction;
        $this->currency_code = CurrencyManager::currencyCode();
        $this->sanitizeRequestParameters($billing_info);
    }


    /**
     * Sanitize the array of billing form data.
     *
     * @param array $billing_info
     * @return void
     */
    public function sanitizeRequestParameters(array $billing_info)
    {
        $sanitizer = new RequestSanitizer();
        foreach ($billing_info as $item => $value)
        {
            $this->billing_info[ $item ] = $sanitizer->clean($value);
        }
    }


    /**
     * Create PayPal Order.
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function create(): array
    {
        $order_parameters = $this->getParameters();
        // Create Order request.
        $create_response = $this->api->sendRequest($order_parameters, $this->request_url);
        return $this->validateOrder($create_response, $order_parameters);
    }


    /**
     * Form order parameters.
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function getParameters(): array
    {
        $registrant  = $this->transaction->primary_registration();
        $event       = $registrant->event();
        $description = $event->name() ?? esc_html__('Tickets for an event', 'event_espresso');
        $state       = EEM_State::instance()->get_col(
            [
                ['STA_ID' => $this->billing_info['bill_state']],
                'limit' => 1
            ],
            'STA_abbrev'
        )[0];
        $params      = [
            'intent'              => 'CAPTURE',
            'purchase_units'      => [
                [
                    'custom_id'   => $this->transaction->ID(),
                    'description' => substr(wp_strip_all_tags($description), 0, 125),
                    'items'       => $this->getLineItems(),
                    'amount'      => [
                        'value'         => $this->transaction->total(),
                        'currency_code' => $this->currency_code,
                        'breakdown'     => $this->getBreakdown(),
                    ],
                ],
            ],
            'application_context' => [
                'shipping_preference' => 'NO_SHIPPING',
                'user_action'         => 'PAY_NOW',
            ],
            'payer'               => [
                'email_address' => $this->billing_info['bill_email'],
                'name'          => [
                    'given_name' => substr($this->billing_info['bill_first_name'], 0, 139),
                    'surname'    => substr($this->billing_info['bill_last_name'], 0, 139),

                ],
                'address'       => [
                    'country_code'   => $this->billing_info['bill_country'],
                    'address_line_1' => substr($this->billing_info['bill_address'], 0, 299),
                    'admin_area_1'   => $state ?? '',
                    'admin_area_2'   => substr($this->billing_info['bill_city'], 0, 119),
                    'postal_code'    => substr($this->billing_info['bill_zip'], 0, 59),
                ],
            ],
        ];
        if (isset($this->billing_info['bill_address_2']) && $this->billing_info['bill_address_2']) {
            $params['payer']['address']['address_line_2'] = substr($this->billing_info['bill_address_2'], 0, 299);
        }
        if (isset($this->billing_info['bill_phone']) && $this->billing_info['bill_phone']) {
            $params['payer']['phone_number'] = $this->billing_info['bill_phone'];
        }
        return $params;
    }


    /**
     * Itemize the payment. List all the line items, discounts and taxes.
     *
     * @return array
     * @throws EE_Error|ReflectionException
     */
    protected function getLineItems(): array
    {
        // Order line items.
        $line_items       = [];
        $event_line_items = $this->transaction->items_purchased();
        // List actual line items.
        foreach ($event_line_items as $line_item) {
            if ($line_item instanceof EE_Line_Item && $line_item->OBJ_type() !== 'Promotion') {
                $item_money     = $line_item->unit_price();
                $li_description = $line_item->desc() ?? esc_html__('Event Ticket', 'event_espresso');
                $line_items [] = [
                    'name'        => substr(wp_strip_all_tags($line_item->name()), 0, 126),
                    'quantity'    => $line_item->quantity(),
                    'description' => substr(wp_strip_all_tags($li_description), 0, 125),
                    'unit_amount' => [
                        'currency_code' => $this->currency_code,
                        'value'         => $item_money,
                    ],
                    'category'    => 'DIGITAL_GOODS',
                ];
                // Line item total.
                $this->items_total += $line_item->pretaxTotal();
            } elseif ($line_item->OBJ_type() === 'Promotion') {
                // Promotions total.
                $this->promos_total += $line_item->total();
            }
        }
        // Make sure we have an absolute number with only two decimal laces.
        $this->items_total  = CurrencyManager::normalizeValue($this->items_total);
        $this->promos_total = CurrencyManager::normalizeValue($this->promos_total);
        $this->countTaxTotal();
        return $line_items;
    }


    /**
     * Count the tax total.
     *
     * @return void
     * @throws EE_Error|ReflectionException
     */
    protected function countTaxTotal()
    {
        // List taxes.
        $this->tax_total = 0;
        $tax_items       = $this->transaction->tax_items();
        foreach ($tax_items as $tax_item) {
            $this->tax_total += $tax_item->total();
        }
        $this->tax_total = CurrencyManager::normalizeValue($this->tax_total);
    }


    /**
     * Itemize the payment the breakdown list.
     *
     * @return array
     */
    protected function getBreakdown(): array
    {
        $breakdown['item_total'] = [
            'currency_code' => $this->currency_code,
            'value'         => $this->items_total,
        ];
        $breakdown['tax_total']  = [
            'currency_code' => $this->currency_code,
            'value'         => $this->tax_total,
        ];
        $breakdown['discount']   = [
            'currency_code' => $this->currency_code,
            'value'         => abs($this->promos_total),
        ];
        return $breakdown;
    }


    /**
     * Makes sure that we have received an Order back from the API call.
     *
     * @param $response
     * @param $parameters
     * @return array
     */
    public function validateOrder($response, $parameters): array
    {
        if (! empty($response['error'])) {
            return $response;
        }
        if (! isset($response['id'])) {
            $message = esc_html__('Unexpected response. Unable to find the order.', 'event_espresso');
            try {
                PayPalLogger::errorLog(
                    $message,
                    [$this->request_url, $parameters, $response],
                    $this->transaction->payment_method()
                );
            } catch (EE_Error | ReflectionException $e) {
                // Just continue.
            }
            return [
                'error'   => $response['error'] ?? 'missing_order',
                'message' => $response['message'] ?? $message,
            ];
        }
        return $response;
    }
}
