import React from 'react';

function CardMovies() {


  return (
    <article className="card">
      {isOwn && <button type="button" className="card__delete" onClick={()=>{handleDeleteClick()}}/>}
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={()=>{handleClick()}}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likeBox">
          <button type="button"  onClick={()=>{handleLikeClick()}} className={cardLikeButtonClassName}/>
          <span className="card__numberLikes">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default CardMovies