"use strict";

const ShareAddPage = {
	
	data: function () {
		return {
			curr_data: {
				symbol: "",
				title: "",
				type: "stocks",
				rate: "",
			}
		}
	},	
	
	computed: {
		
		users() {
			return this.$store.getters.shares;
			
		}
		
	},
	
	methods: {
		
		saveForm() {
			this.$store.dispatch("postShare", this.curr_data );
			this.$router.push({path: '/shares' });
		}
	},
	
	created() {
		this.$store.dispatch("getShares");
		
	},

	template: `	



	<div class="content container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
				
					<div class="card-body">
					
					
						<form class="horizonatal" @submit.prevent="saveForm">

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
										<button class="btn btn-lg btn-success legitRipple">Add<i class="icon-paperplane ml-2"></i></button>
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