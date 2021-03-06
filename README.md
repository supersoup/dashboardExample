# dashboardExample

## 项目目标

### 整体架构

* 后加载js
* 使用打包工具打包
* 使用全套的自动化工具
* 版块复用性, 提高封装程度
* 使用node.js搭建后台
* 使用配套的ui库的样式, 尽可能多的使用对应的组件

### 功能

* menu和tab
* 两个增删改查页面组, 一个图表页面
* 查询页面的搜索条件包括:
    * 搜索条件使用: 日期和时间, 多选框列表, 加强下拉框联动, 下拉搜索框等. 尽可能多的联动.
    * 结果展示分为: 普通表格, 排序表格, 分页, 图表, 尽可能多的结果联动.
* 新增修改页面:
    * 数据回显到ui组件上
    * 验证
    * 修改内容对比

## 技术选型

### 前端框架和库

* avalon
* oniui
* underscore
* jquery
* highcharts

### 后端库


### 构建工具

* `gulp`
* `gulp-jade`: 编译jade, 压缩html
* `gulp-sass` + `gulp-autoprefixer`: 编译sass, 压缩css, 自动添加前缀
* `gulp-requirejs`: 压缩, 混淆, 打包javascript

## 开发日志

### 2016/7/29

今天完成了三件事:
1. `npm init`
2. `git init`并关联了github上的远程库
3. `gulpfile`的配置

#### 使用cnpm代替npm

网速不好的时候, 使用`cnpm`代替`npm`, 同时, `cnpm`网上也可以搜索到所有npm里面(无论是gulp还是后台系统所需要的一切)所有的包, 以及文档

#### requiejs和avalonjs模块寻址再探寻

之前的想法可能又歪打正找

现在总结如下:

* baseUrl 是相对于引用requirejs的那个html而言的, 而不是main.js而言
* require()方法里的依赖数组, 寻址只能是依据baseUrl而言(所以建议写成不带`./`的形式)
* define()方法里面的依赖数组, 寻址有相对baseUrl和相对模块本身两种情况

所以, 之前, 改变`./`为相对`baseUrl`的路径实际上是完全没有必要的.

然后在gulp中使用`gulp-requirejs`插件代替之前的`r.js`来进行打包. 配置基本一样. 只是, 它在构建过程中忽略你`main.js`中`baseUrl`, 而要相对于`gulpfile.js`来设置`baseUrl`. 然后这个插件会吧`require()`里依赖数组寻址作区分, 所以我写成了不带`./`的形式.

### 2016/7/30

今天让node.js能够开启http服务器,  访问3000端口时, 渲染views/index.jade返回给浏览器.
并使用require.js引入avalon框架, 在浏览器里完成页面各部分的include.

#### 为什么选择jade

有些同学可能不赞成使用模板引擎预编译成html, 原因是因为有学习成本, 而且可能需要比html多绕一个弯子.
但是我综合考虑, 坚持选择jade作为开发时的结构层代码:
不使用jade的原因可能有:

* 要一定的学习成本----但是我认为, 学习成本不大, 一天时间足够学习和熟悉.
* 不利于团队配合----如果是前端写好`html`页面, 然后交给后端套成`jade`. 那这明显是加大工作量. 但是我们采取的是前后端分离, 不需要再这个问题上前后端配合, 两种页面都是仅仅有前端来关心, 不存在这个问题. 
* `jade`不如`html`直观----其实无论使用哪种标记语言, 目的无非是要直观地看出页面的结构和内容. 作为前端页面的预编译, 我们只使用`jade`的基本的标记能力, 而不在里面嵌套使用`jade`的逻辑, 就把它看作一种新的, 更简洁的标记语言就行了. 稍微习惯后就和使用`html`一样. 而且熟悉后, 只需要把关注点放在`jade`上, 根本不去管编译后的`html`是什么样子. 举个简单的例子: 写`markdown`的时候, 需要考虑转换成`html`会是什么样子吗?

排除了使用`jade`的心理障碍之后, 我们再来看看`jade`本身的优点:

* 非常精简, 整洁. 代码内容至少减少一半以上. 不光是方便写, 更重要的是**方便阅读**! 比如说, `<div class="tab"></div>`在`jade`中写作`.tab`
* 和`avalon`本身的模板语法不冲突. `avalon`所有的指令, 对于`jade`来说, 都是**字符串类型的属性**及**文本**而已.

当然问题也有:

* 不能使用地址等自动补全的功能. 不过这个功能在dashboard类型的网页中当中使用貌似用处不大, 因为主要都是在`sass`和`js`...

然后使用的时候要注意的是, `jade`包是不用再`app.js`里面`require`的, 但是需要在node_modules里面安装, 否则无法使用

### 2015/8/2

#### 建立styleExample

全网建立统一的styleExample, 这样定义了基础的css组件使用的规则和样式, 便于团队的小伙伴, 以及自己进行维护

### 2015/8/5

着手做了一个list的示例模块, 这个模块包括**验证**, **获取表单数据**功能.

#### 模块的设计

之前的项目中, 习惯把很多有关的和无关的东西也存在vm上面, 让一个vm来引用模块的数据, 这样多少显得有些不合理.

所以现在, 将vm作为一个模块的属性, 把这个模块在公用的方法中作为参数来传递, 很多数据可以挂在模块上, 不用担心生成的vm过大了.

定义了一个`function/list.js`文件作为公用列表方法, 所有列表模块引用他的方法, 而做到: 只需要在模块的js和jade文件上进行声明性的工作, 就可以完成一个模块了.

#### list_example的验证功能

比如某一页面有如下条件将挂在vm上:

```javascript
condition: {
    c1: '123',
    c2: [1,2,3],
    c3: true,
    c4: 6,
    c5: '2016-08-05'
}
```

我们只需要将该条件中的需要验证的条件作如下声明:

```javascript
validation: {
    c1: {
        name:'c1',
        required: true
    },
    c2: {
        name: 'c2',
        minSize: 2
    },
    c4: {
        name: 'c4',
        required: true,
        minValue: 5
    }
}
```

然后在具体的方法中进行调用`function/list.js`中封装的方法`validateCondition`就可以执行验证, 并在验证成功和失败后做相应的处理了:

```javascript
getResult = function () {
    List.validateCondition(pl, 'validation',
        //成功执行:
        function () {
            var content = List.createReqContent(pl);
            console.log('success!');
            console.log(content);
        },
        //失败执行
        function (failObj) {
            console.log(failObj);
        })
};
```