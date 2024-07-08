
/**
 * Trae de SAP todos las muestras de productos que un BP aun no ha solicitado, y los almacena en el
 * LocalStorage en la variable Data
 *
 * @return void
 * 
 * Created at: 7/8/2024, 9:06:20 AM (America/Bogota)
 * @author     tic.desarrolloweb@ceramicaitalia.com 
 * @see       {@link https://dev.ceramicaitalia.com/} 
 * @see       {@link https://www.ceramicaitalia.com/} 
 * @copyright T.I. CISA 2024 
 */
function GetTodosProductos()
{
  DivWaitShow();
  let BP        = LS_Get('BP');
  if (BP == 0)  { ShowMessageError('Error en BP');  return 0; }
  var settings = 
  {
    "url": "https://lilix.ceramicaitalia.com:3001/producto/sample",
    "method": "POST",
    "timeout": 0,
    "headers": { "Content-Type": "application/json" },
    "data": JSON.stringify({"bp": BP}),
  };
  
  $.ajax(settings)
    .always(function () { DivWaitHide(); })
    .fail(function (jqXHR, textStatus, errorThrown) { ShowMessageError('Error AJAX: ' + jqXHR.responseText + ' ' + textStatus + ' - ' + errorThrown); })
    .done(function (Data) 
    {
      LS_Set('Data', JSON.stringify(Data));
      //console.log('Data: ', Data);
      //ShowTodosProductos(Data);
    });
}

/**
 * Trae de SAP el código consecutivo, con el cual se creará el pedido y el detalle del pedido.
 *
 * @param string CallBack Nombre de la función que será ejecutada cuando termine el proceso. A esta función se le pasará el número de consecutivo.
 * 
 * @return void
 * 
 * Created at: 7/8/2024, 9:09:56 AM (America/Bogota)
 * @author     tic.desarrolloweb@ceramicaitalia.com 
 * @see       {@link https://dev.ceramicaitalia.com/} 
 * @see       {@link https://www.ceramicaitalia.com/} 
 * @copyright T.I. CISA 2024 
 */
function GetConsecutivo(CallBack)
{
  DivWaitShow();
  let URL = "https://lilix.ceramicaitalia.com:3001/clientes/invoice/consecutive/";
  var settings = 
  {
    "url": URL,
    "method": "POST",
    "timeout": 0,
    "headers": { "Content-Type": "application/json" },
    "data": JSON.stringify({"BANDERA":"OFERTA", "TDOC":"ZSLV"}),
  };
  
  $.ajax(settings)
    .always(function()  { DivWaitHide(); })
    .fail(function (jqXHR, textStatus, errorThrown)  {  ShowMessageError('Error en AJAX:' + jqXHR.responseText + ' ' + textStatus + ' ' + errorThrown); })
    .done(function (Data) 
    {      
      let Consecutivo = Data[0].xconsecutivo;
      CallBack(Consecutivo);
      // LS_Set('Consecutivo', Consecutivo);      
    });
}

/** TODO:  */
function GetBPData(CallBack)
{
  DivWaitShow();
  let URL = "https://lilix.ceramicaitalia.com:3001/clientes/invoice/consecutive/";
  var settings = 
  {
    "url": URL,
    "method": "POST",
    "timeout": 0,
    "headers": { "Content-Type": "application/json" },
    "data": JSON.stringify({"BANDERA":"OFERTA", "TDOC":"ZSLV"}),
  };
  
  $.ajax(settings)
    .always(function()  { DivWaitHide(); })
    .fail(function (jqXHR, textStatus, errorThrown)  {  ShowMessageError('Error en AJAX:' + jqXHR.responseText + ' ' + textStatus + ' ' + errorThrown); })
    .done(function (Data) 
    {      
      let Consecutivo = Data[0].xconsecutivo;
      CallBack(Consecutivo);
      // LS_Set('Consecutivo', Consecutivo);      
    });
}

/**
 * 
 *
 * @param mixed Consecutivo
 * @param mixed CodSAP
 * @param mixed Descripcion
 * 
 * @return void
 * 
 * Created at: 7/8/2024, 9:12:59 AM (America/Bogota)
 * @author     tic.desarrolloweb@ceramicaitalia.com 
 * @see       {@link https://dev.ceramicaitalia.com/} 
 * @see       {@link https://www.ceramicaitalia.com/} 
 * @copyright T.I. CISA 2024 
 */
