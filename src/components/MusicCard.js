import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {

  state = {
    loading: false,
    favoriteTracks: [],
  };

  handleChange = ({ target: {id} }) => {
    const {
      musicList,
    } = this.props;

    const trackClicked = musicList.find((track) => {
      return track.trackId === Number(id);
    });
   // PAREI MEIO ENCALHADO NO PROBLEMA DE O CHECKBOX  DESMACAR QD 
   // ATUALIZA A PAGINA
   // QUERO TENTAR FAZER OS REQUISITOS 08, 09 E 10 INTEGRADOS, PQ ACHO QUE SÓ ASSIM FUNCIONA
   // E PRA EVITAR RETRABALHO
    
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
