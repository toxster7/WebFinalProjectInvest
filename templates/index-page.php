<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="icon" href="/assets/images/favicon.png">



	<!-- Global stylesheets -->
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
	<link href="/assets/dark-theme/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
	<link href="/assets/dark-theme/css/icons/fontawesome/styles.min.css" rel="stylesheet" type="text/css">
	
	<link href="/assets/dark-theme/css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<link href="/assets/dark-theme/css/bootstrap_limitless.min.css" rel="stylesheet" type="text/css">
	<link href="/assets/dark-theme/css/layout.min.css" rel="stylesheet" type="text/css">
	<link href="/assets/dark-theme/css/components.min.css" rel="stylesheet" type="text/css">
	<link href="/assets/dark-theme/css/colors.min.css" rel="stylesheet" type="text/css">
	<!-- /global stylesheets -->

	<!-- Core JS files -->
	<script src="/assets/js/main/jquery-3.6.0.min.js"></script>
	<script src="/assets/dark-theme/js/bootstrap.bundle.min.js"></script>
	<script src="/assets/dark-theme/js/plugins/loaders/blockui.min.js"></script>
	<!-- /core JS files -->

	<!-- Theme JS files -->
	<script src="/assets/dark-theme/js/app.js"></script>
	<script src="/assets/dark-theme/js/custom.js"></script>
	<!-- /theme JS files -->


	<!-- Vue JS files -->
	<script src="/assets/js/vue/axios.min.0.19.2.js"></script>
	<script src="/assets/js/vue/vue-dist.2.6.11.js"></script>	
	<script src="/assets/js/vue/vuex.3.6.2.js"></script>	
	<script src="/assets/js/vue/vue-router.3.3.1.min.js"></script>
	<!-- /vue JS files -->
	
	<!-- Plugins JS files -->
	
	<script src="/assets/js/plugins/awesome-notifications/index.js"></script>
	<link href="/assets/js/plugins/awesome-notifications/style.css" rel="stylesheet" type="text/css">
	
	<script src="/assets/js/plugins/moment/moment.2.27.0.min.js"></script>
	<script src="/assets/js/plugins/forms/styling/switch.min.js"></script>
	<script src="/assets/js/plugins/forms/styling/switchery.min.js"></script>
	<script src="/assets/js/plugins/forms/styling/uniform.min.js"></script>
	
	<script src="/assets/js/plugins/tables/datatables/datatables.min.js"></script>	
	
	<script src="/assets/js/plugins/tables/datatables/extensions/jszip/jszip.min.js"></script>
	<script src="/assets/js/plugins/tables/datatables/extensions/pdfmake/pdfmake.min.js"></script>
	<script src="/assets/js/plugins/tables/datatables/extensions/pdfmake/vfs_fonts.min.js"></script>
	<script src="/assets/js/plugins/tables/datatables/extensions/buttons.min.js"></script>
	

	<script src="/assets/js/plugins/lodash-4.17.15/lodash.min.js"></script>

	<link href="/assets/css/styles.css?v<?=time()?>" rel="stylesheet" />

	<!-- /plugins JS files -->
	
	
	<style>
</style>	
	
</head>

