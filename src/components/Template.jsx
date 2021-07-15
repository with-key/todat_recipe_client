import React from 'react';
import styled from 'styled-components';

// compo
import Header from './Header';
import Footer from './Footer';

const Template = ({ children }) => {
	return (
		<Container>
			<Header />
			<Section>{children}</Section>
			<Footer />
		</Container>
	);
};

const Container = styled.section``;
const Section = styled.section`
	min-height: calc(100vh - 440px);
	justify-content: center;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
export default Template;
