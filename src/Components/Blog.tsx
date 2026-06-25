import Symbol from "./Icon";
import { Link } from "react-router-dom";
import blogPostdata from "../blogData";

export default function BlogOverview() {
  return (
    <div className="blog-overwiev">
      <div className="blog-headline-overwiev">
        <h1> Mein Beispiel Blog</h1>
      </div>
      <div className="blog-post-container">
        {blogPostdata.map((post) => (
          <Link
            to={`/blog/${post.id}`}
            key={post.id}
            className="blog-post-link"
          >
            <div className="blog-post">
              <div className="picture-post">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="user-blog-post">
                <div className="user-info-blog-post">
                  <div className="icon-blog-post">
                    <Symbol name="myuser" />
                  </div>
                  <div className="blog-metadates">
                    <span className="userName">Admin</span>
                    <div className="blog-time-row">
                      <div className="date-of-creation">
                        <span> {post.date}</span>
                      </div>
                      <div className="read-Time">
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <button className="icon-read-More">
                    <Symbol name="menue" />
                  </button>
                </div>

                <div className="info-blog-post">
                  <h2>{post.title}</h2>
                  <p>
                    <span>{post.content}</span>
                  </p>
                </div>
                <div className="footer-blog-post">
                  <div className="meta-dates-blog">
                    <span className="number-saw-it">
                      <Symbol name="seen" />
                      {post.views}
                    </span>
                    <span className="comments">
                      <Symbol name="comment" />
                      {post.comments}
                    </span>
                  </div>
                  <button className="likes">
                    <Symbol name="heart" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
