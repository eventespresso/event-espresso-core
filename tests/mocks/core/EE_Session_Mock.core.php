<?php use EventEspresso\core\exceptions\InvalidSessionDataException;
use EventEspresso\core\services\cache\CacheStorageInterface;

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
     * @singleton method used to instantiate class object
     * @param CacheStorageInterface $cache_storage
     * @param EE_Request|null       $request
     * @param EE_Encryption         $encryption
     * @return EE_Session_Mock
     */
	public static function instance(
        CacheStorageInterface $cache_storage = null,
        EE_Request $request = null,
        EE_Encryption $encryption = null
    ) {
		// check if class object is instantiated
		// session loading is turned ON by default, but prior to the init hook, can be turned back OFF via:
		// add_filter( 'FHEE_load_EE_Session', '__return_false' );
		if ( ! self::$_instance instanceof EE_Session_Mock ) {
			self::$_instance = new self($cache_storage, $request, $encryption);
		}
		return self::$_instance;
	}



    /**
     * protected constructor to prevent direct creation
     *
     * @Constructor
     * @param CacheStorageInterface $cache_storage
     * @param EE_Request            $request
     * @param EE_Encryption         $encryption
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
	protected function __construct(CacheStorageInterface $cache_storage, EE_Request $request, EE_Encryption $encryption = null) {
		add_filter( 'FHEE_load_EE_Session', '__return_false' );
        parent::__construct($cache_storage, $request, $encryption );
        $this->cache_storage = $cache_storage;
        $this->request = $request;
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
