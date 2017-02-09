<?php use EventEspresso\core\exceptions\InvalidSessionDataException;
use EventEspresso\core\services\database\TransientManager;

if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Session_Mock
 *
 * For unit testing EE_Session
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Brent Christensen
 * @since                4.7
 *
 */
class EE_Session_Mock extends EE_Session {

	/**
	 * @type EE_Session_Mock $_instance
	 */
	private static $_instance;

    /**
     * @var TransientManager
     */
    private $expired_transient_manager;



    /**
     * @singleton method used to instantiate class object
     * @param TransientManager $expired_transient_manager
     * @param EE_Encryption    $encryption
     * @return EE_Session_Mock
     * @throws EE_Error
     * @throws InvalidSessionDataException
     */
	public static function instance(
	    TransientManager $expired_transient_manager = null,
        EE_Encryption $encryption = null
    ) {
		// check if class object is instantiated
		// session loading is turned ON by default, but prior to the init hook, can be turned back OFF via:
		// add_filter( 'FHEE_load_EE_Session', '__return_false' );
		if ( ! self::$_instance instanceof EE_Session_Mock ) {
			self::$_instance = new self($expired_transient_manager, $encryption );
		}
		return self::$_instance;
	}



    /**
     * protected constructor to prevent direct creation
     *
     * @Constructor
     * @access protected
     * @param TransientManager $expired_transient_manager
     * @param EE_Encryption    $encryption
     * @throws EE_Error
     * @throws InvalidSessionDataException
     */
	protected function __construct(TransientManager $expired_transient_manager, EE_Encryption $encryption = null) {
		add_filter( 'FHEE_load_EE_Session', '__return_false' );
        parent::__construct($expired_transient_manager, $encryption );
        $this->expired_transient_manager = $expired_transient_manager;
        $this->encryption = $encryption;
    }


	public function lifespan() {
		return  60 * MINUTE_IN_SECONDS;
	}



	/**
	 * @return EE_Encryption
	 */
	public function encryption() {
		return $this->encryption;
	}



}
// End of file EE_Session_Mock.core.php
// Location: /tests/mocks/core/EE_Session_Mock.core.php