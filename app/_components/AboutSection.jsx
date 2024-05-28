import React from 'react'

function AboutSection({restaurant}) {
  console.log(restaurant,"[[[[[restaurant]]]]]")
  return (
    <div className='flex flex-col gap-5'>
          <p className='flex gap-2 text-indigo-500'>{restaurant.aboutUs}</p>
    </div>
  )
}

export default AboutSection
