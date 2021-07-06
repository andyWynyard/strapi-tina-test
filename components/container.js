import React from 'react'
import Navigation from './navigation'

const Container = ({ categories, children }) => {
  return (
    <>
      <Navigation categories={categories} />
      {children}
    </>
  )
}

export default Container
