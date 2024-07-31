$(function () {
  InitApp();
  //window.onresize = ShowTamVentana;
  ActivarPopOver();
});


function ActivarPopOver() 
{
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}

function InitApp() 
{
  //np=37940846&ns=101800&c=10&po=BARRANCABERMEJA
  let CadParametros= window.location.search;
  CadParametros = LimpiaURL(CadParametros);
  LS_Set('TokensURL Nueva: ', CadParametros);
  const TokensURL = new URLSearchParams(CadParametros); //window.location.search
  
  let NP = TokensURL.get('np'); //  NIT principal
  let BP = TokensURL.get('ns'); //  BP Numero solicitante
  let CN = TokensURL.get('c');  //  Canal
  let PO = TokensURL.get('po'); // Poblacion


  if (BP == '' || BP == null) 
  {
    ShowMessageRedir('No se permite acceso sin información !!', 'https://www.ceramicaitalia.com');
    return 0;
  }

  GetCentro(PO, function (Data)
  {
    console.log('Long: ', Data.length);
    if (Data.length > 0) {
      let CE = Data[0].werks;
      let AL = parseInt(CE) + 1;
      LS_Set('CE', CE);
      LS_Set('AL', AL);
    }
    else {
      console.log('__ Valor por defecto __');
      LS_Set('CE', 1100);
      LS_Set('AL', 1101);
    }
  });

  LS_Set('NP', NP);
  LS_Set('BP', BP);
  LS_Set('CN', CN);

  LS_Set('FltTrafico', '');
  LS_Set('FltClasificacion', '');
  LS_Set('Data', "");
  LS_Set('DataFlt', "");

  RESTGetTodosProductos();
}

function OnClicFltTraficoChange(Param) {
  ClicActivaCtrl(Param.id, 'bt-categoria', 'bt-categoria-sel'); //Reset
  ClicActivaCtrl('', 'bt-clasificacion', 'bt-clasificacion-sel'); //Reset

  let DivMaster = document.getElementById('gallery');
  DivMaster.innerHTML = '';

  let ValFitro = Param.id;
  SetDescriptionClasificacion(ValFitro);
  let Data = LS_Get('Data');
  /** TODO: Crear los botones de clasificación segun los productos filtrados */
  let DataFlt = LstproductosTrafico(JSON.parse(Data), ValFitro);
  LS_Set('DataFlt', JSON.stringify(DataFlt));
}

function ResetLstBtTrafico() {
  const LstBt = document.querySelectorAll('.bt-categoria-sel');
  LstBt.forEach(Bt => {
    Bt.classList.remove('bt-categoria-sel');
    Bt.classList.add('bt-categoria');
  });
}

function OnClicFltClasificacionChange(Param) {
  let Data = LS_Get('DataFlt');
  if (Data == '') {
    ShowMessageError('Seleccione primero un tipo de tráfico, haciendo click en alguno de los botones de la parte izquierda.');
    return 0;
  }

  let ValFitro = Param.attributes.FltClasificacion.value;
  let DataFlt = LstproductosClasificacionANSI(JSON.parse(Data), ValFitro);
  ShowProductosFiltrados(DataFlt, Param.id);
}

