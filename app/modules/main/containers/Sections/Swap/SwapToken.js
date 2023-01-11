import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Breadcrumb } from 'semantic-ui-react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { changeModule } from '../../../actions/navigation';
import { getCurrencyBalance } from '../../../../../shared/utils/newcoin/socialCoins';

// token comes from router
const SwapToken = (props) => {
  const dispatch = useDispatch();
  const account = useSelector(state => state.settings.account);
  const connection = useSelector(state => state.connection);
  const { token } = props.match.params;
  const { data } = useQuery(['account_balance', account], () => getCurrencyBalance(account, connection));

  const [value, setValue] = React.useState(100);
  const percentage = Math.floor((value / data) * 100);
  const fee = value * 0.17;
  const toReceive = (value - fee).toFixed(4);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBreadcrumbClick = (e, eData) => {
    dispatch(changeModule(eData.name));
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Section
          link
          name="swap"
          onClick={onBreadcrumbClick}
        >
          Swap
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section>GNCO-{token}</Breadcrumb.Section>
      </Breadcrumb>
      <SwapContainer>
        <svg xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true">
          <use xlinkHref="#exchange" />
        </svg>
        <p>{value}</p>
        <p className="right">$GNCO</p>
        <p>{toReceive}</p>
        <p className="right">${token}</p>
      </SwapContainer>
      <SliderContainer>
        <input type="range" min="100" max={data} value={value} onChange={onChange} />
      </SliderContainer>
      <p>
        {percentage}% from {data} $GNCO balance A 17% fee (${fee.toFixed(4)} GNCO)
        will be distributed to the community
      </p>
      <button>Confirm swap</button>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #d3d3d3;
  margin: 32px;
  padding: 16px;
  border-radius: 4px;

  > p {
    text-align: center;
    margin: 16px 0;
  }

  button {
    display: block;
    margin: 32px 0;
    width: 100%;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #a7a7a7;
    border-radius: 4px;
    cursor: pointer;
  }
`;

// after pseudo element should be a horizontal line in the middle
const SwapContainer = styled.div`
  border: 1px solid #a7a7a7;
  padding: 32px;
  border-radius: 4px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  margin: 32px;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #a7a7a7;
    position: absolute;
    top: 50%;
    left: 0;
  }

  .right {
    text-align: right;
  }

  p {
    margin: 28px 0;
    font-size: 25px;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    z-index: 1;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;

  input[type='range'] {
    -webkit-appearance:none !important;
    width: 100%;
    height: 2px;
    background: black;
    border: none;
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none !important;
      width: 30px;
      height:30px;
      background: black;
      border: 2px solid black;
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;


SwapToken.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};

export default SwapToken;
