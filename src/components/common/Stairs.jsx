import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLocation, useNavigate } from 'react-router-dom'


const Stairs = (props) => {

    const location = useLocation().pathname;
    const navigate = useNavigate();

    const stairParentRef = useRef(null)
    const containerRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.to(stairParentRef.current, {
            display: 'block'
        });
        tl.from(".stair", {
            height: 0,
            stagger: {
                amount: -0.25
            }
        })
        tl.to(".stair", {
            y: "100%",
            stagger: {
                amount: -0.25
            }
        })
        tl.to(stairParentRef.current, {
            display: 'none'
        });
        gsap.from(containerRef.current,{
            opacity:0,
            delay :1,
            scale:1.2,
            ease:"power2.inOut"
        }) 
    }, [location])
    const handleNavigate = (path) => {
        const tl = gsap.timeline();
        tl.to(stairParentRef.current, {
            display: 'block'
        });
        tl.to(".stair", {
            y: "100%",
            stagger: {
                amount: -0.25
            }
        })
        tl.to(stairParentRef.current, {
            display: 'none'
        });
        navigate(path)
    }
    return (
        <div>
            <div ref={stairParentRef} className='h-screen w-full fixed z-20 top-0'>
                <div className='h-full w-full flex'>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                </div>
            </div>
            <div ref={containerRef}>
                {props.children}
            </div>
        </div>
    )
}

export default Stairs