
const utils = {
	
	vars: {
		fn_export: "Example",
	},
	tables: {},
	render: {},
	
	check_required_params( params, data ) {	
		
		let res = true;
		
		params.forEach( ( param_name ) => {
			if ( data[ param_name ] === undefined ) {
				console.error( `${param_name} is required` );
				res = false;
			}
		});
	
		return res;
	},
	
	
};






utils.tables["users"] = {
	"columnDefs": [
		{
			"name": "id",
			"title": "#",
			"width": "1%"
		},
		{
			"name": "name",
			"title": "Name",
		},
		
		
		{
			"name": "login",
			"title": "Login",
		},

 		{
			"name": "role",
			"title": "Role",
			"width": "1%"
		},
		


		{
			"name": "email",
			"title": "Email",
			"width": "1%",
			"render": function ( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				return `<a href= "mailto:${data}">${data}</a>`;
			}		
		},

		
		{
			"name": "phone_number",
			"title": "Phone",
			"width": "1%",
			"render": function ( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				return `<a href= "tel:${data}">${data}</a>`;
			}		
			
		},
		
		{
			"name": "time_created",
			"title": "Created",
			"width": "1%"
		},
		
		{
			"name": "detail",
			"title": "<i class=\"icon-menu7\"><\/i>",
			"render": function ( data, type, row, meta ) {	
				if ( type !== 'display' ) return 1;
				
				let 
					table_name = "users";
				
				return `
					<div class="list-icons">
						<div class="list-icons-item dropdown">
							<a href="#" class="list-icons-item dropdown-toggle caret-0" data-toggle="dropdown" aria-expanded="false"><i class="icon-menu7"></i></a>
							<div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(16px, 16px, 0px);">
								<a href="#" data-id="${row.id}" data-name='${table_name}' class="dropdown-item edit-user-link"><i class="icon-pencil7"></i> Edit User</a>
								<div class="dropdown-divider"></div>
								<a href="#" data-id="${row.id}" data-name='${table_name}' class="dropdown-item delete-user-link"><i class="icon-cross2"></i> Remove User</a>		
							</div>
						</div>
					</div>	
				`;
			},
			"sortable": false,
			"width": "1%"
		}

	],
	
	"order": [[ 0, "desc" ]],
	
	
	createdRow: function( row, data, dataIndex ) {
		//$(row).attr( 'data-role', data.role );
	},
	
};


utils.tables["shares"] = {
	"columnDefs": [
		{
			"name": "id",
			"title": "#",
			"width": "1%"
		},
		
		{
			"name": "symbol",
			"title": "Symbol",
			"width": "1%",
			"render": function ( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				return `<b>${data}</b>`;
			}			
		},
		
		{
			"name": "title",
			"title": "Name",
		},
		
		
		{
			"name": "type",
			"title": "Type",
			"width": "1%"
		},

 		{
			"name": "rate",
			"title": "Rate",
			
		},
		
	
		{
			"name": "time_updated",
			"title": "Updated",
			"width": "1%"
		},
		
		{
			"name": "detail",
			"title": "<i class=\"icon-menu7\"><\/i>",
			"render": function ( data, type, row, meta ) {	
				if ( type !== 'display' ) return 1;
				
				let 
					table_name = "shares";
				
				return `
					<div class="list-icons">
						<div class="list-icons-item dropdown">
							<a href="#" class="list-icons-item dropdown-toggle caret-0" data-toggle="dropdown" aria-expanded="false"><i class="icon-menu7"></i></a>
							<div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(16px, 16px, 0px);">
								<a href="#" data-id="${row.id}" data-name='${table_name}' class="dropdown-item edit-share-link"><i class="icon-pencil7"></i> Edit Share</a>
								<div class="dropdown-divider"></div>
								<a href="#" data-id="${row.id}" data-name='${table_name}' class="dropdown-item delete-share-link"><i class="icon-cross2"></i> Remove Share</a>		
							</div>
						</div>
					</div>	
				`;
			},
			"sortable": false,
			"width": "1%"
		}

	],
	
	"order": [[ 0, "desc" ]],
	
	
	createdRow: function( row, data, dataIndex ) {
		//$(row).attr( 'data-share-type', data.type );
	},
	
};



