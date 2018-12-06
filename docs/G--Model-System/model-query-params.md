# Model Query Params

This documents the structure for the `$query_params` argument passed into [several model methods](model-querying.md).
 
`$query_params` is a configuration array that you can use to inform the nature of the query to make. The array can have the following indexes:

## `0` (where conditions)
This provides  the `where` conditions for the query.

**Simple Example**:
```php
$where_params = array(
    'QST_display_text' => 'Are you bob?',
    'QST_admin_text'   => 'Determine if user is bob',
);
EEM_Question::instance()->get_all(array($where_params));
```
This becomes (in the sql query):
```sql
..WHERE QST_display_text = 'Are you bob?' 
    AND QST_admin_text = 'Determine if user is bob'...
```
### Adding where conditions based on related models
Prepend the model's name onto the field name.

**Example:**
```php
EEM_Event::instance()->get_all(
    array(
        array('Venue.VNU_ID'=>12)
    )
);
```
This becomes (in the sql query):
```sql
SELECT * FROM wp_posts AS Event_CPT 
  LEFT JOIN wp_esp_event_meta AS Event_Meta ON Event_CPT.ID = Event_Meta.EVT_ID 
  LEFT JOIN wp_esp_event_venue AS Event_Venue ON Event_Venue.EVT_ID=Event_CPT.ID 
  LEFT JOIN wp_posts AS Venue_CPT ON Venue_CPT.ID=Event_Venue.VNU_ID 
  LEFT JOIN wp_esp_venue_meta AS Venue_Meta ON Venue_CPT.ID = Venue_Meta.VNU_ID 
  WHERE Venue_CPT.ID = 12
```
Notice that automatically took care of joining events to venues (even when each of those models actually consisted of two tables).

Also, you may chain the model relations together. Example, instead of just having `Venue.VNU_ID`, you could have `Registration.Attendee.ATT_ID` as a field on a query for events (because events are related to Registrations, which are related to Attendees). You can take it even further with `Registration.Transaction.Payment.PAY_amount` etc.
### Different operators
To change the operator (from the default of '='), change the value to an numerically-indexed array, where the first item in the list is the operator.

**Example:**
```php
$where_params = array(
    'QST_display_text' => array('LIKE', '%bob%'),
    'QST_ID'           => array('<', 34),
    'QST_wp_user'      => array('in', array(1, 2, 7, 23)),
);
EEM_Question::instance()->get_all(array($where_params));
```
This becomes in SQL:
```sql
...WHERE QST_display_text LIKE '%bob%' 
  AND QST_ID < 34 
  AND QST_wp_user IN (1,2,7,23)...
```
Valid operators so far: `=`, `!=`,`<`,`<=`,`>`,`>=`, `LIKE`, `NOT LIKE`, `IN` (followed by numerically indexed array), `NOT IN` (followed by numerically indexed array), `BETWEEN` (followed by an array with exactly 2 date strings), `IS NULL` and `IS NOT NULL`.  

Values can be a `string`, `int`, or `float`.  They can also be arrays if the operator is `IN` (or one of its variants).

### Operator conditions using field names
To indicate if the value is a field, simply provide a third array item (true) to the operator-value array like so:
 
```php
$where_params = array( 
    'DTT_reg_limit' => array('>', 'DTT_sold', true)
);
EEM_Datetime::instance()->get_all(array( $where_params ));
```
This becomes in SQL:
```sql
..WHERE DTT_reg_limit > DTT_sold...
```
**Note:** You can also use related model field names like you would for any other field name.  For example, you could use this if you were querying `EEM_Ticets` because datetimes are related to tickets:

```php
$where_params = array(
    'Datetime.DTT_reg_limit' => array('=','Datetime.DTT_sold',true)
);
EEM_Ticket::instance()->get_all(array($where_params));
```
### Doing different join conditions
By default, all where conditions are joined by `AND`.  To override this, add an array key `OR` (or`AND`). Example:
```php
$where_params = array(
    'OR' => array(
        'TXN_ID' => 23 ,
        'TXN_timestamp' => 345678912
    )
);
EEM_Transaction::instance()->get_all(array($where_params));
```
This becomes in SQL:
```sql
..WHERE TXN_ID = 23 OR TXN_timestamp = 345678912...
```
To negate an entire set of conditions, use `NOT` as an array key. Example:
```php
$where_params = array(
    'NOT'=>array('TXN_total' => 50, 'TXN_paid'=>23)
);
EEM_Transaction::instance()->get_all(array($where_params));
```
This becomes in SQL:
```sql
...WHERE ! (TXN_total =50 AND TXN_paid =23)...
```

**NOTE: The 'glue' used to join each condition will continue to be what you last specified.** It is `AND` by default, but if you had previously specified to use `OR` to join, then `OR` is used for subsequent conditions in the array until you specify an `AND` again.

For example:
```php
$where_params = array(
    'OR'  => array(
        'NOT' => array('TXN_total' => 50, 'TXN_paid' => 23),
    ),
    'AND' => array('TXN_ID' => 1, 'STS_ID' => 'TIN'),
);
EEM_Transaction::instance()->get_all(array($where_params));
```
This becomes in SQL:
```sql
...WHERE ! (TXN_total =50 OR TXN_paid =23) 
    AND TXN_ID=1 
    AND STS_ID='TIN'...
```
These conditions can be nested indefinitely. For example:
```php
$where_params = array(
    'OR' => array(
        'TXN_total' => 23,
        'NOT'       => array(
            'TXN_timestamp' => 345678912,
            'AND'           => array('TXN_paid' => 53, 'STS_ID' => 'TIN'),
        ),
    ),
);
EEM_Transaction::instance()->get_all(array($where_params));
```
This becomes in SQL:
```sql
...WHERE TXN_total = 23 
  OR ! (
    TXN_timestamp = 345678912 
    OR (TXN_paid = 53 AND STS_ID = 'TIN')
  )..."
```
### **GOTCHA!** Dealing with unique array keys problem.
Because array keys must be unique, it's impossible to place two or more where conditions applying to the same field.  In the following example, PHP enforces the array keys must be unique, thus removing the first two array entries with key `PAY_timestamp`:
```php
$where_params = array(
    'PAY_timestamp' => array('>', $start_date),
    'PAY_timestamp' => array('<', $end_date),
    'PAY_timestamp' => array('!=', $special_date),
);
EEM_Payment::instance()->get_all(array($where_params));
```
Becomes in SQL:
```sql
...PAY_timestamp !=  4234232...
```
To overcome this, you can add a `*` character to the end of the field's name, followed by anything you want.  These will be removed when generating the SQL string, but allow for the array keys to be unique.  For example, you could rewrite the previous query conditions as:
```php
$where_params = array(
    'PAY_timestamp'     => array('>', $start_date),
    'PAY_timestamp*1st' => array('<', $end_date),
    'PAY_timestamp*2nd' => array('!=', $special_date),
);
EEM_Payment::instance()->get_all(array($where_params));
```
which becomes in SQL:
```sql
...PAY_timestamp > 123412341 
  AND PAY_timestamp < 2354235235234 
  AND PAY_timestamp != 1241234123...
```
This can be applied to common operators too, example:
```php
$where_params = array(
    'OR'          => array('REG_ID' => 3, 'Transaction.TXN_ID' => 23),
    'OR*whatever' => array('Attendee.ATT_fname' => 'bob', 'Attendee.ATT_lname' => 'wilson'),
);
EEM_Registration::instance()->get_all(array($where_params));
```
## `limit`
This can be either an `integer`, `string` or `array`.  It is used to add a limit to the query just like the SQL `limit` clause. Any of the following would become valid SQL clauses:
```php
$query_params = array( 'limit' => 23 )
EEM_Registration::instance()->get_all($query_params);
$query_params = array('limit' => '25, 50');
EEM_Transaction::instance()->get_all($query_params);
$query_params = array( 'limit' => array( 23, 42 ) );
EEM_Event::instance()->get_all($query_params);
```
Remember, when you provide two numbers for the limit, the 1st number is the _offset_ and the second is the _limit_.
## `on_join_limit`
This allows the setting of a special join with an internal limit so you can do paging on one-to-many multi-table-joins.  Send an array in the following format:
```
$query_params = array('on_join_limit' => array('table_alias', array(1, 2)));
```
## `order_by`
This provides the instructions for the ordering clause in the query.  Provide the name of a column to order by, or an array where keys are field names and values are either `ASC` or `DESC`.  An example:
```php
$query_params = array(
    'order_by'=>array('STS_ID'=>'ASC','REG_date'=>'DESC')
);
EEM_Registration::instance()->get_all($query_params);
```
This becomes in SQL:
```sql
...ORDER BY STS_ID ASC, REG_date DESC..
```
Like where conditions, these fields can be on related models. For example, this `order_by` condition would be valid for any model that has `Registration` as a relation (like `Event`, `Attendee`, `Price`, `Datetime` etc):
```php
$query_params = array(
    'order_by'=>array('Registration.Transaction.TXN_amount'=>'ASC')
);
```
## `order`
If `order_by` is used and it's value is a string (not an array), then `order` specifies whether to order the field in ascending or descending order.  Acceptable values are `ASC`, or `DESC`. If, `order_by` isn't used, but `order` is, then it is assumed you want to order the results by the primary key,  For example, the following query will join with the Datetime model's table(s) and order by its field `DTT_START`:
```php
EEM_Event::instance()->get_all(
    array('order_by' => 'Datetime.DTT_EVT_start', 'order' => 'ASC')
);
```
Whereas, the following example will assume to order by the primary key for the `Registration` model which is `REG_ID`:
```php
EEM_Registration::instance()->get_all(array('order '=> 'ASC'));
```
## `group_by`
Provides the name of the field or an array of fields to group the results by.  Examples: 
- `array( 'group_by' => 'VNU_ID' )`
- `array( 'group_by' => array( 'EVT_name', 'Registration.Transaction.TXN_total') )`

