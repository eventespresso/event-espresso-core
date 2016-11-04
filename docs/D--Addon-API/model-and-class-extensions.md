# Model and Class Extensions

A central tenet of object-oriented programming is cohesion, part of which is organizing functions and methods close to the data they operate on.  Eg, a function for searching for events attended by a particular attendee should be kept in the Event model (whose job is to query for events from the database), not amongst widget or templating code. This is easy for Event Espresso core developers to do: just add a method named 'get_all_events_for_attendee()' onto EEM_Event and we're done. But what about non-core Event Espresso developers? They can submit a pull request with the change, but the more feasible option is to add a model extension which magically adds that method onto EEM_Event.

## Model Extensions

Model and Class extensions are similar in spirit to object inheritance, but have the crucial advantage that the original model receives added functionality and properties, not grand-child classes. Specifically, model extensions allow addon developers to add methods, tables, fields, and model relations onto existing models. For example, to add the above-mentioned method EEM_Event::get_all_events_for_attendee(), we could create the following class:

```php
class EEME_My_Addon_Event extends EEME_Base{
	function __construct() {
		$this->_model_name_extended = 'Event';
		parent::__construct();
	}
	/**
	 * Gets all events attended by an attendee
	 * @param int|EE_Attendee $attendee
	 * @return EE_Event[]
	 */
	function ext_get_all_events_for_attendee( $attendee = FALSE ){
		$attendee_ID = EEM_Attendee::instance()->ensure_is_ID($attendee);
		return $this->_->get_all(array(array('Registration.ATT_ID'=>$attendee_ID)));
	}
}
```

Important to notice:

* this class' name begins with EEME_, but after that can be anything, but preferably it should relate to your addon's name and the model being extended
* the class extends EEME_Base, the base class for all model extensions
* the constructor specifically states which model is being extended
* the only function begins with the string "ext_" and then the name of the function we wanted to add to EEM_Event
* the function `ext_get_all_events_for_attendee` receives an argument exactly how we would want to pass it, and it returns the results exactly how we would want them to be returned
* inside the function `ext_get_all_events_for_attendee`, a mysterious class property named simplye "_" (underscore) is used. This "_" property is the model we are extending, in this case EEM_Event. So `$this->_` is equivalent to `EEM_Event::instance()`

Once you have registered your addon, and included the filepath to a folder containing the above code in a file named EEME_My_Addon_Event.model_ext.php, you can use the method `EEM_Event::get_all_events_for_attendee()`as if it were statically declared on `EEM_Event`. Eg

```php
$att = EEM_Attendee::instance()->get_one_by_ID( intval( $_GET[ 'ATT_ID' ] ) );
$events = EEM_Event::instance()->get_all_events_for_attendee( $att );
echo $att->fname() . " is going to:";
foreach( $events as $event ){
	echo $event->name() . ",";
}
```

Which would print out something like

```
Bob is registered for New Years Party 2014, Family BBQ, Company Lunch
```

Another benefit of using model extensions is the ability to add other tables, fields, and model relations onto existing models. For example, inside event-espresso-core/tests/mocks/core/db_model_extensions we added a foreign key from attendees to transactions using the following model extension:

```php
class EEME_Mock_Attendee extends EEME_Base{
	function __construct() {
		$this->_model_name_extended = 'Attendee';
		$this->_extra_tables = array(
			'Mock_Attendee_Meta' => new EE_Secondary_Table('esp_mock_attendee_meta', 'MATTM_ID', 'ATT_ID' )
		);
		$this->_extra_fields = array('Mock_Attendee_Meta'=>array(
			'MATTM_ID'=> new EE_DB_Only_Int_Field('MATTM_ID', __('Mock Attendee Meta Row ID','event_espresso'), false),
			'MATT_ID_fk'=>new EE_DB_Only_Int_Field('ATT_ID', __("Foreign Key to Attendee in Post Table", "event_espresso"), false),
			'ATT_foobar'=>new EE_Foreign_Key_Int_Field('ATT_foobar', __("Foobar", 'event_espresso'), true,0,'Transaction')));
		$this->_extra_relations = array('Transaction'=>new EE_Belongs_To_Relation());
		parent::__construct();
	}
	function ext_foobar( $arg1 = FALSE ){
		return $this->_->get_all(array(array('Transaction.TXN_ID'=>$arg1)));
	}
}
```

Things to note:

* We added a table 'esp_mock_attendee_meta' with alias 'Mock_Attendee_Meta' which is another meta table for attendees, but specific to this "Mock" addon. This table just has a primary key, a foreign key to the attendee's post id, and a foreign key to the transactions table named 'ATT_foobar' ('TXN_ID' would have probably been a better, more descriptive, name).
* the function `ext_foobar` can be called like so `EEM_Attendee::instance()->foobar( 1 )` to get the transaction directly related to the attendee


## Class Extensions

Are similar to model extensions, but simpler. They cannot add any properties onto classes, only methods. This is an example model extension from event-espresso-core/tests/mocks/core/db_class_extensions/EEE_Mock_Attendee.class_ext.php:

```php
class EEE_Mock_Attendee extends EEE_Base_Class{

	public function __construct(){
		$this->_model_name_extended = 'Attendee';
		parent::__construct();
	}

	/**
	 * Samples function that can be called on any EE_Attendee when this class extension
	 * is registered
	 * @param type $txn_id
	 * @return boolean
	 */
	function ext_foobar( $txn_id = FALSE ){
                if( $this->_->fname() == 'Luke' ){
                     echo "LUke I am your father";
                }
		return TRUE;
	}
}
```

This just adds a method called `foobar` onto each `EE_Attendee` instantiated. To note:

* added the method `foobar` onto each `EE_Attendee`
* that method also uses a mysterious "_" (underscore) property which again refers to the object being extended, in this case the `EE_Attendee` being called

## Under the Hood

So what is this wizardy that allows you to magically add methods onto existing clases? Basically it's just normal WordPress filters and use of the magic method `__call`. Look at `EEM_Base::__call()` and `EE_Base_Class::call()`, and `EEME_Base` and `EEE_Base` for the details