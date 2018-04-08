// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
const appState = {
    title: {
        text: 'React.js ',
        color: 'red',
    },
    content: {
        text: 'React.js 内容',
        color: 'blue'
    }
}

// 渲染内容
function renderApp(appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
}

function renderTitle(title) {
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent(content) {
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}

/**
 * @argument state:表示应用程序状态 
 * @argument stateChanger:描述应用程序状态会根据 action 发生什么变化
 * @return {getState} 返回state {dispatch} 用于修改数据
 */
function createStore(state, stateChanger) {
    const getState = () => state;
    const dispatch = (action) => stateChanger(state, action);
    return { getState, dispatch };
}

/**
 * @description 描述应用程序状态会根据 action 发生什么变化
 * @param state 
 * @param action 
 */
function stateChanger(state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            state.title.text = action.text;
            break;
        case 'UPDATE_TITLE_COLOR':
            state.title.color = action.color;
            break;
        default:
            break;
    }
}

const store = createStore(appState, stateChanger)


renderApp(appState);
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
renderApp(appState);