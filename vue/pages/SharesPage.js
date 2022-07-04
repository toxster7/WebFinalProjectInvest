"use strict";

const SharesPage = {
	
	data: function () {
		return {
			
		}
	},	
	
	computed: {
		
		def_shares() {
			return utils.tables.shares;	
		},
		
		shares() {
			return this.$store.getters.shares;
			
		}
		
	},
	
	methods: {
		
	},
	
	mounted() {
	
		
	
		
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
					<h6 class="card-title">Shares</h6>
					<div class="header-elements">
					
						<button type="button" @click=" $router.push({path: '/add-share' }) " class="btn btn-success"><i class="icon-plus2 mr-2"></i> Add share</button>					
					
					</div>
				</div>
		
				
				<div class="card-body" style="min-height: 300px;">
					
					
					<v-datatable
						id = "shares"
						entity = "shares"
						:value = shares
						:def = def_shares
					>	
					</v-datatable>
					
				</div>
			</div>		
		
		</div>
	</div>	

	

</div>


`
}