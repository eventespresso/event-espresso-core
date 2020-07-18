import React from 'react';

import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import Row from './Row';
import Sidebar from './Sidebar';
import Stack from './Stack';
import type { ContainerProps } from './types';
import './styles.scss';

const Container: React.FC<ContainerProps> = ({
	classes,
	content,
	footer,
	header,
	sidebarAfter,
	sidebarBefore,
	...props
}) => {
	return (
		<Stack {...props} className={classes?.container}>
			<Header className={classes?.header}>{header}</Header>
			<Row className={classes?.body}>
				<Sidebar before className={classes?.sidebarBefore}>
					{sidebarBefore}
				</Sidebar>
				<Content className={classes?.content}>{content}</Content>
				<Sidebar className={classes?.sidebarAfter}>{sidebarAfter}</Sidebar>
			</Row>
			<Footer className={classes?.footer}>{footer}</Footer>
		</Stack>
	);
};

export default Container;
