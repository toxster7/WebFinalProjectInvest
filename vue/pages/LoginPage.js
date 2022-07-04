"use strict";

const LoginPage = {
	
	data: function () {
		return {
			login: "",
			password: ""
		}
	},	
	
	computed: {
	
		
	},
	
	methods: {
		postAuth() {
			this.$store.dispatch("postAuth", { login: this.login, password: this.password })
			return false;
		},
	
		
	},
	
	mounted() {

	},

	template: `	


	<!-- Page content -->
	<div class="page-content pt-5">

		<!-- Main content -->
		<div class="content-wrapper">

			<!-- Content area -->
			<div class="content d-flex justify-content-center align-items-center">

				<!-- Login form -->
				<form @submit.prevent="postAuth" class="login-form" >
					<div class="card mb-5">
						<div class="card-body">
							<div class="text-center mb-3">
								<i class="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"></i>
								<h5 class="mb-0">Investment Fund Management</h5>
								<span class="d-block text-muted">Enter your credentials below</span>
							</div>

							<div class="form-group form-group-feedback form-group-feedback-left">
								<input v-model="login" type="text" class="form-control" :placeholder=" login " required>
								<div class="form-control-feedback">
									<i class="icon-user text-muted"></i>
								</div>
							</div>

							<div class="form-group form-group-feedback form-group-feedback-left">
								<input v-model="password" type="password" class="form-control" :placeholder=" password ">
								<div class="form-control-feedback">
									<i class="icon-lock2 text-muted"></i>
								</div>
							</div>

							<div class="form-group">
								<button type="submit" class="btn btn-primary btn-block">Sign in<i class="icon-circle-right2 ml-2"></i></button>
							</div>
							
							
						</div>
					</div>
				</form>
				<!-- /login form -->

			</div>
			<!-- /content area -->



		</div>
		<!-- /main content -->

	</div>
	<!-- /page content -->

	`
	
};
