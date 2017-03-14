# Gateway Classes

Besides the constructor and those two methods, there is nothing else you need to implement to make an offline payment method. However you'll probably want to make a gateway class to communicate with the Payment Gateway and actually transfer funds.

| Property Name | Description |
| ------------- | ----------- |
`_currencies_supported` | An array of 3-letter currency codes defining all the currencies this gateway supports. If the gateway supports ALL currencies, instead assign this to be the class constant EE_Gateway::all_currencies_supported
`_supports_sending_refunds` | Boolean value indicating whether or not this gateway can SEND refund requests. If so, it should implement override the method "do_direct_refund"
`_supports_receiving_refunds` | Boolean indicating whether or not this gateway can RECEIVE refund requests via Instant Payment Notifications from the payment processing site.

> Note: for each of the "extra_meta_inputs" defined in your payment method's settings form, you should add a property to the gateway class with the same name, prefixed with an underscore. These properties will automatically have the values of those "extra_meta_inputs" put on them. Eg, if your form defined an "extra_meta_input" of "account_num", you should add a property onto your gateway class entitled `protected $_account_num;`

## EE_Onsite_Gateway

These are gateway classes that usually have a billing form that customers fill out onsite, which the gateway class receives and then communicates with the Payment Gateway directly to process the payment. It only has one abstract method to be implemented:

### `do_direct_payment`

```php
do_direct_payment( $payment, $billing_info = null )
```

This method is called automatically when processing a payment using the payment method corresponding to this gateway object.

This method needs to somehow send a request to the Payment Gateway to charge the customer. The `$payment` is an `EE_Payment` which is the amount requested to be paid, and can be used to access the transaction and registrations and line items of the payment, if you need to access them ([you may want to freshen up about using model objects](../G--Model-System/using-ee4-model-objects.md), and the $billing_info is either NULL or an array, where keys are the billing form input names, and their values are their "pretty" values (ie, the state and country names instead of their IDs or codes). This method should only update the payment, but doesn't need to save it (that's handled by other boiler-plate code). When communicating with the Payment Gateway, it's recommended to use Wordpress' `wp_remote_request` ([read more](http://codex.wordpress.org/Function_Reference/wp_remote_request)) instead of CURL or any other library because it is more widely supported by shared servers.

Usually, this method should update the payment. See "Updating Payments from EE_Gateway" below.

It's also a good idea to use `EE_Gateway::log()` to record the information you're sending to the gateway and the response you get back; but make sure you're not logging any sensitive data (eg, remove credit card numbers from the data you're logging).

## EE_Offsite_Gateway

These gateways need to set up information about how to redirect the customer to the Payment Gateway, and then they need to handle a payment update when the customer returns from the Payment Gateway or when an Instant Payment Notification (IPN) in received in a separate request.

### `set_redirection_info`

```php
set_redirection_info( $payment, $billing_info = array(), $return_url = NULL, $notify_url = NULL, $cancel_url = NULL)
```

This method sets the needed data to redirect the user to the Payment Gateway. It should update the `$payment` which is passed to it (which is an instance of `EE_Payment`) with this info. Specifically, it should set the URL the customer should be sent to by using `EE_Payment::set_redirect_url()` (which sets the field `PAY_redirect_url`)), and it should send an array of key-value pairs for all the inputs in the redirection form using `EE_Payment::set_redirect_args()` (which sets the `PAY_redirect_args` field).

To do this, it will probably want to make use of the `EE_Payment::amount()` to set the amount, and other related data.

In the case the payment method type defined a billing form, the `$billing_info` will be populated with an array of key-value pairs, where the keys were the form input names, and the values are their "pretty" values (ie, values that could be displayed to the customer, not IDs etc).

The `$return_url` is the URL the customer should be sent back to after payment which you may need to pass to the Payment Gateway.

The `$notify_url` is the URL IPNs should be sent to which you may need to pass to the Payment Gateway.

The `$cancel_url` is the URL the customer should be sent to if they decide to cancel their purchase after they arrive at the Payment Gateway.

