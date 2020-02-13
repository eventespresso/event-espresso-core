# Models' Primary Keys and IDs
In Event Espresso code, the model's "primary key" refers to its field of type `EE_Primary_Key_Field_Base`.
On model objects, the corresponding field value is either an integer (eg on events and registrations), 
short string (eg countries and statuses), or they instead have a combined key (eg term relationships).

This article especially explains the strange situation with Event Espresso models that have no primary key field. It assumes you've already
read about [model querying](model-querying.md) and [Using EE4 Model Objects](using-ee4-model-objects.md).

## Background
Early in its development, the Event Espresso team decided all models would have a primary key in order to simplify querying.
And so it was. Until we realized we wanted to use the model system to query for terms and taxonomies, which are stored in
WordPress core tables, one of which, `wp_term_relationships` has an index primary key using two columns. That was when support for models
with no primary key field was added.

## Models with Primary Keys/IDs
Although most models use a different name for their primary key field, all model object have a method `EE_Base_Class::ID()` which retrieves
the value of the primary key.
eg
```php
$country = EEM_Country::instance()->get_one_by_ID('US');
echo $country->ID(); //echoes 'US'

$state = EEM_state::instance()->get_one_by_ID(123);
echo $state->ID(); // echoes '123'
```
You can also ask the model the name of the primary key using `EEM_Base::primary_key_name()`, and the field object using
`EEM_Base::get_primary_key_field()`.

Eg, the following query will fetch all answers where its field `ANS_ID` is less than 100:
```php
EEM_Answer::instance()->get_one(
    [
        [
            EEM_Answer::instance()->primary_key_name() => ['<', 100]
        ]
    ]
);
```

This is handy when writing dynamic queries (eg the REST API code used it extensively).

## Models with NO Primary Key
That's well and good for models with primary keys, but some don't. Unfortunately, you 
can't use it when one of the models could be `EEM_Term_Relationship` (currently the only model that doesn't have a primary key).

### Combined Keys
Instead of having one column in the table's primary key index, they have several (ie, it's unique for that combination of columns.) 
Eg the table `wp_term_relationships`'s primary key uses the columns `object_id` and `term_taxonomy_id`. So many rows can
have the same value for `object_id`, only one row can have the same avlue for `object_id` AND `term_taxonomy_id`.
In Event Espresso's code, having a combined key like that is indicated by the model having an entry in `_indexes` of type
`EE_Primary_Key_Index` with multiple columns. eg
```php
$this->_indexes = array(
    'PRIMARY' => new EE_Primary_Key_Index(array('object_id', 'term_taxonomy_id')),
);
```
(Note: currently entries in `_indexes` only *imply* there is a corresponding index on the table, they don't create one. 
That's done in the [data migration scripts.](../H--Data-Migration-System/README.md).)
 
### EE_Base_Class::ID()
For all models with a single primary key column, their `EE_Base_Class::ID()` method returns a scalar integer or string.
To remain consistent with that, instead of having models with multiple columns in their primary key return an array,
they instead return a URL-encoded string. Eg

```php
$term_relationship = EEM_Term_Relationship::instance()->get_one();
echo $term_relationship->ID();
```
will echo something lik `object_id=123&term_taxonomy_id=345`.

### EEM_Base::get_index_primary_key_string()
If you want to retrieve a string like that even if the model has a primary key field, use `EE_Base_Class::get_index_primary_key_string()`,
eg

```php
$event_model = EEM_Event::instance();
$event = $event_model->get_one();
echo $event_model->get_index_primary_key_string($event->model_field_array());
```
will echo something like `EVT_ID=123`.

You can sometimes use that "primary key string" in place of a scalar ID. Eg, `EEM_Base::get_one_by_ID()` will accept it.

Eg, all of these are fine:
```php
$term_relationship = EEM_Term_Relationship::instance()->get_one_by_ID('object_id=123&term_taxonomy_id=456');
$event = EEM_Event::instance()->get_one_by_ID(123);
$event2 = EEM_Event::instance()->get_one_by_ID('EVT_ID=123');
```

However, support like that isn't yet complete. For example, the following methods won't support a "primary key string"
instead of a regular ID:

* `EEM_Base::update_by_ID()`
* `EEM_Base::delete_by_ID()`
* `EEM_Base::exists_by_ID()`

For those, and probably other situations, you'll need to convert the "primary key string" into an array of [query params](model-query-params.md).

### EEM_Base::parse_index_primary_key_string
This method takes the primary key string and converts it into an array where the keys are the field names and values
are the values. Eg
```php
$term_relationship_model = EEM_Term_Relationship::instance(); 
$term_relationship = $term_relationship_model->get_one();
$primary_key_string = $term_relationship->ID();
echo $primary_key_string;
var_dump($term_relationship_model->parse_index_primary_key_string($primary_key_string));
```

will echo something like 

```php
"object_id=143&term_taxonomy_id=234"

array(1) {
  ["object_id"]=>
  int(143),
  ["term_taxonomy_id"]=>
  int(234)
}
```

### EEM_Base::alter_query_params_to_restrict_by_ID
You can skip a step by using this method, which returns an array of query params from the primary key string (or a regular ID, too.)
Eg

```php
$term_relationship_model = EEM_Term_Relationship::instance();
$term_relationship = $term_relationship_model->get_one(
    $term_relationship_model->alter_query_params_to_restrict_by_ID('object_id=123&term_taxonomy_id=345')
);
```
