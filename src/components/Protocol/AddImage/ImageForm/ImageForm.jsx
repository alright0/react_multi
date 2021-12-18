import React from "react";

let ImageForm = (imageFile) => {
  return (
    <div>
      <img src={imageFile} alt="image" width="500px" />
      <textarea name="comment" id="comment" cols="30" rows="10" placeholder="Введите комментарий"></textarea>
      <button>Сохранить</button>
      <button>Удалить</button>
    </div>
  );
};

export default ImageForm;
