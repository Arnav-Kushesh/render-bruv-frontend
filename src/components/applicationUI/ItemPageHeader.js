import styled from "styled-components";
import getImageURL from "../../controllers/getImageURL";
import BubbleTextForPageHeader from "./BubbleTextForPageHeader";
import IconWithTextForPageHeader from "./IconWithTextForPageHeader";
import CustomButton from "../helperComponents/CustomButton";
import goTo from "../../controllers/goTo";
import { RiEdit2Line } from "react-icons/ri";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 300px;
  gap: 20px;
  margin-top: 50px;
  width: 100%;
  align-items: center;
`;

const Column1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70vw;
`;

const Image = styled.img`
  object-fit: cover;
  width: 200px;
  border-radius: 15px;
  height: 200px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 0 14px;
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
  color: var(--element);
  text-transform: capitalize;
`;

const Desc = styled.div`
  font-size: 12px;
  text-transform: capitalize;
  color: var(--elementDim);
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 10px;
`;

const TopSection = styled.div`
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  overflow: hidden;
  width: 100%;
  min-height: 200px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  gap: 15px;
`;

const PrimaryLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const SecondaryLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const PaddingLeft = styled.div`
  margin-left: 20px;
`;

export default function ItemPageHeader({
  image,
  title,
  bubbleTexts = [],
  line = [],
  buttons = [],
}) {
  return (
    <TopSection>
      {image ? <Image src={getImageURL(image)}></Image> : <PaddingLeft />}

      <Right>
        <PrimaryLine>
          <Title>{title}</Title>

          {bubbleTexts.map((item) => (
            <BubbleTextForPageHeader>{item}</BubbleTextForPageHeader>
          ))}
        </PrimaryLine>
        <SecondaryLine>
          {line.map((item) => (
            <IconWithTextForPageHeader onClick={item.onClick} icon={item.icon}>
              {item.text}
            </IconWithTextForPageHeader>
          ))}
        </SecondaryLine>

        <Buttons>
          {buttons.map((item) => (
            <CustomButton onClick={item.onClick} icon={<RiEdit2Line />}>
              {item.text}
            </CustomButton>
          ))}
        </Buttons>
      </Right>
    </TopSection>
  );
}
