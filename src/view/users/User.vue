<template>
  <div>
    <el-tree
        :props="defaultProps"
        :data="menus"
        accordion
        show-checkbox
        node-key="id"
        ref="tree"
    >
    </el-tree>
    <el-button @click="getCheckedNodes">通过node获取</el-button>
    <el-button @click="getCheckedKeys">通过 key 获取</el-button>
    <el-button @click="resetChecked">清空</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    };
  },
  created() {
    this.menus = [...this.$router.options.routes]
  },
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    }
  }
}
</script>

<style scoped>

</style>