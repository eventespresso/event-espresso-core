# Registering a Messages Template Variation

> Before reading this document, it would be good to read the [overview of the message template pack system](overview-message-template-packs-variations.md) first.  Also, reviewing how to [register a message template pack](registering-message-template-packs.md) would be good prep work,

This document outlines how to use the provided API in EE core for registering a new template variation for the messages system.  To make it easier for developers to quickly get started with new template packs, we've provided an example plugin that registers a new template variation in the `tests` folder of EE core.  You can access this via [our github repo](https://github.com/eventespresso/event-espresso-core).  I'll be referencing this plugin throughout this documentation in the examples.  The full path to this example addon is `/tests/mocks/addons/new-messages-template-pack-variation/`.

Before we begin the important thing to remember about messages template variations is that variations are always attached to a template pack and are specific to messenger and message type.  Where would you want to use this?  Remember that variations typically do not change any structural layout of message templates, but merely tweak the style of the layout.  The most commonly used variation in the messages system will be css.  So, the typical use for this api will be when you want to add additional styles to existing template packs that may be existing on a users install.  For instance, Event Espresso core has a default template pack and default variation for all the email messenger templates on install.  As a developer, you may like the structure of the default template pack, but want to provide some more colour options for your client, so you can create some new variations (css) and register them with the default pack and EE will take care of all the ui elements for the end user.

## Step One: Register the variations you want to add.

We do all this in our main plugin file, here's the example:

```php
define( 'EE_NEW_VARIATION_TEST_VERSION', '1.0' );
define( 'EE_NEW_VARIATION_TEST_FILE', __FILE__ );
define( 'EE_NEW_VARIATIONS_PATH', plugin_dir_path( __FILE__ ) . 'variations/' );
define( 'EE_NEW_VARIATIONS_URL', plugin_dir_url( __FILE__ ) . 'variations/' );

function ee_variations_test_load_textdomain() {
	load_plugin_textdomain( 'ee-new-variations-test', FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
}
add_action('plugins_loaded', 'ee_variations_test_load_textdomain');

function ee_new_variations_test_register_new_variation() {
	if ( ! class_exists( 'EE_Register_Messages_Template_Variations' ) ) {
		return;
	}

	//setup variations array for all known message types.
	$message_types = array(
		'cancelled_registration', 'declined_registration', 'not_approved_registration', 'pending_approval', 'registration', 'payment_declined', 'payment', 'payment_refund', 'payment_reminder'
		);
	$vtions = array();
	foreach ( $message_types as $message_type ) {
		$vtions[$message_type] = array(
						'new_variation_test_blue_lagoon' => __('Blue Lagoon', 'ee-new-variations-test' ),
						'new_variation_test_sunset_red' => __('Sunset Red', 'ee-new-variations-test' )
						);
	}

	$variations_setup = array(
		'base_path' => EE_NEW_VARIATIONS_PATH,
		'base_url' => EE_NEW_VARIATIONS_URL,
		'variations' => array(
			'default' => array(
				'email' => $vtions
				)
			)
		);
	EE_Register_Messages_Template_Variations::register( 'ee_new_variations_test', $variations_setup );
}
add_action( 'EE_Brewing_Regular___messages_caf',  'ee_new_variations_test_register_new_variation' );
```

When you do this in your own plugin, use a different name for your file (and functions/callbacks inside the file).  You can pick any arbitrary name, but the usual naming schema for EE addons is that main addon file names and folder are prefixed by `eea`.  So for example, I might call my variations plugin, "Blue Lagoon and Sunset Red Messages Variations for EE" , so my plugin folder name and and main file name will be `eea-blue-lagoon-and-sunset-red-variations/eea-blue-lagoon-and-sunset-red-variations.php`.

> Note I’m assuming that the reader is familiar with setting up WordPress plugins in general.  In this documentation I’m not going into detail about setting up the plugin header information.

> Make sure when you do your own variations plugin, that you modify the name of the functions and callbacks in this file so they are custom to your plugin and to prevent potential conflicts with other variation plugins that get developed.

In this example plugin file, we've defined some constants for path and version number, and we've setup a textdomain for localization, I want to focus on the action and callback that is how we're setting up the new messages variations added by our example plugin.

Note, action being used is `EE_Brewing_Regular___messages_caf`.   This is the action we want to hook our Variation registration on because its at this point the Messages system is being setup.  Yes, this means that new variations can only be registered for the full caffeinated version of Event Espresso using the provided plugin api.  However, you can register new variations with the decaf version of Event Espresso, it's just more difficult, and outside the scope of this document.

Let's walk through the callback for the action (`ee_new_variations_test_register_new_variation`).

