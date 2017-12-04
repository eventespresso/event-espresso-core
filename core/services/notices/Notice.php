<?php

namespace EventEspresso\core\services\notices;

use EventEspresso\core\domain\services\capabilities\CapCheck;
use EventEspresso\core\domain\services\capabilities\CapCheckInterface;
use EventEspresso\core\domain\services\capabilities\PublicCapabilities;
use EventEspresso\core\domain\services\capabilities\RequiresCapCheckInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\route\RouteMatcher;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Class Notice
 * DTO for temporarily holding notification information until it can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
final class Notice implements NoticeInterface, RequiresCapCheckInterface
{

    const ERROR       = 'error';

    const SUCCESS     = 'success';

    const ATTENTION   = 'attention'; // alias for warning

    const INFORMATION = 'information';


    /**
     * @var
     */
    private $identifier;

    /**
     * @var string $type
     */
    private $type;


    /**
     * @var string $message
     */
    private $message;


    /**
     * @var string $file
     */
    private $file;


    /**
     * @var string $func
     */
    private $func;


    /**
     * @var string $line
     */
    private $line;


    /**
     * @var boolean $dismissible
     */
    private $dismissible;



    /**
     * @var CapCheckInterface
     */
    private $capability_checker;


    /**
     * @var bool
     */
    private $is_persistent;


    /**
     * @var string
     */
    private $route_match_config_identifier;


    /**
     * @var  bool
     */
    private $override_dismissed;


    /**
     * @var bool
     */
    private $dismissed;


    /**
     * @var bool
     */
    private $processed;


    /**
     * @var bool
     */
    private $purge;



    /**
     * @var bool
     */
    private $show_on_next_request;


    /**
     * Notice constructor.
     *
     * @param string $type
     * @param string $identifier
     * @param string $message
     * @throws InvalidDataTypeException
     */
    public function __construct(
        $type,
        $identifier,
        $message
    ) {
        $this->setIdentifier($identifier);
        $this->setType($type);
        $this->setMessage($message);
        $this->is_persistent = false;
        $this->processed = false;
        //set defaults
        $this->setDismissible()
             ->setShowOnNextRequest(true)
             ->overrideDismissed(false)
             ->setDismissed(false)
             ->setPurge(false)
             ->setRouteMatchConfigIdentifier(RouteMatcher::ROUTE_ANY);
    }


    /**
     * @param $identifier
     * @throws InvalidDataTypeException
     */
    private function setIdentifier($identifier)
    {
        if (empty($identifier) || ! is_string($identifier)) {
            throw new InvalidDataTypeException(
                '$identifier',
                $identifier,
                esc_html__('non empty string', 'event_espresso')
            );
        }
        $this->identifier = $identifier;
    }


    /**
     * @return string
     */
    public function getIdentifier()
    {
        return $this->identifier;
    }


    /**
     * Internally used to set the cap checker.
     *
     * @param CapCheckInterface $capability_checker
     */
    private function setCapabilityCheck(CapCheckInterface $capability_checker)
    {
        $this->capability_checker = $capability_checker;
    }


    /**
     * Returns what capability is required for viewing.  Defaults to publicly viewable if not explicitly set.
     *
     * @return CapCheckInterface
     */
    public function getCapCheck()
    {
        return $this->capability_checker instanceof CapCheckInterface
            ? $this->capability_checker
            : new PublicCapabilities('', 'read notice');
    }



    /**
     * @return array
     */
    private function types()
    {
        return (array) apply_filters(
            'FHEE__EventEspresso_core_services_notices_Notice__types',
            array(
                self::ERROR,
                self::SUCCESS,
                self::ATTENTION,
                self::INFORMATION,
            )
        );
    }



    /**
     * @return string
     */
    public function type()
    {
        return $this->type;
    }



    /**
     * @return string
     */
    public function message()
    {
        return $this->message;
    }



    /**
     * @return string
     */
    public function file()
    {
        return $this->file === null ? '' : $this->file;
    }



