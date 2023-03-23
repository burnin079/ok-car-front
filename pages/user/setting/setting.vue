<template>
  <w-page>
    <u-cell-group>
      <u-cell
        title="系统更新"
        :isLink="true"
        arrow-direction="right"
        @click="systemUpdate"
      ></u-cell>
    </u-cell-group>
  </w-page>
</template>

<script>
export default {
  methods: {
    systemUpdate() {
      console.log(123321)
    }
  }
}
</script>

<style lang="scss" scoped></style>
