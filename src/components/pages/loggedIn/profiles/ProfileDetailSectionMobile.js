import styled from "styled-components";
import getImageURL from "../../../../controllers/getImageURL.js";
import FollowButton from "./FollowButton.js";
import limitStringLength from "../../../../controllers/utils/limitStringLength.js";
import { MdDone } from "react-icons/md";
import EducationalInfo from "./EducationalInfo.js";
import WorkExperience from "./WorkExperience.js";

const Image = styled.img`
  object-fit: cover;
  width: 200px;
  border-radius: 15px;
  height: 200px;
`;

const Line1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 900;
  text-transform: uppercase;
`;

const Desc = styled.div`
  font-size: 14px;
  text-transform: capitalize;
  color: var(--elementDim);
  font-weight: 600;
  line-height: 22px;
`;

const DetailsTextData = styled.div`
  font-size: 13px;
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
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  color: var(--element);
  width: 100%;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
`;

const SecondaryLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
`;

const Icon = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  background: var(--accent);
  color: var(--accentAlt);
  font-size: 19px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default function ProfileDetailSectionMobile({ item }) {
  let accountType = item?.accountType;
  return (
    <TopSection>
      <Image src={getImageURL(item.profileImage, true)}></Image>

      <DetailsSection>
        <Line1>
          <Title>{item.name}</Title>
        </Line1>

        <MainText>
          <SecondaryLine>
            <DetailsTextData>@{item.username}</DetailsTextData>
            <DetailsTextData>{item.followerCount} Followers</DetailsTextData>

            <DetailsTextData>{item.followingCount} Following</DetailsTextData>
          </SecondaryLine>

          <Desc> {limitStringLength(item.bio, 150)}</Desc>

          {item.educationalBackground && (
            <EducationalInfo
              educationalBackground={item.educationalBackground}
            />
          )}

          {item.workExperience && (
            <WorkExperience workExperience={item.workExperience} />
          )}

          <Buttons>
            <FollowButton
              status={item.followStatus}
              receiverUserId={item._id}
            />
          </Buttons>
        </MainText>
      </DetailsSection>
    </TopSection>
  );
}
