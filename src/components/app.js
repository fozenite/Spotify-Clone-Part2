import React, { Component } from 'react';
import styles from './app.css';
import SearchBar from './SearchBar/SearchBar';
import searchSpotify from '../utils/searchSpotify';
import SongList from './SongList/SongList';
import SongItem from './SongItem/SongItem';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialMessage: 'greeting',
      song: '',
      tracks: {},
      songPosition: 0,
    };
  }

  fetchSongs = () => {
    console.log('hey I\'m being clicked');
    searchSpotify(this.state.song)
      .then(({tracks}) => this.setState({ tracks }));
  }


  render() {
    const { tracks, songPosition } = this.state;

    return (
      <div className={styles.root}>
        <SearchBar updateText={(song) => this.setState({ song })}
                   fetchSongs={this.fetchSongs}
        />
      {tracks.items && <SongItem songData={tracks.items[songPosition]} /> }
      {tracks.items && <SongList listOfSongs={tracks.items} selectSong={(songPosition) => this.setState({ songPosition })} />}
      </div>
    );
  }
}
