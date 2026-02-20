import { IoMdAdd } from 'react-icons/io'
import { motion } from 'framer-motion'

export default function FloatingAddBtn({ onClick }) {
    return (
        <motion.button
            onClick={onClick}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            style={{
                position: 'fixed',
                bottom: '100px', // Placed above the download button (approx 30px + 60px + gap)
                right: '30px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: 'none',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', // Blue gradient
                color: 'white',
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                fontSize: '2rem'
            }}
            aria-label="Add Transaction"
        >
            <IoMdAdd />
        </motion.button>
    )
}
