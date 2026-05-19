import { BiDotsVerticalRounded } from "react-icons/bi";
import { PiEyeLight } from "react-icons/pi";
import { FiMessageSquare } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { IoIosContact } from "react-icons/io";
import { Link } from "react-router-dom";
import blogPostdata  from "../blogData";

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
              <img src={post.image} alt={post.title}/>
            </div>
            <div className="user-blog-post-1">
              <div className="user-info-blog-post-1">
                <div className="icon-blog-post-1">
                  <IoIosContact />
                </div>
                <p>
                  <span className="userName">Admin</span>
                </p>
                <span className="date-of-creation">{post.date}</span>
                <span className="read-Time">{post.readTime}</span>
                <button className="icon-read-More">
                  <BiDotsVerticalRounded />
                </button>
              </div>

              <div className="info-blog-post-1">
                <h2>{post.title}</h2>
                <span>
                  {post.content}
                </span>
              </div>
              <div className="footer-blog-post-1">
                <div className="number-saw-it">
                  <PiEyeLight />{post.views}
                </div>
                <div className="comments">
                  <FiMessageSquare />{post.comments}
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
