<?php
namespace EventEspresso\core\services\shortcodes;

use DomainException;
use EventEspresso\core\domain\EnqueueAssetsInterface;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use Exception;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ShortcodesManager
 * Loads a Collection of ShortcodeInterface classes
 * then retrieves shortcode tags and calls add_shortcode() for each
 * ensures assets are registered and enqueued at the appropriate time
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.26
 */
class ShortcodesManager
{

    /**
     * @var LegacyShortcodesManager $legacy_shortcodes_manager
     */
    private $legacy_shortcodes_manager;

    /**
     * @var ShortcodeInterface[] $shortcodes
     */
    private $shortcodes;



    /**
     * ShortcodesManager constructor
     *
     * @param LegacyShortcodesManager $legacy_shortcodes_manager
     */
    public function __construct(LegacyShortcodesManager $legacy_shortcodes_manager) {
        $this->legacy_shortcodes_manager = $legacy_shortcodes_manager;
        // assemble a list of installed and active shortcodes
        add_action(
            'AHEE__EE_System__register_shortcodes_modules_and_widgets',
            array($this, 'registerShortcodes'),
            999
        );
        //  call add_shortcode() for all installed shortcodes
        add_action('AHEE__EE_System__core_loaded_and_ready', array($this, 'addShortcodes'));
        // check content for shortcodes the old way
        add_action('parse_query', array($this->legacy_shortcodes_manager, 'initializeShortcodes'), 5);
        // check content for shortcodes the NEW more efficient way
        add_action('template_redirect', array($this, 'templateRedirect'), 999);
    }



    /**
     * @return CollectionInterface|ShortcodeInterface[]
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     * @throws InvalidFilePathException
     * @throws InvalidEntityException
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     */
    public function getShortcodes()
    {
        if ( ! $this->shortcodes instanceof CollectionInterface) {
            $this->shortcodes = $this->loadShortcodesCollection();
        }
        return $this->shortcodes;
    }



    /**
     * @return CollectionInterface|ShortcodeInterface[]
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     * @throws InvalidFilePathException
     * @throws InvalidEntityException
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     */
    protected function loadShortcodesCollection()
    {
        $loader = new CollectionLoader(
            new CollectionDetails(
            // collection name
                'shortcodes',
                // collection interface
                'EventEspresso\core\services\shortcodes\ShortcodeInterface',
                // FQCNs for classes to add (all classes within that namespace will be loaded)
                array('EventEspresso\core\domain\entities\shortcodes'),
                // filepaths to classes to add
                array(),
                // file mask to use if parsing folder for files to add
                '',
                // what to use as identifier for collection entities
                // using CLASS NAME prevents duplicates (works like a singleton)
                CollectionDetails::ID_CLASS_NAME
            )
        );
        return $loader->getCollection();
    }



    /**
     * @return void
     * @throws DomainException
     * @throws InvalidInterfaceException
     * @throws InvalidIdentifierException
     * @throws InvalidFilePathException
     * @throws InvalidEntityException
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     */
    public function registerShortcodes()
    {
        try {
            $this->shortcodes = apply_filters(
                'FHEE__EventEspresso_core_services_shortcodes_ShortcodesManager__registerShortcodes__shortcode_collection',
                $this->getShortcodes()
            );
            if (! $this->shortcodes instanceof CollectionInterface) {
                throw new InvalidEntityException(
                    $this->shortcodes,
                    'CollectionInterface',
                    sprintf(
                        esc_html__(
                            'The "FHEE__EventEspresso_core_services_shortcodes_ShortcodesManager__registerShortcodes__shortcode_collection" filter must return a Collection of EspressoShortcode objects. "%1$s" was received instead.',
                            'event_espresso'
                        ),
                        is_object($this->shortcodes) ? get_class($this->shortcodes) : gettype($this->shortcodes)
                    )
                );
            }
            $this->legacy_shortcodes_manager->registerShortcodes();
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }



    /**
     * @return void
     */
    public function addShortcodes()
    {
        try {
            // cycle thru shortcode folders
            foreach ($this->shortcodes as $shortcode) {
                /** @var ShortcodeInterface $shortcode */
                if ( $shortcode instanceof EnqueueAssetsInterface) {
                    add_action('wp_enqueue_scripts', array($shortcode, 'registerScriptsAndStylesheets'), 10);
                    add_action('wp_enqueue_scripts', array($shortcode, 'enqueueStylesheets'), 11);
                }
                // add_shortcode() if it has not already been added
                if ( ! shortcode_exists($shortcode->getTag())) {
                    add_shortcode($shortcode->getTag(), array($shortcode, 'processShortcodeCallback'));
                }
            }
            $this->legacy_shortcodes_manager->addShortcodes();
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }



    /**
     * callback for the "template_redirect" hook point
     * checks posts for EE shortcodes, and initializes them,
     * then toggles filter switch that loads core default assets
     *
     * @return void
     */
    public function templateRedirect()
    {
        global $wp_query;
        if (empty($wp_query->posts)) {
            return;
        }
        $load_assets = false;
        // array of posts displayed in current request
        $posts = is_array($wp_query->posts) ? $wp_query->posts : array($wp_query->posts);
        foreach ($posts as $post) {
            // now check post content and excerpt for EE shortcodes
            $load_assets = $this->parseContentForShortcodes($post->post_content)
                ? true
                : $load_assets;
        }
        if ($load_assets) {
            $this->legacy_shortcodes_manager->registry()->REQ->set_espresso_page(true);
            add_filter('FHEE_load_css', '__return_true');
            add_filter('FHEE_load_js', '__return_true');
        }
    }



    /**
     * checks supplied content against list of shortcodes,
     * then initializes any found shortcodes, and returns true.
     * returns false if no shortcodes found.
     *
     * @param string $content
     * @return bool
     */
    public function parseContentForShortcodes($content)
    {
        $has_shortcode = false;
        if(empty($this->shortcodes)){
            return $has_shortcode;
        }
        foreach ($this->shortcodes as $shortcode) {
            /** @var ShortcodeInterface $shortcode */
            if (has_shortcode($content, $shortcode->getTag())) {
                $shortcode->initializeShortcode();
                $has_shortcode = true;
            }
        }
        return $has_shortcode;
    }

}
// End of file ShortcodesManager.php
// Location: EventEspresso\core\services\shortcodes/ShortcodesManager.php
