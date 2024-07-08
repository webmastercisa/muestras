$(document).ready(function() 
{
  $('#email').blur(function() 
  {
    console.log('Validando');
    var email = $(this).val();
    if (validarEmail(email)) 
    {
      console.log("El correo electrónico es válido.");
      // Cambiar el color del borde a verde o mostrar un mensaje positivo
      $(this).css('border-color', 'green');
      $(this).next('.error-message').text('');  // Limpiar mensaje de error si es válido
    }
    else 
    {
      console.log("Email account is invalid.");
      // Cambiar el color del borde a rojo o mostrar un mensaje de error
      $(this).css('border-color', 'red');
      $(this).next('.error-message').text('email is invalid.');
    }
  });

});

$(function() 
{
  InitApp();
  //GetProductosPS();
  //ModalInputInfoShow();
});

function InitApp()
{
  LS_Set('BP', 11);
  LS_Set('FltTrafico', '');  //const cat = localStorage.getItem("myCat");  localStorage.removeItem("myCat");
  LS_Set('FltClasificacion', '');
  LS_Set('Data', "");
  LS_Set('DataFlt', "");
  LS_Set('myCat', "Tom");
  GetTodosProductos();
}

function OnClicFltTraficoChange(Param)
{ 
  ResetLstBtTrafico();
  Param.classList.remove('bt-categoria');
  Param.classList.add('bt-categoria-sel');

  let DivMaster = document.getElementById('gallery');
  DivMaster.innerHTML = '';

  let ValFitro  = Param.attributes.FltTrafico.value;  
  SetDescriptionClasificacion(ValFitro);
  let Data      = LS_Get('Data');
  /** TODO: Crear los botones de clasificación segun los productos filtrados */
  let DataFlt   = LstproductosTrafico(JSON.parse(Data), ValFitro);
  LS_Set('DataFlt', JSON.stringify(DataFlt));
}

function ResetLstBtTrafico()
{
  const LstBt = document.querySelectorAll('.bt-categoria-sel');
  LstBt.forEach(Bt => 
  {
    Bt.classList.remove('bt-categoria-sel');
    Bt.classList.add('bt-categoria');
  });
}

function OnClicFltClasificacionChange(Param)
{   
  let ValBt  = Param.attributes.fltno.value;
  ResetLstBtClasificacion();
  const LstBt = document.querySelectorAll('.bt-clasificacion'+ValBt);
  let BtClasificacion = document.getElementById('bt-clasificacion'+ValBt);
  BtClasificacion.classList.remove('bt-clasificacion');
  BtClasificacion.classList.add('bt-clasificacion-sel');
  
  let ValFitro  = Param.attributes.FltClasificacion.value;
  console.log('ValFitro: ',ValFitro);
  let Data      = LS_Get('DataFlt');
  if(Data == '')
  {
    ShowMessageError('Seleccione primero un tipo de trafico, haciendo click en alguno de los botones de la parte izquierda.');
    return 0;
  }
  let DataFlt   = LstproductosClasificacionANSI(JSON.parse(Data), ValFitro);
  //LS_Set('DataFlt', JSON.stringify(DataFlt));
  ShowProductosFiltrados(DataFlt);
}

function ResetLstBtClasificacion()
{
  const LstBt = document.querySelectorAll('.bt-clasificacion-sel');
  LstBt.forEach(Bt => 
  {
    Bt.classList.remove('bt-clasificacion-sel');
    Bt.classList.add('bt-clasificacion');
  });
}


