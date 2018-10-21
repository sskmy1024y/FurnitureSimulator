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

import AppMain from './AppMain.jsx';

// Navigatorクラスを定義
export default class AppNavigator extends Component {
    constructor(props) {
      super(props);
  
      // thisをクラスに固定
      this.renderPage = this.renderPage.bind(this);
    }
  
    // renderPageのPropsに与える関数
    // ・現在のrouteの情報(route)とnavigatorオブジェクトを引数にとる
    // ・navigator.pushPage(route)される度にrenderPageが実行される。
    renderPage(route, navigator) {
      // 現在のページのpropsがあればpropsを代入する。
      const props = route.props || {};
      // 現在のnavigatorオブジェクトをprops.navigatorに代入する。
      props.navigator = navigator;
      // keyが無いとReactに怒られる為、routeオブジェクトに代入したtitleを一意の値として渡す。
      props.key = route.title;
      // createElementで仮想DOMを作成する。
      return React.createElement(route.component, props);
    }
  
    render() {
      return (
        <Navigator
          renderPage={this.renderPage}
          // 初期ページのInitial値を代入
          initialRoute={
            {
              component: AppMain,
              title: 'FirstPage'
            }
          }
        />
      );
    }
  }