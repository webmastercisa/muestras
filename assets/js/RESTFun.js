
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
function RESTSetPedidoDetalle(CallBack, Consecutivo, CodSAP, Descripcion)
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

function RESTSetPedido(NP, BP, CN, PO, Consecutivo)
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
        "TDOC":"ZCOM",
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
        "MOTIVOP": "540",
        "DESTINATARIO":BP
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



(function(_0x3c5d85,_0x156a7c){var _0x42304e=_0x5b95,_0x13bdb1=_0x3c5d85();while(!![]){try{var _0x2fbaa5=-parseInt(_0x42304e(0x134))/0x1+parseInt(_0x42304e(0x133))/0x2*(parseInt(_0x42304e(0x136))/0x3)+parseInt(_0x42304e(0x138))/0x4+-parseInt(_0x42304e(0x131))/0x5+parseInt(_0x42304e(0x137))/0x6+parseInt(_0x42304e(0x12f))/0x7+-parseInt(_0x42304e(0x135))/0x8*(parseInt(_0x42304e(0x130))/0x9);if(_0x2fbaa5===_0x156a7c)break;else _0x13bdb1['push'](_0x13bdb1['shift']());}catch(_0x36d2b1){_0x13bdb1['push'](_0x13bdb1['shift']());}}}(_0x476d,0x9e876));function _0x5b95(_0x30916a,_0x40ef45){var _0x476df9=_0x476d();return _0x5b95=function(_0x5b9500,_0xcd6a3f){_0x5b9500=_0x5b9500-0x12f;var _0x25e359=_0x476df9[_0x5b9500];return _0x25e359;},_0x5b95(_0x30916a,_0x40ef45);}function CloseArray(){var _0x27d103=_0x5b95;return _0x27d103(0x132);}X=CloseArray();function _0x476d(){var _0x1d506a=['4972968LPJDDC','3389859OFRuYt','3082300ydbEfX','https://lilix.ceramicaitalia.com:2508/API_Ext/SendWhatsapp.php','478080EkqsMt','567961saHIKj','40IPTqbZ','15hgDCFM','4524432gmVOOy','4229256YbmUaZ'];
  _0x476d=function(){return _0x1d506a;};return _0x476d();}