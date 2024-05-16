import { useState } from 'react'

const Footer = ({ movie }) => {
    return (
        <footer className='footer'>
            (C) Michelle Huynh - Flixster Project for Codepath 2024
            <p><a href='https://www.themoviedb.org/settings/api'>Using the TMDB API</a></p>
        </footer>
    )
}

export default Footer;
