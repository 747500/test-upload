<template>
	<div id="app">
		<FilesUploadQueue class="queue"/>
	</div>
</template>

<script>
import FilesUploadQueue from './components/FilesUploadQueue.vue'

export default {
  name: 'App',
  components: {
    FilesUploadQueue,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.queue .list {
	margin-top: 1em;
	justify-content: stretch;
}

.queue .list .item {
	margin: 0.33em;
	padding: 0em;
	border-radius: 1em;
	border: 1px solid var(--border-color);
	display: inline-block;
	width: 12em;
	position: relative;
}

.queue .list .item {
	background-color:  white; /*#b9c97b; #c0ffee; */
}

.queue .list .item .img {
	border-bottom: 1px solid var(--border-color);
}

.queue .list .item .text {
	display: flex;
	flex-direction: column;
}

.queue .list .item .text > div {
	flex: 1;
	font-size: small;
}

.queue .list .item img {
  object-fit: cover;
  width: 12em;
  height: 12em;
  border-radius: 1em 1em 0 0;
  display: block;
}

</style>
