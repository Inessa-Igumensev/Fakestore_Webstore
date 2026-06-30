import type { ComponentType } from "react";
import { PiUserCircleDuotone, PiShoppingCartBold } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaUserCircle,
} from "react-icons/fa";
import { FaInstagram, FaPinterest, FaMagnifyingGlass } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { TfiComment } from "react-icons/tfi";
import { BsSuitHeart } from "react-icons/bs";
import { LiaUserEditSolid } from "react-icons/lia";
import { PiTrashThin } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { HiOutlineMinus,HiOutlinePlus } from "react-icons/hi";

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
  bin: PiTrashThin,
  cart: PiShoppingCartBold,
  magnifyingglass: FaMagnifyingGlass,
  minus: HiOutlineMinus,
  plus:HiOutlinePlus,
  tag:IoPricetagOutline,
};

export default function Symbol({ name, className, size }: Iconprops) {
  const Icon = icons[name];

  if (!Icon) return null;
  const IconComponent = Icon as ComponentType<{
    className?: string;
    size?: number | string;
  }>;

  return <IconComponent className={className} size={size} />;
}
