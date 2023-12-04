import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../config/firebase';

function Category() {
  const location = useLocation();

  const type = location.pathname.split('/')[2];
  const id = location.pathname.split('/')[3];

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const docRef = doc(db, 'listings', id);
        const docSnap = await getDoc(docRef);
        if (doc.exists) {
          const data = docSnap.data();
          console.warn(
            '🚀👨🏻‍💻👍 ~ file: Category.jsx:25 ~ getCategoryDetails ~ data:',
            data
          );
          // Do something with the category details
        } else {
          console.log('No category found');
        }
      } catch (error) {
        console.error('Error getting category details:', error);
      }
    };

    getCategoryDetails();
  }, []);

  return <div>Category</div>;
}

export default Category;
