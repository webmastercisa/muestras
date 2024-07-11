/**
 * 
 * @param {string} email Cadena con el correo entrado por el usuario
 * @returns boolean true o false, si es una correo verdadero o no.
 */

function validarEmail(email) 
{
  console.log(email);
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function InputValidaCorreo(inputElement) 
{
  const input = inputElement.value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para validar el correo
  console.log('Value ', input);
  if (!regex.test(input)) 
  {
    document.getElementById('MsgFeedback').innerText = "Please enter a valid email address.";
    document.getElementById('Email').focus();
  }
  else 
  {
    document.getElementById('MsgFeedback').innerText = "";
    console.log('OK ', input);
  }
}

function InputSoloNumeros(inputElement) 
{
  const input = inputElement.value;
  console.log('Value Solo# ', input);
  if (input.length > 0 && isNaN(input.charAt(input.length - 1))) 
  { // Verifica si el último carácter no es un número
    inputElement.value = input.slice(0, -1); // Elimina el último carácter no numérico
    document.getElementById('MsgFeedback').innerText = "Solo se permiten números.";
  } //if
  else 
  {
      document.getElementById('MsgFeedback').innerText = "";
      console.log('OK ', input);
  } //else
}

function DivWaitShow()
{
  let spinner = document.getElementById("DivWait");
  spinner.style.visibility  = 'visible';
  document.getElementById('imageModalContenedor').style.display = 'flex';
}

function DivWaitHide()
{
  let spinner = document.getElementById("DivWait");
  spinner.style.visibility  = 'hidden';
  document.getElementById('imageModalContenedor').style.display = 'none';
}

function PageReload() 
{
  document.location.reload();
}

/**
 * Redirecciona a una página
 *
 * @param string URL Nombre de la página a la cual quiere dirigir
 * @param int time Tiempo en milisegundos antes de ser enviada a dirigir.
 * 
 * @return void
 * 
 * Created at: 18/6/2024, 12:01:57 p. m. (America/Bogota)
 * @author     tic.desarrolloweb@ceramicaitalia.com 
 * @see       {@link https://dev.ceramicaitalia.com/} 
 * @see       {@link https://www.ceramicaitalia.com/} 
 * @copyright T.I. CISA 2024 
 */
function Redir(URL, time = 0)
{
  setTimeout(GoToPage, time, URL);  
}

/**
 * Dirige el navegado hacia la página enviada por parametro, si no se envía ninguna
 * se envia al dominio principal.
 *
 * @param string URL Página a la cual se dirige el navegador
 * 
 * @return void
 * 
 * Created at: 18/6/2024, 12:04:24 p. m. (America/Bogota)
 * @author     tic.desarrolloweb@ceramicaitalia.com 
 * @see       {@link https://dev.ceramicaitalia.com/} 
 * @see       {@link https://www.ceramicaitalia.com/} 
 * @copyright T.I. CISA 2024 
 */
function GoToPage(URL = '')
{
  if(URL == '')
    window.location.replace("https://www.ceramicaitalia.com");
  else
    window.location.replace(URL);
}

function RedirHome()
{
  let URL   = "https://www.ceramicaitalia.com";
  let time  = 1500;
  setTimeout(GoToPage, time, URL);
}

function RedirFirtsHome()
{
  let URL   = "https://web.ceramicaitalia.com/muestras";
  let time  = 1500;
  setTimeout(GoToPage, time, URL);  
}
/**
 * 
 * @param {*} Value 
 * @returns 
 */
function ClicActivaCtrl(CtrlId='', Cls='', ClsActiva='')
{
  const LstBt = document.querySelectorAll('.'+ClsActiva);
  LstBt.forEach(Bt => 
  {
    Bt.classList.remove(ClsActiva);    Bt.classList.add(Cls);
  });

  if(CtrlId == '') return 0;

  let BtObj = document.getElementById(CtrlId);
  BtObj.classList.remove(Cls);  BtObj.classList.add(ClsActiva);    
}

/** ==========   LocalStorage =========== */
function LS_Exist(Value)
{
  if(localStorage.getItem(Value) !== undefined && localStorage.getItem(Value))
    return true;
  else
    return false;
}

function LS_Get(Value)
{
  if (LS_Exist(Value)) 
  {
    return localStorage.getItem(Value);
  }
  else
    return '';
}

function LS_Set(Key, Value)
{
  localStorage.setItem(Key, Value);
}