import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import badge from '../../../../../../resources/apps/badge-sample.jpeg';

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
`;

const BadgeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

const BadgeTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const BadgeDescription = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

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

  console.log('badges account: ', account);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.length === 0) {
    return <div>No badges for you :(</div>;
  }

  return (
    <Container>
      <BadgeContainer>
        <BadgeImage src={badge} alt="Badge image" />
        <BadgeTitle>10 DAO proposals</BadgeTitle>
        <BadgeDescription>Jan 1, 2023</BadgeDescription>
      </BadgeContainer>
      <BadgeContainer>
        <BadgeImage src={badge} alt="Badge image" />
        <BadgeTitle>10 DAO proposals</BadgeTitle>
        <BadgeDescription>Jan 1, 2023</BadgeDescription>
      </BadgeContainer>
      <BadgeContainer>
        <BadgeImage src={badge} alt="Badge image" />
        <BadgeTitle>10 DAO proposals</BadgeTitle>
        <BadgeDescription>Jan 1, 2023</BadgeDescription>
      </BadgeContainer>
    </Container>
  );
};

export default BadgesList;
