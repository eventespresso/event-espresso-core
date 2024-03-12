<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\orders;

use EE_Error;
use EE_Line_Item;
use EE_Transaction;
use EventEspresso\core\domain\services\validation\email\strategies\Basic;
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
    public function sanitizeRequestParameters(array $billing_info): void
    {
        $email_validator = new Basic();
        $sanitizer       = new RequestSanitizer($email_validator);
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
        $attendee    = $registrant->attendee();
        $event       = $registrant->event();
        $description = $event->name() ?: sprintf(
            esc_html__('Tickets for an event at %1$s', 'event_espresso'),
            get_bloginfo('name')
        );
        return [
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
                'email_address' => $attendee->email(),
                'name'          => [
                    'given_name' => $attendee->fname(),
                    'surname'    => $attendee->lname(),

                ],
            ],
        ];
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
    protected function countTaxTotal(): void
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
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function validateOrder($response, $parameters): array
    {
        $message = esc_html__('Validating Order Create:', 'event_espresso');
        PayPalLogger::errorLog($message, [$this->request_url, $response], $this->transaction->payment_method());
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
