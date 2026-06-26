import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchUserByID() {
  return (
    <div className="search-User-id">
      <form>
        <input type="text" placeholder="User ID eingeben"/>
          <button type="submit"> {<FaMagnifyingGlass />}</button>
      </form>
    </div>
  );
}
