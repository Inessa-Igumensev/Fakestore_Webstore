import blogPostdata from "../blogData";
import { useParams } from "react-router-dom";
import { IoIosContact } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

export default function BlogPostDetails() {
  const { id } = useParams; // Id aus dem URL nehmen

  const found = blogPostdata.find((item) => item.id === parseInt(id));

  return (
    <div className="blog-post-details">
      <div className="detail-header">
        <div className="detail-user-info">
          <div className="detail-user-icon">
            <IoIosContact />
          </div>
          <div>
            <span className="author-name">Admin</span>
            <span className="meta-dates">
              {found.date} &middot; {found.readTime}{" "}
            </span>
          </div>
        </div>
        <button className="share-btn">
          <BiDotsVerticalRounded />
        </button>
      </div>

      <h1 className="details-headline">{found.title} </h1>
      <p className="details-subtitle">{found.subtitel} </p>

      <div className="details-Image">
        <img src={found?.image} alt={found?.title} />
      </div>
      <div className="details-content">
        <p> {found?.content}</p>
        <p className="details-p">
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At"
        </p>
        <p className="details-p2">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et
        </p>
      </div>

      <div className="detail-footer">
        <div className="detail-sozialIcons">
          <FaFacebookF />
          <FaTwitter />
          <FaYoutube />
          <FaInstagram />
        </div>
        <div className="details-count">
          <span>{found?.views} Ansichten</span>
          <span>{found?.comments} Kommentare </span>
          <button className="details-likes">
            <CiHeart />
          </button>
        </div>
      </div>
      <div className="latest-Blog-Post"></div>
      <div className="details-comments">
        <h3>Kommentare</h3>
        <textarea placeholder="Kommentar verfassen"></textarea>
      </div>
    </div>
  );
}
