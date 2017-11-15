# New Payment Method Addon Skeleton

Ok so you're ready to build your own payment method! In order to give you a head-start, we created a addon skeleton that has  two working payment methods in it: one onsite and the other offsite. Of course neither actually communicates with a Payment Gateway, that's what you're going to do!

The skeleton addon is located in the event-espresso-core/tests/mocks/addons/new-payment-method. Currently the "tests" folder isn't included by default in order to reduce plugin size, so you'll need to get it from our [github repo](https://github.com/eventespresso/event-espresso-core).

Just copy that entire folder "new-payment-method" into your wp-content/plugins folder, and you can try activating it and start using the mock payment methods.

You probably only want one payment mehtod, so feel free to delete the unneeded one, and comment it out from the addon file EE_New_Payment_Method.class.php file.

To facilitate renaming the folder and all its classes, we recommend using the `renamer.php` located here: https://github.com/eventespresso/eea-renamer.
Instrucions on how to use it are in that repository.

Here is a video:

http://youtu.be/n74HS6GqenM

In this video we:

1. Copy the "new-payment-method" addon from plugins/event-espresso-core/tests/mocks/addons/new-payment-method into plugins
2. Activate the plugin
3. Activate the OFFsite payment method (actually it was previously activated from before the video)
4. Set the offsite payment method to use a separate IPN (ie, the "gateway" will send a separate HTTP request to the Event Espresso Transactions page, updating the payment, before the user returns to the Event Espresso Thank You page)
5. Complete a transaction using this payment method
6. View the payment logs which were created when the "IPN" was sent from this mock gateway