import styled from "styled-components";
import BubbleTextForCard from "./BubbleTextForCard";
import goTo from "../../controllers/goTo";
import getImageURL from "../../controllers/getImageURL";
import CustomButton from "../helperComponents/CustomButton";
import { useContext, useState } from "react";
import Context from "../../Context";
import capitalizeFirstLetter from "../../controllers/capitalizeFirstLetter";
import contentCardButtonStyle from "../../data/contentCardButtonStyle";
import { FiMoreVertical } from "react-icons/fi";
import TextWithLinkSupport from "./TextWithLinkSupport";
import DeleteItemPopup from "./DeleteItemPopup";
import PopupOptions from "./PopupOptions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 15px;
  color: var(--elementDim);
  width: 100%;
  gap: 30px;

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
  height: auto;
  width: 100%;
  max-height: 50vh;
  border-radius: 10px;
  object-fit: cover;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
`;

const BubbleLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 90%;
  flex-wrap: wrap;
  margin-top: 18px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
`;

const Desc = styled.div`
  font-size: 14px;
  font-weight: 600;

  white-space: pre-wrap; /* Preserve line breaks and wrap text */
  /* color: var(--element); */
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export default function CardForItem({
  image,
  title,
  description,
  bubbleLine = [],
  buttons,
  editPath,
  itemId,
  item,
  itemType,
  callback,
  overrideComp,
  additionalComp,
}) {
  const { loggedInUser } = useContext(Context);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setForm } = useContext(Context);

  if (!bubbleLine) bubbleLine = [];

  if (!bubbleLine.map) console.warn("Invalid bubbleLine", bubbleLine);

  if (isDeleted) return null;

  let imageComp = image ? <Image src={getImageURL(image)} /> : null;

  let comp = (
    <>
      {imageComp}

      <Text>
        {title && <Title>{title}</Title>}

        {description && (
          <Desc>
            <TextWithLinkSupport
              text={capitalizeFirstLetter(description)}
            ></TextWithLinkSupport>
          </Desc>
        )}

        {additionalComp ? additionalComp : null}

        {bubbleLine.length ? (
          <BubbleLine>
            {bubbleLine.map((item) => {
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
          </BubbleLine>
        ) : null}
      </Text>
    </>
  );

  if (overrideComp) comp = overrideComp;

  return (
    <Container>
      {comp}

      <Buttons>
        {buttons}
        <CustomButton
          onClick={openMoreMenu}
          style={{
            width: "30px",
            height: "40px",
            padding: 0,
            gap: "0px",
            ...contentCardButtonStyle,
          }}
          iconStyle={{ fontSize: "15px", padding: 0 }}
          icon={<FiMoreVertical />}
        ></CustomButton>
      </Buttons>
    </Container>
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
        <DeleteItemPopup
          itemId={itemId}
          itemType={itemType}
          callback={() => {
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
      {
        label: "Report Item",
        onClick: goTo(`/report/?itemId=${itemId}&itemType=CONTENT`),
      },
    ];

    if (loggedInUser && item.author) {
      if (loggedInUser._id == item.author._id) {
        menuOptions = [
          { label: "Edit", onClick: goToEditPage },
          { label: "Delete", onClick: goToDeletePage },
        ];
      }
    }

    setForm({
      title: "Options",
      component: <PopupOptions options={menuOptions} />,
    });
  }
}
