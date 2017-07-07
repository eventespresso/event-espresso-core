<?php

namespace EventEspresso\core\services\activation;

use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class RequestType
 * DTO for transmitting info regarding the activation request type for core or an addon
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson, Brent Christensen
 * @since         4.9.40
 */
class RequestType
{


    /**
     * indicates this is a 'normal' request. Ie, not activation, nor upgrade, nor activation.
     * So examples of this would be a normal GET request on the frontend or backend, or a POST, etc
     */
    const NORMAL = 0;

    /**
     * Indicates this is a brand new installation of EE so we should install
     * tables and default data etc
     */
    const NEW_ACTIVATION = 1;

    /**
     * we've detected that EE has been reactivated (or EE was activated during maintenance mode,
     * and we just exited maintenance mode). We MUST check the database is setup properly
     * and that default data is setup too
     */
    const REACTIVATION = 2;

    /**
     * indicates that EE has been upgraded since its previous request.
     * We may have data migration scripts to call and will want to trigger maintenance mode
     */
    const UPGRADE = 3;

    /**
     * TODO  will detect that EE has been DOWNGRADED. We probably don't want to run in this case...
     */
    const DOWNGRADE = 4;


    /**
     * Stores which type of request this is, options being one of the REQUEST_TYPE_* constants above.
     * It can be a brand-new activation, a reactivation, an upgrade, a downgrade, or a normal request.
     *
     * @var int $request_type
     */
    private $request_type;


    /**
     * Whether or not there was a non-micro version change in EE core version during this request
     *
     * @var boolean
     */
    private $major_version_change;



    /**
     * RequestType constructor.
     *
     * @param int  $request_type
     * @param bool $major_version_change
     * @throws InvalidArgumentException
     */
    public function __construct($request_type = 0, $major_version_change = false)
    {
        $this->setRequestType($request_type);
        $this->setMajorVersionChange($major_version_change);
    }



    /**
     * @return array
     */
    public function validRequestTypes()
    {
        return array(
            RequestType::NORMAL,
            RequestType::NEW_ACTIVATION,
            RequestType::REACTIVATION,
            RequestType::UPGRADE,
            RequestType::DOWNGRADE,
        );
    }



    /**
     * @return int
     */
    public function getRequestType()
    {
        return $this->request_type;
    }



    /**
     * @param int $request_type
     * @throws InvalidArgumentException
     */
    public function setRequestType($request_type)
    {
        if (! in_array($request_type, $this->validRequestTypes(), true)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'The supplied value (%1$s) for the request type is invalid. Please use one of the constants on "%2$s"',
                        'event_espresso'
                    ),
                    $request_type,
                    get_class($this)
                )
            );
        }
        $this->request_type = $request_type;
    }



    /**
     * @return bool
     */
    public function isMajorVersionChange()
    {
        return $this->major_version_change;
    }



    /**
     * @param bool $major_version_change
     */
    public function setMajorVersionChange($major_version_change)
    {
        $this->major_version_change = filter_var($major_version_change, FILTER_VALIDATE_BOOLEAN);
    }




}
