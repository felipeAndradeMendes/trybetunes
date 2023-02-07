import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  isChecked = (id, list) => {
    const res = list.some((track) => track.trackId === Number(id));
    // console.log('CHECKED:', res)
    return res;
  };

  render() {
    const {
      musicList,
      handleChange,
      favoriteList,
    } = this.props;

    return (
      <div>
        <p>MUSIC CARD</p>
        <div className="musicCardContainer">
          <ul className="ulMusicCard">
            {musicList.map((music) => (
              // (music.kind === 'song') && (
              (music.trackId) && (
                <li className="musicCardItem" key={ music.trackId }>
                  {/* {console.log('TRACK NAME:',music.trackName)} */}
                  { music.trackName }
                  <audio
                    className="audioMusicCard"
                    data-testid="audio-component"
                    src={ music.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <label htmlFor={ music.trackId }>
                    <input
                      name={ music.trackName }
                      type="checkbox"
                      id={ music.trackId }
                      data-testid={ `checkbox-music-${music.trackId}` }
                      onChange={ handleChange }
                      checked={ this.isChecked(music.trackId, favoriteList) }
                    />
                    Favorita
                  </label>
                </li>
              )
            ))}
          </ul>

        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.array,
}.isRequired;

export default MusicCard;
