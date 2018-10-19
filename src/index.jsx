import React from 'react';
import ReactDOM from 'react-dom';
import ons from 'onsenui';
import * as Ons from 'react-onsenui';

//import 'onsenui/css/onsenui.css';
//import 'onsenui/css/onsen-css-components.css';

class App extends React.Component{
    handleClick() {
        ons.notification.alert('Hello world!');
    }

    render(){
        return (
            <Ons.Page>
                <Ons.Button onClick={this.handleClick}>Tap me!</Ons.Button>
            </Ons.Page>
        );
    }
};

class Frame extends React.Component {
    render(){
        return (
            <Ons.Page renderToolbar={() =>
                <Ons.Toolbar>
                  <div className="left">
                    <Ons.BackButton>
                        Back
                    </Ons.BackButton>
                  </div>
                  <div className="center">
                    Title
                  </div>
                  <div className="right">
                    <Ons.ToolbarButton>
                      <Ons.Icon icon="md-menu" />
                    </Ons.ToolbarButton>
                  </div>
                </Ons.Toolbar> }/>
        );
    }
}

ReactDOM.render(<Frame />, document.getElementById('app'));