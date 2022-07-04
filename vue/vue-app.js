"use strict";

axios.defaults.baseURL = '/api.php';


var vueApp = new Vue({
	el: '#vue-app-container',
	router,
	store,
	
	
	
	mounted() {
		
		
	},
	
	computed: {
		auth() { return this.$store.getters["account/auth"] },
		login() { return this.$store.getters["account/login"] },
		name() { return this.$store.getters["account/name"] },
		role() { return this.$store.getters["account/role"] },
		page_title() { return  this.$store.getters.page_title },
	},

	created() {
		this.$store.dispatch("init");
		//this.$store.commit("lang/setLang", this.$route.meta.lang);
	},

	
});


