import Symbol from "../Icon";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <a href="#" className="socialMediaIkons">
        <Symbol name="facebook"   />
      </a>
      <a href="#" className="socialMediaIkons">
        <Symbol name="twitter"  />
      </a>
      <a href="#" className="socialMediaIkons">
        <Symbol name="youtube" />
      </a>
      <a href="#" className="socialMediaIkons">
        <Symbol name="instagram" />
      </a>
    </div>
  );
}
