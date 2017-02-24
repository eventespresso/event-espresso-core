# `eejs.api` Example: Simple Event Form and Preview

This example uses a plugin that utilizes the `eejs.api` library to setup a simple vue app that has a form for editing/creating an event and a basic preview of the event details.  A WordPress shortcode is used to output the app on a page.

> **Note:** This is a very _basic_ application that is not styled.  It's intent is to merely demonstrate how the eejs.api library can be used to build vue based apps utilizing data provided by the EE REST API. This implementation is not a full event editor and (currently) does not persist any changes to the db.  For more technical details on using the `eejs.api` library you can view the documentation [here](../eejs-api.overview.md);

The code in this tutorial can be found [here](https://github.com/eventespresso/eejs-api-example-simple-event-list).

This plugin contains a number of different shortcodes that demonstrate various implementations of the eejs.api library.  Each example is in its own shortcode class. The one we're looking at here is found in the `SimpleEvent` class.

## `SimpleEvent`

In this class we have this code:

```php
<?php
namespace EEjsapi\shortcodes;

use Eejsapi\ShortcodeInterface;
use EE_Registry;
use EEH_Template;
use EEM_Event;

class SimpleEvent implements ShortcodeInterface
{
    public function registerScripts()
    {
        wp_register_script(
            'eejs-example-event',
            EEJS_EXAMPLE_PLUGIN_URL . 'assets/eejs-example-simple-event.js',
            array('eejs-api'),
            EEJS_EXAMPLE_VERSION,
            true
        );
        EE_Registry::instance()->AssetsRegistry->addTemplate(
            'single_event_preview',
            EEH_Template::display_template(
                EEJS_EXAMPLE_PLUGIN_DIR . 'templates/single_event_preview.html',
                '',
                true
            )
        );
        EE_Registry::instance()->AssetsRegistry->addTemplate(
            'single_event_form',
            EEH_Template::display_template(
                EEJS_EXAMPLE_PLUGIN_DIR . 'templates/single_event_form.html',
                '',
                true
            )
        );
    }

    public function shortcodeContent($attributes = array())
    {
        $event_id = isset($attributes['id']) ? $attributes['id'] : 0;
        //if no id then we're just creating a new event.

        EE_Registry::instance()->AssetsRegistry->addData('event_id', $event_id);
        wp_enqueue_script('eejs-example-event');

        //return main app container
        return EEH_Template::display_template(
            EEJS_EXAMPLE_PLUGIN_DIR . 'templates/app_wrapper_container.php',
            array( 'component' => '<event-form></event-form><event-preview></event-preview>', ),
            true
        );
    }

    public function shortcodeTag()
    {
        return 'EEJS_SIMPLE_EVENT';
    }

}
```

From this example:

### 1. The app javascript is registered listing `eejs-api` as a dependency.

This ensures that the `eejs-api` library is exposed to the app.

### 2. Templates used by the app views are being registered via the `AssetsRegistry::addTemplate` method exposed by `EE_Registry`.

All this does is make your templates easily accessible to your vue app via the `eejs.data.templates` property loaded in the source. Client code is not _required_ to use this method for exposing templates for the js app to use, however its a useful tool if desired.

### 3. Extra data (in this case the event id) is passed through to the app via using the `AssetsRegistry::addData` method.

This method is a handy method that will expose any registered key value pairs as a part of the `eejs.data` object to your javascript.

### 4. The shortcode is just for utility.

In our example we're just using the shortcode for enqueuing our app javascript, for passing in event ids for examples and for returning the main app container html.  In a real application a shortcode is really not a good way to do this sort of thing.

## Templates

The templates are registered by the main file. For the purpose of the tutorial we're not going to go into detail about how to create vue templates, that's something that should be familiar to someone working with vue. You can see the templates [here](https://github.com/eventespresso/eejs-api-example-simple-event-list/tree/master/templates).

## `eejs-example-simple-event.js`

This is the actual vue app for this example. Here's the code that is in this file that powers the simple event form and preview output:
 
```js
(function(){
    'use strict';
    eejs.api.init({collections:['events']}).then(function(){
        var Event = eejs.vue.extend(eejs.api.components.event),
            //uniqId = eejs.utils.getUniqueId(),
            EventPreview = Event.extend({
                template: eejs.data.templates.single_event_preview,
                // id : uniqId
                id : eejs.data.event_id
            }),
            EventForm = Event.extend({
                template: eejs.data.templates.single_event_form,
                // id : uniqId
                id : eejs.data.event_id
            });

       var eventView = new eejs.vue({
           el: '#app',
           'components' : {
               'eventForm' : EventForm,
               'eventPreview' : EventPreview
           }
       });
    }).catch(function(e){
        console.log(e);
    });
})();
```

Let's break down each part:

### Initialize the library

```js
eejs.api.init({collections:['events']})
```

In order to initialize the `eejs.api`, you need to pass into its `init` method an options object with the `collections` you want to build components and mixins for.  What happens behind the scenes is the library will automatically communicate with the EE REST API and read the schema for each of the registered collections in order to build the related vue components and mixins.

In order to find out what collections you can send in, you can visit the discovery endpoint for your site.  Something like: `https://ee.dev/wp-json/ee/v4.8.36`.  From the `routes` property in the response, you can derive the various collections that are available for registration.

In our example, we are just working with the event entity which is why our optoins object is:

```js
{collections: ['events']}
```

It's recommended to only initialized the library with collections you are using in your app so that it keeps things optimized.

### Do stuff on the resolved promise

The `eejs.api.init` method returns a javascript `Promise` object so you'll want to tie the rest of your app construction inside the callback for the promise resolution.

### Create a view component from the `eejs.api.components.event` component options object

```js
var Event = eejs.vue.extend(eejs.api.components.event);
```

This creates an component object you can then customize before constructing.

### Extend `Event` component for the preview and form views and assign properties.

```js
EventPreview = Event.extend({
    template: eejs.data.templates.single_event_preview,
    // id : uniqId
    id : eejs.data.event_id
}),
EventForm = Event.extend({
    template: eejs.data.templates.single_event_form,
    // id : uniqId
    id : eejs.data.event_id
});
```

So one reason why creating the `Event` component was useful here, is because then we're able to use that as the base for our `EventPreview` and `EventForm` component objects.  Notice also that in extending them, we're passing in the template and id properties. The id property in particular is being pulled from the data we setup earlier in the shortcode class. We've chosen here to initialize the event entity on the component via the use of the `id` options property, but there's [other ways we could have done that](initializing-model-component-with-an-entity.md).

### Register custom components with our parent view.

```js
var eventView = new eejs.vue({
   el: '#app',
   components : {
       'eventForm' : EventForm,
       'eventPreview' : EventPreview
   }
});
```

Finally, the view is initialized with an options object that binds the view to the element in the template with the `app` id, and with the registered components that we prepped earlier: `eventForm` and `eventPreview`.  The label given the registered components is reflected in the structure for the parent template:

```html
<div id="app">
    <event-form></event-form>
    <event-preview></event-preview>
</div>
```

## Starting with a default event entity instead (eg Creating a new Event)

In the `eejs-example-simple-event.js` you will notice that there is some commented out code referencing a   `uniqId` variable.  Let's tweak things a bit so that's uncommented.

```js
(function(){
    'use strict';
    eejs.api.init({collections:['events']}).then(function(){
        var Event = eejs.vue.extend(eejs.api.components.event),
            uniqId = eejs.utils.getUniqueId(),
            EventPreview = Event.extend({
                template: eejs.data.templates.single_event_preview,
                 id : uniqId
                //id : eejs.data.event_id
            }),
            EventForm = Event.extend({
                template: eejs.data.templates.single_event_form,
                id : uniqId
                // id : eejs.data.event_id
            });

       var eventView = new eejs.vue({
           el: '#app',
           'components' : {
               'eventForm' : EventForm,
               'eventPreview' : EventPreview
           }
       });
    }).catch(function(e){
        console.log(e);
    });
})();
```

So what's happening here now is we're using the helper method in `eejs.utils` for creating a uniqId and assigning that as the `id` property on our prepared components.  

One of the ways to create a new event using the `eejs.api` library is to not set any id property. Another similar way is to pass in `0` for the value of `id`.  Either of those methods will result in a new event being created internally and a unique temporary id automatically generated for the event entity.  However, we can't do that in this case because we want both `EventPreview` and `EventForm` to be connected to the _same_ entity.  One solution to this problem would be to merge these components into one component instead of splitting them up (and change the templates accordingly).  The disadvantage with that however is that it would mean losing the usefulness of having clear separation between the "form" component and the "preview" or display component.

The solution chosen here is to take advantage of the ability to pass in an externally genereated unique id for the events.  When you use the provided method to generate the uniq-id it ensures it is in a recognizable format for the model component so when it initializes it knows that id is a temporary id for a new entity.  This in turn ensures both components will end up linked to the same entity.


## Improvements

The example given above works ok, but one problem with it is that due to the fact the components will be calling the `fetchEntityById` action from their internal store reference immediately on create.  They will BOTH be pinging the endpoint for the event.  A solution for this would be to do what is in the commented out example found in `eejs-example-simple-event.js`:

```js
(function(){
    'use strict';
    eejs.api.init({collections:['events']}).then(function(){
        //uniqId = eejs.utils.getUniqueId(),
        var Event = eejs.vue.extend(eejs.api.components.event),
            EventPreview = Event.extend({
                template: eejs.data.templates.single_event_preview,
                skipInitialization : true,
                initialIdSet : false,
                watch : {
                    'initialId' : function(value) {
                        if (! this.$options.initialIdSet) {
                            this.id = value;
                            this.fetchById();
                            this.$options.initialIdSet = true;
                        }
                    }
                }
            }),
            EventForm = Event.extend({
                template: eejs.data.templates.single_event_form,
                skipInitialization : true,
                initialIdSet : false,
                watch : {
                    'initialId' : function(value) {
                        if (! this.$options.initialIdSet) {
                            this.id = value;
                            this.fetchById();
                            this.$options.initialIdSet = true;
                        }
                    }
                }
            });

       var eventView = new Event({
           el: '#app',
           id: eejs.data.event_id,
           components : {
               'eventForm' : EventForm,
               'eventPreview' : EventPreview
           }
       });
    }).catch(function(e){
        console.log(e);
    });
})();
```

Your component template for the main app would need to be this:

```html
<div id="app">
    <event-form initial-id="event.EVT_ID"></event-form>
    <event-preview initial-id="event.EVT_ID"></event-preview>
</div>
```

The primary change in this approach is that we are setting the id on the main app instance and using the `Event` component to create the main app.  Then there's three things we've done in the `EventForm` and `EventPreview` components:

### 1. Set the `skipInitialization` flag to true.

The `eejs.api` library exposes this flag for model component options as a way of preventing the default callback on the `created` lifecycle hook from firing.  If we didn't do this then the default callback would assume we wanted to create event entities with an auto-generated primary key id value for each of those components.  So by setting this to true, we prevent that, and there's no initialization happening.

### 2. Add a watcher to the component for the `initialId` prop.

In the parent view (`Event`), the initial fetch using the ID is being done on a asynchronous request.  At the time the two child components are created and mounted, that request might not be done yet.  So we add a watcher so that when the initialId prop is set by the parent (and thus reactively passed on to the children), we go ahead and initialize the children components.  This time when these child components call `fetchById` they will be retrieving the entity as it exists in the store state for the event collection so there won't be another ping to the endpoint!

### 3. Ensure the watcher for initialId only happens once on a change for the initialId

This wasn't really needed, but for the purpose of demonstration, we've added a custom option to the setup options for the child components labelled `initialIdSet` and we've used that to ensure that the watcher will only process once for that initialId update.  Why it isn't really needed is because the likelihood of the parent changing the `initialId` prop in this example is nil.  If we had the kind of ui where user's might enter the id of another event (or select from a dropdown), then you'd want the watcher to update whenever the initialId changes.  So keep that in mind. 