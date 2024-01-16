<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\payment_methods\gateways\GatewayDataFormatterInterface;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\formatters\FormatterInterface;

/**
 * EE_Gateway
 * Abstract base class for all gateways for processing payments.
 * This has been designed in a way so that other WP Plugins
 * can use this class for processing payments, and theoretically any of its children,
 * provided they implement the interfaces it uses.
 * The necessary interfaces to be implemented are found in:
 *  /core/interfaces/payments/  and  /core/interfaces/
 * After constructing a gateway object, you need to set all the properties which reference many of the
 * needed helpers and models (see all the methods starting with "set_",
 * eg seg_line_item_helper which should be passed an object which implements EEHI_Line_Item_Helper; etc).
 *
 * @package            Event Espresso
 * @subpackage         core/libraries/payment_methods
 * @author             Mike Nelson
 */
abstract class EE_Gateway
{
    /**
     * a constant used as a possible value for $_currencies_supported to indicate
     * that ALL currencies are supported by this gateway
     */
    const all_currencies_supported = 'all_currencies_supported';

    /**
     * Where values are 3-letter currency codes
     *
     * @var array|string
     */
    protected $_currencies_supported = [];

    /**
     * Whether this gateway can support SENDING a refund request (ie, initiated by
     * admin in EE's wp-admin page)
     *
     * @var boolean
     */
    protected bool $_supports_sending_refunds = false;

    /**
     * Whether this gateway can support RECEIVING a refund request from the payment
     * provider (ie, initiated by admin on the payment prover's website who sends an IPN to EE)
     *
     * @var boolean
     */
    protected bool $_supports_receiving_refunds = false;

    /**
     * Model for querying for existing payments
     *
     * @var EEMI_Payment|null
     */
    protected ?EEMI_Payment $_pay_model = null;

    /**
     * Model used for adding to the payments log
     *
     * @var EEM_Change_Log|null
     */
    protected ?EEM_Change_Log $_pay_log = null;

    /**
     * Used for formatting some input to gateways
     *
     * @var EEH_Template|null
     */
    protected ?EEH_Template $_template = null;

    /**
     * Concrete class that implements EEHI_Money, used by most gateways
     *
     * @var EEH_Money|null
     */
    protected ?EEH_Money $_money = null;

    /**
     * Concrete class that implements EEH_Line_Item, used for manipulating the line item tree
     *
     * @var EEH_Line_Item|null
     */
    protected ?EEH_Line_Item $_line_item = null;

    protected ?GatewayDataFormatterInterface $_gateway_data_formatter = null;

    protected ?FormatterInterface $_unsupported_character_remover = null;

    /**
     * The ID of the payment method using this gateway
     *
     * @var int
     */
    protected int $_ID = 0;

    /**
     * @var $_debug_mode boolean whether to send requests to teh sandbox site or not
     */
    protected bool $_debug_mode = false;

    /**
     * @var string $_name name to show for this payment method
     */
    protected string $_name = '';

    /**
     * @var string name to show for this payment method to admin-type users
     */
    protected string $_admin_name = '';

    protected array $settings = [];




    /**
     * We don't want to serialize models as they often have circular structures
     * (eg a payment model has a reference to each payment model object; and most
     * payments have a transaction, most transactions have a payment method;
     * most payment methods have a payment method type; most payment method types
     * have a gateway. And if a gateway serializes its models, we start at the
     * beginning again)
     *
     * @return array
     */
    public function __sleep()
    {
        $properties = get_object_vars($this);
        unset($properties['_pay_model'], $properties['_pay_log']);
        return array_keys($properties);
    }


    /**
     * Returns whether this gateway should support SENDING refunds
     * see $_supports_sending_refunds
     *
     * @return bool
     */
    public function supports_sending_refunds(): bool
    {
        return $this->_supports_sending_refunds;
    }


    /**
     * Returns whether this gateway should support RECEIVING refunds
     * see $_supports_receiving_refunds
     *
     * @return bool
     */
    public function supports_receiving_refunds(): bool
    {
        return $this->_supports_receiving_refunds;
    }


    /**
     * Tries to refund the payment specified, taking into account the extra
     * refund info. Note that if the gateway's _supports_sending_refunds is false,
     * this should just throw an exception.
     *
     * @param EE_Payment|null $payment
     * @param array|null      $refund_info
     * @return EE_Payment|null
     */
    public function do_direct_refund(?EE_Payment $payment, ?array $refund_info = null): ?EE_Payment
    {
        return null;
    }


    /**
     * Sets the payment method's settings so the gateway knows where to send the request
     * etc
     *
     * @param array $settings_array
     */
    public function set_settings(array $settings_array)
    {
        foreach ($settings_array as $name => $value) {
            // preface property name with underscore
            $property_name          = strpos($name, '_') !== 0
                ? '_' . $name
                : $name;
            if (property_exists($this, $property_name)) {
                $this->{$property_name} = $value;
            } else {
                $this->settings[ $property_name ] = $value;
            }
        }
    }


    public function __get($property_name)
    {
        if (property_exists($this, $property_name)) {
            return $this->{$property_name};
        }
        return $this->settings[ $property_name ] ?? null;
    }


