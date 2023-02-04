import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    musicList: [],
  };

  componentDidMount() {
    this.getMusicsFunc();
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

  render() {
    const {
      artistName,
      albumName,
      musicList,
    } = this.state;

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
