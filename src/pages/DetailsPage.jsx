function DetailsPage({game}){

  return(
    <div>
      <div className={"general-info"}>
        <img src={game.background_image} alt={game.name}/>
        <div className={"game-tags"}>
          <h3 className={"genres"}>game.genres.name</h3>
          <ul>
            {game.genres?.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>

          <h3 className={"sin-mut"}>game.tags.name</h3>
          <ul>
            {game.tags?.map((tag) => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={"more-images"}>
        <h3>More screenshots from the game:</h3>
        <div className="screenshots-wrapper">
          {game.screenshots?.map((shot) => (
            <img
              key={shot.id}
              src={shot.image_url}
              alt="Screenshot"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailsPage;