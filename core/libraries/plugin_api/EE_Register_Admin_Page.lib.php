<?php

/**
 * Use this to register or deregister an EE Admin Page.
 *
 * @package          Event Espresso
 * @subpackage       plugin api, admin
 * @since            4.3.0
 * @author           Darren Ethier
 */
class EE_Register_Admin_Page implements EEI_Plugin_API
{
    /**
     * Holds registered EE_Admin_Pages
     *
     * @var array
     */
    protected static $_ee_admin_page_registry = [];


    /**
     * The purpose of this method is to provide an easy way for addons to register their admin pages (using the EE
     * Admin Page loader system).
     *
     * @param string $addon_name                                      This string represents the basename of the Admin
     *                                                                Page init. The init file must use this basename
     *                                                                in its name and class (i.e.
     *                                                                {page_basename}_Admin_Page_Init.core.php).
     * @param array  $setup_args                                      {              An array of configuration options
     *                                                                that will be used in different circumstances
     *
     * @type  string $page_path                                       This is the path where the registered admin pages
     *        reside ( used to setup autoloaders).
     *
     *    }
     * @return bool
     * @throws EE_Error
     * @since 4.3.0
     *
     */
    public static function register(string $addon_name = '', array $setup_args = []): bool
    {

        // check that an admin_page has not already been registered with that name
        if (isset(self::$_ee_admin_page_registry[ $addon_name ])) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'An Admin Page located at %1$s has already been registered and each Admin Page requires a unique name.
                        Error thrown while registering an Admin Page of the same name for the %2$s addon with the admin page path: %3$s."',
                        'event_espresso'
                    ),
                    '<pre>' . (self::$_ee_admin_page_registry[ $addon_name ]['page_path']) . '</pre>',
                    $addon_name,
                    '<pre>' . ($setup_args['page_path'] ?? '') . '</pre>'
                )
            );
        }

        // required fields MUST be present, so let's make sure they are.
        if (empty($addon_name) || ! is_array($setup_args) || empty($setup_args['page_path'])) {
            throw new EE_Error(
                esc_html__(
                    'In order to register an Admin Page with EE_Register_Admin_Page::register(), you must include the "page_basename" (the class name of the page), and an array containing the following keys: "page_path" (the path where the registered admin pages reside)',
                    'event_espresso'
                )
            );
        }

        // make sure we don't register twice
        if (isset(self::$_ee_admin_page_registry[ $addon_name ])) {
            return true;
        }

        if (! did_action('AHEE__EE_System__load_espresso_addons') || did_action('AHEE__EE_Admin__loaded')) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                sprintf(
                    esc_html__(
                        'An attempt was made to register "%s" as an EE Admin page has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__load_controllers__load_admin_controllers" hook to register Admin pages.',
                        'event_espresso'
                    ),
                    $addon_name
                ),
                '4.3'
            );
        }

        // add incoming stuff to our registry property
        self::$_ee_admin_page_registry[ $addon_name ] = [
            'page_path' => $setup_args['page_path'],
            'config'    => $setup_args,
        ];

        // add filters
        add_filter(
            'FHEE__EE_Admin_Page_Loader__findAdminPages__admin_page_folders',
            ['EE_Register_Admin_Page', 'set_page_path']
        );

        return true;
    }


    /**
     * This deregisters a EE_Admin page that is already registered.  Note, this MUST be loaded after the
     * page being deregistered is loaded.
     *
     * @param string $addon_name Use whatever string was used to register the admin page.
     * @return  void
     * @since    4.3.0
     *
     */
    public static function deregister(string $addon_name = '')
    {
        unset(self::$_ee_admin_page_registry[ $addon_name ]);
    }


    /**
     * set_page_path
     *
     * @param array $paths
     * @return mixed
     * @throws EE_Error
     */
    public static function set_page_path(array $paths): array
    {
        foreach (self::$_ee_admin_page_registry as $basename => $args) {
            EEH_Autoloader::register_autoloaders_for_each_file_in_folder($args['page_path']);
            $paths[ $basename ] = $args['page_path'];
        }
        return $paths;
    }

    public static function reset(): void
    {
        self::$_ee_admin_page_registry = [];
    }
}
