<?php
namespace EventEspresso\core\services\formatters;
use EventEspresso\core\exceptions\InvalidDataTypeException;

defined('EVENT_ESPRESSO_VERSION') || exit;




/**
 * Class FormatterBase
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
abstract class FormatterBase implements FormatterInterface
{
    /**
     * Recurisvely applies the formatting to all VALUES in this multi-dimensional array
     * @param array $input
     * @return array
     */
    public function format_array($input)
    {
        if(!is_array($input)){
            throw new InvalidDataTypeException('input',$input,'array');
        }
        array_walk_recursive(
            $input,
            function( &$value, $key ){
                if(is_string($value)){
                    $value = $this->format($value);
                }
            }
        );
        return $input;
    }


}
// End of file FormatterBase.php
// Location: core\services\formatters/FormatterBase.php