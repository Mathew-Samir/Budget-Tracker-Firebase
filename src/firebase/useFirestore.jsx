import { useEffect,useState } from "react";
import { db } from "./Firebase";


export const useFirestore = () => {
    const [items, setItems] = useState([]);
    const [budget, setBudget] = useState(0);
    useEffect(() => {
        const unSubscribe = db.collection('items').orderBy('date').onSnapshot(snap => {
            let fetched = snap.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });

            let budget = snap.docs.map(doc => {
                return doc.data().amount;
            });



            setItems(fetched);
            setBudget(budget.length> 0 && budget.reduce((acc, val) => acc + val, 0));
        })

        return unSubscribe;
    }, []);

    const addItem = async (item, amount) => {
        await db.collection('items').add({
            ...item, amount,
        });
    }

    const deleteItem = async (id) => {
        await db.collection('items').doc(id).delete();
    }

    return { items, addItem, deleteItem, budget };
}