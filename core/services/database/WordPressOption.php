<?php

namespace EventEspresso\core\services\database;

/**
 * Class WordPressOption
 * This may seem like paving a cow path, but if you look around,
 * you'll see that a lot of the logic in this class is duplicated all over the place.
 * This class can be configured upon construction (or later)
 * and only requires calls to loadOption() and updateOption($value) afterwards.
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\database
 * @since   $VID:$
 */
abstract class WordPressOption
{
    const NOT_SET_YET    = 'wordpress-option-value-not-yet-set';

    /**
     * WordPress makes it difficult to determine if an option was successfully saved or not
     * which is sometimes really important to know if the information you are saving is critical.
     * The following options allow us to have a better chance of knowing when an update actually failed
     * or when it just didn't update because the value hasn't changed, but everything is safe.
     */
    const UPDATE_SUCCESS = 1;

    const UPDATE_NONE    = 0;

    const UPDATE_ERROR   = -1;

    /**
     * @var boolean
     */
    private $autoload;

    /**
     * @var mixed
     */
    private $default_value;

    /**
     * @var string
     */
    private $option_name;

    /**
     * @var mixed
     */
    private $value = WordPressOption::NOT_SET_YET;


    /**
     * WordPressOption constructor.
     *
     * @param bool   $autoload
     * @param mixed  $default_value
     * @param string $option_name
     */
    public function __construct(string $option_name, $default_value, bool $autoload = false)
    {
        $this->setAutoload($autoload);
        $this->setDefaultValue($default_value);
        $this->setOptionName($option_name);
    }


    /**
     * @param bool|string $autoload
     */
    public function setAutoload($autoload): void
    {
        $this->autoload = filter_var($autoload, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @param mixed $default_value
     */
    public function setDefaultValue($default_value): void
    {
        $this->default_value = $default_value;
    }


    /**
     * @param string $option_name
     */
    public function setOptionName(string $option_name): void
    {
        $this->option_name = sanitize_key($option_name);
    }


    /**
     * @return string
     */
    public function getOptionName(): string
    {
        return $this->option_name;
    }


    /**
     * @return false|mixed|void
     */
    public function loadOption()
    {
        if ($this->value === WordPressOption::NOT_SET_YET) {
            $this->value = get_option($this->option_name, $this->default_value);
        }
        return $this->value;
    }


    /**
     * @param $value
     * @return int
     */
    public function updateOption($value) : int
    {
        // don't update if value has not changed since last update
        if ($value === $this->value) {
            return WordPressOption::UPDATE_NONE;
        }
        // because the options for updating differ when adding an option for the first time
        // we use the WordPressOption::NOT_SET_YET to determine if things already exist in the db
        if (get_option($this->option_name, WordPressOption::NOT_SET_YET) === WordPressOption::NOT_SET_YET) {
            $updated = add_option($this->option_name, $value, '', $this->autoload());
        } else {
            $updated = update_option($this->option_name, $value);
        }
        if ($updated) {
            $this->value = $value;
            return WordPressOption::UPDATE_SUCCESS;
        }
        return WordPressOption::UPDATE_ERROR;
    }


    /**
     * @return string
     */
    private function autoload() : string
    {
        return $this->autoload ? 'yes' : 'no';
    }
}
