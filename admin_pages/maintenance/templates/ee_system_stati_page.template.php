<?php

/**
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *
 * @var string $download_system_status_url
 * @var array  $system_stati
 */


/**
 * Recurses through an array to output strings for display.  Considers elements that may be objects as well.
 *
 * @param      $data
 * @param int  $depth
 * @param bool $td if true, then wrap singular (non-array) values with <td></td>
 */
function ee_recurse_into_array_for_display($data, $depth = 0, $td = true)
{
    if (is_object($data) || $data instanceof __PHP_Incomplete_Class) {
        // is_object($incomplete_class) actually returns false, hence why we check for it
        $data = json_decode(json_encode($data), true);
    }
    if (empty($data)) {
        return;
    }
    if (is_array($data)) {
        $depth++;
        ksort($data, SORT_NATURAL | SORT_FLAG_CASE);
        if (EEH_Array::is_associative_array($data)) { ?>
            <table class='ee-system-stati ee-system-stati-<?php echo absint($depth); ?>'>
                <tbody>
                    <?php foreach ($data as $data_key => $data_value) {
                        // if the value is a single element array with no key,
                        // and the value is a primitive (not an array, object, etc.)
                        if (
                            is_array($data_value)
                            && count($data_value) === 1
                            && empty(key($data_value))
                            && is_scalar(reset($data_value))
                        ) {
                            ?>
                            <tr>
                                <td class="ee-system-stati-value" colspan="2">
                                    <?php echo esc_html(reset($data_value)); ?>
                                </td>
                            </tr>
                            <?php
                            continue;
                        }
                        ?>
                        <tr>
                            <td class='ee-system-stati-key'>
                                <span class="ee-system-stati-label">
                                    <?php echo esc_html(str_replace(['_', '-'], ' ', $data_key)); ?>
                                </span>
                                <?php if (is_array($data_value)) { ?>
                                    <span class="ee-system-stati-count">
                                    (&nbsp;<?php echo count($data_value); ?>&nbsp;)
                                </span>
                                <?php } ?>
                            </td>
                            <?php if (is_scalar($data_value)) { ?>
                                <?php ee_recurse_into_array_for_display($data_value, $depth); ?>
                            <?php } else {
                                if (is_array($data_value) && count($data_value) === 1) {
                                    // verify that values have been set
                                    $keys_only = empty(
                                        array_filter(
                                            array_values($data_value),
                                            function ($v) {
                                                return $v !== null && (is_array($v) || trim($v) !== '');
                                            }
                                        )
                                    );
                                    // if the array only consists of keys (no values)
                                    if ($keys_only) {
                                        // then use keys for values
                                        $data_value = array_keys($data_value);
                                        // but if there is only one value now
                                        if (count($data_value) === 1) {
                                            // then pass that single value back into this function
                                            // this prevents extra empty layers of nothing being added to the output
                                            ee_recurse_into_array_for_display(reset($data_value), $depth);
                                            // need to finish the row off though
                                            echo '</tr>';
                                            continue;
                                        }
                                    }
                                } ?>
                                <td class="ee-system-stati-sub-values">
                                    <?php ee_recurse_into_array_for_display($data_value, $depth); ?>
                                </td>
                            <?php } ?>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        <?php } elseif (count($data) > 1) { ?>
            <ul class='ee-system-stati ee-system-stati-<?php echo absint($depth); ?>'>
                <?php foreach ($data as $datum) { ?>
                    <li>
                        <?php ee_recurse_into_array_for_display($datum, $depth, false); ?>
                    </li>
                <?php } ?>
            </ul>
        <?php } else {
            // there's no key (label) and there's only one value,
            // so let's just pass that value back into this function,
            // but reset the depth back to where it was.
            // this prevents extra empty layers of nothing being added to the output
            $depth--;
            ee_recurse_into_array_for_display(reset($data), $depth, false);
        }
    } else {
        echo $td ? '<td class="ee-system-stati-value">' : '';
        // simple value
        echo $data;
        echo $td ? '</td>' : '';
    }
}

?>

<h1>
    <?php esc_html_e("System Information", "event_espresso"); ?>
    <a class='button--secondary'
       href="<?php echo esc_url_raw($download_system_status_url); ?>"
    >
        <?php esc_html_e('Download to File', 'event_espresso'); ?>
    </a>
</h1>
<div class='ee-system-stati-dv'>
    <?php ee_recurse_into_array_for_display($system_stati) ?>
</div>
