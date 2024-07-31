/**
 * 
 * @param {string} Src Dirección de la imagen
 * @param {string} Alt Texto alternativo cuando la imagen no existe
 * @param {string} Title Titulo de la imagen.
 * @returns Objeto de tipo imagen, con sus atributos asignados.
 */
function Img(Src='', Alt='', Title='', Class='', EventoClic, Param='')
{
  let Obj       = document.createElement('img');
  Obj.src       = Src;
  Obj.alt       = Alt;
  Obj.title     = Title;
  Obj.className = Class;  

  if(EventoClic != '')
    Obj.addEventListener('click', function(event) { EventoClic(event, Param);}); 
  //EventoClic(event, this  ...Param); 

  return Obj;
}

function HR(Class='')
{
  let Obj       = document.createElement('hr');
  if(Class != '') Obj.setAttribute("class", Class);
  return Obj;
}

function H(No='', Txt='', Class='')
{
  let Obj       = document.createElement('h' + No);
  Obj.innerHTML = Txt;
  if(Class != '')
    Obj.setAttribute("class", Class);
  return Obj;
}


function Div(Txt='', Id='', Class='')
{
  let Obj       = document.createElement('div');
  Obj.textContent         = Txt;  
  if(Class != '')
    Obj.className = Class;

  if(Id != '')
    Obj.id = Id;  
  /*
  Obj.style.padding       = '20px';
  Obj.style.backgroundColor = 'lightblue';
  Obj.style.border = '1px solid #000';
  Obj.style.marginTop = '10px';
  Obj.style.textAlign = 'center';
  Obj.style.borderRadius = '10px';
  */
  return Obj;
}

function A(Href, Txt='', Class='', Target='_blank')
{
  let Obj         = document.createElement('a');
  Obj.href        = Href;
  Obj.target      = Target;
  Obj.textContent = Txt;
  if(Class != '') Obj.className =  Class;
  return Obj;
}

function Button(Txt='', Class='', EventoClic, Param)
{
  let Obj         = document.createElement('a');
  Obj.href        = 'javascript:void(0);';
  Obj.textContent = Txt;
  if(Class != '') Obj.className =  Class;

  Obj.addEventListener('click', function(event) { EventoClic(event, Param);}); //EventoClic(event, this  ...Param); 
  return Obj;
}

