# EE4 Capability System Overview

Beginning with version 4.5.0, Event Espresso has introduced a number of WordPress capabilities for restricting access to various actions and views in the users dashboard.  WordPress developers familiar with the [WordPress Roles and Capabilities](http://codex.wordpress.org/Roles_and_Capabilities) system know that it provides a really powerful system for user management.

Here's some important things to know about this new system as introduced in core:

## No UI for user management

The system is entirely hidden to the average user as there is no ui for user management and for the average user updating to 4.5.0 there will be no change in behaviour because all the new capabilities have been added to the core WP administrator role by default.

We decided to take this approach because there are a plethora of Capability and User management WordPress plugins out there that can be used with our system to create roles and mix and match capabilities.  At some point in the future we may create our own specific Event Espresso Roles plugin, but for now the need is met by just providing granular capabilities on EE admin pages.

## Over 100+ granular capabilities added

Yeah, that's a lot!  There are more added in 4.6.0 with the introduction of payment methods as well.   A number of capabilities follow the capability mapping system WordPress provides for not only restricting access to general views but also restricting access based on whether a user "owns" the item being viewed or not (i.e. Event Authors only being able to edit their own events, or a user being able to edit only their own custom message templates).

> We've prepared documentation on all the capabilities and what they affect via a google spreadsheet. [Click Here for Access](https://docs.google.com/spreadsheet/ccc?key=0Al0RhqTD8pDfdEhtcFhLdW9rTFdPOWtrODh3d1QyN1E&amp;usp=sharing"><button class="btn-info btn-sm)

## Using EE Capabilities methods

There's a variety of ways to use the EE Capabilities methods but the preferred method is to use the property on the `EE_Registry` object which is made available right before the `AHEE__EE_System__load_espresso_addons` action hook is called which is in turn called in the callback for a `plugins_loaded` hook at priority 1.  So really early.

You can call call any EE Capabilities methods by doing something like this:

```php
EE_Registry::instance()->CAP->current_user_can( 'some_cap_check', 'some_context');
```

EE_Capabilities can also be called directly doing something like this:

```php
EE_Capabilities::instance()->current_user_can( 'some_cap_check', 'some_context' );
```

You will see this used whenever we reference methods in this document.  However, once again, the *preferred* way of calling is via the EE_Registry "CAP" property.

## Core WP Wrappers for user check functions

The WP user functions ( `current_user_can()`, `user_can()` ) are great as is and super powerful, however we created wrappers for these that we use in implementing capability checks to make it slightly easier to filter and modify.  Please note, existing wp core user capability filters can **still be used**.  We've just "extended" them a bit with our wrappers.  The primary difference between our wrappers and the native functions is that we add a `$context` argument so when called, one can include an arbitrary string for context where that capability is being checked.  Currently this is how we implement all the capability checks in EE core.

### EE_Capabilities::instance()->current_user_can()

This is the method that we use throughout the EE admin to add capability checks to our code.  It functionally works exactly the same as the WordPress core function `current_user_can()` with the primary difference being the arguments provided.

| Arguments | Description |
| --------- | ----------- |
$cap | This is the capability being checked for. (string required)
$context | An arbitrary value describing the context the capability check is happening in. (string, required)
$id | The id of a item the cap check is being run against. This is optional, but certain "mapped" capabilities require this for accurate capability checking (i.e. edit_event, or edit_venue).

This method also includes two filters that allow developers to easily filter the capabilities being checked on EE admin routes and actions:

### apply_filters( 'FHEE__EE_Capabilities__current_user_can__cap__' . $context,  $cap, $id )

This is a dynamic filter that allows one to target a specific capability replacement for a specific context.  Let's do an example.  In the EE Admin, there are two contexts being used to control access to trash related things, `espresso_events_trash_events`, and `espresso_events_trash_event`.  The former is the context  for capability checks on whether user has access to the trash view link (and count) on the events list table.  The latter is the context for the capability check actually controlling ability to trash an event.  The capability being checked in both contexts is the same `delete_events`.  Now if we had just used the WP core `current_user_can( 'delete_events' )` check in the different contexts, then filtering just one of those contexts to be something other than `delete_events` becomes difficult.  However, with the EE_Capabilities wrapper its a cinch because of the included context argument.

So, here's an example of filtering the capability check for the ability to actually trash an event, but still allow the user to view trashed events.

```php
add_filter( 'FHEE__EE_Capabilities__current_user_can__cap__espresso_events_trash_event', 'ee_test_cap_current_user_can_context_filters', 10, 2);

function ee_test_cap_current_user_can_context_filters( $cap, $id ) {
	if ( $cap == 'ee_delete_events' ) {
		return 'you_no_access';
	}
	return $cap;
}
```

What is this filter doing?  We've targeted the `espresso_events_trash_event` context.  So anytime `EE_Capabilities::instance()->current_user_can( 'some_cap', 'espresso_events_trash_event' )` is called, this filter gets triggered.   The first check inside the filter is to see if the incoming capability is `ee_delete_events`, this is just to make sure we don't apply the filter to any capability changes that other plugins might have added.  However if we DID want to do that, we'd just remove this conditional.  Continuing, if this cap check does match, then we return `you_no_access` as the new capability to check on the user.  This is then what gets sent to the core wp `current_user_can()` function as the capability argument (because remember we're just wrapping core wp functionality).

### apply_filters( 'FHEE__EE_Capabilities__current_user_can__cap', $filtered_cap, $context, $cap, $id );

This filter runs immediately after the previous filter and is a "globally" applied filter.  To accomplish the same thing as we did in our example above, this is how we'd do it.

```php
add_filter( 'FHEE__EE_Capabilities__current_user_can__cap', 'ee_test_cap_current_user_can_filters', 10, 3);

function ee_test_cap_current_user_can_filters( $filtered_cap, $context, $cap, $id ) {
	if ( $cap == 'ee_delete_events' && $context == 'espresso_events_trash_events' ) {
		return 'you_no_access';
	}
	return $cap;
}
```

This filter is useful when you have a lot of EE capabilities you want to filter/manipulate, you can simply do it via a switch statement here.

## EE_Capabilities::instance()->user_can()

For the most part this is functionally the same as the `current_user_can()` method except that similarly to the WordPress equivalent, it allows one to indicate the specific user to check via submitting the user_id.  Currently EE does not have any instances of this method in use in core, but we expose this as a method that plugin/theme authors can use for anything they build using Event Espresso.

Other public methods in EE Capabilities.

| Method | Description |
| ------ | ----------- |
`init_role_caps()` | This adds any default caps to roles using a given map (or the internal map set in the class).
`add_cap_to_role()` | A wrapper for the WP core process of adding a capability to a role (simplifies things).
`remove_cap_from_role()` | A wrapper for the WP core process of removing a capability from a role (simplifies things).
`current_user_can_for_blog()` | A wrapper for the core WP `current_user_can_for_blog()` function that allows for setting the context on calling it (useful for targeted filtering of capability replacement).
`get_ee_capabilities()` | Returns an array of all registered EE capabilities.

