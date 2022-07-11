### 异常错误记录

#### 1. 安装其他插件时：报错 An unexpected error occurred: "EPERM: operation not permitted, unlink 'D:\\cztest\\zaneUI\\zane-ui\\node_modules\\node-sass\\vendor\\win32-x64-83\\binding.node'".
【问题】：当前应用启动中，下载安装不了其他的webpack  
【解决】：访问了某个错误的modules，关闭应用下载安装插件即可



##### 2.An @import loop has been found:\n    src/styles/index.scss imports src/components/Form/_style.scss", 
【问题】： src/styles/index.scss  | /Form/_style.scss 在两个scss文件中引用循环
【解决】： 去掉Form/_style.scss中对style/index.scss的引用,   styles/index.scss已经在全局引入过了



#### 3.Module not found: Error: Can't resolve 'zane-ui/dist/components/Menu/style.scss' in 'zane-ui/dist/components/Menu'
【问题】: 在组件库具体组件文件内引用了style.scss   ，
【解决】: components下各组件的_style.scss样式统一通过 /styles/index.scss 全局引入，在组价内部不需要重复引入，ts在打包时没有打包.scss文件