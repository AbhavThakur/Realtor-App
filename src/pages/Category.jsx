import { useSearchParams } from 'react-router-dom';

function Category() {
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get('category');
  console.warn(
    '🚀👨🏻‍💻👍 ~ file: Category.jsx:6 ~ Category ~ categoryId:',
    categoryId
  );

  if (!categoryId) {
    return <div>Category</div>;
  }

  return <div>Category</div>;
}

export default Category;
