import { HiMenu, HiOutlineEmojiHappy, HiOutlineSupport } from "react-icons/hi";
import { RiHome5Line } from "react-icons/ri";
import { MdNotificationsNone } from "react-icons/md";
import { LuCreditCard } from "react-icons/lu";

let iconButtonStyle = {
  width: "60px",
  padding: "0",
};

function getNavBarOptions2({ loggedInUser, notificationCount }) {
  let isMobile = window.innerWidth <= 900;

  return [
    {
      value: "HOME",
      label: !isMobile && "Dashboard",
      icon: isMobile && <RiHome5Line />,
      style: isMobile && iconButtonStyle,
      link: "/",
    },
    {
      value: "BILLING",
      label: !isMobile && "Billing",
      icon: isMobile && <LuCreditCard />,
      style: isMobile && iconButtonStyle,
      link: "/manage-billing",
    },
    {
      value: "COMMUNITY",
      label: !isMobile && "Community", //notificationCount
      icon: isMobile && <HiOutlineEmojiHappy />,
      style: isMobile && iconButtonStyle,
      link: "/community",
    },

    {
      value: "SUPPORT",
      label: !isMobile && "Support",
      icon: isMobile && <HiOutlineSupport />,
      style: isMobile && iconButtonStyle,
      link: `/manage-post/?defaultPurpose=RAISE_ISSUE`,
    },
    {
      value: "NOTIFICATIONS",
      // label: "Notifications",
      icon: <MdNotificationsNone />,
      link: "/notifications",
      badge: notificationCount,
      style: iconButtonStyle,
    },
    {
      value: "MORE",
      // label: "More",
      icon: <HiMenu />,
      link: "/options",
      style: iconButtonStyle,
    },
  ];
}

export default getNavBarOptions2;
