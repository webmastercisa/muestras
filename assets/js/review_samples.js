var table = new Tabulator("#LstDetails", 
{
  
  layout:"fitColumns",        //fit columns to width of table
  responsiveLayout:"hide",    //hide columns that don't fit on the table
  addRowPos:"top",            //when adding a new row, add it to the top of the table
  history:true,               //allow undo and redo actions on the table
  pagination:"local",         //paginate the data
  paginationSize:25,          //allow 25 rows per page of data
  paginationCounter:"rows",   //display count of paginated rows in footer
  movableColumns:true,        //allow column order to be changed
  initialSort:[ {column:"sap_cod", dir:"asc"}, ],  //set the initial sort order of the data
  columnDefaults:{ tooltip:false, },          //show tool tips on cells
  columns:[                 //define the table columns
      //{title:"Id", field:"id", width:50, editor:"select"},
      //{title:"Company", field:"samples_id", editor:"select"},
      {title:"SAP Code", field:"sap_cod", width:100, hozAlign:"center"},
      {title:"Product Name", field:"name", width:380},
      {title:"Sent", field:"state", width:80, formatter:"tickCross", hozAlign:"center"},
      {title:"Note", field:"note",  hozAlign:"left"},
      //{title:"Create by", field:"create_user_id", editor:"input"},
      //{title:"Date Create", field:"date_create", editor:"input"},
      //{title:"Update by", field:"update_user_id", editor:"input"},
      //{title:"Date Updated", field:"date_update", hozAlign:"right" editor:"input"},

      //{title:"Task Progress", field:"progress", hozAlign:"left", formatter:"progress", editor:true},
      //{title:"Gender", field:"gender", width:95, editor:"select", editorParams:{values:["male", "female"]}},
      //{title:"Rating", field:"rating", formatter:"star", hozAlign:"center", width:100, editor:true},
      //{title:"Color", field:"col", width:130, editor:"input"},
      //{title:"Date Of Birth", field:"dob", width:130, sorter:"date", hozAlign:"center"},
      //{title:"Driver", field:"car", width:90,  hozAlign:"center", formatter:"tickCross", sorter:"boolean", editor:true},
  ],
}); 


$(function()  { GetOrder(); });

/* =========================================================================================== */
/* =========================================================================================== */
function GetOrder()
{  
  DivWaitShow();
  let URL       = 'modules/mod_GetOrdersPS.php';
  var formData  = new FormData();
  formData.append('opt', "LstNoFilter");  
  var ObjAjax = $.ajax({url: URL, method: "POST", type: "post", data:formData, dataType: "html", cache: false, processData: false, contentType: false});
   
   ObjAjax.always(function()   {   DivWaitHide();  });

   ObjAjax.fail(function(jqXHR, textStatus, errorThrown)
   {
    console.log('jqXHR: ', jqXHR);      console.log('textStatus: ', textStatus);      console.log('errorThrown: ', errorThrown);
    ShowMessageError('Error: ' + jqXHR.responseText);
   });
   ObjAjax.done(function(Data) /** Respues OK */
   {
    //console.log('Registros: ', Data);
    var DataJson = JSON.parse(Data);
    if (DataJson.length > 0)
      MakeLstOrders(DataJson);
    else
      ShowMessageError('There are no records.');
   });   
}

function MakeLstOrders(Data)
{
  console.log("Data: ", Data);
  DivWaitShow();
  let DivMaster = document.getElementById('LstOrders');
  DivMaster.innerHTML = '';
  let CantProductos = Data.length;
  for (let i = 0; i < CantProductos; i++)
  {
    let ObjDiv      = Div('',Data[i].id,'fila-item');
    let ObjDivTxt1  = Div('Address: '+ Data[i].address,'', 'div-txt');
    let ObjDivTxt2  = Div(Data[i].email,'', 'div-txt');
    let ObjDivTxt3  = Div('Phone:'  + Data[i].phone,'', 'div-txt');
    let ObjDivTxt4  = ''
    if(Data[i].state == 1)
      ObjDivTxt4  = Div(' Processed','', 'div-txt icono-manita-si');
    else
      ObjDivTxt4  = Div(' Not processed','', 'div-txt  icono-manita-no');
    
    
    let ObjH3       = H('6',Data[i].company);    
    let BtA         = Button('View details ->', 'btnCISA', ViewThisOrder, ['this']);
    BtA.setAttribute("id", Data[i].id);
    BtA.setAttribute("CnyName",   Data[i].company);
    BtA.setAttribute("CnyAddress",Data[i].address);
    BtA.setAttribute("CnyEmail",  Data[i].email);
    BtA.setAttribute("CnyPhone",  Data[i].phone);
    BtA.setAttribute("OrderDate", Data[i].date_create);

    ObjDiv.appendChild(ObjH3);
    ObjDiv.appendChild(ObjDivTxt1);
    ObjDiv.appendChild(ObjDivTxt2);
    ObjDiv.appendChild(ObjDivTxt3);
    ObjDiv.appendChild(ObjDivTxt4); 
    ObjDiv.appendChild(BtA);
    DivMaster.appendChild(ObjDiv);
  } //for  
  DivWaitHide();
  return 0;
}

