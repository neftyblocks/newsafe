import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import badge from '../../../../../../resources/apps/badge-sample.jpeg';

const BadgesList = () => {
  const account = useSelector(state => state.settings.account);
  const { isLoading, data, error } = useQuery(`badges-account-${account}`, async () => {
    const result = await fetch(`https://api.newgra.ph/v1/user/badge/list?username=${account}`);
    if (result.status === 404) {
      return [];
    }
    if (!result.ok) {
      throw new Error('Error fetching badges');
    }
    const { value } = await result.json();
    return value;
  });

  if (isLoading) {
    return <MessageContainer><p>Loading...</p></MessageContainer>;
  }

  if (error) {
    return <MessageContainer error><p>Error: {error.message}</p></MessageContainer>;
  }

  if (data.length === 0) {
    return <MessageContainer><p>No badges for you :(</p></MessageContainer>;
  }

  return (
    <Container>
      <BadgeContainer>
        <img src={badge} alt="Badge" />
        <p className="badge-title">10 DAO proposals</p>
        <p className="badge-description">Jan 1, 2023</p>
      </BadgeContainer>
      <BadgeContainer>
        <img src={badge} alt="Badge" />
        <p className="badge-title">10 DAO proposals</p>
        <p className="badge-description">Jan 1, 2023</p>
      </BadgeContainer>
      <BadgeContainer>
        <img src={badge} alt="Badge" />
        <p className="badge-title">10 DAO proposals</p>
        <p className="badge-description">Jan 1, 2023</p>
      </BadgeContainer>
    </Container>
  );
};

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 24px;
  margin: 0 auto;
  padding: 0;
`;

const BadgeContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }

  .badge-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }

  .badge-description {
    font-size: 14px;
    font-weight: 400;
  }
`;
// should be min-height: 200px and center the content
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  font-size: 20px;
  font-weight: 600;
  color: ${props => (props.error ? 'red' : 'black')}
`;

export default BadgesList;
