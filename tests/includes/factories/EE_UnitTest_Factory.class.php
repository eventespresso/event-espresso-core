<?php
/**
 * This is a factory for more quickly setting up objects/items needed for EE Unit Tests.
 *
 * Examples of things we might setup using the factory are events, registrations, tickets etc.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 * @todo 		This is not done yet.  Just a shell as an example of what can be done.
 */
class EE_UnitTest_Factory extends WP_UnitTest_Factory {


	/**
	 * @var EE_UnitTest_Factory_For_Event
	 */
	public $event;


	/**
	 * @var EE_UnitTest_Factory_For_Venue
	 */
	public $venue;


	/**
	 * @var EE_UnitTest_Factory_For_Datetime
	 */
	public $datetime;
	public $datetime_chained;

	/**
	 * @var EE_UnitTest_Factory_For_Ticket
	 */
	public $ticket;
	public $ticket_chained;


	/**
	 * @var EE_UnitTest_Factory_For_Price
	 */
	public $price;
	public $price_chained;


	/**
	 * @var EE_UnitTest_Factory_For_Price_Type
	 */
	public $price_type;
	public $price_type_chained;


	/**
	 * @var EE_UnitTest_Factory_For_Registration
	 */
	public $registration;
	public $registration_chained;


	/**
	 * @var EE_UnitTest_Factory_For_Transaction
	 */
	public $transaction;
	public $transaction_chained;



	/**
	 * @var EE_UnitTest_Factory_For_Attendee
	 */
	public $attendee;
	public $attendee_chained;



	/**
	 * @var EE_UnitTest_Factory_For_Status
	 */
	public $status;



	/**
	 *
	 * @var EE_UnitTest_Factory_For_Payment
	 */
	public $payment;




	/**
	 * @type EE_UnitTest_Factory_For_Message
	 */
	public $message;




	/**
	 * @var EE_UnitTest_Factory_for_Specific_Builds
	 */
	public $complex_factory;

    /**
     * @var string
     */
    private $timezone;




	public function __construct() {
        $this->setTimezone(get_option('timezone_string'));
		parent::__construct();

		//simple factories
		//setup any properties containing various test factory objects. EE_Test_Factories should extend the
		// WP_UnitTest_Factory_for_Thing abstract class ( @see wp tests/includes/EE_UnitTest_Factory.class.php).
		$this->event = new EE_UnitTest_Factory_For_Event( $this );
		$this->venue = new EE_UnitTest_Factory_For_Venue( $this );
		$this->datetime = new EE_UnitTest_Factory_For_Datetime( $this );
		$this->datetime_chained = new EE_UnitTest_Factory_For_Datetime( $this, true );
		$this->ticket = new EE_UnitTest_Factory_For_Ticket( $this );
		$this->ticket_chained = new EE_UnitTest_Factory_For_Ticket( $this, true );
		$this->price = new EE_UnitTest_Factory_For_Price( $this );
		$this->price_chained = new EE_UnitTest_Factory_For_Price( $this, true );
		$this->price_type = new EE_UnitTest_Factory_For_Price_Type( $this );
		$this->price_type_chained = new EE_UnitTest_Factory_For_Price_Type( $this, true );
		$this->registration = new EE_UnitTest_Factory_For_Registration( $this );
		$this->registration_chained = new EE_UnitTest_Factory_For_Registration( $this, true );
		$this->transaction = new EE_UnitTest_Factory_For_Transaction( $this );
		$this->transaction_chained = new EE_UnitTest_Factory_For_Transaction( $this, true );
		$this->attendee = new EE_UnitTest_Factory_For_Attendee( $this );
		$this->attendee_chained = new EE_UnitTest_Factory_For_Attendee( $this, true );
		$this->status = new EE_UnitTest_Factory_For_Status( $this );
		$this->payment = new EE_UnitTest_Factory_For_Payment( $this );
		$this->message = new EE_UnitTest_Factory_For_Message( $this );

		//complex relationship factory
		//This is a unique factory (not extending WP_UnitTest_Factory_for_Thing) that builds EE objects from a given special formatted
		//setup array outlining object instantiation and relationships.
		$this->complex_factory = new EE_UnitTest_Factory_for_Specific_Builds( $this );

	}


    /**
     * @return string
     */
    public function timezone()
    {
        return $this->timezone;
    }


    /**
     * @param string $timezone
     * @throws EE_Error
     */
    public function setTimezone($timezone)
    {
        if (! $timezone || ($timezone === $this->timezone && $this->timezone)) {
            return;
        }
        $this->timezone = $timezone;
        EEM_Event::instance()->set_timezone($timezone);
        EEM_Datetime::instance()->set_timezone($timezone);
        EEM_Ticket::instance()->set_timezone($timezone);
        EEM_Registration::instance()->set_timezone($timezone);
        EEM_Transaction::instance()->set_timezone($timezone);
        EEM_Payment::instance()->set_timezone($timezone);
        EEM_Message::instance()->set_timezone($timezone);
    }


}


