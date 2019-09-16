const imageZoom = () => {
  const zoom = 5;
  const thumb = document.getElementById('image-thumb');
  const previewElement = document.getElementById('preview-element');
  const zoomImageContainer = document.getElementById('zoom-image-container');
  const zoomImage = document.getElementById('zoom-image');

  zoomImageContainer.style.height = thumb.clientHeight * zoom + 'px';
  zoomImageContainer.style.width = thumb.clientWidth * zoom + 'px';

  previewElement.style.height = thumb.clientHeight / zoom + 'px';
  previewElement.style.width = thumb.clientWidth / zoom + 'px';

  const calculatePosition = (x, y) => {
    const imageHeight = thumb.clientHeight;
    const imageWidth = thumb.clientWidth;
    const previewElementHeight = previewElement.clientHeight;
    const previewElementWidth = previewElement.clientWidth;

    let positionX = x - previewElementWidth / 2;
    let positionY = y - previewElementHeight / 2;

    if (positionX < 0) {
      positionX = 0;
    }

    if (positionY < 0) {
      positionY = 0;
    }

    if (y + previewElementHeight / 2 > imageHeight) {
      positionY = imageHeight - previewElementHeight;
    }

    if (x + previewElementWidth / 2 > imageWidth) {
      positionX = imageWidth - previewElementWidth;
    }

    previewElement.style.left = `${positionX}px`;
    previewElement.style.top = `${positionY}px`;

    zoomImageContainer.style.left = -positionX * zoom + 'px';
    zoomImageContainer.style.top = -positionY * zoom + 'px';
  };

  zoomImage.src = thumb.getAttribute('data-image');

  thumb.addEventListener('mousemove', e => calculatePosition(e.pageX - thumb.getBoundingClientRect().left - window.scrollX, 
  e.pageY - thumb.getBoundingClientRect().top - window.scrollY));
  thumb.addEventListener('mouseover', _ => previewElement.style.display = '');
  thumb.addEventListener('mouseout', _ => previewElement.style.display = 'none');
}