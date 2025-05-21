import { useEffect } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const RedirectToHome = ({ id }) => {
  const navigator = useRouteNavigator();

  useEffect(() => {
    navigator.replace('/home');
  }, [navigator]);

  // Возвращаем пустой div, но с обязательным id
  return <div id={id} />;
};

export default RedirectToHome;

