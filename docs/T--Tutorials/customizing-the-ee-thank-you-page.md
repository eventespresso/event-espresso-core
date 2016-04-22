# Customizing the Event Espresso Thank You Page

The Event Espresso Thank You Page is a dynamically generated page that is created upon activation and should contain the `[ESPRESSO_THANK_YOU]` shortcode within it's text content. Because it is just a regular WordPress page that utilizes a shortcode, additional text content, including other shortcodes, can easily be added to the page in exactly the same way you would edit any other WordPress page. This make it easy to add additional notes or instructions that you wish people to see after they complete their registrations.

## Adding Code

For customizations that include the need to run PHP code, it's best to make use of the WordPress hook system to inject and/or change how things display or function. Callbacks for your hooks can be located in the currently active theme's functions.php file, or by creating a custom plugin for the sole purpose of adding additional functionality to Event Espresso.

The Thank You Page's template file contains the following hooks:

### Filters:

* `FHEE__payment_overview_template__no_payments_made`
* `FHEE__payment_overview_template__no_payment_required`
* `FHEE__thank_you_page_overview_template__order_conf_desc`
* `FHEE__thank_you_page_overview_template__order_conf_button_text`

### Actions:

* `AHEE__thank_you_page_overview_template__top`
* `AHEE__thank_you_page_overview_template__content`
* `AHEE__thank_you_page_overview_template__bottom`
* `AHEE__thank_you_page_payment_details_template__after_heading`
* `AHEE__thank_you_page_payment_details_template__no_payments_made`
* `AHEE__thank_you_page_payment_details_template__after_gateway_content`
* `AHEE__thank_you_page_payment_details_template__after_payment_details`
* `AHEE__thank_you_page_payment_details_template__after_each_payment`
* `AHEE__thank_you_page_registration_details_template__after_heading`
* `AHEE__thank_you_page_transaction_details_template__after_transaction_table_row`
* `AHEE__thank_you_page_transaction_details_template__after_transaction_details`

It is best to inject additional content into the page via the action hook.

> If you would like additional hooks added to the Event Espresso codebase, then you can submit a pull request to the [Event Espresso Core GitHub repository](https://github.com/eventespresso/event-espresso-core). Pull requests can be made showing us exactly where you want the hooks to be, and  if approved and after any potential changes have been solidified, you can feel secure in using those hooks in your projects knowing that they will be implemented in an upcoming version of Event Espresso.

## Getting the Transaction Data

If your code requires information regarding a specific Transaction (the initial exchange of tickets/registrations for payment (even if no actual payment was required ie: a free event), including all of the Registrations that were made under that Transaction, then the first thing you will need to do is load the Transaction model. This can be done simply via the EE_Registry:

```php
EE_Registry::instance()->load_model( 'Transaction' );
```

> Please note that in order to access Event Espresso core functionality, you should not run any code until at least the WordPress "init" hookpoint.

After you have loaded the Transaction model, you will need to run the `get_transaction_from_reg_url_link()` model method, which will return an instance of the EE_Transaction object on success or NULL if the requested Transaction was not found. This can be chained to the above model loading code, so that everything can be done in one single line of code like this:

```php
$transaction = EE_Registry::instance()->load_model( 'Transaction' )->get_transaction_from_reg_url_link();
```

Before running any further code, it is always wise to verify that the returned object is what you expect:

```php
if ( ! $transaction instanceof EE_Transaction ) {
	// error message ?
	exit();
}
```

Then to retrieve an array of the registrations associated with that transaction, simply call the registrations() method on it.

```php
$registrations = $transaction->registrations();
```

If while looping through that array you wish to filter it for ONLY the specific registrant visiting the Thank You Page, you can wrap your output with something like the following conditional :

```php
if ( $_REQUEST['e_reg_url_link'] == $registration->reg_url_link() ) {
    // output code
}
```

## Using Kint Debugging

The development version of Event Espresso, that includes the tests folder for unit testing, has the debugging tool [Kint](http://raveren.github.io/kint/) built into it. It is automagically added if WP_DEBUG is enabled in your wp-config.php file. If you are using the production version of Event Espresso, with the tests folder removed, you can install Kint using the [Kint WordPress plugin](https://wordpress.org/plugins/kint-debugger/).

For a great view of the EE_Transaction object including ALL of it's available properties and methods, simply add the following anywhere in your code (but be sure to remove before moving any code to production):

```php
d($transaction);
```