function SetDescriptionClasificacion(ClasificacionValue='')
{
  console.log('Trafico a modificar: ',ClasificacionValue);
  let Clasificacion       = ["RESIDENCIAL MODERADO", "RESIDENCIAL GENERAL", "COMERCIAL MODERADO", "COMERCIAL GENERAL"];
  let DescClasificacion1  = ["Dormitorios, estudios sin acceso directo al exterior.", 
                              "Todas las áreas de la vivienda menos la cocina, los baños, las escaleras y los balcones.", 
                              "Todas las áreas de la vivienda menos la cocina, los baños, las escaleras y los balcones. Lobbies y puntos fijos, locales comerciales sin acceso directo al exterior, de bajo tráfico y oficinas.",
                              "Todas las áreas de la vivienda menos la cocina, los baños, las escaleras y los balcones. Lobbies y puntos fijos, locales comerciales de alto tráfico y oficinas, Centros hospitalarios de baja complejidad, instituciones educativas, supermercados, Salones sociales de interior, no aplica para aeropuertos."
                            ];
  let DescClasificacion2  = ["Dormitorios, estudios y baños (incluyendo la ducha), balcones y saunas, sin acceso directo al exterior.", 
                              "Todas las áreas de la casa incluyendo las duchas, las escaleras y los balcones.",                          
                              "Todas las áreas de la vivienda incluyendo la ducha, las escaleras y los balcones. Lobbies y puntos fijos, locales comerciales de bajo tráfico y oficinas. Salones sociales de interior y de exterior cubiertos. Restaurantes con cocina cerrada y abierta, peluquerías.",
                              "Todas las áreas de la vivienda incluyendo la ducha, las escaleras y los balcones. Lobbies y puntos fijos, locales comerciales de alto tráfico y oficinas, Centros hospitalarios de baja complejidad, instituciones educativas, supermercados, Salones sociales de interior y de exterior cubiertos, Restaurantes con cocina cerrada y abierta, peluquerías, no aplica para aeropuertos."
                            ];
  let DescClasificacion3  = ["Exterior de piscinas resindeciales, baños (incluyendo duchas), saunas, balcones.",
                              "Patios residenciales y terrazas residenciales. Exterior de piscinas de zonas comunes, baños (incluyendo duchas), saunas, balcones",                              
                              "Patios residenciales y terrazas residenciales. Exterior de piscinas de zonas comunes, baños (incluyendo duchas), saunas, balcones.",
                              "Patios y terrazas en general. Exterior de piscinas comerciales, baños (incluyendo duchas), saunas, balcones. Salones sociales de exterior, incluyendo terrazas. Andenes de tránsito públicos."
                            ];
  let DescClasificacion4  = ["Exterior de piscinas resindeciales, baños (incluyendo duchas), saunas, balcones.",
                              "Patios residenciales y terrazas residenciales. Exterior de piscinas de zonas comunes, baños (incluyendo duchas), saunas, balcones",
                              "Patios y terrazas residenciales. Exterior de piscinas comerciales, baños (incluyendo duchas), saunas, balcones. Salones sociales de exterior, incluyendo terrazas. Cocinas de exterior",
                              "Patios y terrazas en general. Exterior de piscinas comerciales, baños (incluyendo duchas), saunas, balcones. Salones sociales de exterior, incluyendo terrazas. Andenes de tránsito públicos Cocinas de exterior"
                            ];
  for (let i = 0; i < Clasificacion.length; i++) 
  {
    if(Clasificacion[i] == ClasificacionValue)
    {
      console.log('Trafico encontrado: ', i);
      let Class1 = document.getElementById('ClasificacionDesc1');
      let Class2 = document.getElementById('ClasificacionDesc2');
      let Class3 = document.getElementById('ClasificacionDesc3');
      let Class4 = document.getElementById('ClasificacionDesc4');

      Class1.innerHTML = DescClasificacion1[i];
      Class2.innerHTML = DescClasificacion2[i];
      Class3.innerHTML = DescClasificacion3[i];
      Class4.innerHTML = DescClasificacion4[i];
      return 0;
    } //if
  } //for

}

function ShowProductosFiltrados(Data)
{ 
  DivWaitShow();
  //Data = LS_Get('DataFlt');
  //Data = JSON.parse(Data);
  let Familias = getFamilia(Data);
  let Formatos = getFormato(Data);
  let CantFamilias = Familias.length;
  let CantFormatos = Formatos.length;
  console.log('Familias: ', Familias);
  console.log('Formatos: ', Formatos);

  if(CantFamilias == 0)
  {
    DivWaitHide();
    ShowMessage('No existen productos para esta clasificación...');
    return 0;
  }  

  let DivMaster = document.getElementById('gallery');
  DivMaster.innerHTML = '';
  let Cod = '';
  /*
    <div class="recFamilia">
      <div class="btnCISAInv" onclick="OrderTerminate();">Finalizar orden</div>                
    </div>
  */

  for (let i = 0; i < CantFamilias; i++)
  {
    let ObjDivF = Div('','','div-columna1');//H(2,Familias[i],'recFamilia');
    let ObjHx   = H('4',Familias[i],'recFamilia');
    let ObjHR   = HR();
    ObjDivF.appendChild(ObjHR);    
    ObjDivF.appendChild(ObjHx);
    DivMaster.appendChild(ObjDivF);

    for (let j = 0; j < CantFormatos; j++)
    {
      let LstParaMostrar = productFamiliaFormato(Data, Familias[i], Formatos[j]);
      if (LstParaMostrar.length > 0)
      {
        let ObjDivF  = Div(Formatos[j],'','div-formato');//H(2,Familias[i],'recFamilia');
        DivMaster.appendChild(ObjDivF);
    
        LstParaMostrar.forEach((item) => 
        {
          //console.log('material',item.material);
          //console.log('nombre',item.nombre);
          Cod = item.material.substring(12);
          let ObjDiv  = Div('',Cod,'item');
          let ObjImg  = Img('https://web.ceramicaitalia.com/temporada/' + Cod + '_2.jpg','CISA USA','usa.ceramicaitalia.com','ProdImg');
          ObjDiv.appendChild(ObjImg);
      
          let ObjH3   = H('3',item.nombre);
          ObjDiv.appendChild(ObjH3);
      
          let BtA  = Button('Agregar', 'btnCISA', AgregarProducto, ['this']);
          BtA.setAttribute("prod_sap", Cod);
          BtA.setAttribute("prod_name", item.nombre);
          ObjDiv.appendChild(BtA);
      
      
          let ObjA    = A('https://fichatecnica.ceramicaitalia.com/ver.php?id='+ Cod + '&lang=en', 'Ficha técnica', 'btnSheet');
          ObjDiv.appendChild(ObjA);
      
          DivMaster.appendChild(ObjDiv);
        });
      }  // If
    }  // for
  } // for
  DivWaitHide();
}

