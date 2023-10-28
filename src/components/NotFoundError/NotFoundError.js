import { Link } from "react-router-dom";

function NotFoundError() {
  return (
    <div className="error-box">
      <h1 className="error-title">404</h1>
      <p className="error-message">Страница не найдена</p>
      <Link to="/" className="error-back">
        Назад
      </Link>
    </div>
  );
}

export default NotFoundError;
