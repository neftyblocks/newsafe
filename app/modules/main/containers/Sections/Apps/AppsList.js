import React, { Component } from 'react';
import styled from 'styled-components';
import app1 from '../../../../../../resources/apps/sample.jpeg';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin: 0 auto;
`;

const CountryContainer = styled.a`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  height: 320px;
  position: relative;
`;

// this image is the background of its container
const CountryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;

const CountryBanner = styled.div`
  backdrop-filter: blur(10px);
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

export default class AppsList extends Component<Props> {
  render() {
    return (
      <Container>
        <CountryContainer href="https://newocean.xyz" target="_blank">
          <CountryImage src={app1} />
          <CountryBanner>
            <p>Newocean</p>
          </CountryBanner>
        </CountryContainer>
        <CountryContainer>
          <CountryImage src={app1} />
          <CountryBanner>
            <p>Newlife</p>
          </CountryBanner>
        </CountryContainer>
      </Container>
    );
  }
}
