<?php

namespace EventEspresso\core\domain\entities\editor\blocks;

use DomainException;
use EE_Error;
use EEM_Registration;
use EventEspresso\core\domain\entities\editor\Block;
use EventEspresso\core\domain\entities\editor\CoreBlocksAssetManager;
use EventEspresso\core\domain\services\blocks\EventAttendeesBlockRenderer;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EventAttendees
 * Returns a list of people that have registered for the specified event
 *
 * @package EventEspresso\core\domain\entities\editor\blocks\common
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EventAttendees extends Block
{

    const BLOCK_TYPE = 'event-attendees';

    /**
     * @var EventAttendeesBlockRenderer $renderer
     */
    protected $renderer;


    /**
     * EventAttendees constructor.
     *
     * @param CoreBlocksAssetManager      $block_asset_manager
     * @param RequestInterface            $request
     * @param EventAttendeesBlockRenderer $renderer
     */
    public function __construct(
        CoreBlocksAssetManager $block_asset_manager,
        RequestInterface $request,
        EventAttendeesBlockRenderer $renderer
    ) {
        parent::__construct($block_asset_manager, $request);
        $this->renderer= $renderer;
    }


    /**
     * Perform any early setup required by the block
     * including setting the block type and supported post types
     *
     * @return void
     */
    public function initialize()
    {
        $this->setBlockType(self::BLOCK_TYPE);
        $this->setSupportedRoutes(
            array(
                'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoStandardPostTypeEditor',
                'EventEspresso\core\domain\entities\route_match\specifications\admin\WordPressPostTypeEditor',
                'EventEspresso\core\domain\entities\route_match\specifications\frontend\EspressoBlockRenderer',
                'EventEspresso\core\domain\entities\route_match\specifications\frontend\AnyFrontendRequest'
            )
        );
        $EVT_ID = $this->request->getRequestParam('page') === 'espresso_events'
            ? $this->request->getRequestParam('post', 0)
            : 0;
        $this->setAttributes(
            array(
                'eventId'           => array(
                    'type'    => 'number',
                    'default' => $EVT_ID,
                ),
                'datetimeId'        => array(
                    'type'    => 'number',
                    'default' => 0,
                ),
                'ticketId'          => array(
                    'type'    => 'number',
                    'default' => 0,
                ),
                'status'            => array(
                    'type'    => 'string',
                    'default' => EEM_Registration::status_id_approved,
                ),
                'limit'             => array(
                    'type'    => 'number',
                    'default' => 10,
                ),
                'order' => array(
                    'type' => 'string',
                    'default' => 'ASC'
                ),
                'orderBy' => array(
                    'type' => 'string',
                    'default' => 'lastThenFirstName',
                ),
                'showGravatar'      => array(
                    'type'    => 'boolean',
                    'default' => false,
                ),
                'avatarClass' => array(
                    'type' => 'string',
                    'default' => 'contact',
                ),
                'avatarSize' => array(
                    'type' => 'number',
                    'default' => 24,
                ),
                'displayOnArchives' => array(
                    'type'    => 'boolean',
                    'default' => false,
                ),
            )
        );
        $this->setDynamic();
    }


    /**
     * Returns an array where the key corresponds to the incoming attribute name from the WP block
     * and the value corresponds to the attribute name for the existing EspressoEventAttendees shortcode
     *
     * @since 4.9.71.p
     * @return array
     */
    private function getAttributesMap()
    {
        return array(
            'eventId'           => 'absint',
            'datetimeId'        => 'absint',
            'ticketId'          => 'absint',
            'status'            => 'sanitize_text_field',
            'limit'             => 'intval',
            'showGravatar'      => 'bool',
            'avatarClass'       => 'sanitize_text_field',
            'avatarSize'        => 'absint',
            'displayOnArchives' => 'bool',
            'order' => 'sanitize_text_field',
            'orderBy' => 'sanitize_text_field',
        );
    }


    /**
     * Sanitizes attributes.
     *
     * @param array $attributes
     * @return array
     */
    private function sanitizeAttributes(array $attributes)
    {
        $sanitized_attributes = array();
        foreach ($attributes as $attribute => $value) {
            $convert = $this->getAttributesMap();
            if (isset($convert[ $attribute ])) {
                $sanitize = $convert[ $attribute ];
                if ($sanitize === 'bool') {
                    $sanitized_attributes[ $attribute ] = filter_var(
                        $value,
                        FILTER_VALIDATE_BOOLEAN
                    );
                } else {
                    $sanitized_attributes[ $attribute ] = $sanitize($value);
                }
                // don't pass along attributes with a 0 value
                if ($sanitized_attributes[ $attribute ] === 0) {
                    unset($sanitized_attributes[ $attribute ]);
                }
            }
        }
        return $attributes;
    }


    /**
     * Returns the rendered HTML for the block
     *
     * @param array $attributes
     * @return string
     * @throws DomainException
     * @throws EE_Error
     */
    public function renderBlock(array $attributes = array())
    {
        $attributes = $this->sanitizeAttributes($attributes);
        return (is_archive() || is_front_page() || is_home()) && ! $attributes['displayOnArchives']
            ? ''
            : $this->renderer->render($attributes);
    }
}
