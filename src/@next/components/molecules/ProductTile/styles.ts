import { media, styled } from "@styles";
import { css } from "styled-components";

const textProps = css`
  margin: 0 0 0.5rem 0;
  text-align: left;
`;

export const Wrapper = styled.div`
  width: 200px;
  height: 300px;
  margin-bottom: 150px;
  margin-right: 40px;
  margin-left: 40px;
  
`;

export const Title = styled.h4`
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 40px;
  font-weight: bold;
  font-size: 1.125rem;
  cursor: default;

`;

export const Price = styled.p`
  margin-top: 15px;
  font-weight: bold;
  line-height: 1.5rem;
  cursor: default;
`;

export const Image = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;

  > img {
    width: 100%;
    height: 100%;
    max-width: 100%;
  }
`;
