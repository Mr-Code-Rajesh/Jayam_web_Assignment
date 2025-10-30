import { useState } from 'react'

const FAQ = () => {
  const [toggleFAQ, setToggleFAQ] = useState(null);

  const handleToggle = (index) => {
    setToggleFAQ(toggleFAQ === index ? null : index);
  };

  return (
    <div className=' bg-white/5 p-5 rounded-md shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>Frequently Asked Questions</h2>
      <div className='space-y-4'>
        <div className='bg-white p-4 rounded-md shadow cursor-pointer' onClick={() => handleToggle(0)}>
          <h3 className='font-semibold'>What is your return policy?</h3>
          {toggleFAQ === 0 && (
            <p className='text-sm text-gray-600'>We offer a 30-day return policy on all items.</p>
          )}
        </div>
        <div className='bg-white p-4 rounded-md shadow cursor-pointer' onClick={() => handleToggle(1)}>
          <h3 className='font-semibold'>How long does shipping take?</h3>
          {toggleFAQ === 1 && (
            <p className='text-sm text-gray-600'>Shipping usually takes 5-7 business days.</p>
          )}
        </div>
        <div className='bg-white p-4 rounded-md shadow cursor-pointer' onClick={() => handleToggle(2)}>
          <h3 className='font-semibold'>Do you ship internationally?</h3>
          {toggleFAQ === 2 && (
            <p className='text-sm text-gray-600'>Yes, we ship to select countries outside the US.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FAQ
