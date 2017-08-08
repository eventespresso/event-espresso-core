# Registering Capabilities via the Capabilities Plugin API

In EE4 we've provided a handy api for developers to quickly integrate add-ons with different core components of Event Espresso. This document highlights the `EE_Register_Capabilities` plugin api.  This class is found in `/core/libraries/plugin_api/`

## Why use EE_Register_Capabilities

Since WordPress already has methods/functions available for adding new capabilities to its user management system, why use EE_Register_Capabilities?

### 1. It makes it easy to tie your capability additions to the EE activation/deactivation process.

The EE Capabilities system takes care of initializing new roles and adding capabilities to existing roles.   It is also used for users to reset default roles easily if needed.  When you hook in your new capabilities using this system you are automatically integrated with all the stuff the EE Capabilities system does.

### 2. It greatly simplifies adding your new capabilities.

While powerful, the WordPress user role/capability system can be a bit of a chore sometimes for setting up new capabilities - the EE Capabilities system just removes a lot of the (what can be) repetitive actions and let's you focus on just the relationships you want to add (role to capability) and get using them.

Also, while admittedly still a bit difficult to fully grok, using this api does make it a bit easier to register capability "meta maps" for capabilities that are conditional on the type of object and "ownership".  More explanation on this will be given later in this doc.

## Using EE_Register_Capabilities to register new capabilities for EE

We're going to use an example to demonstrate how you can easily register new capabilities with the EE system using an example.  Let's say we've created a new addon for EE, and it adds a new custom post type called "Sponsors"  because we have sponsors we want to associate with Events in EE.  As a part of this process, we want to make sure that we implement some new capabilities for the sponsors admin ui.

### Plan out your capabilities

#### Step One: Map new capabilities in the WordPress function `register_post_type()`

Since we're registering a new custom post type, WordPress provides an easy way to map regular post type capabilities to custom capabilities, so you will want to do that in your code.  We're not going to go into detail on how to do that here because it's already [well documented](http://codex.wordpress.org/Function_Reference/register_post_type).  It's just worth mentioning because it is an important step.

#### Step Two: Plan out your capabilities

One of the first things you should do is plan out your capabilities.  An important thing to remember about capabilities is that they should describe an action.  Here's a sentence that can help with that.

> In order to "action" "custom_post_type_name",  users require the "action_custom_post_type_name" capability.

eg.

> In order to "read" "sponsors", users require the "read_sponsors" capability.

The reason why I didn't list this item first is because since we are creating a custom post type in our example,  mapping the core wp post capabilities to your custom capabilities is a great way to figure out which capabilities you will start with.

So here's a simple array I've created that lists all the capabilities we're going to use for our addon:

```php
$caps = array(
	'edit_sponsor',
	'read_sponsor',
	'delete_sponsor',
	'edit_sponsors',
	'edit_others_sponsors',
	'publish_sponsors',
	'read_private_sponsors',
	'delete_sponsors',
	'delete_private_sponsors',
	'delete_published_sponsors',
	'delete_others_sponsors',
	'edit_private_sponsors',
	'edit_published_sponsors'
);
```

#### Step Three:  Setup a map of role to capability relationships.

The purpose of this map is to simply indicate how you want capabilities assigned to role  when your plugin is first activated (or when user initiates a reset to defaults action via the Event Espresso admin).  To keep our example simple, we're simply going to make sure that the administrator role receives all the capabilities for our sponsors.  So, we just have to modify our array like so:

```php
$caps = array(
	'administrator' => array(
		'edit_sponsor',
		'read_sponsor',
		'delete_sponsor',
		'edit_sponsors',
		'edit_others_sponsors',
		'publish_sponsors',
		'read_private_sponsors',
		'delete_sponsors',
		'delete_private_sponsors',
		'delete_published_sponsors',
		'delete_others_sponsors',
		'edit_private_sponsors',
		'edit_published_sponsors'
	)
);
```

If you wanted to, you could have certain capabilities added to the default WordPress "subscriber" or "contributor" roles as well.

#### Step Four: Setup your meta capability maps.

Mapped meta capabilities are capabilities like "edit_post" which is mapped to primitive capabilities called "edit_others_posts", "edit_private_posts" and "edit_published_posts" in the WP capability system so that  one can just use `current_user_can( 'edit_post', $post_id )` and  WordPress will use the given post id to grab all the other required capabilities (primitives) for that particular post.  So for instance, if the user is not the author of the post, then they must also have the `edit_others_posts` capability in order to actually edit the post.   It's a powerful system that makes it a lot easier to add user restrictions throughout the code because it offloads the logic for checking primitive capabilities against the user from client code to a prototype like layer.  You can find the code where WordPress does this capability mapping in `wp-includes/capabilities.php` and the function `map_meta_cap()`.

