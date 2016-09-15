import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY='AIzaSyDFlaOcbTh8X07S2zetosbWbhfgvzlMhkA';

// create a list of video data depending on state of search
class App extends Component {
    // new instance of app
    constructor(props) {
        super(props);

        this.state = {
         videos: [],
         selectedVideo: null
        };
        this.videoSearch('surfboards');

    }

    videoSearch(term) {
        // grab info from youtube
        YTSearch({key:API_KEY, term: term}, (videos) => {
            // update this.state with new list of videos. key is videos, data is value
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0] 
            });
        });
    }

    render() {

        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 200);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
