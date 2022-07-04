"use strict";


const store = new Vuex.Store({
	
	modules: {
		account: store_account,
		alert: store_alert,
		yahoo: store_yahoo,
	},	
	
	state: {
		server_time: 0,
		lang: "en",
		users: [],
		logs: [],
		shares: [],
		
		page_title: "Home",
		page_role: undefined,
		
	},
	
	getters: {

		lang: state => { return state.lang },
		users: state => { return state.users },
		logs: state => { return state.logs },
		shares: state => { return state.shares },
		page_title: state => { return state.page_title },
		
		currency: state => { return state.currency },
		calls_user_view: state => { return state.calls_user_view },
		


	},
	
	mutations: {
		
		setLang( state, data ) { state.lang = data  },	
		
		setUsers( state, data ) { state.users = data  },	
		patchUser( state, data ) { 
		
			let row_index = state.users.findIndex( item => { return item.id == data.id });
			if ( row_index === -1 ) {
				console.error( "User item not found" );
				return false;
			};
			
			let row = state.users[ row_index ];
			
			for ( let var_name in data ) {
				if ( var_name != "id" ) row[ var_name ] = data[ var_name ];
			};
			
			Vue.set( state.users, row_index, row);
		},			
		postUser( state, data ) { state.users.push( data ) },	
		
		// мутация deleteUser - удалить элемент users по id
		deleteUser( state, user_id ) { 
		
			let row_index = state.users.findIndex( item => { return item.id == user_id });
			if ( row_index === -1 ) {
				console.error( "User item not found" );
				return false;
			};
			
			state.users.splice( row_index, 1 ) 
		},	


		setShares( state, data ) { state.shares = data  },	
		patchShare( state, data ) { 
		
			let row_index = state.shares.findIndex( item => { return item.id == data.id });
			if ( row_index === -1 ) {
				console.error( "shares item not found" );
				return false;
			};
			
			let row = state.shares[ row_index ];
			
			for ( let var_name in data ) {
				if ( var_name != "id" ) row[ var_name ] = data[ var_name ];
			};
			
			Vue.set( state.shares, row_index, row);
		},			
		postShare( state, data ) { state.shares.push( data ) },	
		
		deleteShare( state, user_id ) { 
		
			let row_index = state.shares.findIndex( item => { return item.id == user_id });
			if ( row_index === -1 ) {
				console.error( "shares item not found" );
				return false;
			};
			
			state.shares.splice( row_index, 1 ) 
		},	





		
		
		setLogs( state, data ) { state.logs = data  },	
		
		
		
		
		setPageTitle( state, data ) { 
			document.title = state.page_title = data;
		},	
		
		setPageRole( state, data ) { state.page_role = data },
		
		
		
		setCalls( state, payload ) { 
		
			state.calls = payload.data;
		
			/*
			if ( payload.destination_type ) {
				
			} else {
				state.calls = payload.data;  
			}
			*/
		},	
		
		// обновить позицию 
		patchCalls( state, data ) {  
		
			
			let row_index = state.calls.findIndex( item => { return item.id == data.id });
			if ( row_index === -1 ) {
				console.error( "Call item not found" );
				return false;
			};
			
			let row = state.calls[ row_index ];
			
			for ( let var_name in data ) {
				if ( var_name != "id" ) row[ var_name ] = data[ var_name ];
			};
			Vue.set( state.calls, row_index, row);
			
			// если меняется call_type, то меняем его для всех	
			if ( data.call_type !== undefined ) {
				state.calls.forEach( ( item, ind ) => {
					if ( item.destination == 	row.destination && item.processed == 0 ) {
						item.call_type = data.call_type;
						Vue.set( state.calls, ind, item);
					}
				})			
			};
			
		},
		
		
			
		
	},
	
	actions: {
		
		init( context ) {	
		
			let awn = new AWN();
		
			async function initialization() {
				await context.dispatch("account/getAccount");
				await context.dispatch("getShares");
			};		
		
			awn.asyncBlock(
				initialization(),
				response => { },
				error => { this.dispatch("error", error ); 	console.error( error ); },
			);		
		},
		
		
		
		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~			users
		
		getUsers( context, params ) {	
			return new Promise((resolve, reject) => {		
				axios.get( "/users", { params } ).then(response => {
					if ( response.data.response.code == "401" ) { resolve(1); return 1;};
					if ( response.data.success ) {
						
						context.commit( "setUsers", response.data.data );

						resolve(response.data.data);
					} else { context.dispatch("error", response.data.errors[0] ); reject(error) };
				})	.catch(error => reject(error))		
			})
		},	


		patchUser( context, params ) {	
			
			axios.patch( "/user", params ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
			
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
			
					context.commit("patchUser", params );
			
				} else { context.dispatch("error", response.data.errors[0] );  };
			})	.catch(error => console.error(error));	
		},	
		
		
		postUser( context, params ) {	
			axios.post( "/user", params ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
			
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
					
					context.commit( "postUser", response.data.data );
					
				} else { context.dispatch("error", response.data.errors[0] );  };
			})	.catch(error => console.error(error));	
		},			
		
		
		deleteUser( context, params ) {	
			
			axios.delete( "/user", { params: params } ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
			
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
					
					context.commit( "deleteUser", params.id );
					
				} else { context.dispatch("error", response.data.errors[0] );  };
			})	.catch(error => console.error(error));	
		},			
		
		
		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~			shares
		
		getShares( context, params ) {	
			return new Promise((resolve, reject) => {		
				axios.get( "/shares", { params } ).then(response => {
					if ( response.data.response.code == "401" ) { resolve(1); return 1; };
					if ( response.data.success ) {
						
						context.commit( "setShares", response.data.data );

						resolve(response.data.data);
					} else { context.dispatch("error", response.data.errors[0] ); reject(error) };
				})	.catch(error => reject(error))		
			})
		},		
		
		
		patchShare( context, params ) {	
			
			axios.patch( "/share", params ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
			
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
			
					context.commit("patchShare", params );
			
				} else { context.dispatch("error", response.data.errors[0] );  };
			})	.catch(error => console.error(error));	
		},	
		
		
		postShare( context, params ) {	
			axios.post( "/share", params ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
			
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
					
					context.commit( "postShare", response.data.data );
					
				} else { context.dispatch("error", response.data.errors[0] );  };
			})	.catch(error => console.error(error));	
		},			
		
		
		deleteShare( context, params ) {	
			
			axios.delete( "/share", { params: params } ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
			
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
					
					context.commit( "deleteShare", params.id );
					
				} else { context.dispatch("error", response.data.errors[0] );  };
			})	.catch(error => console.error(error));	
		},			
				
		
		
		
		getLogs( context ) {	
			return new Promise((resolve, reject) => {		
				axios.get( "/logs" ).then(response => {
					if ( response.data.response.code == "401" ) { resolve(1); return 1;};
					if ( response.data.success ) {
						
						context.commit( "setLogs", response.data.data );

						resolve(response.data.data);
					} else { context.dispatch("error", response.data.errors[0] ); reject(error) };
				})	.catch(error => reject(error))		
			})
		},

		
		postLogs( context, params ) {	
			axios.post( "/logs", params ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
			
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
					
				} else { context.dispatch("error", response.data.errors[0] );  };
			})	.catch(error => console.error(error));	
		},			
		
		
		
		


		deleteLogs( context, params ) {	
			
			axios.delete( "/logs", params ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
					// вывод уведомлений
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
			
					context.state.logs = [];
				} else { 
					// вывод ошибок
					if ( response.data.errors ) response.data.errors.forEach( item => {	context.dispatch("error", item) });
				};
			})	.catch(error => console.error(error));	
		},			
				
				
		undoImport( context, params ) {	
			axios.post( "/import/undo", params ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
					// вывод уведомлений
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
				} else { 
					// вывод ошибок
					if ( response.data.errors ) response.data.errors.forEach( item => {	context.dispatch("error", item) });
				};
			})	.catch(error => console.error(error));	
		},					
				
		
		sendAknowledgedEmail( context, params ) {
			axios.post( "/send/aknowledged", params ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
					// вывод уведомлений
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
				} else { 
					// вывод ошибок
					if ( response.data.errors ) response.data.errors.forEach( item => {	context.dispatch("error", item) });
				};
			})	.catch(error => console.error(error));				
		},
		
		
		patchTariffs( context, params ) {
			
			axios.patch( "/tariffs", params ).then(response => {
				if ( response.data.response.code == "401" ) { router.push("/login"); return false; };
				if ( response.data.success ) {
					if ( response.data.messages ) response.data.messages.forEach( item => {	context.dispatch("notification", item) });
				} else { if ( response.data.errors ) response.data.errors.forEach( item => {	context.dispatch("error", item) });  };
			})	.catch(error => console.error(error));				
			
			
		},			
		
		
		async postAuth( context, params ) {
			console.log("parent postAuth start");
			await context.dispatch("account/postAuth", params );
			await context.dispatch("init" );
			
			console.log("parent postAuth finish");
		},		
		
	}
	
});