utils.tables["start_users"] = {
	"columnDefs": [
		{
			"name": "id",
			"title": "#",
			"width": "1%"
		},
		{
			"name": "name",
			"title": "Name",
		},
		
		
		{
			"name": "email",
			"title": "Email",
			"width": "1%",
			"render": function ( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				return `<a href= "mailto:${data}">${data}</a>`;
			}		
		},

		
		{
			"name": "phone_number",
			"title": "Phone",
			"width": "1%",
			"render": function ( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				return `<a href= "tel:${data}">${data}</a>`;
			}		
			
		},
		
		{
			"name": "time_created",
			"title": "Created",
			"width": "1%"
		},
		{
			"name": "detail",
			"title": "<i class=\"icon-coins\"><\/i>",
			"render": function ( data, type, row, meta ) {	
				if ( type !== 'display' ) return 1;
				
				return `
					<a href="#" style="color: #e19302" data-id="${row.id}" class="shares-link">
						<i title="Buy Shares" class="icon-coins"></i>
					</a>
				`;
			},
			"sortable": false,
			"width": "1%"
		}

	],
	
	"order": [[ 0, "desc" ]],
	
	
	createdRow: function( row, data, dataIndex ) {
		$(row).attr( 'data-role', data.role );
	},
	
};



utils.tables["logs"] = {
	"columnDefs": [

		{
			"name": "user_name",
			"title": "Client",
		},
		
		{
			"name": "share_title",
			"title": "Share",
		},
		
		
		{
			"name": "share_type",
			"title": "Type",
			"width": "1%"
		},

 		{
			"name": "count",
			"title": "Count",
			
		},
		
 		{
			"name": "rate",
			"title": "Rate",
			
		},		

 		{
			"name": "total_sum",
			"title": "Total",
			
		},		
		
	
		{
			"name": "time_created",
			"title": "Created",
			"width": "1%"
		}		


	],
	
	"order": [[ 6, "desc" ]],
	
	
	createdRow: function( row, data, dataIndex ) {
		$(row).attr( 'data-share-type', data.type );
	},
	
};








utils.render.detailRow = function ( data, type, row, meta ) {	
	if ( type !== 'display' ) return 1;
	
	let 
		//table_name = $(meta.settings.nTable).attr("data-name");
		table_name = "users";
	
	return `
		<div class="list-icons">
			<div class="list-icons-item dropdown">
				<a href="#" class="list-icons-item dropdown-toggle caret-0" data-toggle="dropdown" aria-expanded="false"><i class="icon-menu7"></i></a>
				<div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(16px, 16px, 0px);">
					<a href="#" data-id="${row.id}" data-name='${table_name}' class="dropdown-item edit-user-link"><i class="icon-pencil7"></i> Edit User</a>
					<div class="dropdown-divider"></div>
					<a href="#" data-id="${row.id}" data-name='${table_name}' class="dropdown-item delete-user-link"><i class="icon-cross2"></i> Remove User</a>		
				</div>
			</div>
		</div>	
	`;
};


utils.render.detailError = function ( data, type, row, meta ) {	
	if ( type !== 'display' ) return 1;
	
	let 
		//table_name = $(meta.settings.nTable).attr("data-name");
		table_name = "errors";
	
	return `
		<div class="list-icons">
			<div class="list-icons-item dropdown">
				<a href="#" class="list-icons-item dropdown-toggle caret-0" data-toggle="dropdown" aria-expanded="false"><i class="icon-menu7"></i></a>
				<div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(16px, 16px, 0px);">
					<a href="#" data-id="${row.id}" data-name='${table_name}' class="dropdown-item detail-errors"><i class="icon-bug2 "></i> Error Logs</a>
					<div class="dropdown-divider"></div>
					<a href="#" data-id="${row.id}" data-name='${table_name}' class="dropdown-item undo-import"><i class="icon-undo"></i> Undo Import</a>		
				</div>
			</div>
		</div>		
	`;
};


utils.render.cost = function ( data, type, row, meta ) {	
	let 
		curr = store.getters.currency,
		rate = store.getters.rate,
		val = data * rate;
		
	return ( type !== 'display' ) ? data : `<div>${val.toFixed(4)}</div>`;
};






