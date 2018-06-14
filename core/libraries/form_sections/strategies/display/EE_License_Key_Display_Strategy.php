<?php
/* phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace */
/* phpcs:disable Squiz.Classes.ValidClassName.NotCamelCaps */
/**
 * EE_License_Key_Display_Strategy
 * An input that receives a license key (and has a validation indicator)
 *
 * @package EventEspresso
 * @author  Darren Ethier
 * @since   $VID:$
 */
class EE_License_Key_Display_Strategy extends EE_Text_Input_Display_Strategy
{
    /**
     * Whether or not the key has been verified (informs the style of the indicator)
     * @var bool
     */
    private $verified;

    public function __construct($verified = false)
    {
        $this->verified = $verified;
        parent::__construct('text');
    }

    public function display()
    {
        $input = parent::display();
        $verified_class = $this->verified ? 'ee-icon-color-ee-green' : 'ee-icon-color-ee-red';
        $input .= '<span class="dashicons dashicons-admin-network ' . $verified_class . ' ee-icon-size-20"></span>';
        return $input;
    }
}
