<?php

namespace EventEspresso\core\services\addon\api;

use DomainException;

/**
 * IncompatibleAddon
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\addon\api
 * @author      Brent Christensen
 * @since       5.0.53
 */
class IncompatibleAddon
{
    private string $addon_name;

    private string $loader_callback;

    private string $main_file_constant;

    private string $min_version_required;

    private string $version_constant;


    /**
     * @param string $addon_name           official add-on name displayed to users,
     *                                     ex: 'Wait Lists'
     * @param string $main_file_constant   name of constant that defines the add-on's mainfile
     *                                     (file with the WordPress plugin header),
     *                                     ex: EE_WAIT_LISTS_PLUGIN_FILE
     * @param string $version_constant     name of constant that defines the add-on's version,
     *                                     ex: EE_WAIT_LISTS_VERSION
     * @param string $min_version_required the minimum version required to allow loading
     *                                     ex: '1.0.0.beta.074'
     * @param string $loader_callback      name of the callback hooked into AHEE__EE_System__load_espresso_addons,
     *                                     ex: 'load_espresso_wait_lists'
     */
    public function __construct(
        string $addon_name,
        string $main_file_constant,
        string $version_constant,
        string $min_version_required,
        string $loader_callback
    ) {
        $this->addon_name           = $addon_name;
        $this->main_file_constant   = $main_file_constant;
        $this->min_version_required = $min_version_required;
        $this->loader_callback      = $loader_callback;
        $this->version_constant     = $version_constant;
    }


    public function name(): string
    {
        return $this->addon_name;
    }


    public function currentVersion(): string
    {
        return $this->getValueForConstant($this->version_constant);
    }


    public function loaderCallback(): string
    {
        return $this->loader_callback;
    }


    public function mainfile(): string
    {
        return $this->getValueForConstant($this->main_file_constant);
    }


    public function minVersionRequired(): string
    {
        return $this->min_version_required;
    }


    /**
     * compares the current add-on version against the add-on min_version_required,
     * and returns true if add-on does not meet that minimum version.
     * can be expanded in the future to check other requirements if needed
     *
     * @return bool
     */
    public function doesNotMeetRequirements(): bool
    {
        return version_compare($this->currentVersion(), $this->min_version_required, '<');
    }


    /**
     * @throws DomainException
     */
    private function getValueForConstant(string $constant_name)
    {
        if (! defined($constant_name)) {
            $this->invalidVersionConstant($constant_name);
        }
        return constant($constant_name);
    }


    private function invalidVersionConstant(string $constant_name)
    {
        throw new DomainException(
            sprintf(
                esc_html__('Invalid constant (%1$s) supplied for the %2$s IncompatibleAddon', 'event_espresso'),
                $constant_name,
                $this->addon_name
            )
        );
    }
}
