 /**
  * @author CISA
  * Muestra una ventana emergente con información prioritaria.
  * @param {string} sMsg - Cuerpo del mensaje.
  */
 function ShowMessage(sMsg)
 {
   Swal.fire({icon: 'info',title:'Información importante.',html:sMsg, allowOutsideClick: false, confirmButtonText:'Ok'});
 }
 
 /**
  * 
  * 
  * Muestra una ventana emergente con información para reporte de error.
  * @param {string} sMsg - Cuerpo del mensaje.
  */
 function ShowMessageError(sMsg)
 {
   Swal.fire({icon: 'error',title:'Información importante.',html:sMsg, allowOutsideClick: false, confirmButtonText:'Ok'});
 }
 
 /**
  *  @author Usa.CeramicaItalia
  * Muestra una ventana emergente con información por un tiempo de 2.5 segundos.
  * @param {string} sMsg - Cuerpo del mensaje
  */
 function ShowMessageTemp(sMsg)
 {    
   Swal.fire({position:'top-end',icon: 'success',title:'! Completado !',html:sMsg, showConfirmButton: false,allowOutsideClick: false, timer: 2500});
 }

/**
  *  @author Usa.CeramicaItalia
  * Muestra una ventana emergente, espera acción y redirige.
  * @param {string} sMsg -  - Cuerpo del mensaje
  * @param {string} sURL - Página que será cargada una vez que el usuario de clic en el botón "aceptar"
  */
function ShowMessageRedir(sMsg, sURL)
{
  //  por acá estarían las validaciones, que tienen return = false si no se cumple
  //  si se confirma todo, se devuelve la siguiente alerta: 
  swal.fire({
          icon  : 'info',
          title : '.:: CeramicaItalia.com ::.',
          html  : sMsg,
          showCancelButton: false, //true
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) 
          {
            location.replace(sURL);
          }
          else
          {
            location.replace(sURL);
          }
        });
  } 

/**
  *  @author Usa.CeramicaItalia
  * Muestra una ventana emergente, espera acción y redirige.
  * @param {string} sMsg -  - Cuerpo del mensaje
  * @param {string} sURL - Página que será cargada una vez que el usuario de clic en el botón "aceptar"
  */
function ShowMessageRedirFull(sMsg, sTitle, sURL)
{
  //  por acá estarían las validaciones, que tienen return = false si no se cumple
  //  si se confirma todo, se devuelve la siguiente alerta: 
  swal.fire({
          icon  : 'info',
          title : sTitle,
          html  : sMsg,
          showCancelButton: false, //true
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Finalizar',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) 
          {
            location.replace(sURL);
          }
          else
          {
            location.replace(sURL);
          }
        });
  } 

  function ShowMessageReload(sMsg)
  {
    //  por acá estarían las validaciones, que tienen return = false si no se cumple
    //  si se confirma todo, se devuelve la siguiente alerta: 
    swal.fire({
            icon  : 'info',
            title : '.:: CeramicaItalia.com ::.',
            html  : sMsg,
            showCancelButton: false, //true
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          }).then((result) => 
          {
            location.reload();
          });
    } 


  /**
  *  @author Usa.CeramicaItalia
  * Muestra una ventana emergente, espera acción y redirige.
  * @param {string} sMsg -  - Cuerpo del mensaje
  * @param {string} sURL - Página que será cargada una vez que el usuario de clic en el botón "aceptar"
  */
function ShowMessageErrorRedir(sMsg, sURL)
{
  //  por acá estarían las validaciones, que tienen return = false si no se cumple
  //  si se confirma todo, se devuelve la siguiente alerta: 
  swal.fire({
          icon  : 'error',
          title : 'Importante - Atención !!',
          text  : sMsg,
          showCancelButton: false, //true
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) 
          {
            //swal('¡Confirmado!',  'Su pedido ha sido registrado con éxito.', 'success' )
            //  $("#formulario").submit();
            location.replace(sURL);
          }
          else
          {
            //return false;
            location.replace(sURL);
          }
        });
  } 