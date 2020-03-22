import React from 'react'
import bgImg from './carousel1.jpeg'

export default function Header() {
    return (
        <div>
            <header>
                <div>
                <figure className="overlay" >      
                    <img src={bgImg} className="heade w-100"></img>
                    </figure>
                </div>
            </header>
        </div>
    )
}
