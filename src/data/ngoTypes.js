import {
  FaAllergies,
  FaAppleAlt,
  FaChild,
  FaCity,
  FaDog,
  FaGraduationCap,
  FaHandHoldingMedical,
  FaStethoscope,
} from "react-icons/fa";
import {
  MdOutlineElderlyWoman,
  MdOutlineHowToReg,
  MdPets,
} from "react-icons/md";
import { CgAbstract } from "react-icons/cg";

let ngoTypes = [
  {
    value: "ANIMAL_CARE",
    label: "Animal Care",
    icon: <MdPets />,
    image: "/vector-graphics/ngo-types/animal.jpg",
  },
  {
    value: "MEDICAL",
    label: "Medical",
    icon: <FaHandHoldingMedical />,
    image: "/vector-graphics/ngo-types/medical.jpg",
  },
  {
    value: "EDUCATION",
    label: "Education",
    icon: <FaGraduationCap />,
    image: "/vector-graphics/ngo-types/education.jpg",
  },
  {
    value: "OLD_AGE",
    label: "Old Age",
    icon: <MdOutlineElderlyWoman />,
    image: "/vector-graphics/ngo-types/old-age.jpg",
  },
  {
    value: "CHILDREN_CARE",
    label: "Children Care",
    icon: <FaChild />,
    image: "/vector-graphics/ngo-types/child.jpg",
  },
  {
    value: "CITY_CARE",
    label: "City Care",
    icon: <FaCity />,
    image: "/vector-graphics/ngo-types/city.jpg",
  },
  {
    value: "FOOD_AND_HUNGER",
    label: "Food & Hunger",
    icon: <FaAppleAlt />,
    image: "/vector-graphics/ngo-types/food.jpg",
  },
  {
    value: "GENERAL",
    label: "General",
    icon: <FaAllergies />,
    image: "/vector-graphics/ngo-types/general.jpg",
  },
  {
    value: "OTHER",
    label: "Other",
    icon: <CgAbstract />,
    image: "/vector-graphics/ngo-types/other.jpg",
  },
];

export default ngoTypes;
