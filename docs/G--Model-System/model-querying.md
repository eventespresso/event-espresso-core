# Querying Data using the Event Espresso Model System

## What is an EE4 Model?

Models are class singletons (PHP objects which are special in that there only one can exist at a time) used for defining and interacting with database tables. Each EE4 model usually corresponds to a single mysql database table. Each model defines a set of "fields" which correspond to database columns, and a set of "relations" which corresponds to other tables to which the model's table can be joined. Information corresponding to the model's tables, fields, and relations can be found in the in the model's constructor. Eg, to learn what mysql tables `EEM_Registration` uses, or what fields it has, or what other models its related to, look in `EEM_Registration::__construct()`.

## What models exist?

The model classes are all contained in the Event Espresso 4 plugins' `core/db_models` directory. There are quite a few of them. The following Ven Diagram shows all the models (in EE 4.6) and how they relate to each other. Each box is a model; each line shows a relation (the model with multiple lines coming out of it converging into one is the one with the foreign key to the other), and each differently-coloured bubble just helps to identify models with similar purposes.

![Models Venn Diagram](../images/models-venn-diagram.png)

> **Note:** the `Extra_Meta` and `Change_Log` models are special in that they can actually related to ALL other models.

## How to use the Model Singletons

To access the classes for querying, use the model singletons (there are no globals to use). This can be done with:

```php
EEM_Event::instance()
```

This returns the singleton, which can be used for querying. All the models are located in our core/db_models directory. Also note that all the models are autoloaded, meaning there is no need to `include` them.

## Corresponding Table(s)

The table (or tables) corresponding to the model are stored on `EEM_Base::_tables` array. Eg, on `EEM_Registration` the tables are:

```php
$this->_tables = array(
    'Registration' => new EE_Primary_Table( 'esp_registration', 'REG_ID' )
);
```

The first argument provided to EE_Primary_Table is the name of the database table (minus the `$wpdb->prefix`), and the 2nd argument is the primary key on the table. The array key used is also important though, as it will be the table's alias used when querying (why use an alias? Because we often need to make a join to the same table several times with different conditions). The convention is for the table's alias to usually be the same as the "model name".

There are cases where a model corresponds to multiple tables, which is the case for `EEM_Event`, `EEM_Venue`, and `EEM_Attendee`. For example, on `EEM_Event`, the tables are:

```php
$this->_tables = array(
    'Event_CPT'=>new EE_Primary_Table( 'posts','ID' ),
    'Event_Meta'=> new EE_Secondary_Table( 'esp_event_meta', 'EVTM_ID', 'EVT_ID' )
);
```

`EEM_Event`, as you can see, uses the wordpress core 'posts' table and has a second table named 'esp_event_meta'. The second table stores other important information about events which didn't correspond nicely to the columns available on the posts table, but was queried on frequently enough that we felt using a skinny table (like Wordpress' postmeta table) would be both awkward and inefficient. The 2nd argument on `EE_Secondary_Table` is again that table's primary key, and the 3rd argument is its foreign key to the `EE_Primary_Table`. This second table is essentially an extension of the first one, and there is a one-to-one relation between the rows in both tables (ie, for each row in the posts table that represents an event, there should only ever be one row in the esp_event_meta table).

## Model fields

The model's fields are defined in the class' constructor. Eg, for `EEM_Registration` they are in `EEM_Registration::__construct()`. Here is an example

