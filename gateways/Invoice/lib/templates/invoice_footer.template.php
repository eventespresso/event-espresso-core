
	<div class="print_button_div">
		<form>
			<input class="print_button noPrint" type="button" value=" Print Invoice " onclick="window.print();return false;" />
		</form>
		<form method="post" action="<?php echo $download_link ?>" >
			<input class="print_button noPrint" type="submit" value=" Download PDF " />
		</form>
		<div class="clear"></div>
	</div>

</body>
</html>