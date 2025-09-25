import styled from "styled-components";
import { useEffect, useState } from "react";
import LoadingSection from "../../../helperComponents/LoadingSection";
import { serverLine } from "../../../../controllers/network/serverLine";
import goTo from "../../../../controllers/goTo";
import MaterialInput from "../../../helperComponents/MaterialInput";
import DropDownInput from "../../../helperComponents/DropDownInput";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import getUrlQuery from "../../../../controllers/getUrlQuery";
import ImagePicker from "../../../editors/ImagePicker";
import contentPurposes from "../../../../data/contentPurposeTypes";
import CustomCheckbox from "../../../helperComponents/CustomCheckbox";
import DropDownLocationInput from "../../../helperComponents/DropDownLocationInput";
import PrimaryButton from "../../../helperComponents/PrimaryButton";
import ngoTypes from "../../../../data/ngoTypes";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";

const initialLocation = { lat: 23.398831924485105, lng: 78.19784084625248 };

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  /* margin-top: 100px; */
  align-items: center;
`;

const Inputs = styled.div`
  border-radius: 10px;
  display: flex;
  width: 600px;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const InputItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  width: 100%;
  border-radius: 15px;
  background-color: var(--surface3);
  border: 1px solid var(--borderDim);
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 15px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Buttons = styled.div`
  width: 38vw;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
`;

const MapSection = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
`;

let dropDownStyle = { flex: 1 };

export default function AddOrEditContent({}) {
  const [itemId, setItemId] = useState(null);
  const [item, setItem] = useState({ images: [] });
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState("ADD");
  const [forcedMapUpdateCode, setForcedMapUpdateCode] = useState("random123");

  console.log("item", item);

  useEffect(() => {
    let newitemId = getUrlQuery("itemId");
    setItemId(newitemId);

    if (newitemId) setActionType("UPDATE");
  }, []);

  useEffect(() => {
    if (actionType == "UPDATE") {
      setLoading(true);
      if (itemId) {
        loadItemToBeEdited();
      }
    } else {
      let newItem = { ...item };

      let defaultPurpose = getUrlQuery("defaultPurpose");

      if (defaultPurpose) {
        newItem["purpose"] = defaultPurpose;
      }

      newItem.latitude = initialLocation.lat;
      newItem.longitude = initialLocation.lng;

      setItem(newItem);
    }
  }, [itemId]);

  let titleLine1 = "Create";
  let titleLine2 = "Post";

  if (actionType == "UPDATE") {
    titleLine1 = "Edit";
    titleLine2 = "Post";
  }

  if (loading) {
    return (
      <LoggedInBoilerplate
        showBackButton={true}
        titleLine1={titleLine1}
        titleLine2={titleLine2}
      >
        <LoadingSection />
      </LoggedInBoilerplate>
    );
  }

  return (
    <LoggedInBoilerplate
      showBackButton={true}
      titleLine1={titleLine1}
      titleLine2={titleLine2}
    >
      <Container>
        <Inputs>
          <UploadSection>
            <ImagePicker
              forPerson={true}
              value={item.images[0]}
              onChange={(newValue) => {
                updateField("images", true)([newValue]);
              }}
            ></ImagePicker>
          </UploadSection>

          <InputItems>
            <Row>
              <MaterialInput
                label={"Title"}
                multiline={true}
                rows={2}
                value={item.title}
                onChange={updateField("title")}
              />
            </Row>

            <Row>
              <MaterialInput
                multiline={true}
                rows={15}
                label={"Description"}
                value={item.description}
                onChange={updateField("description")}
              />
            </Row>
          </InputItems>

          <InputItems>
            <Row>
              <DropDownInput
                options={contentPurposes}
                label="Purpose"
                value={item.purpose}
                onChange={updateField("purpose", true)}
              />
            </Row>
          </InputItems>

          <br />
          <Buttons>
            <CustomPrimaryButton style={{ width: "190px" }} onClick={save}>
              {actionType == "UPDATE" ? "Modify Post" : "Create Post"}
            </CustomPrimaryButton>
          </Buttons>
        </Inputs>
      </Container>
    </LoggedInBoilerplate>
  );

  function updateField(fieldName, dontUseEventValue) {
    return (e) => {
      setItem((newItem) => {
        newItem = { ...newItem };
        if (dontUseEventValue) {
          newItem[fieldName] = e;
        } else {
          newItem[fieldName] = e.target.value;
        }

        return newItem;
      });

      setTimeout(() => {
        if (fieldName == "latitude" || fieldName == "longitude") {
          setForcedMapUpdateCode(Math.random() * 1000);
        }
      }, []);
    };
  }

  function getLocationValue() {
    if (!item.latitude) return initialLocation;
    if (!item.longitude) return initialLocation;

    let lat = parseFloat(item.latitude);
    let lng = parseFloat(item.longitude);

    if (isNaN(lat)) return initialLocation;
    if (isNaN(lng)) return initialLocation;

    return { lat: lat, lng: lng };
  }

  function save() {
    if (actionType == "UPDATE") editItem();
    if (actionType == "ADD") createItem();
  }

  async function loadItemToBeEdited() {
    let data = await serverLine.get(`/content/?itemId=${itemId}`);

    setItem(data);
    setLoading(false);
  }

  async function createItem() {
    setLoading(true);

    try {
      let res = await serverLine.post("/content", {
        images: item.images,
        title: item.title,

        purpose: item.purpose,
        description: item.description,
      });

      window.popupAlert(res.message);
      goTo(`/p/${res.item._id}`)();
    } catch (e) {
      window.popupAlert(e.message);
    }

    setLoading(false);
  }

  async function editItem() {
    setLoading(true);

    try {
      let res = await serverLine.patch("/content", {
        itemId,
        changes: {
          images: item.images,
          title: item.title,
          purpose: item.purpose,
          description: item.description,
        },
      });

      window.popupAlert(res.message);
      goTo(`/p/${res.item._id}`)();
    } catch (e) {
      window.popupAlert(e.message);
    }

    setLoading(false);
  }
}
