<?php

namespace EventEspresso\core\services\form\meta;

use EventEspresso\core\services\json\JsonDataHandler;

/**
 * Class FormLabel
 * For managing the admin and public labels for a form element
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\form\meta
 * @since   $VID:$
 */
class FormLabel implements JsonableInterface
{
    /**
     * @var JsonDataHandler
     */
    private $json_data_handler;

    /**
     * Input label displayed in the admin to help differentiate input from others
     *
     * @var string
     */
    private $adminLabel;

    /**
     * Input label displayed on public forms, ie: the actual question text.
     *
     * @var string
     */
    private $publicLabel;

    /**
     * @var bool
     */
    private $showLabel;

    /**
     * The HTML block displayed for block elements.
     *
     * @var string
     */
    private $html;


    /**
     * FormLabel constructor.
     *
     * @param JsonDataHandler $json_data_handler
     * @param string          $adminLabel
     * @param string          $publicLabel
     * @param bool            $showLabel
     * @param string $html
     */
    public function __construct(
        JsonDataHandler $json_data_handler,
        $adminLabel,
        $publicLabel,
        $showLabel,
        $html
    ) {
        $adminLabel = (string) $adminLabel;
        $publicLabel = (string) $publicLabel;
        $showLabel = (bool) $showLabel;
        $html = (string) $html;
        $this->json_data_handler = $json_data_handler;
        $this->setAdminLabel($adminLabel);
        $this->setPublicLabel($publicLabel);
        $this->setShowLabel($showLabel);
        $this->setHtml($html);
    }


    /**
     * @param string $json
     * @return FormLabel
     */
    public static function fromJson($json)
    {
        $json_data_handler = new JsonDataHandler();
        $json_data_handler->configure(JsonDataHandler::DATA_TYPE_OBJECT);
        $data        = $json_data_handler->decodeJson($json);
        $adminLabel  = isset($data->adminLabel) ? $data->adminLabel : '';
        $publicLabel = isset($data->publicLabel) ? $data->publicLabel : '';
        $showLabel   = isset($data->showLabel) ? $data->showLabel : false;
        $html        = isset($data->html) ? $data->html : '';
        return new FormLabel($json_data_handler, $adminLabel, $publicLabel, $showLabel, $html);
    }


    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'adminLabel'  => $this->adminLabel,
            'publicLabel' => $this->publicLabel,
            'showLabel'   => $this->showLabel,
            'html'        => $this->html,
        ];
    }


    /**
     * @return string
     */
    public function toJson()
    {
        return $this->json_data_handler->encodeData($this->toArray());
    }


    /**
     * Input label displayed in the admin to help differentiate input from others
     *
     * @return string
     */
    public function adminLabel()
    {
        return $this->adminLabel;
    }


    /**
     * @param string $adminLabel
     * @return void
     */
    public function setAdminLabel($adminLabel)
    {
        $this->adminLabel = sanitize_text_field($adminLabel);
    }


    /**
     * Input label displayed on public forms, ie: the actual question text.
     *
     * @return string
     */
    public function publicLabel()
    {
        return $this->publicLabel;
    }


    /**
     * @param string $publicLabel
     * @return void
     */
    public function setPublicLabel($publicLabel)
    {
        $this->publicLabel = sanitize_text_field($publicLabel);
    }


    /**
     * @return bool
     */
    public function showLabel()
    {
        return $this->showLabel;
    }


    /**
     * @param bool|int|string $showLabel
     * @return void
     */
    public function setShowLabel($showLabel)
    {
        $this->showLabel = filter_var($showLabel, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return string
     */
    public function html()
    {
        return $this->html;
    }


    /**
     * @param string $html
     * @return void
     */
    public function setHtml($html)
    {
        $this->html = wp_kses_post($html);
    }
}
