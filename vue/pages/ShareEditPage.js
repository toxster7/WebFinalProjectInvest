"use strict";

const ShareEditPage = {
	
	data: function () {
		return {
			curr_data: undefined
		}
	},	
	
	computed: {
		
		
	},
	
	methods: {
		
		saveForm() {
			this.$store.dispatch("patchShare", this.curr_data );
			this.$router.push({path: '/shares' });
		}
	},
	
	created() {
	
		axios.get( "/share", { params: { id: this.$route.params.share_id}} ).then(response => {
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
							<span class="font-weight-semibold">No such item found</span>
						 </div>
						
						<form v-else class="horizonatal" @submit.prevent="saveForm">

							<fieldset class="mb-0 mt-4">
								<legend class="text-uppercase font-size-sm font-weight-bold">Share Data</legend>

								<div class="form-group row">
									<label class="col-form-label col-lg-3"> Symbol <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<input required type="text" class="form-control" v-model="curr_data.symbol">
									</div>
								</div>
								
								<div class="form-group row">
									<label class="col-form-label col-lg-3">Name <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<input required type="text" class="form-control" v-model="curr_data.title">
									</div>
								</div>

								<div class="form-group row">
									<label class="col-form-label col-lg-3">Rate <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<input required type="number" step="0.01" class="form-control" v-model="curr_data.rate">
									</div>
								</div>
								
								
								<div class="form-group row">
									<label class="col-form-label col-lg-3">Type  <i class="icon-svg required"></i></label>
									<div class="col-lg-9">
										<select class="form-control" v-model="curr_data.type">
											<option value="cryptocurrencies">Cryptocurrencies</option>
											<option value="currencies">Currencies</option>
											<option value="metals">Metals</option>
											<option value="stocks">Stocks</option>
										</select>
									</div>
								</div>



							</fieldset>
			
							<hr />
							
							
							
							<div class="row">
								<div class="col">
									<button type="button" @click=" $router.push({path: '/shares' })" class="btn btn-light btn-lg">Cancel</button>
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