<?php
/**
 * @var string[][] $txn_details
 */
?>

<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
    <table id="admin-primary-mbox-txn-details-tbl" class="form-table">
        <tbody>
            <?php foreach ($txn_details as $key => $txn_detail) : ?>
                <tr>
                    <th>
                        <label for="<?php echo esc_attr($key); ?>">
                            <?php echo esc_html($txn_detail['label']); ?>
                        </label>
                    </th>
                    <td>
                        <?php echo esc_html($txn_detail['value']); ?>
                    </td>
                </tr>
            <?php endforeach; // $txn_details?>
        </tbody>
    </table>
</div>
