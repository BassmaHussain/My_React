import React ,{useState} from 'react';

import Pagination from "react-js-pagination"
// images
import Slider from "react-slick";
//components
import CarsCards from "./CarsCarde.js"
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faChevronLeft} from "@fortawesome/free-solid-svg-icons" ;
import {  faChevronRight } from "@fortawesome/free-solid-svg-icons" ;

//css
import "../css/availbleCar.css"
import { useSelector } from 'react-redux';

const AvailableCars = ()=>{

    const [avSlideIndex,setAvSlideIndex]=useState(0)
    const [nonavSlideIndex,setNonAvSlideIndex]=useState(0)
    const [shown,setShown]=useState('available')

    const AvailableCars=useSelector((state)=>state.availableCarsReducer)
    const NonAvailableCars=useSelector((state)=>state.nonAvailableCarsReducer)
    

    {/* pagination states */}

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(6);
    const lastPostIndex = currentPage * cardsPerPage;
    const firstPostIndex = lastPostIndex - cardsPerPage;
    const currentCards = AvailableCars.slice(firstPostIndex, lastPostIndex);

   
  const handleactivePagination = (pageNumber)=>{
    setCurrentPage(pageNumber)
  }
    
    const NextArrow = ({onClick}) => {
        return (
          <div className="arrow next" onClick={onClick}>
                 <span className="arrow-icon"><FontAwesomeIcon  icon={faChevronRight} /></span>
          </div>
        )
      }
    
      const PrevArrow = ({onClick}) => {
        return (
          <div className="arrow prev" onClick={onClick}>
               <span className="arrow-icon"><FontAwesomeIcon  icon={faChevronLeft} /></span>
          </div>
        )
      }
    
    const setting = {
      infinite:true,
      speed:300,
      lazyLoad: true,
      slidesToShow:3,
      centerMode:true,
      autoplay:true,
      autoplaySpeed: 2000,
      nextArrow:<NextArrow />,
      prevArrow:<PrevArrow />,
      beforeChange:(current,next)=>{setAvSlideIndex(next)},
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
         }
        ]

      
    }
    const settingNonAv = {
      infinite:true,
      speed:300,
      lazyLoad: true,
      slidesToShow:3,
      centerMode:true,
      autoplay:true,
      autoplaySpeed: 2000,
      nextArrow:<NextArrow />,
      prevArrow:<PrevArrow />,
      beforeChange:(current,next)=>{setNonAvSlideIndex(next)},
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
         }
        ]

      
    }
    
    return(
        <div>
            <div className='container'>

          {/** click to show available cars */}
            <div className={(shown === 'unavailable')?' active click text-center':'non_active click text-center'}>
                 <div onClick={()=> setShown('available')}>Available Cars</div>
            </div>

            {/** Pagination show available cars*/}
                <div className={(shown === 'available')?'active available_car cars_show':'non_active available_car cars_show'}>
                       <h5 className='av_title'>Available Cars</h5>
                       <div  className="all-cards">
                           <CarsCards cars={currentCards}  />
                       </div>
                      
                     
                          <Pagination 
                          activePage={currentPage}
                          itemClass="page-item"
                          linkClass="page-link"
                          itemsCountPerPage={cardsPerPage}
                          totalItemsCount={AvailableCars.length}
                          onChange={handleactivePagination}
                        />
                    
                        
                </div>


                {/**click to show unavailable cars */}
                <div className={(shown === 'available')?' active click text-center':'non_active click text-center'}>
                    <div onClick={()=> setShown('unavailable')}>Unavailable Cars</div>
                </div>

                 {/** slide show unavailable cars*/}
                <div className={(shown === 'unavailable')?'active unavailable_car cars_show':'non_active unavailable_car cars_show'}>
                       <h5 className='av_title'>Unavailable Cars</h5>
                        <Slider {...settingNonAv } className="Slider">
                            {(NonAvailableCars)&&NonAvailableCars.map((car,indx)=>(
                              <div className={(indx === nonavSlideIndex)?"slideActive slide":"slide"}>
                                      <img src={car.img} alt="..."/>
                                      <div className='car_details text-center'>
                                          <span className="car-name">{car.name}</span>
                                          <span className="car-price">{car.price}</span>
                                      </div>
                                </div>
                            ))}
                        </Slider>
                </div>

                <button className=' continue'>Continue</button>

            </div>
        </div>
    )
}

export default  AvailableCars;