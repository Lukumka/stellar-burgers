import React, { FC, memo } from 'react';
import styles from './ingredient-details.module.css';
import { IngredientDetailsUIProps } from './type';

export const IngredientDetailsUI: FC<IngredientDetailsUIProps> = memo(
  ({ ingredientData }) => {
    const { name, image_large, calories, proteins, fat, carbohydrates } =
      ingredientData;

    return (
      <div data-cy='ingredient-modal-data' className={styles.content}>
        <img
          data-cy='ingredient-modal-image'
          className={styles.img}
          alt='изображение ингредиента.'
          src={image_large}
        />
        <h3 className='text text_type_main-medium mt-2 mb-4'>{name}</h3>
        <ul className={`${styles.nutritional_values} text_type_main-default`}>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Калории, ккал</p>
            <p
              data-cy='ingredient-modal-calories'
              className={`text text_type_digits-default`}
            >
              {calories}
            </p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Белки, г</p>
            <p
              data-cy='ingredient-modal-proteins'
              className={`text text_type_digits-default`}
            >
              {proteins}
            </p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Жиры, г</p>
            <p
              data-cy='ingredient-modal-fats'
              className={`text text_type_digits-default`}
            >
              {fat}
            </p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Углеводы, г</p>
            <p
              data-cy='ingredient-modal-carbonohydrates'
              className={`text text_type_digits-default`}
            >
              {carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    );
  }
);
