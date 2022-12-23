import { AdminTitle } from '../../../utils/tools';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Modal, Button, ButtonToolbar, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { changeArticleStatus, deleteArticle, getPaginateArticles } from '../../../store/actions/articlesThunk';
import PaginateComponent from './PaginateComponent';

const AdminArticles = () => {
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [removeModal, setRemoveModal] = useState(false);
  const [articleIdToRemove, setArticleIdToRemove] = useState(null);
  const handleCloseModal = () => {setRemoveModal(false)};
  const handleShowModal = (_id=null) => {
    setRemoveModal(true);
    setArticleIdToRemove(_id);
  }

  //// PAGINATION COMMANDS
  const goToPrevPage = page => {
  dispatch(getPaginateArticles({ page }));
  };
  const goToNextPage = page => {
  dispatch(getPaginateArticles({ page }));
  };
  const goToEdit = (id) => {
    navigate(`/dashboard/articles/edit/${id}`)
  }
  const handleStatusChange = (status, _id) => {
    const newStatus = status==='draft' ? 'public' : 'draft';
    dispatch(changeArticleStatus({newStatus, _id}))
  }
  const handleDeleteArticle = () => {
    dispatch(deleteArticle({_id: articleIdToRemove}))
    .unwrap()
    .finally(()=>{
      setRemoveModal(false);
      setArticleIdToRemove(null);
    })
  }
  //// END PC

  useEffect(() => {
    dispatch(getPaginateArticles({ page: 1, limit: 5, keywords: '' }));
  }, [dispatch]);

  return (
    <>
      <AdminTitle title="Articles" />
      <div className="articles_table">
        <ButtonToolbar className="mb-3">
          <ButtonGroup className="me-2">
            <LinkContainer to="/dashboard/articles/add">
              <Button variant="secondary">Add articles</Button>
            </LinkContainer>
          </ButtonGroup>
          <form>
            <InputGroup>
              <InputGroup.Text id="btngroup1">@</InputGroup.Text>
              <FormControl type="text" placeholder="Serch (stonks)" />
            </InputGroup>
          </form>
        </ButtonToolbar>

        <>
          <PaginateComponent
            articles={articles.adminArticles}
            goToPrevPage={goToPrevPage}
            goToNextPage={goToNextPage}
            goToEdit={goToEdit}
            handleStatusChange={handleStatusChange}
            handleShowModal={handleShowModal}
          />
        </>

        <Modal show={removeModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you really sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            There is no going back.
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>Oops, close this</Button>
            <Button variant='danger' onClick={handleDeleteArticle}>Yes! Delete it!</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminArticles;