const datatable_scheme = {
	columnDefs: [],
//	stateSave: true,
	responsive: true,
	autoWidth: false,
	
	"bStateSave": true,
	"fnStateSave": function (oSettings, oData) {
		localStorage.setItem('offersDataTables', JSON.stringify(oData));
	},
	"fnStateLoad": function (oSettings) {
		return JSON.parse(localStorage.getItem('offersDataTables'));
	},	
	

	buttons: {            
		dom: {
			button: {
				className: 'btn btn-light'
			}
		},
		buttons: [
		
		{
			extend: 'print',
			text: '<i class="icon-printer mr-2"></i> Print',
			className: 'btn bg-danger ml-2',
			exportOptions: { orthogonal: "export" },
		},
		{
			extend: 'excel',
			text: '<i class="icon-file-excel mr-2"></i> Excel',
			className: 'btn bg-green ml-2',
			exportOptions: { orthogonal: "export" },
		},				
		{
			extend: 'pdf',
			text: '<i class="icon-file-pdf mr-2"></i> PDF',
			className: 'btn bg-orange ml-2',
			exportOptions: { orthogonal: "export" },
		},				
		]
	},

	dom: '<"datatable-header"flB><"datatable-scroll-wrap"t><"datatable-footer"ip>',
};



$(document).ready(function()  {
	$.extend( $.fn.dataTable.defaults, datatable_scheme );
	
	


	

	$(document).on("click", ".delete-user-link", function(e) {
		if ( confirm("Are you sure you want to delete the user?") ) {
			let row_id = $(this).attr("data-id");
			store.dispatch("deleteUser", { id: row_id} );
		};
		
		return false;
	});

	$(document).on("click", ".edit-user-link", function(e) {
		let row_id = $(this).attr("data-id");
		router.push({path: '/edit-user/' + row_id });
		return false;
	});
	
	$(document).on("click", ".shares-link", function(e) {
		let row_id = $(this).attr("data-id");
		router.push({path: '/buy/' + row_id });
		return false;
	});	

	$(document).on("click", ".delete-share-link", function(e) {
		if ( confirm("Are you sure you want to delete the share?") ) {
			let row_id = $(this).attr("data-id");
			store.dispatch("deleteShare", { id: row_id} );
		};
		
		return false;
	});

	$(document).on("click", ".edit-share-link", function(e) {
		let row_id = $(this).attr("data-id");
		router.push({path: '/edit-share/' + row_id });
		return false;
	});



	$(document).on("click", ".detail-errors", function(e) {
		let row_id = $(this).attr("data-id");
		router.push({path: 'upload-errors/' + row_id });
		return false;
	});
	
	$(document).on("change", ".user-call-type", function(e) {

		$(this).closest("tr").addClass("deleted");
		
		let row_id = $(this).attr("data-id");
		
		setTimeout( () => {  
			store.dispatch("patchCalls", { id: row_id, call_type: $(this).val() } );
		}, 500);
		
		
		return false;
	});

	$(document).on("change", ".select-call-processed", function(e) {
		let row_id = $(this).attr("data-id");
		
		store.dispatch("patchCalls", { id: row_id, processed: $(this).val() } );
		return false;
	});	
	
	$(document).on("change", ".user-destination-type", function(e) {
		let destination = $(this).attr("data-destination");
		
		store.dispatch("patchPhones", { type: $(this).val(), destination: destination } );
		return false;
	});

	$(document).on("click", ".remove-phone", function(e) {
		if ( confirm("Are you sure you want to delete the phone?") ) {
			let row_id = $(this).attr("data-id");
			store.dispatch("deletePhone", { id: row_id} );
		};
		
		return false;
	});

	$(document).on("click", ".user-stat", function(e) {
		let user_id = $(this).attr("data-user-id");
		router.push({path: 'user-logs/' + user_id });
		return false;
	});
	
	
	// undo
	$(document).on("click", ".undo-import", function(e) {
		if ( confirm("Are you sure you want to undo the import?") ) {
			let row_id = $(this).attr("data-id");
			store.dispatch("undoImport", { id: row_id} );
		};
		
		return false;
	});


	// select all
	$(document).on("change", ".multilple_users_select_all", function(e) {
		$('.multilple_users').prop('checked', this.checked);
	});

	$(document).on("change", ".multilple_users_acknowledged_select_all", function(e) {
		$('.multilple_users_acknowledged').prop('checked', this.checked);
	});

	$(document).on("change", ".multilple_user_calls_select_all", function(e) {
		$('.multilple_user_calls').prop('checked', this.checked);
	});



})



