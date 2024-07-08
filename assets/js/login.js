$(document).ready(function() 
{
  $('[data-toggle="tooltip"]').tooltip();
});


function OnClicLogin()
{
  let EMailLogin  = $('#EMailLogin').val();
  let Password    = $('#Password').val();
  if (validarEmail(EMailLogin) == false) 
  {
    ShowMessageError('Email is invalid.');
    return 0;
  }
  if (Password.length < 5) 
  {
    ShowMessageError('Password is invalid.');
    return 0;
  }

  DivWaitShow();
  var Result = '';
  let URL = 'modules/mod_GetUserList.php';
  let formData = new FormData();
  formData.append('EMailLogin', EMailLogin);
  formData.append('Password', Password);

  var ObjAjax = $.ajax( {
                url : URL, 
                data : formData, 
                method : 'POST', 
                dataType  : 'text',   // Que formato retornará el ajax? html json
                processData: false, 
                cache : false, 
                contentType: false}); //Formato a enviar "application/json; charset=utf-8"  por defecto application/x-www-form-urlencoded; charset=UTF-8    

  ObjAjax.always(function() { DivWaitHide(); });

  ObjAjax.fail(function(jqXHR, textStatus, errorThrown) 
  { 
    console.log("=> " + jqXHR.responseText + " => "+ textStatus + " => " + errorThrown );
    ShowMessageError(jqXHR.responseText + " => "+ textStatus);
    Result = '';
  });

  ObjAjax.done(function(Data)
  {
    console.log('Data: ', Data);
    let DataJson = JSON.parse(Data);
    if(DataJson.Error == true)
    {
      ShowMessageError(DataJson.Msg);
      return 0;
    }
    ShowMessage(DataJson.Msg);
    Redir('https://usa.ceramicaitalia.com/app/samples/process_samples.php', 2000);
  });
  

}