If no group is specified, and a limit is set, the model system will automatically group by the model's primary key (or combined primary keys).  This avoids some weirdness that results when using limits, a lot of joins, and no group by (see https://events.codebasehq.com/projects/event-espresso/tickets/9389).

## `having` 
This behaves exactly like the `where` conditions in the array, except these conditions apply to the grouped results (whereas the `where` conditions apply to the pre-grouped results).

## `force_join`
This forces a join in the query with the named models. It should be a numerically indexed array, where values are models to be joined in the query.  For example, `array('Attendee', 'Payment', 'Datetime' )`.  You may join with transient models using a period, for example `Registration.Transaction.Payment`. You will probably only want to do this in hopes of increasing efficiency, as related models which belongs to the current model (ie, the current model has a foreign key to them, like how Registration belongs to Attendee) can be cached in order to avoid future queries.

## `default_where_conditions`
This can be set to `none`, `this_model_only`, `other_models_only`, or `all`.  
### `minimum`
Set this value to disable all but essential default where conditions. For example, when querying custom post types (eg events, venues, attendees) draft and trashed ones are excluded, but this setting will make them returned as well. However, this will setting will ensure only posts of the correct type are returned (as opposed to `none`).
### `none`
Only for advanced usage. A step beyond `minimum`, this means that when querying events you may get other post types returned. Usually `minimum` is a better option.
### `other_models_only`
Set this value to disable _only_ **this** model's default where conditions.
### `this_model_only`
Set this value to only use _this_ model's default where conditions.
### `all`
This is used to ensure _all_ default where conditions for the query are used.

## `caps`
This query parameter controls what capability requirements apply to the query. For example, should we _not_ apply any capabilities/permissions/restrictions and return everything? Or should we only show the current user items they should be able to view on the frontend/backend/edit/delete?  This can be set to `none` (default), `read_frontend`, `read_backend`, `edit`, or `delete`

## `exclude_protected`
This query parameter indicates whether to remove model objects related to password-protected models. Uses the model property `$model_chain_to_password` to determine which related model (if any) has a password which may restrict who can view model objects for this model.. 