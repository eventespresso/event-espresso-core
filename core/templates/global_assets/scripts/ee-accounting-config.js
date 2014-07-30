/**
 * really short and sweet
 */
if ( typeof(EE_ACCOUNTING_CFG) !== 'undefined' )
	accounting.settings = _.defaults(EE_ACCOUNTING_CFG, accounting.settings);