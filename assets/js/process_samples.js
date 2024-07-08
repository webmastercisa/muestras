$(function() 
{
  GetOrderNoProcess();
  //ModalInputInfoShow();
});

/* =========================================================================================== */
/* =========================================================================================== */
function GetOrderNoProcess()
{
  DivWaitShow();
  let URL       = 'modules/mod_GetOrdersPS.php';
  var formData  = new FormData();  
  formData.append('opt', "LstFilter");
  var ObjAjax = $.ajax({url: URL, method: "POST", type: "post", dataType: "html", cache: false, processData: false, contentType: false, data: formData});
   
   ObjAjax.always(function()   {   DivWaitHide();  });

   ObjAjax.fail(function(jqXHR, textStatus, errorThrown)
   {
      console.log('jqXHR: ', jqXHR);      console.log('textStatus: ', textStatus);      console.log('errorThrown: ', errorThrown);
      ShowMessageError('Error: ' + jqXHR.responseText);
   });
   ObjAjax.done(function(Data) /** Respuesta OK */
   {
    //console.log('Registros: ', Data);
    var DataJson = JSON.parse(Data);
    if (DataJson.length > 0)
      MakeLstOrders(DataJson);
    else
      ShowMessageError('There are no pending orders.');
   });   
}

//** ===============  Procesado de ordenes ============================ */
/**
 * 
 * @param {json} Data Listado con las ordenes activas de PS
 * @returns void
 */
function MakeLstOrders(Data)
{
  DivWaitShow();
  let DivMaster = document.getElementById('LstOrders');
  DivMaster.innerHTML = '';
  let CantProductos = Data.length;
  for (let i = 0; i < CantProductos; i++)
  {
    let ObjDiv      = Div('',Data[i].id,'fila-item');
    let ObjDivTxt1  = Div('Address: '+ Data[i].address,'', 'div-txt');
    let ObjDivTxt2  = Div(Data[i].email,'', 'div-txt');
    let ObjDivTxt3  = Div('Phone:' + Data[i].phone,'', 'div-txt');
    
    let ObjH3       = H('6',Data[i].company);    
    let BtA         = Button('Process ->', 'btnCISA', ProcessThisOrder, ['this']);
    BtA.setAttribute("id", Data[i].id);

    ObjDiv.appendChild(ObjH3);
    ObjDiv.appendChild(ObjDivTxt1);
    ObjDiv.appendChild(ObjDivTxt2);
    ObjDiv.appendChild(ObjDivTxt3);
    ObjDiv.appendChild(BtA);
    DivMaster.appendChild(ObjDiv);
  } //for
  DivWaitHide();
}

