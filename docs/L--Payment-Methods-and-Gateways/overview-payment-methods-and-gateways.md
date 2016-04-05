# Overview of Payment Methods and Gateways in Event Espresso 4

## Introduction

In Event Espresso, payment methods are PHP classes and associated files that take care of accepting payments from customers. They  define a form for its settings, possibly a form for billing information which can be displayed during Single Page Checkout, and possibly a gateway class which takes care of communicating with a payment gateway (eg Paypal.com) to actually transfer funds from the customer to you. They fall into 3 general categories:

* ONSITE (where the customer enters their billing info directly on your site, and your site transfers billing data to the payment gateway directly),
* OFFSITE ( where the customer is redirected to the payment gateway, enters their billing info, and then returns to your site afterwards), and
* OFFLINE (where payment is marked to occur offline without a separate payment gateway).

Payment methods are more narrow in scope than EE Modules, and are generally placed in an EE Addon. If you are building your own Payment Method as an addon, please feel free to use our sample "New Payment Method" Addon. For details, see the [Using the New Payment Method Addon Skeleton](../D--Addon-API/using-new-payment-method-addon-skeleton.md) documentation.

## Definitions

* Payment Method Type: child of EE_PMT_Base. Mostly this class takes care of interacting between the EEG_Gateway class and the rest of Event Espresso. It defines a settings form and possibly a billing form.
* Payment Method: an instance of EE_Payment_Method, which has an associated Payment Method Type on its `type_obj` property. There is usually only one payment method for each type, but addons may change that in the future.
* Gateway Class: a child of either EEG_Onsite_Gateway or EEG_Offsite_Gateway. EEG_Onsite_Gateway takes care of sending payment information directly to the payment gateway server. EEG_Offsite_Gateway takes care of setting up a form submission data, and then handling payment a payment update received later either via IPN (Instant Payment Notification) or when the customer returns from the offsite payment gateway.
* Payment Gateway: a separate server which takes care of transfering funds from the customer to you. Eg, Paypal.com, Authorize.net, Mijireh.com, etc.

## Example Payment Processing Flow

To give you a better overall idea, here's the general execution flow when making payment using Paypal Pro, an ONsite payment method:

1. The customer arrives at the payment step of checkout. They select Paypal Pro and fill their billing information into the form that appears
2. An AJAX request to Single Page Checkout controller, in which the payment method with slug "paypal-pro" was selected.
3. An incomplete payment object is created and passed to the Paypal Pro payment method
4. Paypal Pro passes the payment object to its Payment Method Type object for processing the payment
5. The Payment Method Type object loads its Gateway object and passes the payment object to it
6. The Gateway object uses the payment's information and payment method's settings to communicate with the Payment Gateway (paypal.com) and charge the customer's credit card and send those funds onto your paypal account
7. Assuming payment was successful, the Gateway object updates the payment object as "approved" and passes it back to Single Page Checkout
8. Single Page Checkout shows the customer payment was approved and finalizes their transaction

And here's the general execution flow of Paypal Standard, an OFFsite payment method:

1. The customer arrives at the payment step of checkout. They select Paypal Standard
2. An AJAX request to Single Page Checkout controller, in which the payment method with slug "paypal-standard" was selected.
3. A payment is created and passed to the Paypal Standard payment method
4. Paypal Standard passes the payment to its Payment Method Type object for setting redirection information on the payment
5. The Payment Method Type object loads its Gateway object and passes the payment to it
6. The gateway class uses the payment's information and payment method's settings to set the redirection information on the payment
7. The payment is passed back to Single Page Checkout, and it returns the HTML for a form which will be rendered on the page and will cause the user to be redirected to Paypal
8. The user makes payment on Paypal.com
9. When the user has completed payment, they return to Single Page Checkout briefly with data regarding the payment in the $_POST data
10. Paypal Standard is loaded again to update the payment information, which calls its Payment Method Type object, which calls its Gateway object to handle the payment update based on the $_POST information
11. The payment object is returned to Single Page Checkout, where it shows the customer payment was approved and finalizes the transaction

And lastly the general execution flow of Invoice, an OFFLINE payment method:

1. The customer arrives at the payment step of checkout. They select Invoice
2. An AJAX request to Single Page Checkout controller, in which the payment method with slug "invoice" was selected.
3. An incomplete payment object is created and passed to the Invoice payment method
4. Invoice passes the payment object to its Payment Method Type object for processing the payment
5. The Payment Method Type object has no gateway, so it leaves the payment as-is and returns it all the way to Single Page Checkout
6. Single Page Checkout shows the customer payment is still pending and finalizes their transaction