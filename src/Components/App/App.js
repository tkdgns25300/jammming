import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React from 'react';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
      // // Search Result
      // searchResults: [
      //   {
      //     name: 'Y',
      //     artist: '프리스타일',
      //     album: 'Free Style',
      //     id: 1
      //   },
      //   {
      //     name: '남자를 몰라',
      //     artist: '버즈',
      //     album: 'Buzz',
      //     id: 2
      //   },
      //   {
      //     name: '그 남자 그 여자',
      //     artist: '바이브',
      //     album: 'Vibe',
      //     id: 3
      //   },
      //   {
      //     name: '너에게 쓰는 편지',
      //     artist: 'MC몽',
      //     album: 'MC Mong',
      //     id: 4
      //   },
      //   {
      //     name: '아로하',
      //     artist: '쿨',
      //     album: 'Cool',
      //     id: 5
      //   },
      //   {
      //     name: 'Love Yourself',
      //     artist: 'Justi Bieber',
      //     album: 'Third album',
      //     id: 6
      //   }
      // ],
      // // Playlist Name
      // playlistName: 'So Emotional',
      // // Playlist Tracks
      // playlistTracks: [
      //   {
      //     name: 'Last Christmas',
      //     artist: 'Wham!',
      //     album: 'Second Album',
      //     id: 11
      //   },
      //   {
      //     name: 'Peaches',
      //     artist: 'Justi Bieber',
      //     album: 'Final Album',
      //     id: 12
      //   },
      //   {
      //     name: 'Hello',
      //     artist: 'Adele',
      //     album: 'Third Album',
      //     id: 13
      //   },
      //   {
      //     name: 'Someone Like You',
      //     artist: 'Adele',
      //     album: 'Latest Album',
      //     id: 14
      //   }
      // ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.includes(track)) {
      this.setState(
        Object.assign({}, this.state, {playlistTracks: [...this.state.playlistTracks, track]})
      )
    } else {
      return;
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.includes(track)) {
      let newPlaylistTracks = this.state.playlistTracks.filter(e => {
        return e.id !== track.id;
      })
      this.setState(
        Object.assign({}, this.state, {playlistTracks: newPlaylistTracks})
      )
    }
  }

  updatePlaylistName(name) {
    this.setState(
      Object.assign({}, this.state, {playlistName: name})
    )
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName:'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
             onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;