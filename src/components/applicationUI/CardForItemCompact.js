import styled from "styled-components";
import BubbleTextForCard from "./BubbleTextForCard";
import IconWithTextForCard from "./IconWithTextForCard";
import goTo from "../../controllers/goTo";
import getImageURL from "../../controllers/getImageURL";
import CustomButton from "../helperComponents/CustomButton";
import { BsThreeDots } from "react-icons/bs";
import { useContext, useState } from "react";
import Context from "../../Context";
import CsPopupOptions from "./PopupOptions";
import CsDeleteItemPopup from "./DeleteItemPopup";
import capitalizeFirstLetter from "../../controllers/capitalizeFirstLetter";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 15px;
  color: var(--elementDim);
  width: 100%;
  gap: 10px;

  align-items: flex-start;

  ${({ $isButton }) => {
    if ($isButton) {
      return ` 
        cursor: pointer;
      &:hover {
    background: var(--surface);
  }`;
    }
  }}

  ${({ $makeRed }) => {
    if ($makeRed) {
      return ` 
        color: #d12000 !important;
      `;
    }
  }}

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  object-fit: cover;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const PrimaryLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const SecondaryLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 90%;
  flex-wrap: wrap;
`;

const TertiaryBubbleLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 90%;
  flex-wrap: wrap;
`;

const TertiaryLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  /* color: var(--element); */
`;

const SmallerTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  /* color: var(--element); */
`;

const PrimaryInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const Buttons = styled.div`
  position: absolute;
  top: 10px;

  right: 10px;
  z-index: 2;
`;

const VirtualCard = styled.div`
  display: flex;
  position: relative;
  animation: centerScaleReveal 0.4s ease-in-out forwards;
  width: 100%;
`;

const PaddingLeft = styled.div`
  margin-left: 5px;
`;

export default function CardForItemCompact({
  makeRed,
  data,
  onCardClick,
  image,
  title,
  smallerTitle,
  bubbleTexts = [],
  line1 = [],
  line2 = [],
  tertiaryBubbleLine = [],

  editPath,
  itemId,

  itemType,
  callback,
  attachedComponent,
}) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { setForm } = useContext(Context);

  if (!line1) line1 = [];
  if (!bubbleTexts) bubbleTexts = [];
  if (!line2) line2 = [];
  if (!tertiaryBubbleLine) tertiaryBubbleLine = [];

  if (!bubbleTexts.map) console.warn("Invalid bubbleText", bubbleTexts);
  if (!line1.map) console.warn("Invalid line1", line1);
  if (!line2.map) console.warn("Invalid bubbleText", line2);
  if (!tertiaryBubbleLine.map)
    console.warn("Invalid tertiaryBubbleLine", tertiaryBubbleLine);

  //tertiaryBubbleLine

  // console.log("ssss", line1);
  // return null;

  if (isDeleted) return null;

  let imageComp = <Image src={getImageURL(image, itemType == "PROFILE")} />;

  if (itemType !== "PROFILE" && !image) imageComp = null;

  let cornerButtons = (
    <Buttons>
      {/* {editPath ? (
          <CustomButton
            onClick={goTo(`/${editPath}/?itemId=${itemId}`)}
            style={{
              width: "40px",
              height: "40px",
              padding: 0,
              gap: "0px",
            }}
            iconStyle={{ fontSize: "15px", padding: 0 }}
            icon={<FaEdit />}
          ></CustomButton>
        ) : null} */}

      <CustomButton
        onClick={openMoreMenu}
        style={{
          width: "40px",
          height: "40px",
          padding: 0,
          gap: "0px",
        }}
        iconStyle={{ fontSize: "15px", padding: 0 }}
        icon={<BsThreeDots />}
      ></CustomButton>
    </Buttons>
  );

  if (itemType == "PROFILE") cornerButtons = null;

  return (
    <VirtualCard>
      {cornerButtons}

      <Container
        $makeRed={makeRed}
        $isButton={onCardClick ? true : false}
        onClick={onCardClick}
      >
        {imageComp}

        <Text>
          <PrimaryLine>
            <PrimaryInfo>
              {title && <Name>{title}</Name>}

              {bubbleTexts.map((item) => (
                <BubbleTextForCard $makeRed={makeRed}>{item}</BubbleTextForCard>
              ))}
            </PrimaryInfo>
          </PrimaryLine>

          {smallerTitle && (
            <SmallerTitle>{capitalizeFirstLetter(smallerTitle)}</SmallerTitle>
          )}

          {line1.length ? (
            <SecondaryLine>
              {line1.map((item) => {
                if (!item) return null;
                if (!item.text) return null;
                return (
                  <IconWithTextForCard onClick={item.onClick} icon={item.icon}>
                    {item.text}
                  </IconWithTextForCard>
                );
              })}
            </SecondaryLine>
          ) : null}

          {line2.length ? (
            <TertiaryLine>
              {line2.map((item) => {
                if (!item) return null;
                if (!item.text) return null;
                return (
                  <IconWithTextForCard
                    highlight={item.highlight}
                    onClick={item.onClick}
                    icon={item.icon}
                  >
                    {item.text}
                  </IconWithTextForCard>
                );
              })}
            </TertiaryLine>
          ) : null}

          {tertiaryBubbleLine.length ? (
            <TertiaryBubbleLine>
              {tertiaryBubbleLine.map((item) => {
                if (!item) return null;
                return (
                  <BubbleTextForCard
                    $highlight={item.highlight}
                    $isButton={item.onClick ? true : false}
                    onClick={item.onClick}
                    icon={item.icon}
                  >
                    {item.text}
                  </BubbleTextForCard>
                );
              })}
            </TertiaryBubbleLine>
          ) : null}

          {attachedComponent}
        </Text>
      </Container>
    </VirtualCard>
  );

  function goToEditPage() {
    if (!editPath)
      return window.popupAlert("Edit is not supported for this item");

    goTo(`/${editPath}/?itemId=${itemId}`)();
  }

  function goToDeletePage() {
    if (!itemType)
      return window.popupAlert("Delete is not supported for this item");

    setForm({
      title: "Delete",
      component: (
        <CsDeleteItemPopup
          itemId={itemId}
          itemType={itemType}
          callback={() => {
            console.log("item deleted...");

            setIsDeleted(true);
            if (callback) {
              callback();
            } else {
              window.popupAlert("Done");
              console.log("Callback does not exists deleted...");
            }
          }}
        />
      ),
    });
  }

  function openMoreMenu() {
    let menuOptions = [
      { label: "Edit", onClick: goToEditPage },
      { label: "Delete", onClick: goToDeletePage },
    ];

    setForm({
      title: "Options",
      component: <CsPopupOptions options={menuOptions} />,
    });
  }
}
