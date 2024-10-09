<?php

use EventEspresso\core\services\helpers\ColorConverter;

/**
 * Stores Ticket_Selector_Config settings
 */
class EE_Ticket_Selector_Config extends EE_Config_Base
{
    /**
     * constant to indicate that a datetime selector should NEVER be shown for ticket selectors
     */
    const DO_NOT_SHOW_DATETIME_SELECTOR = 'no_datetime_selector';

    /**
     * constant to indicate that a datetime selector should only be shown for ticket selectors
     * when the number of datetimes for the event matches the value set for $datetime_selector_threshold
     */
    const MAYBE_SHOW_DATETIME_SELECTOR = 'maybe_datetime_selector';

    /**
     * @var bool $show_ticket_sale_columns
     */
    public $show_ticket_sale_columns = true;

    /**
     * @var bool $show_ticket_details
     */
    public $show_ticket_details = true;

    /**
     * @var bool $show_expired_tickets
     */
    public $show_expired_tickets = true;

    /**
     * whether to display a dropdown box populated with event datetimes
     * that toggles which tickets are displayed for a ticket selector.
     * uses one of the *_DATETIME_SELECTOR constants defined above
     *
     * @var string $show_datetime_selector
     */
    protected $show_datetime_selector = EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR;

    /**
     * the number of datetimes an event has to have before conditionally displaying a datetime selector
     *
     * @var int $datetime_selector_threshold
     */
    protected $datetime_selector_threshold = 3;

    /**
     * determines the maximum number of "checked" dates in the date and time filter
     *
     * @var int $datetime_selector_checked
     */
    protected $datetime_selector_max_checked = 10;

    private bool $use_new_checkbox_selector = false;

    private bool $use_new_form_styles = false;

    private array $accent_color = [210, 100, 50];


    public function __construct()
    {
    }


    /**
     * returns true if a datetime selector should be displayed
     *
     * @param array $datetimes
     * @return bool
     */
    public function showDatetimeSelector(array $datetimes)
    {
        // if the settings are NOT: don't show OR below threshold, THEN active = true
        return ! (
            $this->getShowDatetimeSelector() === EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR
            || (
                $this->getShowDatetimeSelector() === EE_Ticket_Selector_Config::MAYBE_SHOW_DATETIME_SELECTOR
                && count($datetimes) < $this->getDatetimeSelectorThreshold()
            )
        );
    }


    /**
     * @return string
     */
    public function getShowDatetimeSelector()
    {
        return $this->show_datetime_selector;
    }


    /**
     * @param bool $keys_only
     * @return array
     */
    public function getShowDatetimeSelectorOptions($keys_only = true)
    {
        return $keys_only
            ? array(
                EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR,
                EE_Ticket_Selector_Config::MAYBE_SHOW_DATETIME_SELECTOR,
            )
            : array(
                EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR => esc_html__(
                    'Do not show date & time filter',
                    'event_espresso'
                ),
                EE_Ticket_Selector_Config::MAYBE_SHOW_DATETIME_SELECTOR  => esc_html__(
                    'Maybe show date & time filter',
                    'event_espresso'
                ),
            );
    }


    /**
     * @param string $show_datetime_selector
     */
    public function setShowDatetimeSelector($show_datetime_selector)
    {
        $this->show_datetime_selector = in_array(
            $show_datetime_selector,
            $this->getShowDatetimeSelectorOptions(),
            true
        )
            ? $show_datetime_selector
            : EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR;
    }


    /**
     * @return int
     */
    public function getDatetimeSelectorThreshold()
    {
        return $this->datetime_selector_threshold;
    }


    /**
     * @param int $datetime_selector_threshold
     */
    public function setDatetimeSelectorThreshold($datetime_selector_threshold)
    {
        $datetime_selector_threshold = absint($datetime_selector_threshold);
        $this->datetime_selector_threshold = $datetime_selector_threshold ?: 3;
    }


    /**
     * @return int
     */
    public function getDatetimeSelectorMaxChecked()
    {
        return $this->datetime_selector_max_checked;
    }


    /**
     * @param int $datetime_selector_max_checked
     */
    public function setDatetimeSelectorMaxChecked($datetime_selector_max_checked)
    {
        $this->datetime_selector_max_checked = absint($datetime_selector_max_checked);
    }


    public function useNewCheckboxSelector(): bool
    {
        return $this->use_new_checkbox_selector;
    }


    public function setUseNewCheckboxSelector(bool $use_new_checkbox_selector): void
    {
        $this->use_new_checkbox_selector = $use_new_checkbox_selector;
    }


    public function useNewFormStyles(): bool
    {
        return $this->use_new_form_styles;
    }


    public function setUseNewFormStyles(bool $use_new_form_styles): void
    {
        $this->use_new_form_styles = $use_new_form_styles;
    }


    public function accentColor(): array
    {
        return $this->accent_color;
    }


    public function accentColorAsHex(): string
    {
        return ColorConverter::hsl2Hex($this->accent_color);
    }


    public function setAccentColor(array $accent_color): void
    {
        $this->accent_color = $accent_color;
    }

    public function setAccentColorHex(string $accent_color): void
    {
        $this->accent_color = ColorConverter::rgb2Hsl(ColorConverter::hex2RGB($accent_color));
    }
}
