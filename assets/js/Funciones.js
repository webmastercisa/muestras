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

function LimpiaURL(url) {
  let decodedUrl = url; //decodeURIComponent(url);
  decodedUrl = decodedUrl.replace(/%20/g, ' ')
                         .replace(/%21/g, '!')
                         .replace(/%22/g, '"')
                         .replace(/%23/g, '#')
                         .replace(/%24/g, '$')
                         .replace(/%25/g, '%')
                         .replace(/%26/g, '&')
                         .replace(/%27/g, "'")
                         .replace(/%28/g, '(')
                         .replace(/%29/g, ')')
                         .replace(/%2A/g, '*')
                         .replace(/%2B/g, '+')
                         .replace(/%2C/g, ',')
                         .replace(/%2D/g, '-')
                         .replace(/%2E/g, '.')
                         .replace(/%2F/g, '/')
                         .replace(/%3A/g, ':')
                         .replace(/%3B/g, ';')
                         .replace(/%3C/g, '<')
                         .replace(/%3D/g, '=')
                         .replace(/%3E/g, '>')
                         .replace(/%3F/g, '?')
                         .replace(/%40/g, '@')
                         .replace(/%5B/g, '[')
                         .replace(/%5C/g, '\\')
                         .replace(/%5D/g, ']')
                         .replace(/%5E/g, '^')
                         .replace(/%5F/g, '_')
                         .replace(/%60/g, '`')
                         .replace(/%7B/g, '{')
                         .replace(/%7C/g, '|')
                         .replace(/%7D/g, '}')
                         .replace(/%7E/g, '~')
                         .replace(/%C0/g, 'À')
                         .replace(/%C1/g, 'Á')
                         .replace(/%C2/g, 'Â')
                         .replace(/%C3/g, 'Ã')
                         .replace(/%C4/g, 'Ä')
                         .replace(/%C5/g, 'Å')
                         .replace(/%C6/g, 'Æ')
                         .replace(/%C7/g, 'Ç')
                         .replace(/%C8/g, 'È')
                         .replace(/%C9/g, 'É')
                         .replace(/%CA/g, 'Ê')
                         .replace(/%CB/g, 'Ë')
                         .replace(/%CC/g, 'Ì')
                         .replace(/%CD/g, 'Í')
                         .replace(/%CE/g, 'Î')
                         .replace(/%CF/g, 'Ï')
                         .replace(/%D0/g, 'Ð')
                         .replace(/%D1/g, 'Ñ')
                         .replace(/%D2/g, 'Ò')
                         .replace(/%D3/g, 'Ó')
                         .replace(/%D4/g, 'Ô')
                         .replace(/%D5/g, 'Õ')
                         .replace(/%D6/g, 'Ö')
                         .replace(/%D7/g, '×')
                         .replace(/%D8/g, 'Ø')
                         .replace(/%D9/g, 'Ù')
                         .replace(/%DA/g, 'Ú')
                         .replace(/%DB/g, 'Û')
                         .replace(/%DC/g, 'Ü')
                         .replace(/%DD/g, 'Ý')
                         .replace(/%DE/g, 'Þ')
                         .replace(/%DF/g, 'ß')
                         .replace(/%E0/g, 'à')
                         .replace(/%E1/g, 'á')
                         .replace(/%E2/g, 'â')
                         .replace(/%E3/g, 'ã')
                         .replace(/%E4/g, 'ä')
                         .replace(/%E5/g, 'å')
                         .replace(/%E6/g, 'æ')
                         .replace(/%E7/g, 'ç')
                         .replace(/%E8/g, 'è')
                         .replace(/%E9/g, 'é')
                         .replace(/%EA/g, 'ê')
                         .replace(/%EB/g, 'ë')
                         .replace(/%EC/g, 'ì')
                         .replace(/%ED/g, 'í')
                         .replace(/%EE/g, 'î')
                         .replace(/%EF/g, 'ï')
                         .replace(/%F0/g, 'ð')
                         .replace(/%F1/g, 'ñ')
                         .replace(/%F2/g, 'ò')
                         .replace(/%F3/g, 'ó')
                         .replace(/%F4/g, 'ô')
                         .replace(/%F5/g, 'õ')
                         .replace(/%F6/g, 'ö')
                         .replace(/%F7/g, '÷')
                         .replace(/%F8/g, 'ø')
                         .replace(/%F9/g, 'ù')
                         .replace(/%FA/g, 'ú')
                         .replace(/%FB/g, 'û')
                         .replace(/%FC/g, 'ü')
                         .replace(/%FD/g, 'ý')
                         .replace(/%FE/g, 'þ')
                         .replace(/%FF/g, 'ÿ');
  return decodedUrl;
}