import { BsFillMotherboardFill, BsFillProjectorFill } from "react-icons/bs";
import { FaComputerMouse, FaMemory } from "react-icons/fa6";
import { GiComputerFan, GiProcessor } from "react-icons/gi";
import { MdCable, MdPower } from "react-icons/md";
import { PiComputerTowerFill } from "react-icons/pi";

export const menuCategories = {
  1: {
    icon: <BsFillMotherboardFill />,
  },
  2: {
    icon: <FaMemory />,
  },
  3: {
    icon: <MdPower />,
  },
  4: {
    icon: <GiComputerFan />,
  },
  5: {
    icon: <PiComputerTowerFill />,
  },
  6: {
    icon: <MdCable />,
  },
  7: {
    icon: <FaComputerMouse />,
  },
  8: {
    icon: <BsFillProjectorFill />,
  },
  9: {
    icon: <GiProcessor />,
  },
};
