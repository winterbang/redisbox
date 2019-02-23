<template>
  <div>
    <header class="toolbar toolbar-header">
      <h1 class="title">Header</h1>
    </header>
    <new-connection></new-connection>
    <footer class="toolbar toolbar-footer">
      <h1 class="title">Footer</h1>
    </footer>
  </div>

</template>

<script>
import NewConnection from './NewConnectionPage/Index'
export default {
  name: 'Index',
  components: { NewConnection }
}
</script>

<style lang="css">
</style>
