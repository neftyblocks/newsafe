import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSocialCoins } from '../../../../../shared/utils/newcoin/socialCoins';
import { changeModule } from '../../../actions/navigation';

const SwapTokenChoose = () => {
  const dispatch = useDispatch();
  const connection = useSelector((state) => state.connection);
  const [handle, setHandle] = useState(null);
  const [input, setInput] = useState('');
  const { data } = useQuery(['tokens', input, connection], () => getSocialCoins(input, connection));

  const onChange = (e) => {
    if (handle) {
      clearTimeout(handle);
    }
    const { value } = e.target;
    const newHandle = setTimeout(() => {
      setInput(value);
      setHandle(null);
    }, 500);
    setHandle(newHandle);
  };

  const onClick = (code) => {
    dispatch(changeModule(`swap/GNCO/${code}`));
  };

  return (
    <div>
      <h1>Swap Token Choose</h1>
      <p>Choose the token you want to swap</p>
      <div className="ui icon input">
        <input type="text" placeholder="Search..." onChange={onChange} />
        <i className="search icon" />
      </div>
      {data ? (
        <TokensGrid>
          {data.map((token) => (
            <TokenContainer key={token.code}>
              <button onClick={() => onClick(token.code)}>
                <h2>${token.code}</h2>
                <p>Owned by: {token.owner}</p>
              </button>
            </TokenContainer>
          ))}
        </TokensGrid>
      ) : null}
    </div>
  );
};

const TokensGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 12px;
  list-style: none;
  padding: 0;
`;

const TokenContainer = styled.li`
  border: 1px solid #000;
  padding: 10px;

  button {
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  h2 {
    margin: 0;
  }
`;

export default SwapTokenChoose;