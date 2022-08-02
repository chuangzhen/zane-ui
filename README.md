
### 1.创建项目   npx i create-react-app xx --template typescript
### 2.目录结构   

### 3.styles  公共样式抽离
## 3.1 _variable.scss    中性色，系列色，字体，字体大小  等等  样式变量
## 3.2 normalize.css     重置浏览器默认样式


### jest 通用测试工具   
## 运行指令  npx jest jest.test.js
## ceact-react-app 内置jest
## 一直运行指令  npx jest jest.test.js --watch

### react测试工具
## @testing-library/react  详情参考App.test.tsx 文件  运行：npm run test 


## 模块打包成NPM包步骤
##### 1.在根文件 index.tsx中，导出所有的组件实例

##### 2.驯服tsx  将tsx转化成  ---  tsconfig.build.json  --->  es6 module .jsx
        > 编写tsconfig.build.json文件
        > 添加打包tsx转化命令 
        ```
        //package.json
        build-ts":"tsc -p tsconfig.build.json", 
        ```
        > 执行  npm run build-ts 
        
        ·报错1：Cannot find module '@babel/parser'
        Cannot find module '@babel/types'
        ...等，是因为ts import 文件时，相对路径和【绝对路径】 的查找方式的问题
        【解决】：在tsconfig.build.ts 中添加属性


        ·报错2:allowSyntheticDefaultImports 报错  需要在tsconfig.build.ts 的compilerOptions中引入这个属性


        > 增加对sass文件编译为css --在packmage.json中添加build-css命令

        > 安装依赖 rimraf  可以兼容windows使用rimraf dir 删除命令在打包时删除build文件夹

##### 3.npm link本地测试打包好的组件库npm包
        · 1.在被连接的npm包文件目录下执行  npm link   
        ```
                C:\Users\创\AppData\Roaming\npm\node_modules\zane-ui -> D:\demo\zane-ui
         ```
        · 2.在使用组件库的项目目录下执行 npm link  
               ```
                D:\demo\react-demo\node_modules\zane-ui -> C:\Users\创真\AppData\Roaming\npm\node_modules\zane-ui -> D:\demo\zane-ui PS D:\demo\react-demo>
                ```

        · 3.在组件库文件的package.json 添加 配置   
             ```
                "main": "build/index.js",
                "module": "build/index.js",
                "types": "build.index.d.ts",
             ```
        

##### 4.npm 发布
        · 1.package配置  发布时
                ```
                {
                        name:"包名",
                        version:"版本号",
                        //不是私有包
                        private:false,
                        //开放协议
                        "license":"MIT",
                        //关键词
                        "keywords":[
                                "Component",
                                "UI",
                                "Function",
                                "React"
                        ],
                        //首页
                        "homepage":"git地址",
                        "repository":{
                                "type":"git",
                                "url":"git地址"
                        },
                        //想要暴露给npm的目录
                        "files":[
                                "dist"
                        ],

                        "script":{
                              "clean": "rimraf ./dist",
                              "build": "npm run clean && npm run  build-ts && npm run build-css",  
                              "build-ts": "tsc -p tsconfig.build.json",
                              "build-css": "node-sass ./src/styles/index.scss ./dist/index.css",
                              "storybook": "start-storybook -p 9009 -s public",
                              "build-storybook": "build-storybook -s public",
                              //npm 发布命令钩子--
                              "prepublish": "npm run build"

                              //执行 npm publish 便可将包发布到npm上  
                        }
                }
                       
                ```
        · 2.package配置 ，依赖瘦身
                - 将dependencis中非生产环境必须的依赖移到 devDependencies中
                - 添加peerDependencies配置项，引用本组件库包的用户会被提示要求预先安装peerDependencies里边的依赖，才能进一步使用组件库
                ```
                         "peerDependencies": {
                                "react": "≥ 16.8.0",
                                "react-dom": "≥ 16.8.0"
                        },
                ```

        · 3.给本地zane-ui项目添加登录 npm账户
                ```
                1. npm add user----按提示添加并登录
                ```
        · 4.正式发布npm
                ```
                        npm publish  
                        1.会先执行script内的命令
                        2.执行npm notice 命令将打包好的dist发布到npm上

                        npm notice
                        npm notice xxx具体dist的文件
                        ...
                        npm notice
                        + zane-ui@0.1.4

                        //表示发布成功，刷新npm用户页面，可以看到对应的包信息
                ```
        ·





##### 5.代码规范检查 lint 和 test 校验
        · 1.eslint 校验指定目录下的指定格式文件[href=https://eslint.org/docs/latest/user-guide/command-line-interface];
                ```
                scripts:{
                        //--max-warnings num 允许终端展示的warning数量,超过则异常退出后续的eslint执行
                 "lint": "eslint --ext .jsx,.js,.tsx src  --max-warnings 5",
                }

                 ```
        · 2.cross-env 插件设置跨平台环境变量
                ```
                // yarn add cross-env --dev
                scripts{
                        // 运行该命令，遇到测试命令报错会中断执行，退出剩余的测试逻辑
                        "test:nowatch":"cross-env CI=true react-scripts test"
                }
                ```
        · 3.完善发布指令
                ```
                scripts{
                        // 运行该命令，先进行lint校验，通过后执行test校验，通过后才会执行打包发布
                        "prepublish":"npm run lint && npm run test:nowatch && npm run build"
                }
                ```
        · 4. Git hooks made easy -- husky 在commit和push前，执行设置好的指令，可以用于commit前执行test  lint等指令

       

                ```    

                //husky v6之前使用
                "husky": {
                        "hooks": {
                                "pre-commit": "npm run test:nowatch && npm run lint"
                        }
                },


                 // husky v6.0之后使用方式改变
                 - 1.package添加script命令 prepare,[ npm run prepare ] 创建.husky目录文件
                        ```
                        "script"{
                                "prepare":"husky install"
                        }    
                        //创建.husky目录文件 
                        npm run prepare 
                        //【注意】多安装一次依赖，步骤2才能成功
                        npm install / yarn   
                        ```
                 - 2.添加git hooks，运行一下命令创建git hooks ---- npx husky add .husky/pre-commit "npm run test:nowatch && npm run lint" （.husky/目录下新增了一个名为pre-commit的shell脚本）
               
                 - 3.执行 git commit 指令可以看到pre-commit的命令生效执行

                //报错 husky - pre-commit hook exited with code 1 (error)


                    
                        


                ```
## 欠缺：storybook文档配置没有搞