Note about the payment's status: the `$payment` passed into this method will initially have a failed status ("PFL"). This is on purpose, in case somehow the request dies
before completion, in which case the failed status is accurate. Currently, before redirecting the user to `PAY_redirect_url`, the payment is updated to the pending status ("PPN"). 

So during this method you don't need to worry about changing the payment's status from failed to pending, as that will be taken care of for you elsewhere. You only need to set the payment's `PAY_redirect_url` and `PAY_redirect_args`.

Note about the `txn_id_chq_nmbr`: most gateways let you either set a unique string identifying the transaction currently taking place between your code and the gateway. Some will instead assign a unique string to it automatically and inform you of it. Either way, you should put that unique string into the payment's `PAY_txn_id_chq_nmbr`. It will be useful later on when you need to identify the payment based on data from the gateway. 
You can use `$payment->set_txn_id_chq_nmbr()` method for this.

### `handle_payment_update`

```php
handle_payment_update($update_info, $transaction)
```

There are two kinds of Offsite Payment Gateways: those that send an IPN in a separate request sent to the EE transactions page, and those that only send the IPN data when the user returns from the Payment Gateway. In the former case  (that the Payment Gateway sends a separate IPN request, like Paypal Standard), you must set `$this->_uses_separate_IPN_request=true;` in your Gateway Class' constructor. This will indicate that payment is to be processed from this IPN, and NOT when the user returns to Event Espresso (which is otherwise the default) in order to avoid processing the payment twice.

The method `handle_payment_update()` is called when an IPN is received, depending on whether your Gateway Class is set to receive IPN data in a separate request to the EE transactions page, or to receive IPN data when the user returns from the Payment Gateway. If your Gateway Class receives IPN data in a separate request, make sure to take `$notify_url`  as was provided in `set_redirection_info` and pass it to the Payment Gateway (via whatever method they provide), and that the Payment Gateway actually sends IPN to that URL (use the payment method logs to see exactly what requests are being received). If, however, the Gateway Class receives IPN data when the user returns from the Payment Gateway, this will be called automatically on the first request back to EE.

The `$update_info` is usually just the $_POST data sent with the request, and the `$transaction` is `EE_Transaction` that the payment update applies to.  The method is NOT passed a `$payment` because the code that calls this method can't deduce that.

Generally this method will need to:

1. Ascertain exactly which payment the `$update_info` refers to. Often the Payment Gateways will allow you to set a transaction ID on the payment info sent to them during `set_redirection_info()`, which can then be used in this method to identify the payment. Otherwise, it's often safe to assume the IPN is for the most recent payment on the `$transaction`, which can be retrieved using `EE_Transaction::last_payment()`.
2. Verify the request is actually from the Payment Gateway, and that it is for the amount originally requested in `set_redirection_info()`
3. Update that payment with the info from `$update_info`. See "Updating Payments from EE_Gateway" below.
4. It should also log the update info and any other information that could be useful for debugging using `EE_Gateway::log()`
5. If the Payment Gateway sends separate IPN requests and expect a specific response, DO NOT call `exit;` from within `handle_payment_update()`: you need to pass back the `$payment` object, so that it can be saved, update the related transaction and registrations, send notifications, etc. Instead add a filter "FHEE__EES_Espresso_Txn_Page__run__exit" to exit after all the payment processing has been completed, and echo out any message you want then. See the example below:

```php
public function handle_payment_update($update_info, $transaction) {
 ...
    //find the payment for the transaction matching the $update_info
    //update payment object with $update_Info

    add_filter( 'FHEE__EES_Espresso_Txn_Page__run__exit', array( $this, 'send_ok' );
return $payment;
}
//sends back OK to paysera upon receipt of an IPN and informs the transaction page shortcode to exit
function send_ok() {
    echo "OK";
    return true;
}
```

## Gateway Classes only use Interfaces to the rest of Event Espresso

