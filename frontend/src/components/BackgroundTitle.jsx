"use client"
import React from 'react'
import { NodeIcon } from '../icons/TechIcons'

const BackgroundTitle = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '150px',
        height: '150px',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6,
        filter: 'brightness(2.0) drop-shadow(0 0 30px rgba(16, 185, 129, 0.8))'
      }}
    >
      <NodeIcon style={{ 
        width: '100%', 
        height: '100%',
        color: '#10b981'
      }} />
    </div>
  )
}

export default BackgroundTitle
