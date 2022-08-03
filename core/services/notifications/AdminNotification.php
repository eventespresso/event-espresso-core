<?php

namespace EventEspresso\core\services\notifications;

use DomainException;
use EventEspresso\core\domain\services\capabilities\CapCheck;
use EventEspresso\core\domain\services\capabilities\CapCheckInterface;
use EventEspresso\core\domain\services\capabilities\RequiresCapCheckInterface;
use EventEspresso\core\exceptions\InvalidStatusException;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

class AdminNotification implements RequiresCapCheckInterface
{
    const STATUS_OPEN      = 'status-open';

    const STATUS_CLOSED    = 'status-closed';

    const STATUS_DISMISSED = 'status-dismissed';

    const STATUS_VIEWED    = 'status-viewed';

    const TYPE_CUSTOM      = 'notice-custom';

    const TYPE_ERROR       = 'notice-error';

    const TYPE_INFO        = 'notice-info';

    const TYPE_SUCCESS     = 'notice-success';

    const TYPE_WARNING     = 'notice-warning';


    /**
     * @var array
     */
    protected $allowed_tags = [];

    /**
     * @var CapCheckInterface
     */
    protected $cap_check;

    /**
     * @var string
     */
    protected $capability = '';

    /**
     * @var string
     */
    protected $cap_context = '';

    /**
     * @var array
     */
    protected $css_classes = [];

    /**
     * @var string
     */
    protected $identifier = '';

    /**
     * @var bool
     */
    protected $is_dismissible = false;

    /**
     * @var string
     */
    protected $message = '';

    /**
     * @var string
     */
    protected $role = '';

    /**
     * @var string
     */
    protected $status = '';

    /**
     * @var array
     */
    protected $valid_statuses = [];

    /**
     * @var string
     */
    protected $type;

    /**
     * @var array
     */
    protected $valid_types = [
        AdminNotification::TYPE_CUSTOM,
        AdminNotification::TYPE_ERROR,
        AdminNotification::TYPE_INFO,
        AdminNotification::TYPE_SUCCESS,
        AdminNotification::TYPE_WARNING,
    ];


    /**
     * PersistentAdminNotice constructor
     *
     * @param string     $identifier   [required] the name, or key of the Admin Notice
     * @param string     $message      [required] the message to be displayed to users
     * @param string     $type         whether notice is an error, info, success, or warning
     * @param bool       $autoload     whether to automatically hook into "admin_notices" to display notice
     * @param array|null $allowed_tags tags & attributes passed to wp_kses for sanitizing notice content
     */
    public function __construct(
        string $identifier,
        string $message,
        string $type = AdminNotification::TYPE_INFO,
        bool $autoload = true,
        ?array $allowed_tags = []
    ) {
        $this->identifier = sanitize_key($identifier);
        $this->setType($type);
        $this->setMessage($message);
        $this->setAllowedTags($allowed_tags);
        if ($autoload) {
            add_action('admin_notices', [$this, 'displayNotification']);
        }
    }


    /**
     * user capability required to view this notice
     *
     * @return string
     */
    public function capability(): string
    {
        return $this->capability;
    }


    /**
     * description for why the cap check is being performed
     *
     * @return string
     */
    public function capContext(): string
    {
        return $this->cap_context;
    }


    /**
     * @return array
     */
    public function cssClasses(): array
    {
        return $this->css_classes;
    }


    /**
     * @return string
     */
    public function cssClassString(): string
    {
        return implode(' ', $this->css_classes);
    }


    /**
     * @return CapCheckInterface
     */
    public function getCapCheck(): CapCheckInterface
    {
        if (! $this->cap_check instanceof CapCheckInterface) {
            $this->setCapCheck(
                new CapCheck($this->capability, $this->cap_context)
            );
        }
        return $this->cap_check;
    }


    public function displayNotification($return = false): string
    {
        $id           = esc_attr($this->identifier);
        $class        = esc_attr($this->cssClassString());
        $notification = "<div id='$id' class='$class'>$this->message</div>";
        if ($return) {
            return $notification;
        }
        echo wp_kses($notification, $this->allowed_tags);
        return '';
    }


    /**
     * name/identifier for notice
     *
     * @return string
     */
    public function identifier(): string
    {
        return $this->identifier;
    }


    /**
     * @return bool
     */
    public function isDismissible(): bool
    {
        return $this->is_dismissible;
    }


    /**
     * the actual content displayed to the user
     *
     * @return string
     */
    public function message(): string
    {
        return $this->message;
    }


    /**
     * notice will only displayed to users with this role
     *
     * @return string
     */
    public function role(): string
    {
        return $this->role;
    }


