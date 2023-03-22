import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './Mealitem/MealItem';
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: '壽司',
    description: '最受日本人愛的壽司也來啦~',
    price: 150,
  },
  {
    id: 'm2',
    name: '義大利麵',
    description: '引用義大利進口香料',
    price: 200,
  },
  {
    id: 'm3',
    name: '漢堡',
    description: '巨無霸漢堡等你挑戰',
    price: 105,
  },
  {
    id: 'm4',
    name: '烏龍麵',
    description: '家鄉味最回味一定要來碗',
    price: 150,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id} // this is new!
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
