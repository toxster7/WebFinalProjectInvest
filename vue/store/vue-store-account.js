"use strict";

const store_account = {
	namespaced: true,
	
	modules: {
		alert: store_alert,
	},		
	
	state: {
		auth: undefined,
		login: undefined,
		role: undefined,
		name: undefined,
		id: undefined,
	},
	
	getters: {
		auth: state => { return state.auth },
		login: state => { return state.login },
		role: state => { return state.role },
		name: state => { return state.name },
		id: state => { return state.id },
	},
	
	
	mutations: {
		setRole( state, data ) { 
			state.role = data  
		},		
	},
	
	actions: {
		
		getAccount( context ) {
			
			return new Promise((resolve, reject) => {
				
				axios.get( "auth" ).then(response => {
					if ( response.data.success ) {
						let data = response.data;
						
						context.state.auth = data.auth !== undefined ? data.auth : false;

						
						if ( context.state.auth ) {
							// если на странице логина, то переадресовывваем на главную
							if ( router.currentRoute.path.indexOf( "/login" ) != -1 ) router.push( "/" );				
							
							context.state.login = data.login;
							context.commit("setRole", data.role);
							context.state.name = data.name;
							context.state.id = data.id;
							
						} else {
							// редирект на логин для неавторизованных
							if ( router.currentRoute.path.indexOf( "/login" ) == -1 ) router.push("/login");				
						}
						
						resolve(data);
					} else { context.dispatch("error", response.data.errors[0] ); reject( response.data.errors[0] ); };
				})	.catch(error => reject(error))		
			
			});
		},
		
		
		postAuth( context, params ) {
			
			return new Promise((resolve, reject) => {

				if ( !utils.check_required_params( ["login", "password"], params) ) resolve( false );  
				
				
				axios.post( "/auth", params ).then(response => {
					if ( response.data.success ) {
						
						context.dispatch("success", { name: "Welcome", message: "Let`s start!"});
						resolve( response.data );

					} else { context.dispatch("error", response.data.errors[0] ); reject(response.data.errors[0]) }
				})	.catch(error => { reject(error) })		
				
			});
		},
		
		
		
		deleteAuth( context ) {
			axios.delete( "/auth" ).then(response => {
				if ( response.data.success ) {
					context.state.auth = false;
					
					// редирект на логин для неавторизованных
					if ( router.currentRoute.path.indexOf( "/login" ) == -1 ) router.push("/login");				
					
				} else context.dispatch("error", response.data.errors[0] );
			})	.catch(error => { console.error(error) })		
		},		
		
		
		
	},
}