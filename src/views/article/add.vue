<template>
    <div >
        <div id="editor">
            <textarea :value="input" @input="update"></textarea>
            <div v-html="compiledMarkdown"></div>
        </div>
        <div class="app-container">
        <el-form ref="form" label-width="50px">
          <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">发布</el-button>
            <el-button @click="onCancel">草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import marked from "marked";
import lodash from "lodash";

export default {
  data() {
    return {
      input: `# 支持MarkDown语法`,
      form: {
        name: ""
      }
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { sanitize: true });
    }
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300),
    onSubmit() {
      this.addParam = {
        title: this.form.name,
        content: this.input
      }
      this.$store.dispatch("AddArticle", this.addParam).then((response) => {
        if(response.status == 0) {
            this.$notify({
              title: "成功",
              message: "添加成功",
              type: "success",
              duration: 2000
            });
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    onCancel() {
      console.log("cancle")
    }
  }
};
</script>

<style scoped>
textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}
textarea {
  border: none;
  height: 800px;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}
code {
  color: #f66;
}
</style>
