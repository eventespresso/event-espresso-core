# `eejs-api` Example: Simple List of Events with Datetimes

In this example, we'll be building a simple plugin that utilizes the `eejs-api` to setup a simple vue app that retrieves and displays a list of events with their datetimes.  We'll use a WordPress shortcode to output the app on a page.
  
  > Note: This is a very _basic_ application that is not styled or "prettied" up.  It's intent is to merely demonstrate how the eejs-api library can be used to build vue based apps utilizing data provided by the EE REST API. There is no pagination on this implementation so up to the default number of events for events collection requests (50 at the time of writing this) will be returned for display. For more technical details on the `ee-js` library [go here](../eejs-api-overview.md)
  
The code in this tutorial can be found [here](https://github.com/eventespresso/eejs-api-example-simple-event-list).

This plugin contains a number of different shortcodes that demonstrate various implementations of the eejs-api.  Each example is in its own shortcode class.  The one we're looking at here is found in the `SimpleEventList` class 


## `SimpleEventList`

In this class we have this:

```php
<?php
namespace Eejsapi\shortcodes;

use Eejsapi\ShortcodeInterface;
use EE_Registry;
use EEH_Template;

class SimpleEventList implements ShortcodeInterface
{

    public function registerScripts()
    {
        wp_register_script(
            'eejs-example-event-list',
            EEJS_EXAMPLE_PLUGIN_URL . 'assets/eejs-example-event-list.js',
            array('eejs-api'),
            EEJS_EXAMPLE_VERSION,
            true
        );
        //make sure templates are registered for the `eejs.data` property.
        EE_Registry::instance()->AssetsRegistry->addTemplate(
            'event',
            EEH_Template::display_template(
                EEJS_EXAMPLE_PLUGIN_DIR . 'templates/event_template.html',
                '',
                true
            )
        );
        EE_Registry::instance()->AssetsRegistry->addTemplate(
            'datetime',
            EEH_Template::display_template(
                EEJS_EXAMPLE_PLUGIN_DIR . 'templates/datetime_template.html',
                '',
                true
            )
        );
    }

    public function shortcodeTag()
    {
        return 'EEJS_EVENTS_LIST';
    }

    public function shortcodeContent($attributes = array())
    {
        //enqueue the script needed for the shortcode content
        wp_enqueue_script('eejs-example-event-list');
        //now return the main app container
        return EEH_Template::display_template(
            EEJS_EXAMPLE_PLUGIN_DIR . 'templates/app_container.html',
            '',
            true
        );
    }
}

```

Focusing on three things:

1. The app javascript is registered listing `eejs-api` as a dependency.

This ensures that the `eejs-api` library is exposed to the app.

2. Templates used by the app views are being registered via the `AssetsRegistry::addTemplate` method exposed by `EE_Registry`. 

All this does is make your templates easily accessible to your vue app via the `eejs.data.templates` property loaded in the source. Client code is not _required_ to use this method for exposing templates for the js app to use, however its a useful tool if desired.

3. The shortcode is just enqueuing our app javascript and the main app container.

## Templates

The templates are registered by the main file. For the purpose of the tutorial we're not going to go into detail about how to create vue templates, that's something that should be familiar to someone working with vue.  You can see the templates [here](https://github.com/eventespresso/eejs-api-example-simple-event-list/tree/master/templates)

## `eejs-example-event-list.js`

This is the actual vue app.  Here's the code that is in this file that powers the event list output:

```js
(function(){
    'use strict';
    eejs.api.init({collections:['events','datetimes']}).then( function(){
        eejs.api.components.datetime.template = eejs.data.templates.datetime;
        eejs.api.components.event.template = eejs.data.templates.event;
        var EventList = eejs.vue.extend(eejs.api.components.events),
            EventsView = new EventList({
               el: '#app'
            });
    }).catch( function(e){
        console.log(e);
    });
})();
```

Let's break down each part:

### Initialize the library

```js
eejs.api.init({collections:['events','datetimes']})
```

In order to initialize the `eejs.api`, you need to pass into its `init` method an options object with the `collections` you want to build components and mixins for.  What happens behind the scenes is the library will automatically communicate with the EE REST API and read the schema for each of the registered collections in order to build the related vue components and mixins.

In order to find out what collections you can send in, you can visit the discovery endpoint for your site.  Something like: `https://ee.dev/wp-json/ee/v4.8.36`.  From the `routes` property in the response, you can derive the various collections that are available for registration.

In our example, we are generating a list of events including the datetimes for each event so that is why our options object is:

```js
{collections: ['events','datetimes']}
```

### Do stuff on the resolved Promise.

The `eejs.api.init` method returns a javascript `Promise` object so you'll want to tie the rest of your app construction inside the callback for the promise resolution.  

### Set up any templates for the components you are using.

The promise is resolved when the library has finished building the component options you can use for your vue instance(s).  So inside the callback for this you'll first want to register any templates you want to use with the components.  Here you see we've done the following:

```js
eejs.api.components.datetime.template = eejs.data.templates.datetime;
eejs.api.components.event.template = eejs.data.templates.event;
```

Remember how earlier we had used the `AssetsRegistry` php object to register our templates?  Those are exposed on the `eejs.data.templates` property and you see that we are using that here.

Notice also that we now have the datetime and event model exposed in the `eejs.api.components` property.  These were built by the library automatically using the REST API json schema.  Also exposed on this property will be the collection component options: `eejs.api.components.datetimes` and `eejs.api.components.events`.

### Register Components you are using.

All the built component options living at `eejs.api.components` are simple option objects that Vue can use for constructing components.  You can use these options to create a vue component and/or assign to the `components` property in a constructed vue instance..  In our case, since our main view is a list of events, we've created an `EventList` component by extending our `eejs.vue` object, then we've constructed a vue instance from that component.  That's why we do this line:

```js
var EventList = eejs.vue.extend(eejs.api.components.events);
```

### Create your vue instance

Next, all you have to do is instantiate your vue instance.  The `eejs.api` library has taken care of registering all necessary mixins and components so the only thing you have to take care of for the basic example is attaching your view to a dom element.  In this case it is the container with the css id `app`.

```js
EventsView = new EventList({
    el: '#app'
});
```

## What will you build?

Currently the EE REST API only has read endpoints for the most part (with exceptions for RPC type check-in endpoints).  Once it supports Write endpoints the `eejs.api` library will be updated to suport that as well.   However, its still possible to use this to rapidly build various views displaying Event Espresso data.  Have fun!