The EE Capability system utilizes a filter called `map_meta_caps`  and exposes some classes for setting up map relationships so to connect custom data items with the WP map system.  Since you've already mapped core WP caps to your custom caps using the WordPress `register_post_type()` function,  if you were only to do use core wp post capability checks in your code (i.e. `current_user_can('edit_post')`, then you wouldn't need the maps, however if you do `current_user_can('edit_sponsor')` then you DO need the maps.

An assumption is made in this example that you're already using the EE model system for your sponsors post type (and its the class `EEM_Sponsor`).

The first thing you need to do is make sure that you have an array for setting up capability maps.   There are different types of Capability maps:

| Class | Description |
| ----- | ----------- |
`EE_Meta_Capability_Map_Edit` | This is for all the edit action type capabilities.
`EE_Meta_Capability_Map_Read` | This is for all the read action type capabilities.
`EE_Meta_Capability_Map_Delete` | This is for all the delete action type capabilities.
`EE_Meta_Capability_Map` | This is the abstract parent for all capability map classes. It can be extended if you wish to create your own custom mapping.

And here's the description of the params:

| Argument | Explanation |
| -------- | ----------- |
$meta_cap | This is the meta capability that is being mapped to its primitives.
$map_values | This is an array of values that must be in the given order and be present (you can include empty strings for items that you are not mapping) is for the following values:
| | *[0]*: A string representing the model name for retrieving an object for a given object id passed in by a capability check function (i.e. current_user_can()). This is *required*.
| | *[1]*: String representing the primitive capability for "published" context.
| | *[2]*: String representing the primitive capability for "others" context.
| | *[3]*: String representing the primitive capability for "private" context.

So with that given, here's our example code for setting up the maps array in the format that `EE_Register_Capabilities` will be expecting:

```php
$cap_maps = array(
	'EE_Meta_Capability_Map_Edit', array( 'Sponsor', 'edit_published_sponsors', 'edit_others_sponsors', 'edit_private_sponsors'),
	'EE_Meta_Capability_Map_Read', array( 'Sponsor', 'read_published_sponsors', 'read_others_sponsors', 'read_private_sponsors'),
	'EE_Meta_Capability_Map_Delete', array( 'Sponsor', 'delete_published_sponsors', 'delete_others_sponsors', 'delete_private_sponsors'),
	);
```

#### Step Five:  Putting it all together

Now that we've worked out the capabilities and the cap_maps, it's time to use `EE_Register_Capabilities` to register our capabilities!  The important thing to remember with using this api, is it must be used before the WordPress `init` action fires.  The best place to do any EE plugin api calls is within a callback for the `AHEE__EE_System__load_espresso_addons` action hook.  So let's put everything together!

```php
add_action( 'AHEE__EE_System__load_espresso_addons', 'sponsor_addon_register_capabilities' );
function sponsor_addon_register_capabilities() {
	$caps = array(
		'administrator' => array(
			'edit_sponsor',
			'read_sponsor',
			'delete_sponsor',
			'edit_sponsors',
			'edit_others_sponsors',
			'publish_sponsors',
			'read_private_sponsors',
			'delete_sponsors',
			'delete_private_sponsors',
			'delete_published_sponsors',
			'delete_others_sponsors',
			'edit_private_sponsors',
			'edit_published_sponsors'
		)
	);

	$cap_maps = array(
		'EE_Meta_Capability_Map_Edit', array( 'Sponsor', 'edit_published_sponsors', 'edit_others_sponsors', 'edit_private_sponsors'),
		'EE_Meta_Capability_Map_Read', array( 'Sponsor', 'read_published_sponsors', 'read_others_sponsors', 'read_private_sponsors'),
		'EE_Meta_Capability_Map_Delete', array( 'Sponsor', 'delete_published_sponsors', 'delete_others_sponsors', 'delete_private_sponsors'),
		);
	EE_Register_Capabilities::register( 'sponsor_addon_capabilities', array( 'capabilities' => $caps, 'capability_maps' => $cap_maps ) );
}
```

## Wrapping Up

Now that you've registered capabilities, where-ever you want to add user permissions, you can just do something like `EE_Registry::instance()->CAP->current_user_can( 'edit_sponsors', 'context_string' )` in a condition block in your code.
