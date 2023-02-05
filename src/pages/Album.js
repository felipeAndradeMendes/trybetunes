import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    musicList: [],
    favoriteList: [],
    loading: false,
  };

  componentDidMount() {
    this.getMusicsFunc();
    this.mountFavorites()
  }

  mountFavorites = () => {
    this.setState({
      loading: true,
    }, async () => {
      const favoriteTracks = await getFavoriteSongs()
      // console.log(favoriteTracks)
      this.setState({
        loading: false,  
        favoriteList: [...favoriteTracks],      
      });
    })
  }

  getMusicsFunc = async () => {
    const {
      match: {
        params: {
          id,
        },
      },
    } = this.props;

    const musicList = await getMusics(id);

    this.setState({
      artistName: musicList[0].artistName,
      albumName: musicList[0].collectionName,
      musicList,
    });
    // console.log(musicList[1])
  };

  handleChange = ({ target: { id } }) => {
    const {
      musicList,
    } = this.state;

    const favTrack = musicList.find((track) => track.trackId === Number(id));

    this.setState({
      loading: true,
    }, async () => {
      await addSong(favTrack)
      const favoriteTracks = await getFavoriteSongs();
      this.setState({
        loading: false,  
        favoriteList: favoriteTracks,      
      });
    })
  }

  
  render() {
    const {
      artistName,
      albumName,
      musicList,
      favoriteList,
      loading,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-album">
        <p>ALBUM</p>
        <h3 data-testid="artist-name">
          { artistName }
        </h3>
        <h1 data-testid="album-name">
          { albumName }
        </h1>
        <MusicCard
          musicList={ musicList }
          favoriteList={ favoriteList }
          handleChange={ this.handleChange }
          isChecked={ this.isChecked }
        />
      </div>
    );
  }
}

Album.propTypes = {
  matc: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
