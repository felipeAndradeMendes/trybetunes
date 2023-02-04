import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {

  state = {
    loading: false,
  };

  handleChange = ({ target: {id} }) => {
    const {
      musicList,
    } = this.props;

    const trackClicked = musicList.find((track) => {
      return track.trackId === Number(id);
    });

    console.log(trackClicked)
    this.setFavorite(trackClicked); 
  }

  setFavorite = async (trackId) => {
    this.setState({
      loading: true,
    }, async () => {
      await addSong(trackId)
      this.setState({
        loading: false,
      })
    })
  }

  render() {
    const {
      musicList,
    } = this.props;


    // if (this.state.loading) return <Loading />;

    return (
      <div>
        <p>MUSIC CARD</p>
        <div>
          <ul>
            {musicList.map((music, index) => (
              (index !== 0) && (
                <li key={ music.trackId }>
                  { music.trackName }
                  <audio
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
                    Favorita
                    <input 
                      type="checkbox"
                      id={ music.trackId }
                      data-testid={`checkbox-music-${music.trackId}`}
                      onChange={ this.handleChange }
                    />

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
