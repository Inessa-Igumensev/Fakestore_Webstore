import type { ComponentType } from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FaInstagram, FaPinterest } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { TfiComment } from "react-icons/tfi";
import { BsSuitHeart } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiShoppingCartBold } from "react-icons/pi";
import { FaMagnifyingGlass } from "react-icons/fa6";


export interface Iconprops {
  name: keyof typeof icons;
  className?: string;
  size?: number | string;
}

const icons = {
  myuser: PiUserCircleDuotone,
  user: FaUserCircle,
  menue: BiDotsVerticalRounded,
  facebook: FaFacebookF,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  twitter: FaTwitter,
  youtube: FaYoutube,
  instagram: FaInstagram,
  seen: IoEyeOutline,
  comment: TfiComment,
  heart: BsSuitHeart,
  edit: LiaUserEditSolid,
  bin: RiDeleteBin6Line,
  cart: PiShoppingCartBold,
  magnifyingglass:FaMagnifyingGlass
};

export default function Symbol({ name, className, size = "1lh" }: Iconprops) {
  const Icon = icons[name];

  if (!Icon) return null;
  const IconComponent = Icon as ComponentType<{
    className?: string;
    size?: number | string;
  }>;

  return <IconComponent className={className} size={size} />;
}
