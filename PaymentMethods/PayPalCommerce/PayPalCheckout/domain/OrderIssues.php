<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\PayPalCheckout\domain;

/**
 * Class OrderIssues
 *
 * Holds PayPal Checkout order issue constants.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 */
class OrderIssues
{
    /**
     * Ensure the total amount equals the sum of line items, taxes, and discounts. This error can occur when sale
     * amounts aren't reflected in the API request.
     */
    public const string AMOUNT_MISMATCH = 'AMOUNT_MISMATCH';

    /**
     * Ensure the amount is positive, with no more than two decimal places.
     */
    public const string CANNOT_BE_NEGATIVE = 'CANNOT_BE_NEGATIVE';

    /**
     * Ensure the amount is a positive, non-zero number with no more than two decimal places.
     */
    public const string CANNOT_BE_ZERO_OR_NEGATIVE = 'CANNOT_BE_ZERO_OR_NEGATIVE';

    /**
     * Surface the error to the buyer and ask them to use a different card.
     */
    public const string CARD_EXPIRED = 'CARD_EXPIRED';

    /**
     * Retry with a PayPal-supported currency. Ensure the receiving PayPal account is configured to accept the currency.
     * For a list of currencies that PayPal supports, see Currency codes.
     */
    public const string CURRENCY_NOT_SUPPORTED = 'CURRENCY_NOT_SUPPORTED';

    /**
     * Round up the amount to two decimal places and retry. If issues persist, contact PayPal support and share the
     * debug_id returned in the API response.
     */
    public const string DECIMAL_PRECISION = 'DECIMAL_PRECISION';

    /**
     * Adjust the amount to match the number of decimal places the currency supports.
     */
    public const string DECIMALS_NOT_SUPPORTED = 'DECIMALS_NOT_SUPPORTED';

    /**
     * Send a different invoice_id. If you must use the same invoice_id and the error persists, contact PayPal support.
     */
    public const string DUPLICATE_INVOICE_ID = 'DUPLICATE_INVOICE_ID';

    /**
     * Ensure the parameters specified in the API request match the expected data types. Refer to field-level
     * specifications.
     */
    public const string INCOMPATIBLE_PARAMETER_VALUE = 'INCOMPATIBLE_PARAMETER_VALUE';

    /**
     * Ensure the API request JSON is syntactically correct and conforms to the PayPal API request format. If the problem
     * persists, contact PayPal support and share the debug_id returned in the API response.
     */
    public const string INVALID_PARAMETER_SYNTAX = 'INVALID_PARAMETER_SYNTAX';

    /**
     * Check the resource ID and try again. If the resource ID belongs to a different PayPal account, check the scopes and
     * permissions for the receiving account.
     */
    public const string INVALID_RESOURCE_ID = 'INVALID_RESOURCE_ID';

    /**
     * Ensure text fields aren't too long or missing required data. For expected string lengths, see the Orders API
     * documentation.
     */
    public const string INVALID_STRING_LENGTH = 'INVALID_STRING_LENGTH';

    /**
     * Ensure the item totals match the quantity total.
     */
    public const string ITEM_TOTAL_MISMATCH = 'ITEM_TOTAL_MISMATCH';

    /**
     * Ask the buyer to use a different payment method.
     */
    public const string MAX_NUMBER_OF_PAYMENT_ATTEMPTS_EXCEEDED = 'MAX_NUMBER_OF_PAYMENT_ATTEMPTS_EXCEEDED';

    /**
     * Ensure the JSON conforms to the PayPal API request format and includes all required fields. Review the API request
     * for required parameters. If the problem persists, contact PayPal support and share the debug_id returned in the API
     * response.
     */
    public const string MISSING_REQUIRED_PARAMETER = 'MISSING_REQUIRED_PARAMETER';

    /**
     * If the merchant wants to proceed with the order, call capture as the funds have been authorized. If the
     * authorization is over 3 days old, the merchant can reauthorize the funds before capturing.
     */
    public const string ORDER_ALREADY_AUTHORIZED = 'ORDER_ALREADY_AUTHORIZED';

