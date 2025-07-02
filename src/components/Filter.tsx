import { FilterProps } from "@/types";
import "../css/Filter.css";

function Filter({ filter, setFilter }: FilterProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter">
      <select name="Platform" value={filter.Platform} onChange={handleChange}>
        <option value="">All Platforms</option>
        <option value="Nintendo Switch">Nintendo Switch</option>
        <option value="PC">PC</option>
        <option value="Xbox">Xbox</option>
        <option value="PlayStation">PlayStation</option>
      </select>

      {filter.Platform === "Xbox" && (
        <select name="SubPlatform" value={filter.SubPlatform || ""} onChange={handleChange}>
          <option value="">All Xbox Games</option>
          <option value="Xbox">Xbox</option>
          <option value="Xbox One">Xbox One</option>
          <option value="Xbox 360">Xbox 360</option>
        </select>
      )}

      {filter.Platform === "PlayStation" && (
        <select name="SubPlatform" value={filter.SubPlatform || ""} onChange={handleChange}>
          <option value="">All PlayStation Games</option>
          <option value="PlayStation">PlayStation(1)</option>
          <option value="PlayStation 2">PlayStation 2</option>
          <option value="PlayStation 3">PlayStation 3</option>
          <option value="PlayStation 4">PlayStation 4</option>
        </select>
      )}
    </div>
  );
}

export default Filter;