import { BiDotsVerticalRounded } from "react-icons/bi";
import { PiEyeLight } from "react-icons/pi";
import { FiMessageSquare } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { IoIosContact } from "react-icons/io";
import placeHolderPic from "../assets/time.avif";
import { Link } from "react-router-dom";
import { blogPostdata } from "../blogData.js;

export default function BlogOverview() {
  return (
    <div className="blog">
      <div className="blog-headline">
        <h1> Mein Beispiel Blog</h1>
      </div>
      {blogPostdata.map((post) => (
        <Link to={`/blog/${post.id}`} key={post.id} className="blog-post-link">
          <div className="blog-post-1">
            <div className="picture-post-1">
              <img src={placeHolderPic} alt="" />
            </div>
            <div className="user-blog-post-1">
              <div className="user-info-blog-post-1">
                <div className="icon-blog-post-1">
                  {" "}
                  <IoIosContact />
                </div>
                <p>
                  {" "}
                  <span className="userName">Admin</span>
                </p>
                <span className="date-of-creation">2. Feb. 2023</span>
                <span className="read-Time">1 Min. Lesezeit</span>
                <button className="icon-read-More">
                  <BiDotsVerticalRounded />
                </button>
              </div>

              <div className="info-blog-post-1">
                <h2>Lorem</h2>
                <span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam
                </span>
              </div>
              <div className="footer-blog-post-1">
                <div className="number-saw-it">
                  <PiEyeLight />
                </div>
                <div className="comments">
                  <FiMessageSquare />
                </div>
                <button className="likes">
                  <CiHeart />
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
