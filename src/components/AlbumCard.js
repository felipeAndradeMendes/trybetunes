import React from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const {
      albumImg,
      albumTitle,
      artistName,
      collectionId,
    } = this.props;

    return (
      <div>
        <p>Album Card</p>
        <img src={ albumImg } alt={ albumTitle } />
        <h3>{ albumTitle }</h3>
        <h4>{ artistName }</h4>
        <p>
        <Link 
          to={`/album/${collectionId}`}
          data-testid={`link-to-album-${collectionId}`}
        >
          + Infos
        </Link>
        </p>
      </div>
    );
  }
}

export default AlbumCard;