    /**
     * @return string
     */
    public function func()
    {
        return $this->func === null ? '' : $this->func;
    }



    /**
     * @return string
     */
    public function line()
    {
        return $this->line === null ? '' : $this->line;
    }


    /**
     * @return bool
     */
    public function isDismissible()
    {
        return $this->dismissible;
    }


    /**
     * @param string $type
     * @throws InvalidDataTypeException
     */
    private function setType($type)
    {
        if (! in_array($type, $this->types(), true)) {
            throw new InvalidDataTypeException(
                '$type',
                $type,
                $this->invalidTypeMessage()
            );
        }
        $this->type = $type;
    }



    /**
     * gets the $invalid_type_message string
     */
    private function invalidTypeMessage()
    {
        return apply_filters(
            'FHEE__EventEspresso_core_services_notices_Notice__invalidTypeMessage',
            sprintf(
                esc_html__(
                    ' one of the following notice types was expected: %1$s %2$s',
                    'event_espresso'
                ),
                '<br />',
                var_export($this->types(), true)
            )
        );
    }



    /**
     * @param string $message
     * @throws InvalidDataTypeException
     */
    private function setMessage($message)
    {
        if (empty($message) || ! is_string($message)) {
            throw new InvalidDataTypeException(
                '$message',
                $message,
                esc_html__('non empty string', 'event_espresso')
            );
        }
        $this->message = $message;
    }


    /**
     * @param string $file
     * @return Notice
     * @throws InvalidDataTypeException
     */
    private function setFile($file)
    {
        if ($this->type === self::ERROR && (empty($file) || ! is_string($file))) {
            throw new InvalidDataTypeException(
                '$file',
                $file,
                esc_html__('non empty string', 'event_espresso')
            );
        }
        $this->file = $file;
        return $this;
    }


    /**
     * @param string $func
     * @return Notice
     * @throws InvalidDataTypeException
     */
    private function setFunc($func)
    {
        if ($this->type === self::ERROR && (empty($func) || ! is_string($func))) {
            throw new InvalidDataTypeException(
                '$func',
                $func,
                esc_html__('non empty string', 'event_espresso')
            );
        }
        $this->func = $func;
        return $this;
    }


    /**
     * @param int $line
     * @return Notice
     * @throws InvalidDataTypeException
     */
    private function setLine($line)
    {
        $line = absint($line);
        if ($this->type === self::ERROR && $line === 0) {
            throw new InvalidDataTypeException(
                '$line',
                $line,
                esc_html__('integer', 'event_espresso')
            );
        }
        $this->line = $line;
        return $this;
    }


    /**
     * Public method for more handily setting the file/function/line parameters.
     * @param $file
     * @param $function
     * @param $line
     * @throws InvalidDataTypeException
     * @return Notice
     */
    public function setFileFunctionLine($file, $function, $line)
    {
        $this->setFile($file)->setFunc($function)->setLine($line);
        return $this;
    }


    /**
     * Set whether the notice should be dismissible or not
     *
     * @param boolean $dismissible
     * @return Notice
     */
    public function setDismissible($dismissible = true)
    {
        $this->dismissible = filter_var($dismissible, FILTER_VALIDATE_BOOLEAN);
        return $this;
    }


    /**
     * Set the RouteMatch config identifier associated with this notice.
     * This is used along with the RouteMatcher to control where the notice is displayed.  By default, the notice is
     * displayed everywhere (because typically a notice is only displayed one time on the route its set on).
     *
     * For persistent notices this becomes more important.  See `EventEspresso\core\services\RouteMatcher` for more
     * details.
     *
     * Note: if the string set here does not match a registered route match config
     *
     * @param string $route_match_config_identifier
     * @return Notice
     */
    public function setRouteMatchConfigIdentifier($route_match_config_identifier)
    {
        $this->route_match_config_identifier = (string) $route_match_config_identifier;
        return $this;
    }


    /**
     * @return string
     */
    public function getRouteMatchConfigIdentifier()
    {
        if (empty($this->route_match_config_identifier)) {
            return RouteMatcher::ROUTE_ANY;
        }
        return $this->route_match_config_identifier;
    }


