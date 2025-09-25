import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { serverLine } from "../../../../controllers/network/serverLine.js";
import LoggedInBoilerplate from "../LoggedInBoilerplate.js";
import LoadingSection from "../../../helperComponents/LoadingSection.js";
import { GoLocation } from "react-icons/go";
import { PiPerson } from "react-icons/pi";
import calculateAge from "../../../../controllers/calculateAge.js";
import CustomButton from "../../../helperComponents/CustomButton.js";
import getSubPath from "../../../../controllers/getSubPath.js";
import getImageURL from "../../../../controllers/getImageURL.js";
import goTo from "../../../../controllers/goTo.js";
import { RiEdit2Line } from "react-icons/ri";
import Context from "../../../../Context.js";
import BubbleTextForPageHeader from "../../../applicationUI/BubbleTextForPageHeader.js";
import IconWithTextForPageHeader from "../../../applicationUI/IconWithTextForPageHeader.js";
import ContentAggregator from "../../../applicationUI/aggregator/ContentAggregator.js";
import FollowButton from "./FollowButton.js";

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
  width: calc(100vw - 600px);

  @media (max-width: 900px) {
    width: 100%;
  }
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
  color: var(--accent);
  text-transform: uppercase;
`;

const Desc = styled.div`
  font-size: 12px;
  text-transform: capitalize;
  color: var(--elementDim);
`;

const DetailsTextData = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
  color: var(--elementDim);
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  overflow: hidden;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 20px;
    justify-content: center;
    align-items: center;
  }
`;

const DetailsSection = styled.div`
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
  flex-wrap: wrap;
`;

const BubbleText = styled.div`
  padding: 5px 25px;
  background-color: var(--surface);
  font-size: 14px;
  border-radius: 10px;
  color: var(--elementDim);
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
`;

const SecondaryLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-wrap: wrap;
`;

const SecondSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const RowSection1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ColumnSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* justify-content: space-between; */
  width: 100%;
`;

export default function ProfileDetailSection({ item }) {
  return (
    <TopSection>
      <Image src={getImageURL(item.profileImage, true)}></Image>

      <DetailsSection>
        <PrimaryLine>
          <Title>{item.name}</Title>
        </PrimaryLine>

        <SecondaryLine>
          <DetailsTextData>{item.followerCount} Followers</DetailsTextData>

          <DetailsTextData>{item.followingCount} Following</DetailsTextData>

          <IconWithTextForPageHeader icon={<PiPerson />}>
            {item.dateOfBirth
              ? `${calculateAge(item.dateOfBirth)} Ans`
              : "None"}
          </IconWithTextForPageHeader>
        </SecondaryLine>

        <Desc>{item.bio}</Desc>

        <Buttons>
          <FollowButton status={item.followStatus} receiverUserId={item._id} />
        </Buttons>
      </DetailsSection>
    </TopSection>
  );
}
