import { useEffect } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const RedirectToHome = () => {
  const navigator = useRouteNavigator();

  useEffect(() => {
    navigator.replace('/home');
  }, []);

  return null;
};

export default RedirectToHome;