    /**
     * @param $capability
     * @param $capability_context
     * @return Notice
     */
    public function setCapabilityRequired($capability, $capability_context = '')
    {
        $capability_context = $capability_context === ''
            ? 'view ' . $this->type() . ' notice'
            : (string) $capability_context;
        if (! empty($capability)) {
            $this->setCapabilityCheck(
                new CapCheck(
                    $capability,
                    $capability_context
                )
            );
        }
        return $this;
    }


    /**
     * @return bool
     */
    public function dismissedOverridden()
    {
        return $this->override_dismissed;
    }


    /**
     * @param $dismissed
     * @return Notice
     */
    public function overrideDismissed($dismissed)
    {
        $this->dismissed = filter_var($dismissed, FILTER_VALIDATE_BOOLEAN);
        return $this;
    }


    /**
     * @return bool
     */
    public function isDismissed()
    {
        return $this->dismissed;
    }

    /**
     * Fluent setter for setting whether the notice was dismissed by the user.
     *
     * @param $dismissed
     * @return Notice
     */
    public function setDismissed($dismissed)
    {
        $this->dismissed = filter_var($dismissed, FILTER_VALIDATE_BOOLEAN);
        return $this;
    }


    /**
     * Only allows toggling this Notice as a persistent message.  Defaults for the persistent message will be set if
     * they have not already been set on the Notice.
     *
     * @return Notice
     */
    public function setPersistent()
    {
        $this->is_persistent = true;
        if ($this->getRouteMatchConfigIdentifier() === RouteMatcher::ROUTE_ANY) {
            //default persistent notices to any admin route
            $this->setRouteMatchConfigIdentifier(RouteMatcher::ROUTE_ADMIN_ANY);
        }
        if (! $this->capability_checker instanceof CapCheckInterface) {
            $this->setCapabilityCheck(
                new CapCheck(
                    'manage_options',
                    'viewing persistent notice'
                )
            );
        }
        return $this;
    }


    /**
     * @return bool
     */
    public function isPersistent()
    {
        return $this->is_persistent === true;
    }



    /**
     * Return whether a notice has been flagged as processed or not.
     * @return bool
     */
    public function isProcessed()
    {
        return $this->processed;
    }


    /**
     * Flag a notice as having been processed.
     * @return Notice
     */
    public function setProcessed()
    {
        $this->processed = true;
        return $this;
    }

    /**
     * Fluent setter used to set that the notice should be purged from any persistence (mostly for Persistent notices)
     *
     * @param bool $purge
     * @return Notice
     */
    public function setPurge($purge)
    {
        $this->purge = filter_var($purge, FILTER_VALIDATE_BOOLEAN);
        return $this;
    }

    /**
     * Return whether to purge this notice or not.
     *
     * @return bool
     */
    public function purge()
    {
        return $this->purge;
    }

    /**
     * Fluent setter for setting the notice to display on the next request.
     *
     * @param $show
     * @return Notice
     */
    public function setShowOnNextRequest($show)
    {
        $this->show_on_next_request = filter_var($show, FILTER_VALIDATE_BOOLEAN);
        return $this;
    }

    /**
     * Whether the notice should show on the next request or not.
     *
     * @return bool
     */
    public function showOnNextRequest()
    {
        return $this->show_on_next_request;
    }


    /**
     * Returns the notice information as an array for persistence to the db.
     */
    public function toArray()
    {
        return array(
            'type' => $this->type(),
            'identifier' => $this->getIdentifier(),
            'message' => $this->message(),
            'route_match_config_identifier' => $this->getRouteMatchConfigIdentifier(),
            'capability' => $this->getCapCheck()->capability(),
            'context' => $this->getCapCheck()->context(),
            'dismissed' => $this->isDismissed(),
            'dismissible' => $this->isDismissible(),
            'file' => $this->file(),
            'func' => $this->func(),
            'line' => $this->line()
        );
    }
}
