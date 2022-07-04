"use strict";

const UserBuyPage = {
	
	data: function () {
		return {
			curr_user: undefined,
			curr_share_key: 0,
			curr_sum: 1,
		}
	},	
	
	computed: {
		shares() { return this.$store.getters.shares },
		curr_share() { return this.$store.getters.shares[ this.curr_share_key ] },
		total_sum() { 
			let res = this.curr_share.rate * this.curr_sum;
			return res.toFixed(4);
		}
	},
	
	methods: {
		
		saveForm() {
		
			let send_data = {
				user_name: this.curr_user.name,
				share_title: this.curr_share.title,
				rate: this.curr_share.rate,
				share_type: this.curr_share.type,
				count: this.curr_sum,
				total_sum: this.total_sum
			}
		
		
			this.$store.dispatch("postLogs", send_data );
			this.$router.push({path: '/' });
		}
	},
	
	created() {
	
		axios.get( "/user", { params: { id: this.$route.params.user_id}} ).then(response => {
			if ( response.data.success ) {
				
				// messages
				if ( response.data.messages ) {
					response.data.messages.forEach( item => {	context.dispatch("notification", item) });
				};
				
				this.curr_user = response.data.data;
				

			} else { console.error(error) };
		})	.catch(error => console.error(error))		
		
	},

	template: `	



	<div class="content container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
				
					<div class="card-body">
					
						<div v-if=" curr_user === undefined " class="alert alert-primary alert-rounded alert-dismissible">
							<button type="button" class="close" data-dismiss="alert"><span>×</span></button>
							<span class="font-weight-semibold">Please, wait...</span>
						 </div>
						 
						<div v-else-if=" curr_user.length == 0 " class="alert alert-danger alert-rounded alert-dismissible">
							<button type="button" class="close" data-dismiss="alert"><span>×</span></button>
							<span class="font-weight-semibold">No such user found</span>
						 </div>
						
						<form v-else class="horizonatal" @submit.prevent="saveForm">

							<fieldset class="mb-0 mt-4">
								<legend class="text-uppercase font-size-sm font-weight-bold">Buy Shares for {{curr_user.name}}</legend>



								<div class="form-group row">
									<label class="col-form-label col-lg-3">Shares  <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<select class="form-control" v-model="curr_share_key">
											<option v-for=" ( item ,key) in shares" :key="item.id" :value="key">{{item.symbol}} - {{item.title}}</option>
										</select>
									</div>
								</div>


								<div class="form-group row">
									<label class="col-form-label col-lg-3"> Sum <i class="icon-svg required"></i></label>
									<div class="col-lg-3">
										<input required type="number" step="0.01" min="0.01" class="form-control" v-model="curr_sum">
									</div>
									<div class="col-lg-6">
										<div v-if="curr_share" class="alert alert-primary alert-rounded alert-dismissible">
											<span class="font-weight-semibold">{{curr_sum}}</span> 
											×
											<span class="font-weight-semibold">{{curr_share.rate}}&nbsp;$</span> 
											=
											<span class="font-weight-semibold">{{total_sum}}&nbsp;$</span> 
											
										</div>									
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
										<button class="btn btn-lg btn-success legitRipple">Buy Share<i class="icon-paperplane ml-2"></i></button>
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