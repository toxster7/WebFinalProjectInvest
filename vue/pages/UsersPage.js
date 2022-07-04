"use strict";

const UsersPage = {
	
	data: function () {
		return {
			
		}
	},	
	
	computed: {
		
		def_users() {
			return utils.tables.users;	
		},
		
		users() {
			return this.$store.getters.users;
			
		}
		
	},
	
	methods: {
		
	},
	
	mounted() {
	
		this.$store.dispatch("getUsers");
	
		
	},

	template: `	



<div class="content container">
	
	<!--
	<widgets-row></widgets-row>
	-->
	
	<div class="row">
		<div class="col-md-12">

			<div class="card">
			
				<div class="card-header header-elements-inline">
					<h6 class="card-title">Users</h6>
					<div class="header-elements">
					
						<button type="button" @click=" $router.push({path: '/add-user' }) " class="btn btn-success"><i class="icon-plus2 mr-2"></i> Add user</button>					
					
					</div>
				</div>
		
				
				<div class="card-body" style="min-height: 300px;">
					
					
					<v-datatable
						id = "users"
						entity = "users"
						:value = users
						:def = def_users
					>	
					</v-datatable>
					
				</div>
			</div>		
		
		</div>
	</div>	

	

</div>


`
}