import React from "react";
import ImageTooltip from '../../images/popup-status-ok.svg'

function InfoTooltip({tooltipStatus, setTooltipStatus }) {

  function onClose() {
    setTooltipStatus(false);
  }
  return (
    <div
      className={`popup ${tooltipStatus ? "popup_opened" : ""}`}
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="popup__container-status"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="popup__status-image"
          src={ImageTooltip}
          alt='Попап успешной смены данных'
        />
        <h3 className="popup__title-status">{"Изменения сохранены"}</h3>
        <button
          type="button"
          className="popup__close-icon"
          onClick={() => {
            onClose();
          }}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
