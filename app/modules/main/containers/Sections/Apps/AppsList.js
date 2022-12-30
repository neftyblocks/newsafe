import React, { Component } from 'react';
import styled from 'styled-components';
import app1 from '../../../../../../resources/apps/sample2.png';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin: 0 auto;
`;

const AppContainer = styled.a`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  height: 320px;
  position: relative;
`;

// this image is the background of its container
const AppImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;

const AppBanner = styled.div`
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.3);
  height: 25%;
  width: 100%;
  position: absolute;
  bottom: 0;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
`;

const AppLogo = styled.svg`
  width: 50px;
  height: 50px;
  display: block;
  color: white;
  background: #000;
  padding: 10px;
  border-radius: 10px;
  flex-shrink: 0;
`;

const Bold = styled.span`
  font-weight: bold;
`;

export default class AppsList extends Component<Props> {
  render() {
    return (
      <Container>
        <AppContainer href="https://newocean.xyz" target="_blank">
          <AppImage src={app1} />
          <AppBanner>
            <AppLogo xmlns="http://www.w3.org/2000/svg" aria-label="Newocean logo">
              <use xlinkHref="#newocean_logo" />
            </AppLogo>
            <p><Bold>Newocean</Bold> is a markteplace for curated digital art drops</p>
          </AppBanner>
        </AppContainer>
      </Container>
    );
  }
}
