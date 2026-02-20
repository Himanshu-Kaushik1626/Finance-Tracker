import { FaDownload } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function FloatingDownloadBtn({ transactions }) {
    const handleDownload = () => {
        // Export CSV functionality removed
        alert('Download feature is currently unavailable.')
    }

    return (
        <motion.button
            onClick={handleDownload}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '100px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: 'none',
                background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)', // Purple gradient
                color: 'white',
                boxShadow: '0 10px 25px rgba(168, 85, 247, 0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                fontSize: '1.5rem'
            }}
            aria-label="Download Transactions"
        >
            <FaDownload />
        </motion.button>
    )
}