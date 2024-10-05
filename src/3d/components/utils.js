// The updateLabel function
export const updateLabel = (model, textDiv, sceneDiv, camera, textPosition) => {
    if (model) {
      textPosition.setFromMatrixPosition(model.matrixWorld);
      textPosition.project(camera);
  
      const halfWidth = sceneDiv.clientWidth / 2;
      const halfHeight = sceneDiv.clientHeight / 2;
      textPosition.x = (textPosition.x * halfWidth) + halfWidth;
      textPosition.y = -(textPosition.y * halfHeight) + halfHeight;
  
      const labelWidth = textDiv.offsetWidth;
      const labelHeight = textDiv.offsetHeight;
  
      // Check if the label is within the viewport
      const isInViewport = (
        textPosition.x >= -labelWidth &&
        textPosition.x <= sceneDiv.clientWidth &&
        textPosition.y >= -labelHeight &&
        textPosition.y <= sceneDiv.clientHeight
      );
  
      if (isInViewport) {
        textDiv.style.display = 'block';
        textDiv.style.top = `${Math.max(0, Math.min(textPosition.y, sceneDiv.clientHeight - labelHeight))}px`;
        textDiv.style.left = `${Math.max(0, Math.min(textPosition.x, sceneDiv.clientWidth - labelWidth))}px`;
      } else {
        textDiv.style.display = 'none';
      }
    }
  };