function SetPedidoDetalle(CallBack, Consecutivo, CodSAP, Descripcion)
{
  DivWaitShow();
  let URL = "https://lilix.ceramicaitalia.com:3001/clientes/invoice/detail/";
  var settings = 
  {
    "url": URL,
    "method":"POST",
    "timeout":0,
    "headers":{ "Content-Type": "application/json" },
    "data":JSON.stringify(
    {
      "BANDERA" :"CARRITO",
      "CONSECUTIVO" :Consecutivo,
      "CODSAP" :CodSAP,
      "DESCRIPCION" :Descripcion,
      "PRECIO" :0,
      "CANTIDAD" :1,
      "PRECIOCONDESCUENTO":0,
      "DESCUENTO" :0,
      "VALORDESCUENTO" :0,
      "IDREGISTRO" :"",
      "VENDEDOR" :"Z4",
      "CENTRO" :"3100",
      "ALMACEN" :"3101",
      "UM" :"UN",
      "PESO" :0,
      "PRECIOPUBLICO" :0,
      "FECHANEC" :"",
      "COMPONENTE" :"X",
      "MATPADRE" :"",
      "USO" :"RE7",
      "TPOS" :"ZMUE"
    }),
  };
  
  $.ajax(settings)
    .always(function()  { DivWaitHide(); })
    .fail(function (jqXHR, textStatus, errorThrown)  {  ShowMessageError('Error en AJAX:' + jqXHR.responseText + ' ' + textStatus + ' ' + errorThrown); })
    .done(function (Data) 
    {      
      console.log('Data: ', Data); 
      CallBack(Consecutivo);   
    });
}

function SetPedido(NP, BP, CN, PO, Consecutivo)
{
  DivWaitShow();
  let URL = "https://lilix.ceramicaitalia.com:3001/clientes/invoice/createdocument/";
  var settings = 
  {
    "url": URL,
    "method": "POST",
    "timeout": 0,
    "headers": { "Content-Type": "application/json" },
    "data": JSON.stringify(
      {
        "BANDERA":"FINALIZAR",
        "IDREG":"",
        "CONSECUTIV":Consecutivo,
        "NOMBRE":"EDWIN ORTEGA",
        "TELEFONO":"3165217418",
        "CORREO":"EBOR94@HOTMAIL.COM",
        "IDENTIFICACION":"125591",
        "CODVEN":"",
        "TDOC":"ZECO",
        "CANAL":CN,
        "NOTA":"PEDIDO COMBOS",
        "ZONAV":"401",
        "OFIV":"110",
        "ORG":"1000",
        "TIPOENVIO":"10",
        "FLETE": 1000,
        "CLASEPEDIDO":"Z005",
        "REFERENCIA":"1379580500335-01",
        "CONDPAGO": "",
        "MOTIVOP": "0000"
        }),
  };
  
  $.ajax(settings)
    .always(function()  { DivWaitHide(); })
    .fail(function (jqXHR, textStatus, errorThrown)  {  ShowMessageError('Error en AJAX:' + jqXHR.responseText + ' ' + textStatus + ' ' + errorThrown); })
    .done(function (Data) 
    {      
      console.log('Data: ', Data);     
    });
}


function OrderSendData(SapCod)
{
  DivWaitShow();
  let URL = "https://lilix.ceramicaitalia.com:3001/producto/sample";  
  let BP  = LS_Get('BP');
  if (BP == 0)  { ShowMessageError('Error en BP');  return 0; }
  let LstSAPCod = JSON.stringify(SapCod);

  var settings = 
  {
    "url": URL,
    "method": "POST",
    "timeout": 0,
    "headers": { "Content-Type": "application/json" },
    "data": JSON.stringify({"bp": BP}),
  };
  
  $.ajax(settings)
    .always(function()  { DivWaitHide(); })
    .fail(function (jqXHR, textStatus, errorThrown)  {  ShowMessageError('Error en la petición AJAX:' + jqXHR.responseText + ' ' + textStatus + ' ' + errorThrown); })
    .done(function (Data) 
    {
      LS_Set('Data', JSON.stringify(Data));
      console.log('Data: ', Data);
      if(true)
      {
        URL = 'https://lilix.ceramicaitalia.com:2508/API_Ext/SendWhatsapp.php';
        //URL     = 'modules/mod_SendWhatsApp.php';
        let Msg = '🏡✨ ¡Buen día. Hoy se ha solicitado unas muestras 🟧⬜, por favor, proceda a gestionar el pedido 📥. Feliz día.'
        formData.append('Msg',    Msg);
    
        var ObjPost = $.post( URL, {Msg: Msg } );
        ObjPost.done(function( data ) 
        {
          console.log(data)
        });
  
        Data.Msg = '<h2>Ahora nuestro equipo estará enviando su orden pronto.</h2>';
        ShowMessageRedirFull(Data.Msg, 'Thanks!','https://www.ceramicaitalia.com');
        return 0;
      }
      //ShowTodosProductos(Data);
    });
}


/*
https://lilix.ceramicaitalia.com:3001/clientes/invoice/getdetail/
{
"BANDERA":"TRAEDTL3",
"CONSECUTIVO":"00000491"
}
*/

/*
https://lilix.ceramicaitalia.com:3001/clientes/invoice/deldetail/
{
"BANDERA"       :"ELIMINAR",
"IDREG"         :"60002739",
"CONSECUTIV"    :"00000491",
"NOMBRE"        :"",
"TELEFONO"      :"",
"CORREO"        :"",
"IDENTIFICACION":"",
"CODVEN"        :"",
"TDOC"          :"",
"CANAL"         :"X",
"NOTA"          :"",
"ZONAV"         :"",
"OFIV"          :"",
"ORG"           :""
}
*/