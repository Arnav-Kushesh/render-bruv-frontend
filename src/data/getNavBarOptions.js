import { BiSearch } from "react-icons/bi";
import { HiMenu, HiOutlineEmojiHappy, HiOutlineSupport } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import {
  RiHome5Line,
  RiNotification3Line,
  RiNotification4Line,
} from "react-icons/ri";
import { TbPencilMinus } from "react-icons/tb";
import { MdAttachMoney, MdNotificationsNone, MdPayment } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoCreditCard } from "react-icons/go";
import { FiCreditCard } from "react-icons/fi";
import { LuCreditCard } from "react-icons/lu";

function getNavBarOptions({ loggedInUser, notificationCount }) {
  return [
    {
      value: "HOME",
      label: "Home",
      icon: <RiHome5Line />,
      link: "/",
    },
    {
      value: "BILLING",
      label: "Billing",
      icon: <LuCreditCard />,
      link: "/billing",
    },
    {
      value: "COMMUNITY",
      label: "Community", //notificationCount
      icon: <HiOutlineEmojiHappy />,
      link: "/community",
    },
    {
      value: "NOTIFICATIONS",
      label: "Notifications",
      icon: <MdNotificationsNone />,
      link: "/notifications",
      badge: notificationCount,
    },
    {
      value: "PROFILE",
      label: "Report Issue",
      icon: <HiOutlineSupport />,
      link: `/report-issue`,
    },

    {
      value: "MORE",
      label: "More",
      icon: <HiMenu />,
      link: "/options",
    },
  ];
}

export default getNavBarOptions;
