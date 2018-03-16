# Registering Addons

Registering addons is a way of informing Event Espresso core addon exists and is a shortcut to adding hooks and filters.  This allows Event Espresso core to take care of much of the boilerplate tasks like detecting plugin activation, upgrade, or reactivation; registering or de-registering components; and in the future many other tasks.

When developing an addon, it's best to start from the sample "New_Addon" contained in `event-espresso-core/tests/mocks/addons/new-addon`. This is a fully operating addon that is ready to be placed 
in your wp-content/plugins directory and used. It adds a sample admin page, widget, shortcode, model, data migration script, unit tests, etc. You can use the renamer scripts, located in 
https://github.com/eventespresso/eea-renamer, to quickly rename the plugin according to your needs (it does an intelligent search-and-replace. Please refer to event-espresso-core/core/libraries/plugin_api/EE_Register_Addon.lib.php for the list of arguments you can supply to `EE_Register_Addon::register()`.

You can [view the latest contents of the new-addon registering using this api here](https://github.com/eventespresso/event-espresso-core/blob/master/tests/mocks/addons/eea-new-addon/EE_New_Addon.class.php)
