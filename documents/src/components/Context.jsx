import { createContext, useContext, useEffect, useState  } from "react";
import axios from "axios";

const AppContext = createContext();

function AppProvider ( {children} ) {
    const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php'; 
    const getFavoritesFromLocalStorage = () => {
        let favorites = localStorage.getItem("favorites");
        if ( favorites ) {
            favorites = JSON.parse( localStorage.getItem("favorites") )
        } else {
            favorites= [];
        }
        return favorites;
    };

    const [ meals, setMeals ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ noData, setNoData ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ showModal, setShowModal ] = useState(false);
    const [ selectedMeal, setSelectedMeal ] = useState(null);
    const [ favorites, setFavorites ] = useState(getFavoritesFromLocalStorage());

    const fetchMeals = async (url) => {
        setNoData(false);
        setLoading(true);
        try {
            const response = await axios(url);
            if (response.data.meals) {
                setMeals(response.data.meals);
                // console.log(response.data.meals);
            }
            else {
                setNoData(true);
                setMeals([]);
            };
        } catch (error) {
            console.log(error);
        };
        setLoading(false);
    };
    
    const fetchRandomMeal = () => {
        fetchMeals(randomMealURL);
    };
    const fetchAllMeals = () => {
        fetchMeals(allMealsURL);
    };
    
    const selectMeal = ( idMeal, favoriteMeal ) => {
        let meal;
        if (favoriteMeal) {
            meal = favorites.find( ( meal ) => meal.idMeal === idMeal )
        } else {
            meal = meals.find( ( meal ) => meal.idMeal === idMeal );
        }
        setSelectedMeal(meal);
        setShowModal(true);
        // console.log( idMeal )
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const addToFavorites = ( idMeal ) => {
        let meal;
        let alreadyFavorites;
        let updatedFavorites;
        alreadyFavorites = favorites.find( ( meal ) => meal.idMeal === idMeal );
        if ( alreadyFavorites ) return
        meal = meals.find( ( meal ) => meal.idMeal === idMeal );
        updatedFavorites = [ ...favorites, meal ];
        setFavorites(updatedFavorites);
        // console.log("added");
        // console.log(updatedFavorites);
        localStorage.setItem( "favorites", JSON.stringify( updatedFavorites ) );
    };
    const removeFromFavorites = ( idMeal ) => {
        let updatedFavorites;
        updatedFavorites = favorites.filter( ( meal ) => meal.idMeal !== idMeal );
        setFavorites(updatedFavorites);
        localStorage.setItem( "favorites", JSON.stringify( updatedFavorites ) );
    };

    useEffect( () => {
        fetchMeals(allMealsURL)
    },[] );
    useEffect( () => {
        if (!searchTerm) return
        fetchMeals(`${allMealsURL}${searchTerm}`);
    }, [searchTerm] );
    
    return <AppContext.Provider 
                value={{ 
                    loading, meals, noData, setSearchTerm, fetchRandomMeal, 
                    fetchAllMeals, showModal, selectedMeal, selectMeal, closeModal,
                    favorites, addToFavorites, removeFromFavorites
                    }}>
                {children}
    </AppContext.Provider>
};

export const useGlobalContext = () => {
    return useContext(AppContext)
};

export { AppProvider, AppContext };