<?php

namespace EventEspresso\core\services\database;

use EEH_Array;

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
    const NOT_SET_YET = 'wordpress-option-value-not-yet-set';

    /**
     * WordPress makes it difficult to determine if an option successfully saved or not,
     * which is sometimes really important to know, especially if the information you are saving is critical.
     * The following options allow us to have a better chance of knowing when an update actually failed
     * or when everything is OK but it just didn't update because the value hasn't changed.
     */
    const UPDATE_SUCCESS = 1;

    const UPDATE_NONE    = 0;

    const UPDATE_ERROR   = -1;

    /**
     * @var boolean
     */
    private $autoload = false;

    /**
     * @var mixed
     */
    private $default_value = null;

    /**
     * @var string
     */
    private $option_name = '';

    /**
     * @var mixed
     */
    private $value = WordPressOption::NOT_SET_YET;

    /**
     * @var OptionEngine
     */
    private $option_engine;


    /**
     * WordPressOption constructor.
     *
     * @param string $option_name
     * @param mixed  $default_value
     * @param bool   $autoload              if true, will load the option on EVERY request
     * @param bool   $is_network_option     if true, will save the option to the network as opposed to the current blog
     */
    public function __construct(
        string $option_name,
        $default_value,
        bool $autoload = false,
        bool $is_network_option = false
    ) {
        $this->setAutoload($autoload);
        $this->setDefaultValue($default_value);
        $this->setOptionName($option_name);
        $this->option_engine = new OptionEngine($is_network_option);
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
    public function optionExists(): string
    {
        return $this->option_engine->getOption(
            $this->option_name,
            WordPressOption::NOT_SET_YET
        ) !== WordPressOption::NOT_SET_YET;
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
            $this->value = $this->option_engine->getOption($this->option_name, $this->default_value);
        }
        return $this->value;
    }


    /**
     * @param $value
     * @return int
     */
    public function updateOption($value): int
    {
        // don't update if value has not changed since last update
        if ($this->valueIsUnchanged($value)) {
            return WordPressOption::UPDATE_NONE;
        }
        $this->value = $value;
        // because the options for updating differ when adding an option for the first time
        // we use the WordPressOption::NOT_SET_YET to determine if things already exist in the db
        $updated = $this->optionExists()
            ? $this->option_engine->updateOption($this->option_name, $this->value)
            : $this->option_engine->addOption($this->option_name, $this->value, $this->autoload());

        if ($updated) {
            return WordPressOption::UPDATE_SUCCESS;
        }
        return WordPressOption::UPDATE_ERROR;
    }


    private function valueIsUnchanged($value): bool
    {
        if (is_array($value) && is_array($this->value)) {
            $diff = EEH_Array::array_diff_recursive($value, $this->value);
            // $diff = array_diff($value, $this->value);
            return empty($diff);
        }
        // emulate WP's method for checking equality
        return $value === $this->value && maybe_serialize($value) === maybe_serialize($this->value);
    }


    /**
     * @return string
     */
    private function autoload(): string
    {
        return $this->autoload ? 'yes' : 'no';
    }


    /**
     * Deletes the option from the database
     * for the rest of the request
     *
     * @return bool
     * @since  $VID:$
     */
    public function deleteOption(): bool
    {
        return $this->option_engine->deleteOption($this->option_name);
    }
}