```php
$this->_fields = array(
    'Registration'=>array(
	'REG_ID' => new EE_Primary_Key_Int_Field( 'REG_ID', __( 'Registration ID','event_espresso' ) ),
	'EVT_ID' => new EE_Foreign_Key_Int_Field( 'EVT_ID', __( 'Even tID','event_espresso'), false, 0, 'Event'),
	'ATT_ID' => new EE_Foreign_Key_Int_Field( 'ATT_ID', __( 'Attendee ID','event_espresso'), false, 0, 'Attendee'),
	'TXN_ID' => new EE_Foreign_Key_Int_Field( 'TXN_ID', __( 'Transaction ID','event_espresso'), false, 0, 'Transaction'),
	'TKT_ID' => new EE_Foreign_Key_Int_Field( 'TKT_ID', __( 'Ticket ID','event_espresso'), false, 0, 'Ticket'),
	'STS_ID' => new EE_Foreign_Key_String_Field( 'STS_ID', __( 'Status ID','event_espresso'), false, EEM_Registration::status_id_pending_payment, 'Status'),
	'REG_date' => new EE_Datetime_Field( 'REG_date', __( 'Time registration occurred','event_espresso'), false, current_time('timestamp'), $timezone ),
	'REG_final_price' => new EE_Money_Field( 'REG_final_price', __( 'Final Price of registration','event_espresso'), false, 0),
	'REG_session' => new EE_Plain_Text_Field( 'REG_session', __( 'Session ID of registration','event_espresso'), false, ''),
	'REG_code' => new EE_Plain_Text_Field( 'REG_code', __( 'Unique Code for this registration','event_espresso'), false, ''),
	'REG_url_link' => new EE_Plain_Text_Field( 'REG_url_link', __( 'String to be used in URL for identifying registration','event_espresso'), false, ''),
	'REG_count' => new EE_Integer_Field( 'REG_count', __( 'Count of this registration in the group registraion ','event_espresso'), true, 1),
	'REG_group_size' => new EE_Integer_Field( 'REG_group_size', __( 'Number of registrations on this group','event_espresso'), false, 1),
	'REG_att_is_going' => new EE_Boolean_Field( 'REG_att_is_going', __( 'Flag indicating the registrant plans on attending','event_espresso'), false, false),
	'REG_deleted' => new EE_Trashed_Flag_Field( 'REG_deleted', __( 'Flag indicating if registration has been archived or not.', 'event_espresso'), false, false )
			)
		);
```

The top-level array key ('Registration') corresponds to the table alias, indicating that all these fields belong to the table with the alias 'Registration'. The next-level of array keys are the fields' names, and their values are classes which are children of `EE_Model_Field_Base`, which define (in order declared): the database table's column, an i18n string describing the field, whether the field can be NULL, the field's default value, and on `EE_Foreign_Key_Field_Base` children, the model, or models, pointed to by the field.

## Model Relations

The model's relations are also defined in the model class' constructor. Eg, on `EEM_Registartion` the relations are:

```php
$this->_model_relations = array(
	'Event' => new EE_Belongs_To_Relation(),
	'Attendee' => new EE_Belongs_To_Relation(),
	'Transaction' => new EE_Belongs_To_Relation(),
	'Ticket' => new EE_Belongs_To_Relation(),
	'Status' => new EE_Belongs_To_Relation(),
	'Answer' => new EE_Has_Many_Relation(),
	'Checkin' => new EE_Has_Many_Relation()
);
```