The purpose of this callback is to setup the arguments for the `EE_Register_Messages_Template_Variations::register()` api which is what we use to easily register our new variations.  This class is well documented inline, so you'll want to review it for more in depth documentation than what is here.

The variations plugin api register method accepts two arguments:

The first argument is an arbitrary string used to identify the variations you are registering, you want to try to make this a unique string.

The second argument is an array that has the following elements in it:

**'base_path'** : this is the path where all your new variation files are found with your plugin.

**'base_url'** : this is the url structure for where all your new variation files are found with your plugin.

**'variations'** : This is a formatted array that indicates what template pack, what messenger, what message types your variations are registered with.  It also indicates your variation slugs and their localized labels.

Let's focus on this last array element.  First, in our example `'default'` indicates that we are registering our new variations with the Default Message Template Pack.  This string should be the `$dbref` property for the template pack you wish to associate your variations with.  This means that the variation options you are providing will only show up in the messages template ui when users are editing a messages template that is using the Default template pack.

Second, the array we have setup is indicating that the variations we are registering apply to message templates for `'email'` messengers.  This string should be the `$name` property for the messengers you wish your variations to apply to.  Note that this is also dependent on whether the template pack supports that messenger.   So with the way things are setup in this plugin example, it's indicating that the new variations will show up in the ui as options for message templates that have the default  template pack selected and that are for the email messenger.

Third, as the values for the 'email' messenger index, we have another array that indicates all the message types we want these variations applying to.  These message types would have to be message types that support the messenger they are listed with.  So this further filters where the variations will be available in the ui.  We're indicating that when the user is editing a message template that has the default template pack selected, and belongs to the email messenger and any of the given message types then they'll have our new variations to select from.

Finally, each message type has the array of new variations.  The variations are listed with the slug of the variation as the key and the value is the label for the variation.  In our example, we are registering two new variations, "Blue Lagoon" and "Sunset Red" (guess what colours these are adding ;) ).  The "slug" is important for the next step.

Once you've completed this, you now have indicated to the system what new variations you are registering, where they are found, and what message templates they apply to.

## Step Two: Create your variation files.

The final step is to create your actual variation files.  In this case we are adding some new css variations (the default template pack, and the email messenger expect .css files for variations which is why we're adding css.))  Here's the important things to remember when adding your css files for the new variations.

### A.  Make sure all the variation files you add are placed in the path you defined when registering your variations.

In other words, if you registered the path/url in the previous step so that variation files are located in `/my-plugin/variations/` then you make sure all your files are found inside that folder.

### B. Follow the correct naming schema for your variation files.

The key to how the messages template pack and variations system work, is in the naming of related files.  In the case of variations, they follow this specific naming schema.

`{$messenger}_{$messenger_variation_type}_{$variation_slug}.{$extension}`

Let's break this down.

* **$messenger**: This will be a string matching the `$name` property for the messenger our variation applies to.  So in the case of our example plugin, we will be using `email`.
* **$messenger_variation_type** : Different messengers have different variation "types" that they implement when sending their message.  In the case of the 'email' messenger, the types are `main`, `preview`, and `wpeditor`.  "Main" gets used when the final message is sent. "Preview" is used when messages are previewed via the message template editor.  "wpeditor" is used for the wpeditor when editing a message template.   When doing your custom variations, you will want to look at what the default variations are for a messenger because that will give you an idea of the subtle differences between the different (in this case) css files.  In the case of 'email' message templates, there are subtle differences between how a message appears in the preview, vs the wpeditor, vs the final email message hence why we have different "types".  The cool thing is, you can implement your changes for the different types and EE will take care of loading them in the different contexts automatically!
* **$variation_slug** : Remember when we registered our variations that we had `new_variation_test_blue_lagoon` and `new_variation_test_sunset_red` in our variation array?  That is the string that gets used in this section of your variation files.
* **$extension** : This is another messenger dependent value.  The messenger defines what variations represent.  In the case of the 'email' messenger, the variations represent css files, so the extension for our variations should be `.css` and thus a css file.

So if we put this all together, you can open up the variations folder in our example plugin and you will see that we've got files for each combination matching the naming schema.  We have registered our two new variations (new_variation_test_blue_lagoon, and new_variation_test_sunset_red), with one messenger (email),  which has three types (main, preview, and wpeditor) which results in 6 files.

Now here's a *very important* point.  You don't HAVE to have variation files for every single combination.  If when assembling a template view, the messages system cannot fine a specific css file to match the selected variation, messenger, and messenger variation type, then it will fall back to the default variation for that combination.

So that's it!  You can actually activate this sample add-on along with EE core and see the new variations in action!