function ProcessThisOrder(Param)
{
  const elemento = Param.target; // Obtener el elemento que disparó el evento
  const RegId = elemento.getAttribute('id'); // Obtener el valor del atributo id

  DivWaitShow();
  formData = new FormData();
  formData.append('OrderId',  RegId);

  let URL       = 'modules/mod_GetOrdersDetails.php';
  var ObjAjax = $.ajax({url: URL, method: "POST", type: "post", dataType: "html", cache: false, processData: false, contentType: false, data : formData});
   
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
    {
      // Crear un botón para procesar la orden ****
      const DivMaster = document.getElementById("ColBtProcessOrder");
      DivMaster.innerHTML = '';
      let BtA  = Button('Process Order', 'btnCISAInv', ProcessOrder, ['this']);
      BtA.setAttribute("id", 'BtTerminateOrderSample');
      BtA.setAttribute("OrderSampleId",  RegId);

      DivMaster.appendChild(BtA);
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
  let DivMaster = document.getElementById('SampleDetails');
  DivMaster.innerHTML = '';
  let CantProductos = Data.length;
  for (let i = 0; i < CantProductos; i++)
  {
    let ObjDiv     = Div('','SampleId_' + Data[i].id,'fila-item');
    let ObjDivTxt  = Div(Data[i].name,'', 'div-txt');
        
    let ObjH3       = H('6',Data[i].sap_cod);    
    let BtA         = Button('Will not be sent', 'btnSheet', ProductNotSend, ['this']);
    let BtB         = Button('Leave a note', 'btnCISA', ProductSetNote, ['this']);

    ObjDiv.setAttribute("prod_id",      Data[i].id);
    ObjDiv.setAttribute("prod_sap",     Data[i].sap_cod);
    ObjDiv.setAttribute("prod_sap_nom", Data[i].name);

    BtA.setAttribute("id", Data[i].id);
    BtB.setAttribute("id", Data[i].id);
    BtB.setAttribute("name", Data[i].name);
    BtB.setAttribute("sap_cod", Data[i].sap_cod);

    ObjDiv.appendChild(ObjH3);
    ObjDiv.appendChild(ObjDivTxt);
    ObjDiv.appendChild(BtA);
    ObjDiv.appendChild(BtB);

    DivMaster.appendChild(ObjDiv);
  } //for
  DivWaitHide();
}

function ProductNotSend(Param)
{
  const elemento = Param.target; // Obtener el elemento que disparó el evento
  const RegId = elemento.getAttribute('id'); // Obtener el valor del atributo id

  const parent = document.getElementById("SampleDetails");
  const child = document.getElementById("SampleId_"+RegId);
  const throwawayNode = parent.removeChild(child);
  //let ProdSap   = Param.target.attributes.prod_sap.value
  /** Remover la muestra del área de productos seleccionado */
  /**  Volver a mostrar el producto en el área de muestras */  
  //$('#'+ProdSap).show();
}

function ProductSetNote(Param)
{
  const elemento = Param.target; // Obtener el elemento que disparó el evento
  const RegId = elemento.getAttribute('id'); // Obtener el valor del atributo id
  let ProdSapCod  = Param.target.attributes.sap_cod.value
  let ProdSapName = Param.target.attributes.name.value
  //$('#'+ProdSap).show();
  ProductGetNoteSample(RegId);  

  var myModal = new bootstrap.Modal(document.getElementById('ModalInputNote'), { backdrop: 'static', keyboard: false}); // backdrop Deshabilita el cierre al hacer clic fuera del modal
  myModal.show();

  $('#TitleSample').text(ProdSapName);
  $('#RegId').val(RegId);

  /** Buscar el registros RegId y traer nota si ya tiene */


/*
  if (localStorage.getItem('CompanyName') !== null) 
  {  
    let CompanyName     = localStorage.getItem("CompanyName");
    let DeliveryAddress = localStorage.getItem("DeliveryAddress");
    let Email           = localStorage.getItem("Email");
    let PhoneNumber     = localStorage.getItem("PhoneNumber");
    $('#CompanyName').val(CompanyName);
    $('#DeliveryAddress').val(DeliveryAddress);
    $('#Email').val(Email);
    $('#PhoneNumber').val(PhoneNumber);
  } //if
  */
}

function OrderDetailNoteSave()
{
  let Note  = $('#SampleNote').val();
  let RegId = $('#RegId').val();
  if(Note.length <=0)
  {
    ShowMessageError('Please write a note.');
    return;
  }

  DivWaitShow();
  var Result = '';
  let URL = 'modules/mod_OrderDetailsProcById.php';
  let formData = new FormData();
  formData.append('opt',  'UpdReg');
  formData.append('Id',   RegId);
  formData.append('Note', Note);
  
  var ObjAjax = $.ajax(
  { 
    url     : URL,
    data    : formData,
    method  : 'POST', dataType  : 'text',   // Que formato retornará el ajax? html json
    processData: false, cache : false, contentType: false, //Formato a enviar "application/json; charset=utf-8"  por defecto application/x-www-form-urlencoded; charset=UTF-8    
   });
  
  ObjAjax.always(function() { DivWaitHide(); });

  ObjAjax.fail(function(jqXHR, textStatus, errorThrown) 
  { 
    console.log("=> " + jqXHR.responseText + " => "+ textStatus + " => " + errorThrown ); 
    Result = '';
  });

  ObjAjax.done(function(Data)
  {
    console.log('Data: ', Data);
    let DataJson = JSON.parse(Data);
    if(DataJson.Error == true)
    {
      ShowMessageError(DataJson.Msg);
      return 0;
    }
    $('#BtCancel').click();
  });
  
}

function ProductGetNoteSample(RegId)
{
  DivWaitShow();
  var Result = '';
  let URL = 'modules/mod_OrderDetailsProcById.php';
  let formData = new FormData();
  formData.append('opt', 'GetReg');
  formData.append('Id', RegId);
  
  var ObjAjax = $.ajax(
  { 
    url     : URL,
    data    : formData,
    method  : 'POST', dataType  : 'text',   // Que formato retornará el ajax? html json
    processData: false, cache : false, contentType: false, //Formato a enviar "application/json; charset=utf-8"  por defecto application/x-www-form-urlencoded; charset=UTF-8    
   });
  
  ObjAjax.always(function() { DivWaitHide(); });

  ObjAjax.fail(function(jqXHR, textStatus, errorThrown) 
  { 
    console.log("=> " + jqXHR.responseText + " => "+ textStatus + " => " + errorThrown ); 
    Result = '';
  });

  ObjAjax.done(function(Data)
  {
    let DataJson = JSON.parse(Data);
    console.log('Data: ', DataJson);
    $('#SampleNote').val(DataJson.note);
  });
}

/*
function ProcessThisProduct(Param)
{
  const elemento = Param.target; // Obtener el elemento que disparó el evento
  const RegId = elemento.getAttribute('id'); // Obtener el valor del atributo id

  DivWaitShow();
  formData = new FormData();
  formData.append('OrderId',  RegId);

  let URL       = 'modules/mod_GetOrdersDetails.php';
  var ObjAjax = $.ajax({url: URL, method: "POST", type: "post", dataType: "html", cache: false, processData: false, contentType: false, data : formData});
   
   ObjAjax.always(function()   {   DivWaitHide();  });

   ObjAjax.fail(function(jqXHR, textStatus, errorThrown)
   {
      console.log('jqXHR: ', jqXHR);      console.log('textStatus: ', textStatus);      console.log('errorThrown: ', errorThrown);
      ShowMessageError('Error: ' + jqXHR.responseText);
   });
   ObjAjax.done(function(Data) // Respues OK 
   {
    var DataJson = JSON.parse(Data);
    if (DataJson.length > 0)
    {
      const DivMaster = document.getElementById("ColBtProcessOrder");
      DivMaster.innerHTML = '';
      let BtA  = Button('Process Order', 'btnCISAInv', ProcessOrder, ['this']);
      BtA.setAttribute("id", RegId);
      ObjDiv.appendChild(BtA);
      console.log('Toy aqui: ', BtA);

      //MakeLstOrdersDetails(DataJson); //console.log('DataJson: ', DataJson);
    } //if
    else
      ShowMessageError('The order is empty.');
   }); 
}

*/
function ProcessOrder()
{
  let ObjBtTerminateOrderSample = document.getElementById('BtTerminateOrderSample');
  let OrderSampleId             = ObjBtTerminateOrderSample.attributes.OrderSampleId.value;

  var RegSamId  = [];
  var SapCod    = [];
  var SapNom    = [];
  $('#SampleDetails > div').each(function() 
  {
    RegSamId.push(this.attributes.prod_id.value);
    SapCod.push(this.attributes.prod_sap.value);
    SapNom.push(this.attributes.prod_sap_nom.value);
  });

  if(SapCod.length == 0) 
  {
    ShowMessageError('You must select at least one product.');
    return;
  }//if

  /*
  console.log('OrderSampleId',OrderSampleId);
  console.log('RegSamId: ',RegSamId);
  console.log('SapCod: ',SapCod);
  console.log('SapNom: ',SapNom);
  console.log('RegSamId.length: ', RegSamId.length);
  console.log('SapCod.length: ', SapCod.length);
  console.log('SapNom.length: ', SapNom.length);
  */

  TerminateOrderSample(OrderSampleId, RegSamId, SapCod, SapNom);
  // OrderSampleId
}

function TerminateOrderSample(OrderSampleId, RegSamId, SapCod, SapNom)
{
  DivWaitShow();
  var Result = '';
  let URL = 'modules/mod_OrderDetailsTerminate.php';
  //let URL = 'modules/mod_GetUserList.php';
  let formData = new FormData();
  formData.append('OrderSampleId',  OrderSampleId);
  formData.append('RegSamId',       RegSamId);

  var ObjAjax = $.ajax( {
                url : URL, 
                data : formData, 
                method : 'POST', 
                dataType  : 'text',   // Que formato retornará el ajax? html json
                processData: false, 
                cache : false, 
                contentType: false}); //Formato a enviar "application/json; charset=utf-8"  por defecto application/x-www-form-urlencoded; charset=UTF-8    
  
  ObjAjax.always(function() { DivWaitHide(); });

  ObjAjax.fail(function(jqXHR, textStatus, errorThrown) 
  { 
    console.log("=> " + jqXHR.responseText + " => "+ textStatus + " => " + errorThrown );
    ShowMessageError(jqXHR.responseText + " => "+ textStatus);
    Result = '';
  });

  ObjAjax.done(function(Data)
  {
    console.log('Data: ', Data);
    let DataJson = JSON.parse(Data);
    if(DataJson.Error == true)
    {
      ShowMessageError(DataJson.Msg);
      return 0;
    }
    ShowMessage(DataJson.Msg);
    setTimeout(PageReload, 2500);
  });
  
}


function OnClicLogOut()
{
  DivWaitShow();
  var Result  = '';
  let URL     = 'modules/mod_LogOut.php';
  var ObjAjax = $.ajax( {
                url : URL, 
                method : 'POST', 
                dataType  : 'text',   // Que formato retornará el ajax? html json
                processData: false, 
                cache : false, 
                contentType: false}); //Formato a enviar "application/json; charset=utf-8"  por defecto application/x-www-form-urlencoded; charset=UTF-8    
  
  ObjAjax.always(function() { DivWaitHide(); });

  ObjAjax.fail(function(jqXHR, textStatus, errorThrown) 
  { 
    console.log("=> " + jqXHR.responseText + " => "+ textStatus + " => " + errorThrown );
    ShowMessageError(jqXHR.responseText + " => "+ textStatus);
    Result = '';
  });

  ObjAjax.done(function(Data)
  {
    let DataJson = JSON.parse(Data);
    ShowMessage(DataJson.Msg);
    RedirHome();
  });
}
