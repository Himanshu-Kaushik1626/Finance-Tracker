import ReactDOM from 'react-dom'
import './Modal.css'

export default function Modal({ children, handleClose }) {
    return ReactDOM.createPortal((
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal-content animate-pop-in" onClick={e => e.stopPropagation()}>
                {children}
                <button className="modal-close" onClick={handleClose}>×</button>
            </div>
        </div>
    ), document.body)
}
