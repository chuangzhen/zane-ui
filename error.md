### 异常错误记录

1. 安装其他插件时：报错 An unexpected error occurred: "EPERM: operation not permitted, unlink 'D:\\cztest\\zaneUI\\zane-ui\\node_modules\\node-sass\\vendor\\win32-x64-83\\binding.node'".

问题：当前应用启动中，下载安装不了其他的webpack  
解决：访问了某个错误的modules，关闭应用下载安装插件即可