    /**
     * No further action is needed. Make a GET call on the order ID to get the capture ID, or the PayPal transaction ID.
     * If this is a multi-capture, split shipment use case, move to intent=AUTHORIZE as authorizations support multiple
     * captures.
     */
    public const string ORDER_ALREADY_CAPTURED = 'ORDER_ALREADY_CAPTURED';

    /**
     * The buyer must go through PayPal checkout again to approve the order. Redirect the buyer to the 'rel':'approve'
     * URL returned as part of the HATEOAS links within the create order call, or provide a valid payment_source in the
     * request.
     */
    public const string ORDER_NOT_APPROVED = 'ORDER_NOT_APPROVED';

    /**
     * Contact PayPal customer support to lift restrictions on the receiving account. If you're a marketplace sending
     * funds to a seller, reach out to the seller to resolve restrictions with PayPal.
     */
    public const string PAYEE_ACCOUNT_RESTRICTED = 'PAYEE_ACCOUNT_RESTRICTED';

    /**
     * Ensure the caller API account has consent to collect partner fees for the payee. Make sure to add PARTNER_FEE to
     * the list of capabilities when taking the payee through the signup flow. If PARTNER_FEE is already added or if
     * errors persist, contact PayPal support.
     */
    public const string PAYEE_NOT_CONSENTED = 'PAYEE_NOT_CONSENTED';

    /**
     * Contact PayPal support to check the merchant or payee accouunt configuration.
     */
    public const string PAYEE_NOT_ENABLED_FOR_CARD_PROCESSING = 'PAYEE_NOT_ENABLED_FOR_CARD_PROCESSING';

    /**
     * Redirect the buyer to the 'rel':'payer-action' HATEOAS link returned as part of the response before authorizing or
     * capturing the order. Some payment methods require a webhook subscription to inform you of asynchronous buyer
     * actions before the capture succeeds.
     */
    public const string PAYER_ACTION_REQUIRED = 'PAYER_ACTION_REQUIRED';

    /**
     * Check if the resource ID belongs to the PayPal account making the API call. If the ID belongs to a different
     * account, ensure you've granted permissions and scopes to access the other account's resources.
     */
    public const string PERMISSION_DENIED = 'PERMISSION_DENIED';

    /**
     * Add a postal code to the request and retry.
     */
    public const string POSTAL_CODE_REQUIRED = 'POSTAL_CODE_REQUIRED';

    /**
     * Redirect the buyer to choose a different payment method. Within PayPal, the buyer can add a different payment
     * method to their wallet, or use a different card.
     */
    public const string REDIRECT_PAYER_FOR_ALTERNATE_FUNDING = 'REDIRECT_PAYER_FOR_ALTERNATE_FUNDING';

    /**
     * Contact the buyer to request updated card information, otherwise future attempts will fail.
     */
    public const string REFERENCED_CARD_EXPIRED = 'REFERENCED_CARD_EXPIRED';

    /**
     * Fix the shipping address and retry. If using saved payment details, contact the buyer to provide the correct
     * shipping address.
     */
    public const string SHIPPING_ADDRESS_INVALID = 'SHIPPING_ADDRESS_INVALID';

    /**
     * Validate if the payment token passed is correct. If the merchant PayPal account is making API calls on behalf of a
     * different PayPal account, ensure the recipient account grants permissions to the account making the API call.
     */
    public const string TOKEN_ID_NOT_FOUND = 'TOKEN_ID_NOT_FOUND';

    /**
     * Reach out to PayPal support with the debug_id or correlation_id from the response header, or for legacy
     * integrations, in the body or response parameters.
     */
    public const string UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY';

    /**
     * Inform the buyer that the card number entered is incorrect and request them to input the correct number.
     */
    public const string VALIDATION_ERROR = 'VALIDATION_ERROR';
}
