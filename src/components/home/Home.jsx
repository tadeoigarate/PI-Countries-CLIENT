import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CardsCountries from '../cardsCountries/CardsCountries';
import CardCountry from '../cardCountry/CardCountry';
import SearchBar from '../searchBar/SearchBar';
import NavBar from '../navBar/NavBar';
import s from './Home.module.css';
import {
        getAllCountries, 
        getActivity,
        filterByContinent, 
        filterByActivity, 
        filterActBySeason, 
        sortCountries,
        getChina } from '../../redux/actions/index';


export function formatNumber(number){                
    return new Intl.NumberFormat().format(number);
};


export default function Home(){
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters)
    const [,setSort] = useState('')

    
    function handleClick(e){
        e.preventDefault()
        dispatch(getAllCountries())
    }
  
    //estados locales para paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPage, setCountriesPage] = useState(9)

    let indexOfLastCountry = currentPage * countriesPage ;  //1*10
    let indexOfFirstCountry = indexOfLastCountry - countriesPage; //10-10
    let currentCountries = filters?.slice(indexOfFirstCountry, indexOfLastCountry) //(0,10)
    
    let pages = [];

    const numOfPages = Math.ceil(filters.length / countriesPage)

    for(let i= 1; i<=numOfPages; i++){
        pages.push(i)
    }

    useEffect(() => {
        dispatch(getAllCountries())
        dispatch(getActivity())
        setCountriesPage(9)
    }, [dispatch])


    function pagination(e, page){
        e.preventDefault();
        setCurrentPage(page)
    }

    const renderPages = pages.map(page => (
        <li key={page}>
            <div>
                <button className={s.btnPage} onClick={e => pagination(e, page)}>
                {page}
                </button>
            </div>
        </li>
    ))
 
          //Filtros
    //por continente
    function handleFilterByContinent(e){
        e.preventDefault()
        dispatch(filterByContinent(e.target.value))
        setSort(e.target.value)
        setCurrentPage(1)
    }

    //por actividad
    function handleFilterByActivity(e){
        e.preventDefault()
        dispatch(filterByActivity(e.target.value))
        setSort(e.target.value)
        setCurrentPage(1)
    }

    //por temporada
    function handleFilterActBySeason(e){
        e.preventDefault()
        dispatch(filterActBySeason(e.target.value))
         setSort(e.target.value)
         setCurrentPage(1)
        
    }
    //ordenamiento
    function handleSortCountries(e){
        e.preventDefault()
        dispatch(sortCountries(e.target.value))
        setSort(e.target.value)
        setCurrentPage(1)
    }

    function handleFilterChina(e){
        e.preventDefault()
        dispatch(getChina(e.target.value))
        setCurrentPage(1)
        setSort(e.target.value)
        console.log("llegue", e.target.value)

    }
    
    return (
        <>
        <div className={s.container}>

            <NavBar />

            <SearchBar />

            <div className={s.filterContainer}>
                <select className={s.filter} 
                        onChange={handleFilterByContinent}>
                        <option value='All'>Filters By Continents</option>
                        <option value='Africa'>Africa</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='North America'>North America</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='South America'>South America</option>
                </select>

                <select className={s.filter} 
                        onChange={handleFilterActBySeason}>
                        <option value='All'>Filters By Season</option>
                        <option value='Autumn'>Autumn</option>
                        <option value='Spring'>Spring</option>
                        <option value='Summer'>Summer</option>
                        <option value='Winter'>Winter</option>
                </select>

                <select className={s.filter} 
                        onChange={handleFilterByActivity}>
                        <option value='All'>Filters By Activities</option>
                        <option value='Surf'>Surf</option>
                        <option value='Safari'>Safari</option>
                        <option value='Sky'>Sky</option>
                        <option value='Diving'>Diving</option>
                        <option value='Montain_Climb'>Montain_Climb</option>
                        <option value='Camping'>Camping</option>
                </select>

                <select className={s.filter} 
                        onChange={handleSortCountries}>
                        <option value='All'>Sorts</option>
                        <option value='AZ'>Countries AZ</option>
                        <option value='ZA'>Countries ZA</option>
                        <option value='ASC'>Population ASC</option>
                        <option value='DESC'>Population DESC</option>
                        <option value='Small'>Small Area</option>
                        <option value='Big'>Big Area</option>
                    </select>
                 </div>  

            <div className={s.btnContainer}>
                <button 
                        onClick={(e)=>handleClick(e)} 
                        className={s.btn}>Refresh Country
                </button>
            </div>

            <div>
                <button
                onClick={handleFilterChina}
                value='DESC'
                >el mas poblado</button>
            </div>

            <div>
            <ul className={s.ul}>{renderPages}</ul>
            </div>
            <div className={s.countryContainer}>
                {currentCountries.length?(
                    currentCountries.map((c) => (
                        <CardCountry
                        name={c.name}
                        id={c.id}
                        flags={c.flags}
                        continents={c.continents}
                        population={formatNumber(c.population)}
                        key={c.id}/>
                    ))
                    ):(<h3>Country Not found</h3>)
                } 
              </div> 
                <CardsCountries  countries={currentCountries} />
            </div>

        </>
    )
}        
