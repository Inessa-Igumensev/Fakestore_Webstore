import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";


export default function Sidebar(){
    return(
        <div className="sidebar">
        <a href="#" className="socialMediaIkons">
          <FaFacebookF />
        </a>
        <a href="#" className="socialMediaIkons">
          <FaTwitter />
        </a>
        <a href="#" className="socialMediaIkons">
          <FaYoutube />
        </a>
        <a href="#" className="socialMediaIkons">
          <FaInstagram />
        </a>
      </div>
    )
}