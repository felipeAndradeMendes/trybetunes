import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const {
      albumImg,
      albumTitle,
      artistName,
      collectionId,
    } = this.props;

    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        className="linkAlbumCard"
      >
        <div className="albumCardContainer">
          {/* <p>Album Card</p> */}
          <img className="imgAlbumCard" src={ albumImg } alt={ albumTitle } />
          <p className="albumAlbumCard">{ albumTitle }</p>
          <p className="artisstAlbumCard">{ artistName }</p>

        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  albumImg: PropTypes.string,
  albumTitle: PropTypes.string,
  artistName: PropTypes.string,
  collectionId: PropTypes.string,
}.isRequired;

export default AlbumCard;
