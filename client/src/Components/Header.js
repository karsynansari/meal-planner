import React, {useState, useEffect} from 'react'
import {Route, Switch} from "react-router-dom"
import Homepage from './Homepage'
import NavBar from './NavBar';
import MealPlanPage from "./MealPlanPage";
import ContributeRecipePage from "./ContributeRecipePage";

function Header({user, onLogout}) {
    const [recipes, setRecipes] = useState([]);
    const [recipeCardClicked, setRecipeCardClicked] = useState(false);
    const [clickedRecipe, setClickedRecipe] = useState({});
  

    useEffect(() => {
      fetch("http://localhost:4000/recipes")
        .then((response) => response.json())
        .then((data) => setRecipes(data));
    }, []);
    //make this also include cuisine, meal type, etc
  return (
    <>
      <div>Header</div>
      <NavBar onLogout={onLogout} user={user} />
      <Switch>
        <Route exact path="/meal_plans">
          <MealPlanPage />
        </Route>
        <Route exact path="/add_recipe">
          <ContributeRecipePage />
        </Route>
        <Route exact path="/">
          <Homepage user={user} 
          onLogout={onLogout} 
          recipes = {recipes}
         recipeCardClicked ={recipeCardClicked}
         setRecipeCardClicked= {setRecipeCardClicked}
         clickedRecipe={clickedRecipe}
         setClickedRecipe={setClickedRecipe}
         />
        </Route>
      </Switch>
    </>
  );
}

export default Header