import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';
export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  ROOT: 'root',
  TICKETS_PDD: 'tickets_pdd',
  TEXTBOOK: 'textbook',
  TEXTBOOK_RULES: 'textbook_rules',
  TEXTBOOK_SIGNS: 'textbook_signs',
  TEXTBOOK_MARKING: 'textbook_marking',
  TEXTBOOK_MALFUNCTIONS: 'textbook_malfunctions',
  TEXTBOOK_ADMISSION: 'textbook_admission',
  TESTS: 'tests',
  PROGRESS: 'progress',
  PROFILE: 'profile',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.ROOT, `/`, []), // 👈 перенаправление с корня
      createPanel(DEFAULT_VIEW_PANELS.TICKETS_PDD, `/tickets_pdd`, []),
      createPanel(DEFAULT_VIEW_PANELS.TESTS, `/tests`, []),
      createPanel(DEFAULT_VIEW_PANELS.PROGRESS, `/progress`, []),
      createPanel(DEFAULT_VIEW_PANELS.PROFILE, `/profile`, []),
      createPanel(DEFAULT_VIEW_PANELS.TEXTBOOK, `/textbook`, []),
      createPanel(DEFAULT_VIEW_PANELS.TEXTBOOK_RULES, `/textbook/rules`, []),
      createPanel(DEFAULT_VIEW_PANELS.TEXTBOOK_SIGNS, `/textbook/signs`, []),
      createPanel(DEFAULT_VIEW_PANELS.TEXTBOOK_MARKING, `/textbook/marking`, []),
      createPanel(DEFAULT_VIEW_PANELS.TEXTBOOK_MALFUNCTIONS, `/textbook/malfunctions`, []),
      createPanel(DEFAULT_VIEW_PANELS.TEXTBOOK_ADMISSION, `/textbook/admission`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
