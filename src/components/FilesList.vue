<template lang="pug">

	div
		div(v-for="f in list" :key="f.name")
			a(:href="f.path") {{ f.name }}
			| &nbsp;
			button(@click.prevent="() => onDelete(f)") X


</template>

<script>

export default {

	name: 'FilesList',

	data () {
		return {
			list: [],
		}
	},

	created () {

		this.$http.get('/list')
		.then(response => {
			this.list = response.body.map(item => {
				return {
					name: item,
					path: `/uploads/${item}?dl=1`
				}
			})

		})
		.catch(console.error)

	},

	methods: {

		onDelete (f) {

			this.$http
			.delete(f.path)
			.then(() => {
				this.list = this.list.filter(item => {
					return item.name !== f.name
				})
			})
			.catch(console.error)

		}

	}
}

</script>
