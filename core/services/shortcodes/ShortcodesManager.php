<?php
namespace EventEspresso\core\services\shortcodes;

use EventEspresso\core\domain\EnqueueAssetsInterface;
use EventEspresso\core\domain\SetHooksInterface;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;

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
     * @var ShortcodeInterface[] $shortcodes
     */
    private $shortcodes;



    /**
     * ShortcodesManager constructor.
     */
    public function __construct() {
        //  register shortcodes and modules
        add_action(
            'AHEE__EE_System__register_shortcodes_modules_and_widgets',
            array($this, 'registerShortcodes'),
            999
        );
        //  initialize shortcodes and modules
        add_action('AHEE__EE_System__core_loaded_and_ready', array($this, 'initializeShortcodes'));
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
                '\EventEspresso\core\services\shortcodes\ShortcodeInterface',
                // FQCNs for classes to add (all classes within that namespace will be loaded)
                array('EventEspresso\core\domain\entities\shortcodes'),
                // filepaths to classes to add
                array(),
                // filemask to use if parsing folder for files to add
                '',
                // what to use as identifier for collection entities
                // using CLASS NAME prevents duplicates (works like a singleton)
                CollectionDetails::ID_CLASS_NAME
            )
        );
        return $loader->getCollection();
    }



    public function registerShortcodes()
    {
        $this->shortcodes = apply_filters(
            'FHEE__EventEspresso_core_services_shortcodes_ShortcodesManager__registerShortcodes__shortcode_collection',
            $this->getShortcodes()
        );
    }


    public function initializeShortcodes()
    {
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
    }



}
// End of file ShortcodesManager.php
// Location: EventEspresso\core\services\shortcodes/ShortcodesManager.php