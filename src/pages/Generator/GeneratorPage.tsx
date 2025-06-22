import { GeneratorButton } from '../../components/GeneratorButton/GeneratorButton';
import s from './GeneratorPage.module.css';

export const GeneratorPage = () => {
  return (
    <div className={s.container}>
      <span>Сгенерируйте готовый csv-файл нажатием одной кнопки</span>
      <div className={s.button}>
        <GeneratorButton />
      </div>
    </div>
  );
};