This means that each registration should belong to one event, one attendee, one transaction, one ticket, and one status. It may also have many answers or checkin records. Note that the array keys, which is also the relation's name, MUST be the model's name (ie, the model class' name, eg. `EEM_Event`, minus 'EEM_', eg 'Event').

The main relation types are:

* `EE_Belongs_To_Relation` - this model has a foreign key to the other model (so in the example above, that indicates `EEM_Registration` should have a foreign key to `EEM_Event`, `EEM_Attendee`, `EEM_Transaction`, `EEM_Ticket` and `EEM_Status`). This also means model objects of this type can only possibly have ONE model object of the other type; eg each EE_Registration can only have one related event
* `EE_Has_Many_Relation` - the other model has a foreign key to this (so in the example above, that indicates `EEM_Answer` and `EEM_Checkin` should each have a foreign key to `EEM_Registration`). This means that this model objects of this type can have many related model objects of the other type; eg each EE_Registration can have many answers and many checkins
* `EE_HABTM_Relation` - "HABTM" stands for "Has-And-Belongs-To-Many". This is one is special that it must specify third model to join between this model and the other; both this model and the other model have a has-many relation to the join model. Eg, `EEM_Event` has an `EE_HABTM_Relation` to `EEM_Venue` via the `EEM_Event_Venue` model. That `EEM_Event_Venue` model is a join model which just has a primary key, a foreign key field to `EEM_Event` and another foreign key to `EEM_Venue`.

## Default Where Conditions

The astute reader might have noted that if `EEM_Event`, `EEM_Venue` and `EEM_Attendee` all use the Wordpress posts table, doesn't that mean when we make a query on one of those models it should return posts of ALL types by default? (Not just posts of the type corresponding to the model,eg. 'espresso_events' for `EEM_Event`?) Yes they would if it were not for the `EE_Default_Where_Conditions`. If there are any, these are also defined in each model's constructor and generate default WHERE clauses when running database queries. There are two children of `EE_Default_Where_Conditions` used so far:

1. `EE_CPT_Where_Conditions` which limits the results to only those where: the post_type is of the type specified, there is entry in the corresponding 2nd table, and the post_status isn't 'auto-draft' or 'trash'. Usually models extending `EEM_CPT_Base` (which is also a child of `EEM_Base`) use this. This means that when querying a child of `EEM_CPT_Base`, by default you'll only get posts of the right type that aren't trashed or just drafts.
2. `EE_Soft_Delete_Where_Conditions` limits results to only those where the model's `EE_Trashed_Flag_Field` (eg on `EEM_Registration` that was 'REG_deleted') is set to FALSE (meaning NOT deleted). Usually models extending `EEM_Soft_Delete_Base` (which is also a child of `EEM_Base`) use this. This means that when queryign a child of `EEM_Soft_Delete_Base`, by default you'll only get database rows which aren't trashed.

You may override these default where conditions by specifying a different value for the field in the query, or by disabling default where conditions. For example, to get both deleted and non-deleted registrations from the database, you could perform any of the following queries:

```php
EEM_Registration::instance()->get_all( array( array( 'REG_deleted' => array( 'IN', array( TRUE, FALSE ) ) ) ) );//directly overrides the default where condition
EEM_Registration::instance()->get_all_deleted_and_undeleted();//uses wrapper method on EEM_Soft_Delete_Base which does the exact same as above, 
EEM_Registration::instance()->get_all( array( 'default_where_conditions' => 'other_models_only' ) );//disables the usage of default where conditions on this model, but if we were to join to other models they would still be used
```

## Retrieving Data

### [get_all()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L741)

To get your data from the database, use `EEM_Base::get_all()`, which all of its children (like `EEM_Event` or `EEM_Registration`) inherit. This method will return an array of [model objects](using-ee4-model-objects.md) of the corresponding type. Eg `EEM_Event::get_all()` will return an array of `EE_Event` objects `EEM_Venue::get_all()` will return an array of `EE_Venue` objects, `EEM_Question::get_all()` will return an array of `EE_Question` objects, etc. See the [documentation on EEM_Base::get_all](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L741).

Eg, To get all events and print their names, use the `EEM_Event::get_all()` like so (notice, however, that the method is not static: it must be called on the `EEM_Event::instance()`):

```php
$events = EEM_Event::instance()->get_all();
foreach( $events as $event ) {
    echo $event->name()."<br>";
}
```

Here are a few other examples to give you a taste for what the `EEM_Base::get_all()` method can do for you:

```php
EEM_Event::instance()->get_all(
    array(
       'limit' => 10,
       'order_by' => array( 'EVT_visible_on' => 'DESC' ),
        array( 
            'EVT_visible_on' => array( '>', current_time() )
        )
    )
);
```

This gets the 10 next events to be visible on the website. Magically takes care of joining the wp_posts table (containing the espresso_events custom post type (CPT) event data) with the wp_esp_event_meta table (containing the date the event should be visible and other other easily-queryable-metadata)

```php
EEM_Event::instance()->get_all( array( array( 'Venue.State.STA_name' => 'Idaho' ) );
```

This gets all events held in Idaho. Magically joins the posts table to the event meta table, to the post table again (filtering for venue CPTs) to the venue meta table, to the state table.

```php
EEM_Venue::instance()->get_all(
    array(
        array(
            'OR' => array(
                 'VNU_wp_user' => 1,
                 'Term_Taxonomy.Term.slug' => array( 'LIKE', '%user_1%' )
                )
         )
     )
);
```            

This gets all venues created by user with ID 1 or have a term containing the string 'user_1'.

So what structure does this array (the "query params") provided to `EEM_Base::get_all()` have? Please read the documentation on EEM_Base::get_all, But here is a quick overview:

#### Top-level query parameters:

**0 (where)**

Use the array key 0 (or simply provide NO array-key) to specify your query's WHERE conditions. This query parameter should, itself, be an array, where array keys are:

* field names on the current model (eg, if using `EEM_Event`, this would be any of the 2nd-level array keys in `EEM_Event::_fields`, which is defined in `EEM_Event::__construct()`; so 'EVT_ID', 'EVT_name', 'EVT_display_desc', etc.),
* field names on related models, prepended by the name of the model. eg, if using `EEM_Event`, look at EEM_Event::_model_relations, also defined in `EEM_Event::__construct()`,he array keys are related models, and the value defines what kind of relation exists. So you could provide 'Registration.REG_ID' (see `EEM_Registration::_fields`), or 'Datetime.DTT_EVT_start' (see `EEM_Datetime::_fields`). You can also chain the model relations to as far as you like, eg 'Registration.Transaction.Payment.PAY_amount' is valid (because `EEM_Event` is related to `EEM_Registration`, which is related to `EEM_Transaction`, which is related to `EEM_Payment`) etc
* logic query params, like 'OR', 'AND', & 'NOT'. The values accompanied by these can be just like top-level where parameters
The values (except for logic query parameters), can be:

* a simple value, like 234, 'foobar', 100.23, or FALSE
* an array containing both an operator (`=` (default), `<`, `<=`, `>`, `>=`, `LIKE`, `NOT_LIKE`, `IN`, `NOT_IN`, `IS_NULL`, `IS_NOT_NULL`, or `BETWEEN`) and a simple value (except `IN` and `NOT_IN`, which take an array, and `BETWEEN` which takes an array with 2 entries only)
* the name of another field on this model, or on a related model (accompanied by the relation chain). Eg on `EEM_Event` it could be 'EVT_slug', 'Datetime.DTT_EVT_start', or 'Datetime.Ticket.TKT_start_date', etc
You can create a WHERE query sub-clause by using the LOGIC query parameters as array keys ('AND', 'OR', & 'NOT). Using 'AND' will join all the sub-query where statements with 'and' (eg `array('TKT_ID'=>23,'TKT_name'=>'party')` becomes `Ticket.TKT_ID=23 AND Ticket.TKT_name='party'`). 'OR' is the same but will instead join all the where statements with 'or'. And lastly, 'NOT', will continue to use 'or' or 'and' as before, but will negate the entire sub-clause (eg, `array( 'OR' => array( 'NOT' => array( 'TKT_ID' => 23, 'TKT_name' => 'party' ) ) )` will become `! ( Ticket.TKT_ID = 23 OR Ticket.TKT_name = 'party')`)

Normally all the WHERE conditions are AND'd together.

> **GOTCHA:** because the field names are the array-key values, what do you do if you want two different conditions using the same field? Eg, `array( 'DTT_EVT_start' => array( '<', '0214-07-11 10:00:00' ), 'DTT_EVT_start' => array( '>=', '2014-07-10 10:00:00' ) )`? Because PHP array keys must be unique, the where condition will be overwritten. To overcome this, the field names can contain a '*' (star) character, which will be ignored, as will anything after the '*'. Eg you could modify the query to instead be `array( 'DTT_EVT_start*before' => array( '<', '0214-07-11 10:00:00' ), 'DTT_EVT_start*after' => array( '>=', '2014-07-10 10:00:00' ) )` and so both WHERE conditions will be used.

**limit**

can either be a simple integer (eg `'limit' => 23`), or an array with two values: the first being the offset, and the second being the limit (eg `'limit' => array( 50, 10)` will become `LIMIT 50, 10`)

**order_by**

name of a field to order by (exactly how the WHERE conditions specify a field, eg 'DTT_EVT_start' or 'Question.QST_order') or an array, where keys are the field to order by and values are either the word 'ASC' or 'DESC' to specify in which direction to order (eg `array( 'Question.Question_Group.QSG_order' => 'ASC', 'Question.QST_order' => 'ASC')`)

**order**

if 'order_by' was used and its value was a string (not an array), then 'order' specifies the direction, and can have the value 'ASC' or 'DESC' only.

**group_by**

the name of a field to group by  (eg 'REG_final_price' or 'Event.EVT_ID'), or an array of fields to group by

**having**

has the exact same form as the WHERE conditions, except applies these to the HAVING clause

**force_join**

in order to avoid unnecessary database queries, the models system tries to cache information already acquired. Eg, while querying for registrations, if the events table is joined to, then each registration model object created will automatically cache a reference to its event (so when you want to retrieve the event for that registration, no database query will be necessary). Use this to force a join to a related model when it otherwise wouldn't. The value must be an array of related model names, Eg `array( 'Registration.Transaction', 'Question_Group.Question' )` etc.

**default_where_conditions**

If you would like to control the default where conditions on your query, and the wrapper methods on `EEM_CPT_Base` and `EEM_Soft_Delete_Base` don't do the trick, you can specify this query parameter. The following values are valid:

* 'all' - the default. Default where conditions are added by the model queried and each model joined to.
* 'other_models_only' - the model queried won't use default where conditions, but all others will
* 'this_model_only' - the model queried will use default where conditions, but no others will
* 'none' - absolutely non default where conditions will be used. (Use with caution when querying models which are children of `EEM_CPT_Base`, as normal Wordpress posts will probably be in the results returned!)

And that's it. For even more advanced queries, you can make use of `EEM_Base::_get_all_wpdb_results()` but it's protected (so you can really only use it if making your own model in an addon or extending core)

There are many variations of `EEM_Base::get_all()`, which simplify certain common tasks...

### [get_one()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L972)

This is exactly like get_all, but only returns the first model object found instead of an array of them. Eg.

```php
//gets the first attendee found who's name is john
$an_attendee = EEM_Attendee::instance()->get_one( array( array( 'ATT_fname' => 'John' ) );
```

### [get_one_by_ID()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L933)

This is exactly like using EEM_Event::instance()->get_one( array( array( 'EVT_ID' => 234 ), 'default_where_conditions' => 'other_models_only' ) );  Eg.

```php
$registration_234 = EEM_Registration::instance()->get_one_by_ID( 234 );
```

Because you have the ID of the item you're looking for, default where conditions are not used on the model being queried. This means the item could be trashed and it will be returned just fine

### [get_all_copies()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L4284)

When this is passed a model object it gets all model objects which appear to be copies of it (exact same data except their primary key). Eg.

```php
$att1 = EEM_Attendee::instance()->get_one();
$duplicate_attendees = EEM_Attendee::instance()->get_all_copies( $att1 );
```
 
### [get_one_conflicting()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L2269)

When this is passed a model object itreturns the first model object in the database that would somehow conflict with it (based on uniqueness conditions like keys and indexes). Eg.

```php
$proposed_event = EE_Event::new_instance( array( 'EVT_slug' => 'hockey-game' ) );
//check for conflicting events with that slug...
$conflicting_events = EEM_Event::instance()->get_one_conflicting( $proposed_event );
//if no conflicts exist, save it
if( ! $conflicting_events ){
    $proposed_event->save();
}
```

(see the [model objects docs](using-ee4-model-objects.md) for info on EE_Event::new_instance(...) and the save() method)

### [count()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L1767)

This is passed the exact same query_params array as get_all, but only returns a count of all the rows get_all would have found. Eg.

```php
//counts all the unique attendees for event 123
$count_unique_attendee_for_event = EEM_Attendee::instance()->count(
    array(
        array( 'Registration.EVT_ID' => 123 )
        )
);
```

### [exists()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L2300)

This method is like count, but simply returns a boolean indicating whether anything was found or not. Eg,

```php
//checks if ticket 345 was purchased at all
$ticket_345_purchased = EEM_Registration::instance()->exists(
    array(
        array( 'Ticket.TKT_ID' => 345 )
    )
);
```

### [sum()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L1791)

When this is passed a field name and query_params array it returns the sum of all the model objects' specified field. Eg,

```php
//finds the revenue generated for an event
$money_made_on_event_123 = EEM_Transaction::instance()->sum(
    array(
        array(
            'Registration.EVT_ID' => 123,
            'STS_ID' => array(
                'IN', array(
                        EEM_Transaction::complete_status_code,
                        EEM_Transaction:::overpaid_status_code ) ) ) ),
   'TXN_total' ) );
```

### Inserting

You can also use EEM_Base::[insert()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L2207), providing an array of field names as keys, and values as their values. Eg,

```php
//inserts a new attendee in the wp_esp_attendee table. 
//Explicitly sets the firstname, lastname and email, and leave everything as the default values
$new_attendee_id = EEM_Attendee::instance()->insert(
    array(
        'ATT_fname' => 'bill',
        'ATT_lname' => 'smith',
        'ATT_email' => 'few@ew.ew'));
```

However, the preferred method for inserting items into the database is to create a model object and save it, because model objects may set certain default field values upon construction. Eg

```php
//the new attendee's constructor sets the ATT_full_name and other fields whose defaults can be derived from fields provided to new_instance()
$new_attendee = EE_Attendee::new_instance(
    array(
        'ATT_fname' => 'bill',
        'ATT_lname' => 'smith',
        'ATT_email' => 'few@ew.ew'));
//and now we save it to the database (uses EEM_Attendee::insert internally)
$new_attendee->save();
```

### Updating

You can use EEM_Base::[update()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L1337), providing first an array of field names as keys and values as the new values, and a second array exactly like EEM_Base::get_all's query_params to define whcih items should be updated. Another way is to use retrieve a model object (using EEM_Base::get_all or get_one, etc), then modify it and then save. Eg,

```php
//changes all registrations for event 111 to instead be for event 222
EEM_Registration::instance()->update(
    array(
        'EVT_ID' => 222 ),
    array(
        array( 'EVT_ID' => 111 ) );
```

### Deleting

You can use EEM_Base::[delete()](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_models/EEM_Base.model.php#L1573) to delete model objects. Pass in an array exactly like EEM_Base::get_all, and all the items EEM_Base::get_all would have found will instead be deleted. Eg,

```php
//deletes all answers for question 123
$count_items_deleted = EEM_Answer::instance()->delete( array( array( 'QST_ID' => 123 ) );
```

## Inspecting Generated Queries

After you've started generating queries using the EE models system, you'll probably want to know exactly what SQL is getting generated. To do this, use the `show_next_x_db_queries()` function on the model you want to debug like so:

```php
//creates a fairly complex SQL query (gets 10 events (after first 40) which have a payment over a dollar) and echoes it out
EEM_Event::instance()->show_next_x_db_queries(1);
EEM_Event::instance()->get_all( 
    array( 
        array( 
            'Registration.Transaction.Payment.PAY_amount' => array( '>' , 1.00 ) ),
        'limit' => array( 40, 10 ) ) );
```

and the next 1 query will be echoed out to the page, which in this case is:

```sql
SELECT 
    Event_CPT.ID AS 'Event_CPT.ID', Event_CPT.post_title AS 'Event_CPT.post_title', Event_CPT.post_content AS 'Event_CPT.post_content', Event_CPT.post_name AS 'Event_CPT.post_name', Event_CPT.post_date AS 'Event_CPT.post_date', Event_CPT.post_excerpt AS 'Event_CPT.post_excerpt', Event_CPT.post_modified AS 'Event_CPT.post_modified', Event_CPT.post_author AS 'Event_CPT.post_author', Event_CPT.post_parent AS 'Event_CPT.post_parent', Event_CPT.menu_order AS 'Event_CPT.menu_order', Event_CPT.post_status AS 'Event_CPT.post_status', Event_Meta.EVT_display_desc AS 'Event_Meta.EVT_display_desc', Event_Meta.EVT_display_ticket_selector AS 'Event_Meta.EVT_display_ticket_selector', Event_Meta.EVT_visible_on AS 'Event_Meta.EVT_visible_on', Event_Meta.EVT_additional_limit AS 'Event_Meta.EVT_additional_limit', Event_Meta.EVT_default_registration_status AS 'Event_Meta.EVT_default_registration_status', Event_Meta.EVT_member_only AS 'Event_Meta.EVT_member_only', Event_Meta.EVT_phone AS 'Event_Meta.EVT_phone', Event_Meta.EVT_allow_overflow AS 'Event_Meta.EVT_allow_overflow', Event_Meta.EVT_timezone_string AS 'Event_Meta.EVT_timezone_string', Event_Meta.EVT_external_URL AS 'Event_Meta.EVT_external_URL', Event_Meta.EVT_donations AS 'Event_Meta.EVT_donations', Event_CPT.ID AS 'Event_CPT.ID', Event_Meta.EVTM_ID AS 'Event_Meta.EVTM_ID', Registration.REG_ID AS 'Registration.REG_ID', Registration.EVT_ID AS 'Registration.EVT_ID', Registration.ATT_ID AS 'Registration.ATT_ID', Registration.TXN_ID AS 'Registration.TXN_ID', Registration.TKT_ID AS 'Registration.TKT_ID', Registration.STS_ID AS 'Registration.STS_ID', Registration.REG_date AS 'Registration.REG_date', Registration.REG_final_price AS 'Registration.REG_final_price', Registration.REG_session AS 'Registration.REG_session', Registration.REG_code AS 'Registration.REG_code', Registration.REG_url_link AS 'Registration.REG_url_link', Registration.REG_count AS 'Registration.REG_count', Registration.REG_group_size AS 'Registration.REG_group_size', Registration.REG_att_is_going AS 'Registration.REG_att_is_going', Registration.REG_deleted AS 'Registration.REG_deleted', Transaction.TXN_ID AS 'Transaction.TXN_ID', Transaction.TXN_timestamp AS 'Transaction.TXN_timestamp', Transaction.TXN_total AS 'Transaction.TXN_total', Transaction.TXN_paid AS 'Transaction.TXN_paid', Transaction.STS_ID AS 'Transaction.STS_ID', Transaction.TXN_session_data AS 'Transaction.TXN_session_data', Transaction.TXN_hash_salt AS 'Transaction.TXN_hash_salt', Payment.PAY_ID AS 'Payment.PAY_ID', Payment.TXN_ID AS 'Payment.TXN_ID', Payment.STS_ID AS 'Payment.STS_ID', Payment.PAY_timestamp AS 'Payment.PAY_timestamp', Payment.PAY_method AS 'Payment.PAY_method', Payment.PAY_amount AS 'Payment.PAY_amount', Payment.PAY_gateway AS 'Payment.PAY_gateway', Payment.PAY_gateway_response AS 'Payment.PAY_gateway_response', Payment.PAY_txn_id_chq_nmbr AS 'Payment.PAY_txn_id_chq_nmbr', Payment.PAY_po_number AS 'Payment.PAY_po_number', Payment.PAY_extra_accntng AS 'Payment.PAY_extra_accntng', Payment.PAY_via_admin AS 'Payment.PAY_via_admin', Payment.PAY_details AS 'Payment.PAY_details' 
FROM 
    wp_posts AS Event_CPT LEFT JOIN 
    wp_esp_event_meta AS Event_Meta ON Event_CPT.ID = Event_Meta.EVT_ID LEFT JOIN 
    wp_esp_registration AS Registration ON Registration.EVT_ID=Event_CPT.ID LEFT JOIN 
    wp_esp_transaction AS Transaction ON Transaction.TXN_ID=Registration.TXN_ID LEFT JOIN 
    wp_esp_payment AS Payment ON Payment.TXN_ID=Transaction.TXN_ID 
WHERE 
    Event_CPT.post_type = 'espresso_events' AND 
    Event_CPT.post_status NOT IN ('auto-draft','trash') AND 
    ( (Registration.REG_deleted = 0) OR Registration.REG_ID IS NULL) AND 
    Payment.PAY_amount > 1.000000 
LIMIT 40,10
```