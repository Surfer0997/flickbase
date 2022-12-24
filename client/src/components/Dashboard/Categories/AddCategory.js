import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addCategory } from '../../../store/actions/articlesThunk';
import { errorHelper } from '../../../utils/tools';

const AddCategory = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('The category name is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addCategory(values))
      .unwrap()
      .then(()=>{
        resetForm();
      })
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ width: '100%', marginBottom: '1rem', marginTop:'-1.25rem' }}
            name="name"
            label="Enter category name"
            variant="outlined"
            {...formik.getFieldProps('name')}
            {...errorHelper(formik, 'name')}
          />
        </div>

        <Button variant="contained" color="primary" type="submit">
          Add Category
        </Button>
      </form>
    </>
  );
};

export default AddCategory;