function SetDescriptionClasificacion(ClasificacionValue = '') {
  let Clasificacion = ["RESIDENCIAL MODERADO", "RESIDENCIAL GENERAL", "COMERCIAL MODERADO", "COMERCIAL GENERAL"];
  let DescClasificacion1 = ["✔️ Dormitorios, estudios sin acceso directo al exterior.",
    "✔️ Todas las áreas de la vivienda menos la cocina, los baños, las escaleras y los balcones.",
    "✔️ Todas las áreas de la vivienda menos la cocina, los baños, las escaleras y los balcones. Lobbies y puntos fijos, locales comerciales sin acceso directo al exterior, de bajo tráfico y oficinas.",
    "✔️ Todas las áreas de la vivienda menos la cocina, los baños, las escaleras y los balcones. Lobbies y puntos fijos, locales comerciales de alto tráfico y oficinas, Centros hospitalarios de baja complejidad, instituciones educativas, supermercados, Salones sociales de interior, no aplica para aeropuertos."
  ];
  let DescClasificacion2 = ["✔️ Dormitorios, estudios y baños (incluyendo la ducha), balcones y saunas, sin acceso directo al exterior.",
    "✔️ Todas las áreas de la casa incluyendo las duchas, las escaleras y los balcones.",
    "✔️ Todas las áreas de la vivienda incluyendo la ducha, las escaleras y los balcones. Lobbies y puntos fijos, locales comerciales de bajo tráfico y oficinas. Salones sociales de interior y de exterior cubiertos. Restaurantes con cocina cerrada y abierta, peluquerías.",
    "✔️ Todas las áreas de la vivienda incluyendo la ducha, las escaleras y los balcones. Lobbies y puntos fijos, locales comerciales de alto tráfico y oficinas, Centros hospitalarios de baja complejidad, instituciones educativas, supermercados, Salones sociales de interior y de exterior cubiertos, Restaurantes con cocina cerrada y abierta, peluquerías, no aplica para aeropuertos."
  ];
  let DescClasificacion3 = ["✔️ Exterior de piscinas resindeciales, baños (incluyendo duchas), saunas, balcones.",
    "✔️ Patios residenciales y terrazas residenciales. Exterior de piscinas de zonas comunes, baños (incluyendo duchas), saunas, balcones",
    "✔️ Patios residenciales y terrazas residenciales. Exterior de piscinas de zonas comunes, baños (incluyendo duchas), saunas, balcones.",
    "✔️ Patios y terrazas en general. Exterior de piscinas comerciales, baños (incluyendo duchas), saunas, balcones. Salones sociales de exterior, incluyendo terrazas. Andenes de tránsito públicos."
  ];
  let DescClasificacion4 = ["✔️ Exterior de piscinas resindeciales, baños (incluyendo duchas), saunas, balcones.",
    "✔️ Patios residenciales y terrazas residenciales. Exterior de piscinas de zonas comunes, baños (incluyendo duchas), saunas, balcones",
    "✔️ Patios y terrazas residenciales. Exterior de piscinas comerciales, baños (incluyendo duchas), saunas, balcones. Salones sociales de exterior, incluyendo terrazas. Cocinas de exterior",
    "✔️ Patios y terrazas en general. Exterior de piscinas comerciales, baños (incluyendo duchas), saunas, balcones. Salones sociales de exterior, incluyendo terrazas. Andenes de tránsito públicos Cocinas de exterior"
  ];
  for (let i = 0; i < Clasificacion.length; i++) {
    if (Clasificacion[i] == ClasificacionValue) {
      let Class1 = document.getElementById('bt-clasificacion1');
      let Class2 = document.getElementById('bt-clasificacion2');
      let Class3 = document.getElementById('bt-clasificacion3');
      let Class4 = document.getElementById('bt-clasificacion4');

      const popoverInstance1 = bootstrap.Popover.getInstance(Class1);
      Class1.setAttribute('data-bs-content', DescClasificacion1[i]);
      popoverInstance1.setContent({ '.popover-body': DescClasificacion1[i] }); popoverInstance1.update();

      const popoverInstance2 = bootstrap.Popover.getInstance(Class2);
      Class2.setAttribute('data-bs-content', DescClasificacion2[i]);
      popoverInstance2.setContent({ '.popover-body': DescClasificacion2[i] }); popoverInstance2.update();

      const popoverInstance3 = bootstrap.Popover.getInstance(Class3);
      Class3.setAttribute('data-bs-content', DescClasificacion3[i]);
      popoverInstance3.setContent({ '.popover-body': DescClasificacion3[i] }); popoverInstance3.update();

      const popoverInstance4 = bootstrap.Popover.getInstance(Class4);
      Class4.setAttribute('data-bs-content', DescClasificacion4[i]);
      popoverInstance4.setContent({ '.popover-body': DescClasificacion4[i] }); popoverInstance4.update();

      return 0;
    } //if
  } //for

}

