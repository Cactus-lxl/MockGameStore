import "../css/Filter.css"

function Filter({filter, setFilter}){
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFilter(prev => ({...prev, [name]: value}))
  }

  return(
    <div className={"filter"}>
      <select name={"Platform"} value={filter.Platform} onChange={handleChange}>
        <option value="">All Platforms</option>
        <option value={"Nintendo Switch"}>Nintendo Switch</option>
        <option value={"PC"}>PC</option>
        <option value={"Xbox"}>Xbox</option>
      </select>
    </div>
  )
}

export default Filter;