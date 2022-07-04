"use strict";

const UserAddPage = {
	
	data: function () {
		return {
			curr_data: {
				login: "",
				name: "",
				email: "",
				password: "",
				role: 'user',
				phone_number: "",
				address: "",
			}
		}
	},	
	
	computed: {
		
		users() {
			return this.$store.getters.users;
			
		}
		
	},
	
	methods: {
		
		saveForm() {
			this.$store.dispatch("postUser", this.curr_data );
			this.$router.push({path: '/users' });
		}
	},
	
	created() {
		this.$store.dispatch("getUsers");
		
	},

	template: `	



	<div class="content container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
				
					<div class="card-body">
						<form class="horizonatal" @submit.prevent="saveForm">

							<fieldset class="mb-0 mt-4">
								<legend class="text-uppercase font-size-sm font-weight-bold">User Data</legend>

								<div class="form-group row">
									<label class="col-form-label col-lg-3">User Name <i class="icon-svg required"></i> </label>
									<div class="col-lg-9">
										<input required type="text" class="form-control" v-model="curr_data.name">
									</div>
								</div>
								
								<div class="form-group row">
									<label class="col-form-label col-lg-3">User Email  <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<input required type="email" class="form-control" v-model="curr_data.email">
									</div>
								</div>

								<div class="form-group row">
									<label class="col-form-label col-lg-3">Login <i class="icon-svg required"></i> </label>
									<div class="col-lg-9">
										<input required type="text" class="form-control" v-model="curr_data.login">
									</div>
								</div>

								<div class="form-group row">
									<label class="col-form-label col-lg-3">Password <i class="icon-svg required"></i> </label>
									<div class="col-lg-9">
										<input required type="text" class="form-control" v-model="curr_data.password">
									</div>
								</div>

								<div class="form-group row">
									<label class="col-form-label col-lg-3">Phone Number <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<input required type="text" class="form-control" v-model="curr_data.phone_number">
									</div>
								</div>

								<div class="form-group row">
									<label class="col-form-label col-lg-3">Address</label>
									<div class="col-lg-9">
										<input type="text" class="form-control" v-model="curr_data.address">
									</div>
								</div>


								<div class="form-group row">
									<label class="col-form-label col-lg-3">User Role</label>
									<div class="col-lg-9">
										<select class="form-control" v-model="curr_data.role">
											<option value="user">User</option>
											<option value="admin">Admin</option>
										</select>
									</div>
								</div>



							</fieldset>
			
							<hr />
							
							
							
							<div class="row">
								<div class="col">
									<button type="button" @click=" $router.push({path: '/' })" class="btn btn-light btn-lg">Cancel</button>
								</div>
								<div class="col">
									<div class="text-right">
										<button class="btn btn-lg btn-success legitRipple">Add User<i class="icon-paperplane ml-2"></i></button>
									</div>		
								</div>
							</div>	
					
						</form>
					
					</div>
				</div>	

			</div>
		</div>
	
	</div>

`
}