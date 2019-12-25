# eslint-vue

## 如何配置选项？

  选项配置文件是.eslintrc.js，选项对应说明如下：

```
  module.exports = {
      "extends": "plugin:vue/essential",
      "parserOptions": {},    
      "rules": {}             //规则
  };
```
  
  更多配置说明可以参考[options](http://eslint.org/docs/user-guide/configuring)

## 如何增加规则？

### 规则简介

  [官方规则列表](https://github.com/vuejs/eslint-plugin-vue#gear-configs)
  
  规则设置：
  - "off" 或 0 - 关闭规则
  - "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  - "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

### HBuilderX增加vue校验规则

  修改.eslintrc.js文件，添加规则，比如: 

```json

  module.exports = {
      "extends": "plugin:vue/base",
      parserOptions: {
          ecmaVersion: 2017,
          sourceType: 'module'
      },
      "rules":{
          //在computed properties中禁用异步actions
          'vue/no-async-in-computed-properties': 'error',
          //不允许重复的keys
          'vue/no-dupe-keys': 'error',
          //不允许重复的attributes
          'vue/no-duplicate-attributes': 'error',
          //在 <template> 标签下不允许解析错误
          'vue/no-parsing-error': ['error',{
              'x-invalid-end-tag': false,
          }],
          //不允许覆盖保留关键字
          'vue/no-reserved-keys': 'error',
          //强制data必须是一个带返回值的函数
          // 'vue/no-shared-component-data': 'error',
          //不允许在computed properties中出现副作用。
          'vue/no-side-effects-in-computed-properties': 'error',
          //<template>不允许key属性
          'vue/no-template-key': 'error',
          //在 <textarea> 中不允许mustaches
          'vue/no-textarea-mustache': 'error',
          //不允许在v-for或者范围内的属性出现未使用的变量定义
          'vue/no-unused-vars': 'error',
          //<component>标签需要v-bind:is属性
          'vue/require-component-is': 'error',
          // render 函数必须有一个返回值
          'vue/require-render-return': 'error',
          //保证 v-bind:key 和 v-for 指令成对出现
          'vue/require-v-for-key': 'error',
          // 检查默认的prop值是否有效
          'vue/require-valid-default-prop': 'error',
          // 保证computed属性中有return语句 
          'vue/return-in-computed-property': 'error',
          // 强制校验 template 根节点
          'vue/valid-template-root': 'error',
          // 强制校验 v-bind 指令
          'vue/valid-v-bind': 'error',
          // 强制校验 v-cloak 指令
          'vue/valid-v-cloak': 'error',
          // 强制校验 v-else-if 指令
          'vue/valid-v-else-if': 'error',
          // 强制校验 v-else 指令 
          'vue/valid-v-else': 'error',
          // 强制校验 v-for 指令
          'vue/valid-v-for': 'error',
          // 强制校验 v-html 指令
          'vue/valid-v-html': 'error',
          // 强制校验 v-if 指令
          'vue/valid-v-if': 'error',
          // 强制校验 v-model 指令
          'vue/valid-v-model': 'error',
          // 强制校验 v-on 指令
          'vue/valid-v-on': 'error',
          // 强制校验 v-once 指令
          'vue/valid-v-once': 'error',
          // 强制校验 v-pre 指令
          'vue/valid-v-pre': 'error',
          // 强制校验 v-show 指令
          'vue/valid-v-show': 'error',
          // 强制校验 v-text 指令
          'vue/valid-v-text': 'error'
      }
  };

```