function ViewThisOrder(Param)
{
  const elemento  = Param.target; // Obtener el elemento que disparó el evento
  const RegId     = elemento.getAttribute('id'); // Obtener el valor del atributo id

  let CnyName     = elemento.attributes.CnyName.value;
  let CnyAddress  = elemento.attributes.CnyAddress.value;
  let CnyEmail    = elemento.attributes.CnyEmail.value;
  let CnyPhone    = elemento.attributes.CnyPhone.value;
  let OrderDate   = elemento.attributes.OrderDate.value;

  $("#CnyRegId").val(RegId);
  $("#CnyName").val(CnyName);
  $("#CnyAddress").val(CnyAddress);
  $("#CnyEmail").val(CnyEmail);
  $("#CnyPhone").val(CnyPhone);
  $("#OrderDate").val(OrderDate);

  DivWaitShow();
  formData = new FormData();
  formData.append('OrderId',  RegId);

  let URL       = 'modules/mod_GetOrdersDetailsAll.php';
  var ObjAjax = $.ajax({url: URL, method: "POST", type: "post", dataType: "html", cache: false, processData: false, contentType: false, data : formData});
   
  ObjAjax.always(function() { DivWaitHide();  });

  ObjAjax.fail(function(jqXHR, textStatus, errorThrown)
  {
    console.log('jqXHR: ', jqXHR);      console.log('textStatus: ', textStatus);      console.log('errorThrown: ', errorThrown);
    ShowMessageError('Error: ' + jqXHR.responseText);
  });
  ObjAjax.done(function(Data) /** Respues OK */
  {
  //console.log('Registros: ', Data);
  var DataJson = JSON.parse(Data);
  if (DataJson.length > 0)
  {
    const DivMaster = document.getElementById("LstDetails2");
    //DivMaster.innerHTML = 'Order #' + RegId + ' ' + CnyName + ' [' + CnyAddress + ', ' + CnyEmail + ']';
    DivMaster.innerHTML = 'Order #' + RegId + ' ' + CnyName + ' [' + CnyAddress + ']';
    MakeLstOrdersDetails(DataJson); //console.log('DataJson: ', DataJson);
  }
  else
    ShowMessageError('The order is empty.');
  }); 
}


/**
 * 
 * @param {json} Data Listado con los productos de la orden
 * @returns void
 */
function MakeLstOrdersDetails(Data)
{
  DivWaitShow();
  let RegId     = $("#CnyRegId").val();
  let CnyName   = $("#CnyName").val();
  let CnyAddress= $("#CnyAddress").val();
  let CnyEmail  = $("#CnyEmail").val();
  let CnyPhone  = $("#CnyPhone").val();
  let OrderDate = $("#OrderDate").val();

  table.setData(Data);  

  $("#BtDownloadXLSX").off('click').on('click', function() 
  {
    /*
    table.download("xlsx", "OrderNr"+RegId+".xlsx", { sheetName:"Order - " + CnyName });
    */
   /**
    * https://github.com/olifolkerd/tabulator
    * Más etilos : https://github.com/simonbengtsson/jsPDF-AutoTable 
    */
   
    table.download("pdf", "OrderNr"+RegId+".pdf", 
    {
      orientation:"portrait",     // Orientacion página
      title: CnyName + ' - ' + "[Order #" + RegId + ']\n' +  CnyAddress + '\nEmail: ' +  CnyEmail + '\nPhone: ' + CnyPhone + ' Date: ' + OrderDate , // Titulo superior de la página
      autoTable:{ //advanced table styling
        //styles:       { fillColor: [255, 0, 0] },
        headStyles:     { fillColor: [255, 0, 0] },
        //theme: 'grid',
        //columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
        columnStyles: { id:       {fillColor: 55} },
        margin:       { top: 100}, // espacio entre el título y la tabla
      },            
    });
  });

  $("#BtDownloadXLSX").css("visibility", "visible");
  DivWaitHide();
  return 0;  
}
