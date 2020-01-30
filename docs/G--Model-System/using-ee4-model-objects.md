# Using EE4 Model Objects

When you use EE4's [model system](model-querying.md) to retrieve information from the database, you will usually retrieve EE4 model objects (children of [EE_Base_Class](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_classes/EE_Base_Class.class.php)). These have several advantages over using simple arrays or stdClasses, mostly

* they have well-defined methods for retrieving their properties in known, and often customizable formats (eg, retrieiving a payment's amount as either a float, or a string with the currency sign)
* they have methods for easily storing the model object to the database or removing it from the database
* they have methods for easily retrieving, adding, or removing related model objects (eg, adding a venue to an event, then viewing all venues for an event, and removing one)

(look in the core/db_classes folder to find each different class of model object and their methods)

Here is an example of how you could use a model object:

```php
$registration = EEM_Registration::instance()->get_one();
echo "This registration was made at " . $registration->pretty_date() . 
" for a person named " . $registration->attendee()->fname() . " for " . 
$registration->pretty_price_paid();
```

## Creating and Retrieving Model Objects

To create a new model object, use that class' new_instance method like so:

```php
$registration = EE_Registration::new_instance( 
    array( 
        'ATT_ID' => 12, 
        'TKT_ID' => 32, 
        'REG_price_paid' => 43.58 ) );
```

Where the argument passed in is an array, whose keys are names of ['fields' on the model](model-querying.md).

Any key in the `EE_Base_Class::_fields` can be provided as an argument to the model object's `new_instance()`  static method.

If the model object was previously saved to the database, retrieving it using the model's `EEM_Base::get_one()`  or `EEM_Base::get_one_by_ID()`  methods is preferred over using new_instance and providing the primary key. (Eg, if you want the registration with ID 5, it's better to use `EEM_Registration::instance()->get_one_by_ID( 5 )`  than `EE_Registration::new_instance( array( 'REG_ID' => 5 ) ) )` because the former makes it clear that you're retrieving this item from the database, whereas the latter implies it's a completely new record.

## Getting fields' values from model objects in various formats

Each model object has several convenience methods for retrieiving properties of that model object. Eg, EE_Registration has `EE_Registration::attendee_ID()` ,` EE_Registration::transaction_ID()` , `EE_Registration::date()` ,` EE_Registration::status_ID()` , etc. Each of these previously-mentioned methods is really just a wrapper around `EE_Base_Class::get()`, which returns the data of the type specified by the field's `EE_Model_Field_Base::prepare_for_get()`  method. Example call stack:

1. `EE_Registration::date()` calls `EE_Base_Class::get('REG_date')`
2. 'REG_date' was defined on `EEM_Registration::__construct()` as being of class`EE_Datetime_Field`, and `EE_Base_Class::get()` will call`EE_Datetime_Field::prepare_for_get()`
3. `EE_Datetime_Field::prepare_for_get` returns a string formatted as a date.

However, the convenience methods usually restate what their return type is for clarity.

However, what if you wanted to get the registrations' price and display it with a currency sign? Instead of using wrappers of `EE_Base_Class::get()`  method, you could instead use `EE_Base_Class::get_pretty()`, which generally returns a string which is designed for echoing out. Example call stack:

1. `EE_Registration:: get_pretty('REG_final_price')` calls`EE_Model_Field_Base::prepare_for_pretty_echoing`, instead of `EE_Model_Field_Base::prepare_for_get` to prepare the value for being returned,
2. ...which in the case of all [`EE_Money_Fields`](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/fields/EE_Money_Field.php) (which REG_final_price is one of), it will return a localized string.

```php
$registration = EEM_Registration::instance()->get_one();
echo $registration->get('REG_final_price');
echo "<br>";
echo $registration->get_pretty('REG_final_price');
```

Which, if the value of $registration's _fields['REG_final_price'] were 3000.00, and the organization settings were USA, would echo

```
3000
$3,000.00 USD
```

If you want to specifiy a different pretty format, look at the field's `EE_Model_Field_Baseprepare_for_pretty_echoing()`  method's `$schema` argument (the 2nd one). Specific strings can be passed to change the format. For example, passing 'localized_float' will instead return the price without currency code or symbol, but will still use commas and periods as defined by your country's settings.

You can also use `EE_Base_Class::e()` method, which echoes the return value of `EE_Base_Class::get_pretty()`.

`EE_Base_Class::f()`  method echoes out the specified field just as `EE_Base_Class::e()`  does, but formats it as if it were going to be echoed inside a form input's attribute. Eg

```php
<input value='<?php $registration->f('REG_final_price');?>'>
```

This is smart in case the value being echoed has quotes in it, which might mess up your HTML.

## Settings fields' values from Model Objects

You may use `EE_Base_Class::set()`  method to set any field, or its many wrappers (like `EE_Registration::set_price_paid()`). These make use of the `EE_Model_Field_Base::prepare_for_set()`.

## Saving and Deleting Model Objects

Saving model objects is done by calling `EE_Base_Class::save()` method on them. If the model object is newly inserted into the database,`EE_Base_Class::save() ` will return its new ID (and automatically set its primary key to be that ID too); if it is just updated it will return only true. Deleting is done by calling `EE_Base_Class::delete()` method on them.

## Getting Related Model Objects

Each model defines a list of related models in its [`EEM_Base::_model_relations` property in the constructor](model-querying.md).

Accessing these related model objects is easy: use either `EE_Base_Class::_get_first_related()` to get one related item (eg `$registration->_get_first_related('Event')`) or `EE_Base_Class::_get_many_related()`  to get an array of related model objects (eg` $registration->_get_many_related('Answer')` ). There are often convenience wrappers, like [EE_Registration](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_classes/EE_Registration.class.php)::event()  (returns the `EE_Event` the registration is for), `EE_Registration::attendee()`  (returns its related `EE_Attendee`), `EE_Registration::transaction()`  (returns the `EE_Transaction` this method can be used for), `EE_Registration::ticket()`  (returns the `EE_Ticket` purchased), and` EE_Registration::status_obj()`  (returns the `EE_Status`, which provides extra info about the registration's status). Note: by default the methods `EE_Base_Class::_get_first_related()` and `EE_Base_Class::_get_many_related()` will set `'default_where_conditions' => 'none'`, so that you will get related model objects, regardless of whether they have been deleted or not (this can be [overridden in the usual ways](model-querying.md).)

## Adding and Removing Related Model Objects

No matter what type of relationship exists between two model objects, so long as it's a direct relationship mentioned in the model's `_model_relations` property, you can use `EE_Base_Class::_add_relation_to()` and `EE_Base_Class::_remove_relation_to()` to add/remove related items. 


### Adding Related Model Objects

Here are a few examples of different relations, all using `EE_Base_Class::_add_relation_to()` to add related items.

#### BelongsTo
Each `EE_Answer` belongs to an `EE_Question` (meaning the database table `wp_esp_answer` has a column `QST_ID` which is a foreign key to the `wp_esp_question` table; also `EEM_Answer::_model_relations` has a key `Question` whose value is a `EE_Belongs_To_Relation`). 
Here is how to associate an `EE_Answer` with an `EE_Question`:

```
// create a new answer (or you could fetch a pre-existing one instead).
$answer = EE_Answer::new_instance(
    [
        'REG_ID' => 123,
        'ANS_value' => 'light saber'
    ]
);
$answer->save();
// fetch a pre-existing question (or we could have created a new one, like we just created a new answer)/
$question = EEM_Question::instance()->get_one();
// now make these instances related.
$answer->_add_relation_to($question,'Question');
```
That will set the `EE_Answer`'s `QST_ID` field to be the ID of the `EE_Question`, so it's equivalent to 

```
$answer->set('QST_ID', $question->ID());
$answer->save();
```

#### HasMany
Each `EE_Event` has many `EE_Datetime`s (meaning the database table `wp_esp_datetime` has a column `EVT_ID` which is a foreign key to the posts table - where the event custom post types are stored; also `EEM_Event::_model_relations` has a key `Datetime` whose value is an `EE_Has_Many_Relation`).
Here is how to associate an `EE_Event` with an `EE_Datetime`:

```
$event = EE_Event::new_instance();
$datetime = EE_Datetime::new_instance();
$event->_add_relation_to($datetime, 'Datetime');
```
That will set the `EE_Datetime`'s `EVT_ID` to the ID of the `EE_EVent`, so it's equivalent to

```
$datetime->set('EVT_ID', $event->ID());
$datetime->save();
```

Like each `EE_Event` `HasMany` `EE_Datetime`s, conversely each `EE_Datetime` `BelongsTo` an `EE_Event`; so using

```
$datetime->_add_relation_to($event, 'Event');`
```

is equally valid.

#### Has and Belongs To Many (HABTM)
Each `EE_Ticket` can grant access to many `EE_Datetime`s, but also access to each `EE_Datetime` can be through many `EE_Ticket`s (meaning there is a join table `wp_esp_datetime_ticket` with a row for each relation between a datetime and a ticket; also `EEM_Ticket::_model_relations` has a key `Datetime` whose value is `EE_HABTM`; likewise `EEM_Datetime::_model_relations` has a key `Ticket` whose value is also an `EE_HABMT`.)
Here is how to an existing `EE_Ticket` to a new `EE_Datetime`:

```
$ticket = EEM_Ticket::instance()->get_one();
$datetime = EE_Datetime::new_instance(
    [
        'DTT_EVT_start' => '2019-01-01 08:00:00',
        'DTT_EVT_end' => '2019-01-01 17:00:00'
    ]
);
$datetime->save();
$ticket->_add_relation_to($datetime, 'Datetime');
```
That will automatically create a new row in `wp_esp_datetime_ticket` using the IDs of the `EE_Ticket` and `EE_Datetime`. It's the equivalent of 

```
$datetime_ticket_relation = EE_Datetime_Ticket::new_instance(
    [
        'DTT_ID' => $datetime->ID(),
        'TKT_ID' => $ticket->ID()
    ]
);
$datetime_ticket_relation->save();
```

Sometimes these has-and-belongs-to-many relations have additional properties, like how the relation between `EE_Question`s and `EE_Question_Groups` have an order property (ie, `EEM_Question_Group_Question` has a field `QGQ_order`). You can set pass these values in as a 3rd parameter to `EE_Base_Class::_add_relation_to()`, like so:

```
$question = EEM_Question::instance()->get_one();
$question_group = EEM_Question_Group::instance()->get_one();
$question->_add_relation_to($question_group, 'Question_Group', ['QGQ_order' => 123]);
```
which is equivalent to 
```
EE_Question_Group_Question::new_instance(
    [
        'QSG_ID' => $question_group->ID(),
        'QST_ID' => $question->ID(),
        'QGQ_order' => 123
    ]
);
```

Note: what if you want to create a new object AND add it as a relation at the same time? Sorry, but there is no `EE_Base_Class::_create_and_add_related()` method or anything. You need to first create it and then use `EE_Base_Class::_add_relation_to()` (although if you're creating the model object with a foreign key, you can always set teh foreign key, eg `EE_Datetime::new_instance(['EVT_ID' => 123]);`.)

### Removing Related Model Objects

The method `EE_Base_Class::_remove_relation_to()` can also be used to remove any relation between two related model objects.

Eg

```php
$registration = EEM_Registration::instance()->get_one();
$answer1 = $registration->_get_first_related( 'Answer' );
$registation->_remove_relation_to( $answer1, 'Answer' );
```
which is equivalent to 
```
$answer1->set('REG_ID',0);
$answer1->save();
```

This again works for any relation. For has-and-belongs-to-many relations, it automatically removes the entry in the join table.

If the model object already exists, this change will be immediately saved to the database. However, if the primary model object (the object on which we are calling `EE_Base_Class::_remove_relation_to()`) has not yet been saved to the database, then the change will be cached only on the model object. If you do finally decide to save the related model object, you can call `EE_Base_Class::save_new_cached_related_objs()`, which will save all the related model objects which also don't yet exist in the database (if they do already exist in the database, then for now you will need to manually call `EE_Base_Class::save()` on each).

If you not only want to severe the relation between model objects, but also delete the related model object(s), you can use `EE_Base_Class::delete_related()`, providing it with the relation's name and an array of query_params (like EEM_Base::get_all's) to specify which related model objects are on the chopping block.

## Storing Meta information about any Model Object

EE4 has a special model called `EEM_Extra_Meta`, which facilitates interactions with the esp_extra_meta table, which is similar to wordpress' post_meta database table, except it can be used to store information about ANY other EE4 model. For example, say you wanted to store comments about an `EE_Transaction`, you could store and retrieve this information using `EEM_Extra_Meta` model.

`EE_Base_Class` defines the following helper methods:

### add_extra_meta

Modeled after Wordpress' add_post_meta: you supply the key and value and an entry with that key and value (and a reference to the model object you set it on) is stored in the extra meta table. By default always adds a new entry in the extra meta table, even if one with that key already exists, unless you specify the 3rd argument to FALSE.

### update_extra_meta

Modeled after Wordpress' update_post_meta: you supply the key and value, and all extra meta rows with that key corresponding to the model object you called `update_extra_meta` on are updated. You may also provide a $previous_value to specify that only extra meta rows with that previous value should be updated. If there are no extra meta rows with that key and corresponding to that model object in the esp_extra_meta table, one is inserted.

### get_extra_meta

Modeled after Wordpress' get_post_meta: you supply the key of the extra meta you want to find, whether or not you want to grab ALL (in which case it will return an array of values) or just the first one found (in which case it will return only a single value), and a default in case nothing is found.

### delete_extra_meta

Modeled after Wordpress' delete_post_meta: you supply the key and all the extra meta rows corresponding to that model object with that key are deleted. You may also provide a $meta_value and only rows with that value will be deleted

### all_extra_meta_array (EE 4.5+)

Returns an array of ALL the extra meta values corresponding to the model object on which this method was called.

For example, here is some code that sets an extra meta of "comments" on a transaction, and later retrieves those comments:

```php
$txn = EEM_Transaction::instance()->get_one_by_ID( intvla( $_REQUEST['txn_id'] ) );
$comment = sanitize_text_field( $_REQUEST['comments']);
$txn->add_extra_meta( 'comment', $comment );

echo "just added comment '$comment' onto transcation with ID {$txn->ID()}. Now all comments are:" . implode( ',', $txn->get_extra_meta( 'comment' );
```

So assuming there is a transaction with ID 1, and a comment of "foobar" the first time you call this it would output

```
just added comment 'foobar' onto transaction with ID . Now all comments are: foobar
```

And the next time you call this it will output:

```
just added comment 'foobar' onto transaction with ID . Now all comments are: foobar, foobar
```