function ShowProductosFiltrados(Data, CtrlId) {
  DivWaitShow();
  //Data = LS_Get('DataFlt');
  //Data = JSON.parse(Data);
  let Familias = getFamilia(Data);
  let Formatos = getFormato(Data);
  let CantFamilias = Familias.length;
  let CantFormatos = Formatos.length;

  if (CantFamilias == 0) {
    DivWaitHide();
    ShowMessage('No existen productos para esta clasificación...');
    return 0;
  }

  let DivMaster = document.getElementById('gallery');
  DivMaster.innerHTML = '';

  ClicActivaCtrl(CtrlId, 'bt-clasificacion', 'bt-clasificacion-sel')

  let Cod = '';
  for (let i = 0; i < CantFamilias; i++) {
    let ObjDivF = Div('', '', 'div-columna1');//H(2,Familias[i],'recFamilia');
    let ObjHx = H('4', Familias[i], 'recFamilia');
    let ObjHR = HR();
    ObjDivF.appendChild(ObjHR);
    ObjDivF.appendChild(ObjHx);
    DivMaster.appendChild(ObjDivF);

    for (let j = 0; j < CantFormatos; j++) {
      let LstParaMostrar = productFamiliaFormato(Data, Familias[i], Formatos[j]);
      if (LstParaMostrar.length > 0) {
        let ObjDivF = Div(Formatos[j], '', 'div-formato');//H(2,Familias[i],'recFamilia');
        DivMaster.appendChild(ObjDivF);

        LstParaMostrar.forEach((item) => {

          Cod = item.material.substring(12);
          let ObjDiv = Div('', Cod, 'item');
          let ObjImg = Img('https://web.ceramicaitalia.com/temporada/' + Cod + '_2.jpg', 'CISA', 'ceramicaitalia.com', 'ProdImg', '', '');
          ObjDiv.appendChild(ObjImg);

          let ObjH3 = H('3', item.nombre);
          ObjDiv.appendChild(ObjH3);


          if (item.cantidadCompra == 0) {
            let BtA = Button('Agregar', 'btnCISA', AgregarProducto, ['this']);
            BtA.setAttribute("prod_sap", Cod);
            BtA.setAttribute("prod_name", item.nombre);
            ObjDiv.appendChild(BtA);
          } else {
           // console.log(item)
           // Extraer el año, mes y día de la cadena
           const dateStr = item.fechaCompra;
            const year = dateStr.substring(0, 4);
            const month = dateStr.substring(4, 6) - 1; // Los meses en JavaScript son de 0 a 11
            const day = dateStr.substring(6, 8);

            // Crear un objeto Date
            const date = new Date(year, month, day);

            // Formatear la fecha
            const formattedDate = date.toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
            let fechaCompra = `<b>fecha ultima compra :  ${formattedDate}</b>`;
            let ObjH3 = H('3', fechaCompra);
            ObjDiv.appendChild(ObjH3); 

            let catidadCompra =  `Cant Total Comprada :  ${item.cantidadCompra}`;

            let ObjH3c = H('3', catidadCompra);
            ObjDiv.appendChild(ObjH3c); 

          }


          let ObjA = A('https://fichatecnica.ceramicaitalia.com/ver.php?id=' + Cod + '&lang=es', 'Ficha técnica', 'btnSheet');
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

function AgregarProducto(Param) {
  let ProdSap = Param.target.attributes.prod_sap.value
  let ProdName = Param.target.attributes.prod_name.value;
  $('#' + ProdSap).hide();  // Ocultar la ficha que hizo clic

  let Result = ProductoYaExiste(ProdSap);
  if (Result == true) {
    return false;
  }

  let DivMaster = document.getElementById('SamplesSelected');

  let ObjDiv = Div('', 'Bt' + ProdSap, 'div-frame-item-sel col-12');
  ObjDiv.setAttribute("prod_sap", ProdSap);
  ObjDiv.setAttribute("prod_sap_nom", ProdName);

  let ObjDiv2 = Div(ProdName, '', '');
  ObjDiv.appendChild(ObjDiv2);
  ObjDiv2 = Button('', 'icono-delete icono-delete-marco', EliminarProducto, ['this']);//btnRem
  ObjDiv2.setAttribute("prod_sap", ProdSap);
  ObjDiv2.setAttribute("prod_sap_nom", ProdName);

  let ObjDiv3 = Div('', '', 'prod-img-mini-marco');
  let NomImg = 'https://web.ceramicaitalia.com/temporada/' + ProdSap + '_2.jpg';
  let ObjImg = Img(NomImg, 'CISA USA', 'ceramicaitalia.com', 'prod-img-mini', showImgModal, NomImg);
  ObjImg.setAttribute("prod_sap", ProdSap);
  ObjDiv3.appendChild(ObjImg);
  ObjDiv.appendChild(ObjDiv3);

  ObjDiv.appendChild(ObjDiv2);
  DivMaster.appendChild(ObjDiv);
}

function EliminarProducto(Param) {
  let ProdSap = Param.target.attributes.prod_sap.value
  /** Remover la muestra del área de productos seleccionado */
  const parent = document.getElementById("SamplesSelected");
  const child = document.getElementById("Bt" + ProdSap);
  const throwawayNode = parent.removeChild(child);

  /**  Volver a mostrar el producto en el área de muestras */
  $('#' + ProdSap).show();
}

function OrderTerminate() {
  var SapCod = [];
  DivWaitShow();
  $('#SamplesSelected > div').each(function () {
    SapCod.push(this.attributes.prod_sap.value);
  });

  if (SapCod.length == 0) {
    DivWaitHide();
    ShowMessageError('Debe seleccionar, al menos un producto.');
    return;
  }//if    

  RESTGetConsecutivo(GrabarDetalles);
}

function GrabarDetalles(Consecutivo) {
  var divs = document.querySelectorAll('#SamplesSelected > div');
  for (var i = 0; i < divs.length; i++) {
    let CodSAP = divs[i].attributes.prod_sap.value;
    let Descripcion = divs[i].attributes.prod_sap_nom.value;
    let CE = LS_Get('CE');
    let AL = LS_Get('AL');
    console.log('CodSAP: ', CodSAP);
    console.log('Descripcion: ', Descripcion);
    if (i == divs.length - 1)
      RESTSetPedidoDetalle(FinalizarPedido, Consecutivo, CodSAP, Descripcion, CE, AL, true); //ültimo llamado
    else
      RESTSetPedidoDetalle(FinalizarPedido, Consecutivo, CodSAP, Descripcion, CE, AL, false);
  } //for

  //FinalizarPedido(Consecutivo);
}

/**
 * Graba los datos iniciales del cliente.
 * @returns void
 */
function FinalizarPedido(Consecutivo) {
  let NP = LS_Get('NP'); //  NIT principal
  let BP = LS_Get('BP'); // BP Numero solicitante
  let CN = LS_Get('CN'); // Canal
  RESTSetPedido(NP, BP, CN, Consecutivo);
}


function ProductoYaExiste(ProdSap) {
  var Result = false;
  $('#SamplesSelected > div').each(function () {
    let ProdSapOld = this.attributes.prod_sap.value
    if (ProdSapOld == ProdSap) {
      Result = true;
      return;
    }
  });
  return Result;
}