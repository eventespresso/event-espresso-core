<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">

	<table id="admin-primary-mbox-txn-details-tbl" class="form-table">
		<tbody>
		<?php foreach ( $txn_details as $key => $txn_detail ) : ?>
			<tr>
				<th>
					<label for="<?php echo $key;?>"><?php echo $txn_detail['label'];?></label>
				</th>
				<td>
					<?php echo $txn_detail['value'];?>
				</td>
			</tr>
		<?php endforeach; // $txn_details?>
		</tbody>
	</table>	

</div>