<body>

	<div id="vue-app-container">
	
		<!-- Main navbar -->
		<div v-if="auth" class="navbar navbar-expand-md navbar-dark">
			<div class="navbar-brand">
				<router-link to="/" class="d-inline-block"> 
					<img src="/assets/images/theme/logo_light.png" alt="">
				</router-link>	
			</div>

			<div class="collapse navbar-collapse" id="navbar-mobile">

				<span class="navbar-text ml-md-3 mr-md-auto"></span>					

				<ul class="navbar-nav">
				
					<li class="nav-item">
						<a href="#" class="navbar-nav-link">
							<i class="icon-user mr-1"></i>
							{{name}} ( {{role}} )
						</a>
					</li>
					
					
				
					<li class="nav-item">
						<a @click.prevent=" $store.dispatch('account/deleteAuth') " href="#" class="navbar-nav-link"><i class="icon-switch2 mr-1"></i> Logout</a>					
					</li>
				</ul>
			</div>
		</div>
		<!-- /main navbar -->
			
		<!-- Main content -->
		<div class="content-wrapper">

			<div  v-if="auth" class="page-header page-header-light">
				<div class="page-header-content header-elements-md-inline">
					<div class="page-title d-flex">
						<h4><i class="icon-newspaper mr-2"></i> {{page_title}}</h4>
						<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
					</div>

					<div v-if=" role == 'admin' " class="header-elements d-none">
						<div class="d-flex justify-content-center">
							<router-link to="/" class="btn btn-link btn-float text-default"><i class="icon-home4 text-primary"></i><span>Dashboard</span></router-link>
							<router-link to="/users" class="btn btn-link btn-float text-default"><i class="icon-users text-primary"></i> <span>Users</span></router-link>
							<router-link to="/shares" class="btn btn-link btn-float text-default"><i class="icon-book text-primary"></i> <span>Shares</span></router-link>

						</div>
					</div>
					<div v-else-if=" role == 'user' " class="header-elements d-none">
						<div class="d-flex justify-content-center">
							<router-link to="/" class="btn btn-link btn-float text-default"><i class="icon-home4 text-primary"></i><span>Dashboard</span></router-link>
							<router-link to="/my-numbers" class="btn btn-link btn-float text-default"><i class="icon-users text-primary"></i> <span>Contacts</span></router-link>
							<router-link to="/archive" class="btn btn-link btn-float text-default"><i class="icon-archive  text-primary"></i> <span>Archive</span></router-link>

						</div>
					</div>
					<div v-else-if=" role == 'accountant' " class="header-elements d-none">
						<div class="d-flex justify-content-center">
							<router-link to="/" class="btn btn-link btn-float text-default"><i class="icon-home4 text-primary"></i><span>Dashboard</span></router-link>
							<router-link to="/not-acknowledged" class="btn btn-link btn-float text-default"><i class="icon-mail5 text-primary"></i> <span>Not Acknowledged</span></router-link>
							<router-link to="/accountant-stat" class="btn btn-link btn-float text-default"><i class="icon-stack2 text-primary"></i> <span>Statistic</span></router-link>
							
							
							<!--
							<router-link to="/my-numbers" class="btn btn-link btn-float text-default"><i class="icon-users text-primary"></i> <span>Contacts</span></router-link>
							<router-link to="/my-report" class="btn btn-link btn-float text-default"><i class="icon-stack2 text-primary"></i> <span>Report</span></router-link>
							-->
						</div>
					</div>					
				</div>
			
			</div>	
	
	
			<!-- Content area -->
			<router-view></router-view>
			<!-- /content area -->


			<!-- Footer -->
			<div class="navbar navbar-expand-lg navbar-light">
				<div class="text-center d-lg-none w-100">
					<button type="button" class="navbar-toggler dropdown-toggle" data-toggle="collapse" data-target="#navbar-footer">
						<i class="icon-unfold mr-2"></i>
						Footer
					</button>
				</div>

				<div class="navbar-collapse collapse" id="navbar-footer">
					<span class="navbar-text">
						&copy; 2022. All rights reserved
					</span>
				</div>
			</div>
			<!-- /footer -->


		</div>




	</div>

	<script src="/vue/store/vue-store-alert.js?v<?=time()?>"></script>
	<script src="/vue/store/vue-store-account.js?v<?=time()?>"></script>
	<script src="/vue/store/vue-store-yahoo.js?v<?=time()?>"></script>
	<script src="/vue/store/vue-store.js?v<?=time()?>"></script>
	
	
	<script src="/vue/func.js?v<?=time()?>"></script>



	<script src="/vue/components/v-datatable.vue.js?v<?=time()?>"></script>

	<script src="/vue/pages/LoginPage.js?v<?=time()?>"></script>

	<script src="/vue/pages/HomePage.js?v<?=time()?>"></script>

	<script src="/vue/pages/UsersPage.js?v<?=time()?>"></script>
	<script src="/vue/pages/UserAddPage.js?v<?=time()?>"></script>
	<script src="/vue/pages/UserEditPage.js?v<?=time()?>"></script>

	
	<script src="/vue/pages/SharesPage.js?v<?=time()?>"></script>
	<script src="/vue/pages/ShareEditPage.js?v<?=time()?>"></script>
	<script src="/vue/pages/ShareAddPage.js?v<?=time()?>"></script>


	
	<script src="/vue/pages/UserBuyPage.js?v<?=time()?>"></script>
	
	<script src="/vue/pages/Page403.js?v<?=time()?>"></script>
	<script src="/vue/pages/Page404.js?v<?=time()?>"></script>


	<script src="/vue/vue-router.js?v<?=time()?>"></script>
	<script src="/vue/vue-app.js?v<?=time()?>"></script>
	
	
	
</body>
</html>
