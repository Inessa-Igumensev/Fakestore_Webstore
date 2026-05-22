import blogPostdata from "../blogData";
import { useParams } from "react-router-dom";
import { PiUserCircleDuotone } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { TfiComment } from "react-icons/tfi";
import { BsSuitHeart } from "react-icons/bs";

export default function BlogPostDetails() {
  const { id } = useParams(); // Id aus dem URL nehmen

  const found = blogPostdata.find((item) => item.id === parseInt(id));

  return (
    <div className="blog-post-details">
      <div className="blog-post-content">
        <div className="blog-post-content-container">
          <div className="detail-header">
            <div className="detail-user-info">
              <div className="detail-user-icon">
                <PiUserCircleDuotone />
              </div>
              <div>
                <span className="author-name">Admin </span>
                <span className="meta-dates">
                  &middot; {found?.date} &middot; {found?.readTime}
                </span>
              </div>
            </div>
            <button className="share-btn">
              <BiDotsVerticalRounded />
            </button>
          </div>

          <h1 className="details-headline">{found?.title} </h1>
          <p className="details-subtitle">{found?.subtitel} </p>

          <div className="details-Image">
            <img src={found?.image} alt={found?.title} />
          </div>
          <div className="details-content">
            <p>
              <span>{found?.content}</span>
            </p>
            <div className="details-quote">
              <div className="details-quote-box">
                <span>
                  <p>
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et"
                  </p>
                </span>
              </div>
            </div>

            <p className="dedetails-p">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren,
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
              <div className="details-count-left">
                <span>{found?.views} Ansichten</span>
                <span>{found?.comments} Kommentare </span>
              </div>

              <button className="details-likes">
                <BsSuitHeart />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="latest-blog-section">
        <div className="latest-blog-header">
          <h2>Aktuelle Beiträge</h2>
          <Link to="/blog" className="show-all-link">
            Alle ansehen
          </Link>
        </div>

        <div className="latest-Blog-Post-grid">
          {blogPostdata.map((post) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className="blog-post-link-xs"
            >
              <div className="blog-container-xs">
                <div className="blog-pic-xs">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content-xs">
                  <span className="blog-title-xs">{post.title}</span>
                  <div className="blog-footer-xs">
                    <div className="blog-stats-left">
                      <span className="stat-item">
                        <IoEyeOutline />
                        <span className="number-stat">{post.views} </span>
                      </span>
                      <span className="stat-item">
                        <TfiComment />
                        <span className="number-stat"> {post.comments}</span>
                      </span>
                    </div>
                    <button className="blog-xs-likesIcon">
                      <BsSuitHeart />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="details-comment-container">
        <div className="details-comments">
          <div className="comments-headline">
            <h3>Kommentare</h3>
          </div>

          <textarea
            className="comments-area"
            placeholder="Kommentar verfassen"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