    /**
     * See this class description
     *
     * @param EEM_Payment $payment_model
     */
    public function set_payment_model(EEM_Payment $payment_model)
    {
        $this->_pay_model = $payment_model;
    }


    /**
     * See this class description
     *
     * @param EEM_Change_Log $payment_log_model
     */
    public function set_payment_log(EEM_Change_Log $payment_log_model)
    {
        $this->_pay_log = $payment_log_model;
    }


    /**
     * See this class description
     *
     * @param EEH_Template $template_helper
     */
    public function set_template_helper(EEH_Template $template_helper)
    {
        $this->_template = $template_helper;
    }


    /**
     * See this class description
     *
     * @param EEH_Line_Item $line_item_helper
     */
    public function set_line_item_helper(EEH_Line_Item $line_item_helper)
    {
        $this->_line_item = $line_item_helper;
    }


    /**
     * See this class description
     *
     * @param EEH_Money $money_helper
     */
    public function set_money_helper(EEH_Money $money_helper)
    {
        $this->_money = $money_helper;
    }


    /**
     * Sets the gateway data formatter helper
     *
     * @param GatewayDataFormatterInterface|null $gateway_data_formatter
     * @throws InvalidEntityException if it's not set properly
     */
    public function set_gateway_data_formatter(?GatewayDataFormatterInterface $gateway_data_formatter)
    {
        if (! $gateway_data_formatter instanceof GatewayDataFormatterInterface) {
            throw new InvalidEntityException(
                is_object($gateway_data_formatter)
                    ? get_class($gateway_data_formatter)
                    : esc_html__('Not an object', 'event_espresso'),
                '\\EventEspresso\\core\\services\\payment_methods\\gateways\\GatewayDataFormatterInterface'
            );
        }
        $this->_gateway_data_formatter = $gateway_data_formatter;
    }


    /**
     * Gets the gateway data formatter
     *
     * @return GatewayDataFormatterInterface
     * @throws InvalidEntityException if it's not set properly
     */
    protected function _get_gateway_formatter(): GatewayDataFormatterInterface
    {
        if (! $this->_gateway_data_formatter instanceof GatewayDataFormatterInterface) {
            throw new InvalidEntityException(
                is_object($this->_gateway_data_formatter)
                    ? get_class($this->_gateway_data_formatter)
                    : esc_html__('Not an object', 'event_espresso'),
                '\\EventEspresso\\core\\services\\payment_methods\\gateways\\GatewayDataFormatterInterface'
            );
        }
        return $this->_gateway_data_formatter;
    }


    /**
     * Sets the helper which will remove unsupported characters for most gateways
     *
     * @param FormatterInterface|null $formatter
     * @return void
     * @throws InvalidEntityException
     */
    public function set_unsupported_character_remover(?FormatterInterface $formatter)
    {
        if (! $formatter instanceof FormatterInterface) {
            throw new InvalidEntityException(
                is_object($formatter)
                    ? get_class($formatter)
                    : esc_html__('Not an object', 'event_espresso'),
                '\\EventEspresso\\core\\services\\formatters\\FormatterInterface'
            );
        }
        $this->_unsupported_character_remover = $formatter;
    }


    /**
     * Gets the helper which removes characters which gateways might not support, like emojis etc.
     *
     * @return FormatterInterface
     * @throws InvalidEntityException
     */
    protected function _get_unsupported_character_remover(): FormatterInterface
    {
        if (! $this->_unsupported_character_remover instanceof FormatterInterface) {
            throw new InvalidEntityException(
                is_object($this->_unsupported_character_remover)
                    ? get_class($this->_unsupported_character_remover)
                    : esc_html__('Not an object', 'event_espresso'),
                '\\EventEspresso\\core\\services\\formatters\\FormatterInterface'
            );
        }
        return $this->_unsupported_character_remover;
    }


    /**
     * @param array|string      $message
     * @param mixed             $object_logged
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function log($message, $object_logged)
    {
        if ($object_logged instanceof EE_Payment) {
            $type = 'Payment';
            $id   = $object_logged->ID();
        } elseif ($object_logged instanceof EE_Transaction) {
            $type = 'Transaction';
            $id   = $object_logged->ID();
        } else {
            $type = 'Payment_Method';
            $id   = $this->_ID;
        }
        // only log if we're going to store it for longer than the minimum time
        $reg_config = LoaderFactory::getLoader()->load('EE_Registration_Config');
        if ($reg_config->gateway_log_lifespan !== '1 second') {
            $this->_pay_log->gateway_log($message, $id, $type);
        }
    }


    /**
     * Formats the amount so it can generally be sent to gateways
     *
     * @param float $amount
     * @return string
     * @deprecated since 4.9.31 insetad use
     *             EventEspresso\core\services\payment_methods\gateways\GatewayDataFormatter::format_currency()
     */
    public function format_currency(float $amount): string
    {
        return $this->_get_gateway_formatter()->formatCurrency($amount);
    }


    /**
     * Returns either an array of all the currency codes supported,
     * or a string indicating they are all supported (EE_gateway::all_currencies_supported)
     *
     * @return array|string
     */
    public function currencies_supported()
    {
        return $this->_currencies_supported;
    }


