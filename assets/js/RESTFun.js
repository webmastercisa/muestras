
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
function RESTGetTodosProductos()
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
    .always(function () 
    { 
      DivWaitHide();      
    })
    .fail(function (jqXHR, textStatus, errorThrown) { ShowMessageError('Error AJAX: ' + jqXHR.responseText + ' ' + textStatus + ' - ' + errorThrown); })
    .done(function (Data) 
    { 
      let DataTokens = JSON.stringify(Data)

      if (Array.isArray(Data) == false)
      {
        console.log('Error Ajax: ' + Data.message);
        ShowMessageError('Error Ajax: ' + Data.message);
        //return 0;
      }
      //try { console.log('DataTokens Error: ', DataTokens.name); }
      //catch(error) { console.error(error); }

      //LS_Set('Data', JSON.stringify(DataTokens));
      LS_Set('Data', DataTokens);
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
function RESTGetConsecutivo(CallBack)
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
function RESTGetBPData(CallBack)
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
function RESTSetPedidoDetalle(CallBack, Consecutivo, CodSAP, Descripcion, CE, AL, Estado)
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
      "CENTRO" :CE,
      "ALMACEN" :AL,
      "UM" :"UN",
      "PESO" :0,
      "PRECIOPUBLICO" :0,
      "FECHANEC" :"",
      "COMPONENTE" :"",
      "MATPADRE" :"",
      "USO" :"",
      "TPOS" :"ZMUE"
    }),
  };
  
  $.ajax(settings)
    .always(function()  { DivWaitHide(); })
    .fail(function (jqXHR, textStatus, errorThrown)  {  ShowMessageError('Error en AJAX:' + jqXHR.responseText + ' ' + textStatus + ' ' + errorThrown); })
    .done(function (Data) 
    {      
      console.log('Data: ', Data);
      // Si es el último detalle en ingresar, llamar a cerrrar el pedido
      if (Estado == true)
        CallBack(Consecutivo);   
    });
}

function RESTSetPedido(NP, BP, CN, Consecutivo)
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
        "IDENTIFICACION":"0000104385",
        "CODVEN":"",
        "TDOC":"ZCON",
        "CANAL":CN,
        "NOTA":"Muestras - Portal Muestras ",
        "ZONAV":"",
        "OFIV":"100",
        "ORG":"1000",
        "TIPOENVIO":"10",
        "FLETE": 0,
        "CLASEPEDIDO":"",
        "REFERENCIA":"Muestras aliados",
        "CONDPAGO": "",
        "MOTIVOP": "540",
        "DESTINATARIO":BP
        }),
  };
  
  $.ajax(settings)
    .always(function()  { DivWaitHide(); })
    .fail(function (jqXHR, textStatus, errorThrown)  {  ShowMessageError('Error en AJAX:' + jqXHR.responseText + ' ' + textStatus + ' ' + errorThrown); })
    .done(function (Data) 
    {      
      ShowMessage('! Pedido creado correctamente !')
      console.log('Data: ', Data);     
    });
}

function GetCentro(Poblacion='', callback)
{
  if(Poblacion == '')
  {
    return '1100';
  }//if
  DivWaitShow();
  var settings = 
  {
    "url": "https://lilix.ceramicaitalia.com:3001/clientes/invoice/infociudad/",
    "method": "POST",
    "timeout": 0,
    "headers": { "Content-Type": "application/json" },
    "data": JSON.stringify({"CIUDAD": Poblacion}),
  };
  
  $.ajax(settings)
    .always(function () { DivWaitHide(); })
    .fail(function (jqXHR, textStatus, errorThrown) 
    { 
      callback('[]');
      ShowMessageError('Error AJAX: ' + jqXHR.responseText + ' ' + textStatus + ' - ' + errorThrown); 
    })
    .done(function (Data) 
    { 
      callback(Data);
    });
}

function RESTSndMsgWhat(Msg='')
{
  URL = 'https://lilix.ceramicaitalia.com:2508/API_Ext/SendWhatsapp.php';
  //URL     = 'modules/mod_SendWhatsApp.php';
  //let Msg = '🏡✨ ¡Buen día. Hoy se ha solicitado unas muestras 🟧⬜, por favor, proceda a gestionar el pedido 📥. Feliz día.'
  formData.append('Msg',    Msg);

  var ObjPost = $.post( URL, {Msg: Msg } );
  ObjPost.done(function( data ) 
  {
    console.log(data)
  });

  Data.Msg = '<h2>Ahora nuestro equipo estará enviando su orden pronto.</h2>';
  ShowMessageRedirFull(Data.Msg, 'Gracias!','https://www.ceramicaitalia.com');
  return 0;
}

