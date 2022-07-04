"use strict";

const UserEditPage = {
	
	data: function () {
		return {
			curr_data: undefined
		}
	},	
	
	computed: {
		
		
	},
	
	methods: {
		
		saveForm() {
			this.$store.dispatch("patchUser", this.curr_data );
			this.$router.push({path: '/users' });
		}
	},
	
	created() {
	
		this.$store.dispatch("getUsers");
	
		axios.get( "/user", { params: { id: this.$route.params.user_id}} ).then(response => {
			if ( response.data.success ) {
				
				// messages
				if ( response.data.messages ) {
					response.data.messages.forEach( item => {	context.dispatch("notification", item) });
				};
				
				this.curr_data = response.data.data;
				

			} else { console.error(error) };
		})	.catch(error => console.error(error))		
		
	},

	template: `	



	<div class="content container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
				
					<div class="card-body">
					
						<div v-if=" curr_data === undefined " class="alert alert-primary alert-rounded alert-dismissible">
							<button type="button" class="close" data-dismiss="alert"><span>×</span></button>
							<span class="font-weight-semibold">Please, wait...</span>
						 </div>
						 
						<div v-else-if=" curr_data.length == 0 " class="alert alert-danger alert-rounded alert-dismissible">
							<button type="button" class="close" data-dismiss="alert"><span>×</span></button>
							<span class="font-weight-semibold">No such user found</span>
						 </div>
						
						<form v-else class="horizonatal" @submit.prevent="saveForm">

							<fieldset class="mb-0 mt-4">
								<legend class="text-uppercase font-size-sm font-weight-bold">User Data</legend>

								<div class="form-group row">
									<label class="col-form-label col-lg-3"> User Name <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<input required type="text" class="form-control" v-model="curr_data.name">
									</div>
								</div>
								
								<div class="form-group row">
									<label class="col-form-label col-lg-3">User Email <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<input required type="email" class="form-control" v-model="curr_data.email">
									</div>
								</div>

								<div class="form-group row">
									<label class="col-form-label col-lg-3">Login <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<input required type="text" class="form-control" v-model="curr_data.login">
									</div>
								</div>

								<div class="form-group row">
									<label class="col-form-label col-lg-3">Password <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<input required type="text" class="form-control" v-model="curr_data.password">
									</div>
								</div>

								<div class="form-group row">
									<label class="col-form-label col-lg-3">Phone Number  <i class="icon-svg required"></i></label>
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
									<label class="col-form-label col-lg-3">User Role  <i class="icon-svg required"></i></label>
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
										<button class="btn btn-lg btn-success legitRipple">Save<i class="icon-paperplane ml-2"></i></button>
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