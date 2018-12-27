<?php

/*
* To change this template, choose Tools | Templates
* and open the template in the editor.
*/

/**
 * Recurses through an array to output strings for display.  Considers elements that may be objects as well.
 *
 * @param $data
 */
function ee_recurse_into_array_for_display($data)
{
    if (is_object($data)
        || $data instanceof __PHP_Incomplete_Class
    ) {// is_object($incomplete_class) actually returns false, hence why we check for it
        $data = json_decode(json_encode($data), true);
    }
    if (is_array($data)) {
        if (EEH_Array::is_associative_array($data)) {
            ?>
            <table class="widefat">
                <tbody>
                <?php
                foreach ($data as $data_key => $data_values) {
                    ?>
                    <tr>
                        <td>
                            <?php echo $data_key; ?>
                        </td>
                        <td>
                            <?php ee_recurse_into_array_for_display($data_values); ?>
                        </td>
                    </tr>
                    <?php
                } ?>
                </tbody>
            </table>
            <?php
        } else {
            ?>
            <ul>
                <?php
                foreach ($data as $datum) {
                    echo "<li>";
                    ee_recurse_into_array_for_display($datum);
                    echo "</li>";
                } ?>
            </ul>
            <?php
        }
    } else {
        // simple value
        echo $data;
    }
}

?>
<h1>
    <?php _e("System Information", "event_espresso"); ?> <a href="<?php echo $download_system_status_url; ?>"
                                                            class="button-secondary">
        <?php esc_html_e(
            'Download to File',
            'event_espresso'
        ); ?></a>
</h1>
<div class="padding">

    <table class="widefat">
        <?php
        foreach ($system_stati as $status_category_slug => $data) {
            if (is_object($data)) {
                $data = json_decode(json_encode($data), true);
            }
            ?>
            <thead>
            <tr>
                <th colspan=2>
                    <?php echo $status_category_slug; ?>
                </th>
            </tr>
            </thead>
            <tbody>
            <?php
            if (is_array($data)) {
                foreach ($data as $data_key => $data_values) {
                    ?>
                    <tr>
                        <td>
                            <?php echo $data_key ?>
                        </td>
                        <td>
                            <?php ee_recurse_into_array_for_display($data_values) ?>
                        </td>
                    </tr>
                    <?php
                } ?>
                </tbody>
                <?php
            } else {
                ?>
                <tbody>
                <tr>
                    <td colspan=2>
                        <?php echo $data; ?>
                    </td>
                </tr>
                </tbody>
                <?php
            }
        }
        ?>
    </table>

</div>