Now is a good time to mention an important concept in the gateway classes: they are meant to be modularized so that a different Wordpress plugin could use them, besides Event Espresso. In order to achieved this, inside all the children of `EE_Gateway` we need to only use interfaces, not implementations. This way, if another plugin wanted to use all the gateways of Event Espresso, they could just copy the gateway classes into their plugin, copy the interfaces used by the gateways (located in core/EEI_Interfaces.php and core/libraries/payment_methods/EEI_Payment_Method_Interfaces.php), make sure their own classes implemented those interfaces, and then they could use ALL the gateways classes used in Event Espresso. This is why you'll notice that inside the gateway classes there are references to `EEI_Payment` instead of `EE_Payment` (and the same for `EEI_Transaction`, `EEI_Registration`, etc), and instead of using `EEM_Payment` they have a method `EE_Gateway::set_payment_model()` which other non-gateway code uses to set the `EE_Gateway::_pay_model`, which property is used instead of directly using `EEM_Payment`. If your gateway uses any other classes from EE directly, instead of their interface in EEI_Interfaces.php, then your gateway is no longer as modularized and isn't as easily portable to other Wordpress plugins.

## Updating Payments from EE_Gateway

When updating an `EE_Payment` from within `EE_Onsite_Gateway::do_direct_payment()` or `EE_Offsite_gateway::handle_payment_update()`, this is the information you'll probably want to update (and how):

