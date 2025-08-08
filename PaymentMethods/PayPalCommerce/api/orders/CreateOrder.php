<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\orders;

use EE_Error;
use EE_Line_Item;
use EE_Payment;
use EEM_Payment;
use EE_Transaction;
use EventEspresso\core\domain\services\capabilities\FeatureFlag;
use EventEspresso\core\domain\services\capabilities\FeatureFlags;
use EventEspresso\core\domain\services\validation\email\strategies\Basic;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\payment_methods\gateways\GatewayDataFormatter;
use EventEspresso\core\services\request\sanitizers\RequestSanitizer;
use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\currency\CurrencyManager;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta\PayPalExtraMetaManager;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\fees\PartnerPaymentFees;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;
use Exception;
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
    protected float $items_total = 0.0;

    /**
     * Promotions total.
     *
     * @var float
     */
    protected float $promos_total = 0.0;

    /**
     * Tax total.
     *
     * @var float
     */
    protected float $tax_total = 0.0;

    /**
     * Currency.
     *
     * @var string
     */
    protected string $currency_code;

    /**
     * Billing info.
     *
     * @var array
     */
    protected array $billing_info;

    /**
     * Transaction this order is for.
     *
     * @var EE_Transaction
     */
    protected EE_Transaction $transaction;

    private FeatureFlags $feature;

    private GatewayDataFormatter $gateway_data_formatter;

    private EE_Payment $payment;

    /**
     * CreateOrder constructor.
     *
     * @param PayPalApi      $api
     * @param EE_Transaction $transaction
     * @param array          $billing_info
     * @param FeatureFlags   $feature
     */
    public function __construct(PayPalApi $api, EE_Transaction $transaction, array $billing_info, FeatureFlags $feature, GatewayDataFormatter $gateway_data_formatter)
    {
        parent::__construct($api);
        $this->transaction   = $transaction;
        $this->feature       = $feature;
        $this->currency_code = CurrencyManager::currencyCode();
        $this->sanitizeRequestParameters($billing_info);
        $this->gateway_data_formatter = $gateway_data_formatter;
        $this->setPaymentPlaceholder();
    }


    /**
     * Sanitize the array of billing form data.
     *
     * @param array $billing_info
     * @return void
     */
    public function sanitizeRequestParameters(array $billing_info): void
    {
        $sanitizer = new RequestSanitizer(new Basic());
        foreach ($billing_info as $item => $value) {
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
        // Check for MISMATCH errors.
        if ($this->isMismatchError($create_response)) {
            // Mismatch, fix items.
            $order_parameters['purchase_units'][0]['items'] = $this->getSimplifiedItems();
            // Add simplified breakdown.
            $order_parameters['purchase_units'][0]['amount']['breakdown'] = $this->getSimplifiedAmountBreakdown();
            // Retry Order request.
            $create_response = $this->api->sendRequest($order_parameters, $this->request_url);
        }
        return $this->validateOrder($create_response, $order_parameters);
    }


    /**
     * Form order parameters.
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    protected function getParameters(): array
    {
        $registrant  = $this->transaction->primary_registration();
        $attendee    = $registrant->attendee();
        $event       = $registrant->event();
        $description = $this->gateway_data_formatter->formatOrderDescription($this->payment);
        $parameters  = [
            'intent'              => 'CAPTURE',
            'purchase_units'      => [
                [
                    'custom_id'   => $this->transaction->ID(),
                    'description' => substr(wp_strip_all_tags($description), 0, 125),
                    'items'       => $this->getLineItems(),
                    'amount'      => [
                        'value'         => (string) CurrencyManager::normalizeValue($this->transaction->remaining()),
                        'currency_code' => $this->currency_code,
                        'breakdown'     => $this->getBreakdown(),
                    ],
                ],
            ],
            'payment_source' => [
                'paypal' => [
                    'experience_context' => [
                        'user_action' => 'PAY_NOW',
                    ],
                    'email_address' => $attendee->email(),
                    'name'  => [
                        'given_name' => $attendee->fname(),
                        'surname' => $attendee->lname(),
                    ],
                ],
            ],
        ];

        // If we have and address on the attendee, send it to PayPal.
        if($attendee->country_ID()) {
            $parameters['payment_source']['paypal']['address'] = [
                'address_line_1'    => $attendee->address(),
                'address_line_2'    => $attendee->address2(),
                'admin_area_2'      => $attendee->city(),
                'admin_area_1'      => $attendee->state_abbrev(),
                'postal_code'       => $attendee->zip(),
                'country_code'      => $attendee->country_ID(),
            ];
        }

        // Do we have the permissions for the fees ?
        $scopes = PayPalExtraMetaManager::getPmOption(
            $this->transaction->payment_method(),
            Domain::META_KEY_AUTHORIZED_SCOPES
        );
        if (
            (
                (defined('EE_PPC_USE_PAYMENT_FEES') && EE_PPC_USE_PAYMENT_FEES)
                || (! defined('EE_PPC_USE_PAYMENT_FEES')
                    && $this->feature->allowed(FeatureFlag::USE_PAYMENT_PROCESSOR_FEES)
                )
            )
            && ! empty($scopes) && in_array('partnerfee', $scopes)
        ) {
            /** @var PartnerPaymentFees $payment_fees */
            $payment_fees = LoaderFactory::getShared(PartnerPaymentFees::class);
            $parameters['purchase_units'][0]['payment_instruction'] = [
                'platform_fees' => [
                    [
                        'amount' => [
                            'value'         => (string) $payment_fees->getPartnerFee($this->transaction),
                            'currency_code' => $this->currency_code,
                        ],
                    ],
                ]
            ];
        }
        return $parameters;
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
            if (
                $line_item instanceof EE_Line_Item
                && $line_item->OBJ_type() !== 'Promotion'
                && $line_item->quantity() > 0
            ) {
                $item_money     = CurrencyManager::normalizeValue($line_item->unit_price());
                $line_items []  = [
                    'name'        => substr(wp_strip_all_tags($this->gateway_data_formatter->formatLineItemName($line_item, $this->payment)), 0, 125),
                    'quantity'    => $line_item->quantity(),
                    'description' => substr(wp_strip_all_tags($this->gateway_data_formatter->formatLineItemDesc($line_item, $this->payment)), 0, 125),
                    'unit_amount' => [
                        'currency_code' => $this->currency_code,
                        'value'         => (string) $item_money,
                    ],
                    'category'    => 'DIGITAL_GOODS',
                ];
                // Line item total.
                $this->items_total += $line_item->pretaxTotal();
            } elseif ($line_item->OBJ_type() === 'Promotion' && $line_item->quantity() > 0) {
                // Promotions total.
                $this->promos_total += $line_item->total();
            }
        }
        // Make sure we have an absolute number with only two decimal laces.
        $this->items_total  = CurrencyManager::normalizeValue($this->items_total);
        $this->promos_total = CurrencyManager::normalizeValue($this->promos_total);
        // If this is a partial payment, apply the paid amount as a promo.
        if ($this->transaction->paid() > 0) {
            $this->promos_total += CurrencyManager::normalizeValue($this->transaction->paid());
        }
        $this->countTaxTotal();
        return $line_items;
    }


    /**
     * Count the tax total.
     *
     * @return void
     * @throws EE_Error|ReflectionException
     */
    protected function countTaxTotal(): void
    {
        // List taxes.
        $this->tax_total = 0.0;
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
            'value'         => (string) $this->items_total,
        ];
        $breakdown['tax_total']  = [
            'currency_code' => $this->currency_code,
            'value'         => (string) $this->tax_total,
        ];
        $breakdown['discount']   = [
            'currency_code' => $this->currency_code,
            'value'         => (string) abs($this->promos_total),
        ];
        return $breakdown;
    }


    /**
     * Makes sure that we have received an Order back from the API call.
     *
     * @param $response
     * @param $parameters
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function validateOrder($response, $parameters): array
    {
        PayPalLogger::errorLog(
            esc_html__('Validating Order Create:', 'event_espresso'),
            [$this->request_url, $response],
            $this->transaction->payment_method(),
            false,
            $this->transaction
        );
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
                error_log("PayPalLogger Error: $message: " . json_encode($response));
            }
            return [
                'error'    => $response['error'] ?? 'missing_order',
                'message'  => $response['message'] ?? $message,
                'response' => $response,
            ];
        }
        return $response;
    }


    /**
     * Check if PayPals response contains 'MISMATCH' errors.
     *
     * @return bool
     */
    public function isMismatchError($response): bool
    {
        if (! isset($response['details']) || ! is_array($response['details'])) {
            return false;
        }

        foreach($response['details'] as $detail) {
            if (! empty($detail['issue'])) {
                if (
                    strtoupper($detail['issue']) === 'ITEM_TOTAL_MISMATCH'
                    || strtoupper($detail['issue']) === 'AMOUNT_MISMATCH'
            ) {
                    PayPalLogger::errorLog(
                        esc_html__('Mistmatch Error:', 'event_espresso'),
                        [$this->request_url, $response],
                        $this->transaction->payment_method(),
                        false,
                        $this->transaction
                    );
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * Itemize the simplified payment breakdown list.
     *
     * @return array
     */
    protected function getSimplifiedAmountBreakdown(): array
    {
        $tax_total = $this->transaction->tax_total();
        $breakdown['item_total'] = [
            'currency_code' => $this->currency_code,
            'value'         => (string) CurrencyManager::normalizeValue($this->transaction->remaining() - $tax_total)
        ];
        if ($tax_total > 0) {
            $breakdown['tax_total'] = [
                'currency_code' => $this->currency_code,
                'value'         => (string) CurrencyManager::normalizeValue($tax_total)
            ];
        }
        return $breakdown;
    }


    /**
     * Generate single line item for full order.
     *
     * @return array
     */
    protected function getSimplifiedItems(): array
    {
        // Simplified single line item.
        $line_items             = [];
        $primary_registrant     = $this->transaction->primary_registration();
        $event_obj              = $primary_registrant->event_obj();
        $name_and_description   = $this->gateway_data_formatter->formatOrderDescription($this->payment);
        
        $line_items[]   = [
            'name'        => substr(wp_strip_all_tags($name_and_description), 0, 125),
            'quantity'    => 1,
            'description' => substr(wp_strip_all_tags($name_and_description), 0, 2047),
            'unit_amount' => [
                'currency_code' => $this->currency_code,
                'value'         => (string) CurrencyManager::normalizeValue($this->transaction->remaining() - $this->transaction->tax_total()),
            ],
            'category'    => 'DIGITAL_GOODS',
        ];
        return $line_items;
    }

    /**
     * Generates an EE_Payment object but doesn't save it.
     */
    private function setPaymentPlaceholder(): void
    {
        $this->payment = EE_Payment::new_instance(
            [
                'STS_ID'        => EEM_Payment::status_id_pending,
                'TXN_ID'        => $this->transaction->ID(),
                'PMD_ID'        => $this->transaction->payment_method_ID(),
                'PAY_amount'    => 0.00,
                'PAY_timestamp' => time(),
            ]
        );
    }
}
