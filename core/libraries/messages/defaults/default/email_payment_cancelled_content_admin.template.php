<table class="head-wrap" bgcolor="#999999">
	<tbody>
		<tr>
			<td></td>
			<td class="header container">
				<div class="content">
					<table bgcolor="#999999">
						<tbody>
							<tr>
								<td>[CO_LOGO]</td>
								<td align="right">
									<h6 class="collapse">[COMPANY]</h6>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</td>
			<td></td>
		</tr>
	</tbody>
</table>

<table class="body-wrap">
	<tbody>
		<tr>
			<td></td>
			<td class="container" bgcolor="#FFFFFF">
				<div class="content">
					<table>
						<tbody>
							<tr>
								<td>
									<h1><?php _e( 'Payment Cancelled Notification', 'event_espresso' ); ?></h1>
									<?php _e( 'The following message was sent to the Primary Registrant of this transaction:', 'event_espresso' ); ?>
									<h3><?php _e( 'Payment Details:', 'event_espresso' ); ?></h3>
									<ul>
										<li>
											<strong><?php _e( 'Payment Status:', 'event_espresso' ); ?></strong> [PAYMENT_STATUS]
										</li>
										<li><strong><?php _e( 'Transaction ID:', 'event_espresso' ); ?></strong>
											<a href="[TRANSACTION_ADMIN_URL]">[TXN_ID]</a></li>
										<li>
											<strong><?php _e( 'Payment Gateway:', 'event_espresso' ); ?></strong> [PAYMENT_GATEWAY]
										</li>
										<li>
											<strong><?php _e( 'Total Cost:', 'event_espresso' ); ?></strong> [TOTAL_COST]
										</li>
										<li>
											<strong><?php _e( 'Payment Amount:', 'event_espresso' ); ?></strong> [AMOUNT_PAID]
										</li>
										<li>
											<strong><?php _e( 'Amount Due:', 'event_espresso' ); ?></strong> [TOTAL_OWING]
										</li>
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="content">
					<h2><?php _e( 'Registrant Details:', 'event_espresso' ); ?></h2>
					<p class="callout"><strong>[PRIMARY_REGISTRANT_FNAME] [PRIMARY_REGISTRANT_LNAME]:</strong>
						<a href="mailto:[PRIMARY_REGISTRANT_EMAIL]">[PRIMARY_REGISTRANT_EMAIL]</a></p>
				</div>
			</td>
			<td></td>
		</tr>
	</tbody>
</table>
