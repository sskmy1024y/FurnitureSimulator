import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// onsenUI import
import ons from 'onsenui';
import { Navigator,
        BackButton,
        ToolbarButton,
        Page,
        Toolbar,
        Button,
        Icon,
        Card 
    } from 'react-onsenui';

import AppDetail from './AppDetail.jsx';

export default class AppMain extends Component {
    constructor(props) {
        super(props);
        this.pushDetailPage = this.pushDetailPage.bind(this);
    }

    // pushPage()のハンドラー関数
    pushDetailPage() {

        // propsに格納されているnavigatorオブジェクトのpushPageで遷移したいページの情報を渡す。
        this.props.navigator.pushPage({
            component: AppDetail,
            title: 'AppDetail'
        });
    }

    render() {
        return (
            <Page>
                <Toolbar>
                    <div
                        className="center"
                    >
                        BookMain
            </div>
                </Toolbar>
                <Button
                    onClick={this.pushDetailPage}
                    className="gcButton"
                >
                    PushPage
          </Button>
            </Page>
        );
    }
}

AppMain.defaultProps = {
    title: 'FirstPages'
};

AppMain.propTypes = {
    title: React.PropTypes.string,
    navigator: React.PropTypes.any.isRequired
};