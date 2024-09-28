import { useState, useRef } from 'react';
import './Input.css';
import { useFirestore } from '../../firebase/useFirestore';

const initialItem = { title: '', date: '', type: '' };

const Input = () => {
    const {addItem} = useFirestore();
    const [item, setItem] = useState(initialItem);
    const [amount, setAmount] = useState('');
    const selectedOption = useRef(null);



    const handelChange = ({ target }) => {
        setItem({
            ...item, [target.name]: target.value,
            type: selectedOption.current.value,
        });
    };


    const handelAmount = ({ target }) => {
        setAmount(target.value);
    };


    const handelSubmit = async (e) => {
        e.preventDefault();
        let actualeAmount = selectedOption.current.value === 'expense' ? parseInt(amount) * -1 : parseInt(amount);
        await addItem(item, actualeAmount);
        setItem(initialItem);
        setAmount('');
    };


return (
    <div className="input">
        <form onSubmit={handelSubmit}>
            <input type="text" name="title" placeholder="Enter Title"
                onChange={handelChange} autoComplete="off" value={item.title} />
            
            <input type="number" name="amount" placeholder="Amount"
                onChange={handelAmount} autoComplete="off" value={amount} />
            
            <input type="date" name="date" placeholder="Date" 
                onChange={handelChange} autoComplete="off" value={item.date} /> 
            
            <label htmlFor="type">Type</label>
            <select name="type" onChange={handelChange} ref={selectedOption}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <input type="submit" value="ADD" />
        </form>
    </div>
)
}

export default Input