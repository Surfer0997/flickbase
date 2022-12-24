import { useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../store/actions/articlesThunk';
import { AdminTitle } from '../../../utils/tools';
import AddCategory from './AddCategory';

const AdminCategories = () => {
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories({}));
  }, [dispatch]);
  return (
    <>
      <AdminTitle title="Categories"></AdminTitle>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>

            <tbody>
              {articles.categories.map(category => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col>
          <AddCategory />
        </Col>
      </Row>
    </>
  );
};

export default AdminCategories;
