
	<div class="print_button_div">
		<form>
			<input class="print_button noPrint" type="button" value=" Print Invoice " onclick="window.print();return false;" />
		</form>
		<form method="post" action="<?php echo home_url(); ?>/?download_invoice=true&amp;attendee_id=<?php echo $data->attendee->id ?>&amp;registration_id=<?php echo $data->attendee->registration_id ?>" >
			<input class="print_button noPrint" type="submit" value=" Download PDF " />
		</form>
		<div class="clear"></div>
	</div>

</body>
</html>