/* =========================================================================================== */
/* =========================================================================================== */

function AgregarProducto(Param)
{
  let ProdSap   = Param.target.attributes.prod_sap.value
  let ProdName  = Param.target.attributes.prod_name.value;
  $('#'+ProdSap).hide();  // Ocultar la ficha que hizo clic

  let Result = ProductoYaExiste(ProdSap);
  if(Result == true)
  {
    return false;
  }

  let DivMaster = document.getElementById('SamplesSelected');

  let ObjDiv  = Div('','Bt'+ProdSap,'div-frame-item-sel col-12');
  ObjDiv.setAttribute("prod_sap", ProdSap);
  ObjDiv.setAttribute("prod_sap_nom", ProdName);

  let ObjDiv2  = Div(ProdName, '', '');
  ObjDiv.appendChild(ObjDiv2);

  ObjDiv2  = Button('Quitar','btnRem', EliminarProducto, ['this']);
  ObjDiv2.setAttribute("prod_sap", ProdSap);
  ObjDiv2.setAttribute("prod_sap_nom", ProdName);

  ObjDiv.appendChild(ObjDiv2);
  DivMaster.appendChild(ObjDiv);
}

function EliminarProducto(Param)
{
  let ProdSap   = Param.target.attributes.prod_sap.value
  /** Remover la muestra del área de productos seleccionado */
  const parent = document.getElementById("SamplesSelected");
  const child = document.getElementById("Bt" + ProdSap);
  const throwawayNode = parent.removeChild(child);
  
  /**  Volver a mostrar el producto en el área de muestras */  
  $('#'+ProdSap).show();
}

function OrderTerminate()
{
  var SapCod = [];
  DivWaitShow();
  $('#SamplesSelected > div').each(function() 
  {
    SapCod.push(this.attributes.prod_sap.value);
  });

  if(SapCod.length == 0) 
  {
    DivWaitHide();
    ShowMessageError('Debe seleccionar, al menos un producto.');
    return;
  }//if    
  //OrderSendData(SapCod);
  GetConsecutivo(GrabarDetalles);
}

function GrabarDetalles(Consecutivo)
{
  DivWaitShow();
  $('#SamplesSelected > div').each(function() 
  {
    let CodSAP = this.attributes.prod_sap.value;
    let Descripcion = this.attributes.prod_sap_nom.value;
    SetPedidoDetalle(Consecutivo, CodSAP, Descripcion)
  });
  DivWaitHide();
}

/**
 * Graba los datos iniciales del cliente.
 * @returns void
 */
function OrderSaveDataInit()
{
  let CompanyName     = $('#CompanyName').val();
  let DeliveryAddress = $('#DeliveryAddress').val();
  let Email           = $('#Email').val();
  let PhoneNumber       = $('#PhoneNumber').val();

  let MsgError = '';
  if(CompanyName == '')     MsgError = MsgError + 'Missing Company name';
  if(DeliveryAddress == '') MsgError = MsgError + ' - Missing Delivery Address';
  if(Email == '')           MsgError = MsgError + ' - Missing Email';
  if(PhoneNumber == '')     MsgError = MsgError + ' - Missing phone number';
  if(MsgError != '')
  {
    ShowMessageError(MsgError);
    return 0;
  }

  /** ====================  Almacenar var en storage ===================== */
  localStorage.setItem("CompanyName", CompanyName);
  localStorage.setItem("DeliveryAddress", DeliveryAddress);
  localStorage.setItem("Email", Email);
  localStorage.setItem("PhoneNumber", PhoneNumber);
  
  ModalInputInfoHide();

  return 0;
}


function ProductoYaExiste(ProdSap)
{
  var Result = false;
  $('#SamplesSelected > div').each(function() 
  {
    let ProdSapOld = this.attributes.prod_sap.value     
    if(ProdSapOld == ProdSap)
    {
      Result = true;
      return;
    }
  });
  return Result;
}