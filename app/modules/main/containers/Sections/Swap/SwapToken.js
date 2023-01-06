import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// token comes from router
const SwapToken = (props) => {
  const { token } = props.match.params;
  const [value, setValue] = React.useState(100);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Container>
      <SwapContainer>
        <p>{value}</p>
        <p className="right">$GNCO</p>
        <p>10</p>
        <p className="right">${token}</p>
      </SwapContainer>
      <SliderContainer>
        <input type="range" min="0" max="200" value={value} onChange={onChange} />
      </SliderContainer>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #d3d3d3;
  margin: 32px 0;
  padding: 16px;
  border-radius: 4px;
`;

// after pseudo element should be a horizontal line in the middle
const SwapContainer = styled.div`
  border: 1px solid #a7a7a7;
  padding: 16px;
  border-radius: 4px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 1fr;
  gap: 16px;

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
