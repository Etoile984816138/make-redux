实现步骤见commit历史,主要文件在src/index.js中

1. 创建store、dispatch
2. 抽离store，抛出getState和dispatch方法
3. 监听数据变化，重新渲染视图
4. 比较数据是否改变，不改变则不渲染
5. stateChanger -> reducer