    /**
     * whether notice is open/dismissed/viewed/etc one of the AdminNotification::STATUS_* constants
     *
     * @return string
     */
    public function status(): string
    {
        return $this->status;
    }


    /**
     * array of valid notification status options (AdminNotification::STATUS_* constants)
     *
     * @return array|string[]
     */
    public function validStatuses(): array
    {
        return $this->valid_statuses;
    }


    /**
     * array of valid notification types (AdminNotification::TYPE_* constants)
     *
     * @return array|string[]
     */
    public function validTypes(): array
    {
        return $this->valid_types;
    }


    /**
     * @param array $allowed_tags
     */
    public function setAllowedTags(array $allowed_tags = []): void
    {
        $this->allowed_tags = ! empty($allowed_tags) ? $allowed_tags : AllowedTags::getWithFullTags();
    }


    /**
     * @param string|null $capability user capability required to view this notice [default] 'manage_options'
     */
    protected function setCapability(?string $capability = 'manage_options')
    {
        $this->capability = sanitize_key($capability);
    }


    /**
     * @param CapCheckInterface|null $cap_check
     */
    protected function setCapCheck(?CapCheckInterface $cap_check = null)
    {
        $this->cap_check = $cap_check;
    }


    /**
     * @param string $cap_context description for why the cap check is being performed
     */
    protected function setCapContext(string $cap_context = 'view admin notice')
    {
        $this->cap_context = sanitize_text_field($cap_context);
    }


    /**
     * @param string $css_class
     * @param bool   $remove_duplicates
     */
    public function addCssClass(string $css_class, bool $remove_duplicates = true): void
    {
        $this->css_classes[] = sanitize_key($css_class);
        if ($remove_duplicates) {
            $this->removeDuplicateCssClasses();
        }
    }


    /**
     * @param array $css_classes
     */
    public function addCssClasses(array $css_classes): void
    {
        foreach ($css_classes as $css_class) {
            $this->addCssClass($css_class, false);
        }
        $this->removeDuplicateCssClasses();
    }


    /**
     * @return void
     */
    public function removeDuplicateCssClasses(): void
    {
        $this->css_classes = array_unique($this->css_classes, SORT_STRING);
    }


    /**
     * @param string $css_class
     */
    public function removeCssClass(string $css_class): void
    {
        $this->css_classes = array_filter(
            $this->css_classes,
            function ($existing_class) use ($css_class) {
                return $existing_class !== $css_class;
            }
        );
    }


    /**
     * @param bool $is_dismissible
     */
    public function setIsDismissible(bool $is_dismissible = false): void
    {
        $this->is_dismissible = filter_var($is_dismissible, FILTER_VALIDATE_BOOLEAN);
        if ($this->is_dismissible) {
            $this->addCssClass('is-dismissible');
        } else {
            $this->removeCssClass('is-dismissible');
        }
    }


    /**
     * @param string $message the actual content displayed to the user
     */
    protected function setMessage(string $message)
    {
        $this->message = $message;
    }


    /**
     * @param string $role notice will only displayed to users with this role
     */
    protected function setRole(string $role): void
    {
        $this->role = $role;
    }


    /**
     * @param string $status whether notice is open/dismissed/viewed/etc
     */
    protected function setStatus(string $status): void
    {
        if (! in_array($status, $this->valid_statuses, true)) {
            throw new InvalidStatusException($status, esc_html__('AdminNotification', 'event_espresso'));
        }
        $this->status = $status;
    }


    /**
     * @param string $type whether notice is an error, info, success, or warning (AdminNotification::TYPE_* constants)
     */
    protected function setType(string $type): void
    {
        if (! in_array($type, $this->valid_types, true)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'Invalid or missing admin notification type (%1$s). Please use one of the AdminNotification::TYPE_* constants.',
                        'event_espresso'
                    ),
                    $type
                )
            );
        }
        $this->type = $type;
        // remove existing type class from notice before adding new one
        foreach ($this->valid_types as $valid_type) {
            $this->removeCssClass($valid_type);
        }
        if ($this->type === AdminNotification::TYPE_CUSTOM) {
            $this->addCssClass('espresso-admin-notice');
        } else {
            $this->addCssClass($type);
            $this->removeCssClass('espresso-admin-notice');
            $this->addCssClass('notice');
        }
    }


    /**
     * @param array $valid_statuses array of valid notification status options (AdminNotification::STATUS_* constants)
     */
    protected function setValidStatuses(array $valid_statuses): void
    {
        $this->valid_statuses = $valid_statuses;
    }


    /**
     * @param array $valid_types array of valid notification types (AdminNotification::TYPE_* constants)
     */
    protected function setValidTypes(array $valid_types): void
    {
        $this->valid_types = $valid_types;
    }
}
