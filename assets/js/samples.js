$(function() 
{
  InitApp();

  window.onresize = ShowTamVentana;
  ShowTamVentana();
  
});


function ShowTamVentana()
{
  const viewportWidth = window.innerWidth;

  if (viewportWidth < 600) {
      console.log('Modo móvil activado.');
      // Ejecuta alguna función para dispositivos móviles
  } else if (viewportWidth >= 600 && viewportWidth < 1200) {
      console.log('Modo tablet activado.');
      // Ejecuta alguna función para tabletas
  } else {
      console.log('Modo escritorio activado.');
      // Ejecuta alguna función para escritorios
  }
  console.log('viewportWidth', viewportWidth);
  //alert(viewportWidth);

  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}

function InitApp()
{
  //np=37940846&ns=101800&c=10&po=BARRANCABERMEJA
  const TokensURL = new URLSearchParams(window.location.search);
  let NP = TokensURL.get('np'); //  NIT principal
  let BP = TokensURL.get('ns'); //  BP Numero solicitante
  let CN = TokensURL.get('c');  //  Canal
  let PO = TokensURL.get('po'); // Poblacion

  LS_Set('NP', NP);
  LS_Set('BP', BP);  
  LS_Set('CN', CN);
  LS_Set('PO', PO);

  LS_Set('FltTrafico', '');
  LS_Set('FltClasificacion', '');
  LS_Set('Data', "");
  LS_Set('DataFlt', "");

  RESTGetTodosProductos();
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
  let Data      = LS_Get('DataFlt');
  if(Data == '')
  {
    ShowMessageError('Seleccione primero un tipo de tráfico, haciendo click en alguno de los botones de la parte izquierda.');
    return 0;
  }  
  SetBtClasificacionActivo(Param.id);
  let ValFitro  = Param.attributes.FltClasificacion.value;
  let DataFlt   = LstproductosClasificacionANSI(JSON.parse(Data), ValFitro);
  ShowProductosFiltrados(DataFlt);
}

function SetBtClasificacionActivo(ValBtId)
{
  const LstBt = document.querySelectorAll('.bt-clasificacion-sel');
  LstBt.forEach(Bt => 
  {
    Bt.classList.remove('bt-clasificacion-sel');
    Bt.classList.add('bt-clasificacion');
  });

  let BtObj = document.getElementById(ValBtId);
  BtObj.classList.remove('bt-clasificacion');
  BtObj.classList.add('bt-clasificacion-sel');    
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
      let Class1 = document.getElementById('bt-clasificacion1');
      let Class2 = document.getElementById('bt-clasificacion2');
      let Class3 = document.getElementById('bt-clasificacion3');
      let Class4 = document.getElementById('bt-clasificacion4');

      const popoverInstance1 = bootstrap.Popover.getInstance(Class1);
      Class1.setAttribute('data-bs-content', DescClasificacion1[i]);
      popoverInstance1.setContent({'.popover-body': DescClasificacion1[i]}); popoverInstance1.update();

      const popoverInstance2 = bootstrap.Popover.getInstance(Class2);
      Class2.setAttribute('data-bs-content', DescClasificacion2[i]);
      popoverInstance2.setContent({'.popover-body': DescClasificacion2[i]}); popoverInstance2.update();
      
      const popoverInstance3 = bootstrap.Popover.getInstance(Class3);
      Class3.setAttribute('data-bs-content', DescClasificacion3[i]);
      popoverInstance3.setContent({'.popover-body': DescClasificacion3[i]}); popoverInstance3.update();
      
      const popoverInstance4 = bootstrap.Popover.getInstance(Class4);
      Class4.setAttribute('data-bs-content', DescClasificacion4[i]);
      popoverInstance4.setContent({'.popover-body': DescClasificacion4[i]}); popoverInstance4.update();      

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

  RESTGetConsecutivo(GrabarDetalles);
}

function GrabarDetalles(Consecutivo)
{
  DivWaitShow();
  $('#SamplesSelected > div').each(function() 
  {
    let CodSAP = this.attributes.prod_sap.value;
    let Descripcion = this.attributes.prod_sap_nom.value;
    RESTSetPedidoDetalle(FinalizarPedido, Consecutivo, CodSAP, Descripcion)
  });
}

/**
 * Graba los datos iniciales del cliente.
 * @returns void
 */
function FinalizarPedido(Consecutivo)
{
  DivWaitShow();
  let NP = LS_Get('NP'); //  NIT principal
  let BP = LS_Get('BP'); // BP Numero solicitante
  let CN = LS_Get('CN'); // Canal
  let PO = LS_Get('PO'); // Poblacion
  RESTSetPedido(NP, BP, CN, PO, Consecutivo);
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