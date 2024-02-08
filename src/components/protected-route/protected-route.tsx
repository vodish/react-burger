import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


type TProtected = {
  NoAuth?: boolean
  component: JSX.Element
}

const Protected = ({ NoAuth = false, component }: TProtected) => {
  // checkAuth это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  // @ts-ignore
  const checkAuth = useSelector( store => store.user.checkAuth );
  // @ts-ignore
  const user      = useSelector( store => store.user.name );
  const location  = useLocation();

  if ( ! checkAuth ) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return null;
  }

  if ( NoAuth  && user ) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if ( ! NoAuth  && ! user ) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !NoAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const IsAuth = Protected;
export const NoAuth = ({ component }: TProtected) => (
  <Protected NoAuth={true} component={component} />
);