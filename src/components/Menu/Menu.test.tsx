import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Menu } from './Menu';

function renderWithRouter(route = '/') {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Menu />
    </MemoryRouter>,
  );
}

describe('Навигационное меню', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('подсвечивает активную вкладку при изменении маршрута', () => {
    renderWithRouter('/history');
    const historyTab = screen.getByText(/History|История/i);
    expect(historyTab.parentElement?.className).toMatch(/selected/);
  });

  it('ссылка подсвечивает правильную вкладку', () => {
    renderWithRouter('/generate');
    const genTab = screen.getByText(/Generator|Генератор/i);
    expect(genTab.parentElement?.className).toMatch(/selected/);
  });

  it('неизвестный маршрут показывает 404', () => {
    render(
      <MemoryRouter initialEntries={['/notfound']}>
        <Routes>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
