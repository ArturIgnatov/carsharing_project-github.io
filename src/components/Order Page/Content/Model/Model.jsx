import React from 'react'
import './Model.sass'


const Model = (props) => {
	console.log(props);

// Рендер радио
	const checkBoxItem = props.filterCar.map((el) => {
		return (
			<label key={el.id}>
				<input className="check" type="radio" name="model" checked={el.checked} onChange={() => { props.handlerRadio(el.id) }} />
				<span className="fakecheck"></span>
				<span>{el.title}</span>
			</label>
		)
	}) 

// Рендер машин
// Фильтрация моделей на основе этого массивы будет мапитсья другой 
	const filterCars = props.cars.filter((value, i) => {
		if (props.filterCar[1].checked) {
			return props.cars[i].price < 10000
		}
		else if (props.filterCar[2].checked) {
			return props.cars[i].price > 10000
		}
		return props.cars[i].price
	})
	console.log(filterCars);

	// Рендер отфильтрованных машин
	const carsItem = filterCars.map((el, i) => {
		if (el.selected) {
			return(
				<div key={i} className='model__item active' onClick={() => { props.selectCars(el.id, el.model)}}>
					<span>{el.model}</span>
					<span>{el.subtitle}</span>
					<img src={el.img} alt="" />
				</div>
			)
		}
		return(
			<div key={i} className='model__item' onClick={() => { props.selectCars(el.id, el.model) }}>
				<span>{el.model}</span>
				<span>{el.subtitle}</span>
				<img src={el.img} alt="" />
			</div>
		)
	})	
	
	return (
		<div className='model'>
			<div className='model__filter'>
				{checkBoxItem}
			</div>
			<div className='model__view'>
				{carsItem}
			</div>
		</div>
	)
}

export default Model;