    /**
     * Returns what a simple summing of items and taxes for this transaction. This
     * can be used to determine if some more complex line items, like promotions,
     * surcharges, or cancellations occurred (in which case we might want to forget
     * about creating an itemized list of purchases and instead only send the total due)
     *
     * @param EE_Transaction $transaction
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _sum_items_and_taxes(EE_Transaction $transaction)
    {
        $total_line_item = $transaction->total_line_item();
        $total           = 0;
        foreach ($total_line_item->get_items() as $item_line_item) {
            $total += max($item_line_item->total(), 0);
        }
        foreach ($total_line_item->tax_descendants() as $tax_line_item) {
            $total += max($tax_line_item->total(), 0);
        }
        return $total;
    }


    /**
     * Determines whether we can easily itemize the transaction using only
     * items and taxes (ie, no promotions or surcharges or cancellations needed)
     *
     * @param EE_Payment $payment
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _can_easily_itemize_transaction_for(EE_Payment $payment): bool
    {
        return $this->_money->compare_floats(
            $this->_sum_items_and_taxes($payment->transaction()),
            $payment->transaction()->total()
        )
               && $this->_money->compare_floats(
                   $payment->amount(),
                   $payment->transaction()->total()
               );
    }


    /**
     * Handles updating the transaction and any other related data based on the payment.
     * You may be tempted to do this as part of do_direct_payment or handle_payment_update,
     * but doing so on those functions might be too early. It's possible that the changes
     * you make to teh transaction or registration or line items may just get overwritten
     * at that point. Instead, you should store any info you need on the payment during those
     * functions, and use that information at this step, which client code will decide
     * for you when it should be called.
     *
     * @param EE_Payment $payment
     * @return void
     */
    public function update_txn_based_on_payment($payment)
    {
        // maybe update the transaction or line items or registrations
        // but most gateways don't need to do this, because they only update the payment
    }


    /**
     * Gets the first event for this payment (it's possible that it could be for multiple)
     *
     * @param EE_Payment $payment
     * @return EE_Event|null
     * @deprecated since 4.9.31 instead use EE_Payment::get_first_event()
     */
    protected function _get_first_event_for_payment(EE_Payment $payment): ?EE_Event
    {
        return $payment->get_first_event();
    }


    /**
     * Gets the name of the first event for which is being paid
     *
     * @param EE_Payment $payment
     * @return string
     * @deprecated since 4.9.31 instead use EE_Payment::get_first_event_name()
     */
    protected function _get_first_event_name_for_payment(EE_Payment $payment): string
    {
        return $payment->get_first_event_name();
    }


    /**
     * Gets the text to use for a gateway's line item name when this is a partial payment
     *
     * @param EE_Payment $payment
     * @return string
     * @deprecated since 4.9.31 instead use $this->_get_gateway_formatter()->formatPartialPaymentLineItemName($payment)
     */
    protected function _format_partial_payment_line_item_name(EE_Payment $payment): string
    {
        return $this->_get_gateway_formatter()->formatPartialPaymentLineItemName($payment);
    }


    /**
     * Gets the text to use for a gateway's line item description when this is a partial payment
     *
     * @param EE_Payment $payment
     * @return string
     * @deprecated since 4.9.31 instead use $this->_get_gateway_formatter()->formatPartialPaymentLineItemDesc()
     */
    protected function _format_partial_payment_line_item_desc(EE_Payment $payment): string
    {
        return $this->_get_gateway_formatter()->formatPartialPaymentLineItemDesc($payment);
    }


    /**
     * Gets the name to use for a line item when sending line items to the gateway
     *
     * @param EE_Line_Item $line_item
     * @param EE_Payment   $payment
     * @return string
     * @deprecated since 4.9.31 instead use $this->_get_gateway_formatter()->formatLineItemName($line_item,$payment)
     */
    protected function _format_line_item_name(EE_Line_Item $line_item, EE_Payment $payment): string
    {
        return $this->_get_gateway_formatter()->formatLineItemName($line_item, $payment);
    }


    /**
     * Gets the description to use for a line item when sending line items to the gateway
     *
     * @param EE_Line_Item $line_item
     * @param EE_Payment   $payment
     * @return string
     * @deprecated since 4.9.31 instead use $this->_get_gateway_formatter()->formatLineItemDesc($line_item, $payment))
     */
    protected function _format_line_item_desc(EE_Line_Item $line_item, EE_Payment $payment): string
    {
        return $this->_get_gateway_formatter()->formatLineItemDesc($line_item, $payment);
    }


    /**
     * Gets the order description that should generlly be sent to gateways
     *
     * @param EE_Payment $payment
     * @return string
     * @deprecated since 4.9.31 instead use $this->_get_gateway_formatter()->formatOrderDescription($payment)
     */
    protected function _format_order_description(EE_Payment $payment): string
    {
        return $this->_get_gateway_formatter()->formatOrderDescription($payment);
    }


    /**
     * @return bool
     */
    public function isInSandboxMode(): bool
    {
        return $this->_debug_mode;
    }
}
