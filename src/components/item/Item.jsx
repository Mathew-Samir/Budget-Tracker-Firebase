import './Item.css';
import { useRef } from 'react';
import PropTypes from 'prop-types'; // Importing PropTypes
import { useFirestore } from '../../firebase/useFirestore';


const Item = ({ item }) => {
    const delBtn = useRef();
    const { deleteItem } = useFirestore(); 
    return (
        <div
            className="item"
            onMouseEnter={() => (delBtn.current.style.display = 'block')}
            onMouseLeave={() => (delBtn.current.style.display = 'none')}>
            <div className="item__title">
                <h3>{item.title}</h3>
            </div>
            <div className="item__info">
                <p className={item.amount >= 0 ? 'income' : 'expense'}>
                    ${Math.abs(item.amount)}
                </p>
                <p>{item.date}</p>
            </div>
            <button
                className="item__delete"
                ref={delBtn}
                onClick={() => deleteItem(item.id)}>
                delete
            </button>
        </div>
    );
};

// Adding PropTypes for validation
Item.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired, // or use PropTypes.instanceOf(Date) if using Date objects
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default Item;
