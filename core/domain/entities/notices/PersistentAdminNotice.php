<?php
namespace EventEspresso\core\domain\entities\notices;

use EventEspresso\core\domain\services\capabilities\CapCheck;
use EventEspresso\core\domain\services\capabilities\CapCheckInterface;
use EventEspresso\core\domain\services\capabilities\RequiresCapCheckInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class PersistentAdminNotice
 * A DTO for recording details about a type of admin notice
 * that needs to be displayed repeatedly to an admin until dismissed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class PersistentAdminNotice implements RequiresCapCheckInterface
{


    /**
     * @var string $name
     */
    protected $name = '';

    /**
     * @var string $message
     */
    protected $message = '';

    /**
     * @var boolean $force_update
     */
    protected $force_update = false;

    /**
     * @var string $capability
     */
    protected $capability = 'manage_options';

    /**
     * @var string $cap_context
     */
    protected $cap_context = 'view persistent admin notice';

    /**
     * @var CapCheckInterface $cap_check
     */
    protected $cap_check;



    /**
     * PersistentAdminNotice constructor
     *
     * @param string $name         [required] the name, or key of the Persistent Admin Notice to be stored
     * @param string $message      [required] the message to be stored persistently until dismissed
     * @param bool   $force_update enforce the reappearance of a persistent message
     * @param string $capability   user capability required to view this notice
     * @param string $cap_context  description for why the cap check is being performed
     * @throws InvalidDataTypeException
     */
    public function __construct(
        $name,
        $message,
        $force_update = false,
        $capability = 'manage_options',
        $cap_context = 'view persistent admin notice'
    ) {
        $this->name = $this->setName($name);
        $this->message = $this->setMessage($message);
        $this->force_update = $this->setForceUpdate($force_update);
        $this->capability = $this->setCapability($capability);
        $this->cap_context = $this->setCapContext($cap_context);
        add_filter(
            'FHEE__PersistentAdminNotice',
            array($this, 'registerPersistentAdminNotice')
        );
    }



    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }



    /**
     * @param string $name
     * @throws InvalidDataTypeException
     */
    private function setName($name)
    {
        if ( ! is_string($name)) {
            throw new InvalidDataTypeException('$name', $name, 'string');
        }
        $this->name = sanitize_key($name);
    }



    /**
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }



    /**
     * @param string $message
     * @throws InvalidDataTypeException
     */
    private function setMessage($message)
    {
        if ( ! is_string($message)) {
            throw new InvalidDataTypeException('$message', $message, 'string');
        }
        $this->message = sanitize_text_field($message);
    }



    /**
     * @return bool
     */
    public function getForceUpdate()
    {
        return $this->force_update;
    }



    /**
     * @param bool $force_update
     */
    private function setForceUpdate($force_update)
    {
        $this->force_update = filter_var($force_update, FILTER_VALIDATE_BOOLEAN);
    }



    /**
     * @return string
     */
    public function getCapability()
    {
        return $this->capability;
    }



    /**
     * @param string $capability
     * @throws InvalidDataTypeException
     */
    private function setCapability($capability)
    {
        if ( ! is_string($capability)) {
            throw new InvalidDataTypeException('$capability', $capability, 'string');
        }
        $this->capability = $capability;
    }



    /**
     * @return string
     */
    public function getCapContext()
    {
        return $this->cap_context;
    }



    /**
     * @param string $cap_context
     * @throws InvalidDataTypeException
     */
    private function setCapContext($cap_context)
    {
        if ( ! is_string($cap_context)) {
            throw new InvalidDataTypeException('$cap_context', $cap_context, 'string');
        }
        $this->cap_context = $cap_context;
    }



    /**
     * @return CapCheckInterface
     */
    public function getCapCheck()
    {
        if ( ! $this->cap_check instanceof CapCheckInterface) {
            $this->setCapCheck(
                new CapCheck(
                    $this->capability,
                    $this->cap_context
                )
            );
        }
        return $this->cap_check;
    }



    /**
     * @param CapCheckInterface $cap_check
     */
    private function setCapCheck(CapCheckInterface $cap_check)
    {
        $this->cap_check = $cap_check;
    }



    /**
     * @param array $persistent_admin_notices
     * @return array
     */
    public function registerPersistentAdminNotice(array $persistent_admin_notices)
    {
        $persistent_admin_notices[$this->name] = $this;
        return $persistent_admin_notices;
    }

}
// End of file PersistentAdminNotice.php
// Location: EventEspresso\core\domain\entities\notices/PersistentAdminNotice.php