import React from 'react';
import styled from 'styled-components';
import app1 from '../../../../../../resources/apps/sample2.png';

const { shell } = require('electron');

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin: 0 auto;
`;

const AppContainer = styled.li`
  height: 320px;
  list-style: none;
  padding: 0;
  
  a, button {
    cursor: pointer;
    border: none;
    padding: 0;
    text-decoration: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    background: none;
    width: 100%;
  }

  span {
    font-weight: bold;
  }

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

const AppsList = () => {
  const onClick = (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  };

  return (
    <Container>
      <AppContainer>
        <a href="https://newocean.xyz" target="_blank" rel="noopener noreferrer">
          <AppImage src={app1} />
          <AppBanner>
            <AppLogo xmlns="http://www.w3.org/2000/svg" aria-label="Newocean logo">
              <use xlinkHref="#newocean_logo" />
            </AppLogo>
            <p><span>Newocean</span> is a markteplace for curated digital art drops</p>
          </AppBanner>
        </a>
      </AppContainer>
      <AppContainer>
        <button onClick={e => onClick(e, 'https://newlife.io')}>
          <AppImage src={app1} />
          <AppBanner>
            <AppLogo xmlns="http://www.w3.org/2000/svg" aria-label="Newocean logo">
              <use xlinkHref="#newocean_logo" />
            </AppLogo>
            <p><span>Newlife</span></p>
          </AppBanner>
        </button>
      </AppContainer>
      <AppContainer>
        <button onClick={e => onClick(e, 'https://www.newforum.xyz')}>
          <AppImage src={app1} />
          <AppBanner>
            <AppLogo xmlns="http://www.w3.org/2000/svg" aria-label="Newocean logo">
              <use xlinkHref="#newocean_logo" />
            </AppLogo>
            <p><span>Newforum</span></p>
          </AppBanner>
        </button>
      </AppContainer>
      <AppContainer>
        <button onClick={e => onClick(e, 'https://www.new.foundation')}>
          <AppImage src={app1} />
          <AppBanner>
            <AppLogo xmlns="http://www.w3.org/2000/svg" aria-label="Newocean logo">
              <use xlinkHref="#newocean_logo" />
            </AppLogo>
            <p><span>Newfoundation</span></p>
          </AppBanner>
        </button>
      </AppContainer>
    </Container>
  );
};

export default AppsList;
