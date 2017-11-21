
var inputSearchClass = 'datatable_input_col_search';
var columnInputs = $('tfoot .'+inputSearchClass);

columnInputs
.keyup(function () {
    dtInstance2.fnFilter(this.value, columnInputs.index(this));
});

var url = '/cms/borrower/get_data_borrower'
var tbl_product_group = null

$.onLoading()

tbl_product_group = $('#tbl_borrower').DataTable({
'paging': true,  // Table pagination
'ordering': true,  // Column ordering
'info': true,  // Bottom left status text
'responsive': true, // https://datatables.net/extensions/responsive/examples/
'serverSide': true,
'processing': true,
"fnDrawCallback": function (oSettings) {
        $.hideLoading()
    },
ajax: {
    url: url,
    type: "POST",
    data: function(d){
        d.modalnesia_csrf = $("[name='modalnesia_csrf']").val()
    }
},
"columns": [
        {
        "title" : 'ID User',
        "data" : 'id',
        "sortable" : true
    } , {
        "title" : 'Name Lengkap' ,
        "data" : 'name',
        "sortable" : true
    } , {
        "title" : 'Email' ,
        "data" : 'email',
        "sortable" : true
    } ,{
        "title" : 'No Telp' ,
        "data" : 'phone',
        "sortable" : true
    } ,{
        "title" : 'Is Verified Email' ,
        "data" : 'is_verified_email',
        "sortable" : true
    } ,
    {
        "title" : 'Is Verified Phone' ,
        "data" : 'is_verified_phone',
        "sortable" : true
    } ,
    {
        "data": null,
        // "defaultContent": btnAct,
        "render": function(data,type,full,meta){
            var res =  RenderMultiBtn([
            {
                type : 'edit',
                url  : '/cms/borrower/edit_borrower_page/'+data.id
            } ,
            {
                type : 'delete',
                url  : '/cms/borrower/delete_borrower/',
                id   : data.id,
                redir_url : '/cms/borrower/borrower_list'
            }
            ])

            return res

        },
        "title": "Action",
        "width": '10%',
        "sortable": false,
        "className" : 'btn_action'
    }
],
"order": [[0, "asc"]],
"dom": '<"toolbar">lfrtip'
});






 

  
