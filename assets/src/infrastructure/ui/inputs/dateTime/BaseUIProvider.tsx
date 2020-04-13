import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

const engine = new Styletron();

const BaseUIProvider: React.FC = ({ children }) => {
	return (
		<StyletronProvider value={engine}>
			<BaseProvider theme={LightTheme}>{children}</BaseProvider>
		</StyletronProvider>
	);
};

export default BaseUIProvider;
