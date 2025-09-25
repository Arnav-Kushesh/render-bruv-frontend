import styled from "styled-components";
import getImageURL from "../../controllers/getImageURL.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const SubTitle = styled.h3`
  text-transform: capitalize;
  margin: 0;
`;

const Hr = styled.div`
  height: 1px;
  width: 100%;
  margin: 0px 0;
  background: var(--surface);
`;

const ProfileImage = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 500px;
`;

export default function ProfilePicture({ size, user, height, width }) {
  let style = {};

  if (size) {
    style = { height: size, width: size };
  }

  if (height && width) {
    style = { height: height, width: width };
  }

  return user.profileImage ? (
    <ProfileImage style={style} src={getImageURL(user.profileImage, true)} />
  ) : (
    <ProfileImage style={style} src={"default/default-profile4.jpeg"} />
  );
}