| Property | How to Update |
| -------- | ------------- |
payment status | Use `EE_Payment::set_status()` (set the value to either: `EE_Gateway::_pay_model->approved_status()`, `EE_Gateway::_pay_model->pending_status()`, `EE_Gateway::_pay_model->declined_status()` or `EE_Gateway::_pay_model->failed_status()` - don't use `EEM_Payment::status_*` directly, nor strings directly).
gateway response | Use `EE_Payment::set_gateway_response()` to be a human-readable string describing how the payment went (eg `__( "Payment Approved", 'event_espresso)`)
payment details | Use `EE_Payment::set_details()` to be the exact info sent to the gateway class from the Payment Processing Site. This information should only be used from within this class, if at all. It's primarily for logging.
Payment Processing Site Transaction ID (optional) | You may have sent a unique ID to the Payment Processing Site for the payment, or the Payment Processing Site may have done this automatically. That should be set on the payment object using `EE_Payment::set_txn_id_chq_nmbr()`
Extra Accounting Information (optional) | You may want to set some other string of information on the payment. You may use `EE_Payment::set_extra_accntng()` or this.
Anything Else | If you want to store any other piece of data on the payment, you may use `EE_Base_Class::add_extra_meta()` or `EE_Base_Class::update_extra_meta()` and then retrieve it with `EE_Base_Class::get_extra_meta()`. This information will be stored in the esp_extra_meta table.

Remember that the methods in `EE_Onsite_Gateway` and `EE_Offsite_Gateway` don't need to call `EE_Base_Class::save()` on the payment - that is done automatically later in the request.

## Retrieving Data Related to the Payment

Some Payment Gateways will require more information than just an amount to pay. Here is some data related to payments that you may want to fetch:

| Information | Description | Example of how to fetch given an `EE_Payment` |
| ----------- | ----------- | --------------------------------------------- |
EE_Transaction | The transaction related to the payment could also be called the "order." Registrations, Line Items, and Payments all relate directly to Transactions. The transaction's EE_Transaction::paid() and EE_Transaction::total() are methods that may be of help. | $txn = $payment->transaction();
EE_Registration(s) | Registrations record a person is registered for something on the transaction. They are useful for retrieving their related EE_Attendee, reg_code. The primary registration is especially useful, as that's the registration that typically pays (although this may change in the future) | $primary_registration= $payment->transaction()->primary_registration()
EE_Line_Items | Line items are a record of exactly what is owed, and show how the final price is arrived at. There are various types of line items, but the ones you are probably most interested in are one of the type "line-item" and "tax". | //get all the line items that represent individual purchases<br>$things_purchased = $payment->transaction()->total_line_item()->items();<br>//each tax $taxes = $payment->transaction()->total_line_item()->taxes();<br>//or if you just want the total taxes as an amount $total_taxes = $payment->transaction()->total_line_item()->get_total_tax();
currency code of payment | The currency the payment should be in. | $payment->currency_code()


## Updating Data Related to the Payment

It's possible that when payment data is received from the Payment Gateway that you will want to update more than just the payment. For example, it's possible that a Payment Gateway may have changed the amount of tax, applied a promotion, added shipping etc. This data should ONLY be updated from within `EE_Gateway::update_txn_based_on_payment()`, NOT from `EE_Onsite_Gateway::do_direct_payment()`, `EE_Offsite_Gateway::set_redirection_info()`, NOR `EE_Offsite_Gateway::handle_payment_update()` because it's possible the data may be overwritten. Because this data is normally untouched by the gateway classes, if you change it you need to make sure you call `EE_Base_Class::save()` on each model object changed.

`EE_Gateway::update_txn_based_on_payment()`is called automatically when the payment process is called after the other methods mentioned earlier, but before Event Espresso core sends out registration emails.

## Sending Itemized Data to Payment Gateways

Some Payment Gateways only want you to send a payment amount, and don't care what individual items were purchased. But some do want you to send an itemized list of purchases. Also, some support the idea of including a discount amount.

Generally, you can easily send an itemized list of purchases to the Payment Gateway when the payment is for the full amount of the transaction (ie, it's not a partial payment, in which case it's hard to say which item the payment is for), and the total of all the individual items equals the transaction total (ie, the math adds up correctly). This can be easily checked using `EE_Gateway::_can_easily_itemize_transaction_for()`: if it returns TRUE you should try sending an itemized list of purchases to the Payment Gateway; if it returns FALSE you should just send a single item for the total payment amount.

If your Payment Gateway accepts a discount amount, you should override `EE_Gateway::_sum_items_and_taxes()` (used by `EE_Gateway::_can_easily_itemize_transaction_for()`) to NOT use `max`, thus allowing negative amounts to be factored-in; and then send the difference between `EE_Gateway::_sum_items_and_taxes()` and `EE_Transaction::total()` as the discount amount.

```php
$discount_amount = $this->_sum_items_and_taxes($transaction) - $transaction->total();
```

For more details, use /payment_methods/Paypal_Standard/EEG_Paypal_Standard.gateway.php as an example.

## A Note on Character Encoding in Requests
Some gateway servers, like Authorize.net, don't use UTF-8 character encoding for their text. This means that your request data
sent to their server, which is normally sent in UTF-8, might appear garbled or invalid in their system. (This is, of course, an issue with any other servers).
Some characters are the same in all character encodings (mostly just letters commonly used in English, the ASCII characters set), but some are totally different. So
you might only notice these issues if you send accented characters (e.g., À or ü) or emojis  (e.g. 😀 or 😤).

The lazy way to fix this is to remove all non-ASCII characters. We have provided a helper for doing this to gateways.
For example, anywhere inside your gateway class, you can call 

```
$ascii_only_string = $this->_get_unsupported_character_remover()->format($utf8_string);
```

You can also use the `formatArray` method on arrays.

However, this will also remove characters that the gateway's server might be fine with too.

So preferably you need to find what character encoding the gateway's server uses for API communication. If it uses
Windows-1252, a.k.a. CP-1252, a.k.a. ISO-8859-1, you can set the gateway up to use another formatter class. The following
payment method type class does that for its gateway:

```
class EE_PMT_Example extends EE_PMT_Base{
  public function __construct($pm_instance = NULL) {
        parent::__construct($pm_instance);
        $this->_gateway->set_unsupported_character_remover(new \EventEspresso\core\services\formatters\Windows1252());
	}
  ...
}
```
Then in your gateway class, when you call `$this->_get_unsupported_character_remover()->format($utf8_string)` it will convert the incoming
string to Windows-1252 instead of ASCII.

You can of course create your own Formatter classes that convert to other formats, just make sure they implement `\EventEspresso\core\services\formatters\FormatterInterface`.
 See the files `/core/services/formatters` for examples. 
