<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;

/**
 * EE_Messenger_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Messenger_Shortcodes contains shortcode parsers for
 * shortcodes that are messenger specific.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @since          4.5.0
 *
 * @package        Event Espresso
 * @subpackage     core/libraries/shortcodes/EE_Messenger_Shortcodes.lib.php
 * @author         Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Messenger_Shortcodes extends EE_Shortcodes
{
    /**
     * Hold array of active messengers indexed by messenger name.
     *
     * @since 4.5.0
     *
     * @var EE_messenger[]
     */
    protected $_active_messengers = array();


    protected function _init_props()
    {
        $this->label = esc_html__('Messenger Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes that are messenger specific.', 'event_espresso');
        /** @type EE_Message_Resource_Manager $message_resource_manager */
        $message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
        // add messages about what happens  when the messenger is active.
        $this->_active_messengers = $message_resource_manager->active_messengers();

        $this->_shortcodes['[DISPLAY_HTML_URL]'] = esc_html__(
            'This will return a link to view the template in a browser if the html messenger is active.',
            'event_espresso'
        );
        $this->_shortcodes['[DISPLAY_PDF_URL]'] = esc_html__(
            'This will return a link to generate a pdf for the template if the pdf messenger is active.',
            'event_espresso'
        );
        $this->_shortcodes['[DISPLAY_PDF_BUTTON]'] = esc_html__(
            'This will return html for a download pdf button trigger if the pdf messenger is active.',
            'event_espresso'
        );

        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $action = $request->getRequestParam('action');
        // show error message about buttons/urls not working as expected if messenger deactivated.
        if ($action === 'update_message_template' && is_admin()) {
            if (! isset($this->_active_messengers['pdf'])) {
                EE_Error::add_attention(
                    esc_html__(
                        'Be aware that the pdf messenger is inactive.  This means that any pdf related shortcodes will parse to an empty string.',
                        'event_espresso'
                    )
                );
            }

            if (! isset($this->_active_messengers['html'])) {
                EE_Error::add_attention(
                    esc_html__(
                        'Be aware that the html messenger is inactive. This means that any html related shortcodes will parse to an empty string.',
                        'event_espresso'
                    )
                );
            }
        }
    }


    protected function _parser($shortcode)
    {
        // make sure we end up with a copy of the EE_Messages_Addressee object
        $recipient = $this->_data instanceof EE_Messages_Addressee ? $this->_data : null;
        $recipient = ! $recipient instanceof EE_Messages_Addressee && is_array(
            $this->_data
        ) && isset($this->_data['data']) && $this->_data['data'] instanceof EE_Messages_Addressee ? $this->_data['data']
            : $recipient;
        $recipient = ! $recipient instanceof EE_Messages_Addressee && ! empty($this->_extra_data['data']) && $this->_extra_data['data'] instanceof EE_Messages_Addressee
            ? $this->_extra_data['data'] : $recipient;

        if (! $recipient instanceof EE_Messages_Addressee) {
            return '';
        }

        switch ($shortcode) {
            case '[DISPLAY_HTML_URL]':
                return isset($this->_active_messengers['html']) ? $this->_get_url($recipient, 'html') : '';
                break;
            case '[DISPLAY_PDF_URL]':
                return isset($this->_active_messengers['pdf']) ? $this->_get_url($recipient, 'pdf') : '';
                break;
            case '[DISPLAY_PDF_BUTTON]':
                return isset($this->_active_messengers['pdf']) ? $this->_get_button($recipient, 'pdf') : '';
                break;
        }
        return '';
    }


    /**
     * This method takes the incoming data and figures out from it what the message type is and evt_id/grp_id and uses
     * that to generate the html for a button in the template.
     *
     * @param EE_Messages_Addressee $recipient
     * @param string                $sending_messenger 'html' or 'pdf'
     *
     * @return string                Generated html
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.5.0
     *
     */
    private function _get_button(EE_Messages_Addressee $recipient, $sending_messenger)
    {
        $download_text = $sending_messenger === 'pdf'
            ? esc_html__('Download PDF', 'event_espresso')
            : esc_html__(
                'Show HTML',
                'event_espresso'
            );
        return '
<form method="post" action="' . $this->_get_url($recipient, $sending_messenger) . '" >
	<input class="print_button" type="submit" value="' . $download_text . '" />
</form>
		';
    }


    /**
     * This method takes the incoming data and figures out from it what the message type is and
     * evt_id/grp_id and uses that to generate the url for displaying the template in a browser.
     *
     * @param EE_Messages_Addressee $recipient
     * @param string                $sending_messenger
     *
     * @return string The generated url for displaying the link.
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.5.0
     *
     */
    private function _get_url(EE_Messages_Addressee $recipient, $sending_messenger)
    {

        $reg = $recipient->reg_obj;
        $reg = ! $reg instanceof EE_Registration ? $recipient->primary_reg_obj : $reg;


        if ($this->_message_type instanceof EE_message_type && $this->_message instanceof EE_Message) {
            EE_Registry::instance()->load_helper('MSG_Template');
            try {
                return EEH_MSG_Template::get_url_trigger(
                    $this->_message_type,
                    $this->_message,
                    $reg,
                    $sending_messenger
                );
            } catch (EE_Error $e) {
                if (WP_DEBUG) {
                    $e->get_error();
                }
            }
        }

        return '';
    }
}
