'use strict';

const routes = [
	{ path: '/', component: HomePage, meta: { title: "Dashboard" } },
	{ path: '/login', component: LoginPage, meta: { title: "Site Authorization" } },
	
	{ path: '/users', component: UsersPage, meta: { title: "Users List", role: "admin" } },
	{ path: '/add-user', component: UserAddPage, meta: { title: "Add User", role: "admin" } },
	{ path: '/edit-user/:user_id', component: UserEditPage, meta: { title: "Edit User", role: "admin" } },

	{ path: '/shares', component: SharesPage, meta: { title: "Shares List", role: "admin" } },
	{ path: '/add-share', component: ShareAddPage, meta: { title: "Add Share", role: "admin" } },
	{ path: '/edit-share/:share_id', component: ShareEditPage, meta: { title: "Edit Share", role: "admin" } },
	
	{ path: '/buy/:user_id', component: UserBuyPage, meta: { title: "Buy Shares", role: "admin" } },
	


	{ path: '/forbidden', component: Page403, meta: { title: "Access Denied!" } },
	{ path: '/*', component: Page404, meta: { title: "Page not found!" } },


	//{ path: '/', component: Bar }
]


const router = new VueRouter({
    base: '/',
    mode: 'history',	
	routes: routes,
	linkActiveClass: "",
	linkExactActiveClass: "active",	
});

	
router.beforeEach((to, from, next) => {
	
	if ( to.meta ) {
		store.commit("setPageTitle", to.meta.title);
		
		if ( to.meta.role ) store.commit("setPageRole", to.meta.role);
		//console.log( store.getters("account/role"), to.meta.role );
		//console.info( store.getters["account/role"], to.meta.role );
	};
	next()
})	