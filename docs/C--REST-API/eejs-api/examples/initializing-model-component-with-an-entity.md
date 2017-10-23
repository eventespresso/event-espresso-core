# Initializing Model Components with its Entity.

## Three ways to initialize.

With the `eejs.api` library, there are three ways to initialize the entity for a model component.

### 1. Pass in the value for the model primary key `id` option.

With this method, you use the `id` option to provide a primaryKey value.  So as an example, we could initialize an event via something like this.

```js
(function(){
    'use strict';
    eejs.api.init({collections:['events']}).then(function(){
        var Event = eejs.vue.extend(eejs.api.components.event),
            EventView = new Event({
                id : 10
            });
        console.log(EventView.id); // 10
        console.log(EventView.$data.event); // { EVT_ID : 10, EVT_name : 'Some Event Title', ...and all other properties for the event entity}
        console.log(EventView.EVT_ID); //10 (computed property output which means the entity was saved to the store state
        console.log(EventView.EVT_name); //'Some Event Title' (computed property output)
    }).catch(function(e){
        console.log(e);
    })
})();
```

### 2. Pass in the value for the model primary key as a prop with `initialId`.

With this method, the value for the entity primary key would be passed through via a parent component as a prop to its child.  So in the parent's template you may have something like this:

```html
<div id="app">
    <event v-bind:initial-id="10"></event>
</div>
```

Then the Event template may be something like this:

```html
<!-- assigned to template in a js variable eventTemplate -->
<div class="event">
    <h2>{{EVT_name}}</h2>
    <p v-html="EVT_descRendered"></p>
</div>
```

> **Why are you using `v-html` here instead of just doing `<p>{{EVT_descRendered}}</p>`?**
>
> With Vue, any rendered content by default is escaped.  If you want content that is html to be rendered as html on the page, then you need to use this special vue directive.  You can [read more about it here](https://vuejs.org/v2/api/#v-html)

Then the javascript may be something like this:

```js
(function(){
    'use strict';
    eejs.api.init({collections:['events']}).then(function(){
       eejs.api.components.event.template = eventTemplate;
       var EventView = new Event({
               el : '#app',
               components : {
                   'event' : eejs.api.components.event
               }
           });
    }).catch(function(e){
        console.log(e);
    });
})();
```

The output would end up being something like (source):

```html
<div id="app">
    <div class="event">
        <h2>Some Event Title</h2>
        <p>Some event description</p>
    </div>
</div>
```
### 3. Pass in the entity as a prop with `initial{modelName}`

In this final option for getting the entity, you can just pass in the entire entity object as a prop from a parent vue template.  Keep in mind the following:

- in the previous two options, the entity is retrieved from the server via the REST API using the provided entity ID.  With this option the server is not pinged and the entity is passed in AS IS.
- Any entity fields that were not passed in via the prop will be pre-populated with the defaults for that entity (see [the next section about defaults](#creating-a-default-entity)).  This means, if you send in an entity with a primary key that is known to exist on the server, but not all the corresponding fields for that entity, when you update that entity it WILL overwrite any values that may have existed for that entity in the db with defaults.

Typically this method is used when:

- The parent component is the collection component and thus is retrieving entities from the server as a part of a collection request and then building the individual views from that (that's what we'll use for our example).
- The view is a form for creating a new entity and you want to override some of the defaults for the new entity.

You can see an example of this method in the [Simple List of Events with Datetimes](simple-event-list.md) document.

## Creating a default entity.
 
There will be use-cases where you may be using the `eejs.api` library to construct forms for either editing or creating a new entity.  When creating a new entity via the client, since the entity hasn't been persisted to the server yet, there are some problems the library takes care for you:

### 1. Creating, attaching and tracking a temporary unique id for that entity.

Whenever a component is created by vue, if the incoming primary key (no matter what method is used) is not available, then a unique temporary key will be created following the format `_new_id_10`.  These temporary keys will _consistently_ have the `_new_id_` prefix and the "unique" part is the integer generated for the key.  

### 2. Using the defaults provided by the schema provided from the server.

By default, every component options object built by the `eejs.api` library has an initial state for the entity that matches the defaults defined by the schema for that collections entities.  This ensures that the data structure for entities is always consistent and you never have a partial entity. 

### Usage

Here's a very basic example (without any vue template) of creating a vue component that sets up a default event entity:

```js
(function(){
    'use strict';
    eejs.api.init({collections:['events']}).then(function(){
        var Event = eejs.vue.extend(eejs.api.components.event),
            EventView = new Event();
        console.log(EventView.id); // _new_id_1
        console.log(EventView.$data.event); // { EVT_ID : _new_id_1, EVT_name : '', ...and all other properties with their default values for the event entity}
        console.log(EventView.EVT_ID); // _new_id_1 (computed property output which means the entity was saved to the store state
        console.log(EventView.EVT_name); // '' (computed property output)
    }).catch(function(e){
        console.log(e);
    })
})();
```

> **Note:** You can also pass in the temporary unique id yourself if you want.  This is needed in the case where you have multiple components that might be sharing the same initially created event object. For example:

```js
(function(){
    'use strict';
    eejs.api.init({collections:['events']}).then(function(){
        var Event = eejs.vue.extend(eejs.api.components.event),
            uniqId = eejs.utils.getUniqueId(),
            EventPreview = Event.extend({
                template: eejs.data.templates.single_event_preview,
                id : uniqId
            }),
            EventForm = Event.extend({
                template: eejs.data.templates.single_event_form,
                id : uniqId
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

In this example (a variation of the [Simple Event Form and Preview](simple-event-form-and-preview.md) example), we have a form component (`EventForm`) and a preview component (`EventPreview`).  The view is for creating an event and we need to ensure that both the preview and the form share the same event entity from the state.  If we had just allowed the component to build the unique id, then `EventPreview` would have `_new_id_1` as the event id and `EventForm` would have `_new_id_2` as the event id.  Thus internally each component would have a different event entity and the global store would have two event entities in the event collection state.  By passing in the uniq_id generated outside the components, when the form is updated the preview will be updated.