"use strict";

const store_lang = {
	namespaced: true,
	
	modules: {
		alert: store_alert,
	},		
	
	state: {
		lang: 'en',
	},
	
	getters: {
		lang: state => { return state.lang },
		lang_path: state => { state.lang == "ru" ? "ru/" : "" },
	},
	
	mutations: {
		
		setLang( state, lang ) {
			state.lang = lang;  
		},

	},		
	
	
	actions: {
	
		init( context ) {
			
			return new Promise((resolve, reject) => {
				
				// if ( this.$route.meta.path === undefined ) console.error("lang not defined!");
				// context.commit("setLang", $route.meta.path);
				

	
				resolve();
				
			});
		},	

	}
	
}