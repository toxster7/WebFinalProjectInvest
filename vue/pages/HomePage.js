"use strict";

const HomePage = {
	
	data: function () {
		return {
			
		}
	},	
	
	computed: {
		
		def_users() {
			return utils.tables.start_users;	
		},
		
		users() {
			return this.$store.getters.users.filter( item => item.role == 'user' );
		},
		
		def_logs() {
			return utils.tables.logs;	
		},
		
		logs() {
			return this.$store.getters.logs;
		}
		
		
	},
	
	methods: {
		
	},
	
	mounted() {
	
		this.$store.dispatch("getUsers");
		this.$store.dispatch("getLogs");
	
		
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
					<h6 class="card-title">Operations</h6>
				</div>
		
				
				<div class="card-body" style="min-height: 300px;">
					<v-datatable
						id = "start_users"
						entity = "start_users"
						:value = users
						:def = def_users
					>	
					</v-datatable>
					
				</div>
			</div>		
			
			
			
			
			
		
		</div>
	</div>	

	<div class="row">
		<div class="col-md-12">

			<div class="card">
			
				<div class="card-header  header-elements-inline">
					<h6 class="card-title">Purchase History</h6>
				</div>
		
				
				<div class="card-body" style="min-height: 300px;">
					<v-datatable
						id = "logs"
						entity = "logs"
						:value = logs
						:def = def_logs
					>	
					</v-datatable>
					
				</div>
			</div>		
			
			
			
			
			
		
		</div>
	</div>		

</div>


`
}