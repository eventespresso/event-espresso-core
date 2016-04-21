# Registering a Messages Template Pack

> Before reading this document, it would be good to read the [overview of the message template pack system](overview-message-template-packs-variations.md) first.

This document outlines how to use the provided API for registering a new template pack for the messages system.  To make it easier for developers to quickly get started with new template packs, we've provided an example plugin that registers a new template pack in the `tests` folder of EE core.  You can access this via our [github repo](https://github.com/eventespresso/event-espresso-core).  I'll be referencing this plugin throughout this documentation in the examples.  [Link to the sample add-on](https://github.com/eventespresso/event-espresso-core/tree/master/tests/mocks/addons/new-messages-template-pack)

## Step One:  Setup the Template Pack class

All template packs have their configuration setup by a template pack class which inherits the parent `EE_Messages_Template_Pack` which does most of the heavy lifting.  If you are not familiar with OOP principles in PHP programming (i.e. you're more of a front-end developer), have no fear, we've made it as simple as possible and for the most part you can just copy the example and change the bits to fit your new template pack.

I'm going to walk through each section in the class, however here's the entire class in the example for reference:

```php
class  EE_Messages_Template_Pack_New_Template_Pack extends EE_Messages_Template_Pack {

	public function _set_props() {
		$this->label = __('Test Pack', 'event_espresso');
		$this->dbref = 'new_template_pack';
		$this->description = __('This is a new template pack included as part of an example template pack for demonstration purposes.', 'event_espresso');
		$this->_base_url = EE_NEW_TP_URL . 'templates/';
		$this->_base_path = EE_NEW_TP_PATH . 'templates/';

		//note in this example we're stating that this template pack JUST supports the email messenger and the payment message types.
		$this->_supports = array(
			'email' => array(
				'payment_declined', 'payment', 'payment_refund', 'payment_reminder'
				)
			);

		//here we list what variations are supported.  This example demonstration doesn't support any extra variations.
		//Remember that ALL variations for your template pack must be in a folder located at $this->_base_path '/variations'.  The variation file names should match what each messenger expects.  So you may need to look at the messenger classes for the messengers you support to see what possible variations might be requested by the messenger.
		$this->_variations = array();

		//all template packs can define the default variation.  You may want to override the label that describes this default, and you do so via this property.  Indexes are the messenger you wish to override the default label for and values are the new label.
		$this->_default_variation_labels = array( 'email' => __('New Pack Default', 'event_espresso' ) );
	}
}
```

### Choose an arbitrary name for your template pack and use that as the class name.

In our example template pack I used `EE_Message_Template_Pack_New_Template_Pack` but I could have used something like `EE_Message_Template_Pack_My_Awesome_Templates`.  There are really only two things REQUIRED when you name your template pack:

1. Your arbitrary class name must be prefixed with the string `EE_Message_Template_Pack_`.
2. Make sure that you use something that will be unique for the classname to reduce risk of conflicts with other template pack classes that users may install.

### Define the `_set_props()` method.

All template pack child classes MUST define this method.  It primarily is where the configuration for the template pack is setup. Here's all the properties you setup in this method:

* **$this->label** : This is what will be used to reference your template pack wherever it is listed in the admin ui.
* **$this->dbref** : This must match what you used as the suffix in your class name.  For example if my class had been named `EE_Message_Template_Pack_My_Awesome_Templates`, then the value for this property must be `my_awesome_templates`.  Internally, this is used by the template pack system to reference your class for templates saved in the db.
* **$this->description** : This will accompany anywhere a description of your template pack is displayed in the EE messages UI.
$this->_base_url : This should be a url path to where your actual templates for the template pack are stored in your plugin folder.  Make sure you include the trailing slash.
* **$this->_base_path** : This should be the actual path to where your actual templates for the template path are stored in your plugin folder. Make sure you include trailing slash.
* **$this->supports** :  This property is used to indicate what messenger and message types your template pack supports.  You set this up in an array where the key is the messenger slug, and the values for that key are the message types supported with that messenger.  This allows you to register a template pack to only support specific message types for specific messengers.  The template pack system uses this array to build the paths to the templates it will look for in your plugin folder.

### $this->_variations

This has been broken out into its own heading because it requires a bit more explanation.

> NOTE: Every template pack always has a default variation provided.  The `$_variations` property is only for adding additional CUSTOM variations.  If you wish to override the default variations for your template pack, then you can do so by defining the variation css in the specific naming schema in your template packs variations folder.  This indicates to the system that you wish to use defaults as defined by your template pack.  You can see how we did this in the plugin example.

This allows you to also list custom variations that your template pack supports.  The correct format for this property is to have a multiple dimension array where the top level key matches a messenger slug, then second level keys are message type slugs, then your values are an array where the key is variation name, and the value is the label for the variation.  I'm going to grab what we have in the Default template pack found in core (`/core/libraries/messages/defaults/default/EE_Messages_Template_Pack_Default.class.php`) as an example:

```php
$this->_variations = array(
    'html' => array(
        'receipt' =>
            array(
            'bauhaus' => __('Bauhaus', 'event_espresso'),
            'ejs' => __('Elliot Jay Stocks', 'event_espresso'),
            'horizon' => __('Horizon', 'event_espresso'),
            'lola' => __('Lola', 'event_espresso'),
            'tranquility' => __('Tranquility', 'event_espresso'),
            'union' => __('Union', 'event_espresso'),
            ),
        'invoice' =>
            array(
            'bauhaus' => __('Bauhaus', 'event_espresso'),
            'ejs' => __('Elliot Jay Stocks', 'event_espresso'),
            'horizon' => __('Horizon', 'event_espresso'),
            'lola' => __('Lola', 'event_espresso'),
            'tranquility' => __('Tranquility', 'event_espresso'),
            'union' => __('Union', 'event_espresso'),
            )
        )
    );
```

In this example, we are indicating that we have some variations defined for the default pack that are for the receipt and invoice message types with the html messenger.  The variations available are bauhaus, ejs, horizon, tranquility, and union for both message types.  And the corresponding labels are what gets displayed in the variation dropdown when editing a message template for those message type and messenger combination.

This instructs the system to look in the registered template pack folder for the variations and that messenger.  In this case you can look in `/core/defaults/default/variations/` and you will see all the variation css files listed there to match the variations described.

Now, let's go back to the example plugin for adding a template pack.  You noticed that in it's class, we actually have `$this->_variations = array()`.  What this indicates is that for our custom template pack, we don't have any custom variations and will just be using the default variation.

* **$this->_default_variation_labels** : This allows you to override the label in the ui for the default variations for each messenger.  In the plugin example, we've indicated that when templates for the email messenger are being edited and the custom template pack is selected, we want the default variation label to be "New Pack Default" instead of the usual "Default".

## Step Two: Setup all the default templates for the new template pack

Now that we have the template pack class setup, the next step is to create all the templates that will be used for when this template pack is selected in the message templates ui. Once again you can look at the example plugin to see how the custom templates were implemented.

> If you haven't already, it would be a good idea to read the [introduction to the message template pack system documentation](overview-message-template-packs-variations.md), and in particular the template pack hierarchy diagram.[/notification]

The wonderful thing about the template pack system is that you only setup the templates that you want to override from the defaults and those will get used when a users selects your template pack.  If there is no template available for your custom template pack, then the EE messages system will just use whatever the default is.

When setting up your templates, the important things to remember are:

* Templates are parsed for php.  So you can use php in the templates but remember that these are only used when setting up the default templates for the editor.  That means there is no EE data available.
* You can use any short-codes that are valid for your template.  In other words, if you are creating a template for the "email", "payment", "to" field.  You should only use short-codes valid for that field.  You can find out what short-codes are available for a field by opening up  message template in the editor (matching the messenger/message_type/context you are building a template for) and looking at the meta boxes in the sidebar to find out what valid shortcodes can be used for the field.
* Templates follow a specific naming schema and loading hierarchy (read more about it in the [overview document](overview-message-template-packs-variations.md)).

## Step Three: Register your new template pack.

In our sample plugin, we do this in the `new-messages-template-pack.php` file.  In your plugin you will probably want to use a different name.  You can pick any arbitrary name, but usual naming schema for EE addons is that main addon file names and folder are prefixed by `eea`.  So for example, I might call my new template pack "My Awesome Template", so my plugin folder name and main file name will be `eea-my-awesome-template-template-pack/eea-my-awesome-template-template-pack.php`.

> **Note:** I'm assuming that the reader is familiar with setting up WordPress plugins in general.  In this documentation I'm not going into detail about setting up the plugin header information.

Here's the contents of our example file (minus the usual WordPress plugin header information which you can see by viewing the file in its entirety):

```php
define( 'EE_NEW_TP_TEST_VERSION', '1.0' );
define( 'EE_NEW_TP_TEST_FILE', __FILE__ );
define( 'EE_NEW_TP_PATH', plugin_dir_path( __FILE__ ) . '/' );
define( 'EE_NEW_TP_URL', plugin_dir_url( __FILE__ ) . '/' );

function ee_new_messages_template_pack_test_load_textdomain() {
	load_plugin_textdomain( 'ee-new-messages-template-pack-test', FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
}
add_action('plugins_loaded', 'ee_new_messages_template_pack_test_load_textdomain');

function ee_new_template_pack_test_register_new_variation() {
	if ( ! class_exists( 'EE_Register_Messages_Template_Pack' ) ) {
		return;
	}

	$setup = array(
		'path' => rtrim(EE_NEW_TP_PATH, '/'),
		'classname' => 'EE_Messages_Template_Pack_New_Template_Pack',
		);
	EE_Register_Messages_Template_Pack::register( 'ee_new_template_pack', $setup );
}
add_action( 'EE_Brewing_Regular___messages_caf',  'ee_new_template_pack_test_register_new_variation' );
```

> Make sure when you do your own template pack plugin, that you modify the name of the functions and callbacks in this file so they are custom to your plugin and to prevent potential conflicts with other template packs that get developed.

In this example we've done a few things, we've defined a text-domain to be used by localization (you should always do this for your template packs so that labels in the ui can be translated into different languages), we've also defined some constants to make it easier to reference various things throughout the code.

Finally you'll see that we have a function named `ee_new_template_pack_test_register_new_variation` that serves as a callback to the hook added after:

```
add_action( 'EE_Brewing_Regular___messages_caf',  'ee_new_template_pack_test_register_new_variation' );
```

What's happening here is that we're making sure that we are only registering our template pack right at the point the EE messages system is initializing all its caffeinated functionality (yes, this means that template packs can only be registered for the full caffeinated version of Event Espresso, not the decaf version - well they can, but you have to use different hooks other than what's provided by the EE plugin api).

Inside the callback function, you see that we call `EE_Register_Messages_Template_Pack::register()`.   The first argument sent to this method is a string representing the message template pack (an arbitrary string but you should make it something similar to what your template pack is called).  The second argument is an array that has two values.  The 'path' of where all your templates for the template pack are located in your plugin file, and the classname of the class you defined for the template pack configuration.

That's it!  That's all you need to do to register a new template pack.