import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// onsenUI import
import ons from 'onsenui';
import {
    Navigator,
    BackButton,
    ToolbarButton,
    Page,
    Toolbar,
    Button,
    Icon,
    Card
} from 'react-onsenui';


export default class FooDetail extends React.Component {
    render() {
        return (
            <Page>
                <Toolbar>
                    <div
                        className="center"
                    >
                        AppDetail
                    </div>
                    <div
                        className="left"
                    >
                        <BackButton>
                            Back
                        </BackButton>
                    </div>
                </Toolbar>
                <div className="textCenter mTop20">DetailPage</div>
            </Page>
        );
    }
}
