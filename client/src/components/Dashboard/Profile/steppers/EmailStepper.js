import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { errorHelper, Loader } from "../../../../utils/tools";
import { changeEmail } from "../../../../store/actions/usersThunk";

const EmailStepper = ({user, closeModal}) => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Enter your current email', 'Enter new email', 'Are you sure?'];

    const dispatch = useDispatch();


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { email: '', newEmail:'' },
        validationSchema: Yup.object({
            email: Yup.string().required('This is required')
            .email('This is invalid email')
            .test(' ', 'Please check your email', (email)=>{
                return email === user.data.email;
            }),
            newEmail: Yup.string().required('This is required')
            .email('This is invalid email')
            .test('equal', 'Please, enter new email. This is your old one.', (newEmail)=>{
                return newEmail !== user.data.email;
            }),
        }),
        onSubmit:(values)=>{
            dispatch(changeEmail(values))
            .unwrap()
            .then(()=>{
                closeModal();
            })
        }
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep)=>{
            return prevActiveStep + 1;
        })
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep)=>{
            return prevActiveStep - 1;
        })
    }

    const nextBtn = () => {
        return <Button className="mt-5" variant="contained" color="primary" onClick={handleNext}>Next</Button>
    }

    const backBtn = () => {
       return <Button className="mt-5  me-2" variant="contained" color="primary" onClick={handleBack}>Back</Button>
    }

    if (user.loading) return <Loader/>
    return (

        <>
        <Stepper activeStep={activeStep}>
            {steps.map(stepLabel=>{
                return <Step key={stepLabel}><StepLabel>{stepLabel}</StepLabel></Step>
            })}
        </Stepper>
        
        <form onSubmit={formik.handleSubmit} className='mt-3 stepper_form'>
        { activeStep === 0 ?
                        <div className='form-group'>
                            <TextField
                                style={{width:'100%'}}
                                name="email"
                                label="Enter you old email"
                                variant='outlined'
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik,'email')}
                            />
                            { formik.values.email && !formik.errors.email ?
                                nextBtn()
                            :null}
                        </div>
                    :null
                    }
                    { activeStep === 1 ?
                        <div className='form-group'>
                            <TextField
                                style={{width:'100%'}}
                                name="newEmail"
                                label="Enter you new email"
                                variant='outlined'
                                {...formik.getFieldProps('newEmail')}
                                {...errorHelper(formik,'newEmail')}
                            />
                            { backBtn() }
                            { formik.values.newEmail && !formik.errors.newEmail ?
                                nextBtn()
                            :null}
                        </div>
                    :null
                    }
                    { activeStep === 2 ?
                        <div className='form-group'>
                            { backBtn()}
                            <Button className='mt-5 me-2' variant='contained' color="primary" onClick={formik.submitForm}>
                                Yes change my email
                            </Button>   
                        </div>
                    :null}
        </form>
        </>

    )
}

export default EmailStepper;
