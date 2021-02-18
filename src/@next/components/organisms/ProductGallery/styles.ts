import { styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "sidebar preview";
  height: 540px;
  max-height: 540px;
  grid-template-columns: 76px 1fr;
  grid-column-gap: 20px;
`;

export const Thumbnail = styled.div<{ activeThumbnail: boolean }>`
  width: 88.83px;
  height: 110px;
  display: flex;
  border-width: 5px;
  border-style: solid;
  border-color: ${props =>
    props.activeThumbnail === true
      ? props.theme.colors.thumbnailBorder
      : "transparent"};
  justify-content: center;
  height: 100px;
  overflow: hidden;
  
  margin-top: 1px;
  margin-bottom: 1px;
  border-radius: 7px;
`;

export const Button = styled.div`
  height: 50px;
  width: 100%;
  position: absolute;
  z-index: 1;
  background-color: rgba(50, 50, 50, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const TopButton = styled(Button)`
  top: 0%;
  transform: rotate(180deg);
`;

export const BottomButton = styled(Button)`
  bottom: 9%;
`;

export const ThumbnailsContainer = styled.div`
  position: relative;
`;

export const ThumbnailList = styled.div`
  position: relative;
  height: 91%;
  max-height: 91%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0px;
  }

  ul {
    position: absolute;
    display: block;
    padding: 0;
    margin: 0;
  }
  width: 96px;
`;

export const Preview = styled.div`
  grid-area: preview;
  overflow: hidden;
  width: 554px;
  height: 686px;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
