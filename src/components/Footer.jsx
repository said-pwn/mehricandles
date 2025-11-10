import React from 'react'
import { FaInstagram, FaTelegram } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='h-16 bg-gray-200 text-gray-600 flex items-center'>
      <div className='ml-5 md:ml-20'>
        © 2025 MehriCandles
      </div>
      <div className='ml-auto  mr-5 md:mr-20 flex space-x-4'>
        {/* Instagram */}
        <a
          href='https://www.instagram.com/mehricandles/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaInstagram className='text-pink-500 hover:text-pink-600 transition duration-300' size={35} />
        </a>

        {/* Telegram */}
        <a
          href='https://t.me/mehricandles' // <-- сюда вставь реальную ссылку на свой телеграм
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaTelegram className='text-blue-500 hover:text-blue-600 transition duration-300' size={35} />
        </a>
      </div>
    </div>
  )
}

export default Footer
