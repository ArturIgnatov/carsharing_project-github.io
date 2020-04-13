import React from 'react'
import './Header.sass'
import dropdown from '../../assets/images/svg/dropdown.svg'
import userimg from '../../assets/images/svg/user-avatar.png'

const Header = (props) => {

	return (
		<div className='admin-page__header'>
			<input type="search" placeholder='Поиск...'/>
			<div className='bell'>
				<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.375 9.04949V14.3727L17.5 16.502V17.5667H0.5V16.502L2.625 14.3727V9.04949C2.625 5.77038 4.35687 3.04489 7.40625 2.32093V1.59697C7.40625 0.713313 8.11812 0 9 0C9.88188 0 10.5938 0.713313 10.5938 1.59697V2.32093C13.6325 3.04489 15.375 5.78103 15.375 9.04949ZM11.2667 18.7C11.2667 19.9467 10.2467 20.9667 9 20.9667C7.742 20.9667 6.73334 19.9467 6.73334 18.7H11.2667Z" fill="#818EA3" />
				</svg>
			</div>
			<div className='users-menu'>
				<div className='users-menu__item'>
					<img src={userimg} alt="" />
					<span>Admin</span>
				</div>
				<img src={dropdown} alt=""/>
			</div>
		</div>
	)
}

export default Header;