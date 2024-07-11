$(function() 
{
  document.getElementById('imageModalContenedor').addEventListener('click', function(event) 
  {
    if (event.target === this) 
    {
      this.style.display = 'none';
    }
  });
  
});

function showImgModal(VarPoint, imageSrc) 
{
  console.log('imageSrc: ', imageSrc);
  const modalContenedor = document.getElementById('imageModalContenedor');
  const modalImage = document.getElementById('imageModal');
  modalImage.src = imageSrc; // Establece la fuente de la imagen
  modalContenedor.style.display = 'flex'; // Hace visible el modal
}
