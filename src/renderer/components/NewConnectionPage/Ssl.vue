<template>
  <form>
    <div class="form-group">
      <div class="checkbox">
        <label>
          <input type="checkbox"> Use SSL Protocol
        </label>
      </div>
      <label>Public Key:</label>
      <input class="form-control" placeholder="Connection Names">
      <button class="active btn btn-large btn-default">...</button>
    </div>
    <div class="form-group">
      <label>Private Key:</label>
      <input class="form-control" placeholder="Redis-server host">
      <button class="active btn btn-large btn-default">...</button>
    </div>
    <div class="form-group">
      <label>Authority: </label>
      <input class="form-control" placeholder="Redis-server port">
      <button class="active btn btn-large btn-default">...</button>
    </div>

  </form>
</template>

<script>
export default {
  name: 'ssl'
}
</script>

<style lang="css">
</style>
