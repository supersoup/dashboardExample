# dashboardExample
---
## 要达到的目标

### 整体架构

* 后加载js
* 使用打包工具打包
* 使用全套的自动化工具
* 版块复用性, 提高封装程度
* 使用node.js搭建后台
* 使用配套的ui库的样式, 尽可能多的使用对应的组件

### 功能

* menu和tab
* 一个增删改查页面组, 一个图表页面
* 查询页面的搜索条件包括:
    * 搜索条件使用: 日期和时间, 多选框列表, 加强下拉框联动, 下拉搜索框等. 尽可能多的联动.
    * 结果展示分为: 普通表格, 排序表格, 分页, 图表, 尽可能多的结果联动.
* 新增修改页面:
    * 数据回显到ui组件上
    * 验证
    * 修改内容对比

---

## avalon立项

### 前端包

* avalon
* oniui
* underscore
* jquery
* highcharts

### 构建工具

* gulp
* r.js系列

---

## avalon进行日志

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