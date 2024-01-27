'use client';
import React from 'react'
import styles from './style.module.css';

export default function index({ index, title, setModal }: { index: string, title: string, setModal: any }) {

    return (
        <div onMouseEnter={() => { setModal({ active: true, index }) }} onMouseLeave={() => { setModal({ active: false, index }) }} className={`${styles.project} visible`}>
            <h2>{title}</h2>
            <p className='invisible duration-150'>View The Project</p>
        </div>
    )
}
